/**
 * Contenido general del Carnaval de Cajamarca.
 * Cada dato viene de las fuentes listadas al final de este archivo.
 */

export type Color = 'fucsia' | 'amarillo' | 'verde' | 'azul' | 'naranja' | 'turquesa';

export const historia = [
  {
    cuando: 'Siglo XVI',
    titulo: 'Llegan el cantar y el romance',
    texto:
      'Con la conquista llegan la copla, el cantar y el romance españoles. Primero los usan las tropas; después el pueblo se los apropia y los vuelve sátira durante el virreinato, la independencia y la república.',
    en: {
      cuando: '16th century',
      titulo: 'Spanish verse & ballads arrive',
      texto:
        'With the Spanish conquest come the copla, ballad, and romance verse forms. First sung by soldiers, they are later adopted by locals and turned into political and social satire through the colonial, independence, and republican eras.',
    },
  },
  {
    cuando: '1822',
    titulo: 'Coplas para la independencia',
    texto:
      'El poeta cajamarquino Mario Florián documentó que hacia 1822 se componían en la zona coplas en redondilla para encender el patriotismo. La copla ya era un arma.',
    en: {
      cuando: '1822',
      titulo: 'Coplas for independence',
      texto:
        'Cajamarca poet Mario Florián documented that around 1822 four-line coplas were composed in the region to stir up patriotism. The copla was already a political weapon.',
    },
  },
  {
    cuando: '1930',
    titulo: 'Nace el carnaval moderno',
    texto:
      'Un grupo de entusiastas decide popularizar la fiesta: aparecen los primeros carros alegóricos, con sus reinas y sus comparsas.',
    en: {
      cuando: '1930',
      titulo: 'The modern carnival is born',
      texto:
        'A group of local enthusiasts decides to popularize the festival: the first decorated floats, carnival queens, and marching troupes appear.',
    },
  },
  {
    cuando: '1930',
    titulo: 'Se acaba el baldazo',
    texto:
      'En el gobierno de Augusto B. Leguía se prohíbe el juego brusco con agua. La gente se las ingenia: chisguetes de éter, talco, hollín, perfumes y hasta huevos rellenos de olor.',
    en: {
      cuando: '1930',
      titulo: 'Bucket-throwing is banned',
      texto:
        'Under President Augusto B. Leguía, rough water-bucket play is banned. Revelers improvise with ether squirt tubes, talcum powder, soot, perfumes, and even scented eggshells.',
    },
  },
  {
    cuando: '1960',
    titulo: 'Solo los domingos',
    texto:
      'Tras años de desmanes, el gobierno de Manuel Prado reduce la fiesta de tres días a los domingos de febrero.',
    en: {
      cuando: '1960',
      titulo: 'Sundays only',
      texto:
        'After years of rowdy excesses, President Manuel Prado’s government cuts the three-day festival down to February Sundays.',
    },
  },
  {
    cuando: 'Años setenta',
    titulo: 'Vuelve la fiesta grande',
    texto:
      'Con el alcalde Adolfo Amorín Bueno el carnaval se reactiva, y desde entonces lo organiza un Comité Central del Carnaval.',
    en: {
      cuando: '1970s',
      titulo: 'The big festival returns',
      texto:
        'Under Mayor Adolfo Amorín Bueno, carnival is revived—and from then on, a Central Carnival Committee organizes the celebration.',
    },
  },
  {
    cuando: 'Lo que cuentan los mayores',
    titulo: 'Martes de trompadas',
    texto:
      'Las patrullas guardaban las rencillas de todo el año para el martes de carnaval y se agarraban a puñetes. Los rivales de siempre: San Pedro y San Sebastián.',
    en: {
      cuando: 'What elders remember',
      titulo: 'Fistfight Tuesday',
      texto:
        'Neighborhood troupes saved their year-long grudges for Carnival Tuesday and settled them with fistfights. The classic rivals: San Pedro and San Sebastián.',
    },
  },
  {
    cuando: 'Hace medio siglo',
    titulo: 'De casa en casa',
    texto:
      'Las patrullas entraban a las casas cantando y los vecinos las esperaban con la chicha de patrulla. Cada barrio tenía entre tres y seis comparsas; hoy puede tener hasta 25.',
    en: {
      cuando: 'Half a century ago',
      titulo: 'House to house',
      texto:
        'Troupes marched into homes singing, and neighbors welcomed them with fermented corn beer (chicha de patrulla). Each neighborhood had three to six troupes; today it can field up to 25.',
    },
  },
  {
    cuando: '2002',
    titulo: 'Fiesta nacional',
    texto: 'La Ley 27667, publicada en febrero, declara al Carnaval de Cajamarca fiesta nacional.',
    en: {
      cuando: '2002',
      titulo: 'National festival',
      texto: 'Law 27667, published in February, officially declares the Carnaval de Cajamarca a national celebration.',
    },
  },
  {
    cuando: 'Antes de 2014',
    titulo: 'Del aceite quemado a la pintura',
    texto:
      'Para pintar a la gente se usaba aceite quemado. Por tóxico, el municipio lo prohibió; en 2014 la pintura ya solo valía el día del ingreso del Ño Carnavalón.',
    en: {
      cuando: 'Before 2014',
      titulo: 'From used motor oil to paint',
      texto:
        'People used to smear revelers with used motor oil. Because it was toxic, the municipality banned it; by 2014 paint was reserved only for Saturday’s arrival of Ño Carnavalón.',
    },
  },
  {
    cuando: '2017',
    titulo: 'La copla, patrimonio',
    texto:
      'El Ministerio de Cultura declara Patrimonio Cultural de la Nación a la copla y contrapunto del carnaval de Cajamarca (R.V.M. N.° 117-2017-VMPCIC-MC).',
    en: {
      cuando: '2017',
      titulo: 'Coplas declared cultural heritage',
      texto:
        'Peru’s Ministry of Culture declares the Cajamarca carnival copla and contrapunto (dueling verses) National Cultural Heritage (R.V.M. No. 117-2017-VMPCIC-MC).',
    },
  },
  {
    cuando: '2021–2022',
    titulo: 'Dos años en silencio',
    texto:
      'La pandemia suspende el carnaval dos veces seguidas. Vuelve en 2023 como el Carnaval del Reencuentro.',
    en: {
      cuando: '2021–2022',
      titulo: 'Two silent years',
      texto:
        'The COVID-19 pandemic suspends carnival two years in a row. It returns in 2023 as the “Carnival of Reunion.”',
    },
  },
];

