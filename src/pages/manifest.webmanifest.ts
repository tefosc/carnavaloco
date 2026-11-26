import type { APIRoute } from 'astro';

/** Manifiesto para instalar la web en el teléfono como una app. */
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      // id estable: la app instalada sigue siendo la misma aunque cambie start_url
      id: '/',
      name: 'Carnaval de Cajamarca',
      short_name: 'Carnaval',
      description: 'Programa, recorridos, coplas y habla del Carnaval de Cajamarca. Funciona sin señal.',
      lang: 'es-PE',
      dir: 'ltr',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#13185a',
      theme_color: '#13185a',
      icons: [
        { src: '/iconos/icono-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/iconos/icono-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/iconos/icono-mascara-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
      shortcuts: [
        { name: 'Programa 2027', url: '/2027/' },
        { name: 'Guía para visitantes', url: '/guia/' },
        { name: 'Coplas', url: '/coplas/' },
        { name: 'Habla cajamarquina', url: '/habla/' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } },
  );
