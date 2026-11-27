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
