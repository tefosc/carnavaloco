# Plan del sitio: qué hay y qué falta

Estado al 24 de noviembre de 2026. El carnaval 2027 es del **sábado 6 al miércoles 10 de febrero**.

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
- Estilo «afiche chicha + raso de clon»: colores planos del satín de los disfraces, titulares con contorno y sombra dura, bordes en zigzag, banderolas, sellos y afiches pegados.
- Páginas: inicio, **2027**, la fiesta, ediciones 2017–2026 (una página por año), barrios, coplas, habla, historia y fuentes, 404 y «sin señal».
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

- **Funciona sin señal**: con abrir la web una vez con internet, queda guardada en el teléfono. Las páginas, los estilos y las letras pesan cerca de 1 MB. Si se pierde la conexión, aparece un aviso.
- **Se puede instalar como app** desde Chrome en Android, con su ícono. El botón aparece en «Si vas», en `/2027/`.

### Pintura

- Manchas por toda la web: salpicones, manos pintadas, globos reventados, chorreados, brochazos y talco, en los bordes de cada sección. Aparecen al bajar.
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

### Después del carnaval (desde el 11 de febrero de 2027)

- [ ] Agregar la edición 2027 en `src/data/ediciones.json`, con lo que pasó, la reina y las cifras.
- [ ] Preparar 2028. La cuenta regresiva del inicio ya salta sola al año siguiente, pero `/2027/` y `src/data/carnaval2027.ts` son de 2027. Conviene volverlos genéricos («próximo carnaval») o copiarlos para 2028.

---

## Guías que faltan

### Guía para el que viene de fuera

Es la idea grande que queda de la lista. `/2027/` tiene seis consejos cortos en «Si vas»; esto sería una página completa, por ejemplo `/guia/`. Iría enlazada desde la cabecera y desde «Si vas», con sus datos en `src/data/guia.ts`. Se guardaría sola para usarla sin señal: el service worker toma todas las páginas.

**Cada dato con su fuente.** Lo que hay que investigar y citar:

- [ ] **Cómo llegar** desde Lima, Trujillo y Chiclayo: avión (aerolíneas, tiempo) y bus (empresas, horas de viaje, tramos de altura).
- [ ] **Clima en febrero**: lluvias, temperaturas de día y de noche. Fuente: SENAMHI.
- [ ] **Altura**: Cajamarca está a unos 2750 m. Qué hacer contra el soroche, con una fuente de salud.
- [ ] **Qué ropa llevar** para el agua y la pintura (ropa vieja, zapatos cerrados, impermeable) y **cómo proteger el celular y los documentos**.
- [ ] **Reglas de la Municipalidad para el juego**: qué está permitido y qué no, la pintura solo el sábado, horarios, multas. Hay dos documentos oficiales para leer y resumir:
  - [Ordenanza Municipal N.° 908-CMPC](https://cdn.www.gob.pe/uploads/document/file/7128344/6121691-ordenanza-municipal-n-908-cmpc.pdf)
  - [Reglamento para la celebración de las festividades del Carnaval de Cajamarca](https://cdn.www.gob.pe/uploads/document/file/7128345/6121691-reglamento-para-la-celebracion-de-las-festividades-del-carnaval-de-cajamarca.pdf)
- [ ] **Dónde quedarse** (zonas) y cuándo reservar. Ya está el dato de 2023: los hoteles pasaron el 90 % de reservas antes de la fiesta.
- [ ] **Presupuesto aproximado**: pasajes, hospedaje, palcos del corso, globos. Para empezar, carnavalcajamarca.com tiene una página de costos, todavía sin leer.
- [ ] **Teléfonos útiles**: emergencias, policía, serenazgo, puestos de salud durante la fiesta.

---

## Otras ideas, sin fecha

- [ ] **Más coplas tradicionales con fuente.** Hoy hay 4 tradicionales y 14 escritas para el sitio. Las dos páginas de coplas de carnavalcajamarca.com son solo videos, sin versos escritos. Hay que buscar en cancioneros, notas de prensa o grabaciones con transcripción.
- [ ] **Botón para compartir cada copla** del cancionero.
- [ ] **Versión en inglés** para turistas, por lo menos de `/2027/` y de la guía.
- [ ] **Más fotos** con licencia libre, sobre todo de comparsas, del corso y de la yunza.

## Cosas a tener en cuenta

- **El contador de sílabas es aproximado.** Acierta en las 18 coplas del sitio, pero un verso raro puede salir con una de más o de menos. Por eso la web dice «unas ocho sílabas».
- **carnavalcajamarca.com es un sitio privado** con derechos reservados. Se usaron sus datos (no su texto) y está citado en fuentes. Lo que solo decía ese sitio se verificó aparte, como la Ley 27667.
- **Para ver un día del carnaval antes de tiempo**, agrega `?fecha=AAAA-MM-DD` a la dirección.
