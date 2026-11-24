/**
 * Imágenes para compartir (Open Graph), 1200 × 630, en estilo afiche chicha.
 * Se generan en el build: satori convierte el diseño en SVG con el texto como
 * trazos y sharp lo pasa a PNG.
 */
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const fuente = (ruta: string) => readFile(require.resolve(ruta));

const COLORES = {
  fucsia: '#ff2a92',
  amarillo: '#ffe600',
  verde: '#00b35c',
  azul: '#1d2fd0',
  naranja: '#ff6a00',
  turquesa: '#00b8c8',
  tinta: '#13185a',
  blanco: '#ffffff',
} as const;

export type ColorOg = keyof typeof COLORES;

export interface DatosOg {
  titulo: string;
  bajada: string;
  fondo: ColorOg;
  relleno?: ColorOg;
  /** Texto corto dentro del sello redondo (por ejemplo, las fechas). */
  sello?: string;
}

let fuentes: Awaited<ReturnType<typeof cargarFuentes>> | undefined;

async function cargarFuentes() {
  return [
    {
      name: 'Big Shoulders',
      data: await fuente('@fontsource/big-shoulders-display/files/big-shoulders-display-latin-900-normal.woff'),
      weight: 900 as const,
      style: 'normal' as const,
    },
    {
      name: 'Bricolage',
      data: await fuente('@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-700-normal.woff'),
      weight: 700 as const,
      style: 'normal' as const,
    },
  ];
}

/** Banderines de colores colgando de una cuerda, como SVG en data URI. */
function banderines() {
  const colores = [COLORES.amarillo, COLORES.verde, COLORES.azul, COLORES.naranja, COLORES.turquesa, COLORES.fucsia];
  const n = 26;
  const triangulos = Array.from({ length: n }, (_, i) => {
    const t = (i + 0.5) / n;
    const x = t * 1200;
    const y = 4 + 4 * 22 * t * (1 - t);
    return `<path d="M${x - 21} ${y - 2} L${x + 21} ${y + 2} L${x} ${y + 40} Z" fill="${colores[i % colores.length]}"/>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="70" viewBox="0 0 1200 70"><path d="M0 4 Q600 48 1200 4" fill="none" stroke="${COLORES.tinta}" stroke-width="3"/>${triangulos}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({
  type,
  props: { style, children },
});

export async function imagenOg(datos: DatosOg): Promise<Buffer> {
  fuentes ??= await cargarFuentes();
  const fondo = COLORES[datos.fondo];
  const relleno = COLORES[datos.relleno ?? (datos.fondo === 'amarillo' ? 'fucsia' : 'amarillo')];
  const oscuro = datos.fondo === 'tinta' || datos.fondo === 'azul';
  const tintaTexto = oscuro ? COLORES.blanco : COLORES.tinta;
  const largo = datos.titulo.length;
  const base = largo <= 8 ? 230 : largo <= 12 ? 170 : largo <= 18 ? 128 : 100;
  // Con sello a la derecha, el título se achica para no chocar con él
  const tamTitulo = datos.sello && largo > 5 ? Math.round(base * 0.82) : base;
  const colorSombra = oscuro ? (relleno === COLORES.fucsia ? COLORES.amarillo : COLORES.fucsia) : COLORES.tinta;

  const arbol = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: fondo,
      fontFamily: 'Bricolage',
      position: 'relative',
    },
    [
      { type: 'img', props: { src: banderines(), width: 1200, height: 70, style: { position: 'absolute', top: 0, left: 0 } } },
      h(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexGrow: 1,
          padding: '90px 70px 60px',
          maxWidth: datos.sello ? 900 : 1100,
        },
        [
          h('div', { fontSize: 34, color: tintaTexto, marginBottom: 10 }, 'Carnaval de Cajamarca'),
          h(
            'div',
            {
              fontFamily: 'Big Shoulders',
              fontSize: tamTitulo,
              lineHeight: 0.88,
              textTransform: 'uppercase',
              color: relleno,
              WebkitTextStroke: `${Math.round(tamTitulo * 0.045)}px ${COLORES.tinta}`,
              textShadow: `${Math.round(tamTitulo * 0.06)}px ${Math.round(tamTitulo * 0.06)}px 0 ${colorSombra}`,
            },
            datos.titulo,
          ),
          h('div', { fontSize: 38, lineHeight: 1.25, color: tintaTexto, marginTop: 26, maxWidth: 820 }, datos.bajada),
        ],
      ),
      datos.sello
        ? h(
            'div',
            {
              position: 'absolute',
              right: 70,
              top: 210,
              width: 230,
              height: 230,
              borderRadius: 999,
              backgroundColor: oscuro ? COLORES.fucsia : COLORES.verde,
              border: `6px solid ${COLORES.tinta}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              transform: 'rotate(-10deg)',
              fontFamily: 'Big Shoulders',
              fontSize: 46,
              lineHeight: 0.95,
              textTransform: 'uppercase',
              color: COLORES.tinta,
              padding: 24,
            },
            datos.sello,
          )
        : null,
      h('div', { position: 'absolute', left: 0, right: 0, bottom: 0, height: 22, display: 'flex' }, [
        ...[COLORES.amarillo, COLORES.verde, COLORES.turquesa, COLORES.naranja, COLORES.azul].map((c) =>
          h('div', { flexGrow: 1, backgroundColor: c }),
        ),
      ]),
    ].filter(Boolean),
  );

  const svg = await satori(arbol as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts: fuentes });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
