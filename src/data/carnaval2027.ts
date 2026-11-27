/**
 * Carnaval de Cajamarca 2027: del sábado 6 al miércoles 10 de febrero.
 *
 * CUANDO SALGA EL PROGRAMA OFICIAL (la Municipalidad lo presenta en los primeros
 * días de enero): llena `hora` y, si cambia, `lugar` de cada día y la `fecha`
 * de cada actividad previa, y pon `programaOficial` en true.
 * Mientras `hora` sea null, la página muestra "Por confirmar".
 */
import type { Color } from './carnaval';
import type { Idioma } from '../i18n';

export const ANIO = 2027;

/** true cuando las horas y lugares vengan del programa oficial. */
export const programaOficial = false;

export interface Dia {
  /** El mismo id que usa el mapa de recorridos (src/data/recorridos.ts). */
  id: string;
  offset: number;
  titulo: string;
  /** Para el sello redondo de la portada, donde cabe poco. */
  corto: string;
  texto: string;
  hora: string | null;
  horaInicio?: string;
  lugar: string;
  /** Lo que pasó en ediciones anteriores, para saber qué esperar. */
  antes: string;
  color: Color;
  en: {
    titulo: string;
    corto: string;
    texto: string;
    lugar: string;
    antes: string;
  };
}

export const dias: Dia[] = [
  {
    id: 'sabado',
    offset: -4,
    titulo: 'Ingreso del Ño Carnavalón',
    corto: 'Entra el Ño',
    texto: 'El rey de la fiesta entra a la ciudad y empieza el juego. Por costumbre, es el único día en que se juega con pintura.',
    hora: null,
    lugar: 'Entra por el barrio Santa Elena, la portada de la ciudad, por la avenida Independencia.',
    antes: 'En 2024 el recorrido terminó en el complejo Qhapaq Ñan con un concierto de más de seis horas.',
    color: 'fucsia',
    en: {
      titulo: 'Arrival of Ño Carnavalón',
      corto: 'King arrives',
      texto: 'The giant effigy king enters the city and kicks off the water and paint battles. By custom, it is the only day paint is used.',
      lugar: 'Enters through the Santa Elena neighborhood (the city’s gateway) along Avenida Independencia.',
      antes: 'In 2024 the parade ended at the Qhapaq Ñan complex with a concert lasting over six hours.',
    },
  },
  {
    id: 'domingo',
    offset: -3,
    titulo: 'Concurso de patrullas y comparsas',
    corto: 'Comparsas',
    texto: 'Los barrios desfilan y compiten en damas, varones, mixta, infantil y vestimenta típica.',
    hora: null,
    lugar: 'Por las calles del centro; el jurado califica en la Plaza de Armas.',
    antes: 'En 2024 fueron casi ocho horas de pasacalle y 43 comparsas.',
    color: 'verde',
    en: {
      titulo: 'Troupe & Comparsa Contest',
      corto: 'Troupes',
      texto: 'Neighborhood troupes parade and compete in women’s, men’s, mixed, children’s, and traditional costume categories.',
      lugar: 'Through downtown streets; the judges score groups at the Plaza de Armas.',
      antes: 'In 2024 the parade ran for nearly eight hours with 43 competing troupes.',
    },
  },
  {
    id: 'lunes',
    offset: -2,
    titulo: 'Gran Corso de Carnaval',
    corto: 'Gran Corso',
    texto: 'Carros alegóricos, reinas, clones y comparsas. Termina en guerra de globos entre palcos.',
    hora: null,
    lugar: 'Por la Vía de Evitamiento.',
    antes: 'En 2024 las comparsas se formaban desde la Universidad Nacional de Cajamarca hasta el Qhapaq Ñan, donde arrancaba el desfile.',
    color: 'amarillo',
    en: {
      titulo: 'Gran Corso (Grand Parade)',
      corto: 'Gran Corso',
      texto: 'Decorated floats, carnival queens, harlequin clones, and marching troupes—ending in water-balloon battles between the grandstands.',
      lugar: 'Along Vía de Evitamiento.',
      antes: 'In 2024 troupes lined up from the National University of Cajamarca to the Qhapaq Ñan complex, where the parade began.',
    },
  },
  {
    id: 'martes',
    offset: -1,
    titulo: 'Velorio del Ño Carnavalón',
    corto: 'Velorio del Ño',
    texto: 'Las viudas de cada barrio llegan a llorarlo, con todo el teatro posible.',
    hora: null,
    lugar: 'Camino al barrio Santa Apolonia.',
    antes: 'En 2026 hubo concurso de viudas en el complejo Qhapaq Ñan.',
    color: 'turquesa',
    en: {
      titulo: 'Wake of Ño Carnavalón',
      corto: 'The Wake',
      texto: 'Each neighborhood’s satirical “widows” arrive to mourn him with maximum melodrama.',
      lugar: 'On the way up to the Santa Apolonia neighborhood.',
      antes: 'In 2026 there was even a “widows” contest at the Qhapaq Ñan complex.',
    },
  },
  {
    id: 'miercoles',
    offset: 0,
    titulo: 'Testamento y entierro',
    corto: 'Entierro del Ño',
    texto: 'Se lee su testamento burlón para las autoridades, se quema el muñeco y todos se despiden bailando.',
    hora: null,
    lugar: 'Baños del Inca.',
    antes: 'En 2024 la lectura del testamento y la cremación fueron en Baños del Inca.',
    color: 'naranja',
    en: {
      titulo: 'Will & Burial',
      corto: 'The Burial',
      texto: 'His satirical will is read aloud to roast local officials, the effigy is burned, and everyone dances one last time.',
      lugar: 'Baños del Inca (just outside Cajamarca).',
      antes: 'In 2024 the reading of the will and burning of the effigy took place in Baños del Inca.',
    },
  },
];

