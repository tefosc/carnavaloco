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

const formato = new Intl.DateTimeFormat('es-PE', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
});

export function formatearFecha(fecha: Date): string {
  return formato.format(fecha);
}
