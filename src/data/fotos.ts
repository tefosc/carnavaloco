/**
 * Fotos reales del carnaval (Wikimedia Commons, CC BY-SA 4.0).
 * Autor: Pitxiquin. Algunas están recortadas para este sitio.
 */
import type { ImageMetadata } from 'astro';
import patrullaCorriendo from '../assets/fotos/patrulla-corriendo.jpg';
import patrullaMojada from '../assets/fotos/patrulla-mojada.jpg';
import baldesDeGlobos from '../assets/fotos/baldes-de-globos.jpg';
import musicosDeNoche from '../assets/fotos/musicos-de-noche.jpg';
import patioMunicipal from '../assets/fotos/patio-municipal.jpg';
import disfrazPicaflor from '../assets/fotos/disfraz-picaflor.jpg';
import disfracesTurquesa from '../assets/fotos/disfraces-turquesa.jpg';
import disfrazAbanico from '../assets/fotos/disfraz-abanico.jpg';
import globosEnLaCalle from '../assets/fotos/globos-en-la-calle.jpg';
import plazaMojada from '../assets/fotos/plaza-mojada.jpg';

export interface Foto {
  src: ImageMetadata;
  alt: string;
  altEn: string;
  archivo: string;
  recortada?: boolean;
}

const commons = (archivo: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(archivo.replaceAll(' ', '_'))}`;

export const fotos = {
  patrullaCorriendo: {
    src: patrullaCorriendo,
    alt: 'Una patrulla corre por la calle con un bombo, todos mojados y riendo',
    altEn: 'A carnival troupe runs down the street with a bass drum, everyone soaked and laughing',
    archivo: 'Carnaval de Cajamarca02.jpg',
  },
  patrullaMojada: {
    src: patrullaMojada,
    alt: 'Un grupo grande de jóvenes empapados posa en una calle empedrada',
    altEn: 'A large group of drenched young people poses on a cobblestone street',
    archivo: 'Carnaval de Cajamarca.jpg',
  },
  baldesDeGlobos: {
    src: baldesDeGlobos,
    alt: 'Baldes llenos de globos de agua de colores alineados en la vereda',
    altEn: 'Buckets filled with colorful water balloons lined up on the sidewalk',
    archivo: "Galledes plenes de globus d'aigua pel carnaval de Cajamarca 2017.jpg",
  },
  musicosDeNoche: {
    src: musicosDeNoche,
    alt: 'Músicos tocan trompetas de noche en medio de la gente',
    altEn: 'Musicians play trumpets at night surrounded by a crowd',
    archivo: 'Músics tocant pel carnaval de Cajamarca.jpg',
  },
  patioMunicipal: {
    src: patioMunicipal,
    alt: 'Patio colonial de la antigua municipalidad decorado con telas de colores y máscaras de carnaval',
    altEn: 'Colonial courtyard of the old city hall decorated with colorful fabrics and carnival masks',
    archivo: 'Pati de la municipalidad antigua de Cajamarca pel Carnaval 2018 03.jpg',
  },
  disfrazPicaflor: {
    src: disfrazPicaflor,
    alt: 'Joven con disfraz de picaflor azul y verde, alas abiertas y tocado de plumas',
    altEn: 'Young reveler in a blue-and-green hummingbird costume with open wings and feathered headdress',
    archivo: 'Persones disfraçades a Plaza Vea durant el carnaval de Cajamarca 2017 02.jpg',
    recortada: true,
  },
  disfracesTurquesa: {
    src: disfracesTurquesa,
    alt: 'Pareja con trajes turquesa bordados y grandes tocados',
    altEn: 'Couple wearing embroidered turquoise costumes and tall headdresses',
    archivo: 'Persones disfraçades a Plaza Vea durant el carnaval de Cajamarca 2017 04.jpg',
    recortada: true,
  },
  disfrazAbanico: {
    src: disfrazAbanico,
    alt: 'Dos personas con trajes bordados, uno blanco y negro y otro fucsia con un gran abanico',
    altEn: 'Two people in embroidered costumes, one black and white and the other magenta with a large fan',
    archivo: 'Persones disfraçades a Plaza Vea durant el carnaval de Cajamarca 2017.jpg',
    recortada: true,
  },
  globosEnLaCalle: {
    src: globosEnLaCalle,
    alt: 'Niños lanzan globos de agua en una calle frente a la plaza',
    altEn: 'Children throw water balloons on a street facing the main square',
    archivo: "Persones tirant globus d'aigua al carnaval de Cajamarca de 2017 02.jpg",
  },
  plazaMojada: {
    src: plazaMojada,
    alt: 'La Plaza de Armas de Cajamarca con el piso mojado y gente caminando',
    altEn: 'Cajamarca’s Plaza de Armas with wet cobblestones and people walking across',
    archivo: 'Plaza de Armas de Cajamarca pel carnaval de 2017 02.jpg',
  },
} satisfies Record<string, Foto>;

export const creditoFotos = {
  autor: 'Pitxiquin',
  licencia: 'CC BY-SA 4.0',
  licenciaUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.es',
  categoriaUrl: 'https://commons.wikimedia.org/wiki/Category:Carnival_of_Cajamarca',
  enlace: commons,
};
