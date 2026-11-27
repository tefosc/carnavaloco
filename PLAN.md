# Plan del sitio: qué hay y qué falta

Estado al 27 de noviembre de 2026. El carnaval 2027 es del **sábado 6 al miércoles 10 de febrero**.

Este archivo es para ponerse al día rápido. Los detalles técnicos (cómo correr el proyecto, dónde está cada dato, cómo regenerar el mapa) están en el [README](README.md).

## Para empezar

```sh
pnpm install          # dependencias (y el Node 24 que pide el proyecto)
npx skills install    # skills del asistente de IA, desde skills-lock.json
pnpm dev              # http://localhost:4321
```

**Las skills no están en el repositorio:** sus carpetas (`.claude/skills/`, `.agents/`, `.taste-skill/`) están en el `.gitignore`. Lo que sí se sube es `skills-lock.json`, con el repositorio y el commit exacto de cada una. `npx skills install` las baja en esas mismas versiones y las conecta con Claude Code. Para ver qué haría sin instalar nada: `npx skills install --dry-run`. Si usas otro asistente, `npx skills --help` muestra cómo elegirlo con `--agent`.

| Skill | Para qué se usó |
| --- | --- |
| `astro` | Cómo trabajar con Astro: páginas, componentes, colecciones de contenido |
| `frontend-design` | Dirección visual del sitio (el estilo chicha) |
| `design-taste-frontend` | Revisar que el diseño no se vea genérico |
| `web-design-guidelines` | Revisar la interfaz contra buenas prácticas (accesibilidad, formularios, foco) |
| `modern-web-guidance` | Buenas prácticas actuales de HTML, CSS y JS antes de programar (scroll, instalación, mapas) |
| `context7-cli` | Documentación al día de librerías (MapLibre, Astro) con `npx ctx7` |
| `ub-mode` | Principios para escribir y cambiar código |

Para actualizarlas a la última versión: `npx skills update -p` (cambia `skills-lock.json`; súbelo después).

---

## Lo que ya está hecho

### El sitio

- Web en Astro 7, estática, publicada en Vercel desde la rama `main`.
- La cabecera queda visible al desplazarse en escritorio y móvil. Los enlaces a secciones dejan espacio para que sus títulos queden a la vista.
- Estilo «afiche chicha + raso de clon»: colores planos del satín de los disfraces, titulares con contorno y sombra dura, bordes en zigzag, banderolas, sellos y afiches pegados.
- Páginas: inicio, **2027**, guía para visitantes, la fiesta, ediciones 2017–2026 (una página por año), barrios, coplas, habla, historia y fuentes, 404 y «sin señal».
- Fotos de Wikimedia Commons con su crédito, y una sección de fuentes con todo lo citado. En el texto no se pone «según tal medio».
- Imagen para compartir en WhatsApp y redes, distinta para cada página; sitemap, `robots.txt` y Vercel Analytics (falta activarlo en el panel, ver abajo).

### Carnaval 2027

- **Programa día por día** con hora y lugar. Las horas dicen «Por confirmar» hasta que salga el programa oficial.
- **Calendario** para agregar a Google Calendar o descargar (`.ics`).
- **«Hoy en el carnaval»**: del 6 al 10 de febrero, el inicio y `/2027/` cambian solos la cuenta regresiva por lo que toca ese día. Muestran hora, lugar y lo que viene mañana; la agenda marca el día de hoy y el mapa abre con su ruta. Para verlo antes de tiempo: `/?fecha=2027-02-08`.
- **Mapa de recorridos** sobre las calles reales de OpenStreetMap:
  - Plano en el estilo de la web: se elige un día y su ruta se dibuja desde donde sale.
  - Botón «Ver en 3D» con relieve y edificios (MapLibre), que se carga solo si alguien lo toca.

### Coplas

