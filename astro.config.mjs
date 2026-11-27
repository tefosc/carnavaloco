// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sinConexion from './integraciones/sin-conexion/index.mjs';

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
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (pagina) =>
        !pagina.includes('/404') &&
        !pagina.includes('/sin-conexion') &&
        !pagina.includes('/en/offline'),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-PE',
          en: 'en',
        },
      },
    }),
    // Escribe /sw.js para usar la web sin señal
    sinConexion(),
  ],
  vite: {
    // MapLibre (mapa 3D) pesa ~1 MB, pero se carga solo al tocar «Ver en 3D»
    build: { chunkSizeWarningLimit: 1200 },
  },
});
