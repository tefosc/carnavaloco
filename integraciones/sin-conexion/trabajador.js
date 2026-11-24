/**
 * Service worker del sitio: guarda la web en el teléfono para que se abra sin señal
 * (en el corso, con la multitud, el celular se queda sin datos).
 *
 * Es una plantilla: al terminar el build, integraciones/sin-conexion/index.mjs
 * reemplaza VERSION y GUARDAR_AL_INSTALAR con los archivos reales y escribe /sw.js.
 *
 * - Páginas: primero la red (para ver lo último); si tarda o no hay, lo guardado.
 * - Archivos de /_astro/ (llevan hash, nunca cambian): primero lo guardado.
 * - Lo de otros dominios (teselas del mapa 3D, analítica) no pasa por aquí.
 */

const VERSION = '__VERSION__';
/** Páginas, estilos, scripts y letras: se guardan al instalar. */
const GUARDAR_AL_INSTALAR = [/*__GUARDAR_AL_INSTALAR__*/];

const NUCLEO = `carnaval-${VERSION}`;
/** Fotos y demás archivos que se van viendo. */
const VISTOS = 'carnaval-vistos';
const MAX_VISTOS = 80;
/** Si la red tarda más que esto en dar la página, se muestra la guardada. */
const ESPERA_RED_MS = 3500;
const SIN_CONEXION = '/sin-conexion/';

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    (async () => {
      const cache = await caches.open(NUCLEO);
      // cache: 'reload' para no guardar copias viejas del caché HTTP
      await cache.addAll(GUARDAR_AL_INSTALAR.map((url) => new Request(url, { cache: 'reload' })));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    (async () => {
      const nombres = await caches.keys();
      await Promise.all(
        nombres.filter((n) => n.startsWith('carnaval-') && n !== NUCLEO && n !== VISTOS).map((n) => caches.delete(n)),
      );
      // La página se pide a la red mientras el worker arranca
      await self.registration.navigationPreload?.enable();
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (evento) => {
  const { request } = evento;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith('/_vercel/')) return;

  if (request.mode === 'navigate') {
    evento.respondWith(pagina(evento, url));
  } else if (url.pathname.startsWith('/_astro/')) {
    evento.respondWith(primeroLoGuardado(request));
  } else {
    evento.respondWith(primeroLaRed(request));
  }
});

/** Clave de una página en el caché: sin ?fecha= ni ?dia=, y con barra final. */
function clavePagina(url) {
  const ruta = url.pathname.endsWith('/') || url.pathname.includes('.') ? url.pathname : `${url.pathname}/`;
  return new URL(ruta, url.origin).href;
}

async function pagina(evento, url) {
  const cache = await caches.open(NUCLEO);
  const clave = clavePagina(url);

  const red = (async () => {
    const respuesta = (await evento.preloadResponse) ?? (await fetch(evento.request));
    // Una redirección no se puede servir después como página: no se guarda
    if (respuesta.ok && !respuesta.redirected) await cache.put(clave, respuesta.clone());
    return respuesta;
  })();
  // Si al final nadie la espera, que el error no quede suelto
  red.catch(() => {});

  const guardada = await cache.match(clave, BUSQUEDA);
  if (!guardada) {
    try {
      return await red;
    } catch {
      return (await cache.match(SIN_CONEXION, BUSQUEDA)) ?? Response.error();
    }
  }

  // Hay copia: se espera a la red un rato y, si no llega, va la copia
  // (la red sigue en segundo plano y deja la copia al día para la próxima vez)
  evento.waitUntil(red.then(() => {}, () => {}));
  const tarde = new Promise((resolver) => setTimeout(resolver, ESPERA_RED_MS, null));
  try {
    const primera = await Promise.race([red, tarde]);
    return primera ?? guardada;
  } catch {
    return guardada;
  }
}

/**
 * ignoreVary: los servidores responden «Vary: Origin», y el navegador pide los scripts
 * y las letras con cabecera Origin; sin esto, lo guardado al instalar nunca coincide.
 * Los archivos de /_astro/ llevan hash en el nombre: la URL basta para saber cuál es.
 */
const BUSQUEDA = { ignoreVary: true };

async function primeroLoGuardado(request) {
  const guardada = await caches.match(request, BUSQUEDA);
  if (guardada) return guardada;
  const respuesta = await fetch(request);
  if (respuesta.ok) {
    const cache = await caches.open(VISTOS);
    await cache.put(request, respuesta.clone());
    recortar(cache);
  }
  return respuesta;
}

async function primeroLaRed(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const guardada = await caches.match(request, { ...BUSQUEDA, ignoreSearch: true });
    if (guardada) return guardada;
    throw error;
  }
}

/** Los archivos vistos no crecen sin fin: se borran los más viejos. */
async function recortar(cache) {
  const claves = await cache.keys();
  await Promise.all(claves.slice(0, Math.max(0, claves.length - MAX_VISTOS)).map((c) => cache.delete(c)));
}
