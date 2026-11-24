/**
 * Carnaval de Cajamarca 2027: del sábado 6 al miércoles 10 de febrero.
 *
 * CUANDO SALGA EL PROGRAMA OFICIAL (la Municipalidad lo presenta en los primeros
 * días de enero): llena `hora` y, si cambia, `lugar` de cada día y la `fecha`
 * de cada actividad previa, y pon `programaOficial` en true.
 * Mientras `hora` sea null, la página muestra "Por confirmar".
 */
import type { Color } from './carnaval';

export const ANIO = 2027;

/** true cuando las horas y lugares vengan del programa oficial. */
export const programaOficial = false;

export interface Dia {
  offset: number;
  titulo: string;
  texto: string;
  hora: string | null;
  lugar: string;
  /** Lo que pasó en ediciones anteriores, para saber qué esperar. */
  antes: string;
  color: Color;
}

export const dias: Dia[] = [
  {
    offset: -4,
    titulo: 'Ingreso del Ño Carnavalón',
    texto: 'El rey de la fiesta entra a la ciudad y empieza el juego. Es el único día con pintura permitida.',
    hora: null,
    lugar: 'Entra por el barrio Santa Elena, la portada de la ciudad, por la avenida Independencia.',
    antes: 'En 2024 el recorrido terminó en el complejo Qhapaq Ñan con un concierto de más de seis horas.',
    color: 'fucsia',
  },
  {
    offset: -3,
    titulo: 'Concurso de patrullas y comparsas',
    texto: 'Los barrios desfilan y compiten en damas, varones, mixta, infantil y vestimenta típica.',
    hora: null,
    lugar: 'Por las calles del centro; el jurado califica en la Plaza de Armas.',
    antes: 'En 2024 fueron casi ocho horas de pasacalle y 43 comparsas.',
    color: 'verde',
  },
  {
    offset: -2,
    titulo: 'Gran Corso de Carnaval',
    texto: 'Carros alegóricos, reinas, clones y comparsas. Termina en guerra de globos entre palcos.',
    hora: null,
    lugar: 'Por la Vía de Evitamiento.',
    antes: 'En 2024 las comparsas se formaban desde la Universidad Nacional de Cajamarca hasta el Qhapaq Ñan, donde arrancaba el desfile.',
    color: 'amarillo',
  },
  {
    offset: -1,
    titulo: 'Velorio del Ño Carnavalón',
    texto: 'Las viudas de cada barrio llegan a llorarlo, con todo el teatro posible.',
    hora: null,
    lugar: 'Camino al barrio Santa Apolonia.',
    antes: 'En 2026 hubo concurso de viudas en el complejo Qhapaq Ñan.',
    color: 'turquesa',
  },
  {
    offset: 0,
    titulo: 'Testamento y entierro',
    texto: 'Se lee su testamento burlón para las autoridades, se quema el muñeco y todos se despiden bailando.',
    hora: null,
    lugar: 'Baños del Inca.',
    antes: 'En 2024 la lectura del testamento y la cremación fueron en Baños del Inca.',
    color: 'naranja',
  },
];

export interface Previa {
  cuando: string;
  /** Fecha exacta cuando se anuncie, por ejemplo "sábado 16 de enero". */
  fecha: string | null;
  titulo: string;
  texto: string;
}

export const previas: Previa[] = [
  {
    cuando: 'Inicios de enero',
    fecha: null,
    titulo: 'Afiche, programa y canción oficial',
    texto: 'La Municipalidad presenta la imagen del carnaval y el programa con horas y lugares.',
  },
  {
    cuando: 'Enero',
    fecha: null,
    titulo: 'Pregón',
    texto: 'El anuncio de que la fiesta se viene. En 2026 fue de noche, en el barrio Cumbemayo.',
  },
  {
    cuando: 'Enero',
    fecha: null,
    titulo: 'Gran Bando carnestolendo',
    texto: 'Barrios e instituciones desfilan por las calles. En 2026 salieron más de cincuenta mil personas.',
  },
  {
    cuando: 'Enero',
    fecha: null,
    titulo: 'Concurso de tradiciones',
    texto: 'Los vecinos arreglan sus calles con los colores del carnaval y compiten por la mejor.',
  },
  {
    cuando: 'Semanas antes',
    fecha: null,
    titulo: 'Elección de reinas',
    texto: 'Reina del Carnaval, Infantil, de los Centros Poblados e Integración. La de la ciudad se elige en el coliseo Gran Qhapaq Ñan.',
  },
  {
    cuando: 'Después del miércoles',
    fecha: null,
    titulo: 'Yunzas de barrio',
    texto: 'Cada barrio tumba su árbol cargado de regalos, y la fiesta sigue unos días más.',
  },
];

export const consejos = [
  {
    titulo: 'Ropa vieja',
    texto: 'De los zapatos para arriba. La pintura del sábado no sale.',
  },
  {
    titulo: 'Reserva con tiempo',
    texto: 'En 2023 los hoteles pasaron el 90 % de reservas antes de la fiesta.',
  },
  {
    titulo: 'Cómo llegar',
    texto: 'En avión, una hora desde Lima; el aeropuerto está a 15 minutos de la ciudad. En bus son unas 15 horas, con tramos a más de 4000 metros.',
  },
  {
    titulo: 'Globos y palcos',
    texto: 'En 2024 los globos se vendían seis por un sol y el balde grande a S/ 30. Los palcos del corso, de S/ 20 a S/ 100 por persona.',
  },
  {
    titulo: 'Pintura, solo el sábado',
    texto: 'El resto de días se juega con agua, talco y serpentina.',
  },
  {
    titulo: 'El celular, en bolsa',
    texto: 'Bien cerrada y en un bolsillo de adentro. Nadie se salva, tu teléfono tampoco.',
  },
];
