const PREFIJO = 'carnaval-edicion-';
const NUCLEO = PREFIJO + VERSION;
const BUSQUEDA = { cacheName: NUCLEO, ignoreVary: true };

self.addEventListener('install', (evento) => {
  evento.waitUntil((async () => {
    const cache = await caches.open(NUCLEO);
    try {
      await cache.addAll(GUARDAR_AL_INSTALAR.map((url) => new Request(url, { cache: 'reload' })));
    } catch (error) {
      await caches.delete(NUCLEO);
      throw error;
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil((async () => {
    const ediciones = (await caches.keys()).filter((nombre) => (
      nombre.startsWith(PREFIJO) || /^carnaval-[a-f0-9]{12}$/.test(nombre)
    ) && nombre !== NUCLEO);
    const anterior = ediciones.pop();
    await Promise.all(ediciones.map((nombre) => caches.delete(nombre)));
    await caches.delete('carnaval-vistos');

    const clientes = anterior ? await self.clients.matchAll({ type: 'window', includeUncontrolled: true }) : [];
    await self.clients.claim();
    for (const cliente of clientes) {
      const rutaCliente = new URL(cliente.url).pathname;
      if (rutaCliente === '/' || rutaCliente === '/en/') {
        void cliente.navigate(cliente.url).catch(() => {});
      }
    }
  })());
});

self.addEventListener('fetch', (evento) => {
  const { request } = evento;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/_vercel/')) return;
  evento.respondWith(responder(request, url));
});

async function responder(request, url) {
  const ruta = url.pathname;
  const navegacion = request.mode === 'navigate';
  const guardado = await caches.match(ruta, BUSQUEDA)
    ?? (navegacion && !ruta.endsWith('/') ? await caches.match(ruta + '/', BUSQUEDA) : undefined);
  if (guardado) {
    return navegacion && guardado.redirected
      ? new Response(guardado.body, { status: guardado.status, headers: guardado.headers })
      : guardado;
  }

  if (ruta.startsWith('/_astro/')) {
    const recursoAnterior = await caches.match(ruta, { ignoreVary: true });
    if (recursoAnterior) return recursoAnterior;
  }

  const fotoLigera = Object.hasOwn(FOTOS_LIGERAS, ruta) ? FOTOS_LIGERAS[ruta] : undefined;
  try {
    const respuesta = await fetch(request);
    if (!fotoLigera || respuesta.ok) return respuesta;
  } catch (error) {
    if (!navegacion && !fotoLigera) throw error;
  }
  if (fotoLigera) return (await caches.match(fotoLigera, BUSQUEDA)) ?? Response.error();
  const respaldo = ruta === '/en' || ruta.startsWith('/en/') ? '/en/offline/' : '/sin-conexion/';
  return (await caches.match(respaldo, BUSQUEDA)) ?? Response.error();
}
