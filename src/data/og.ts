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
};
