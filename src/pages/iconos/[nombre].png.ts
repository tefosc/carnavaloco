import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { iconoSvg } from '../../lib/icono';

/** Íconos para instalar la web en el teléfono (ver manifest.webmanifest.ts). */
const iconos = {
  'icono-192': { lado: 192, escala: 0.78 },
  'icono-512': { lado: 512, escala: 0.78 },
  // «maskable»: el teléfono lo recorta en círculo o en gota; el gorro cabe en la zona segura
  'icono-mascara-512': { lado: 512, escala: 0.6 },
  // iPhone y iPad (apple-touch-icon)
  'icono-apple-180': { lado: 180, escala: 0.72 },
};

export const getStaticPaths = (() =>
  Object.keys(iconos).map((nombre) => ({ params: { nombre } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const { lado, escala } = iconos[params.nombre as keyof typeof iconos];
  const png = await sharp(Buffer.from(iconoSvg(lado, escala))).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
