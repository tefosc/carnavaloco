import { ahoraEnNavegador, hoyEnPeru } from './fechas';
import { formatearAniversario, partirFaltan, proximosAniversarios, type ProximoAniversario } from './barrios';

const CANTIDAD = 8;
const formatoLista = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });

function titulo(cumplen: ProximoAniversario[]): string {
  if (cumplen.length === 0) return 'Próximos cumpleaños de barrios';
  const nombres = formatoLista.format(cumplen.map(({ barrio }) => barrio.nombre));
  return cumplen.length === 1 ? `¡Hoy cumple años ${nombres}!` : `¡Hoy cumplen años ${nombres}!`;
}

function crearTexto(etiqueta: keyof HTMLElementTagNameMap, clase: string, texto: string): HTMLElement {
  const elemento = document.createElement(etiqueta);
  elemento.className = clase;
  elemento.textContent = texto;
  return elemento;
}

function crearItem({ barrio, aniversario, faltan }: ProximoAniversario): HTMLLIElement {
  const { numero, unidad } = partirFaltan(faltan);

  const enlace = document.createElement('a');
  enlace.className = 'aniversarios__item';
  enlace.classList.toggle('aniversarios__item--hoy', faltan === 0);
  enlace.href = `/barrios/${barrio.id}/`;
  enlace.dataset.color = barrio.color;
  enlace.append(
    crearTexto('span', 'aniversarios__dias', numero),
    crearTexto('span', 'aniversarios__unidad', unidad),
    crearTexto('strong', 'aniversarios__nombre', barrio.nombre),
    crearTexto('span', 'aniversarios__fecha', formatearAniversario(aniversario)),
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

  const proximos = proximosAniversarios(hoyEnPeru(ahoraEnNavegador()), CANTIDAD);
  const cumplen = proximos.filter(({ faltan }) => faltan === 0);

  encabezado.textContent = titulo(cumplen);
  lista.replaceChildren(...proximos.map(crearItem));
  franja.classList.toggle('aniversarios--hoy', cumplen.length > 0);
  franja.hidden = false;
}
