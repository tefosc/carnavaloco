import { ANIO, diasDe, previasDe, programaOficial } from '../data/carnaval2027';
import { LOCALE_INTL, rutaDe, t, type Idioma } from '../i18n';
import { diaDeCarnaval, hoyEnPeru, inicioEnPeru } from './fechas';

const DIA_MS = 86_400_000;
const formatosFecha = {
  es: new Intl.DateTimeFormat(LOCALE_INTL.es, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }),
  en: new Intl.DateTimeFormat(LOCALE_INTL.en, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }),
};

const formatosHora = {
  es: new Intl.DateTimeFormat(LOCALE_INTL.es, { hour: 'numeric', minute: '2-digit', timeZone: 'America/Lima' }),
  en: new Intl.DateTimeFormat(LOCALE_INTL.en, { hour: 'numeric', minute: '2-digit', timeZone: 'America/Lima' }),
};

interface Evento {
  id: string;
  titulo: string;
  fecha: Date;
  hora: string | null;
  oficial: boolean;
  enlace: string;
}

function construirEventos(idioma: Idioma) {
  const base2027 = rutaDe('2027', idioma);
  const centrales = diasDe(idioma).map((dia): Evento => ({
    id: dia.id,
    titulo: dia.titulo,
    fecha: diaDeCarnaval(ANIO, dia.offset),
    hora: programaOficial ? dia.horaInicio ?? null : null,
    oficial: programaOficial,
    enlace: programaOficial ? `${base2027}?dia=${dia.id}#recorridos` : base2027,
  }));

  const ingreso = centrales.find((evento) => evento.id === 'sabado')!;
  const anunciados: Evento[] = [
    ...previasDe(idioma).filter((previa) => previa.fecha && (previa.fuente || programaOficial)).map((previa) => ({
      id: previa.id ?? previa.titulo,
      titulo: previa.titulo,
      fecha: new Date(previa.fecha + 'T00:00:00Z'),
      hora: previa.horaInicio ?? null,
      oficial: true,
      enlace: `${base2027}#titulo-previas`,
    })),
    ...centrales.filter((evento) => evento.oficial),
  ].sort((a, b) => inicio(a) - inicio(b));

  return { ingreso, anunciados };
}

function inicio(evento: Evento) {
  const [horas, minutos] = evento.hora?.split(':').map(Number) ?? [0, 0];
  return inicioEnPeru(evento.fecha) + (horas * 60 + minutos) * 60_000;
}

function cuenta(evento: Evento, ahora: Date, idioma: Idioma) {
  const txt = t(idioma).agendaPortada;
  const dias = Math.round((evento.fecha.getTime() - hoyEnPeru(ahora).getTime()) / DIA_MS);
  const segundos = Math.max(0, Math.ceil((inicio(evento) - ahora.getTime()) / 1000));
  const usaHora = Boolean(evento.hora) && segundos > 0;
  const detalles = [formatosFecha[idioma].format(evento.fecha)];
  if (evento.hora) detalles.push(formatosHora[idioma].format(inicio(evento)));
  if (!evento.oficial) detalles.push(txt.fechaPrevista);
  return {
    ...evento,
    fechaTexto: detalles.join(' · '),
    dias: usaHora ? Math.floor(segundos / 86_400) : Math.max(0, dias),
    horas: Math.floor(segundos / 3600) % 24,
    minutos: Math.floor(segundos / 60) % 60,
    segundos: segundos % 60,
    usaHora,
    estado: dias < 0 ? txt.yaPaso : dias === 0 && !usaHora ? txt.hoy : '',
  };
}

export function agendaPortada(ahora = new Date(), idioma: Idioma = 'es') {
  const { ingreso, anunciados } = construirEventos(idioma);
  const hoy = hoyEnPeru(ahora).getTime();
  const eventosVigentes = anunciados.filter((evento) => evento.fecha.getTime() >= hoy);
  const siguiente = eventosVigentes.find((evento) => evento.fecha.getTime() === hoy && inicio(evento) > ahora.getTime())
    ?? eventosVigentes[0];
  return {
    siguiente: siguiente ? cuenta(siguiente, ahora, idioma) : null,
    ingreso: cuenta(ingreso, ahora, idioma),
    mostrarBando: !siguiente && hoy < ingreso.fecha.getTime() && !anunciados.some((evento) => evento.id === 'bando'),
  };
}
