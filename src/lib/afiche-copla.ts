/**
 * Dibuja una copla como afiche chicha en un canvas de 1080 × 1350 (vertical, para
 * WhatsApp e Instagram): letra con sombra dura y contorno grueso, como Chicha.astro,
 * el «bis» de cada verso y la dirección de la web abajo. Todo pasa en el navegador:
 * la copla no se manda a ningún lado.
 */

export const ANCHO = 1080;
export const ALTO = 1350;

const C = {
  fucsia: '#ff2a92',
  amarillo: '#ffe600',
  verde: '#00b35c',
  azul: '#1d2fd0',
  naranja: '#ff6a00',
  turquesa: '#00b8c8',
  tinta: '#13185a',
  blanco: '#ffffff',
};

/** titulo: relleno partido del «Mi copla» (arriba y abajo); rellenos: versos impares y pares. */
export const PALETAS = {
  fucsia: { fondo: C.fucsia, titulo: [C.amarillo, C.naranja], rellenos: [C.amarillo, C.blanco], sombra: C.azul, texto: C.tinta },
  amarillo: { fondo: C.amarillo, titulo: [C.fucsia, C.naranja], rellenos: [C.fucsia, C.blanco], sombra: C.tinta, texto: C.tinta },
  turquesa: { fondo: C.turquesa, titulo: [C.amarillo, C.naranja], rellenos: [C.amarillo, C.blanco], sombra: C.fucsia, texto: C.tinta },
  verde: { fondo: C.verde, titulo: [C.amarillo, C.naranja], rellenos: [C.amarillo, C.blanco], sombra: C.tinta, texto: C.tinta },
  azul: { fondo: C.azul, titulo: [C.amarillo, C.naranja], rellenos: [C.amarillo, C.blanco], sombra: C.fucsia, texto: C.blanco },
};
export type Paleta = keyof typeof PALETAS;

const DISPLAY = '"Big Shoulders Display Variable", "Arial Narrow", sans-serif';
const TEXTO = '"Bricolage Grotesque Variable", system-ui, sans-serif';

/** Espera a que las letras del sitio estén listas; si no, el canvas usaría otra. */
export async function cargarLetras() {
  await Promise.all([document.fonts.load(`900 100px ${DISPLAY}`), document.fonts.load(`700 40px ${TEXTO}`)]);
}

export interface Copla {
  versos: string[];
  firma: string;
  paleta: Paleta;
  /** Verdadero si los versos son el ejemplo (se dibujan más tenues). */
  ejemplo: boolean;
  /** Dirección que va al pie, por ejemplo «carnaval.pe/coplas». */
  direccion: string;
}

/**
 * Letra chicha, como Chicha.astro: sombra dura desplazada, contorno grueso y relleno
 * (partido en dos colores si `relleno` trae dos). textBaseline debe ser 'middle'.
 */
function chicha(
  ctx: CanvasRenderingContext2D,
  texto: string,
  x: number,
  y: number,
  tam: number,
  relleno: string | string[],
  sombra: string,
) {
  ctx.font = `900 ${tam}px ${DISPLAY}`;
  ctx.lineJoin = 'round';
  ctx.lineWidth = tam * 0.16;
  ctx.fillStyle = sombra;
  ctx.strokeStyle = sombra;
  ctx.strokeText(texto, x + tam * 0.08, y + tam * 0.09);
  ctx.fillText(texto, x + tam * 0.08, y + tam * 0.09);
  ctx.strokeStyle = C.tinta;
  ctx.strokeText(texto, x, y);
  if (Array.isArray(relleno)) {
    // Mitad de arriba de un color y mitad de abajo de otro, como los afiches serigrafiados
    const corte = ctx.createLinearGradient(0, y - tam * 0.4, 0, y + tam * 0.4);
    corte.addColorStop(0.52, relleno[0]);
    corte.addColorStop(0.52, relleno[1]);
    ctx.fillStyle = corte;
  } else {
    ctx.fillStyle = relleno;
  }
  ctx.fillText(texto, x, y);
}

