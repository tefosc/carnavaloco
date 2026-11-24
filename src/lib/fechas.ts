/**
 * El carnaval de Cajamarca se mueve con el calendario litúrgico:
 * termina el Miércoles de Ceniza, 46 días antes del Domingo de Pascua.
 * Todas las fechas se manejan en UTC a medianoche para evitar saltos por zona horaria.
 */

const DIA_MS = 86_400_000;
/** Cajamarca está en UTC-5 todo el año. */
const OFFSET_PERU_MS = 5 * 60 * 60 * 1000;

/** Domingo de Pascua (algoritmo anónimo gregoriano de Meeus/Jones/Butcher). */
export function domingoDePascua(anio: number): Date {
  const a = anio % 19;
  const b = Math.floor(anio / 100);
  const c = anio % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(anio, mes - 1, dia));
}

export function miercolesDeCeniza(anio: number): Date {
  return new Date(domingoDePascua(anio).getTime() - 46 * DIA_MS);
}

/** Fecha (UTC medianoche) de un día del carnaval, relativo al Miércoles de Ceniza. */
export function diaDeCarnaval(anio: number, offset: number): Date {
  return new Date(miercolesDeCeniza(anio).getTime() + offset * DIA_MS);
}

/**
 * Año del próximo carnaval (o del que está en curso).
 * Se considera terminado al final del Miércoles de Ceniza, hora de Perú.
 */
export function anioProximoCarnaval(ahora: Date = new Date()): number {
  const anio = ahora.getUTCFullYear();
  const finEsteAnio = miercolesDeCeniza(anio).getTime() + DIA_MS + OFFSET_PERU_MS;
  return ahora.getTime() < finEsteAnio ? anio : anio + 1;
}

/** Instante en que empieza un día del carnaval, en hora de Perú. */
export function inicioEnPeru(fecha: Date): number {
  return fecha.getTime() + OFFSET_PERU_MS;
}

/** El día de hoy en Perú, como fecha UTC a medianoche (comparable con diaDeCarnaval). */
export function hoyEnPeru(ahora: Date = new Date()): Date {
  const peru = new Date(ahora.getTime() - OFFSET_PERU_MS);
  return new Date(Date.UTC(peru.getUTCFullYear(), peru.getUTCMonth(), peru.getUTCDate()));
}

export type Momento =
  | { fase: 'antes'; faltan: number }
  | { fase: 'durante'; offset: number }
  | { fase: 'despues' };

/**
 * En qué momento del carnaval de `anio` estamos, contando días de calendario en Perú:
 * antes (y cuántos días faltan para el sábado), durante (qué día, relativo al
 * Miércoles de Ceniza, como en diaDeCarnaval) o después.
 */
export function momentoDelCarnaval(anio: number, ahora: Date = new Date()): Momento {
  const hoy = hoyEnPeru(ahora).getTime();
  const inicio = diaDeCarnaval(anio, -4).getTime();
  const fin = diaDeCarnaval(anio, 0).getTime();
  if (hoy < inicio) return { fase: 'antes', faltan: Math.round((inicio - hoy) / DIA_MS) };
  if (hoy <= fin) return { fase: 'durante', offset: Math.round((hoy - fin) / DIA_MS) };
  return { fase: 'despues' };
}

/**
 * La hora actual en el navegador. Con ?fecha=AAAA-MM-DD en la dirección usa ese día
 * (a mediodía en Perú): sirve para ver cómo se ve la web un día de carnaval.
 */
export function ahoraEnNavegador(): Date {
  const prueba = new URLSearchParams(location.search).get('fecha');
  const m = prueba?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], 12) + OFFSET_PERU_MS) : new Date();
}

const formato = new Intl.DateTimeFormat('es-PE', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
});

export function formatearFecha(fecha: Date): string {
  return formato.format(fecha);
}