export function historiaDe(idioma: Idioma = 'es') {
  return historia.map((h) => (idioma === 'en' ? h.en : { cuando: h.cuando, titulo: h.titulo, texto: h.texto }));
}

import type { Idioma } from '../i18n';

/** Días del carnaval, relativos al Miércoles de Ceniza (0). */
export const programa: Array<{
  offset: number;
  dia: string;
  titulo: string;
  texto: string;
  en: { dia: string; titulo: string; texto: string };
  color: Color;
}> = [
  {
    offset: -4,
    dia: 'Sábado',
    titulo: 'Entra el Ño Carnavalón',
    texto:
      'Llega por el barrio Santa Elena, la portada de Cajamarca. Es el único día con pintura permitida: cuadras enteras de agua, pintura y talco.',
    en: {
      dia: 'Saturday',
      titulo: 'Arrival of Ño Carnavalón',
      texto:
        'He enters through the Santa Elena neighborhood, the gateway to Cajamarca. It is the only day paint is allowed: whole blocks get soaked in water, paint, and talcum powder.',
    },
    color: 'fucsia',
  },
  {
    offset: -3,
    dia: 'Domingo',
    titulo: 'Patrullas y comparsas',
    texto:
      'Los barrios compiten en damas, varones, mixta, infantil y vestimenta típica. Se califica disfraz, coplas, presentación y alegría.',
    en: {
      dia: 'Sunday',
      titulo: 'Troupes & parades',
      texto:
        'Neighborhood groups compete in women’s, men’s, mixed, children’s, and traditional attire categories—judged on costumes, coplas, staging, and energy.',
    },
    color: 'verde',
  },
  {
    offset: -2,
    dia: 'Lunes',
    titulo: 'Gran Corso',
    texto: 'Carros alegóricos, reinas, clones y comparsas. Hay palcos, y guerra de globos entre palco y palco.',
    en: {
      dia: 'Monday',
      titulo: 'Gran Corso',
      texto: 'Floats, carnival queens, harlequin clones, and marching troupes—plus grandstand seating and water-balloon battles from stand to stand.',
    },
    color: 'amarillo',
  },
  {
    offset: -1,
    dia: 'Martes',
    titulo: 'Velorio',
    texto: 'Las viudas del Ño Carnavalón lo lloran a gritos camino a Santa Apolonia.',
    en: {
      dia: 'Tuesday',
      titulo: 'The Wake',
      texto: 'The dramatic “widows” of Ño Carnavalón wail and mourn him all the way up to Santa Apolonia.',
    },
    color: 'turquesa',
  },
  {
    offset: 0,
    dia: 'Miércoles de Ceniza',
    titulo: 'Testamento y entierro',
    texto:
      'Se lee su testamento burlón, con herencias picantes para las autoridades, y se quema el muñeco. Lo que queda es un baile general.',
    en: {
      dia: 'Ash Wednesday',
      titulo: 'Will & Burial',
      texto:
        'His satirical will is read aloud—roasting local officials—before the effigy is burned and everyone dances the night away.',
    },
    color: 'naranja',
  },
];