/** Dientes de la gola, como los bordes del sitio. */
function zigzag(ctx: CanvasRenderingContext2D, y: number, hacia: 1 | -1, color: string) {
  const ancho = 44;
  const alto = 24;
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let x = 0; x < ANCHO; x += ancho) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + ancho / 2, y + alto * hacia);
    ctx.lineTo(x + ancho, y);
  }
  ctx.fill();
}

export function dibujarCopla(lienzo: HTMLCanvasElement, copla: Copla) {
  const ctx = lienzo.getContext('2d');
  if (!ctx) return;
  const p = PALETAS[copla.paleta];
  ctx.clearRect(0, 0, ANCHO, ALTO);
  ctx.fillStyle = p.fondo;
  ctx.fillRect(0, 0, ANCHO, ALTO);

  // Franja de arriba
  const arriba = 130;
  ctx.fillStyle = C.tinta;
  ctx.fillRect(0, 0, ANCHO, arriba);
  zigzag(ctx, arriba, 1, C.tinta);
  ctx.fillStyle = copla.paleta === 'azul' ? C.amarillo : p.fondo;
  ctx.font = `900 64px ${DISPLAY}`;
  ctx.textBaseline = 'middle';
  ctx.fillText('CARNAVAL DE CAJAMARCA', 70, arriba / 2 + 4);

  // Franja de abajo, con la dirección
  const abajo = ALTO - 110;
  ctx.fillStyle = C.tinta;
  ctx.fillRect(0, abajo, ANCHO, ALTO - abajo);
  zigzag(ctx, abajo, -1, C.tinta);
  ctx.fillStyle = C.blanco;
  ctx.font = `700 36px ${TEXTO}`;
  ctx.fillText(copla.direccion, 70, abajo + 58);

  const margen = 72;

  // «Mi copla», grande y un poco torcido, como afiche recién pegado
  ctx.save();
  ctx.translate(margen, arriba + 175);
  ctx.rotate((-3 * Math.PI) / 180);
  chicha(ctx, 'MI COPLA', 0, 0, 250, p.titulo, p.sombra);
  ctx.restore();

  // Versos: la letra más grande con la que el verso más largo (y su «bis») cabe en el ancho
  const versos = copla.versos.map((v) => v.trim().toLocaleUpperCase('es-PE'));
  const anchoUtil = ANCHO - margen * 2;
  ctx.font = `900 100px ${DISPLAY}`;
  const masAncho = Math.max(...versos.map((v) => ctx.measureText(v).width), 1);
  // Además del verso: el «bis» (~0,6 de la altura de letra), el corrimiento de los
  // pares (0,25) y la sombra (0,08)
  const tam = Math.max(48, Math.min(124, (anchoUtil * 100) / (masAncho + 95)));
  const interlinea = tam * 1.2;
  const firmaAlto = copla.firma.trim() ? 90 : 0;
  const bloque = interlinea * versos.length + firmaAlto;
  const desde = arriba + 360;
  let y = desde + (abajo - 40 - desde - bloque) / 2 + interlinea / 2;

  ctx.globalAlpha = copla.ejemplo ? 0.45 : 1;
  versos.forEach((verso, i) => {
    // Los pares se corren un poco, como en la pancarta del inicio
    const x = margen + (i % 2 ? tam * 0.25 : 0);
    chicha(ctx, verso, x, y, tam, p.rellenos[i % 2], p.sombra);

    // «bis»: el verso se canta dos veces
    const fin = x + ctx.measureText(verso).width + tam * 0.22;
    ctx.font = `700 ${tam * 0.3}px ${TEXTO}`;
    const anchoBis = ctx.measureText('bis').width + tam * 0.28;
    const altoBis = tam * 0.42;
    ctx.lineWidth = Math.max(3, tam * 0.045);
    ctx.strokeStyle = p.texto;
    ctx.beginPath();
    ctx.roundRect(fin, y - altoBis / 2, anchoBis, altoBis, altoBis / 2);
    ctx.stroke();
    ctx.fillStyle = p.texto;
    ctx.fillText('bis', fin + tam * 0.14, y + 1);

    y += interlinea;
  });

  if (firmaAlto) {
    ctx.font = `700 40px ${TEXTO}`;
    ctx.fillStyle = p.texto;
    ctx.fillText(`— ${copla.firma.trim()}`, margen, y + 20);
  }
  ctx.globalAlpha = 1;
}
