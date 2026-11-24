/**
 * Ícono de la web (el gorro de fiesta de favicon.svg) en los colores del sitio,
 * para instalarla en el teléfono. Lo pinta sharp en el build: src/pages/iconos/.
 */

const C = {
  fucsia: '#ff2a92',
  amarillo: '#ffe600',
  turquesa: '#00b8c8',
  naranja: '#ff6a00',
  tinta: '#13185a',
};

/** El gorro y el papel picado, en un lienzo de 64 × 64. */
const dibujo = `
  <path d="M32 3 L13 42 Q32 50 51 42 Z" fill="${C.fucsia}" stroke="${C.tinta}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M24 20 L40 20 M20 30 L44 30" stroke="${C.amarillo}" stroke-width="5"/>
  <path d="M32 3 L13 42 Q32 50 51 42 Z" fill="none" stroke="${C.tinta}" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="32" cy="5" r="5" fill="${C.turquesa}" stroke="${C.tinta}" stroke-width="2.5"/>
  <circle cx="12" cy="54" r="4" fill="${C.amarillo}"/>
  <circle cx="52" cy="56" r="3.5" fill="${C.turquesa}"/>
  <rect x="28" y="52" width="8" height="8" rx="1.5" fill="${C.naranja}" transform="rotate(20 32 56)"/>
`;

/**
 * SVG cuadrado con fondo azul noche (el theme-color del sitio). `escala` es la parte
 * del lado que ocupa el gorro: en el ícono «maskable» va más chico, porque el
 * teléfono puede recortarlo en círculo.
 */
export function iconoSvg(lado: number, escala: number): string {
  const tam = lado * escala;
  const borde = (lado - tam) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${lado}" height="${lado}" viewBox="0 0 ${lado} ${lado}">
  <rect width="${lado}" height="${lado}" fill="${C.tinta}"/>
  <g transform="translate(${borde} ${borde}) scale(${tam / 64})">${dibujo}</g>
</svg>`;
}