export function programaDe(idioma: Idioma = 'es') {
  return programa.map((d) =>
    idioma === 'en' ? { offset: d.offset, color: d.color, ...d.en } : { offset: d.offset, color: d.color, dia: d.dia, titulo: d.titulo, texto: d.texto },
  );
}

export const personajes = [
  {
    nombre: 'Ño Carnavalón',
    texto:
      'El Rey Momo: un muñeco enorme de hombre alto y viejo. Su llegada abre la fiesta y su entierro la cierra.',
    en: {
      nombre: 'Ño Carnavalón',
      texto:
        'The King of Carnival: a towering effigy of an old man. His arrival opens the festival and his burning closes it.',
    },
    color: 'fucsia' as Color,
  },
  {
    nombre: 'Los clones',
    texto:
      'Primero, segundo y tercero. Arlequines de traje ancho, careta y cucurucho que cuidan a la patrulla saltando alrededor, con silbato.',
    en: {
      nombre: 'Los Clones (Harlequins)',
      texto:
        'First, second, and third rank. Baggy-suited harlequins in wire masks and tall pointed hats (cucuruchos) who leap around the troupe blowing whistles to clear the way.',
    },
    color: 'turquesa' as Color,
  },
  {
    nombre: 'El virrey',
    texto: 'Manda en la patrulla, espada en mano. Es una burla de la autoridad colonial.',
    en: {
      nombre: 'El Virrey (The Viceroy)',
      texto: 'Leads the troupe, sword in hand—a satirical jab at Spanish colonial authority.',
    },
    color: 'azul' as Color,
  },
  {
    nombre: 'La gitana',
    texto: 'Un hombre vestido de mujer que va en la patrulla, puesto ahí para la sátira.',
    en: {
      nombre: 'La Gitana',
      texto: 'A man dressed in women’s clothes marching with the troupe as part of carnival’s traditional satire.',
    },
    color: 'naranja' as Color,
  },
  {
    nombre: 'Las viudas',
    texto: 'Lloran al Ño Carnavalón con todo el teatro posible. En 2026 hasta hubo concurso de viudas.',
    en: {
      nombre: 'Las Viudas (The Widows)',
      texto: 'Mourn Ño Carnavalón with as much melodrama as possible. In 2026 there was even an official widows contest.',
    },
    color: 'verde' as Color,
  },
  {
    nombre: 'Ña Carnavalona y el Cilulo',
    texto:
      'La compañera del Ño, que se sumó a la fiesta en los años ochenta, y el Cilulo, que además da nombre a una de las canciones-danza.',
    en: {
      nombre: 'Ña Carnavalona & El Cilulo',
      texto:
        'Ño Carnavalón’s partner, who joined the festival in the 1980s, and El Cilulo—who also lends his name to one of the signature carnival dance songs.',
    },
    color: 'amarillo' as Color,
  },
];

