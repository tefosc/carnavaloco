import { LOCALE_INTL, idiomaEnNavegador, rutaBarrio, t, type Idioma } from '../i18n';
import { ahoraEnNavegador, hoyEnPeru } from './fechas';
import { formatearAniversario, partirFaltan, proximosAniversarios, type ProximoAniversario } from './barrios';

const CANTIDAD = 8;

function titulo(cumplen: ProximoAniversario[], idioma: Idioma): string {
  const txt = t(idioma).aniversarios;
  if (cumplen.length === 0) return txt.proximos;
  const formatoLista = new Intl.ListFormat(LOCALE_INTL[idioma], { style: 'long', type: 'conjunction' });
  const nombres = formatoLista.format(cumplen.map(({ barrio }) => barrio.nombre));
  return cumplen.length === 1 ? txt.hoyUno(nombres) : txt.hoyVarios(nombres);
}

function crearTexto(etiqueta: keyof HTMLElementTagNameMap, clase: string, texto: string): HTMLElement {
  const elemento = document.createElement(etiqueta);
  elemento.className = clase;
  elemento.textContent = texto;
  return elemento;
}

function crearItem({ barrio, aniversario, faltan }: ProximoAniversario, idioma: Idioma): HTMLLIElement {
  const { numero, unidad } = partirFaltan(faltan, idioma);

  const enlace = document.createElement('a');
  enlace.className = 'aniversarios__item';
  enlace.classList.toggle('aniversarios__item--hoy', faltan === 0);
  enlace.href = rutaBarrio(barrio.id, idioma);
  enlace.dataset.color = barrio.color;
  enlace.append(
    crearTexto('span', 'aniversarios__dias', numero),
    crearTexto('span', 'aniversarios__unidad', unidad),
    crearTexto('strong', 'aniversarios__nombre', barrio.nombre),
    crearTexto('span', 'aniversarios__fecha', formatearAniversario(aniversario, idioma)),
  );

  const item = document.createElement('li');
  item.append(enlace);
  return item;
}

export function aplicarAniversarios() {
  const franja = document.querySelector<HTMLElement>('[data-aniversarios]');
  const encabezado = franja?.querySelector<HTMLElement>('[data-aniversarios-titulo]');
  const lista = franja?.querySelector<HTMLElement>('[data-aniversarios-lista]');
  if (!franja || !encabezado || !lista) return;

  const idioma = idiomaEnNavegador();
  const proximos = proximosAniversarios(hoyEnPeru(ahoraEnNavegador()), CANTIDAD);
  const cumplen = proximos.filter(({ faltan }) => faltan === 0);

  encabezado.textContent = titulo(cumplen, idioma);
  lista.replaceChildren(...proximos.map((item) => crearItem(item, idioma)));
  franja.classList.toggle('aniversarios--hoy', cumplen.length > 0);
  franja.hidden = false;
}
