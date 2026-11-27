import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { imagenOg, type DatosOg } from '../../lib/og';
import { ogPaginas } from '../../data/og';
import { barrios } from '../../data/barrios';

export const getStaticPaths = (async () => {
  const ediciones = (await getCollection('ediciones')).map((e) => e.data);
  const porEdicion = ediciones.flatMap((e) => [
    {
      params: { clave: `edicion-${e.anio}` },
      props: {
        titulo: String(e.anio),
        bajada: e.nombre ?? (e.estado === 'suspendido' ? 'Un febrero sin carnaval.' : 'Reinas, cifras y lo que pasó ese año.'),
        fondo: e.color,
        relleno: e.color === 'amarillo' ? 'fucsia' : 'blanco',
        sello: e.estado === 'suspendido' ? 'Suspendido' : undefined,
      } satisfies DatosOg,
    },
    {
      params: { clave: `en-edicion-${e.anio}` },
      props: {
        titulo: String(e.anio),
        bajada: e.en?.nombre ?? (e.estado === 'suspendido' ? 'A February without carnival.' : 'Queens, numbers, and what happened that year.'),
        fondo: e.color,
        relleno: e.color === 'amarillo' ? 'fucsia' : 'blanco',
        sello: e.estado === 'suspendido' ? 'Cancelled' : undefined,
      } satisfies DatosOg,
    },
  ]);
  const porBarrio = barrios.flatMap((b) => [
    {
      params: { clave: `barrio-${b.id}` },
      props: {
        titulo: b.nombre,
        bajada: b.apodo ?? b.lema ?? 'Un barrio del Carnaval de Cajamarca.',
        fondo: b.color,
        relleno: b.color === 'amarillo' ? 'fucsia' : 'blanco',
        sello: b.sector ? `Sector ${b.sector}` : undefined,
      } satisfies DatosOg,
    },
    {
      params: { clave: `en-barrio-${b.id}` },
      props: {
        titulo: b.nombre,
        bajada: b.en?.apodo ?? b.en?.lemaGlosa ?? 'A neighborhood of Carnaval de Cajamarca.',
        fondo: b.color,
        relleno: b.color === 'amarillo' ? 'fucsia' : 'blanco',
        sello: b.sector ? `Sector ${b.sector}` : undefined,
      } satisfies DatosOg,
    },
  ]);
  const paginas = Object.entries(ogPaginas).map(([clave, datos]) => ({ params: { clave }, props: datos }));
  return [...paginas, ...porEdicion, ...porBarrio];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await imagenOg(props as DatosOg);
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
