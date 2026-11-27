import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rutaPublica = (archivo) =>
  '/' + archivo.replace(/(^|\/)index\.html$/, '$1').split('/').map(encodeURIComponent).join('/');

function fotosLigeras(documentos, rutas) {
  const ligeras = new Set();
  const alternativas = new Map();
  for (const html of documentos) {
    for (const [, srcset] of html.matchAll(/\bsrcset="([^"]+)"/g)) {
      const candidatas = srcset.split(',').map((entrada) => entrada.trim().match(/^(\S+)\s+(\d+)w$/));
      if (candidatas.some((c) => !c || !c[1].startsWith('/_astro/') || !rutas.has(c[1]))) continue;
      candidatas.sort((a, b) => Number(a[2]) - Number(b[2]));
      const ligera = candidatas[0][1];
      ligeras.add(ligera);
      for (const [, url] of candidatas.slice(1)) alternativas.set(url, ligera);
    }
  }
  for (const url of ligeras) alternativas.delete(url);
  return Object.fromEntries(alternativas);
}

async function archivos(carpeta, base = carpeta) {
  const entradas = await readdir(carpeta, { withFileTypes: true });
  const listas = await Promise.all(
    entradas.map((e) => {
      const ruta = path.join(carpeta, e.name);
      return e.isDirectory() ? archivos(ruta, base) : [path.relative(base, ruta).split(path.sep).join('/')];
    }),
  );
  return listas.flat();
}

// Recursos excluidos del precache: imágenes para redes (/og/) y el mapa 3D (solo con internet).
const SOLO_CON_RED = /^(?:og\/|(?:en\/)?mapa\/|_astro\/(?:mapa3d|maplibre-gl-worker)\b)/;

export default function sinConexion() {
  return {
    name: 'sin-conexion',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const raiz = fileURLToPath(dir);
        const archivosLocales = (await archivos(raiz)).sort().filter((a) => a !== 'sw.js' && !SOLO_CON_RED.test(a));
        const publicados = new Map(archivosLocales.map((a) => [rutaPublica(a), a]));
        if (!publicados.has('/sin-conexion/')) throw new Error('Falta la página /sin-conexion/');
        if (!publicados.has('/en/offline/')) throw new Error('Falta la página /en/offline/');

        const documentos = await Promise.all(
          archivosLocales.filter((a) => a.endsWith('.html')).map((a) => readFile(path.join(raiz, a), 'utf8')),
        );
        const alternativas = fotosLigeras(documentos, publicados);
        const lista = [...publicados.keys()].filter((url) => !Object.hasOwn(alternativas, url));
        const contenidos = await Promise.all(lista.map((url) => readFile(path.join(raiz, publicados.get(url)))));
        const plantilla = await readFile(new URL('./trabajador.js', import.meta.url), 'utf8');
        const hash = createHash('sha256').update(plantilla).update(JSON.stringify({ lista, alternativas }));
        contenidos.forEach((contenido) => hash.update(contenido.length + ':').update(contenido));
        const version = hash.digest('hex').slice(0, 12);

        const cabecera = [
          'const VERSION = ' + JSON.stringify(version) + ';',
          'const GUARDAR_AL_INSTALAR = ' + JSON.stringify(lista, null, 2) + ';',
          'const FOTOS_LIGERAS = ' + JSON.stringify(alternativas, null, 2) + ';',
        ];
        const codigo = [...cabecera, '', plantilla].join('\n');
        await writeFile(path.join(raiz, 'sw.js'), codigo);

        const peso = contenidos.reduce((suma, c) => suma + c.length, 0);
        logger.info(`sw.js ${version}: ${lista.length} archivos para usar sin conexión (${(peso / 1024).toFixed(0)} KB)`);
      },
    },
  };
}