export function personajesDe(idioma: Idioma = 'es') {
  return personajes.map((p) => (idioma === 'en' ? { color: p.color, ...p.en } : { color: p.color, nombre: p.nombre, texto: p.texto }));
}

export const costumbres = [
  {
    titulo: 'Agua, pintura y talco',
    texto:
      'Globos, pistolas de agua, baldes, talco y serpentinas. El agua y la pintura marcan el inicio y el fin de la fiesta.',
    en: {
      titulo: 'Water, paint & talcum powder',
      texto:
        'Water balloons, squirt guns, buckets, talcum powder, and streamers. Water and paint bookend the entire celebration.',
    },
  },
  {
    titulo: 'Patrulla o comparsa',
    texto:
      'En la patrulla cada uno va con su propio disfraz. En la comparsa todos visten igual, representan a su barrio y compiten con sus coplas.',
    en: {
      titulo: 'Patrulla vs. Comparsa',
      texto:
        'In a patrulla, everyone wears a different costume. In a comparsa, the whole group wears matching outfits, represents their neighborhood, and competes with coplas.',
    },
  },
  {
    titulo: 'Máscaras de malla',
    texto:
      'De hilo de bronce, cobre o aluminio, hechas por artesanos de Chota, Contumazá y San Miguel. Se moldean sobre un rostro y se pintan a mano.',
    en: {
      titulo: 'Wire-mesh masks',
      texto:
        'Woven from bronze, copper, or aluminum wire by artisans from Chota, Contumazá, and San Miguel, shaped over a face mold and hand-painted.',
    },
  },
  {
    titulo: 'La yunza',
    texto:
      'También umsha o cortamonte. Un árbol cargado de regalos; se baila en ronda y, en cada vuelta, una pareja le da un machetazo hasta tumbarlo.',
    en: {
      titulo: 'La Yunza (Tree-chopping dance)',
      texto:
        'Also called umsha or cortamonte: a tree hung with gifts. Couples dance around it in a circle, taking turns swinging a machete until it falls and everyone scrambles for the prizes.',
    },
  },
  {
    titulo: 'El traje de fiesta',
    texto:
      'Ellos con camisa blanca, pantalón negro y poncho de lana. Ellas con blusa blanca, falda de colores, sombrero y llanques.',
    en: {
      titulo: 'Traditional attire',
      texto:
        'Men wear a white shirt, black trousers, and a wool poncho. Women wear a white blouse, colorful skirt, woven hat, and traditional sandals (llanques).',
    },
  },
  {
    titulo: 'Ropa vieja',
    texto: 'El consejo de todo cajamarquino al visitante: ropa viejita, de los zapatos para arriba.',
    en: {
      titulo: 'Old clothes',
      texto: 'Every local’s first tip for visitors: wear old clothes you don’t mind ruining, from shoes on up.',
    },
  },
];

export function costumbresDe(idioma: Idioma = 'es') {
  return costumbres.map((c) => (idioma === 'en' ? c.en : { titulo: c.titulo, texto: c.texto }));
}

