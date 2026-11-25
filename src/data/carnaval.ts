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
  },
  {
    cuando: '1822',
    titulo: 'Coplas para la independencia',
    texto:
      'El poeta cajamarquino Mario Florián documentó que hacia 1822 se componían en la zona coplas en redondilla para encender el patriotismo. La copla ya era un arma.',
  },
  {
    cuando: '1930',
    titulo: 'Nace el carnaval moderno',
    texto:
      'Un grupo de entusiastas decide popularizar la fiesta: aparecen los primeros carros alegóricos, con sus reinas y sus comparsas.',
  },
  {
    cuando: '1930',
    titulo: 'Se acaba el baldazo',
    texto:
      'En el gobierno de Augusto B. Leguía se prohíbe el juego brusco con agua. La gente se las ingenia: chisguetes de éter, talco, hollín, perfumes y hasta huevos rellenos de olor.',
  },
  {
    cuando: '1960',
    titulo: 'Solo los domingos',
    texto:
      'Tras años de desmanes, el gobierno de Manuel Prado reduce la fiesta de tres días a los domingos de febrero.',
  },
  {
    cuando: 'Años setenta',
    titulo: 'Vuelve la fiesta grande',
    texto:
      'Con el alcalde Adolfo Amorín Bueno el carnaval se reactiva, y desde entonces lo organiza un Comité Central del Carnaval.',
  },
  {
    cuando: 'Lo que cuentan los mayores',
    titulo: 'Martes de trompadas',
    texto:
      'Las patrullas guardaban las rencillas de todo el año para el martes de carnaval y se agarraban a puñetes. Los rivales de siempre: San Pedro y San Sebastián.',
  },
  {
    cuando: 'Hace medio siglo',
    titulo: 'De casa en casa',
    texto:
      'Las patrullas entraban a las casas cantando y los vecinos las esperaban con la chicha de patrulla. Cada barrio tenía entre tres y seis comparsas; hoy puede tener hasta 25.',
  },
  {
    cuando: '2002',
    titulo: 'Fiesta nacional',
    texto: 'La Ley 27667, publicada en febrero, declara al Carnaval de Cajamarca fiesta nacional.',
  },
  {
    cuando: 'Antes de 2014',
    titulo: 'Del aceite quemado a la pintura',
    texto:
      'Para pintar a la gente se usaba aceite quemado. Por tóxico, el municipio lo prohibió; en 2014 la pintura ya solo valía el día del ingreso del Ño Carnavalón.',
  },
  {
    cuando: '2017',
    titulo: 'La copla, patrimonio',
    texto:
      'El Ministerio de Cultura declara Patrimonio Cultural de la Nación a la copla y contrapunto del carnaval de Cajamarca (R.V.M. N.° 117-2017-VMPCIC-MC).',
  },
  {
    cuando: '2021–2022',
    titulo: 'Dos años en silencio',
    texto:
      'La pandemia suspende el carnaval dos veces seguidas. Vuelve en 2023 como el Carnaval del Reencuentro.',
  },
];

/** Días del carnaval, relativos al Miércoles de Ceniza (0). */
export const programa: Array<{ offset: number; dia: string; titulo: string; texto: string; color: Color }> = [
  {
    offset: -4,
    dia: 'Sábado',
    titulo: 'Entra el Ño Carnavalón',
    texto:
      'Llega por el barrio Santa Elena, la portada de Cajamarca. Es el único día con pintura permitida: cuadras enteras de agua, pintura y talco.',
    color: 'fucsia',
  },
  {
    offset: -3,
    dia: 'Domingo',
    titulo: 'Patrullas y comparsas',
    texto:
      'Los barrios compiten en damas, varones, mixta, infantil y vestimenta típica. Se califica disfraz, coplas, presentación y alegría.',
    color: 'verde',
  },
  {
    offset: -2,
    dia: 'Lunes',
    titulo: 'Gran Corso',
    texto: 'Carros alegóricos, reinas, clones y comparsas. Hay palcos, y guerra de globos entre palco y palco.',
    color: 'amarillo',
  },
  {
    offset: -1,
    dia: 'Martes',
    titulo: 'Velorio',
    texto: 'Las viudas del Ño Carnavalón lo lloran a gritos camino a Santa Apolonia.',
    color: 'turquesa',
  },
  {
    offset: 0,
    dia: 'Miércoles de Ceniza',
    titulo: 'Testamento y entierro',
    texto:
      'Se lee su testamento burlón, con herencias picantes para las autoridades, y se quema el muñeco. Lo que queda es un baile general.',
    color: 'naranja',
  },
];

export const personajes: Array<{ nombre: string; texto: string; color: Color }> = [
  {
    nombre: 'Ño Carnavalón',
    texto:
      'El Rey Momo: un muñeco enorme de hombre alto y viejo. Su llegada abre la fiesta y su entierro la cierra.',
    color: 'fucsia',
  },
  {
    nombre: 'Los clones',
    texto:
      'Primero, segundo y tercero. Arlequines de traje ancho, careta y cucurucho que cuidan a la patrulla saltando alrededor, con silbato.',
    color: 'turquesa',
  },
  {
    nombre: 'El virrey',
    texto: 'Manda en la patrulla, espada en mano. Es una burla de la autoridad colonial.',
    color: 'azul',
  },
  {
    nombre: 'La gitana',
    texto: 'Un hombre vestido de mujer que va en la patrulla, puesto ahí para la sátira.',
    color: 'naranja',
  },
  {
    nombre: 'Las viudas',
    texto: 'Lloran al Ño Carnavalón con todo el teatro posible. En 2026 hasta hubo concurso de viudas.',
    color: 'verde',
  },
  {
    nombre: 'Ña Carnavalona y el Cilulo',
    texto:
      'La compañera del Ño, que se sumó a la fiesta en los años ochenta, y el Cilulo, que además da nombre a una de las canciones-danza.',
    color: 'amarillo',
  },
];

