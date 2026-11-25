import { barrios, type Aniversario, type Barrio } from '../data/barrios';

const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

const DIA_EN_MS = 86_400_000;

export interface ProximoAniversario {
  barrio: Barrio;
  aniversario: Aniversario;
  faltan: number;
}

export function formatearAniversario({ dia, mes }: Aniversario): string {
  return `${dia} de ${MESES[mes - 1]}`;
}

export function partirFaltan(faltan: number): { numero: string; unidad: string } {
  if (faltan === 0) return { numero: 'Hoy', unidad: '' };
  return { numero: String(faltan), unidad: faltan === 1 ? 'día' : 'días' };
}

export function diasParaAniversario(hoy: Date, { dia, mes }: Aniversario): number {
  const anio = hoy.getUTCFullYear();
  const esteAnio = Date.UTC(anio, mes - 1, dia);
  const siguiente = esteAnio >= hoy.getTime() ? esteAnio : Date.UTC(anio + 1, mes - 1, dia);
  return Math.round((siguiente - hoy.getTime()) / DIA_EN_MS);
}

export function describirFaltan(faltan: number, nombre: string): { numero: string; texto: string } {
  if (faltan === 0) return { numero: 'Hoy', texto: `cumple años ${nombre}` };
  const dias = faltan === 1 ? 'día' : 'días';
  return { numero: String(faltan), texto: `${dias} para el aniversario de ${nombre}` };
}

export function proximosAniversarios(hoy: Date, cantidad: number): ProximoAniversario[] {
  return barrios
    .flatMap((barrio) =>
      barrio.aniversario ? [{ barrio, aniversario: barrio.aniversario, faltan: diasParaAniversario(hoy, barrio.aniversario) }] : [],
    )
    .sort((a, b) => a.faltan - b.faltan)
    .slice(0, cantidad);
}