export const musica = {
  instrumentos: [
    'guitarra',
    'caja y clarín',
    'quena',
    'huiro',
    'bombo',
    'tarola',
    'saxo',
    'trompeta',
    'acordeón',
    'concertina',
    'mandolina',
    'violín',
    'rondín',
  ],
  instrumentosEn: [
    'guitar',
    'drum & clarín',
    'quena flute',
    'güiro',
    'bass drum',
    'snare drum',
    'saxophone',
    'trumpet',
    'accordion',
    'concertina',
    'mandolin',
    'violin',
    'harmonica',
  ],
  danzas: ['El Cilulo', 'La Carolina', 'Cumbe-cumbe', 'La Matarina', 'La cashua'],
};

export function musicaDe(idioma: Idioma = 'es') {
  return {
    instrumentos: idioma === 'en' ? musica.instrumentosEn : musica.instrumentos,
    danzas: musica.danzas,
  };
}

export const sabores = [
  {
    nombre: 'Puchero o sancochado',
    texto:
      'Repollo, papa, camote, yuca, racacha, res, tocino y carnero. El caldo va en un plato y lo sólido en otro.',
    en: {
      nombre: 'Puchero (Carnival stew)',
      texto:
        'Cabbage, potato, sweet potato, yuca, arracacha root, beef, pork belly, and mutton—served with the broth in one bowl and the meats and vegetables on another plate.',
    },
  },
  {
    nombre: 'Frito',
    texto: 'Menudencia de cerdo con azafrán; se come con papa y chicharrón.',
    en: { nombre: 'Frito', texto: 'Saffron-seasoned pork offal served with boiled potatoes and crispy fried pork (chicharrón).' },
  },
  {
    nombre: 'Caldo verde',
    texto: 'Papa, huevo y queso en un caldo que el perejil y el paico pintan de verde.',
    en: { nombre: 'Caldo verde', texto: 'Potato, poached egg, and fresh cheese in a bright green broth flavored with parsley and Andean herbs (paico).' },
  },
  {
    nombre: 'Cuy frito y chicharrón con mote',
    texto: 'Los platos de fiesta en la mesa cajamarquina.',
    en: { nombre: 'Fried cuy & chicharrón con mote', texto: 'Crispy guinea pig and fried pork with hominy corn—classic celebratory dishes on Cajamarca tables.' },
  },
  {
    nombre: 'Humitas y cecina shilpida',
    texto: 'La cecina va deshilachada; las humitas, para el camino.',
    en: { nombre: 'Humitas & cecina shilpida', texto: 'Shredded cured pork (cecina) and steamed corn cakes (humitas) to eat on the go.' },
  },
  {
    nombre: 'Chicha de jora',
    texto:
      'La más pedida, servida en poto. Las familias la preparan semanas antes en urpos, con jora, frutas y chancaca, y la dejan fermentar.',
    en: {
      nombre: 'Chicha de jora',
      texto:
        'Traditional fermented corn beer, served in a dried gourd (poto). Families brew it weeks ahead in clay jars (urpos) with malted corn, fruit, and raw cane sugar.',
    },
  },
  {
    nombre: 'Chicha de maní y chicha colorada',
    texto: 'Las del carnaval de antes.',
    en: { nombre: 'Peanut chicha & red chicha', texto: 'Old-school carnival brews from earlier generations.' },
  },
  {
    nombre: 'Calientito y cañazo',
    texto: 'Para el frío que deja el agua.',
    en: { nombre: 'Calientito & cañazo', texto: 'Hot spiced sugarcane liquor to warm up after getting drenched.' },
  },
  {
    nombre: 'Manjar blanco',
    texto: 'El dulce emblema, también en alfajores, turrones y rosquitas.',
    en: { nombre: 'Manjar blanco', texto: 'Cajamarca’s signature milk caramel, also baked into alfajores, nougats, and ring cookies.' },
  },
  {
    nombre: 'Quesillo con miel',
    texto: 'Quesillo fresco bañado en miel de caña.',
    en: { nombre: 'Quesillo con miel', texto: 'Fresh local curd cheese drizzled with sugarcane syrup.' },
  },
];

