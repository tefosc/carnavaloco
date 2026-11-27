import { barrios, type Aniversario, type Barrio } from '../data/barrios';
import { LOCALE_INTL, t, type Idioma } from '../i18n';

const formatosAniversario = {
  es: new Intl.DateTimeFormat(LOCALE_INTL.es, { day: 'numeric', month: 'long', timeZone: 'UTC' }),
  en: new Intl.DateTimeFormat(LOCALE_INTL.en, { day: 'numeric', month: 'long', timeZone: 'UTC' }),
};

const DIA_EN_MS = 86_400_000;

export interface ProximoAniversario {
  barrio: Barrio;
  aniversario: Aniversario;
  faltan: number;
}

export function formatearAniversario({ dia, mes }: Aniversario, idioma: Idioma = 'es'): string {
  // Año bisiesto para que 29 de febrero sea válido
  return formatosAniversario[idioma].format(new Date(Date.UTC(2024, mes - 1, dia)));
}

export function partirFaltan(faltan: number, idioma: Idioma = 'es'): { numero: string; unidad: string } {
  const txt = t(idioma).aniversarios;
  if (faltan === 0) return { numero: txt.hoy, unidad: '' };
  return { numero: String(faltan), unidad: faltan === 1 ? txt.dia : txt.dias };
}

export function diasParaAniversario(hoy: Date, { dia, mes }: Aniversario): number {
  const anio = hoy.getUTCFullYear();
  const esteAnio = Date.UTC(anio, mes - 1, dia);
  const siguiente = esteAnio >= hoy.getTime() ? esteAnio : Date.UTC(anio + 1, mes - 1, dia);
  return Math.round((siguiente - hoy.getTime()) / DIA_EN_MS);
}

export function describirFaltan(faltan: number, nombre: string, idioma: Idioma = 'es'): { numero: string; texto: string } {
  const txt = t(idioma).aniversarios;
  if (faltan === 0) return { numero: txt.hoy, texto: txt.hoyBarrio(nombre) };
  return { numero: String(faltan), texto: txt.faltanBarrio(faltan, nombre) };
}

export function proximosAniversarios(hoy: Date, cantidad: number): ProximoAniversario[] {
  return barrios
    .flatMap((barrio) =>
      barrio.aniversario ? [{ barrio, aniversario: barrio.aniversario, faltan: diasParaAniversario(hoy, barrio.aniversario) }] : [],
    )
    .sort((a, b) => a.faltan - b.faltan)
    .slice(0, cantidad);
}
