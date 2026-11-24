import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { imagenOg, type DatosOg } from '../../lib/og';
import { ogPaginas } from '../../data/og';

export const getStaticPaths = (async () => {
  const ediciones = (await getCollection('ediciones')).map((e) => e.data);
  const porEdicion = ediciones.map((e) => ({
    params: { clave: `edicion-${e.anio}` },
    props: {
      titulo: String(e.anio),
      bajada: e.nombre ?? (e.estado === 'suspendido' ? 'Un febrero sin carnaval.' : 'Reinas, cifras y lo que pasó ese año.'),
      fondo: e.color,
      relleno: e.color === 'amarillo' ? 'fucsia' : 'blanco',
      sello: e.estado === 'suspendido' ? 'Suspendido' : undefined,
    } satisfies DatosOg,
  }));
  const paginas = Object.entries(ogPaginas).map(([clave, datos]) => ({ params: { clave }, props: datos }));
  return [...paginas, ...porEdicion];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await imagenOg(props as DatosOg);
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
