import { ANIO, dias, previas, programaOficial } from '../data/carnaval2027';
import { diaDeCarnaval, hoyEnPeru, inicioEnPeru } from './fechas';

const DIA_MS = 86_400_000;
const formatoFecha = new Intl.DateTimeFormat('es-PE', {
  weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC',
});

const formatoHora = new Intl.DateTimeFormat('es-PE', {
  hour: 'numeric', minute: '2-digit', timeZone: 'America/Lima',
});

interface Evento {
  id: string;
  titulo: string;
  fecha: Date;
  hora: string | null;
  oficial: boolean;
  enlace: string;
}

const centrales = dias.map((dia): Evento => ({
  id: dia.id,
  titulo: dia.titulo,
  fecha: diaDeCarnaval(ANIO, dia.offset),
  hora: programaOficial ? dia.horaInicio ?? null : null,
  oficial: programaOficial,
  enlace: programaOficial ? '/2027/?dia=' + dia.id + '#recorridos' : '/2027/',
}));

const ingreso = centrales.find((evento) => evento.id === 'sabado')!;
const anunciados: Evento[] = [
  ...previas.filter((previa) => previa.fecha && (previa.fuente || programaOficial)).map((previa) => ({
    id: previa.id ?? previa.titulo,
    titulo: previa.titulo,
    fecha: new Date(previa.fecha + 'T00:00:00Z'),
    hora: previa.horaInicio ?? null,
    oficial: true,
    enlace: '/2027/#titulo-previas',
  })),
  ...centrales.filter((evento) => evento.oficial),
].sort((a, b) => inicio(a) - inicio(b));

function inicio(evento: Evento) {
  const [horas, minutos] = evento.hora?.split(':').map(Number) ?? [0, 0];
  return inicioEnPeru(evento.fecha) + (horas * 60 + minutos) * 60_000;
}

function cuenta(evento: Evento, ahora: Date) {
  const dias = Math.round((evento.fecha.getTime() - hoyEnPeru(ahora).getTime()) / DIA_MS);
  const segundos = Math.max(0, Math.ceil((inicio(evento) - ahora.getTime()) / 1000));
  const usaHora = Boolean(evento.hora) && segundos > 0;
  const detalles = [formatoFecha.format(evento.fecha)];
  if (evento.hora) detalles.push(formatoHora.format(inicio(evento)));
  if (!evento.oficial) detalles.push('Fecha prevista');
  return {
    ...evento,
    fechaTexto: detalles.join(' · '),
    dias: usaHora ? Math.floor(segundos / 86_400) : Math.max(0, dias),
    horas: Math.floor(segundos / 3600) % 24,
    minutos: Math.floor(segundos / 60) % 60,
    segundos: segundos % 60,
    usaHora,
    estado: dias < 0 ? 'Ya pasó' : dias === 0 && !usaHora ? 'Hoy' : '',
  };
}

export function agendaPortada(ahora = new Date()) {
  const hoy = hoyEnPeru(ahora).getTime();
  const eventosVigentes = anunciados.filter((evento) => evento.fecha.getTime() >= hoy);
  const siguiente = eventosVigentes.find((evento) => evento.fecha.getTime() === hoy && inicio(evento) > ahora.getTime())
    ?? eventosVigentes[0];
  return {
    siguiente: siguiente ? cuenta(siguiente, ahora) : null,
    ingreso: cuenta(ingreso, ahora),
    mostrarBando: !siguiente && hoy < ingreso.fecha.getTime() && !anunciados.some((evento) => evento.id === 'bando'),
  };
}
