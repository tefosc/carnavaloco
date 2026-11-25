import { ahoraEnNavegador, hoyEnPeru } from './fechas';
import { describirFaltan, diasParaAniversario } from './barrios';

export function aplicarAniversarioDelBarrio() {
  const contenedor = document.querySelector<HTMLElement>('[data-aniversario-barrio]');
  const numero = contenedor?.querySelector<HTMLElement>('[data-aniversario-numero]');
  const texto = contenedor?.querySelector<HTMLElement>('[data-aniversario-texto]');
  if (!contenedor || !numero || !texto) return;

  const aniversario = { dia: Number(contenedor.dataset.dia), mes: Number(contenedor.dataset.mes) };
  const faltan = diasParaAniversario(hoyEnPeru(ahoraEnNavegador()), aniversario);
  const descripcion = describirFaltan(faltan, contenedor.dataset.nombre ?? '');

  numero.textContent = descripcion.numero;
  texto.textContent = descripcion.texto;
}
