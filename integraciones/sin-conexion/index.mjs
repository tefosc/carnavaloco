/**
 * Integración de Astro: al terminar el build escribe /sw.js con la lista de lo que
 * se guarda en el teléfono para usar la web sin señal (ver trabajador.js).
 *
 * Se guardan al instalar todas las páginas, los estilos, los scripts y las letras
 * (cerca de 1 MB). Las fotos se guardan a medida que se ven, y el mapa 3D queda
 * fuera: sin internet tampoco tendría calles ni relieve.
 */
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/**
 * Archivos de /_astro/ que no se guardan al instalar: MapLibre pesa 1,6 MB y necesita
 * red, y las letras para vietnamita nunca se descargan en este sitio.
 */
const NO_GUARDAR = /mapa3d|maplibre|vietnamese/;
const GUARDAR = /\.(css|js|woff2)$/;
/** Además de las páginas y /_astro/. */
const EXTRAS = ['/favicon.svg', '/manifest.webmanifest', '/iconos/icono-192.png', '/iconos/icono-512.png'];

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

export default function sinConexion() {
  return {
    name: 'sin-conexion',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const raiz = fileURLToPath(dir);
        const todos = await archivos(raiz);

        // index.html → su URL con barra final; 404.html no hace falta (hay /sin-conexion/)
        const paginas = todos
          .filter((a) => a.endsWith('index.html'))
          .map((a) => `/${a.slice(0, -'index.html'.length)}`);
        const recursos = todos
          .filter((a) => a.startsWith('_astro/') && GUARDAR.test(a) && !NO_GUARDAR.test(a))
          .map((a) => `/${a}`);
        const extras = EXTRAS.filter((u) => todos.includes(u.slice(1)));
        const lista = [...paginas.sort(), ...recursos.sort(), ...extras];

        if (!paginas.includes('/sin-conexion/')) throw new Error('Falta la página /sin-conexion/');

        // La versión cambia si cambia cualquier archivo guardado o el propio worker:
        // así cada despliegue con cambios renueva lo guardado en los teléfonos
        const archivoDe = (url) => path.join(raiz, url.endsWith('/') ? `${url}index.html` : url);
        const contenidos = await Promise.all(lista.map((url) => readFile(archivoDe(url))));
        const plantilla = await readFile(new URL('./trabajador.js', import.meta.url), 'utf8');
        const hash = createHash('sha256').update(plantilla);
        lista.forEach((url, i) => hash.update(url).update(contenidos[i]));
        const version = hash.digest('hex').slice(0, 12);

        const codigo = plantilla
          .replace("'__VERSION__'", JSON.stringify(version))
          .replace('[/*__GUARDAR_AL_INSTALAR__*/]', JSON.stringify(lista, null, 2));
        await writeFile(path.join(raiz, 'sw.js'), codigo);

        const peso = contenidos.reduce((suma, c) => suma + c.length, 0);
        logger.info(`sw.js ${version}: ${lista.length} archivos para usar sin conexión (${(peso / 1024).toFixed(0)} KB)`);
      },
    },
  };
}
