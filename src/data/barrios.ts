import type { Color } from './carnaval';

export interface Aniversario {
  dia: number;
  mes: number;
}

export interface Barrio {
  id: string;
  nombre: string;
  sector?: number;
  aniversario?: Aniversario;
  apodo?: string;
  lema?: string;
  rival?: string;
  hechos: string[];
  color: Color;
}

export const barrios: Barrio[] = [
  {
    id: 'san-sebastian',
    nombre: 'San Sebastián',
    sector: 1,
    aniversario: { dia: 14, mes: 7 },
    lema: 'Para chicha y para pan, el barrio San Sebastián.',
    rival: 'san-pedro',
    hechos: [
      'Rival de siempre de San Pedro: en otros tiempos sus patrullas se agarraban a trompadas el martes de carnaval.',
    ],
    color: 'verde',
  },
  {
    id: 'san-jose',
    nombre: 'San José',
    sector: 2,
    aniversario: { dia: 1, mes: 5 },
    lema: 'San José de los Valientes, cuna de artistas.',
    hechos: [
      'Uno de los barrios tradicionales que desfilan con sus comparsas.',
    ],
    color: 'naranja',
  },
  {
    id: 'san-pedro',
    nombre: 'San Pedro',
    sector: 3,
    aniversario: { dia: 29, mes: 6 },
    lema: 'Para muchachas y flores, San Pedro de mis amores.',
    rival: 'san-sebastian',
    hechos: [
      'El Club Comparsa San Pedro nació en 1972.',
      'La otra mitad de la vieja rivalidad con San Sebastián.',
    ],
    color: 'turquesa',
  },
  {
    id: 'cumbemayo',
    nombre: 'Cumbemayo',
    sector: 4,
    aniversario: { dia: 23, mes: 3 },
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
    id: 'pueblo-nuevo',
    nombre: 'Pueblo Nuevo',
    sector: 5,
    aniversario: { dia: 26, mes: 5 },
    hechos: [],
    color: 'naranja',
  },
  {
    id: 'chontapaccha',
    nombre: 'Chontapaccha',
    sector: 6,
    aniversario: { dia: 13, mes: 7 },
    apodo: 'El manantial del amor',
    hechos: [
      'Durante el carnaval se baila aquí el «Manantial del Amor».',
    ],
    color: 'azul',
  },
  {
    id: 'la-colmena',
    nombre: 'La Colmena',
    sector: 7,
    aniversario: { dia: 23, mes: 9 },
    hechos: [],
    color: 'amarillo',
  },
  {
    id: 'la-merced',
    nombre: 'La Merced',
    sector: 8,
    aniversario: { dia: 24, mes: 9 },
    lema: 'La Merced es cuna de reinas.',
    hechos: [
      'El lema no miente: de aquí son la reina de 2018 y la de 2026.',
    ],
    color: 'amarillo',
  },
  {
    id: 'pueblo-libre',
    nombre: 'Pueblo Libre',
    sector: 9,
    aniversario: { dia: 3, mes: 11 },
    hechos: [],
    color: 'turquesa',
  },
  {
    id: 'san-antonio',
    nombre: 'San Antonio',
    sector: 10,
    aniversario: { dia: 13, mes: 6 },
    hechos: [],
    color: 'fucsia',
  },
  {
    id: 'las-torrecitas',
    nombre: 'Las Torrecitas',
    sector: 11,
    aniversario: { dia: 4, mes: 4 },
    hechos: [],
    color: 'verde',
  },
  {
    id: 'santa-elena',
    nombre: 'Santa Elena',
    sector: 12,
    aniversario: { dia: 18, mes: 8 },
    hechos: [
      'La portada de Cajamarca: aquí se le da la bienvenida al Ño Carnavalón cuando entra a la ciudad.',
    ],
    color: 'fucsia',
  },
  {
    id: 'san-martin',
    nombre: 'San Martín',
    sector: 13,
    aniversario: { dia: 20, mes: 10 },
    hechos: [],
    color: 'azul',
  },
  {
    id: 'mollepampa',
    nombre: 'Mollepampa',
    sector: 14,
    aniversario: { dia: 10, mes: 6 },
    hechos: [
      'Aquí se hace el Festival del Landaruto, en las noches del carnaval.',
    ],
    color: 'naranja',
  },
  {
    id: 'san-vicente',
    nombre: 'San Vicente',
    sector: 15,
    aniversario: { dia: 19, mes: 12 },
    hechos: [
      'De aquí salió la reina del Carnaval Inolvidable 2024, la Edición Bicentenario.',
    ],
    color: 'azul',
  },
  {
    id: 'el-estanco',
    nombre: 'El Estanco',
    sector: 16,
    aniversario: { dia: 19, mes: 9 },
    hechos: [],
    color: 'turquesa',
  },
  {
    id: 'lucmacucho',
    nombre: 'Lucmacucho',
    sector: 17,
    aniversario: { dia: 8, mes: 10 },
    hechos: [],
    color: 'verde',
  },
  {
    id: 'la-florida',
    nombre: 'La Florida',
    sector: 18,
    aniversario: { dia: 11, mes: 6 },
    hechos: [],
    color: 'amarillo',
  },
  {
    id: 'nuevo-cajamarca',
    nombre: 'Nuevo Cajamarca',
    sector: 19,
    aniversario: { dia: 30, mes: 11 },
    hechos: [],
    color: 'fucsia',
  },
  {
    id: 'urubamba',
    nombre: 'Urubamba',
    sector: 20,
    aniversario: { dia: 27, mes: 10 },
    hechos: [],
    color: 'naranja',
  },
  {
    id: 'la-tulpuna',
    nombre: 'La Tulpuna',
    sector: 21,
    aniversario: { dia: 6, mes: 1 },
    hechos: [],
    color: 'azul',
  },
  {
    id: 'samana-cruz',
    nombre: 'Samana Cruz',
    sector: 22,
    aniversario: { dia: 29, mes: 9 },
    hechos: [],
    color: 'verde',
  },
  {
    id: 'la-paccha',
    nombre: 'La Paccha',
    sector: 23,
    aniversario: { dia: 12, mes: 6 },
    hechos: [],
    color: 'turquesa',
  },
  {
    id: 'villa-huacariz',
    nombre: 'Villa Huacariz',
    sector: 24,
    aniversario: { dia: 20, mes: 8 },
    hechos: [],
    color: 'amarillo',
  },
  {
    id: 'dos-de-mayo',
    nombre: 'Dos de Mayo',
    hechos: [],
    color: 'verde',
  },
  {
    id: 'santa-apolonia',
    nombre: 'Santa Apolonia',
    hechos: [
      'Hacia aquí van las viudas con el ataúd del Ño Carnavalón el martes de velorio, al pie del cerro y su mirador.',
    ],
    color: 'verde',
  },
];

export const centrosPoblados: Array<{ nombre: string; texto?: string }> = [
  {
    nombre: 'Chamis',
    texto: 'Su representación del clarín ganó el corso de 2024 como campeón de campeones, con 98 puntos.',
  },
  {
    nombre: 'Pariamarca',
    texto: 'De aquí fueron las reinas de los centros poblados de 2025 y de 2026.',
  },
  { nombre: 'Huambocancha' },
  { nombre: 'Porcón' },
];

export const fuentesBarrios = [
  {
    medio: 'Municipalidad Provincial de Cajamarca',
    titulo: 'Ordenanza Municipal N.° 894-CMPC: los 24 sectores del distrito y su aniversario',
    url: 'https://cdn.www.gob.pe/uploads/document/file/6292658/5531255-ordenanza-municipal-n-894-cmpc.pdf',
  },
  {
    medio: 'Andina',
    titulo: 'Así vivió Cajamarca el inicio de su tradicional carnaval',
    url: 'https://andina.pe/ingles/noticia-asi-vivio-cajamarca-inicio-su-tradicional-carnaval-742741.aspx',
  },
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