- Cancionero con filtro por tema. Cada verso lleva su **«bis»** (se canta dos veces).
- Juego «Completa la copla», para elegir la palabra que rima.
- **«Arma tu copla»**:
  - Cada quien escribe sus cuatro versos; un contador de sílabas avisa si rima el segundo con el cuarto y sugiere palabras que riman.
  - Se lleva la copla como **imagen en estilo chicha**, para descargar o mandar por WhatsApp.
  - Todo pasa en el teléfono: no se envía nada a ningún servidor.

### Para usar en la fiesta

- **Funciona sin señal**: con abrir la web una vez con internet, queda guardada en el teléfono. El mapa 3D queda fuera de la descarga y solo está disponible con internet (sin señal se usa el mapa plano). Si se pierde la conexión, aparece un aviso.
- **Se puede instalar como app** desde Chrome en Android, con su ícono. En el teléfono sale un botón flotante «Instalar app» abajo a la derecha, en todas las páginas (se puede cerrar con la ×; no vuelve por dos semanas), y otro en «Si vas», en `/2027/`. La lógica está en `src/lib/instalar.ts`.
- **Menú del teléfono**: botón «Menú» (hamburguesa) en la cabecera; los enlaces se abren y se cierran con él, y también con Escape. Sin JavaScript quedan a la vista.

### Pintura

- Manchas por toda la web: salpicones, manos pintadas, globos reventados, chorreados, brochazos y talco, en los bordes de cada sección. Cada una se pinta sola cuando aparece en pantalla: el salpicón revienta y suelta sus gotas, la mano se estampa, el chorreado cae.
- En la portada, «Echar pintura» o tocar el fondo deja manchas y manos.

### Historial

| Commit | Qué entró |
| --- | --- |
| `fbe7c39` | Sitio base con Astro 7 |
| `ce30d3f` | Página del Carnaval 2027, arreglos de selección y textos |
| `3bb2f18` | Arreglo de la página en blanco al alejar en el teléfono |
| `b6b3d8e` | Mapa 2D y 3D, juego de coplas, barrios, imágenes para compartir, calendario |
| `31d1523` | Recorrido por día dibujado desde su salida; ajustes del mapa 3D |
| `557c8aa` | «bis» en las coplas |
| `7cdd287` | «Hoy en el carnaval» |
| `4ca61c0` | Funciona sin señal y se instala como app |
| `03dc08a` | «Arma tu copla» |
| `43e6477` | Pintura por toda la web; datos nuevos de historia y comida |
| `cb06636` | Este plan y cómo instalar las skills |
| `fa188de` | Las manchas se pintan solas al aparecer en pantalla |

---

## Lo que falta, con fecha

### Ya

- [ ] **Activar Vercel Analytics** en el panel del proyecto (pestaña Analytics). El código ya está, pero no cuenta visitas hasta activarlo.
- [ ] **Probar en un teléfono de verdad**, en el sitio publicado:
  - [ ] Abrir la web con señal, pasar a modo avión y volver a abrirla. Debería cargar, con el aviso «Sin conexión» abajo.
  - [ ] En Chrome de Android, el botón «Instalar en el teléfono» de `/2027/` (sección «Si vas»).
  - [ ] En «Arma tu copla», «Compartir» hacia WhatsApp.
  - [ ] El mapa 3D en un celular de gama media.
- [ ] Si se usa un dominio propio, definir `SITIO_URL` en Vercel. Así las imágenes al compartir y el sitemap apuntan a ese dominio.

### Inicios de enero de 2027: sale el programa oficial

La Municipalidad Provincial de Cajamarca presenta el afiche, el programa y la canción oficial.

