/**
 * Recorridos del carnaval: lo comparten el mapa plano (SVG) y el mapa 3D.
 * Las coordenadas están en el sistema del SVG (src/data/mapa.json); para el
 * mapa 3D se convierten a longitud y latitud con la misma proyección.
 */
import mapa from './mapa.json';

const { lugares: L, extremos: E } = mapa;
const p = (punto: number[]) => `${punto[0]} ${punto[1]}`;

export interface DiaMapa {
  id: string;
  corto: string;
  dia: string;
  titulo: string;
  texto: string;
  /** Variable CSS del color, para el SVG. */
  color: string;
  /** El mismo color en hexadecimal, para MapLibre. */
  hex: string;
  /** Avenidas reales (trazo SVG). */
  exacto: string;
  /** Tramos aproximados (trazo SVG con curvas). */
  aprox: string;
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
    color: 'var(--fucsia)',
    hex: '#ff2a92',
    exacto: mapa.rutas.ingreso,
    aprox: `M${p(E.ingreso)} Q350 395 ${p(L.plaza)}`,
    marca: [388, 640],
  },
  {
    id: 'domingo',
    corto: 'Dom',
    dia: 'Domingo 7',
    titulo: 'Patrullas y comparsas',
    texto:
      'En 2025 los grupos fueron del estadio Héroes de San Ramón al Arco del Triunfo; el jurado los espera en la Plaza de Armas.',
    color: 'var(--verde)',
    hex: '#00b35c',
    exacto: '',
    aprox: `M${p(L.estadio)} Q372 330 ${p(L.plaza)} Q285 300 ${p(L.arco)}`,
    marca: L.plaza,
  },
  {
    id: 'lunes',
    corto: 'Lun',
    dia: 'Lunes 8',
    titulo: 'Gran Corso',
    texto: 'Los carros alegóricos recorren la Vía de Evitamiento.',
    color: 'var(--amarillo)',
    hex: '#ffe600',
    exacto: mapa.rutas.corso,
    aprox: '',
    marca: [640, 533],
  },
  {
    id: 'martes',
    corto: 'Mar',
    dia: 'Martes 9',
    titulo: 'Velorio',
    texto: 'Las viudas llevan el ataúd hacia Santa Apolonia.',
    color: 'var(--turquesa)',
    hex: '#00b8c8',
    exacto: '',
    aprox: `M${p(L.plaza)} Q286 330 ${p(L.santaApolonia)}`,
    marca: L.santaApolonia,
  },
  {
    id: 'miercoles',
    corto: 'Mié',
    dia: 'Miércoles 10',
    titulo: 'Entierro',
    texto: 'El último paseo va por la carretera hasta Baños del Inca, donde se lee el testamento.',
    color: 'var(--naranja)',
    hex: '#ff6a00',
    exacto: mapa.rutas.entierro,
    aprox: `M${p(E.entierro)} Q402 332 ${p(L.plaza)}`,
    marca: L.banos,
  },
];

export const etiquetasMapa = [
  { texto: 'Plaza de Armas', punto: L.plaza, dx: 20, dy: -8, ancla: 'start' },
  { texto: 'Arco del Triunfo', punto: L.arco, dx: -12, dy: -8, ancla: 'end' },
  { texto: 'Santa Apolonia', punto: L.santaApolonia, dx: -22, dy: 12, ancla: 'end' },
  { texto: 'Estadio', punto: L.estadio, dx: 12, dy: -10, ancla: 'start' },
  { texto: 'UNC', punto: L.unc, dx: 12, dy: 6, ancla: 'start' },
  { texto: 'Baños del Inca', punto: L.banos, dx: -24, dy: -22, ancla: 'end' },
  { texto: 'Av. Independencia', punto: [404, 560], dx: 0, dy: 0, ancla: 'start' },
  { texto: 'Carretera a Baños del Inca', punto: [760, 412], dx: 0, dy: 0, ancla: 'middle' },
] as const;

/* ---------- De SVG a longitud y latitud ---------- */

const { lon0, lat0, cos, escala } = mapa.proyeccion;

export const aLonLat = ([x, y]: number[]): [number, number] => [
  +(x / (cos * escala) + lon0).toFixed(6),
  +(lat0 - y / escala).toFixed(6),
];

/** Lee un trazo con M, L y Q y devuelve sus líneas como listas de puntos SVG. */
export function lineasDeTrazo(d: string): number[][][] {
  const lineas: number[][][] = [];
  const fichas = d.match(/[MLQ]|-?\d+(?:\.\d+)?/g) ?? [];
  let comando = 'M';
  let actual: number[][] = [];
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
      // Curva cuadrática: se muestrea en 16 tramos
      const [x0, y0] = actual[actual.length - 1];
      const cx = num();
      const cy = num();
      const x1 = num();
      const y1 = num();
      for (let k = 1; k <= 16; k++) {
        const t = k / 16;
        const u = 1 - t;
        actual.push([u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1]);
      }
    }
  }
  if (actual.length > 1) lineas.push(actual);
  return lineas;
}

/** GeoJSON de las rutas y los sellos, para el mapa 3D. */
export function geojsonRecorridos() {
  const rutas = diasMapa.flatMap((d) =>
    (
      [
        ['exacta', d.exacto],
        ['aprox', d.aprox],
      ] as const
    )
      .filter(([, trazo]) => trazo)
      .map(([tipo, trazo]) => ({
        type: 'Feature' as const,
        properties: { dia: d.id, tipo, color: d.hex },
        geometry: {
          type: 'MultiLineString' as const,
          coordinates: lineasDeTrazo(trazo).map((linea) => linea.map(aLonLat)),
        },
      })),
  );
  const sellos = diasMapa.map((d) => ({
    type: 'Feature' as const,
    properties: { dia: d.id, corto: d.corto, color: d.hex, titulo: `${d.dia}: ${d.titulo}` },
    geometry: { type: 'Point' as const, coordinates: aLonLat(d.marca) },
  }));
  const lugares = etiquetasMapa
    .filter((e) => e.dx !== 0 || e.dy !== 0)
    .map((e) => ({
      type: 'Feature' as const,
      properties: { nombre: e.texto },
      geometry: { type: 'Point' as const, coordinates: aLonLat(e.punto as unknown as number[]) },
    }));
  return { type: 'FeatureCollection' as const, features: [...rutas, ...sellos, ...lugares] };
}
