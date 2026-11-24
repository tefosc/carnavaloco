# Carnaval de Cajamarca

Sitio sobre el Carnaval de Cajamarca: los cinco días, los carnavales de años anteriores, coplas, el habla cajamarquina y la historia. Hecho con [Astro](https://astro.build) 7 y pnpm.

## Comandos

| Comando        | Qué hace                                              |
| :------------- | :---------------------------------------------------- |
| `pnpm install` | Instala dependencias (y el Node que pide el proyecto) |
| `pnpm dev`     | Servidor de desarrollo en `localhost:4321`            |
| `pnpm build`   | Genera el sitio estático en `./dist/`                 |
| `pnpm preview` | Sirve el build localmente                             |

Astro 7 pide Node ≥ 22.23.4. El `package.json` declara `devEngines.runtime` (Node 24), así que pnpm descarga ese Node solo para este proyecto.

## Páginas

| Ruta                  | Contenido                                                         |
| :-------------------- | :---------------------------------------------------------------- |
| `/`                   | Portada: cuenta regresiva, los cinco días, copla, muro de ediciones |
| `/2027/`              | Carnaval 2027: día por día, mapa de recorridos, calendario, previas y consejos |
| `/la-fiesta/`         | Programa, personajes, costumbres, música y comida                 |
| `/ediciones/`         | Muro de afiches de 2017 a 2026                                    |
| `/ediciones/[año]/`   | Ficha de cada año: reina, cifras, hechos y fuentes                |
| `/coplas/`            | Cómo se arma una copla, el contrapunto, el juego «Completa la copla» y el cancionero |
| `/barrios/`           | Lemas, reinas y rivalidades de los barrios y centros poblados     |
| `/habla/`             | El dejo cajamarquino, «dilo así» y glosario con buscador          |
| `/historia/`          | Línea de tiempo y todas las fuentes                               |
| `/carnaval-2027.ics`  | Calendario descargable con los cinco días                         |
| `/og/<página>.png`    | Imágenes para compartir (se generan en el build)                  |

## Dónde está el contenido

```text
src/data/
├── ediciones.json   # Un objeto por año: reina, cifras, hechos, fuentes
├── coplas.json      # origen "tradicional" (con fuente) o "inedita"
├── glosario.json    # Palabras del habla, exclamaciones y de la fiesta
├── frases.json      # Gritos, dichos, lemas de barrio
├── carnaval.ts      # Historia, programa, personajes, costumbres, música, comida
├── carnaval2027.ts  # Programa 2027: horas, lugares, previas, consejos
├── barrios.ts       # Barrios y centros poblados
├── og.ts            # Texto y color de la imagen para compartir de cada página
├── mapa.json        # Calles y rutas del mapa (generado desde OpenStreetMap)
├── recorridos.ts    # Rutas de cada día, compartidas por el mapa plano y el 3D
└── fotos.ts         # Fotos y sus créditos
```

`src/content.config.ts` valida los JSON: si algo no cumple el formato, `pnpm build` falla y dice qué campo está mal.

**Horarios del 2027:** cuando la Municipalidad publique el programa oficial (a inicios de enero), edita `src/data/carnaval2027.ts`: pon la `hora` de cada día (por ejemplo `'10:00 a. m.'`), corrige `lugar` si cambia, llena la `fecha` de las actividades previas y cambia `programaOficial` a `true`. Mientras `hora` sea `null`, la página muestra «Por confirmar».

**Hoy en el carnaval:** del sábado al miércoles, el inicio y `/2027/` cambian solos la cuenta regresiva por lo que toca ese día (hora, lugar, qué viene mañana y su ruta en el mapa), con la fecha de Perú. Lo hace `src/lib/hoy.ts` al abrir la página, así que no hace falta volver a publicar cada día. Para ver cómo queda un día antes de tiempo, agrega `?fecha=` a la dirección: por ejemplo `/?fecha=2027-02-08` o `/2027/?fecha=2027-02-09`.

**Sin conexión:** al abrir la web una vez con internet queda guardada en el teléfono (todas las páginas, estilos, scripts y letras, cerca de 1 MB), y se abre aunque en el corso no haya señal. Las fotos se guardan a medida que se ven; el mapa 3D necesita internet. Lo hace un service worker que `integraciones/sin-conexion/` escribe en `/sw.js` al terminar el build, con la lista real de archivos; cada despliegue con cambios trae una versión nueva y borra la anterior. Si no hay señal y la página no está guardada, se muestra `/sin-conexion/`. En `pnpm dev` no se registra, para ver siempre lo último. La web también se puede instalar como app (`manifest.webmanifest`, íconos en `src/pages/iconos/`).

**Agregar un año:** un objeto nuevo en `ediciones.json` con `id` y `anio` iguales. La página `/ediciones/<año>/` se genera sola.

**Agregar una copla:** en `coplas.json`, con `origen: "tradicional"` y `fuente` si la sacaste de algún lado, o `"inedita"` si es nueva. Entre 3 y 6 versos. Cada verso se muestra con «bis», porque al cantar se dice dos veces; si la copla se canta repitiendo cada par de versos, agrega `"repite": "par"` y el «bis» va al final de cada par.

## Despliegue en Vercel

- **Dominio:** en Vercel el sitio toma solo su dominio de `VERCEL_PROJECT_PRODUCTION_URL` (para el sitemap, `robots.txt` y las imágenes al compartir). Para un dominio propio, define la variable `SITIO_URL` (por ejemplo `https://carnavaldecajamarca.pe`).
- **Estadísticas:** el componente de Vercel Analytics ya está en el layout; falta activarlo en el panel del proyecto (pestaña Analytics).

## Mapa de recorridos

Las calles salen de OpenStreetMap y se procesan con `scripts/mapa-osm.py`, que deja `src/data/mapa.json`. Las avenidas de cada ruta (Independencia, Vía de Evitamiento, carretera a Baños del Inca) son las reales; los tramos punteados son aproximados. El crédito «© colaboradores de OpenStreetMap» es obligatorio (licencia ODbL) y va en la esquina del mapa; el 3D muestra sus créditos en su propia esquina.

Para cambiar una ruta, edita `src/data/recorridos.ts`: el mapa plano y el 3D leen de ahí. Cada día es una lista de tramos en el orden en que avanza el desfile, porque al elegir un día su ruta se dibuja desde donde sale. Las avenidas de OpenStreetMap vienen en pedazos (cada sentido por separado); `avenidaDesde(trazo, punto)` las une en una sola línea que empieza en ese punto, y los huecos sin datos quedan punteados. El sentido del Gran Corso (de norte a sur) es una suposición: cuando salga el programa oficial, cambia su punto de salida si hace falta.

**Mapa 3D:** el botón «Ver en 3D» carga MapLibre (`src/lib/mapa3d.ts`) solo cuando alguien lo toca, así la página no pesa más para quien no lo usa. Usa calles y edificios de [OpenFreeMap](https://openfreemap.org), relieve de [Mapterhorn](https://mapterhorn.com) y las rutas de `/mapa/recorridos.geojson`, que se genera en el build desde `recorridos.ts` con la misma proyección del mapa plano. Ninguno de los tres pide clave ni cuenta. Si el navegador no puede abrir el 3D (sin WebGL, por ejemplo), se queda el mapa plano con un aviso.

## Diseño

Afiche chicha + raso de clon:

- Colores planos del satín de los disfraces: fucsia, amarillo, verde loro, azul rey, naranja y turquesa; el texto en azul noche.
- Titulares en Big Shoulders Display con contorno y sombra dura (`src/components/Chicha.astro`); texto en Bricolage Grotesque.
- Bordes en zigzag de gola, flecos, banderolas, sellos redondos y afiches pegados (`src/styles/global.css` y `src/components/`).
- El movimiento respeta `prefers-reduced-motion`; la cinta de gritos se detiene al pasar el mouse.

## Fotos

Las fotos son de **Pitxiquin** en [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Carnival_of_Cajamarca), licencia [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.es). Algunas están recortadas. El crédito va en el pie de cada página.

## Sobre las coplas

Las tradicionales vienen de notas de RPP y La República que las citan como coplas populares. Las «nuevas» se escribieron para este sitio en la forma tradicional. Las coplas del carnaval son anónimas y de tradición oral; la recopilación más conocida es *Carnaval de coplas cajamarquinas* de Arturo Corcuera, que no está en línea.

## Skills del proyecto

En `.claude/skills` (fijadas en `skills-lock.json`): `modern-web-guidance`, `context7-cli`, `ub-mode`, `frontend-design`, `astro`, `web-design-guidelines` y `design-taste-frontend`.
