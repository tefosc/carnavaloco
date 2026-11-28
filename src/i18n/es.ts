export const es = {
  sitio: {
    nombre: 'Carnaval de Cajamarca',
    marcaGrande: 'Carnaval',
    marcaChica: 'de Cajamarca',
    marcaAria: 'Carnaval de Cajamarca, portada',
    ogAlt: (titulo: string) => `${titulo}: afiche del Carnaval de Cajamarca`,
    mascara: 'Máscara de malla pintada con cucurucho de colores, como las del carnaval de Cajamarca',
  },
  nav: {
    saltar: 'Ir al contenido',
    menu: 'Menú',
    seccionesAria: 'Secciones',
    idiomaAria: 'Cambiar idioma',
    items: {
      '2027': '2027',
      guia: 'Guía',
      'la-fiesta': 'La fiesta',
      ediciones: 'Ediciones',
      barrios: 'Barrios',
      coplas: 'Coplas',
      habla: 'Habla',
      historia: 'Historia',
    },
  },
  pie: {
    grito: '¡Viva el carnaval!',
    nota: 'Historia, coplas y habla de la fiesta más grande de Cajamarca. Las fechas cambian cada año: el programa oficial lo publica la Municipalidad Provincial de Cajamarca.',
    navAria: 'Pie de página',
    carnaval2027: 'Carnaval 2027',
    fotos: 'Fotos:',
    fuentesYCreditos: 'Fuentes y créditos',
    borradoresTitulo: 'Borradores de WhatsApp',
    quitar: 'Quitar',
    quitarBorradorAria: 'Quitar borrador: ',
    borradorGuardado: 'Borrador guardado en el pie de página. Ábrelo cuando vuelva la conexión.',
    borradorSinEspacio: 'Borrador disponible en el pie de esta página hasta que la cierres.',
  },
  sinRed: {
    listo: 'Listo para usar sin señal.',
    guardando: 'Guardando para usar sin señal…',
    offlineListo: 'Sin conexión. Estás viendo la edición guardada.',
    offlinePendiente: 'La descarga se completará cuando vuelva la conexión.',
    reintentar: 'La descarga se reintentará al volver a abrir la web.',
  },
  instalar: {
    flotante: 'Instalar app',
    cerrarAria: 'Ocultar el aviso de instalar',
    titulo: 'Sin señal, igual funciona',
    texto: 'El programa, el calendario, los barrios, las coplas y los recorridos se guardan automáticamente con la primera visita con internet. Puedes usarlos sin señal cuando termine la descarga.',
    boton: 'Instalar en el teléfono',
    instalada: 'Listo: ya está en tu teléfono.',
    cancelada: 'No se instaló.',
    error: 'No se pudo instalar desde aquí.',
  },
  hoy: {
    regionAria: 'Hoy en el carnaval',
    hoy: 'Hoy',
    hoyComa: 'Hoy,',
    selloAnillo: 'Hoy en el carnaval ✶ Hoy en el carnaval ✶ ',
    ya: '¡Ya!',
    paso: 'pasó',
    yaLlego: 'Ya llegó el',
    asiFue: 'Así fue el',
    verRecorrido: 'Ver por dónde pasa',
    programaCompleto: 'Programa completo',
    hora: 'Hora',
    porConfirmar: 'Por confirmar',
    donde: 'Dónde',
    manana: 'Mañana',
    despues: 'Después',
  },
  agendaPortada: {
    granBando: 'Gran Bando',
    fechaPorConfirmar: 'Fecha por confirmar',
    fechaPrevista: 'Fecha prevista',
    yaPaso: 'Ya pasó',
    hoy: 'Hoy',
    dia: 'día',
    dias: 'días',
    verRecorrido: 'Ver recorrido',
    verPrograma: 'Ver programa 2027',
  },
  carteles: {
    al: 'al',
    de: 'de',
    noHuboFiesta: 'No hubo fiesta',
    suspendido: 'Suspendido',
    edicionSuspendidaSr: ', edición suspendida',
    seViene: 'Se viene',
    verPrograma: 'Ver el programa',
  },
  aniversarios: {
    proximos: 'Próximos cumpleaños de barrios',
    hoyUno: (nombres: string) => `¡Hoy cumple años ${nombres}!`,
    hoyVarios: (nombres: string) => `¡Hoy cumplen años ${nombres}!`,
    hoy: 'Hoy',
    dia: 'día',
    dias: 'días',
    hoyBarrio: (nombre: string) => `cumple años ${nombre}`,
    faltanBarrio: (faltan: number, nombre: string) =>
      `${faltan === 1 ? 'día' : 'días'} para el aniversario de ${nombre}`,
  },
  mapa: {
    verRecorrido: 'Ver el recorrido:',
    todos: 'Todos',
    ver3d: 'Ver en 3D',
    volverPlano: 'Volver al plano',
    marcoAria: 'Mapa de recorridos; se puede desplazar hacia los lados',
    svgTitulo: 'Mapa de recorridos del Carnaval de Cajamarca',
    svgDesc: 'Calles de Cajamarca con las rutas de cada día: la avenida Independencia, la Plaza de Armas, la Vía de Evitamiento, Santa Apolonia y la carretera a Baños del Inca.',
    sale: 'Sale',
    entra: 'Entra',
    vieneDe: (lugar: string) => `Viene de ${lugar}`,
    creditoOsm: '© colaboradores de OpenStreetMap',
    nota: 'Las avenidas en trazo lleno son las reales; los tramos punteados son aproximados. El recorrido exacto sale en el programa oficial.',
    estadoDia: (nombre: string) => `${nombre}. El círculo marca por dónde sale.`,
    estadoTodos: 'Se ven todos los recorridos.',
    necesitaInternet: 'El mapa 3D necesita internet. Aquí tienes el mapa plano.',
    cargando3d: 'Cargando el 3D…',
    listo3d: 'Mapa 3D listo. Arrastra para moverlo; en el teléfono, usa dos dedos.',
    error3d: 'No se pudo abrir el mapa 3D. Aquí sigue el mapa plano.',
    errorTimeout3d: 'El mapa 3D no cargó a tiempo',
    maplibre: {
      'AttributionControl.ToggleAttribution': 'Mostrar u ocultar créditos',
      'Map.Title': 'Mapa 3D de recorridos',
      'Marker.Title': 'Marca en el mapa',
      'NavigationControl.ResetBearing': 'Arrastra para girar el mapa; toca para mirar al norte',
      'NavigationControl.ZoomIn': 'Acercar',
      'NavigationControl.ZoomOut': 'Alejar',
      'CooperativeGesturesHandler.WindowsHelpText': 'Usa Ctrl + rueda del mouse para acercar o alejar el mapa',
      'CooperativeGesturesHandler.MacHelpText': 'Usa ⌘ + rueda del mouse para acercar o alejar el mapa',
      'CooperativeGesturesHandler.MobileHelpText': 'Usa dos dedos para mover el mapa',
    },
  },
  contadorProximamente: {
    titulo: 'Carnaval 2027',
    proximamente: 'Próximamente',
    aviso: (nombre: string) => `Aquí vas a ver cuántos de ${nombre} van al Carnaval 2027 y qué número te toca.`,
    carnavalerosVan: (nombre: string) => `carnavaleros de ${nombre} ya van`,
    enTodaLaWeb: 'En toda la web:',
    carnavaleros: 'carnavaleros',
    voyAlCarnaval: 'Voy al carnaval 2027',
    carnavalero: 'Carnavalero',
    tuNombre: 'Tu nombre aquí',
    salgoConBarrio: 'Salgo con mi barrio',
    enBarrio: (nombre: string) => `En ${nombre}`,
    enTodaWebCorto: 'En toda la web',
    numero: 'N.°',
    fechas: 'Sáb 6 al mié 10 de febrero',
    fundador: 'Fundador · lugar reservado',
    compartirCredencial: 'Compartir mi credencial',
    descargarImagen: 'Descargar imagen',
    invitarBarrio: 'Invitar a mi barrio',
    mandarGrupo: 'Mandar al grupo del barrio',
    copiarEnlace: 'Copiar enlace',
    duelo: 'Duelo de barrios',
  },
  portada: {
    description: 'El Carnaval de Cajamarca: sus cinco días, los carnavales de años anteriores, coplas tradicionales, el habla cajamarquina y su historia.',
    entrada: 'Cinco días de agua, pintura y coplas. Un rey que entra el sábado y se quema el miércoles. Y una sola regla: aquí nadie se salva.',
    verPrograma: 'Ver el programa 2027',
    buscaBarrio: 'Busca tu barrio',
    echarPintura: 'Echar pintura',
    diasTitulo: 'De sábado a miércoles',
    diasTexto: 'El carnaval se mueve con la Pascua y termina siempre en Miércoles de Ceniza. Estas son las fechas del próximo; el pregón y los bandos empiezan semanas antes.',
    horarios2027: 'Horarios y lugares 2027',
    verPersonajes: 'Ver personajes, música y comida',
    unaCoplaSr: 'Una copla',
    coplaGlosa: '',
    coplaTexto: 'Copla popular que se canta en toda la ciudad. Cuatro versos de ocho sílabas, riman los pares: así se arma toda copla cajamarquina.',
    masCoplas: 'Más coplas',
    paredTitulo: 'Diez carnavales y el que viene',
    paredTexto: 'Reinas, cifras y lo que pasó cada año desde 2017, con los dos febreros en que la pandemia dejó la calle vacía. El de 2027 ya está pegado.',
    palabrasTitulo: 'Así se habla aquí',
    palabras: [
      { palabra: '¡Alalau!', dice: '¡qué frío!', color: 'var(--amarillo)' },
      { palabra: 'Shulca', dice: 'el hijo menor', color: 'var(--blanco)' },
      { palabra: '¡Ñañau!', dice: '¡qué rico!', color: 'var(--fucsia)' },
      { palabra: 'Aquisito', dice: 'aquí cerquita', color: 'var(--blanco)' },
      { palabra: 'Misho', dice: 'gato', color: 'var(--amarillo)' },
    ],
    verGlosario: 'Ver el glosario',
    juegoTitulo: 'Ropa vieja y baldes llenos',
    juegoTexto: 'Fotos de los juegos de fines de enero de 2017: cajas de globos que se descargan en la puerta, baldes en fila en la vereda, la plaza mojada y trajes bordados que tardan meses en hacerse.',
  },
  programa2027: {
    title: (anio: number) => `Carnaval ${anio}`,
    description: (anio: number) => `Carnaval de Cajamarca ${anio}: del sábado 6 al miércoles 10 de febrero. Programa día por día, horarios, lugares, actividades previas y consejos para ir.`,
    seViene: 'Se viene el',
    fechasRango: (ini: string, fin: string, mes: string) => `Del sábado ${ini} al miércoles ${fin} de ${mes}`,
    entrada: 'Cinco días de agua, pintura y coplas, más las semanas de pregón, bando y elección de reinas que vienen antes.',
    estadoOficial: 'Horarios y lugares del programa oficial.',
    estadoPendiente: 'Las horas salen en el programa oficial, que la Municipalidad presenta a inicios de enero.',
    googleCalendar: 'Agregar a Google Calendar',
    descargarCalendario: 'Descargar calendario',
    calLocation: 'Cajamarca, Perú',
    calDetails: (url: string) => `Programa día por día: ${url}`,
    selloAnillo: 'Carnaval de Cajamarca ✶ Carnaval de Cajamarca ✶ ',
    diaUno: 'día',
    diaVarios: 'días',
    diaPorDia: 'Día por día',
    porDondePasa: 'Por dónde pasa',
    antesDelSabado: 'Antes del sábado',
    siVas: 'Si vas',
    guiaVisitantes: 'Guía para visitantes',
    verPersonajesCostumbres: 'Ver personajes y costumbres',
    verAnteriores: 'Ver carnavales anteriores',
    fuentesPrograma: 'Fuentes del programa y los recorridos',
  },
  guia: {
    title: 'Guía para visitantes',
    description: 'Cómo llegar a Cajamarca, dónde quedarse, la altura y el clima de febrero, qué llevar al carnaval, reglas y teléfonos de emergencia, con la fuente de cada dato.',
    cabezaTitulo: 'Guía',
    intro: 'Para quien viene de fuera: cómo llegar, dónde quedarse, qué esperar del clima y la altura, qué llevar y a quién llamar. Cada dato dice de dónde sale.',
    revision: (fecha: string) => `Revisada el ${fecha}. Horarios y precios cambian cada año: confírmalos antes de viajar.`,
    indiceAria: 'Secciones de la guía',
    verificalo: 'Verifícalo:',
    verificaloTexto: 'esta información no sale de una fuente oficial leída completa, o cambia seguido.',
    fuente: 'Fuente:',
    cierreTitulo: '¿Falta algo?',
    cierreTexto: 'Los horarios, el programa oficial y los recorridos de cada día están en la página del carnaval. Todas las fuentes de esta guía, con las del resto del sitio, están en «Fuentes».',
    programa2027: 'Programa 2027',
    fuentesYCreditos: 'Fuentes y créditos',
  },
  laFiesta: {
    title: 'La fiesta',
    description: 'Los cinco días del Carnaval de Cajamarca, sus personajes (Ño Carnavalón, clones, viudas, gitana), costumbres, música y comida.',
    intro: 'Empieza semanas antes, con el pregón y el bando por las calles, y estalla en cinco días: de la entrada del Ño Carnavalón el sábado a su entierro el Miércoles de Ceniza. Después, cada barrio tumba su yunza.',
    diaUnoParaEmpezar: 'día para que empiece',
    diasParaEmpezar: 'días para que empiece',
    programaDe: (anio: number) => `El programa de ${anio}`,
    notaFechas: 'El carnaval termina siempre en Miércoles de Ceniza, así que las fechas cambian cada año. Horas, lugares y lo que pasa antes del sábado están en la página del 2027.',
    verPrograma2027: 'Ver el programa 2027',
    quienEsQuien: 'Quién es quién',
    costumbres: 'Costumbres',
    musicaTitulo: 'La música',
    musicaTexto: 'Ritmo alegre y letra satírica. La guitarra manda en las coplas; en la calle suena todo lo que una patrulla pueda cargar. Desde los distritos llegan la caja y el clarín, la larguísima trompeta de caña.',
    danzasTitulo: 'Canciones y danzas de siempre',
    instrumentosAria: 'Instrumentos',
    instrumentoFormato: (ins: string) => `¡${ins}!`,
    hoyHay: 'Hoy hay',
    fuentesTradiciones: 'Fuentes sobre las tradiciones',
  },
  historia: {
    title: 'Historia',
    description: 'Historia del Carnaval de Cajamarca: de la copla española al carnaval moderno de 1930, la copla como patrimonio y los años de pandemia.',
    intro: 'Cinco siglos de mezcla: el romance español que llegó con la conquista, la sátira que el pueblo le agregó, los barrios que la convirtieron en competencia y un carnaval moderno que empezó en 1930 con carros alegóricos y reinas.',
    selloAnillo: 'Patrimonio Cultural de la Nación ✶ ',
    selloTexto: 'copla y contrapunto',
    lineaSr: 'Línea de tiempo',
    patioTitulo: 'La ciudad se viste',
    patioTexto: 'Antes de la fiesta, los vecinos arreglan sus calles con colores y hasta compiten por la mejor. El patio de la antigua municipalidad se cubre de telas en los colores del carnaval y de máscaras gigantes pintadas a mano.',
    fuentesHistoria: 'Fuentes de esta historia',
  },
  ediciones: {
    title: 'Carnavales de años anteriores',
    description: 'Las ediciones del Carnaval de Cajamarca desde 2017: fechas, reinas, cifras y lo que pasó cada año, con sus fuentes.',
    cabezaTitulo: 'Ediciones',
    intro: (realizadas: number) => `${realizadas} carnavales y dos febreros en silencio, de 2017 a hoy. Cada afiche lleva a su año: la reina, las cifras y lo que pasó. El de 2027 ya está pegado y trae el programa día por día.`,
    muroAria: 'Afiches por año',
    nota: '¿Tienes datos de un año que falta, como los ganadores de comparsas? Los resultados oficiales los publica la Municipalidad Provincial de Cajamarca cada febrero.',
    fuentesEdiciones: 'Fuentes por edición',
  },
  edicion: {
    title: (anio: number) => `Carnaval ${anio}`,
    description: (anio: number, resumen: string) => `Carnaval de Cajamarca ${anio}: ${resumen}`,
    del: 'Del',
    al: 'al',
    cuerpoAria: (anio: number) => `Lo que pasó en ${anio}`,
    cifrasAria: 'Cifras',
    tituloSuspendido: 'Lo que hubo en vez de fiesta',
    tituloRealizado: 'Lo que pasó',
    reina: (anio: number) => `Reina ${anio}`,
    fuentesDe: (anio: number) => `Fuentes de la edición ${anio}`,
    otrasAria: 'Otras ediciones',
    anterior: 'Año anterior',
    todas: 'Todas las ediciones',
    siguiente: 'Año siguiente',
  },
  barrios: {
    title: 'Barrios',
    description: 'Los barrios del Carnaval de Cajamarca: sus 24 sectores con su aniversario, sus lemas, sus apodos, reinas y rivalidades.',
    intro: 'El carnaval se juega por barrio. En 2025 salieron 37, cada uno con sus patrullas, sus comparsas, su reina y un lema que se canta a manera de copla.',
    buscaTitulo: 'Busca tu barrio',
    buscarLabel: 'Nombre del barrio',
    buscarPlaceholder: 'Por ejemplo: San Pedro…',
    sinResultados: 'No encontramos ese barrio. Cuéntanos cuál es y lo agregamos.',
    avisarWhatsapp: 'Avisar por WhatsApp',
    waBarrioFaltante: 'Mi barrio no aparece en la web del carnaval: ',
    pueblosTitulo: 'Pueblos y caseríos',
    pueblosPregunta: '¿Eres de un pueblo o caserío que sale en el carnaval?',
    pueblosWa: 'Soy de un pueblo que sale en el carnaval y quiero que aparezca en la web: ',
    contarWhatsapp: 'Contarlo por WhatsApp',
    fuentesBarrios: 'Fuentes de los barrios',
    estandarteCumple: (fecha: string) => `Cumple el ${fecha}`,
    estandarteInvitacion: '¿Cómo le dicen? Cuéntanos',
    aniversarioAria: (nombre: string) => `Aniversario de ${nombre}`,
    aniversarioFecha: (fecha: string) => `Su aniversario es el ${fecha}`,
    fichaDescBase: (nombre: string) => `${nombre}, barrio del Carnaval de Cajamarca`,
    fichaDescSector: (sector: number) => `sector ${sector}`,
    fichaDescAniversario: (fecha: string) => `aniversario el ${fecha}`,
    fichaAniversario: (fecha: string) => `Aniversario: ${fecha}`,
    fichaSector: (sector: number) => `Sector ${sector}`,
    fichaBarrioCarnaval: 'Barrio del carnaval',
    loQueSabemos: 'Lo que sabemos',
    consejosTitulo: 'Consejos del barrio',
    navBarriosAria: 'Navegación entre barrios',
    mandarWhatsapp: 'Mandar por WhatsApp',
    todosBarrios: 'Todos los barrios',
    otrosBarriosAria: 'Otros barrios',
    datos: {
      sector: 'Sector',
      sectorDe24: (sector: number) => `N.° ${sector} de 24`,
      sinSector: 'No figura entre los 24 sectores',
      aniversario: 'Aniversario',
      apodo: 'Cómo le dicen',
      lema: 'Su lema',
      rival: 'Su rival de siempre',
      patrullas: 'Patrullas y comparsas',
      porConfirmar: 'Por confirmar',
      cuentanos: 'Cuéntanos',
      waAniversario: (nombre: string) => `Soy de ${nombre} y quiero contar cuándo es el aniversario del barrio: `,
      waApodo: (nombre: string) => `Soy de ${nombre} y quiero contar cómo le dicen a mi barrio: `,
      waLema: (nombre: string) => `Soy de ${nombre} y quiero compartir el lema o la copla de mi barrio: `,
      waRival: (nombre: string) => `Soy de ${nombre} y quiero contar con quién tiene rivalidad mi barrio: `,
      waPatrullas: (nombre: string) => `Soy de ${nombre} y quiero contar qué patrullas y comparsas salen de mi barrio: `,
    },
    consejos: {
      intro: (nombre: string) => `Los consejos los confirman vecinos de ${nombre}. Si tú sabes algo, cuéntanos.`,
      estadosAria: 'Cómo marcamos cada dato',
      verificado: 'Verificado',
      confirmadoBarrio: 'Confirmado por el barrio',
      pendiente: 'Por confirmar',
      sinDato: (nombre: string) => `Aún no tenemos este dato de ${nombre}.`,
      cuentanos: 'Cuéntanos',
      waConsejo: (tema: string, nombre: string) => `Tengo un consejo sobre ${tema} en ${nombre}: `,
      categorias: [
        { icono: 'bus', titulo: 'Cómo llegar', tema: 'cómo llegar', color: 'turquesa' },
        { icono: 'grupo', titulo: 'Dónde juntarse', tema: 'dónde juntarse', color: 'fucsia' },
        { icono: 'tenedor', titulo: 'Qué comer', tema: 'qué comer', color: 'naranja' },
        { icono: 'paraguas', titulo: 'Qué llevar', tema: 'qué llevar', color: 'azul' },
        { icono: 'escudo', titulo: 'Seguridad', tema: 'seguridad', color: 'verde' },
        { icono: 'cama', titulo: 'Dónde dormir', tema: 'dónde dormir', color: 'amarillo' },
      ],
    },
  },
  coplas: {
    title: 'Coplas',
    description: 'Coplas del carnaval de Cajamarca: tradicionales con su fuente, cómo se arma una copla, el contrapunto y coplas nuevas al estilo cajamarquino.',
    intro: 'No hay carnaval sin coplas ni coplas sin carnaval. Cuatro versos para enamorar, burlarse del alcalde, desafiar al barrio de enfrente o llorar al Ño Carnavalón. Desde 2017, la copla y el contrapunto son Patrimonio Cultural de la Nación.',
    otraCopla: 'Otra copla',
    comoSeArma: 'Cómo se arma',
    silabasAria: (n: number) => `${n} sílabas`,
    armeP1Antes: 'Es una cuarteta: cuatro versos, casi siempre de ocho sílabas. Riman el segundo y el cuarto, por la vocal o entera. Si un verso acaba en palabra aguda, como «carna',
    armeP1Enfasis: 'val',
    armeP1Despues: '», se cuenta una sílaba más.',
    armeP2: 'El truco está en la mitad. Los dos primeros versos suelen pintar una escena que no tiene nada que ver; los dos últimos traen el golpe. Por eso una misma entrada sirve para mil coplas.',
    armeP3: 'Se cantan con guitarra en la calle y en las comparsas, de día o de noche, con lluvia o con sol. Se burlan de las suegras, de las autoridades, de los amantes y del barrio rival. La sátira es el punto.',
    armeP4Antes: 'Al cantarla, cada verso se dice dos veces: «Lima, ciudad de los reyes, Lima, ciudad de los reyes». En los cancioneros eso se marca con ',
    armeP4Despues: ' al final del verso. Si el bis va al final de un par, se repiten los dos versos juntos.',
    contrapuntoTitulo: 'El contrapunto',
    contrapuntoIntro: 'Dos patrullas frente a frente. Una lanza la copla, la otra contesta en la misma melodía, y así hasta que alguien se queda sin respuesta. Este duelo es de ejemplo, escrito para este sitio:',
    barrioAca: 'Barrio de acá',
    barrioAlla: 'Barrio de allá',
    cancioneroTitulo: 'Cancionero',
    cancioneroIntro1: 'Las ',
    cancioneroTrad: 'tradicionales',
    cancioneroIntro2: ' se cantan en Cajamarca de generación en generación. Las ',
    cancioneroNuevas: 'nuevas',
    cancioneroIntro3: ' se escribieron para este sitio, siguiendo la forma de siempre: las coplas del carnaval son anónimas y se heredan cantando.',
    filtrarAria: 'Filtrar coplas',
    todas: 'Todas',
    tradicionales: 'Tradicionales',
    origenTradicional: 'Tradicional',
    origenNueva: 'Nueva',
    temas: {
      'invitación': 'Invitación',
      'picardía': 'Picardía',
      contrapunto: 'Contrapunto',
      amor: 'Amor',
      cajamarca: 'Cajamarca',
      despedida: 'Despedida',
    },
    sinCoplas: 'No hay coplas con ese filtro.',
    fuentesCancionero: 'Fuentes del cancionero',
  },
  juegoCopla: {
    titulo: 'Completa la copla',
    intro: 'Le falta la última palabra. Elige la que rima con el segundo verso, como en un contrapunto donde no hay tiempo para pensar.',
    notaEspanol: '',
    de: 'de',
    opcionesAria: 'Elige la palabra que falta',
    siguiente: 'Siguiente copla',
    jugarOtraVez: 'Jugar otra vez',
    huecoAria: 'palabra que falta',
    felicitaciones: ['¡Eso, cholasho!', '¡Ñañau, qué rima!', '¡Ya pues, maestro!', '¡Esa patrulla canta!'],
    casi: (palabra: string) => `Casi. Era «${palabra}», que rima con el segundo verso.`,
    terminaste: (aciertos: number, total: number) => ` Terminaste: ${aciertos} de ${total}.`,
  },
  armaCopla: {
    titulo: 'Arma tu copla',
    intro: 'Cuatro versos de unas ocho sílabas; el segundo rima con el cuarto. Cuando esté lista, bájala como imagen o mándala por WhatsApp. Queda guardada en tu teléfono, aunque cierres la página.',
    notaEspanol: '',
    versosLegend: 'Tus cuatro versos',
    nombres: ['Primer verso', 'Segundo verso', 'Tercer verso', 'Cuarto verso'],
    silabasSr: ' sílabas, más o menos',
    sugerenciasAyuda: 'Toca una para ponerla al final del cuarto verso.',
    prestameEntrada: 'Préstame una entrada',
    borrar: 'Borrar',
    firmaLabel: 'Firma (si quieres)',
    firmaPlaceholder: 'Por ejemplo: Patrulla de tu barrio…',
    colorLegend: 'Color del afiche',
    colores: { fucsia: 'fucsia', amarillo: 'amarillo', turquesa: 'turquesa', verde: 'verde', azul: 'azul' },
    lienzoAria: 'Vista previa del afiche con tu copla',
    lienzoEjemploAria: 'Vista previa del afiche, con una copla de ejemplo',
    lienzoPreviewAria: (lineas: string) => `Vista previa del afiche: ${lineas}`,
    compartir: 'Compartir',
    descargar: 'Descargar imagen',
    rimaPerfecta: (p2: string, p4: string) => `Riman perfecto: «${p2}» con «${p4}».`,
    rimaAsonante: (p2: string, p4: string) => `Riman por las vocales: «${p2}» con «${p4}». Así riman muchas coplas.`,
    sinRima: (p2: string, p4: string) => `Todavía no riman «${p2}» y «${p4}»: el final del cuarto verso tiene que sonar como el del segundo.`,
    rimanCon: (p2: string) => `Riman con «${p2}»:`,
    faltanVersos: 'Faltan versos: una copla tiene cuatro.',
    descargada: 'Listo: la imagen está en tus descargas.',
    shareTitle: 'Mi copla del carnaval',
    shareText: (url: string) => `Arma la tuya en ${url}`,
    enviada: '¡Copla enviada!',
    errorCompartir: 'No se pudo compartir; prueba con «Descargar imagen».',
  },
  habla: {
    title: 'Habla cajamarquina',
    description: 'Cómo se habla en Cajamarca: el dejo cantadito, los diminutivos, la sh del quechua y el culle, y un glosario de palabras y expresiones del carnaval.',
    cabezaTitulo: 'Habla',
    intro: 'El castellano de Cajamarca canta. Estira la sílaba fuerte, todo lo dice en diminutivo y guarda palabras del quechua y hasta del culle, la lengua que se hablaba aquí antes que el castellano.',
    elDejo: 'El dejo',
    diloTitulo: 'Dilo a lo cajamarquino',
    colNeutro: 'En cualquier parte',
    colCajamarca: 'En Cajamarca',
    glosarioTitulo: 'Glosario',
    buscarLabel: 'Buscar una palabra',
    filtrarAria: 'Filtrar el glosario',
    categorias: [
      { valor: 'todas', texto: 'Todas' },
      { valor: 'habla', texto: 'Del habla' },
      { valor: 'exclamación', texto: 'Exclamaciones' },
      { valor: 'fiesta', texto: 'De la fiesta' },
    ],
    sinResultados: 'Ni aquisito encontramos esa palabra. Prueba con otra.',
    palabraUno: 'palabra',
    palabraVarios: 'palabras',
  },
  fuentes: {
    title: 'Fuentes y créditos',
    description: 'Fuentes del programa, mapas, barrios, ediciones y coplas del Carnaval de Cajamarca. Créditos de las fotografías.',
    intro: 'Consulta los documentos, crónicas y fotografías que usamos en este sitio.',
    indiceAria: 'Apartados de fuentes',
    anuncioOficial: 'Anuncio oficial',
    programaNota2026: 'Calendario oficial de la edición anterior.',
    osmMedio: 'Colaboradores de OpenStreetMap',
    osmNota: 'Calles y datos cartográficos de los recorridos.',
    openFreeMapNota: 'Mapa base del recorrido en 3D.',
    openMapTilesNota: 'Cartografía vectorial del mapa en 3D.',
    mapterhornNota: 'Relieve del mapa en 3D.',
    secciones: {
      programa: { titulo: 'Programa y recorridos', descripcion: 'Calendarios oficiales y datos del mapa.' },
      barrios: { titulo: 'Barrios y centros poblados', descripcion: 'Ordenanzas y notas sobre los barrios y sus tradiciones.' },
      historia: { titulo: 'Historia y tradiciones', descripcion: 'Documentos y reportajes sobre el origen, los personajes y las costumbres.' },
      ediciones: { titulo: 'Ediciones del carnaval', descripcion: 'Referencias sobre los hechos, cifras y protagonistas de cada año.' },
      guia: { titulo: 'Guía para visitantes', descripcion: 'Transporte, altura, clima, salud y emergencias. Las marcadas «Verifícalo» en la guía son fuentes débiles o no leídas completas.' },
      coplas: { titulo: 'Coplas tradicionales', descripcion: 'Publicaciones donde se recogieron los versos del cancionero.' },
      creditos: { titulo: 'Fotos y créditos', descripcion: 'Fotografías de Pitxiquin en Wikimedia Commons.' },
    },
    licenciaAntes: 'Algunas fotos están recortadas. ',
    licenciaTexto: 'Licencia',
  },
  sinConexion: {
    title: 'Sin conexión',
    description: 'No hay señal y esta página no está guardada en el teléfono.',
    titular: 'Sin señal',
    intro: 'Esta página todavía no está guardada en tu teléfono. Cuando vuelva la señal se abre sola; mientras tanto, estas sí funcionan sin internet:',
    guardadas: {
      '2027': 'Programa 2027 y mapa de recorridos',
      guia: 'Guía para visitantes',
      inicio: 'Inicio',
      'la-fiesta': 'La fiesta: personajes, música y comida',
      coplas: 'Coplas',
      habla: 'Habla cajamarquina',
      barrios: 'Barrios',
      historia: 'Historia',
      ediciones: 'Carnavales anteriores',
    },
  },
  error404: {
    title: 'Página no encontrada',
    description: 'Esta página no existe. Vuelve a la portada del Carnaval de Cajamarca.',
    srTitulo: 'Error 404: página no encontrada',
    frase: '¡Te mojaron!',
    texto: 'Esta página no existe, ni aquisito. Puede que el enlace esté mal escrito o que la página se haya mudado de barrio.',
    volverPortada: 'Volver a la portada',
    verPrograma: 'Ver el programa 2027',
  },
} as const;

