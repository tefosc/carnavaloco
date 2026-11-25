/**
 * Rima y métrica de las coplas, para el juego «Completa la copla» y para «Arma tu copla».
 * Son reglas de oído, no un tratado: aciertan en las coplas del sitio y en la gran
 * mayoría de versos, pero un verso raro puede contarse una sílaba de más o de menos.
 */

/** Separa la última palabra de un verso: lo de antes, la palabra y la puntuación final. */
export function partirVerso(verso: string) {
  const m = verso.match(/^(.*?)([\p{L}]+)([^\p{L}]*)$/u);
  return m ? { antes: m[1], palabra: m[2], despues: m[3] } : null;
}

interface Nucleo {
  /** Vocal que suena en la sílaba (en un diptongo, la fuerte). */
  vocal: string;
  /** Posición de esa vocal en la palabra. */
  pos: number;
  tilde: boolean;
}

const sinTilde = (ch: string) => ch.normalize('NFD').replace(/[̀-ͯ]/g, '');
const fuerte = (v: string) => 'aeo'.includes(v);

/**
 * Núcleos de sílaba de una palabra. Junta los diptongos (medio → e-o, adiós → o),
 * salvo que la vocal débil lleve tilde (día → i-a). La u de «que», «qui», «gue» y
 * «gui» no suena.
 */
function nucleos(palabra: string): Nucleo[] {
  const letras = [...palabra.toLowerCase()];
  const lista: Nucleo[] = [];
  /** La vocal anterior, si iba pegada a esta. */
  let anterior: { base: string; tilde: boolean } | null = null;
  letras.forEach((ch, pos) => {
    const base = sinTilde(ch);
    const tilde = /[áéíóú]/.test(ch);
    const siguiente = sinTilde(letras[pos + 1] ?? '');
    const uMuda = ch === 'u' && (letras[pos - 1] === 'q' || (letras[pos - 1] === 'g' && 'ei'.includes(siguiente)));
    if (!'aeiou'.includes(base) || ch === 'ü' || uMuda) {
      anterior = null;
      return;
    }
    const ultimo = lista.at(-1);
    // Hiato: dos fuertes juntas, o una débil con tilde (día, país). Lo demás es diptongo.
    const hiato =
      !anterior ||
      (fuerte(base) && fuerte(anterior.base)) ||
      (!fuerte(base) && tilde) ||
      (!fuerte(anterior.base) && anterior.tilde);
    if (hiato || !ultimo) {
      lista.push({ vocal: base, pos, tilde });
    } else {
      // En el diptongo suena la fuerte; entre dos débiles, la segunda (ciudad, cuidado)
      ultimo.tilde ||= tilde;
      if (fuerte(base) || !fuerte(ultimo.vocal)) {
        ultimo.vocal = base;
        ultimo.pos = pos;
      }
    }
    anterior = { base, tilde };
  });
  // «y» sola suena como vocal
  if (lista.length === 0 && palabra.toLowerCase() === 'y') lista.push({ vocal: 'i', pos: 0, tilde: false });
  return lista;
}

/**
 * Sílaba con acento: la de la tilde; si no hay, llana si la palabra termina en
 * vocal, n o s, y aguda en lo demás.
 */
function tonica(palabra: string, lista: Nucleo[]): number {
  const conTilde = lista.findIndex((n) => n.tilde);
  if (conTilde !== -1) return conTilde;
  return /[aeiouns]$/.test(palabra.toLowerCase()) && lista.length > 1 ? lista.length - 2 : lista.length - 1;
}

/** Rima asonante: las vocales desde la sílaba con acento hasta el final (carnaval → a). */
export function claveAsonante(palabra: string): string {
  const lista = nucleos(palabra);
  if (lista.length === 0) return '';
  return lista
    .slice(tonica(palabra, lista))
    .map((n) => n.vocal)
    .join('');
}

/** Rima consonante: todas las letras desde la vocal con acento (sombrero → ero). */
export function claveConsonante(palabra: string): string {
  const lista = nucleos(palabra);
  if (lista.length === 0) return '';
  return sinTilde(palabra.toLowerCase().slice(lista[tonica(palabra, lista)].pos));
}

export type Rima = 'consonante' | 'asonante' | null;

/** Cómo riman dos versos por su última palabra. */
export function rimaEntre(a: string, b: string): Rima {
  const pa = partirVerso(a)?.palabra;
  const pb = partirVerso(b)?.palabra;
  if (!pa || !pb) return null;
  if (claveConsonante(pa) === claveConsonante(pb)) return 'consonante';
  if (claveAsonante(pa) === claveAsonante(pb)) return 'asonante';
  return null;
}

// «y» sola es vocal; «ya» y «yo» empiezan con consonante. «hie-», «hue-» tampoco hacen sinalefa.
const empiezaConVocal = (palabra: string) =>
  palabra.toLowerCase() === 'y' || (/^h?[aeiouáéíóú]/i.test(palabra) && !/^h?[iu][aeiouáéó]/i.test(palabra));
const terminaEnVocal = (palabra: string) => /[aeiouáéíóúy]$/i.test(palabra);

/**
 * Sílabas métricas de un verso: las de cada palabra, menos las sinalefas (la vocal
 * final de una palabra se junta con la inicial de la siguiente: «de_acá»), más una
 * si termina en aguda o menos una si termina en esdrújula.
 */
export function silabasMetricas(verso: string): number {
  const palabras = verso.match(/[\p{L}]+/gu) ?? [];
  if (palabras.length === 0) return 0;
  let total = 0;
  palabras.forEach((p, i) => {
    total += nucleos(p).length;
    if (i > 0 && terminaEnVocal(palabras[i - 1]) && empiezaConVocal(p)) total--;
  });
  const ultima = palabras.at(-1)!;
  const lista = nucleos(ultima);
  const desdeElFinal = lista.length - 1 - tonica(ultima, lista);
  if (desdeElFinal === 0) total++;
  if (desdeElFinal >= 2) total--;
  return total;
}
