import type { APIRoute } from 'astro';
import mapa from '../../data/mapa.json';
import { aLonLat, lineasDeTrazo } from '../../data/recorridos';

export const GET: APIRoute = () => {
  const categorias = ['menores', 'mayores', 'rios'] as const;
  const features = categorias.flatMap((tipo) =>
    lineasDeTrazo(mapa[tipo]).map((puntos) => ({
      type: 'Feature',
      properties: { tipo },
      geometry: { type: 'LineString', coordinates: puntos.map(aLonLat) },
    })),
  );
  return new Response(JSON.stringify({ type: 'FeatureCollection', features }), {
    headers: { 'Content-Type': 'application/geo+json; charset=utf-8' },
  });
};