export function saboresDe(idioma: Idioma = 'es') {
  return sabores.map((s) => (idioma === 'en' ? s.en : { nombre: s.nombre, texto: s.texto }));
}

export const rasgosHabla = [
  {
    titulo: 'El dejo cantadito',
    texto:
      'El cajamarquino habla con melodía: la frase sube y baja y la sílaba fuerte se estira. «¿Cómo estááás, pues?»',
    en: {
      titulo: 'The sing-song lilt',
      texto:
        'Cajamarca Spanish has a musical cadence: sentences rise and fall, and the stressed syllable stretches out—“¿Cómo estááás, pues?”',
    },
  },
  {
    titulo: 'Todo en diminutivo',
    texto: 'Aquisito, ahoritita, cerquita, toditito, nomasito. El diminutivo suaviza, invita y acerca.',
    en: {
      titulo: 'Everything in diminutive',
      texto: 'Aquisito, ahoritita, cerquita, toditito, nomasito. Diminutives soften speech, invite you in, and add warmth.',
    },
  },
  {
    titulo: 'La sh de la sierra',
    texto:
      'Shulca, misho, cholasho. El sonido sh viene del quechua y del culle, las lenguas de la región antes del castellano.',
    en: {
      titulo: 'The highland “sh” sound',
      texto:
        'Shulca, misho, cholasho. The “sh” sound comes from Quechua and Culle, the region’s languages before Spanish arrived.',
    },
  },
  {
    titulo: 'Herencia culle',
    texto:
      'El diminutivo -ash- de cholasho (muchachito) y chinasha (muchachita) se atribuye al culle, lengua ya extinta del norte andino.',
    en: {
      titulo: 'Culle heritage',
      texto:
        'The -ash- diminutive in cholasho (young boy) and chinasha (young girl) is traced to Culle, an extinct northern Andean language.',
    },
  },
  {
    titulo: 'Nomás y pues',
    texto: 'Dos palabras que lo arreglan todo: «pase nomás», «ya pues». Sin ellas, la frase suena a orden.',
    en: {
      titulo: 'Nomás and pues',
      texto: 'Two little words that smooth over everything: “pase nomás” (go right ahead), “ya pues” (come on). Without them, a sentence can sound blunt.',
    },
  },
  {
    titulo: 'Ño y Ña',
    texto: 'Formas antiguas de señor y señora. Por eso el rey de la fiesta es el Ño Carnavalón.',
    en: {
      titulo: 'Ño and Ña',
      texto: 'Old-fashioned forms of señor and señora—which is why the king of carnival is called Ño Carnavalón.',
    },
  },
];

export function rasgosHablaDe(idioma: Idioma = 'es') {
  return rasgosHabla.map((r) => (idioma === 'en' ? r.en : { titulo: r.titulo, texto: r.texto }));
}

export const diloAsi = [
  { neutro: 'Pasa, siéntate.', en: 'Come in, have a seat.', cajamarquino: 'Pase nomás, siéntese nomasito.' },
  { neutro: 'Está cerca.', en: 'It’s nearby.', cajamarquino: 'Aquisito nomás es.' },
  { neutro: 'Ya vengo.', en: 'I’ll be right back.', cajamarquino: 'Ahoritita vengo, pues.' },
  { neutro: '¡Qué frío!', en: 'It’s so cold!', cajamarquino: '¡Alalau!' },
  { neutro: '¡Qué rico!', en: 'So delicious!', cajamarquino: '¡Ñañau!' },
  { neutro: 'El hijo menor', en: 'The youngest child', cajamarquino: 'El shulca' },
  { neutro: 'Ese muchacho', en: 'That young guy', cajamarquino: 'Ese cholasho' },
  { neutro: 'El gato', en: 'The cat', cajamarquino: 'El misho' },
  { neutro: 'Señor Carnaval', en: 'Mr. Carnival', cajamarquino: 'Ño Carnavalón' },
];

