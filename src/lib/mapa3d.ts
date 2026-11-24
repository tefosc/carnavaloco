/**
 * Mapa 3D de los recorridos con MapLibre. Se carga solo cuando alguien toca
 * "Ver en 3D": así nadie descarga la librería si no la usa.
 *
 * Datos: calles y edificios de OpenFreeMap (OpenStreetMap), relieve de
 * Mapterhorn y rutas propias (/mapa/recorridos.geojson). Ninguno pide clave.
 */
import { Map, Marker, NavigationControl, LngLatBounds, setWorkerUrl, type StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

setWorkerUrl(workerUrl);

const C = {
  tinta: '#13185a',
  fondo: '#0f1450',
  azul: '#1d2fd0',
  turquesa: '#00b8c8',
  fucsia: '#ff2a92',
  blanco: '#ffffff',
};

type Coleccion = GeoJSON.FeatureCollection<GeoJSON.Geometry, Record<string, string>>;

const RELIEVE = {
  type: 'raster-dem' as const,
  tiles: ['https://tiles.mapterhorn.com/{z}/{x}/{y}.webp'],
  encoding: 'terrarium' as const,
  tileSize: 512,
  // En Cajamarca, Mapterhorn llega hasta el nivel 12; más cerca se amplían esas teselas
  maxzoom: 12,
  attribution: '<a href="https://mapterhorn.com/attribution">© Mapterhorn</a>',
};

function estilo(rutas: Coleccion): StyleSpecification {
  const soloRutas: Coleccion = {
    type: 'FeatureCollection',
    features: rutas.features.filter((f) => f.geometry.type !== 'Point'),
  };
  return {
    version: 8,
    sources: {
      calles: {
        type: 'vector',
        url: 'https://tiles.openfreemap.org/planet',
        attribution:
          '<a href="https://openfreemap.org">OpenFreeMap</a> <a href="https://www.openmaptiles.org/">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright">© colaboradores de OpenStreetMap</a>',
      },
      relieve: RELIEVE,
      // Fuente aparte para el sombreado, como recomienda MapLibre
      sombras: { ...RELIEVE },
      recorridos: { type: 'geojson', data: soloRutas },
    },
    terrain: { source: 'relieve', exaggeration: 1.5 },
    sky: {
      'sky-color': C.tinta,
      'horizon-color': C.fucsia,
      'fog-color': C.fondo,
      'sky-horizon-blend': 0.55,
      'horizon-fog-blend': 0.6,
      'fog-ground-blend': 0.75,
    },
    layers: [
      { id: 'fondo', type: 'background', paint: { 'background-color': C.fondo } },
      {
        id: 'sombras',
        type: 'hillshade',
        source: 'sombras',
        paint: {
          'hillshade-shadow-color': '#05072a',
          'hillshade-highlight-color': '#3a46b8',
          'hillshade-accent-color': '#1d2370',
          'hillshade-exaggeration': 0.6,
        },
      },
      {
        id: 'agua',
        type: 'fill',
        source: 'calles',
        'source-layer': 'water',
        paint: { 'fill-color': C.turquesa, 'fill-opacity': 0.35 },
      },
      {
        id: 'rios',
        type: 'line',
        source: 'calles',
        'source-layer': 'waterway',
        paint: { 'line-color': C.turquesa, 'line-opacity': 0.55, 'line-width': 1.4 },
      },
      {
        id: 'calles-menores',
        type: 'line',
        source: 'calles',
        'source-layer': 'transportation',
        filter: ['in', ['get', 'class'], ['literal', ['minor', 'service', 'track']]],
        paint: {
          'line-color': C.blanco,
          'line-opacity': 0.22,
          'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0.4, 16, 2],
        },
      },
      {
        id: 'calles-mayores',
        type: 'line',
        source: 'calles',
        'source-layer': 'transportation',
        filter: ['in', ['get', 'class'], ['literal', ['motorway', 'trunk', 'primary', 'secondary', 'tertiary']]],
        paint: {
          'line-color': C.blanco,
          'line-opacity': 0.5,
          'line-width': ['interpolate', ['linear'], ['zoom'], 11, 0.8, 16, 4],
        },
      },
      {
        id: 'edificios',
        type: 'fill-extrusion',
        source: 'calles',
        'source-layer': 'building',
        minzoom: 14,
        filter: ['!', ['has', 'hide_3d']],
        paint: {
          'fill-extrusion-color': C.azul,
          'fill-extrusion-opacity': 0.85,
          'fill-extrusion-base': ['get', 'render_min_height'],
          'fill-extrusion-height': ['get', 'render_height'],
        },
      },
      {
        id: 'rutas-aprox',
        type: 'line',
        source: 'recorridos',
        filter: ['==', ['get', 'tipo'], 'aprox'],
        layout: { 'line-cap': 'round' },
        paint: {
          'line-color': ['get', 'color'],
          'line-width': ['interpolate', ['linear'], ['zoom'], 11, 2.5, 16, 7],
          'line-dasharray': [1.4, 1.2],
        },
      },
      {
        id: 'rutas-borde',
        type: 'line',
        source: 'recorridos',
        filter: ['==', ['get', 'tipo'], 'exacta'],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': C.tinta, 'line-width': ['interpolate', ['linear'], ['zoom'], 11, 6, 16, 14] },
      },
      {
        id: 'rutas',
        type: 'line',
        source: 'recorridos',
        filter: ['==', ['get', 'tipo'], 'exacta'],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': ['get', 'color'], 'line-width': ['interpolate', ['linear'], ['zoom'], 11, 3.5, 16, 9] },
      },
    ],
  };
}

export interface Mapa3D {
  recorrer: (dia: string) => void;
  vistaGeneral: () => void;
  cerrar: () => void;
}

/** Encuadre de las rutas de un día (o de todas, con dia = null), incluidos sus sellos. */
function limitesDe(rutas: Coleccion, dia: string | null) {
  const limites = new LngLatBounds();
  for (const f of rutas.features) {
    if (dia ? f.properties.dia !== dia : !f.properties.dia) continue;
    if (f.geometry.type === 'MultiLineString') f.geometry.coordinates.flat().forEach((c) => limites.extend(c as [number, number]));
    if (f.geometry.type === 'Point') limites.extend(f.geometry.coordinates as [number, number]);
  }
  return limites;
}

// La vista general encuadra todas las rutas, así cabe igual en un teléfono que en una pantalla ancha
const VISTA_GENERAL = { padding: 40, pitch: 60, bearing: -20 };
const VISTA_DIA = { padding: 70, pitch: 58, bearing: -18, maxZoom: 15.5 };

/** Un marcador HTML y lo que hace falta para saber si choca con otro. */
interface Marca {
  el: HTMLElement;
  lngLat: [number, number];
  /** Desplazamiento vertical del marcador, en píxeles. */
  dy: number;
  ancho?: number;
  alto?: number;
}

/**
 * Esconde los nombres (y sellos) que caen encima de otro ya visible.
 * El orden de la lista es la prioridad: primero los sellos, luego los lugares.
 */
function evitarChoques(mapa: Map, marcas: Marca[]) {
  const ocupado: { x0: number; x1: number; y0: number; y1: number }[] = [];
  for (const m of marcas) {
    m.ancho ??= m.el.offsetWidth;
    m.alto ??= m.el.offsetHeight;
    const p = mapa.project(m.lngLat);
    const caja = {
      x0: p.x - m.ancho / 2 - 3,
      x1: p.x + m.ancho / 2 + 3,
      y0: p.y + m.dy - m.alto / 2 - 3,
      y1: p.y + m.dy + m.alto / 2 + 3,
    };
    const choca = ocupado.some((o) => caja.x0 < o.x1 && caja.x1 > o.x0 && caja.y0 < o.y1 && caja.y1 > o.y0);
    m.el.classList.toggle('marca3d--oculta', choca);
    if (!choca) ocupado.push(caja);
  }
}

export async function abrirMapa3D(contenedor: HTMLElement, rutas: Coleccion, tranquilo: boolean): Promise<Mapa3D> {
  const todo = limitesDe(rutas, null);
  const mapa = new Map({
    container: contenedor,
    style: estilo(rutas),
    bounds: todo,
    fitBoundsOptions: VISTA_GENERAL,
    maxPitch: 80,
    minZoom: 10,
    maxBounds: [
      [-78.62, -7.24],
      [-78.38, -7.08],
    ],
    // En el teléfono se mueve con dos dedos: con uno se sigue bajando por la página
    cooperativeGestures: true,
    attributionControl: { compact: true },
  });
  mapa.addControl(new NavigationControl({ visualizePitch: true }), 'top-right');

  // Sellos de cada día y nombres de lugares, como marcadores HTML (no necesitan fuentes de mapa).
  // Los sellos van primero: tienen prioridad cuando algo se encima.
  const puntos = rutas.features.filter((f) => f.geometry.type === 'Point');
  const ordenados = [...puntos.filter((f) => f.properties.corto), ...puntos.filter((f) => !f.properties.corto)];
  const marcas: Marca[] = [];
  for (const f of ordenados) {
    const el = document.createElement('div');
    const lngLat = (f.geometry as GeoJSON.Point).coordinates as [number, number];
    // El nombre va encima del punto, sin taparlo
    const dy = f.properties.corto ? 0 : -40;
    if (f.properties.corto) {
      el.className = 'sello3d';
      el.textContent = f.properties.corto;
      el.style.setProperty('--color', f.properties.color);
      el.title = f.properties.titulo;
    } else {
      el.className = 'lugar3d';
      el.textContent = f.properties.nombre;
    }
    new Marker({ element: el, offset: [0, dy] }).setLngLat(lngLat).addTo(mapa);
    marcas.push({ el, lngLat, dy });
  }
  mapa.on('move', () => evitarChoques(mapa, marcas));

  // Un error de una tesela suelta no cancela el mapa; solo se rinde si no carga a tiempo
  await new Promise<void>((resolver, rechazar) => {
    const espera = window.setTimeout(() => {
      mapa.remove();
      rechazar(new Error('El mapa 3D no cargó a tiempo'));
    }, 25_000);
    mapa.once('load', () => {
      window.clearTimeout(espera);
      resolver();
    });
  });

  evitarChoques(mapa, marcas);
  const duracion = tranquilo ? 0 : 2400;

  return {
    recorrer(dia) {
      const limites = limitesDe(rutas, dia);
      if (limites.isEmpty()) return;
      mapa.fitBounds(limites, { ...VISTA_DIA, duration: duracion });
    },
    vistaGeneral() {
      mapa.fitBounds(todo, { ...VISTA_GENERAL, duration: duracion });
    },
    cerrar() {
      mapa.remove();
    },
  };
}
