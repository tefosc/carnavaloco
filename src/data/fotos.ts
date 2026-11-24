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
  archivo: string;
  recortada?: boolean;
}

const commons = (archivo: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(archivo.replaceAll(' ', '_'))}`;

export const fotos = {
  patrullaCorriendo: {
    src: patrullaCorriendo,
    alt: 'Una patrulla corre por la calle con un bombo, todos mojados y riendo',
    archivo: 'Carnaval de Cajamarca02.jpg',
  },
  patrullaMojada: {
    src: patrullaMojada,
    alt: 'Un grupo grande de jóvenes empapados posa en una calle empedrada',
    archivo: 'Carnaval de Cajamarca.jpg',
  },
  baldesDeGlobos: {
    src: baldesDeGlobos,
    alt: 'Baldes llenos de globos de agua de colores alineados en la vereda',
    archivo: "Galledes plenes de globus d'aigua pel carnaval de Cajamarca 2017.jpg",
  },
  musicosDeNoche: {
    src: musicosDeNoche,
    alt: 'Músicos tocan trompetas de noche en medio de la gente',
    archivo: 'Músics tocant pel carnaval de Cajamarca.jpg',
  },
  patioMunicipal: {
    src: patioMunicipal,
    alt: 'Patio colonial de la antigua municipalidad decorado con telas de colores y máscaras de carnaval',
    archivo: 'Pati de la municipalidad antigua de Cajamarca pel Carnaval 2018 03.jpg',
  },
  disfrazPicaflor: {
    src: disfrazPicaflor,
    alt: 'Joven con disfraz de picaflor azul y verde, alas abiertas y tocado de plumas',
    archivo: 'Persones disfraçades a Plaza Vea durant el carnaval de Cajamarca 2017 02.jpg',
    recortada: true,
  },
  disfracesTurquesa: {
    src: disfracesTurquesa,
    alt: 'Pareja con trajes turquesa bordados y grandes tocados',
    archivo: 'Persones disfraçades a Plaza Vea durant el carnaval de Cajamarca 2017 04.jpg',
    recortada: true,
  },
  disfrazAbanico: {
    src: disfrazAbanico,
    alt: 'Dos personas con trajes bordados, uno blanco y negro y otro fucsia con un gran abanico',
    archivo: 'Persones disfraçades a Plaza Vea durant el carnaval de Cajamarca 2017.jpg',
    recortada: true,
  },
  globosEnLaCalle: {
    src: globosEnLaCalle,
    alt: 'Niños lanzan globos de agua en una calle frente a la plaza',
    archivo: "Persones tirant globus d'aigua al carnaval de Cajamarca de 2017 02.jpg",
  },
  plazaMojada: {
    src: plazaMojada,
    alt: 'La Plaza de Armas de Cajamarca con el piso mojado y gente caminando',
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
