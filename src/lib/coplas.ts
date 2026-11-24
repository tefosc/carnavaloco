/**
 * Al cantar una copla, cada verso se dice dos veces; en los cancioneros eso se
 * marca con «bis». Algunas se cantan repitiendo cada par de versos: entonces el
 * «bis» va al final de cada par, como las imprime su fuente.
 */
export type Repite = 'verso' | 'par';

export interface VersoCantado {
  texto: string;
  bis: boolean;
}

export const conBis = (versos: string[], repite: Repite = 'verso'): VersoCantado[] =>
  versos.map((texto, i) => ({ texto, bis: repite === 'verso' || i % 2 === 1 }));
