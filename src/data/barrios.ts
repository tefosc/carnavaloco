/**
 * Barrios del carnaval: lo que dicen de cada uno las notas de prensa.
 * Los que solo aparecen nombrados van en `otrosBarrios`.
 */
import type { Color } from './carnaval';

export interface Barrio {
  id: string;
  nombre: string;
  lema?: string;
  hechos: string[];
  color: Color;
}

export const barrios: Barrio[] = [
  {
    id: 'cumbemayo',
    nombre: 'Cumbemayo',
    lema: 'Cumbemayo, la flor del Cumbe.',
    hechos: [
      'Lo señalan como el barrio más ganador del carnaval.',
      'En 2024 abrió el concurso como uno de los más fuertes en patrullas.',
      'En 2026 el carnaval arrancó aquí, con un pregón nocturno.',
      'De aquí salió la reina del Carnaval del Reencuentro, en 2023.',
      'Sus carnavaleros llegaron a esperar con tarolas y coplas a familiares que volvían desde Japón.',
    ],
    color: 'fucsia',
  },
  {
    id: 'la-merced',
    nombre: 'La Merced',
    lema: 'La Merced es cuna de reinas.',
    hechos: [
      'El lema no miente: de aquí son la reina de 2018 y la de 2026.',
    ],
    color: 'amarillo',
  },
  {
    id: 'san-sebastian',
    nombre: 'San Sebastián',
    lema: 'Para chicha y para pan, el barrio San Sebastián.',
    hechos: [
      'Rival de siempre de San Pedro: en otros tiempos sus patrullas se agarraban a trompadas el martes de carnaval.',
    ],
    color: 'verde',
  },
  {
    id: 'san-pedro',
    nombre: 'San Pedro',
    lema: 'Para muchachas y flores, San Pedro de mis amores.',
    hechos: [
      'El Club Comparsa San Pedro nació en 1972.',
      'La otra mitad de la vieja rivalidad con San Sebastián.',
    ],
    color: 'turquesa',
  },
  {
    id: 'san-jose',
    nombre: 'San José',
    lema: 'San José de los Valientes, cuna de artistas.',
    hechos: ['Uno de los barrios tradicionales que desfilan con sus comparsas.'],
    color: 'naranja',
  },
  {
    id: 'san-vicente',
    nombre: 'San Vicente',
    hechos: ['De aquí salió la reina del Carnaval Inolvidable 2024, la Edición Bicentenario.'],
    color: 'azul',
  },
  {
    id: 'santa-elena',
    nombre: 'Santa Elena',
    hechos: ['La portada de Cajamarca: aquí se le da la bienvenida al Ño Carnavalón cuando entra a la ciudad.'],
    color: 'fucsia',
  },
  {
    id: 'santa-apolonia',
    nombre: 'Santa Apolonia',
    hechos: ['Hacia aquí van las viudas con el ataúd del Ño Carnavalón el martes de velorio, al pie del cerro y su mirador.'],
    color: 'verde',
  },
];

export const otrosBarrios = ['Dos de Mayo', 'Chontapaccha', 'Pueblo Nuevo'];

export const centrosPoblados = [
  {
    nombre: 'Chamis',
    texto: 'Su representación del clarín ganó el corso de 2024 como campeón de campeones, con 98 puntos.',
  },
  {
    nombre: 'Pariamarca',
    texto: 'De aquí fueron las reinas de los centros poblados de 2025 y de 2026.',
  },
];

export const fuentesBarrios = [
  {
    medio: 'Andina',
    titulo: 'Carnaval de Cajamarca: personajes y música protagonistas de esta festividad',
    url: 'https://andina.pe/agencia/noticia-carnaval-cajamarca-conoce-los-personajes-y-musica-protagonistas-esta-festividad-973754.aspx',
  },
  {
    medio: 'Andina',
    titulo: '¿Qué claves hacen de Cajamarca emblema del carnaval peruano?',
    url: 'https://andina.pe/agencia/noticia-que-claves-hacen-cajamarca-emblema-del-carnaval-peruano-y-elementos-destacan-1059896.aspx',
  },
  {
    medio: 'La República',
    titulo: 'Carnaval de Cajamarca 2024',
    url: 'https://larepublica.pe/turismo/2024/02/23/carnaval-de-cajamarca-2024-para-el-rico-y-para-el-pobre-para-todos-lo-hizo-dios-carnaval-inolvidable-carnaval-de-cajamarca-1216006',
  },
  {
    medio: 'RPP',
    titulo: 'Cajamarca está de fiesta con su carnaval',
    url: 'https://rpp.pe/peru/actualidad/cajamarca-esta-de-fiesta-con-su-carnaval-noticia-673520',
  },
  {
    medio: 'RPP',
    titulo: 'Recuerdos del carnaval cajamarquino',
    url: 'https://rpp.pe/peru/actualidad/recuerdos-del-carnaval-cajamarquino-noticia-565709',
  },
  {
    medio: 'El Comercio',
    titulo: 'Carnaval de Cajamarca: un viaje de colores, comparsas y tradiciones',
    url: 'https://elcomercio.pe/somos/carnaval-de-cajamarca-un-viaje-de-colores-tradiciones-y-comparsas-historia-viaje-noticia/',
  },
];