export function diloAsiDe(idioma: Idioma = 'es') {
  return diloAsi.map((d) => ({ neutro: idioma === 'en' ? d.en : d.neutro, cajamarquino: d.cajamarquino }));
}

export const fuentes = [
  {
    medio: 'Andina',
    titulo: 'Carnaval de Cajamarca: personajes y música protagonistas de esta festividad',
    url: 'https://andina.pe/agencia/noticia-carnaval-cajamarca-conoce-los-personajes-y-musica-protagonistas-esta-festividad-973754.aspx',
  },
  {
    medio: 'Andina',
    titulo: 'Conoce por qué Cajamarca es considerada Capital del Carnaval Peruano',
    url: 'https://andina.pe/agencia/noticia-conoce-por-cajamarca-es-considerada-capital-del-carnaval-peruano-784877.aspx',
  },
  {
    medio: 'Ministerio de Cultura',
    titulo: 'R.V.M. 117-2017-VMPCIC-MC: copla y contrapunto, Patrimonio Cultural de la Nación',
    url: 'https://img.lpderecho.pe/wp-content/uploads/2017/06/Declaran-Patrimonio-Cultural-de-la-Nación-a-la-Copla-y-contrapunto-del-carnaval-de-Cajamarca.pdf',
  },
  {
    medio: 'La República',
    titulo: 'Copla y contrapunto cajamarquino: origen de la melodía de los carnavales',
    url: 'https://larepublica.pe/sociedad/2023/02/17/carnavales-de-cajamarca-copla-y-contrapunto-cajamarquino-cual-es-el-origen-de-la-popular-melodia-que-se-toca-en-los-carnavales-lrsd-1159978',
  },
  {
    medio: 'El Comercio',
    titulo: 'Carnaval de Cajamarca: un viaje de colores, comparsas y tradiciones',
    url: 'https://elcomercio.pe/somos/carnaval-de-cajamarca-un-viaje-de-colores-tradiciones-y-comparsas-historia-viaje-noticia/',
  },
  {
    medio: 'RPP',
    titulo: 'Recuerdos del carnaval cajamarquino',
    url: 'https://rpp.pe/peru/actualidad/recuerdos-del-carnaval-cajamarquino-noticia-565709',
  },
  {
    medio: 'RPP',
    titulo: 'Cajamarca está de fiesta con su carnaval',
    url: 'https://rpp.pe/peru/actualidad/cajamarca-esta-de-fiesta-con-su-carnaval-noticia-673520',
  },
  {
    medio: 'RPP',
    titulo: 'Las alegres y pícaras coplas de Cajamarca',
    url: 'https://rpp.pe/peru/actualidad/las-alegres-y-picaras-coplas-de-cajamarca-noticia-669715',
  },
  {
    medio: 'Carnavalcajamarca.com',
    titulo: 'Historia del carnaval de Cajamarca (cita una tesis de la PUCP)',
    url: 'https://carnavalcajamarca.com/historia-del-carnaval-de-cajamarca/',
  },
  {
    medio: 'Carnavalcajamarca.com',
    titulo: 'Platos típicos del carnaval de Cajamarca',
    url: 'https://carnavalcajamarca.com/platos-tipicos-del-carnaval-de-cajamarca/',
  },
  {
    medio: 'El Peruano (en Justia Perú)',
    titulo: 'Ley 27667: declara al Carnaval de Cajamarca fiesta nacional',
    url: 'https://peru.justia.com/federales/leyes/27667-feb-14-2002/gdoc',
  },
  {
    medio: 'Boletín de Arqueología PUCP',
    titulo: 'Contactos y fronteras de lenguas en la Cajamarca prehispánica (L. Andrade)',
    url: 'https://revistas.pucp.edu.pe/index.php/boletindearqueologia/article/view/1213',
  },
];
