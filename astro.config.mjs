// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio del sitio, para el sitemap y las imágenes al compartir.
// En Vercel, VERCEL_PROJECT_PRODUCTION_URL trae el dominio de producción (sin https://).
// SITIO_URL permite fijarlo a mano, por ejemplo con un dominio propio.
const dominio =
  process.env.SITIO_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321');

// https://astro.build/config
export default defineConfig({
  site: dominio,
  integrations: [sitemap({ filter: (pagina) => !pagina.includes('/404') })],
  vite: {
    // MapLibre (mapa 3D) pesa ~1 MB, pero se carga solo al tocar «Ver en 3D»
    build: { chunkSizeWarningLimit: 1200 },
  },
});