export type Diccionario = {
  sitio: {
    nombre: string;
    marcaGrande: string;
    marcaChica: string;
    marcaAria: string;
    ogAlt: (titulo: string) => string;
    mascara: string;
  };
  nav: {
    saltar: string;
    menu: string;
    seccionesAria: string;
    idiomaAria: string;
    items: Record<'2027' | 'guia' | 'la-fiesta' | 'ediciones' | 'barrios' | 'coplas' | 'habla' | 'historia', string>;
  };
  pie: {
    grito: string;
    nota: string;
    navAria: string;
    carnaval2027: string;
    fotos: string;
    fuentesYCreditos: string;
    borradoresTitulo: string;
    quitar: string;
    quitarBorradorAria: string;
    borradorGuardado: string;
    borradorSinEspacio: string;
  };
  sinRed: {
    listo: string;
    guardando: string;
    offlineListo: string;
    offlinePendiente: string;
    reintentar: string;
  };
  instalar: {
    flotante: string;
    cerrarAria: string;
    titulo: string;
    texto: string;
    boton: string;
    instalada: string;
    cancelada: string;
    error: string;
  };
  hoy: {
    regionAria: string;
    hoy: string;
    hoyComa: string;
    selloAnillo: string;
    ya: string;
    paso: string;
    yaLlego: string;
    asiFue: string;
    verRecorrido: string;
    programaCompleto: string;
    hora: string;
    porConfirmar: string;
    donde: string;
    manana: string;
    despues: string;
  };
  agendaPortada: {
    granBando: string;
    fechaPorConfirmar: string;
    fechaPrevista: string;
    yaPaso: string;
    hoy: string;
    dia: string;
    dias: string;
    verRecorrido: string;
    verPrograma: string;
  };
  carteles: {
    al: string;
    de: string;
    noHuboFiesta: string;
    suspendido: string;
    edicionSuspendidaSr: string;
    seViene: string;
    verPrograma: string;
  };
  aniversarios: {
    proximos: string;
    hoyUno: (nombres: string) => string;
    hoyVarios: (nombres: string) => string;
    hoy: string;
    dia: string;
    dias: string;
    hoyBarrio: (nombre: string) => string;
    faltanBarrio: (faltan: number, nombre: string) => string;
  };
  mapa: {
    verRecorrido: string;
    todos: string;
    ver3d: string;
    volverPlano: string;
    marcoAria: string;
    svgTitulo: string;
    svgDesc: string;
    sale: string;
    entra: string;
    vieneDe: (lugar: string) => string;
    creditoOsm: string;
    nota: string;
    estadoDia: (nombre: string) => string;
    estadoTodos: string;
    necesitaInternet: string;
    cargando3d: string;
    listo3d: string;
    error3d: string;
    errorTimeout3d: string;
    maplibre: Record<string, string>;
  };
  contadorProximamente: {
    titulo: string;
    proximamente: string;
    aviso: (nombre: string) => string;
    carnavalerosVan: (nombre: string) => string;
    enTodaLaWeb: string;
    carnavaleros: string;
    voyAlCarnaval: string;
    carnavalero: string;
    tuNombre: string;
    salgoConBarrio: string;
    enBarrio: (nombre: string) => string;
    enTodaWebCorto: string;
    numero: string;
    fechas: string;
    fundador: string;
    compartirCredencial: string;
    descargarImagen: string;
    invitarBarrio: string;
    mandarGrupo: string;
    copiarEnlace: string;
    duelo: string;
  };
  portada: {
    description: string;
    entrada: string;
    verPrograma: string;
    buscaBarrio: string;
    echarPintura: string;
    diasTitulo: string;
    diasTexto: string;
    horarios2027: string;
    verPersonajes: string;
    unaCoplaSr: string;
    coplaGlosa: string;
    coplaTexto: string;
    masCoplas: string;
    paredTitulo: string;
    paredTexto: string;
    palabrasTitulo: string;
    palabras: ReadonlyArray<{ palabra: string; dice: string; color: string }>;
    verGlosario: string;
    juegoTitulo: string;
    juegoTexto: string;
  };
  programa2027: {
    title: (anio: number) => string;
    description: (anio: number) => string;
    seViene: string;
    fechasRango: (ini: string, fin: string, mes: string) => string;
    entrada: string;
    estadoOficial: string;
    estadoPendiente: string;
    googleCalendar: string;
    descargarCalendario: string;
    calLocation: string;
    calDetails: (url: string) => string;
    selloAnillo: string;
    diaUno: string;
    diaVarios: string;
    diaPorDia: string;
    porDondePasa: string;
    antesDelSabado: string;
    siVas: string;
    guiaVisitantes: string;
    verPersonajesCostumbres: string;
    verAnteriores: string;
    fuentesPrograma: string;
  };
  guia: {
    title: string;
    description: string;
    cabezaTitulo: string;
    intro: string;
    revision: (fecha: string) => string;
    indiceAria: string;
    verificalo: string;
    verificaloTexto: string;
    fuente: string;
    cierreTitulo: string;
    cierreTexto: string;
    programa2027: string;
    fuentesYCreditos: string;
  };
  laFiesta: {
    title: string;
    description: string;
    intro: string;
    diaUnoParaEmpezar: string;
    diasParaEmpezar: string;
    programaDe: (anio: number) => string;
    notaFechas: string;
    verPrograma2027: string;
    quienEsQuien: string;
    costumbres: string;
    musicaTitulo: string;
    musicaTexto: string;
    danzasTitulo: string;
    instrumentosAria: string;
    instrumentoFormato: (ins: string) => string;
    hoyHay: string;
    fuentesTradiciones: string;
  };
  historia: {
    title: string;
    description: string;
    intro: string;
    selloAnillo: string;
    selloTexto: string;
    lineaSr: string;
    patioTitulo: string;
    patioTexto: string;
    fuentesHistoria: string;
  };
  ediciones: {
    title: string;
    description: string;
    cabezaTitulo: string;
    intro: (realizadas: number) => string;
    muroAria: string;
    nota: string;
    fuentesEdiciones: string;
  };
  edicion: {
    title: (anio: number) => string;
    description: (anio: number, resumen: string) => string;
    del: string;
    al: string;
    cuerpoAria: (anio: number) => string;
    cifrasAria: string;
    tituloSuspendido: string;
    tituloRealizado: string;
    reina: (anio: number) => string;
    fuentesDe: (anio: number) => string;
    otrasAria: string;
    anterior: string;
    todas: string;
    siguiente: string;
  };
  barrios: {
    title: string;
    description: string;
    intro: string;
    buscaTitulo: string;
    buscarLabel: string;
    buscarPlaceholder: string;
    sinResultados: string;
    avisarWhatsapp: string;
    waBarrioFaltante: string;
    pueblosTitulo: string;
    pueblosPregunta: string;
    pueblosWa: string;
    contarWhatsapp: string;
    fuentesBarrios: string;
    estandarteCumple: (fecha: string) => string;
    estandarteInvitacion: string;
    aniversarioAria: (nombre: string) => string;
    aniversarioFecha: (fecha: string) => string;
    fichaDescBase: (nombre: string) => string;
    fichaDescSector: (sector: number) => string;
    fichaDescAniversario: (fecha: string) => string;
    fichaAniversario: (fecha: string) => string;
    fichaSector: (sector: number) => string;
    fichaBarrioCarnaval: string;
    loQueSabemos: string;
    consejosTitulo: string;
    navBarriosAria: string;
    mandarWhatsapp: string;
    todosBarrios: string;
    otrosBarriosAria: string;
    datos: {
      sector: string;
      sectorDe24: (sector: number) => string;
      sinSector: string;
      aniversario: string;
      apodo: string;
      lema: string;
      rival: string;
      patrullas: string;
      porConfirmar: string;
      cuentanos: string;
      waAniversario: (nombre: string) => string;
      waApodo: (nombre: string) => string;
      waLema: (nombre: string) => string;
      waRival: (nombre: string) => string;
      waPatrullas: (nombre: string) => string;
    };
    consejos: {
      intro: (nombre: string) => string;
      estadosAria: string;
      verificado: string;
      confirmadoBarrio: string;
      pendiente: string;
      sinDato: (nombre: string) => string;
      cuentanos: string;
      waConsejo: (tema: string, nombre: string) => string;
      categorias: ReadonlyArray<{
        icono: 'bus' | 'grupo' | 'tenedor' | 'paraguas' | 'escudo' | 'cama';
        titulo: string;
        tema: string;
        color: 'turquesa' | 'fucsia' | 'naranja' | 'azul' | 'verde' | 'amarillo';
      }>;
    };
  };
  coplas: {
    title: string;
    description: string;
    intro: string;
    otraCopla: string;
    comoSeArma: string;
    silabasAria: (n: number) => string;
    armeP1Antes: string;
    armeP1Enfasis: string;
    armeP1Despues: string;
    armeP2: string;
    armeP3: string;
    armeP4Antes: string;
    armeP4Despues: string;
    contrapuntoTitulo: string;
    contrapuntoIntro: string;
    barrioAca: string;
    barrioAlla: string;
    cancioneroTitulo: string;
    cancioneroIntro1: string;
    cancioneroTrad: string;
    cancioneroIntro2: string;
    cancioneroNuevas: string;
    cancioneroIntro3: string;
    filtrarAria: string;
    todas: string;
    tradicionales: string;
    origenTradicional: string;
    origenNueva: string;
    temas: Record<'invitación' | 'picardía' | 'contrapunto' | 'amor' | 'cajamarca' | 'despedida', string>;
    sinCoplas: string;
    fuentesCancionero: string;
  };
  juegoCopla: {
    titulo: string;
    intro: string;
    notaEspanol: string;
    de: string;
    opcionesAria: string;
    siguiente: string;
    jugarOtraVez: string;
    huecoAria: string;
    felicitaciones: readonly string[];
    casi: (palabra: string) => string;
    terminaste: (aciertos: number, total: number) => string;
  };
  armaCopla: {
    titulo: string;
    intro: string;
    notaEspanol: string;
    versosLegend: string;
    nombres: readonly string[];
    silabasSr: string;
    sugerenciasAyuda: string;
    prestameEntrada: string;
    borrar: string;
    firmaLabel: string;
    firmaPlaceholder: string;
    colorLegend: string;
    colores: Record<'fucsia' | 'amarillo' | 'turquesa' | 'verde' | 'azul', string>;
    lienzoAria: string;
    lienzoEjemploAria: string;
    lienzoPreviewAria: (lineas: string) => string;
    compartir: string;
    descargar: string;
    rimaPerfecta: (p2: string, p4: string) => string;
    rimaAsonante: (p2: string, p4: string) => string;
    sinRima: (p2: string, p4: string) => string;
    rimanCon: (p2: string) => string;
    faltanVersos: string;
    descargada: string;
    shareTitle: string;
    shareText: (url: string) => string;
    enviada: string;
    errorCompartir: string;
  };
  habla: {
    title: string;
    description: string;
    cabezaTitulo: string;
    intro: string;
    elDejo: string;
    diloTitulo: string;
    colNeutro: string;
    colCajamarca: string;
    glosarioTitulo: string;
    buscarLabel: string;
    filtrarAria: string;
    categorias: ReadonlyArray<{ valor: string; texto: string }>;
    sinResultados: string;
    palabraUno: string;
    palabraVarios: string;
  };
  fuentes: {
    title: string;
    description: string;
    intro: string;
    indiceAria: string;
    anuncioOficial: string;
    programaNota2026: string;
    osmMedio: string;
    osmNota: string;
    openFreeMapNota: string;
    openMapTilesNota: string;
    mapterhornNota: string;
    secciones: Record<'programa' | 'barrios' | 'historia' | 'ediciones' | 'guia' | 'coplas' | 'creditos', { titulo: string; descripcion: string }>;
    licenciaAntes: string;
    licenciaTexto: string;
  };
  sinConexion: {
    title: string;
    description: string;
    titular: string;
    intro: string;
    guardadas: Record<'2027' | 'guia' | 'inicio' | 'la-fiesta' | 'coplas' | 'habla' | 'barrios' | 'historia' | 'ediciones', string>;
  };
  error404: {
    title: string;
    description: string;
    srTitulo: string;
    frase: string;
    texto: string;
    volverPortada: string;
    verPrograma: string;
  };
};
