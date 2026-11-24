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
| `/2027/`              | Carnaval 2027: día por día con hora y lugar, previas y consejos   |
| `/la-fiesta/`         | Programa, personajes, costumbres, música y comida                 |
| `/ediciones/`         | Muro de afiches de 2017 a 2026                                    |
| `/ediciones/[año]/`   | Ficha de cada año: reina, cifras, hechos y fuentes                |
| `/coplas/`            | Cómo se arma una copla, el contrapunto y el cancionero            |
| `/habla/`             | El dejo cajamarquino, «dilo así» y glosario con buscador          |
| `/historia/`          | Línea de tiempo y todas las fuentes                               |

## Dónde está el contenido

```text
src/data/
├── ediciones.json   # Un objeto por año: reina, cifras, hechos, fuentes
├── coplas.json      # origen "tradicional" (con fuente) o "inedita"
├── glosario.json    # Palabras del habla, exclamaciones y de la fiesta
├── frases.json      # Gritos, dichos, lemas de barrio
├── carnaval.ts      # Historia, programa, personajes, costumbres, música, comida
└── fotos.ts         # Fotos y sus créditos
```

`src/content.config.ts` valida los JSON: si algo no cumple el formato, `pnpm build` falla y dice qué campo está mal.

**Horarios del 2027:** cuando la Municipalidad publique el programa oficial (a inicios de enero), edita `src/data/carnaval2027.ts`: pon la `hora` de cada día (por ejemplo `'10:00 a. m.'`), corrige `lugar` si cambia, llena la `fecha` de las actividades previas y cambia `programaOficial` a `true`. Mientras `hora` sea `null`, la página muestra «Por confirmar».

**Agregar un año:** un objeto nuevo en `ediciones.json` con `id` y `anio` iguales. La página `/ediciones/<año>/` se genera sola.

**Agregar una copla:** en `coplas.json`, con `origen: "tradicional"` y `fuente` si la sacaste de algún lado, o `"inedita"` si es nueva. Entre 3 y 6 versos.

## Diseño

Afiche chicha + raso de clon:

- Colores planos del satín de los disfraces: fucsia, amarillo, verde loro, azul rey, naranja y turquesa; el texto en azul noche.
- Titulares en Big Shoulders Display con contorno y sombra dura (`src/components/Chicha.astro`); texto en Bricolage Grotesque.
- Bordes en zigzag de gola, flecos, banderolas, sellos redondos y afiches pegados (`src/styles/global.css` y `src/components/`).
- El movimiento respeta `prefers-reduced-motion`; la cinta de gritos tiene botón de pausa.

## Fotos

Las fotos son de **Pitxiquin** en [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Carnival_of_Cajamarca), licencia [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.es). Algunas están recortadas. El crédito va en el pie de cada página.

## Sobre las coplas

Las tradicionales vienen de notas de RPP y La República que las citan como coplas populares. Las «nuevas» se escribieron para este sitio en la forma tradicional. Las coplas del carnaval son anónimas y de tradición oral; la recopilación más conocida es *Carnaval de coplas cajamarquinas* de Arturo Corcuera, que no está en línea.

## Skills del proyecto

En `.claude/skills` (fijadas en `skills-lock.json`): `modern-web-guidance`, `context7-cli`, `ub-mode`, `frontend-design`, `astro`, `web-design-guidelines` y `design-taste-frontend`.
