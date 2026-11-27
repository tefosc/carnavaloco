import type { APIRoute } from 'astro';
import { geojsonRecorridos } from '../../../data/recorridos';

/** Parade routes and day stamps in GeoJSON (English), for the 3D map. Generated at build time. */
export const GET: APIRoute = () =>
  new Response(JSON.stringify(geojsonRecorridos('en')), {
    headers: { 'Content-Type': 'application/geo+json; charset=utf-8' },
  });
