import {
  Map,
  Marker,
  NavigationControl,
  LngLatBounds,
  setWorkerUrl,
  type GeoJSONSource,
  type LayerSpecification,
  type StyleSpecification,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

import { t, type Idioma } from '../i18n';

setWorkerUrl(workerUrl);

const C = {
  tinta: '#13185a',
  turquesa: '#00b8c8',
  blanco: '#ffffff',
  // Azul noche casi petróleo para el terreno: sin rojo, para que no se vea violeta
  fondo: '#0a1a36',
  cielo: '#07122a',
  horizonte: '#1d6a84',
  sombra: '#030a1a',
  luz: '#2d5a86',
  acento: '#0f2647',
  edificios: '#2a5b96',
};

interface Propiedades {
  dia?: string;
  tipo?: 'exacta' | 'aprox';
  color?: string;
  orden?: number;
  corto?: string;
  titulo?: string;
  nombre?: string;
}
type Rasgo = GeoJSON.Feature<GeoJSON.Geometry, Propiedades>;
type Coleccion = GeoJSON.FeatureCollection<GeoJSON.Geometry, Propiedades>;
type Coordenada = [number, number];

const RELIEVE = {
  type: 'raster-dem' as const,
  tiles: ['https://tiles.mapterhorn.com/{z}/{x}/{y}.webp'],
  encoding: 'terrarium' as const,
  tileSize: 512,
  // En Cajamarca, Mapterhorn llega hasta el nivel 12; más cerca se amplían esas teselas
  maxzoom: 12,
  attribution: '<a href="https://mapterhorn.com/attribution">© Mapterhorn</a>',
};

const vacio = (): Coleccion => ({ type: 'FeatureCollection', features: [] });

/** Las tres capas de una ruta: punteado para lo aproximado y trazo con borde para lo real. */
function capasDeRuta(prefijo: string, fuente: string): LayerSpecification[] {
  return [
    {
      id: `${prefijo}-aprox`,
      type: 'line',
      source: fuente,
      filter: ['==', ['get', 'tipo'], 'aprox'],
      layout: { 'line-cap': 'round' },
      paint: {
        'line-color': ['get', 'color'],
        'line-width': ['interpolate', ['linear'], ['zoom'], 11, 2.5, 16, 7],
        'line-dasharray': [1.4, 1.2],
      },
    },
    {
      id: `${prefijo}-borde`,
      type: 'line',
      source: fuente,
      filter: ['==', ['get', 'tipo'], 'exacta'],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': C.tinta, 'line-width': ['interpolate', ['linear'], ['zoom'], 11, 6, 16, 14] },
    },
    {
      id: prefijo,
      type: 'line',
      source: fuente,
      filter: ['==', ['get', 'tipo'], 'exacta'],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': ['get', 'color'], 'line-width': ['interpolate', ['linear'], ['zoom'], 11, 3.5, 16, 9] },
    },
  ];
}

function estilo(lineas: Coleccion, creditoOsm: string): StyleSpecification {
  return {
    version: 8,
    sources: {
      calles: {
        type: 'vector',
        url: 'https://tiles.openfreemap.org/planet',
        attribution:
          `<a href="https://openfreemap.org">OpenFreeMap</a> <a href="https://www.openmaptiles.org/">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright">${creditoOsm}</a>`,
      },
      relieve: RELIEVE,
      // Fuente aparte para el sombreado, como recomienda MapLibre
      sombras: { ...RELIEVE },
      recorridos: { type: 'geojson', data: lineas },
      // La ruta elegida, que se va dibujando desde donde sale
      elegida: { type: 'geojson', data: vacio() },
    },
    terrain: { source: 'relieve', exaggeration: 1.5 },
    sky: {
      'sky-color': C.cielo,
      'horizon-color': C.horizonte,
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
          'hillshade-shadow-color': C.sombra,
          'hillshade-highlight-color': C.luz,
          'hillshade-accent-color': C.acento,
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
          'fill-extrusion-color': C.edificios,
          'fill-extrusion-opacity': 0.85,
          'fill-extrusion-base': ['get', 'render_min_height'],
          'fill-extrusion-height': ['get', 'render_height'],
        },
      },
      ...capasDeRuta('rutas', 'recorridos'),
      ...capasDeRuta('elegida', 'elegida'),
    ],
  };
}

export interface Mapa3D {
  /** Va al recorrido de un día y lo dibuja desde donde sale. */
  recorrer: (dia: string) => void;
  /** Vuelve a mostrar todas las rutas. */
  vistaGeneral: () => void;
  cerrar: () => void;
}

/** Encuadre de las rutas de un día (o de todas, con dia = null), incluidos sus sellos. */
function limitesDe(rasgos: Rasgo[], dia: string | null) {
  const limites = new LngLatBounds();
  for (const f of rasgos) {
    if (dia ? f.properties.dia !== dia : !f.properties.dia) continue;
    if (f.geometry.type === 'LineString') f.geometry.coordinates.forEach((c) => limites.extend(c as Coordenada));
    if (f.geometry.type === 'Point') limites.extend(f.geometry.coordinates as Coordenada);
  }
  return limites;
}

