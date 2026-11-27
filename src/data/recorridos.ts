/**
 * Recorridos del carnaval: lo comparten el mapa plano (SVG) y el mapa 3D.
 * Las coordenadas están en el sistema del SVG (src/data/mapa.json); para el
 * mapa 3D se convierten a longitud y latitud con la misma proyección.
 *
 * Cada día es una lista de tramos en el orden en que avanza el desfile, para
 * poder dibujarlo desde donde sale.
 */
import mapa from './mapa.json';
import type { Idioma } from '../i18n';

export type Punto = [number, number];

export interface Tramo {
  /** «exacta»: avenida real de OpenStreetMap. «aprox»: tramo aproximado (punteado). */
  tipo: 'exacta' | 'aprox';
  puntos: Punto[];
}

const { lugares: L, extremos: E } = mapa;
const p = (punto: number[]) => `${punto[0]} ${punto[1]}`;
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1]);

/* ---------- Lectura de trazos SVG ---------- */

/** Lee un trazo con M, L y Q y devuelve sus líneas como listas de puntos. */
export function lineasDeTrazo(d: string): Punto[][] {
  const lineas: Punto[][] = [];
  const fichas = d.match(/[MLQ]|-?\d+(?:\.\d+)?/g) ?? [];
  let comando = 'M';
  let actual: Punto[] = [];
  let i = 0;
  const num = () => Number(fichas[i++]);
  while (i < fichas.length) {
    if (/[MLQ]/.test(fichas[i])) comando = fichas[i++];
    if (comando === 'M') {
      if (actual.length > 1) lineas.push(actual);
      actual = [[num(), num()]];
      comando = 'L';
    } else if (comando === 'L') {
      actual.push([num(), num()]);
    } else {
      // Curva cuadrática: se muestrea en 20 tramos
      const [x0, y0] = actual[actual.length - 1];
      const cx = num();
      const cy = num();
      const x1 = num();
      const y1 = num();
      for (let k = 1; k <= 20; k++) {
        const t = k / 20;
        const u = 1 - t;
        actual.push([u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1]);
      }
    }
  }
  if (actual.length > 1) lineas.push(actual);
  return lineas;
}

/* ---------- De pedazos de OpenStreetMap a una sola línea ---------- */

/** Distancia de un punto a una línea quebrada. */
function distanciaALinea(q: Punto, linea: Punto[]): number {
  let menor = Infinity;
  for (let i = 1; i < linea.length; i++) {
    const [a, b] = [linea[i - 1], linea[i]];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const largo2 = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((q[0] - a[0]) * dx + (q[1] - a[1]) * dy) / largo2));
    menor = Math.min(menor, dist(q, [a[0] + t * dx, a[1] + t * dy]));
  }
  return menor;
}

/**
 * Un pedazo que vuelve a su punto de partida es una avenida doble cuyos dos
 * sentidos quedaron unidos al final: se queda solo con la ida.
 */
function soloIda(pedazo: Punto[]): Punto[] {
  if (pedazo.length < 5 || dist(pedazo[0], pedazo[pedazo.length - 1]) > 15) return pedazo;
  let lejano = 0;
  pedazo.forEach((q, i) => {
    if (dist(q, pedazo[0]) > dist(pedazo[lejano], pedazo[0])) lejano = i;
  });
  return pedazo.slice(0, lejano + 1);
}

/** Hueco máximo que se une con una recta; si es mayor, el hueco va punteado. */
const UNIR = 30;
/** Hueco a partir del cual se deja de seguir la avenida. */
const SALTO = 120;
/** Un pedazo que corre a menos de esto de lo ya recorrido es el otro sentido de la avenida. */
const PEGADO = 9;

/**
 * Une los pedazos de una avenida en una línea que empieza en `sale`.
 * OpenStreetMap trae cada sentido de una avenida doble por separado y en
 * pedazos: se sigue siempre el pedazo más cercano y se saltan los que corren
 * pegados a lo ya recorrido.
 */
function avenidaDesde(trazo: string, sale: Punto): Tramo[] {
  let pedazos = lineasDeTrazo(trazo).map(soloIda);
  const tramos: Tramo[] = [];
  const recorrido: Punto[] = [];
  let actual = sale;
  while (pedazos.length) {
    let mejor = { pedazo: pedazos[0], invertir: false, d: Infinity };
    for (const pedazo of pedazos) {
      const alInicio = dist(actual, pedazo[0]);
      const alFinal = dist(actual, pedazo[pedazo.length - 1]);
      if (alInicio < mejor.d) mejor = { pedazo, invertir: false, d: alInicio };
      if (alFinal < mejor.d) mejor = { pedazo, invertir: true, d: alFinal };
    }
    if (mejor.d > SALTO) break;
    pedazos = pedazos.filter((x) => x !== mejor.pedazo);
    const puntos = mejor.invertir ? [...mejor.pedazo].reverse() : mejor.pedazo;
    if (recorrido.length > 1) {
      const media = puntos.reduce((s, q) => s + distanciaALinea(q, recorrido), 0) / puntos.length;
      if (media < PEGADO) continue;
    }
    const ultimo = tramos[tramos.length - 1];
    if (!ultimo || mejor.d > UNIR) {
      if (ultimo) tramos.push({ tipo: 'aprox', puntos: [actual, puntos[0]] });
      tramos.push({ tipo: 'exacta', puntos: [...puntos] });
    } else {
      ultimo.puntos.push(...puntos);
    }
    recorrido.push(...puntos);
    actual = puntos[puntos.length - 1];
  }
  return tramos;
}

