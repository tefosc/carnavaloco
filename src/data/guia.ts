/**
 * Guía para quien viene de fuera: cómo llegar, altura y clima, qué llevar, reglas y
 * emergencias. Cada dato lleva su fuente. Los que salen de agregadores o de páginas
 * que no se pudieron leer completas van con `verificar: true`: la página los marca
 * para que el visitante los confirme.
 *
 * Revisado: 25 de noviembre de 2026. Los horarios, las aerolíneas y los precios
 * cambian cada año: revisar antes de cada carnaval.
 */
import type { Color } from './carnaval';

export const revisadoEn = '25 de noviembre de 2026';

export interface Fuente {
  medio: string;
  titulo: string;
  url: string;
  /** Fecha de la fuente, si la trae. */
  fecha?: string;
}

export interface Dato {
  titulo: string;
  texto: string;
  fuente?: Fuente;
  /** Fuente débil o no leída completa: el visitante debe confirmarlo. */
  verificar?: boolean;
}

export interface Seccion {
  id: string;
  titulo: string;
  intro: string;
  color: Color;
  datos: Dato[];
}

const andina = (titulo: string, url: string, fecha?: string): Fuente => ({ medio: 'Andina', titulo, url, fecha });

export const secciones: Seccion[] = [
  {
    id: 'llegar',
    titulo: 'Cómo llegar',
    intro:
      'Cajamarca está en la sierra norte. Desde Lima se llega en avión o en bus; desde la costa norte, por carretera de montaña.',
    color: 'fucsia',
    datos: [
      {
        titulo: 'En avión desde Lima',
        texto:
          'El aeropuerto Mayor General FAP Armando Revoredo Iglesias está en el distrito vecino de Baños del Inca, cerca de la ciudad. El MTC lo declaró aeropuerto internacional en julio de 2026. El vuelo desde Lima dura poco más de una hora.',
        fuente: {
          medio: 'El Peruano',
          titulo: 'Aeropuerto de Cajamarca es declarado por el MTC Aeropuerto Internacional del Perú',
          url: 'https://elperuano.pe/noticia/300456-aeropuerto-de-cajamarca-es-declarado-por-el-mtc-aeropuerto-internacional-del-peru',
          fecha: '16 de julio de 2026',
        },
      },
      {
        titulo: 'Qué aerolíneas vuelan',
        texto:
          'Las rutas cambian de un año a otro. Según la prensa, SKY prevé reanudar Lima–Cajamarca desde el 1 de septiembre de 2026 con siete frecuencias por semana; antes, LATAM, JetSMART y Star Perú eran las que se mantenían en la ruta. Confirma en la web de cada aerolínea.',
        fuente: {
          medio: 'El Peruano',
          titulo: 'Aeropuerto de Cajamarca es declarado por el MTC Aeropuerto Internacional del Perú',
          url: 'https://elperuano.pe/noticia/300456-aeropuerto-de-cajamarca-es-declarado-por-el-mtc-aeropuerto-internacional-del-peru',
          fecha: '16 de julio de 2026',
        },
        verificar: true,
      },
      {
        titulo: 'Desde Trujillo o Chiclayo',
        texto:
          'No encontramos vuelos directos desde esas ciudades: el avión se conecta por Lima. Por carretera, de Trujillo a Cajamarca el bus demora entre 6 h 30 min y 8 horas. Para Chiclayo no hay un tiempo publicado: pregúntalo a la empresa.',
        fuente: {
          medio: 'Bookaway',
          titulo: 'Bus de Trujillo a Cajamarca',
          url: 'https://www.bookaway.com/routes/peru/trujillo-to-cajamarca',
        },
        verificar: true,
      },
      {
        titulo: 'En bus desde Lima',
        texto:
          'Es un viaje largo: entre 14 y 16 horas. Lo hacen empresas como Civa, Móvil Bus y Transportes Línea. En carnaval los pasajes se agotan: compra con tiempo.',
        fuente: {
          medio: 'Busbud',
          titulo: 'Buses de Lima a Cajamarca',
          url: 'https://www.busbud.com/en-gb/bus-lima-cajamarca/r/6mc5rp-6q8pjx',
        },
        verificar: true,
      },
      {
        titulo: 'Las lluvias pueden cortar la carretera',
        texto:
          'Febrero es época de lluvias. En 2025, un derrumbe en pleno carnaval cortó la carretera Cajamarca–Ciudad de Dios, la que viene de Trujillo, y dejó varados a decenas de vehículos. El Gobierno Regional recomendó la ruta alterna por Chilete, San Pablo y Porcón. Sal con margen y revisa el estado de la vía el día del viaje.',
        fuente: andina(
          'Lluvias intensas provocan derrumbe en vía a Cajamarca y decenas de vehículos están varados',
          'https://andina.pe/agencia/noticia-lluvias-intensas-provocan-derrumbe-via-a-cajamarca-y-decenas-vehiculos-estan-varados-1020537.aspx',
          '28 de febrero de 2025',
        ),
      },
    ],
  },
  {
    id: 'alojamiento',
    titulo: 'Dónde quedarse',
    intro: 'Febrero de carnaval es la temporada más llena del año en Cajamarca.',
    color: 'amarillo',
    datos: [
      {
        titulo: 'Reserva con meses de anticipación',
        texto:
          'En 2026 la Dircetur esperaba unos 90 000 turistas en los días centrales, con más del 90 % de ocupación hotelera en el centro histórico.',
        fuente: andina(
          'Cajamarca prevé arribo de más de 90 000 turistas en días centrales del tradicional carnaval',
          'https://andina.pe/agencia/noticia-cajamarca-preve-arribo-mas-90000-turistas-dias-centrales-tradicional-carnaval-1060272.aspx',
          '22 de enero de 2026',
        ),
      },
      {
        titulo: 'Si el centro está lleno',
        texto:
          'La misma nota recomienda alojarse en Baños del Inca, Llacanora o Jesús, localidades cercanas. Acampar en canchas deportivas está prohibido.',
        fuente: andina(
          'Cajamarca prevé arribo de más de 90 000 turistas en días centrales del tradicional carnaval',
          'https://andina.pe/agencia/noticia-cajamarca-preve-arribo-mas-90000-turistas-dias-centrales-tradicional-carnaval-1060272.aspx',
          '22 de enero de 2026',
        ),
      },
    ],
  },
  {
    id: 'altura',
    titulo: 'Altura y clima',
    intro: 'La ciudad está a más de 2 700 metros y febrero es de lluvias: lleva abrigo e impermeable.',
    color: 'turquesa',
    datos: [
      {
        titulo: 'Unos 2 700 metros de altura',
        texto:
          'Según Wikipedia, la ciudad está a 2 750 m sobre el nivel del mar; el Banco Central de Reserva da 2 720 m en un informe de 2007. Las cifras cambian según el punto donde se mida.',
        fuente: {
          medio: 'Wikipedia',
          titulo: 'Cajamarca',
          url: 'https://es.wikipedia.org/wiki/Cajamarca',
        },
      },
      {
        titulo: 'Febrero: lluvias, días templados, noches frías',
        texto:
          'Las lluvias van de diciembre a marzo. En febrero la máxima media ronda los 20 °C y la mínima los 7 °C, con unos 111 mm de lluvia. Son valores de un modelo climático, no de SENAMHI: sirven de referencia.',
        fuente: {
          medio: 'Wikipedia (datos de Climate-data.org)',
          titulo: 'Cajamarca: clima',
          url: 'https://es.wikipedia.org/wiki/Cajamarca',
        },
        verificar: true,
      },
      {
        titulo: 'El soroche',
        texto:
          'El Ministerio de Salud pide tomar precauciones por encima de los 2 500 metros: descansar las primeras horas al llegar, evitar esfuerzos intensos y no tomar acetazolamida sin receta. Si persisten las náuseas, el dolor de cabeza fuerte o la falta de aire, hay que ir a un centro de salud. Con hipertensión o problemas del corazón, viaja con tu medicación y consulta antes con tu médico.',
        fuente: {
          medio: 'Ministerio de Salud',
          titulo: 'Minsa: recomendaciones para prevenir el mal de altura durante los viajes por Semana Santa',
          url: 'https://www.gob.pe/institucion/minsa/noticias/1374711-minsa-recomendaciones-para-prevenir-el-mal-de-altura-durante-los-viajes-por-semana-santa',
        },
        verificar: true,
      },
      {
        titulo: 'Síntomas del mal de altura',
        texto: 'Ficha de la Biblioteca Nacional de Medicina de EE. UU., en español, con los síntomas y cuándo buscar atención.',
        fuente: {
          medio: 'MedlinePlus',
          titulo: 'Mal agudo de montaña',
          url: 'https://nlm.nih.gov/medlineplus/spanish/ency/article/000133.htm',
        },
      },
    ],
  },
  {
    id: 'llevar',
    titulo: 'Qué llevar',
    intro: 'Lo que dice todo cajamarquino: ropa vieja y el celular bien guardado.',
    color: 'verde',
    datos: [
      {
        titulo: 'Ropa vieja, de los zapatos para arriba',
        texto:
          'Agua, pintura y talco: la ropa que llevas puesta va a quedar manchada. Los zapatos cerrados y viejos también. La pintura del día del ingreso del Ño Carnavalón no sale.',
      },
      {
        titulo: 'Impermeable y abrigo',
        texto: 'Febrero es de lluvias y las noches son frías. Un impermeable liviano sirve para la lluvia y para el agua de los globos.',
      },
      {
        titulo: 'El celular y los documentos, en bolsa',
        texto: 'Bien cerrada y en un bolsillo de adentro. Nadie se salva del agua, tu teléfono tampoco. Lleva una copia de tu documento y deja el original en el hotel.',
      },
      {
        titulo: 'Baja la web antes de salir',
        texto: 'En el corso la señal se cae. Esta web se guarda en tu teléfono: ábrela una vez con internet y funciona sin señal.',
      },
    ],
  },
  {
    id: 'reglas',
    titulo: 'Reglas y convivencia',
    intro:
      'No hay una norma publicada que le diga al visitante qué se puede mojar o pintar. Esto es lo que sí consta en los documentos oficiales y lo que es costumbre.',
    color: 'naranja',
    datos: [
      {
        titulo: 'Lo que dice el reglamento del carnaval',
        texto:
          'La Ordenanza Municipal 908-CMPC (octubre de 2024) aprueba el reglamento para organizar el carnaval como fiesta nacional. Obliga a organizadores y participantes; no regula el juego con agua, pintura o globos del público ni la venta de alcohol.',
        fuente: {
          medio: 'Municipalidad Provincial de Cajamarca',
          titulo: 'Ordenanza Municipal N.° 908-CMPC',
          url: 'https://cdn.www.gob.pe/uploads/document/file/7128344/6121691-ordenanza-municipal-n-908-cmpc.pdf',
          fecha: '9 de octubre de 2024',
        },
      },
      {
        titulo: 'El corso empieza a las 10 de la mañana',
        texto:
          'El desfile del corso comienza a las 10:00 a. m. y su recorrido debe quedar libre para ambulancias, Cruz Roja, bomberos y patrullaje: no lo obstruyas. Los palcos del corso los vende la municipalidad por una plataforma digital.',
        fuente: {
          medio: 'Municipalidad Provincial de Cajamarca',
          titulo: 'Reglamento para la celebración de las festividades del Carnaval de Cajamarca (artículos 63 y 104)',
          url: 'https://cdn.www.gob.pe/uploads/document/file/7128345/6121691-reglamento-para-la-celebracion-de-las-festividades-del-carnaval-de-cajamarca.pdf',
        },
      },
      {
        titulo: 'La pintura, solo el primer día',
        texto:
          'Por costumbre, la pintura vale únicamente el día del ingreso del Ño Carnavalón; el resto de días se juega con agua, talco y serpentina. No es una norma que encontráramos publicada: confírmalo en el programa oficial. En «Historia» está la fuente de cómo cambió el juego.',
        verificar: true,
      },
      {
        titulo: 'Los horarios y las prohibiciones de cada año',
        texto:
          'La municipalidad publica el programa oficial y sus avisos a inicios de enero. Todavía no hay avisos de 2027 sobre prohibiciones, horarios de juego, ley seca o desvíos de tránsito: míralos en sus comunicados antes de viajar.',
        verificar: true,
      },
      {
        titulo: 'Juega con respeto',
        texto:
          'Es consejo, no norma: pregunta antes de mojar a quien no esté jugando, protege a niños y adultos mayores, y no tires agua ni pintura a quien lleva un bebé, a quien maneja o a los que atienden una emergencia.',
      },
    ],
  },
  {
    id: 'emergencias',
    titulo: 'Emergencias y salud',
    intro: 'Teléfonos útiles. Guárdalos antes de salir.',
    color: 'azul',
    datos: [
      {
        titulo: 'Policía 105, Bomberos 116, SAMU 106',
        texto:
          'Son los números nacionales de emergencia. La Línea 100 es un servicio gratuito del Estado que atiende las 24 horas. El Estado avanza hacia un número único, el 911, pero los actuales siguen vigentes.',
        fuente: {
          medio: 'Infobae',
          titulo: 'Números de emergencia en Perú: cuándo llamar a la policía, bomberos, SAMU, Línea 100 y 911',
          url: 'https://www.infobae.com/peru/2026/06/26/numeros-de-emergencia-en-peru-cuando-llamar-a-la-policia-bomberos-samu-linea-100-y-911/',
          fecha: '26 de junio de 2026',
        },
        verificar: true,
      },
      {
        titulo: 'Rumbo al 911',
        texto: 'Nota oficial sobre la transición hacia el número único de emergencias.',
        fuente: {
          medio: 'El Peruano',
          titulo: 'Del 105 al 911: Gobierno avanza hacia un sistema integrado para atender emergencias más rápido',
          url: 'https://elperuano.pe/noticia/305020-del-105-al-911-gobierno-avanza-hacia-un-sistema-integrado-para-atender-emergencias-mas-rapido',
          fecha: '2026',
        },
      },
      {
        titulo: 'Botón de alerta «Cajamarca segura»',
        texto: 'La municipalidad tiene una aplicación con un botón de alerta conectado con la Policía y el serenazgo.',
        fuente: andina(
          'Cajamarca refuerza seguridad ciudadana con aplicativo móvil «Botón de alerta»',
          'https://andina.pe/agencia/noticia-cajamarca-refuerza-seguridad-ciudadana-aplicativo-movil-boton-alerta-928045.aspx',
        ),
      },
      {
        titulo: 'Municipalidad Provincial de Cajamarca',
        texto: 'Teléfonos centrales: 076-602660 y 076-602661, según un directorio del Congreso de agosto de 2024.',
        fuente: {
          medio: 'Congreso de la República',
          titulo: 'Directorio Cajamarca, agosto de 2024',
          url: 'https://www.congreso.gob.pe/Docs/Otamdegrl/files/directorio_cajamarca_agosto_2024.pdf',
          fecha: 'agosto de 2024',
        },
        verificar: true,
      },
      {
        titulo: 'Hospitales',
        texto: 'En la ciudad está el Hospital II Cajamarca de EsSalud. Ante una urgencia, llama primero al SAMU (106).',
        fuente: {
          medio: 'EsSalud',
          titulo: 'Rondas de seguridad en el Hospital II Cajamarca de EsSalud',
          url: 'https://www.gob.pe/institucion/essalud/noticias/893084-implementan-rondas-de-seguridad-en-beneficio-de-los-pacientes-del-hospital-ii-cajamarca-de-essalud',
        },
        verificar: true,
      },
    ],
  },
];

/** Todas las fuentes, sin repetir, para la página de fuentes. */
export const fuentesGuia: Fuente[] = [
  ...new Map(secciones.flatMap((s) => s.datos.flatMap((d) => (d.fuente ? [[d.fuente.url, d.fuente] as const] : [])))).values(),
];
