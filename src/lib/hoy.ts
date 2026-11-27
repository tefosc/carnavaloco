/**
 * «Hoy en el carnaval». La web es estática: al abrir la página, con la fecha del
 * navegador en hora de Perú, se cambia la cuenta regresiva por lo que toca hoy.
 * Con ?fecha=AAAA-MM-DD en la dirección se puede ver cómo queda cualquier día.
 *
 * Marcas que busca en la página (todas opcionales):
 * - [data-cuenta-dias] y [data-cuenta-texto]: el sello con la cuenta regresiva.
 *   data-anio="proximo" cuenta hacia el próximo carnaval, sea del año que sea.
 * - [data-hoy]: la franja de HoyEnElCarnaval.astro, con un [data-hoy-dia] por día.
 * - [data-se-viene]: el «Se viene el» de la portada 2027.
 * - [data-agenda-dia]: los días de la agenda, para marcar hoy y los que ya pasaron.
 */
import { ANIO, dias, type Dia } from '../data/carnaval2027';
import { idiomaEnNavegador, t } from '../i18n';
import { ahoraEnNavegador, anioProximoCarnaval, momentoDelCarnaval } from './fechas';

/** El día de carnaval de hoy, si hoy es uno. */
export function diaDeHoy(ahora: Date = ahoraEnNavegador()): Dia | undefined {
  const momento = momentoDelCarnaval(ANIO, ahora);
  return momento.fase === 'durante' ? dias.find((d) => d.offset === momento.offset) : undefined;
}

export function aplicarHoy() {
  const idioma = idiomaEnNavegador();
  const txt = t(idioma).hoy;
  const ahora = ahoraEnNavegador();
  const momento = momentoDelCarnaval(ANIO, ahora);
  const hoy = diaDeHoy(ahora);

  // Sello: «Hoy» y lo que toca, o los días que faltan
  const numero = document.querySelector<HTMLElement>('[data-cuenta-dias]');
  const texto = document.querySelector<HTMLElement>('[data-cuenta-texto]');
  if (numero && texto) {
    if (hoy) {
      numero.textContent = txt.hoy;
      texto.textContent = idioma === 'en' ? hoy.en.corto : hoy.corto;
      const anillo = numero.closest('.sello')?.querySelector('textPath');
      if (anillo) anillo.textContent = txt.selloAnillo;
    } else {
      const anio = numero.dataset.anio === 'proximo' ? anioProximoCarnaval(ahora) : ANIO;
      const cuenta = momentoDelCarnaval(anio, ahora);
      if (cuenta.fase === 'antes') {
        numero.textContent = String(cuenta.faltan);
        texto.textContent = (cuenta.faltan === 1 ? texto.dataset.uno : texto.dataset.varios) ?? '';
      } else {
        numero.textContent = txt.ya;
        texto.textContent = txt.paso;
      }
    }
  }

  // Franja «Hoy en el carnaval»
  const franja = document.querySelector<HTMLElement>('[data-hoy]');
  if (franja && hoy) {
    franja.dataset.color = hoy.color;
    franja.querySelectorAll<HTMLElement>('[data-hoy-dia]').forEach((el) => {
      el.hidden = el.dataset.hoyDia !== hoy.id;
    });
    franja.hidden = false;
  }

  const seViene = document.querySelector<HTMLElement>('[data-se-viene]');
  if (seViene && momento.fase !== 'antes') seViene.textContent = hoy ? txt.yaLlego : txt.asiFue;

  // Agenda, durante el carnaval: hoy resaltado y los días que ya pasaron, atenuados
  document.querySelectorAll<HTMLElement>('[data-agenda-dia]').forEach((el) => {
    const dia = dias.find((d) => d.id === el.dataset.agendaDia);
    if (!dia) return;
    el.classList.toggle('agenda__dia--hoy', dia.id === hoy?.id);
    el.classList.toggle('agenda__dia--paso', momento.fase === 'durante' && dia.offset < momento.offset);
  });
}