/** El extremo de una avenida más alejado de un punto (su otra punta). */
function otraPunta(trazo: string, desde: number[]): Punto {
  const extremos = lineasDeTrazo(trazo).flatMap((l) => [l[0], l[l.length - 1]]);
  return extremos.reduce((a, b) => (dist(b, desde) > dist(a, desde) ? b : a));
}

const aprox = (d: string): Tramo => ({ tipo: 'aprox', puntos: lineasDeTrazo(d)[0] });
const alReves = (t: Tramo): Tramo => ({ ...t, puntos: [...t.puntos].reverse() });

/* ---------- Los días ---------- */

export interface DiaMapa {
  id: string;
  corto: string;
  dia: string;
  titulo: string;
  texto: string;
  en: {
    corto: string;
    dia: string;
    titulo: string;
    texto: string;
  };
  /** Variable CSS del color, para el SVG. */
  color: string;
  /** El mismo color en hexadecimal, para MapLibre. */
  hex: string;
  /** Tramos en el orden en que avanza el desfile: el primer punto es la salida. */
  tramos: Tramo[];
  /** De dónde viene, si sale de fuera del mapa plano. */
  vieneDe?: string;
  /** Dónde va el sello del día. */
  marca: number[];
}

export const diasMapa: DiaMapa[] = [
  {
    id: 'sabado',
    corto: 'Sáb',
    dia: 'Sábado 6',
    titulo: 'Ingreso del Ño Carnavalón',
    texto: 'Entra por la avenida Independencia, desde Santa Elena, y sigue hacia el centro.',
    en: {
      corto: 'Sat',
      dia: 'Sat Feb 6',
      titulo: 'Arrival of Ño Carnavalón',
      texto: 'Enters along Avenida Independencia from Santa Elena and heads toward downtown.',
    },
    color: 'var(--fucsia)',
    hex: '#ff2a92',
    // Sube por la Independencia desde el sur (Santa Elena) y llega a la plaza
    tramos: [
      ...avenidaDesde(mapa.rutas.ingreso, otraPunta(mapa.rutas.ingreso, E.ingreso)),
      aprox(`M${p(E.ingreso)} Q350 395 ${p(L.plaza)}`),
    ],
    vieneDe: 'Santa Elena',
    // Más arriba que la entrada al mapa, donde va el anillo de salida
    marca: [392, 598],
  },
  {
    id: 'domingo',
    corto: 'Dom',
    dia: 'Domingo 7',
    titulo: 'Patrullas y comparsas',
    texto:
      'En 2025 los grupos fueron del estadio Héroes de San Ramón al Arco del Triunfo; el jurado los espera en la Plaza de Armas.',
    en: {
      corto: 'Sun',
      dia: 'Sun Feb 7',
      titulo: 'Troupes & comparsas',
      texto:
        'In 2025 groups marched from Héroes de San Ramón Stadium to the Arco del Triunfo; the judges wait at the Plaza de Armas.',
    },
    color: 'var(--verde)',
    hex: '#00b35c',
    tramos: [aprox(`M${p(L.estadio)} Q372 330 ${p(L.plaza)} Q285 300 ${p(L.arco)}`)],
    marca: L.plaza,
  },
  {
    id: 'lunes',
    corto: 'Lun',
    dia: 'Lunes 8',
    titulo: 'Gran Corso',
    texto: 'Los carros alegóricos recorren la Vía de Evitamiento.',
    en: {
      corto: 'Mon',
      dia: 'Mon Feb 8',
      titulo: 'Gran Corso',
      texto: 'Decorated floats parade down Vía de Evitamiento.',
    },
    color: 'var(--amarillo)',
    hex: '#ffe600',
    // Se dibuja de norte a sur, del extremo noroeste de la Vía de Evitamiento.
    // El sentido real sale en el programa oficial: para cambiarlo, cambia este punto.
    tramos: avenidaDesde(mapa.rutas.corso, [224, 188]),
    marca: [640, 533],
  },
  {
    id: 'martes',
    corto: 'Mar',
    dia: 'Martes 9',
    titulo: 'Velorio',
    texto: 'Las viudas llevan el ataúd hacia Santa Apolonia.',
    en: {
      corto: 'Tue',
      dia: 'Tue Feb 9',
      titulo: 'The Wake',
      texto: 'The “widows” carry the coffin up toward Santa Apolonia.',
    },
    color: 'var(--turquesa)',
    hex: '#00b8c8',
    tramos: [aprox(`M${p(L.plaza)} Q286 330 ${p(L.santaApolonia)}`)],
    marca: L.santaApolonia,
  },
  {
    id: 'miercoles',
    corto: 'Mié',
    dia: 'Miércoles 10',
    titulo: 'Entierro',
    texto: 'El último paseo va por la carretera hasta Baños del Inca, donde se lee el testamento.',
    en: {
      corto: 'Wed',
      dia: 'Wed Feb 10',
      titulo: 'The Burial',
      texto: 'The final procession heads down the highway to Baños del Inca, where the will is read aloud.',
    },
    color: 'var(--naranja)',
    hex: '#ff6a00',
    // Sale del centro y toma la carretera hasta Baños del Inca
    tramos: [
      alReves(aprox(`M${p(E.entierro)} Q402 332 ${p(L.plaza)}`)),
      ...avenidaDesde(mapa.rutas.entierro, E.entierro as Punto),
    ],
    marca: L.banos,
  },
];

