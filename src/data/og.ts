/**
 * Texto y color de la imagen para compartir de cada página.
 * La clave es el nombre del archivo: /og/<clave>.png
 */
import type { DatosOg } from '../lib/og';

export const ogPaginas: Record<string, DatosOg> = {
  inicio: {
    titulo: 'Carnaval',
    bajada: 'Cinco días de agua, pintura y coplas. Aquí nadie se salva.',
    fondo: 'fucsia',
    sello: '6 al 10 de febrero 2027',
  },
  '2027': {
    titulo: '2027',
    bajada: 'Del sábado 6 al miércoles 10 de febrero: el programa día por día.',
    fondo: 'tinta',
    sello: '¡Se viene!',
  },
  'la-fiesta': {
    titulo: 'La fiesta',
    bajada: 'Ño Carnavalón, clones, viudas, música y comida.',
    fondo: 'azul',
  },
  ediciones: {
    titulo: 'Ediciones',
    bajada: 'Los carnavales desde 2017: reinas, cifras y lo que pasó cada año.',
    fondo: 'naranja',
    relleno: 'blanco',
  },
  coplas: {
    titulo: 'Coplas',
    bajada: 'Cuatro versos y mucha lengua. Tradicionales, nuevas y el contrapunto.',
    fondo: 'amarillo',
  },
  habla: {
    titulo: 'Habla',
    bajada: 'Shulca, misho, ¡alalau!: el castellano que canta.',
    fondo: 'verde',
  },
  historia: {
    titulo: 'Historia',
    bajada: 'De la copla española del siglo XVI al carnaval de barrio.',
    fondo: 'tinta',
    relleno: 'fucsia',
  },
  guia: {
    titulo: 'Guía',
    bajada: 'Cómo llegar, dónde quedarse, la altura, qué llevar y a quién llamar. Con fuentes.',
    fondo: 'azul',
    relleno: 'amarillo',
  },
  barrios: {
    titulo: 'Barrios',
    bajada: 'Cumbemayo, San Sebastián, San Pedro, La Merced y los demás.',
    fondo: 'turquesa',
  },
  fuentes: {
    titulo: 'Fuentes',
    bajada: 'Documentos, crónicas y créditos fotográficos del Carnaval de Cajamarca.',
    fondo: 'tinta',
    relleno: 'amarillo',
  },
  // Versión en inglés (/en/)
  'en-inicio': {
    titulo: 'Carnival',
    bajada: 'Five days of water, paint, and coplas. Nobody stays dry.',
    fondo: 'fucsia',
    sello: 'Feb 6–10 2027',
  },
  'en-2027': {
    titulo: '2027',
    bajada: 'Saturday Feb 6 to Wednesday Feb 10: the day-by-day schedule.',
    fondo: 'tinta',
    sello: 'Coming up!',
  },
  'en-la-fiesta': {
    titulo: 'The Party',
    bajada: 'Ño Carnavalón, clones, widows, music, and local food.',
    fondo: 'azul',
  },
  'en-ediciones': {
    titulo: 'Editions',
    bajada: 'Carnivals since 2017: queens, numbers, and what happened each year.',
    fondo: 'naranja',
    relleno: 'blanco',
  },
  'en-coplas': {
    titulo: 'Coplas',
    bajada: 'Four sharp lines and plenty of wit. Traditional, new, and contrapunto.',
    fondo: 'amarillo',
  },
  'en-habla': {
    titulo: 'Slang',
    bajada: 'Shulca, misho, ¡alalau!: the Cajamarca Spanish that sings.',
    fondo: 'verde',
  },
  'en-historia': {
    titulo: 'History',
    bajada: 'From 16th-century Spanish verse to a neighborhood carnival.',
    fondo: 'tinta',
    relleno: 'fucsia',
  },
  'en-guia': {
    titulo: 'Guide',
    bajada: 'Getting there, where to stay, altitude, what to pack, and emergencies.',
    fondo: 'azul',
    relleno: 'amarillo',
  },
  'en-barrios': {
    titulo: 'Neighborhoods',
    bajada: 'Cumbemayo, San Sebastián, San Pedro, La Merced, and the rest.',
    fondo: 'turquesa',
  },
  'en-fuentes': {
    titulo: 'Sources',
    bajada: 'Documents, chronicles, and photo credits for Carnaval de Cajamarca.',
    fondo: 'tinta',
    relleno: 'amarillo',
  },
};
