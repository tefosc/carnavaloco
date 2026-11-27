/**
 * Carnaval de Cajamarca 2027 calendar (.ics) in English: one all-day event per
 * main day. Opens with Google Calendar, Apple Calendar, or Outlook.
 */
import type { APIRoute } from 'astro';
import { ANIO, diasDe } from '../../data/carnaval2027';
import { diaDeCarnaval } from '../../lib/fechas';

const DIA_MS = 86_400_000;
const fechaIcs = (d: Date) => d.toISOString().slice(0, 10).replaceAll('-', '');

/** Escapes text per RFC 5545 and folds long lines to 75 octets. */
const texto = (s: string) => s.replaceAll('\\', '\\\\').replaceAll(';', '\\;').replaceAll(',', '\\,').replaceAll('\n', '\\n');
function plegar(linea: string) {
  const bytes = new TextEncoder().encode(linea);
  if (bytes.length <= 75) return linea;
  const partes: string[] = [];
  let actual = '';
  for (const ch of linea) {
    if (new TextEncoder().encode(actual + ch).length > (partes.length ? 74 : 75)) {
      partes.push(actual);
      actual = ch;
    } else {
      actual += ch;
    }
  }
  partes.push(actual);
  return partes.join('\r\n ');
}

export const GET: APIRoute = ({ site }) => {
  const sello = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const url = new URL(`/en/${ANIO}/`, site).toString();
  const eventos = diasDe('en').flatMap((d) => {
    const inicio = diaDeCarnaval(ANIO, d.offset);
    const fin = new Date(inicio.getTime() + DIA_MS);
    return [
      'BEGIN:VEVENT',
      `UID:carnaval-cajamarca-${ANIO}-${fechaIcs(inicio)}-en@carnaval-de-cajamarca`,
      `DTSTAMP:${sello}`,
      `DTSTART;VALUE=DATE:${fechaIcs(inicio)}`,
      `DTEND;VALUE=DATE:${fechaIcs(fin)}`,
      `SUMMARY:${texto(`Carnaval de Cajamarca: ${d.titulo}`)}`,
      `DESCRIPTION:${texto(`${d.texto} ${d.hora ? `Time: ${d.hora}.` : 'Time to be confirmed.'} Schedule: ${url}`)}`,
      `LOCATION:${texto(`${d.lugar} Cajamarca, Peru`)}`,
      `URL:${url}`,
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
    ];
  });
  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Carnaval de Cajamarca//Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${texto(`Carnaval de Cajamarca ${ANIO}`)}`,
    'X-WR-TIMEZONE:America/Lima',
    ...eventos,
    'END:VCALENDAR',
  ];
  return new Response(lineas.map(plegar).join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="carnaval-cajamarca-${ANIO}-en.ics"`,
    },
  });
};
