import { es, type Diccionario } from './es';
import { en } from './en';
import { idiomaDeRuta, type Idioma } from './rutas';

export type { Idioma, Diccionario };
export * from './rutas';

const DICCIONARIOS: Record<Idioma, Diccionario> = { es, en };

export const LOCALE_HTML: Record<Idioma, string> = {
  es: 'es-PE',
  en: 'en',
};

export const LOCALE_INTL: Record<Idioma, string> = {
  es: 'es-PE',
  en: 'en-US',
};

export const LOCALE_OG: Record<Idioma, string> = {
  es: 'es_PE',
  en: 'en_US',
};

/** Nombre de cada idioma escrito en ese mismo idioma (para el selector). */
export const NOMBRE_IDIOMA: Record<Idioma, string> = {
  es: 'Español',
  en: 'English',
};

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/**
 * Las fechas de las fuentes están escritas en español («16 de julio de 2026», «agosto de 2024»).
 * En otro idioma se devuelven con su formato; si no se reconoce la forma, quedan como están.
 */
export function fechaFuente(fecha: string, idioma: Idioma = 'es'): string {
  if (idioma === 'es') return fecha;
  const partes = fecha.trim().match(/^(?:(\d{1,2}) de )?(\p{L}+) de (\d{4})$/u);
  if (!partes) return fecha;
  const [, dia, nombreMes, anio] = partes;
  const mes = MESES.indexOf(nombreMes.toLowerCase().replace('setiembre', 'septiembre'));
  if (mes < 0) return fecha;
  return new Intl.DateTimeFormat(LOCALE_INTL[idioma], {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    ...(dia ? { day: 'numeric' as const } : {}),
  }).format(new Date(Date.UTC(Number(anio), mes, Number(dia ?? 1))));
}

export function t(idioma: Idioma = 'es'): Diccionario {
  return DICCIONARIOS[idioma];
}

export function idiomaDesdeUrl(url: URL): Idioma {
  return idiomaDeRuta(url.pathname);
}

/** Lee el idioma actual en el navegador a partir de `<html lang>`. */
export function idiomaEnNavegador(): Idioma {
  if (typeof document === 'undefined') return 'es';
  return document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'es';
}

export function formatearRangoFechas(inicio: Date, fin: Date, idioma: Idioma = 'es'): string {
  const locale = LOCALE_INTL[idioma];
  const mismoMes = inicio.getUTCMonth() === fin.getUTCMonth();
  const dia = new Intl.DateTimeFormat(locale, { day: 'numeric', timeZone: 'UTC' });
  const mes = new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' });
  const diaMes = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', timeZone: 'UTC' });

  if (idioma === 'en') {
    return mismoMes
      ? `${mes.format(inicio)} ${dia.format(inicio)}–${dia.format(fin)}`
      : `${diaMes.format(inicio)} to ${diaMes.format(fin)}`;
  }

  return mismoMes
    ? `${dia.format(inicio)} al ${dia.format(fin)} de ${mes.format(fin).toLowerCase()}`
    : `${diaMes.format(inicio)} al ${diaMes.format(fin)}`;
}
