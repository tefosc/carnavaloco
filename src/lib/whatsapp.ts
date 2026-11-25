import { contacto } from '../data/contacto';

export function enlaceWhatsapp(mensaje: string, numero: string = contacto.whatsapp): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