export interface Previa {
  id?: string;
  cuando: string;
  fecha: string | null;
  horaInicio?: string;
  fuente?: string;
  titulo: string;
  texto: string;
  en: {
    cuando: string;
    titulo: string;
    texto: string;
  };
}

export const previas: Previa[] = [
  {
    cuando: 'Inicios de enero',
    fecha: null,
    titulo: 'Afiche, programa y canción oficial',
    texto: 'La Municipalidad presenta la imagen del carnaval y el programa con horas y lugares.',
    en: {
      cuando: 'Early January',
      titulo: 'Official poster, schedule & song',
      texto: 'The Municipality unveils the year’s carnival artwork along with the official schedule of times and venues.',
    },
  },
  {
    cuando: 'Enero',
    fecha: null,
    titulo: 'Pregón',
    texto: 'El anuncio de que la fiesta se viene. En 2026 fue de noche, en el barrio Cumbemayo.',
    en: {
      cuando: 'January',
      titulo: 'Pregón (Opening Proclamation)',
      texto: 'The public announcement that carnival is coming. In 2026 it took place at night in the Cumbemayo neighborhood.',
    },
  },
  {
    cuando: 'Enero',
    fecha: null,
    id: 'bando',
    titulo: 'Gran Bando carnestolendo',
    texto: 'Barrios e instituciones desfilan por las calles. En 2026 salieron más de cincuenta mil personas.',
    en: {
      cuando: 'January',
      titulo: 'Gran Bando (Pre-Carnival Parade)',
      texto: 'Neighborhoods and local institutions parade through the streets. In 2026 more than 50,000 people joined in.',
    },
  },
  {
    cuando: 'Enero',
    fecha: null,
    titulo: 'Concurso de tradiciones',
    texto: 'Los vecinos arreglan sus calles con los colores del carnaval y compiten por la mejor.',
    en: {
      cuando: 'January',
      titulo: 'Traditions Contest',
      texto: 'Neighbors decorate their streets in carnival colors and compete for the best display.',
    },
  },
  {
    cuando: 'Semanas antes',
    fecha: null,
    titulo: 'Elección de reinas',
    texto: 'Reina del Carnaval, Infantil, de los Centros Poblados e Integración. La de la ciudad se elige en el coliseo Gran Qhapaq Ñan.',
    en: {
      cuando: 'Weeks before',
      titulo: 'Carnival Queen Pageants',
      texto: 'Carnival Queen, Children’s Queen, Rural Districts Queen, and Integration Queen. The city queen is crowned at the Gran Qhapaq Ñan Coliseum.',
    },
  },
  {
    cuando: 'Después del miércoles',
    fecha: null,
    titulo: 'Yunzas de barrio',
    texto: 'Cada barrio tumba su árbol cargado de regalos, y la fiesta sigue unos días más.',
    en: {
      cuando: 'After Ash Wednesday',
      titulo: 'Neighborhood Yunzas',
      texto: 'Each neighborhood dances around and chops down a gift-laden tree (yunza), keeping the party going for a few more days.',
    },
  },
];

export const consejos = [
  {
    titulo: 'Ropa vieja',
    texto: 'De los zapatos para arriba. La pintura del sábado no sale.',
    en: {
      titulo: 'Old clothes',
      texto: 'From shoes on up. Saturday’s paint does not wash out.',
    },
  },
  {
    titulo: 'Reserva con tiempo',
    texto: 'En 2023 los hoteles pasaron el 90 % de reservas antes de la fiesta.',
    en: {
      titulo: 'Book early',
      texto: 'In 2023 hotels passed 90% occupancy well before the festival began.',
    },
  },
  {
    titulo: 'Cómo llegar',
    texto: 'En avión, una hora desde Lima; el aeropuerto está a 15 minutos de la ciudad. En bus son unas 15 horas, con tramos a más de 4000 metros.',
    en: {
      titulo: 'Getting there',
      texto: 'A 1-hour flight from Lima; the airport is 15 minutes from town. By bus it takes about 15 hours, crossing mountain passes over 4,000 meters.',
    },
  },
  {
    titulo: 'Globos y palcos',
    texto: 'En 2024 los globos se vendían seis por un sol y el balde grande a S/ 30. Los palcos del corso, de S/ 20 a S/ 100 por persona.',
    en: {
      titulo: 'Balloons & grandstands',
      texto: 'In 2024 water balloons sold at 6 for S/ 1 and a large bucket for S/ 30. Grandstand seats for the Gran Corso ran from S/ 20 to S/ 100 per person.',
    },
  },
  {
    titulo: 'Pintura, solo el sábado',
    texto: 'Por costumbre, el resto de días se juega con agua, talco y serpentina.',
    en: {
      titulo: 'Paint on Saturday only',
      texto: 'By custom, the other days are for water, talcum powder, and streamers.',
    },
  },
  {
    titulo: 'El celular, en bolsa',
    texto: 'Bien cerrada y en un bolsillo de adentro. Nadie se salva, tu teléfono tampoco.',
    en: {
      titulo: 'Seal your phone',
      texto: 'Put it in a sealed waterproof pouch in an inner pocket. Nobody stays dry—not even your phone.',
    },
  },
];

export function diasDe(idioma: Idioma = 'es') {
  return dias.map((d) => (idioma === 'en' ? { ...d, ...d.en } : d));
}

export function previasDe(idioma: Idioma = 'es') {
  return previas.map((p) => (idioma === 'en' ? { ...p, ...p.en } : p));
}

export function consejosDe(idioma: Idioma = 'es') {
  return consejos.map((c) => (idioma === 'en' ? { ...c.en } : { titulo: c.titulo, texto: c.texto }));
}
