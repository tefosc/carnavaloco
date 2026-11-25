/**
 * Manchas de pintura del carnaval, dibujadas en SVG: salpicones, manos, globos
 * reventados, chorreados, brochazos y talco. Las usan el juego de la portada
 * (Pintura.astro) y la decoración de todas las secciones (Manchas.astro).
 *
 * Cada forma sale de un generador al azar: con la misma semilla, la misma mancha.
 */

export type Azar = () => number;
export type TipoMancha = 'salpicon' | 'mano' | 'globo' | 'chorreado' | 'brochazo' | 'talco';

/** Azar con semilla (mulberry32): la misma página se pinta siempre igual. */
export function azarConSemilla(semilla: number): Azar {
  let s = semilla >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Número a partir de un texto, para usarlo de semilla. */
export function semillaDe(texto: string): number {
  let h = 2166136261;
  for (const ch of texto) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

const SVG = 'http://www.w3.org/2000/svg';
const f = (n: number) => n.toFixed(1);

function el<K extends keyof SVGElementTagNameMap>(nombre: K, atributos: Record<string, string | number>) {
  const nodo = document.createElementNS(SVG, nombre);
  for (const [k, v] of Object.entries(atributos)) nodo.setAttribute(k, String(v));
  return nodo;
}

const entre = (azar: Azar, a: number, b: number) => a + azar() * (b - a);

/**
 * Contorno irregular alrededor del centro. Con `picos`, algunas puntas salen
 * afiladas, como la pintura que salpica al caer.
 */
function contorno(azar: Azar, r: number, puntos: number, picos = 0) {
  const p = Array.from({ length: puntos }, (_, i) => {
    const ang = (i / puntos) * Math.PI * 2;
    const pico = azar() < picos;
    const rr = r * (pico ? entre(azar, 1.3, 1.75) : entre(azar, 0.78, 1.08));
    return { x: Math.cos(ang) * rr, y: Math.sin(ang) * rr, pico };
  });
  const medio = (a: (typeof p)[number], b: (typeof p)[number]) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const ini = medio(p[puntos - 1], p[0]);
  let d = `M${f(ini.x)} ${f(ini.y)}`;
  p.forEach((q, i) => {
    const m = medio(q, p[(i + 1) % puntos]);
    d += q.pico ? ` L${f(q.x)} ${f(q.y)} L${f(m.x)} ${f(m.y)}` : ` Q${f(q.x)} ${f(q.y)} ${f(m.x)} ${f(m.y)}`;
  });
  return `${d}Z`;
}

/**
 * Las piezas que se animan por separado llevan clase: «centro» (lo que revienta
 * primero) y «gota» (lo que sale volando). --d es cuánto tarda cada gota en
 * llegar: las más lejanas, después. Ver Manchas.astro.
 */
const tarda = (segundos: number) => `--d:${segundos.toFixed(2)}s`;

/** Salpicón: una mancha con puntas y gotas alrededor. */
function salpicon(svg: SVGSVGElement, azar: Azar, color: string) {
  svg.setAttribute('viewBox', '-60 -60 120 120');
  svg.append(el('path', { d: contorno(azar, 26, 18, 0.28), fill: color, class: 'centro' }));
  const gotas = Math.round(entre(azar, 6, 11));
  for (let i = 0; i < gotas; i++) {
    const a = entre(azar, 0, Math.PI * 2);
    const d = entre(azar, 34, 54);
    const r = entre(azar, 1.4, 4.6);
    // Algunas gotas salen estiradas, en la dirección en que volaron
    const largo = azar() < 0.35 ? entre(azar, 1.6, 2.6) : 1;
    svg.append(
      el('ellipse', {
        cx: f(Math.cos(a) * d),
        cy: f(Math.sin(a) * d),
        rx: f(r * largo),
        ry: f(r),
        transform: `rotate(${f((a * 180) / Math.PI)} ${f(Math.cos(a) * d)} ${f(Math.sin(a) * d)})`,
        fill: color,
        class: 'gota',
        style: tarda(0.12 + ((d - 34) / 20) * 0.22),
      }),
    );
  }
}

/** Globo reventado: un centro chico y la pintura saliendo en rayos. */
function globo(svg: SVGSVGElement, azar: Azar, color: string) {
  svg.setAttribute('viewBox', '-60 -60 120 120');
  svg.append(el('path', { d: contorno(azar, 13, 10, 0.15), fill: color, class: 'centro' }));
  const rayos = Math.round(entre(azar, 14, 22));
  for (let i = 0; i < rayos; i++) {
    const a = (i / rayos) * Math.PI * 2 + entre(azar, -0.15, 0.15);
    const d = entre(azar, 18, 50);
    const r = entre(azar, 1.6, 5) * (1 - d / 80);
    const cx = Math.cos(a) * d;
    const cy = Math.sin(a) * d;
    svg.append(
      el('ellipse', {
        cx: f(cx),
        cy: f(cy),
        rx: f(r * entre(azar, 1.8, 3.2)),
        ry: f(r),
        transform: `rotate(${f((a * 180) / Math.PI)} ${f(cx)} ${f(cy)})`,
        fill: color,
        class: 'gota',
        style: tarda(0.06 + ((d - 18) / 32) * 0.26),
      }),
    );
  }
}

/** Mano pintada: la palma y los dedos, como las que quedan en las paredes el sábado. */
function mano(svg: SVGSVGElement, azar: Azar, color: string) {
  svg.setAttribute('viewBox', '0 0 100 120');
  // El contorno sale centrado en 0,0: se lleva a donde va la palma
  svg.append(
    el('path', { d: contorno(azar, 25, 12, 0), fill: color, transform: 'translate(54 80) scale(1 1.12)', class: 'palma' }),
  );
  // Cuatro dedos en abanico y el pulgar de costado
  const dedos = [
    { x: 34, y: 60, ang: -17, largo: 27, ancho: 12 },
    { x: 47, y: 56, ang: -6, largo: 34, ancho: 12.5 },
    { x: 60, y: 56, ang: 5, largo: 32, ancho: 12.5 },
    { x: 72, y: 61, ang: 16, largo: 25, ancho: 11 },
    { x: 33, y: 86, ang: -62, largo: 25, ancho: 13 },
  ];
  for (const d of dedos) {
    const largo = d.largo * entre(azar, 0.9, 1.1);
    const ang = d.ang + entre(azar, -4, 4);
    svg.append(
      el('rect', {
        x: f(d.x - d.ancho / 2),
        y: f(d.y - largo),
        width: f(d.ancho),
        height: f(largo + 10),
        rx: f(d.ancho / 2),
        transform: `rotate(${f(ang)} ${d.x} ${d.y})`,
        fill: color,
        class: 'dedo',
      }),
    );
  }
}

/** Chorreado: pintura que cae desde el borde de arriba, con su gota al final. */
function chorreado(svg: SVGSVGElement, azar: Azar, color: string) {
  svg.setAttribute('viewBox', '0 0 200 110');
  const franja = entre(azar, 12, 20);
  // Borde de abajo de la franja, ondulado
  let d = `M0 0 H200 V${f(franja)}`;
  for (let x = 200; x > 0; x -= 25) d += ` Q${f(x - 12.5)} ${f(franja + entre(azar, -4, 6))} ${f(x - 25)} ${f(franja)}`;
  svg.append(el('path', { d: `${d} Z`, fill: color }));
  const gotas = Math.round(entre(azar, 3, 6));
  for (let i = 0; i < gotas; i++) {
    const x = entre(azar, 12, 188);
    const ancho = entre(azar, 6, 13);
    const largo = entre(azar, 18, 82);
    svg.append(el('rect', { x: f(x - ancho / 2), y: f(franja - 4), width: f(ancho), height: f(largo), fill: color }));
    svg.append(el('circle', { cx: f(x), cy: f(franja - 4 + largo), r: f(ancho * 0.62), fill: color }));
  }
}

/** Brochazo: una pasada gruesa de brocha, con las rayas de las cerdas. */
function brochazo(svg: SVGSVGElement, azar: Azar, color: string) {
  svg.setAttribute('viewBox', '0 0 200 60');
  const y = [entre(azar, 24, 36), entre(azar, 14, 46), entre(azar, 14, 46), entre(azar, 24, 36)];
  const trazo = `M14 ${f(y[0])} C70 ${f(y[1])} 130 ${f(y[2])} 186 ${f(y[3])}`;
  svg.append(el('path', { d: trazo, fill: 'none', stroke: color, 'stroke-width': f(entre(azar, 18, 26)), 'stroke-linecap': 'round' }));
  // Cerdas: rayas claras dentro de la pasada, que se cortan hacia el final
  for (const dy of [-6, -1, 5]) {
    svg.append(
      el('path', {
        d: trazo,
        transform: `translate(0 ${dy})`,
        fill: 'none',
        stroke: '#ffffff',
        'stroke-opacity': 0.28,
        'stroke-width': f(entre(azar, 1.2, 2.4)),
        'stroke-dasharray': `${f(entre(azar, 40, 90))} ${f(entre(azar, 4, 10))} ${f(entre(azar, 20, 50))} 200`,
      }),
    );
  }
}

/** Talco: una nube de polvo blanco. */
function talco(svg: SVGSVGElement, azar: Azar, color: string) {
  svg.setAttribute('viewBox', '-60 -60 120 120');
  for (let i = 0; i < 46; i++) {
    // Más denso al centro
    const a = entre(azar, 0, Math.PI * 2);
    const d = 50 * Math.sqrt(azar()) * azar();
    svg.append(
      el('circle', {
        cx: f(Math.cos(a) * d),
        cy: f(Math.sin(a) * d),
        r: f(entre(azar, 0.8, 3.2)),
        fill: color,
        'fill-opacity': f(entre(azar, 0.5, 0.95)),
        class: 'gota',
        // El polvo se abre desde el centro, sin orden fijo
        style: tarda((d / 50) * 0.45 + azar() * 0.12),
      }),
    );
  }
}

const DIBUJOS: Record<TipoMancha, (svg: SVGSVGElement, azar: Azar, color: string) => void> = {
  salpicon,
  mano,
  globo,
  chorreado,
  brochazo,
  talco,
};

/** Proporción alto/ancho de cada forma. */
export const PROPORCION: Record<TipoMancha, number> = {
  salpicon: 1,
  mano: 1.2,
  globo: 1,
  chorreado: 0.55,
  brochazo: 0.3,
  talco: 1,
};

/** Crea una mancha de `ancho` píxeles. */
export function crearMancha(tipo: TipoMancha, color: string, ancho: number, azar: Azar): SVGSVGElement {
  const svg = el('svg', { width: f(ancho), height: f(ancho * PROPORCION[tipo]), 'aria-hidden': 'true', focusable: 'false' });
  DIBUJOS[tipo](svg, azar, color);
  return svg;
}
