import type { APIRoute } from 'astro';
import { geojsonRecorridos } from '../../data/recorridos';

/** Rutas y sellos del carnaval en GeoJSON, para el mapa 3D. Se genera en el build. */
export const GET: APIRoute = () =>
  new Response(JSON.stringify(geojsonRecorridos()), {
    headers: { 'Content-Type': 'application/geo+json; charset=utf-8' },
  });