- [ ] En `src/data/carnaval2027.ts`, llenar la `hora` de cada día y corregir `lugar` si cambia. Poner `programaOficial` en `true`.
- [ ] Llenar las `fecha` de las actividades previas: pregón, bando, concurso de tradiciones y elección de reinas.
- [ ] **Gran Corso**: confirmar el recorrido y el sentido. Ahora se dibuja de norte a sur por la Vía de Evitamiento, pero es una suposición. Para cambiarlo, edita el punto de salida en `src/data/recorridos.ts`. Si el recorrido cambia de calles, ver «Mapa de recorridos» en el README.
- [ ] Revisar los demás recorridos: los tramos punteados del mapa son aproximados.
- [ ] **Serenata por el 173.º aniversario de Cajamarca**: carnavalcajamarca.com dice (12 de nov. de 2026) que sería el **sábado 2 de enero de 2027** en la explanada del Qhapaq Ñan, y no en la Plaza de Armas. Lo anunció el alcalde electo; no hay hora ni artistas. **No está confirmada en otra fuente** (la creación del departamento fue el 3 de enero de 1854, así que la fecha es creíble). Confirmarla con la Municipalidad o el Gobierno Regional antes de ponerla en `previas` de `src/data/carnaval2027.ts`.

### Después del carnaval (desde el 11 de febrero de 2027)

- [ ] Agregar la edición 2027 en `src/data/ediciones.json`, con lo que pasó, la reina y las cifras.
- [ ] Preparar 2028. La cuenta regresiva del inicio ya salta sola al año siguiente, pero `/2027/` y `src/data/carnaval2027.ts` son de 2027. Conviene volverlos genéricos («próximo carnaval») o copiarlos para 2028.

---

## Guía para el que viene de fuera

**Hecha (primera versión):** [`/guia/`](src/pages/guia.astro), con los datos en `src/data/guia.ts`, en el menú, enlazada desde «Si vas» en `/2027/` y con sus fuentes en `/fuentes/`. Tiene seis secciones: cómo llegar, dónde quedarse, altura y clima, qué llevar, reglas y convivencia, y emergencias. Cada dato lleva su fuente; los de fuente débil llevan el aviso «Verifícalo». Se guarda sola para usarla sin señal.

**Lo que se descubrió al investigar:**

- **No hay reglas oficiales para el visitante.** La Ordenanza 908-CMPC (octubre de 2024) y su reglamento organizan el carnaval institucional (concursos, corso, comités); no dicen nada del agua, la pintura, los globos ni el alcohol que vende o consume el público. La guía lo dice así y no inventa normas. La costumbre de la pintura solo el primer día queda marcada «Verifícalo».
- **`gob.pe` bloquea la lectura automática** (error 418, también en un navegador). Los datos de ahí (la nota del Minsa sobre el soroche, la página de teléfonos de emergencia) se tomaron de resúmenes de búsqueda y están marcados «Verifícalo».

**Pendiente de la guía:**