// La vista general encuadra todas las rutas, así cabe igual en un teléfono que en una pantalla ancha
const VISTA_GENERAL = { padding: 40, pitch: 60, bearing: -20 };
const VISTA_DIA = { padding: 70, pitch: 58, bearing: -18, maxZoom: 15.5 };
const VUELO = 2400;

/** Un marcador HTML y lo que hace falta para saber si choca con otro. */
interface Marca {
  el: HTMLElement;
  lngLat: Coordenada;
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
    // Un marcador escondido no ocupa lugar
    if (m.el.hidden) continue;
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

/* ---------- Dibujo de una ruta desde donde sale ---------- */

// Metros por grado cerca de Cajamarca (latitud 7° S), para medir las rutas
const M_LAT = 110_574;
const M_LON = 111_320 * Math.cos((7.16 * Math.PI) / 180);
const metros = (a: Coordenada, b: Coordenada) => Math.hypot((b[0] - a[0]) * M_LON, (b[1] - a[1]) * M_LAT);

interface TramoMedido {
  rasgo: Rasgo;
  puntos: Coordenada[];
  /** Distancia acumulada hasta cada punto, en metros. */
  acumulado: number[];
  largo: number;
}

function medir(rasgos: Rasgo[]): TramoMedido[] {
  return rasgos.map((rasgo) => {
    const puntos = (rasgo.geometry as GeoJSON.LineString).coordinates as Coordenada[];
    const acumulado = [0];
    for (let i = 1; i < puntos.length; i++) acumulado.push(acumulado[i - 1] + metros(puntos[i - 1], puntos[i]));
    return { rasgo, puntos, acumulado, largo: acumulado[acumulado.length - 1] };
  });
}

/** La parte de la ruta recorrida hasta `s` metros, y el punto donde va la cabeza. */
function cortar(tramos: TramoMedido[], s: number) {
  const rasgos: Rasgo[] = [];
  let cabeza: Coordenada = tramos[0].puntos[0];
  let inicio = 0;
  for (const t of tramos) {
    const visible = s - inicio;
    inicio += t.largo;
    if (visible <= 0) break;
    if (visible >= t.largo) {
      rasgos.push(t.rasgo);
      cabeza = t.puntos[t.puntos.length - 1];
      continue;
    }
    const i = t.acumulado.findIndex((a) => a > visible);
    const [a, b] = [t.puntos[i - 1], t.puntos[i]];
    const f = (visible - t.acumulado[i - 1]) / (t.acumulado[i] - t.acumulado[i - 1] || 1);
    cabeza = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
    rasgos.push({ ...t.rasgo, geometry: { type: 'LineString', coordinates: [...t.puntos.slice(0, i), cabeza] } });
    break;
  }
  return { rasgos, cabeza };
}

const suave = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

export async function abrirMapa3D(
  contenedor: HTMLElement,
  rutas: Coleccion,
  tranquilo: boolean,
  idioma: Idioma = 'es',
): Promise<Mapa3D> {
  const txt = t(idioma).mapa;
  const rasgos = rutas.features;
  const lineas = rasgos.filter((f) => f.geometry.type === 'LineString');
  const todo = limitesDe(rasgos, null);
  const datos: Coleccion = { type: 'FeatureCollection', features: lineas };
  const mapa = new Map({
    container: contenedor,
    style: estilo(datos, txt.creditoOsm),
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
    locale: txt.maplibre,
  });
  // Sin visualizePitch: con esa opción, la brújula también aplana el mapa (vista desde arriba)
  // y no hay botón para volver a inclinarlo. Así solo lo endereza hacia el norte.
  mapa.addControl(new NavigationControl({ visualizePitch: false }), 'top-right');

  // Sellos de cada día y nombres de lugares, como marcadores HTML (no necesitan fuentes de mapa).
  // Los sellos van primero: tienen prioridad cuando algo se encima.
  const puntos = rasgos.filter((f) => f.geometry.type === 'Point');
  const ordenados = [...puntos.filter((f) => f.properties.corto), ...puntos.filter((f) => !f.properties.corto)];
  const marcas: Marca[] = [];
  const sellos: { dia: string; el: HTMLElement }[] = [];
  for (const f of ordenados) {
    const el = document.createElement('div');
    const lngLat = (f.geometry as GeoJSON.Point).coordinates as Coordenada;
    // El nombre va encima del punto, sin taparlo
    const dy = f.properties.corto ? 0 : -40;
    if (f.properties.corto) {
      el.className = 'sello3d';
      el.textContent = f.properties.corto;
      el.style.setProperty('--color', f.properties.color ?? C.blanco);
      el.title = f.properties.titulo ?? '';
      sellos.push({ dia: f.properties.dia ?? '', el });
    } else {
      el.className = 'lugar3d';
      el.textContent = f.properties.nombre ?? '';
    }
    new Marker({ element: el, offset: [0, dy] }).setLngLat(lngLat).addTo(mapa);
    marcas.push({ el, lngLat, dy });
  }
  mapa.on('move', () => evitarChoques(mapa, marcas));

  // Punto de salida y cabeza de la ruta elegida
  const elSalida = document.createElement('div');
  elSalida.className = 'salida3d';
  const etiquetaSalida = document.createElement('span');
  etiquetaSalida.textContent = txt.sale;
  elSalida.append(etiquetaSalida);
  elSalida.hidden = true;
  const salida = new Marker({ element: elSalida }).setLngLat(lineas[0].geometry.coordinates[0] as Coordenada).addTo(mapa);
  // La salida va primero en los choques: el anillo con su cartel «Sale» encima (medidas fijas,
  // porque mientras está escondido no se puede medir)
  const marcaSalida: Marca = { el: elSalida, lngLat: salida.getLngLat().toArray() as Coordenada, dy: -16, ancho: 56, alto: 74 };
  marcas.unshift(marcaSalida);
  const elCabeza = document.createElement('div');
  elCabeza.className = 'cabeza3d';
  elCabeza.hidden = true;
  const cabeza = new Marker({ element: elCabeza }).setLngLat(salida.getLngLat()).addTo(mapa);

  // Un error de una tesela suelta no cancela el mapa; solo se rinde si no carga a tiempo
  await new Promise<void>((resolver, rechazar) => {
    const espera = window.setTimeout(() => {
      mapa.remove();
      rechazar(new Error(txt.errorTimeout3d));
    }, 25_000);
    mapa.once('load', () => {
      window.clearTimeout(espera);
      resolver();
    });
  });

  evitarChoques(mapa, marcas);
  const elegida = mapa.getSource('elegida') as GeoJSONSource;
  // Cada elección nueva corta el dibujo de la anterior
  let turno = 0;

  /** Atenúa las demás rutas; la elegida se esconde de la capa general porque se dibuja aparte. */
  function resaltar(dia: string | null) {
    const opacidad = dia ? ['case', ['==', ['get', 'dia'], dia], 0, 0.25] : 1;
    for (const capa of ['rutas-aprox', 'rutas-borde', 'rutas']) mapa.setPaintProperty(capa, 'line-opacity', opacidad);
    for (const s of sellos) s.el.classList.toggle('marca3d--tenue', dia !== null && s.dia !== dia);
    elegida.setData(vacio());
    elCabeza.hidden = true;
    elSalida.hidden = dia === null;
  }

  function dibujar(tramos: TramoMedido[], mio: number) {
    const total = tramos.reduce((s, t) => s + t.largo, 0);
    // Las rutas cortas no pasan volando y las largas no se hacen eternas
    const duracion = Math.min(4000, Math.max(1600, 1200 + total / 2));
    if (tranquilo) {
      elegida.setData({ type: 'FeatureCollection', features: tramos.map((t) => t.rasgo) });
      return;
    }
    elCabeza.hidden = false;
    const comienzo = performance.now();
    const paso = (ahora: number) => {
      if (mio !== turno) return;
      const t = Math.min(1, (ahora - comienzo) / duracion);
      const { rasgos: hechos, cabeza: punta } = cortar(tramos, suave(t) * total);
      elegida.setData({ type: 'FeatureCollection', features: hechos });
      cabeza.setLngLat(punta);
      if (t < 1) requestAnimationFrame(paso);
      else elCabeza.hidden = true;
    };
    requestAnimationFrame(paso);
  }

  return {
    recorrer(dia) {
      const mio = ++turno;
      const tramos = medir(
        lineas.filter((f) => f.properties.dia === dia).sort((a, b) => (a.properties.orden ?? 0) - (b.properties.orden ?? 0)),
      );
      if (!tramos.length) return;
      resaltar(dia);
      salida.setLngLat(tramos[0].puntos[0]);
      marcaSalida.lngLat = tramos[0].puntos[0];
      cabeza.setLngLat(tramos[0].puntos[0]);
      evitarChoques(mapa, marcas);
      // Primero llega la cámara; luego se dibuja la ruta. Si la cámara no se mueve
      // (ya estaba ahí), no hay «moveend»: el plazo de respaldo arranca el dibujo igual.
      let empezado = false;
      const empezar = () => {
        if (empezado || mio !== turno) return;
        empezado = true;
        dibujar(tramos, mio);
      };
      mapa.fitBounds(limitesDe(rasgos, dia), { ...VISTA_DIA, duration: tranquilo ? 0 : VUELO });
      // Se escucha después de arrancar el vuelo: si había otro en curso, su «moveend» ya pasó
      mapa.once('moveend', empezar);
      window.setTimeout(empezar, (tranquilo ? 0 : VUELO) + 400);
    },
    vistaGeneral() {
      turno++;
      resaltar(null);
      evitarChoques(mapa, marcas);
      mapa.fitBounds(todo, { ...VISTA_GENERAL, duration: tranquilo ? 0 : VUELO });
    },
    cerrar() {
      turno++;
      mapa.remove();
    },
  };
}
