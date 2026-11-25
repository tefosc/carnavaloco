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

export function etiquetaFaltan(faltan: number): string {
  if (faltan === 0) return 'Hoy';
  if (faltan === 1) return 'Mañana';
  return `en ${faltan} días`;
}

function diasHasta(hoy: Date, { dia, mes }: Aniversario): number {
  const anio = hoy.getUTCFullYear();
  const esteAnio = Date.UTC(anio, mes - 1, dia);
  const siguiente = esteAnio >= hoy.getTime() ? esteAnio : Date.UTC(anio + 1, mes - 1, dia);
  return Math.round((siguiente - hoy.getTime()) / DIA_EN_MS);
}

export function proximosAniversarios(hoy: Date, cantidad: number): ProximoAniversario[] {
  return barrios
    .flatMap((barrio) =>
      barrio.aniversario ? [{ barrio, aniversario: barrio.aniversario, faltan: diasHasta(hoy, barrio.aniversario) }] : [],
    )
    .sort((a, b) => a.faltan - b.faltan)
    .slice(0, cantidad);
}