- [ ] **Abrir a mano en un navegador** y confirmar: [la nota del Minsa sobre mal de altura](https://www.gob.pe/institucion/minsa/noticias/1374711-minsa-recomendaciones-para-prevenir-el-mal-de-altura-durante-los-viajes-por-semana-santa) y [teléfonos de emergencia](https://www.gob.pe/547). Si coincide, quitar el «Verifícalo» (`verificar: true` en `src/data/guia.ts`).
- [ ] **Aerolíneas y buses:** los vuelos y las horas de bus salen de agregadores sin fecha. Confirmar en las webs de LATAM, JetSMART, Star Perú, SKY y de las empresas de bus (Civa, Móvil Bus, Línea). Chiclayo–Cajamarca no tiene tiempo publicado.
- [ ] **Clima:** se usó Climate-data.org vía Wikipedia. Cambiarlo por datos de SENAMHI.
- [ ] **Preguntar a la Municipalidad** si hay normas sobre agua, pintura, alcohol y tránsito para el público (bando, decreto de alcaldía u otra ordenanza), y si la 908-CMPC sigue vigente. Se publica en municaj.gob.pe.
- [ ] **Teléfono del serenazgo de Cajamarca:** solo apareció en una página de otra institución; no se publicó.
- [ ] **Precios** de pasajes, hospedaje, palcos y globos: no hay fuente confiable (ver «Presupuesto», abajo). No se pusieron en la guía.
- [ ] **Postas y centros de salud** de la ciudad: solo se nombra el Hospital II de EsSalud.
- [ ] **Revisar todo en enero**, cuando salga el programa oficial, y cada año: la fecha de revisión está en `revisadoEn` de `src/data/guia.ts`.

**Presupuesto (no incluido en la guía):** [la guía de costos de carnavalcajamarca.com](https://carnavalcajamarca.com/cuanto-cuesta-viajar-al-carnaval-de-cajamarca-2027/) no es confiable para citarla: casi todas las cifras son estimaciones propias sin fuente ni fecha, y se contradice entre sus dos tablas. Orden de magnitud: bus Lima–Cajamarca de S/ 70 a S/ 230 por tramo en 2026, avión de S/ 400 a S/ 650 ida y vuelta, hotel a unos S/ 294 por noche en febrero de 2027. Sin precios de palcos ni de globos (el único dato fechado es el de 2024: globos seis por un sol, balde grande S/ 30, palcos de S/ 20 a S/ 100). Para publicarlo, pedir los precios reales a empresas de transporte y hoteles, o citar prensa con fecha.

---

## Versión en inglés

**Estado:** sin empezar. Se decidió hacerla **por fases** y la hará otro agente (o Richard) en una rama aparte. Antes de empezar, hay que leer el [README](README.md) y la sección «Para empezar», de arriba.

### Decisiones ya tomadas

- **Rutas:** español en `/` (como ahora) e inglés en `/en/`. Usar el sistema de idiomas de Astro (`i18n` en `astro.config.mjs`, [guía](https://docs.astro.build/en/guides/internationalization/)), con `prefixDefaultLocale: false`.
- **Botón «ES | EN»** en la cabecera (también dentro del menú del teléfono) y en el pie. Lleva a la misma página en el otro idioma; si esa página aún no existe en inglés, a `/en/`. Con `hreflang` en `<head>` y `lang` correcto en `<html>` (hoy está fijo en `es-PE` en `src/layouts/Base.astro`).
- **Qué NO se traduce:** las coplas (se pierde la rima) y las palabras del habla (shulca, yunza, poto…). Se dejan en español, marcadas con `lang="es"`, y se les agrega una glosa en inglés. Los nombres propios («Cajamarca», barrios, «Gran Corso»…) llevan `translate="no"`.
- **Tono:** inglés claro para un visitante que no conoce el Perú; explicar lo que en español se da por sabido (qué es la yunza, qué es un corso). Las fuentes citadas se quedan como están (en español), con la fecha.
- **Fechas y horas:** usar el idioma de la página en cada `Intl.DateTimeFormat` (hoy hay unos 15 con `'es-PE'` escrito a mano: `Banderolas`, `CartelEdicion`, `CartelProximo`, `HoyEnElCarnaval`, `lib/fechas.ts`, `lib/agenda-portada.ts`, `2027.astro`, `ediciones/[anio].astro`). Zona horaria sigue siendo la de Perú.

### Fases

1. **Base (sin traducir páginas todavía):**
   - [ ] Configurar `i18n` en Astro y un diccionario de textos de la interfaz (menú, pie, botones, avisos como «Sin conexión», «Instalar app»). Por ejemplo, `src/i18n/es.ts` y `src/i18n/en.ts` con una función `t(idioma)`.
   - [ ] `Base.astro`: recibir el idioma, poner `lang`, `hreflang`, `og:locale` y `canonical` por idioma.
   - [ ] Cabecera, menú del teléfono y pie en inglés, con el botón de idioma.
   - [ ] Pasar el idioma a los formateadores de fecha y a los scripts que escriben texto en el navegador (`HoyEnElCarnaval`, `ContadorProximamente`, `MapaRecorridos`, `Instalar`, `Base.astro` con los avisos de sin conexión).
   - [ ] Sitemap con las dos versiones; `robots.txt` y `manifest.webmanifest` (el manifiesto sigue en español o se hace uno por idioma: decidirlo y anotarlo aquí).
   - [ ] Imágenes para compartir (`src/lib/og.ts`, `src/data/og.ts`): título y bajada en inglés para `/en/`.
2. **Páginas prioritarias en inglés:** `/en/` (inicio), `/en/2027/`, `/en/guia/` (con su ruta en inglés; ver abajo). Datos: `src/data/carnaval2027.ts`, `src/data/guia.ts`.
3. **Páginas de contenido:** la fiesta, historia, barrios, ediciones (datos en `ediciones.json`), habla (solo la interfaz y glosas; las palabras quedan), coplas (interfaz; las coplas siguen en español con glosa), fuentes, 404 y «sin señal».
4. **Sin conexión:** que el service worker (`integraciones/sin-conexion/`) guarde también `/en/`. Revisar el límite de archivos y correr `pnpm test:offline`; ampliar `tests/sin-conexion.test.mjs` con una página en inglés.
5. **Revisión final:** recorrer todo en `/en/` en escritorio y teléfono, sin texto en español suelto, enlaces internos que no salten de idioma, y `pnpm build` sin errores.

### Cosas por decidir (anotar la respuesta aquí al decidirlas)

- **Nombre de las rutas en inglés:** `/en/guide/`, `/en/the-party/`, `/en/neighborhoods/`… o mantener los mismos nombres en español (`/en/guia/`). Lo más simple es mantener los mismos nombres; lo mejor para buscadores es traducirlos.
- **Dónde guardar los textos largos:** en los mismos archivos de datos con un campo por idioma (`{ es: …, en: … }`) o en archivos separados por idioma.
- **Si el navegador está en inglés:** no redirigir solo; dejar que la persona elija con el botón (y recordar su elección en `localStorage`).
- **Traducciones:** las hace el agente, pero **alguien que hable inglés bien debe revisarlas** antes de publicar, sobre todo la guía, que da datos de seguridad y salud.

### Prompt para el agente

> Estás trabajando en el sitio del Carnaval de Cajamarca (Astro, repositorio `tefosc/carnavaloco`, rama `main`). Lee `README.md` y `PLAN.md` (sobre todo «Para empezar» y «Versión en inglés») antes de tocar nada, y corre `pnpm install` y `npx skills install`.
>
> **Tarea:** hacer una versión en inglés de la web, en `/en/`, con un botón «ES | EN» para cambiar de idioma. Sigue las «Decisiones ya tomadas» y las «Fases» de PLAN.md, en orden. Haz una fase por vez: al terminar cada una, deja `pnpm build` sin errores, marca las casillas de PLAN.md y detente para que revisemos antes de seguir.
>
> **Reglas:**
> - Trabaja en una rama nueva (`ingles`), no en `main`. No hagas commit ni push sin que te lo pidan.
> - No traduzcas las coplas ni las palabras del habla; sí sus glosas. Nombres propios con `translate="no"`; palabras en español dentro del inglés con `lang="es"`.
> - Todo texto nuevo, incluido el que escribe JavaScript en el navegador, sale del diccionario de idiomas; no escribas textos sueltos en los componentes.
> - Mantén el estilo visual (afiche chicha) y los principios de accesibilidad que ya hay: foco visible, etiquetas en los campos, `prefers-reduced-motion`, objetivos táctiles de 44 px o más.
> - Cada dato de la guía conserva su fuente y su aviso «Verifícalo». No agregues datos nuevos ni cambies cifras al traducir.
> - Si algo del plan no se puede hacer o hay que decidir (ver «Cosas por decidir»), anótalo en PLAN.md y pregunta; no lo adivines.
> - Antes de usar una API de Astro (i18n, rutas dinámicas), consulta la documentación actual con `npx ctx7@latest` (ver la skill `context7-cli`).
>
> **Al terminar cada fase:** resume qué cambió, qué quedó sin traducir y qué hay que revisar a mano.

---

## Anuncios

Para que la web se sostenga. Hay dos caminos, y se pueden combinar:

- **Auspiciadores locales**: hoteles, restaurantes, empresas de transporte, tiendas de disfraces o de máscaras. Se arregla directo con ellos y se muestran como afiches en el estilo de la web, sin rastreo de visitantes. Es lo que mejor encaja con el diseño y con la gente que entra a la página.
- **Red de anuncios** (por ejemplo, Google AdSense): pone los anuncios sola, pero se ven genéricos y cargan scripts de terceros.

Antes de poner anuncios:

- [ ] **Dominio propio** (ver «Ya», arriba). Las redes de anuncios piden que el sitio esté en un dominio que uno controla, y `*.vercel.app` no lo es.
- [ ] **Política de privacidad**: una página que diga qué datos se recogen. Hace falta sobre todo con anuncios que rastrean (cookies), y en el Perú rige la Ley 29733 de Protección de Datos Personales. Si los anuncios son personalizados, también un aviso para aceptar o rechazar cookies.
- [ ] **Archivo `ads.txt`** en la raíz, si se usa una red de anuncios (lo pide la red; va en `public/`).
- [ ] **Lugares donde poner los anuncios** sin romper la página:
  - Entre secciones, no en medio del texto.
  - En `/2027/` y en la futura guía para el que viene de fuera, que es donde entra la gente que viaja.
  - Nunca dentro de «Arma tu copla» ni en la imagen que se descarga.
- [ ] **Reservar el espacio de cada anuncio** con un alto fijo, para que la página no salte cuando carga.
- [ ] **Marcarlos como «Publicidad»** o «Auspicia», para que no se confundan con el contenido.
- [ ] **Sin conexión**: los anuncios no se guardan en el teléfono. El service worker deja pasar lo de otros dominios, así que sin señal su espacio queda vacío. Hay que decidir si se esconde o se muestra un afiche del auspiciador guardado con la página.
- [ ] **Medir**: con Vercel Analytics se puede ver cuánta gente pasa por cada página antes de ofrecer espacios a auspiciadores.

---

## Otras ideas, sin fecha

- [ ] **Más coplas tradicionales con fuente.** Hoy hay 4 tradicionales y 14 escritas para el sitio. Las dos páginas de coplas de carnavalcajamarca.com son solo videos, sin versos escritos. Hay que buscar en cancioneros, notas de prensa o grabaciones con transcripción.
- [ ] **Botón para compartir cada copla** del cancionero.
- [ ] **Versión en inglés:** movida a su propia sección, arriba («Versión en inglés»).
- [ ] **Más fotos** con licencia libre, sobre todo de comparsas, del corso y de la yunza. La galería de carnavalcajamarca.com no sirve: son 4 entradas de 2021 («Rostros del Carnaval» 2018 a 2020 y el centro histórico), sin crédito ni licencia, en un sitio con todos los derechos reservados. No se pueden reutilizar.
- [ ] **Noticias del carnaval.** Ese sitio tiene una sección de noticias, pero solo dos son de 2027 (el Gran Corso por la Vía de Evitamiento, ya en el mapa, y la serenata). El resto es de 2023 a 2026; lo útil (más del 90 % de los hoteles reservados en 2023) ya está en la web. Para novedades de 2027 conviene seguir la Municipalidad Provincial de Cajamarca y Andina.

## Cosas a tener en cuenta

- **El contador de sílabas es aproximado.** Acierta en las 18 coplas del sitio, pero un verso raro puede salir con una de más o de menos. Por eso la web dice «unas ocho sílabas».
- **carnavalcajamarca.com es un sitio privado** con derechos reservados. Se usaron sus datos (no su texto) y está citado en fuentes. Lo que solo decía ese sitio se verificó aparte, como la Ley 27667.
- **Para ver un día del carnaval antes de tiempo**, agrega `?fecha=AAAA-MM-DD` a la dirección.
