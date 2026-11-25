import { strict as assert } from 'node:assert';
import { once } from 'node:events';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sinConexion from '../integraciones/sin-conexion/index.mjs';

const tipos = {
  '.css': 'text/css',
  '.geojson': 'application/geo+json',
  '.html': 'text/html; charset=utf-8',
  '.ics': 'text/calendar; charset=utf-8',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

test('instalación automática, uso sin señal y actualización completa después de un fallo', { timeout: 120_000 }, async (t) => {
  const base = resolve('dist');
  const trabajador = await readFile(join(base, 'sw.js'), 'utf8');
  const fotosLigeras = JSON.parse(trabajador.match(/const FOTOS_LIGERAS = (\{[\s\S]*?\});/)[1]);
  const fotoGrande = Object.keys(fotosLigeras)[0];
  assert.ok(fotoGrande);
  const nueva = await mkdtemp(join(tmpdir(), 'carnavaloco-prueba-'));
  t.after(() => rm(nueva, { recursive: true, force: true }));
  await cp(base, nueva, { recursive: true });
  await writeFile(join(nueva, 'novedad.json'), '{"nueva":true}');
  await mkdir(join(nueva, 'novedad'));
  await writeFile(join(nueva, 'novedad', 'index.html'), '<!doctype html><h1>Página nueva</h1>');
  await sinConexion().hooks['astro:build:done']({
    dir: pathToFileURL(nueva),
    logger: { info() {} },
  });
  const trabajadorNuevo = await readFile(join(nueva, 'sw.js'), 'utf8');
  assert.ok(trabajadorNuevo.includes('"/novedad/"'));
  const versionNueva = trabajadorNuevo.match(/const VERSION = "([^"]+)"/)[1];

  let edicion = base;
  let sinRed = false;
  let corteActualizacion = false;
  const actualizacionInterrumpida = Promise.withResolvers();
  const servidor = createServer(async (peticion, respuesta) => {
    if (sinRed) {
      respuesta.destroy();
      return;
    }
    const ruta = decodeURIComponent(new URL(peticion.url, 'http://localhost').pathname);
    if (ruta === '/2027/') {
      respuesta.writeHead(308, { location: '/2027' }).end();
      return;
    }
    if (ruta === '/novedad.json' && corteActualizacion) {
      actualizacionInterrumpida.resolve();
      respuesta.writeHead(503).end();
      return;
    }
    const archivo = extname(ruta) ? ruta : join(ruta, 'index.html');
    try {
      const cuerpo = await readFile(join(edicion, archivo));
      respuesta.writeHead(200, {
        'cache-control': 'no-store',
        'content-type': tipos[extname(archivo)] ?? 'application/octet-stream',
      }).end(cuerpo);
    } catch {
      respuesta.writeHead(404).end();
    }
  });
  servidor.listen(0, '127.0.0.1');
  await once(servidor, 'listening');
  t.after(() => { servidor.closeAllConnections(); servidor.close(); });
  const origen = 'http://127.0.0.1:' + servidor.address().port;

  const navegador = await chromium.launch({
    channel: process.env.CARNAVAL_BROWSER_CHANNEL,
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });
  t.after(() => navegador.close());
  const contexto = await navegador.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  });
  contexto.setDefaultTimeout(15_000);
  await contexto.route((url) => url.origin !== origen, (ruta) => ruta.abort());
  let pagina = await contexto.newPage();
  await pagina.goto(origen);
  await pagina.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
  const cacheAnterior = await pagina.evaluate(async () => (await caches.keys()).find((n) => n.startsWith('carnaval-edicion-')));
  assert.ok(cacheAnterior);

  await pagina.close();
  sinRed = true;
  await contexto.setOffline(true);
  pagina = await contexto.newPage();
  await pagina.goto(origen + '/?fecha=2027-02-05');
  const ingreso = pagina.locator('[data-evento="ingreso"]');
  await ingreso.getByRole('timer').getByText('día', { exact: true }).waitFor();
  assert.equal(await ingreso.locator('[data-unidad="dias"]').textContent(), '1');
  await pagina.goto(origen + '/?fecha=2027-02-06');
  await ingreso.getByText('Hoy', { exact: true }).waitFor();
  const banderolas = pagina.locator('[data-banderolas]');
  assert.equal(await banderolas.getByRole('listitem').count(), 5);
  await banderolas.getByRole('heading', { name: /Gran Corso/i }).waitFor();
  await pagina.goto(origen + '/ediciones/2025/');
  await pagina.getByRole('link', { name: 'Fuentes de la edición 2025' }).click();
  await pagina.getByRole('heading', { name: 'Fuentes y créditos', level: 1 }).waitFor();
  await pagina.locator('#edicion-2025[open] .referencias a').first().waitFor();
  await pagina.goto(origen + '/barrios/san-sebastian?fecha=2027-07-14');
  await pagina.getByRole('heading', { level: 1, name: /San Sebasti/i }).waitFor();
  await pagina.locator('a[href^="https://wa.me/"]:visible').first().click();
  assert.match(await pagina.locator('[data-sin-red]').textContent(), /Borrador guardado/);

  await pagina.goto(origen + '/2027/');
  await pagina.getByText('Listo para usar sin señal.', { exact: true }).waitFor();
  await pagina.locator('[data-mapa-plano]').waitFor();
  const [calendario, fotoCoincide] = await pagina.evaluate(async ([grande, ligera]) => {
    const [calendario, foto, referencia] = await Promise.all([
      fetch('/carnaval-2027.ics'), fetch(grande), fetch(ligera),
    ]);
    const [bytes, esperados] = await Promise.all([foto.bytes(), referencia.bytes()]);
    return [await calendario.text(), foto.ok && bytes.length === esperados.length &&
      bytes.every((byte, i) => byte === esperados[i])];
  }, [fotoGrande, fotosLigeras[fotoGrande]]);
  assert.match(calendario, /BEGIN:VCALENDAR/);
  assert.ok(fotoCoincide);

  t.diagnostic('Barrio, borrador, calendario y foto verificados sin red.');
  const descargaCalendario = pagina.waitForEvent('download');
  await pagina.getByRole('link', { name: 'Descargar calendario' }).click();
  assert.match((await descargaCalendario).suggestedFilename(), /\.ics$/);
  t.diagnostic('Descarga del calendario verificada.');
  await pagina.locator('[data-ver-3d]').click();
  await pagina.getByText(/Vista inclinada con las calles y recorridos guardados/).waitFor();
  await pagina.locator('[data-dia]').first().click();
  await pagina.locator('[data-ver-plano]').click();
  await pagina.locator('[data-mapa-plano]').waitFor();

  t.diagnostic('Vista inclinada y mapa plano verificados.');
  await pagina.goto(origen + '/coplas/');
  await pagina.locator('[data-verso="0"]').fill('Canta alegre Cajamarca');
  await pagina.locator('[data-verso="1"]').fill('Hoy florece el carnaval');
  await pagina.locator('[data-verso="2"]').fill('Ya se escucha la comparsa');
  await pagina.locator('[data-verso="3"]').fill('Por las calles de mi hogar');
  const afiche = pagina.waitForEvent('download');
  await pagina.locator('[data-descargar]').click();
  assert.equal((await afiche).suggestedFilename(), 'copla-carnaval-cajamarca.png');
  await pagina.reload();
  assert.equal(await pagina.locator('[data-verso="0"]').inputValue(), 'Canta alegre Cajamarca');
  assert.equal(await pagina.locator('[data-borradores-whatsapp] li').count(), 1);

  t.diagnostic('Afiche y copla guardada verificados.');

  edicion = nueva;
  corteActualizacion = true;
  sinRed = false;
  await contexto.setOffline(false);
  await Promise.all([
    pagina.evaluate(async () => await (await navigator.serviceWorker.ready).update()),
    actualizacionInterrumpida.promise,
  ]);
  await pagina.waitForFunction(async () => {
    const registro = await navigator.serviceWorker.ready;
    return !registro.installing && !registro.waiting && (await caches.keys()).filter((n) => n.startsWith('carnaval-edicion-')).length === 1;
  });
  assert.deepEqual(await pagina.evaluate(() => caches.keys()), [cacheAnterior]);
  await pagina.locator('[data-borradores-whatsapp] a').waitFor();
  t.diagnostic('La edición anterior se conservó tras el fallo de actualización.');

  sinRed = true;
  await contexto.setOffline(true);
  await pagina.goto(origen + '/ediciones/2026/');
  await pagina.getByRole('heading', { level: 1, name: /2026/ }).waitFor();

  await pagina.goto(origen + '/');
  await pagina.evaluate(() => { window.name = 'portada-abierta'; });
  await writeFile(join(nueva, 'index.html'), '<!doctype html><title>Portada actualizada</title><h1>Portada actualizada</h1>');
  corteActualizacion = false;
  sinRed = false;
  await contexto.setOffline(false);
  await pagina.evaluate(async () => await (await navigator.serviceWorker.ready).update());
  await pagina.getByRole('heading', { name: 'Portada actualizada' }).waitFor();
  assert.equal(await pagina.evaluate(() => window.name), 'portada-abierta');
  const guardadas = await pagina.evaluate(() => caches.keys());
  assert.ok(guardadas.includes('carnaval-edicion-' + versionNueva));
  assert.ok(guardadas.includes(cacheAnterior));
  sinRed = true;
  await contexto.setOffline(true);
  await pagina.goto(origen + '/novedad/');
  await pagina.getByRole('heading', { name: 'Página nueva' }).waitFor();
  assert.deepEqual(await pagina.evaluate(async () => (await fetch('/novedad.json')).json()), { nueva: true });
  t.diagnostic('Página y datos nuevos disponibles sin red después de actualizar.');
});
