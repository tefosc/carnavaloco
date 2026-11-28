export type Idioma = 'es' | 'en';

export type ClaveRuta =
  | 'inicio'
  | '2027'
  | 'guia'
  | 'la-fiesta'
  | 'ediciones'
  | 'barrios'
  | 'coplas'
  | 'habla'
  | 'historia'
  | 'fuentes'
  | 'sin-conexion';

export const RUTAS: Record<ClaveRuta, Record<Idioma, string>> = {
  inicio: { es: '/', en: '/en/' },
  '2027': { es: '/2027/', en: '/en/2027/' },
  guia: { es: '/guia/', en: '/en/guide/' },
  'la-fiesta': { es: '/la-fiesta/', en: '/en/the-festival/' },
  ediciones: { es: '/ediciones/', en: '/en/editions/' },
  barrios: { es: '/barrios/', en: '/en/neighborhoods/' },
  coplas: { es: '/coplas/', en: '/en/coplas/' },
  habla: { es: '/habla/', en: '/en/slang/' },
  historia: { es: '/historia/', en: '/en/history/' },
  fuentes: { es: '/fuentes/', en: '/en/sources/' },
  'sin-conexion': { es: '/sin-conexion/', en: '/en/offline/' },
};

/**
 * Rutas que ya tienen versión en inglés construida.
 * Se van agregando conforme avanzan las fases de traducción.
 */
export const RUTAS_EN_LISTAS = new Set<ClaveRuta>([
  'inicio',
  '2027',
  'guia',
  'la-fiesta',
  'historia',
  'ediciones',
  'barrios',
  'coplas',
  'habla',
  'fuentes',
  'sin-conexion',
]);

export function normalizarRuta(pathname: string): string {
  const conBarra = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return conBarra.endsWith('/') ? conBarra : `${conBarra}/`;
}

export function idiomaDeRuta(pathname: string): Idioma {
  const r = normalizarRuta(pathname);
  return r === '/en/' || r.startsWith('/en/') ? 'en' : 'es';
}

export function rutaDe(clave: ClaveRuta, idioma: Idioma = 'es'): string {
  return RUTAS[clave][idioma];
}

export function rutaEdicion(anio: number | string, idioma: Idioma = 'es'): string {
  return `${RUTAS.ediciones[idioma]}${anio}/`;
}

export function rutaBarrio(id: string, idioma: Idioma = 'es'): string {
  return `${RUTAS.barrios[idioma]}${id}/`;
}

export function rutaIcs(anio: number | string, idioma: Idioma = 'es'): string {
  return idioma === 'en' ? `/en/carnaval-${anio}.ics` : `/carnaval-${anio}.ics`;
}

export function rutaGeojson(idioma: Idioma = 'es'): string {
  return idioma === 'en' ? '/en/mapa/recorridos.geojson' : '/mapa/recorridos.geojson';
}

interface DestinoAlterno {
  href: string;
  /** true si existe la página equivalente exacta en el idioma destino. */
  existe: boolean;
}

/**
 * Devuelve la ruta equivalente en el idioma destino para un pathname dado.
 * Si la versión en inglés aún no está construida, apunta a `/en/` con `existe: false`.
 */
export function resolverAlterna(pathname: string, destino: Idioma): DestinoAlterno {
  const ruta = normalizarRuta(pathname);
  const origen = idiomaDeRuta(ruta);
  if (origen === destino) return { href: ruta, existe: true };

  // Rutas estáticas exactas
  for (const clave of Object.keys(RUTAS) as ClaveRuta[]) {
    if (RUTAS[clave][origen] === ruta) {
      if (destino === 'en' && !RUTAS_EN_LISTAS.has(clave)) {
        return { href: '/en/', existe: false };
      }
      return { href: RUTAS[clave][destino], existe: true };
    }
  }

  // Rutas dinámicas: ediciones/[anio]
  const prefEdicion = RUTAS.ediciones[origen];
  if (ruta.startsWith(prefEdicion)) {
    const resto = ruta.slice(prefEdicion.length);
    if (destino === 'en' && !RUTAS_EN_LISTAS.has('ediciones')) {
      return { href: '/en/', existe: false };
    }
    return { href: `${RUTAS.ediciones[destino]}${resto}`, existe: true };
  }

  // Rutas dinámicas: barrios/[id]
  const prefBarrio = RUTAS.barrios[origen];
  if (ruta.startsWith(prefBarrio)) {
    const resto = ruta.slice(prefBarrio.length);
    if (destino === 'en' && !RUTAS_EN_LISTAS.has('barrios')) {
      return { href: '/en/', existe: false };
    }
    return { href: `${RUTAS.barrios[destino]}${resto}`, existe: true };
  }

  return { href: RUTAS.inicio[destino], existe: false };
}

export function rutaAlterna(pathname: string, destino: Idioma): string {
  return resolverAlterna(pathname, destino).href;
}