export function diasMapaDe(idioma: Idioma = 'es') {
  return diasMapa.map((d) => (idioma === 'en' ? { ...d, ...d.en } : d));
}

/** Trazo SVG de un tramo. */
export const trazoDe = (t: Tramo) =>
  t.puntos.map((q, i) => `${i ? 'L' : 'M'}${+q[0].toFixed(1)} ${+q[1].toFixed(1)}`).join(' ');

export const etiquetasMapa = [
  { texto: 'Plaza de Armas', textoEn: 'Plaza de Armas', punto: L.plaza, dx: 20, dy: -8, ancla: 'start' },
  { texto: 'Arco del Triunfo', textoEn: 'Arco del Triunfo', punto: L.arco, dx: -12, dy: -8, ancla: 'end' },
  { texto: 'Santa Apolonia', textoEn: 'Santa Apolonia', punto: L.santaApolonia, dx: -22, dy: 12, ancla: 'end' },
  { texto: 'Estadio', textoEn: 'Stadium', punto: L.estadio, dx: 12, dy: -10, ancla: 'start' },
  { texto: 'UNC', textoEn: 'UNC', punto: L.unc, dx: 12, dy: 6, ancla: 'start' },
  { texto: 'Baños del Inca', textoEn: 'Baños del Inca', punto: L.banos, dx: -24, dy: -22, ancla: 'end' },
  { texto: 'Av. Independencia', textoEn: 'Av. Independencia', punto: [404, 560], dx: 0, dy: 0, ancla: 'start' },
  { texto: 'Carretera a Baños del Inca', textoEn: 'Road to Baños del Inca', punto: [760, 412], dx: 0, dy: 0, ancla: 'middle' },
] as const;

export function etiquetasMapaDe(idioma: Idioma = 'es') {
  return etiquetasMapa.map((e) => ({ ...e, texto: idioma === 'en' ? e.textoEn : e.texto }));
}

/* ---------- De SVG a longitud y latitud ---------- */

const { lon0, lat0, cos, escala } = mapa.proyeccion;

export const aLonLat = ([x, y]: number[]): Punto => [
  +(x / (cos * escala) + lon0).toFixed(6),
  +(lat0 - y / escala).toFixed(6),
];

/** GeoJSON de las rutas (un tramo por línea, en orden) y los sellos, para el mapa 3D. */
export function geojsonRecorridos(idioma: Idioma = 'es') {
  const dias = diasMapaDe(idioma);
  const etiquetas = etiquetasMapaDe(idioma);
  const rutas = dias.flatMap((d) =>
    d.tramos.map((t, orden) => ({
      type: 'Feature' as const,
      properties: { dia: d.id, tipo: t.tipo, color: d.hex, orden },
      geometry: { type: 'LineString' as const, coordinates: t.puntos.map(aLonLat) },
    })),
  );
  const sellos = dias.map((d) => ({
    type: 'Feature' as const,
    properties: { dia: d.id, corto: d.corto, color: d.hex, titulo: `${d.dia}: ${d.titulo}` },
    geometry: { type: 'Point' as const, coordinates: aLonLat(d.marca) },
  }));
  const lugares = etiquetas
    .filter((e) => e.dx !== 0 || e.dy !== 0)
    .map((e) => ({
      type: 'Feature' as const,
      properties: { nombre: e.texto },
      geometry: { type: 'Point' as const, coordinates: aLonLat(e.punto as unknown as number[]) },
    }));
  return { type: 'FeatureCollection' as const, features: [...rutas, ...sellos, ...lugares] };
}
