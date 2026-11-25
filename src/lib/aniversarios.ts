import { ahoraEnNavegador, hoyEnPeru } from './fechas';
import { etiquetaFaltan, formatearAniversario, proximosAniversarios, type ProximoAniversario } from './barrios';

const CANTIDAD = 3;
const formatoLista = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });

function titulo(cumplen: ProximoAniversario[]): string {
  if (cumplen.length === 0) return 'Próximos cumpleaños de barrios';
  const nombres = formatoLista.format(cumplen.map(({ barrio }) => barrio.nombre));
  return cumplen.length === 1 ? `¡Hoy cumple años ${nombres}!` : `¡Hoy cumplen años ${nombres}!`;
}

function crearItem({ barrio, aniversario, faltan }: ProximoAniversario): HTMLLIElement {
  const nombre = document.createElement('strong');
  nombre.textContent = barrio.nombre;

  const fecha = document.createElement('span');
  fecha.textContent = `${formatearAniversario(aniversario)} · ${etiquetaFaltan(faltan)}`;

  const enlace = document.createElement('a');
  enlace.className = 'aniversarios__item';
  enlace.href = `/barrios/${barrio.id}/`;
  enlace.dataset.color = barrio.color;
  enlace.append(nombre, fecha);

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