export const costumbres = [
  {
    titulo: 'Agua, pintura y talco',
    texto:
      'Globos, pistolas de agua, baldes, talco y serpentinas. El agua y la pintura marcan el inicio y el fin de la fiesta.',
  },
  {
    titulo: 'Patrulla o comparsa',
    texto:
      'En la patrulla cada uno va con su propio disfraz. En la comparsa todos visten igual, representan a su barrio y compiten con sus coplas.',
  },
  {
    titulo: 'Máscaras de malla',
    texto:
      'De hilo de bronce, cobre o aluminio, hechas por artesanos de Chota, Contumazá y San Miguel. Se moldean sobre un rostro y se pintan a mano.',
  },
  {
    titulo: 'La yunza',
    texto:
      'También umsha o cortamonte. Un árbol cargado de regalos; se baila en ronda y, en cada vuelta, una pareja le da un machetazo hasta tumbarlo.',
  },
  {
    titulo: 'El traje de fiesta',
    texto:
      'Ellos con camisa blanca, pantalón negro y poncho de lana. Ellas con blusa blanca, falda de colores, sombrero y llanques.',
  },
  {
    titulo: 'Ropa vieja',
    texto: 'El consejo de todo cajamarquino al visitante: ropa viejita, de los zapatos para arriba.',
  },
];

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
  danzas: ['El Cilulo', 'La Carolina', 'Cumbe-cumbe', 'La Matarina', 'La cashua'],
};

export const sabores: Array<{ nombre: string; texto: string }> = [
  {
    nombre: 'Puchero o sancochado',
    texto:
      'Repollo, papa, camote, yuca, racacha, res, tocino y carnero. El caldo va en un plato y lo sólido en otro.',
  },
  { nombre: 'Frito', texto: 'Menudencia de cerdo con azafrán; se come con papa y chicharrón.' },
  { nombre: 'Caldo verde', texto: 'Papa, huevo y queso en un caldo que el perejil y el paico pintan de verde.' },
  { nombre: 'Cuy frito y chicharrón con mote', texto: 'Los platos de fiesta en la mesa cajamarquina.' },
  { nombre: 'Humitas y cecina shilpida', texto: 'La cecina va deshilachada; las humitas, para el camino.' },
  {
    nombre: 'Chicha de jora',
    texto:
      'La más pedida, servida en poto. Las familias la preparan semanas antes en urpos, con jora, frutas y chancaca, y la dejan fermentar.',
  },
  { nombre: 'Chicha de maní y chicha colorada', texto: 'Las del carnaval de antes.' },
  { nombre: 'Calientito y cañazo', texto: 'Para el frío que deja el agua.' },
  { nombre: 'Manjar blanco', texto: 'El dulce emblema, también en alfajores, turrones y rosquitas.' },
  { nombre: 'Quesillo con miel', texto: 'Quesillo fresco bañado en miel de caña.' },
];

export const rasgosHabla = [
  {
    titulo: 'El dejo cantadito',
    texto:
      'El cajamarquino habla con melodía: la frase sube y baja y la sílaba fuerte se estira. «¿Cómo estááás, pues?»',
  },
  {
    titulo: 'Todo en diminutivo',
    texto: 'Aquisito, ahoritita, cerquita, toditito, nomasito. El diminutivo suaviza, invita y acerca.',
  },
  {
    titulo: 'La sh de la sierra',
    texto:
      'Shulca, misho, cholasho. El sonido sh viene del quechua y del culle, las lenguas de la región antes del castellano.',
  },
  {
    titulo: 'Herencia culle',
    texto:
      'El diminutivo -ash- de cholasho (muchachito) y chinasha (muchachita) se atribuye al culle, lengua ya extinta del norte andino.',
  },
  {
    titulo: 'Nomás y pues',
    texto: 'Dos palabras que lo arreglan todo: «pase nomás», «ya pues». Sin ellas, la frase suena a orden.',
  },
  {
    titulo: 'Ño y Ña',
    texto: 'Formas antiguas de señor y señora. Por eso el rey de la fiesta es el Ño Carnavalón.',
  },
];

export const diloAsi = [
  { neutro: 'Pasa, siéntate.', cajamarquino: 'Pase nomás, siéntese nomasito.' },
  { neutro: 'Está cerca.', cajamarquino: 'Aquisito nomás es.' },
  { neutro: 'Ya vengo.', cajamarquino: 'Ahoritita vengo, pues.' },
  { neutro: '¡Qué frío!', cajamarquino: '¡Alalau!' },
  { neutro: '¡Qué rico!', cajamarquino: '¡Ñañau!' },
  { neutro: 'El hijo menor', cajamarquino: 'El shulca' },
  { neutro: 'Ese muchacho', cajamarquino: 'Ese cholasho' },
  { neutro: 'El gato', cajamarquino: 'El misho' },
  { neutro: 'Señor Carnaval', cajamarquino: 'Ño Carnavalón' },
];

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
