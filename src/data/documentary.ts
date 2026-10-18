export type Chapter = {
  id: string;
  kicker: string;
  title: string;
  year: string;
  still: string;
  video?: string;
  narration: string;
};

export const CHANNEL_URL = "https://www.youtube.com/user/inodeEntertainment";
export const CHANNEL_NAME = "inodeAI";

export const chapters: Chapter[] = [
  {
    id: "01",
    kicker: "Apertura",
    title: "La pantalla negra",
    year: "2025",
    still: "/film/01.jpg",
    video: "/film/v01.mp4",
    narration:
      "El dieciocho de enero de dos mil veinticinco, en Estados Unidos, la aplicación más adictiva del planeta se apaga. No es un error. No es un servidor caído. Es la ley. Durante unas horas, más de ciento cincuenta millones de personas abren el teléfono y encuentran una pantalla negra. Un mensaje frío: TikTok no está disponible. Algunos graban el funeral con otra cámara. Otros buscan el baile que iban a subir esa noche. Y al día siguiente, casi con la misma prisa, la luz vuelve. El presidente electo promete tiempo. El apagón dura menos que un fin de semana. Pero deja una pregunta que estos quince minutos no van a soltar. ¿Cómo una app nacida en China, de videos de quince segundos, se volvió tan poderosa que un país entero tuvo que decidir si la dejaba vivir? Quédate. Vas a ver la servilleta, la compra, el algoritmo, la pandemia, la prohibición y la venta. Si al final esto te sirvió, sígueme. Esto es InodeAi. Y esta es la historia de TikTok.",
  },
  {
    id: "02",
    kicker: "Origen",
    title: "La servilleta",
    year: "2012",
    still: "/film/02.jpg",
    narration:
      "Marzo de dos mil doce. Pekín. Zhang Yiming tiene veintiocho años y una idea que cabe en una servilleta: la gente ya no quiere buscar. Quiere que alguien le adivine lo que desea ver. Funda ByteDance. El primer gran producto no es un video. Es Toutiao, un agregador de noticias que aprende de cada segundo que pasas, de cada titular que ignoras y de cada vez que regresas. Mientras Facebook todavía te pide amigos, y Twitter te pide a quién seguir, Yiming apuesta lo contrario. El grafo social está sobrevalorado. Lo que importa es la atención, medida al milisegundo. Esa obsesión, seca y precisa, es el verdadero origen de TikTok. No nació en un escenario con focos. Nació en un sistema de recomendación que trataba cada mirada como un dato. Años antes del primer baile, la máquina ya sabía quedarse con tu tiempo.",
  },
  {
    id: "03",
    kicker: "Antes",
    title: "Quince segundos",
    year: "2014",
    still: "/film/03.jpg",
    narration:
      "En dos mil catorce, en Shanghái, Alex Zhu y Luyu Yang lanzan Musical punto ly. La primera versión quiere educar. Fracasa. Entonces sueltan a los adolescentes: quince segundos, una canción, los labios siguiendo el playback. En el verano de dos mil quince la app es número uno en la tienda de Estados Unidos. El truco no es la música. Es el escenario portátil. Un aro de luz, un cuarto, una coreografía copiada hasta volverse idioma. Una generación aprende que no hace falta ser famoso para ser visto. Hace falta un gancho antes de que el pulgar se aburra. Musical punto ly llega a decenas de millones de usuarios en Estados Unidos y Europa, y casi no tiene el cerebro de recomendación de ByteDance. Es una discoteca brillante. Todavía no es una fábrica. Pero ya entrenó a los niños que, cuatro años después, iban a abrir otra app y sentir que el mundo los estaba esperando.",
  },
  {
    id: "04",
    kicker: "China",
    title: "Douyin",
    year: "2016",
    still: "/film/04.jpg",
    video: "/film/v04.mp4",
    narration:
      "Septiembre de dos mil dieciséis. ByteDance lanza Douyin dentro de China. Mismo formato corto. Otra ambición. Douyin no espera a que tengas seguidores. Te pone delante de extraños si el video logra retener la mirada. En meses se convierte en la app de video corto más popular del país. Y aquí nace la doble vida que va a perseguir a esta historia. Dentro de China, Douyin vive bajo censura estricta: política sensible fuera, límites de horario para menores, una versión domesticada del caos. Fuera, la misma compañía prepara un gemelo más salvaje. Un producto. Dos jaulas. El feed chino y el feed global no cuentan la misma realidad, aunque compartan el gesto de deslizar. El mundo todavía no sabe pronunciar el nombre que está por llegar. En China, el experimento ya es masivo.",
  },
  {
    id: "05",
    kicker: "Mundo",
    title: "El nombre",
    year: "2017",
    still: "/film/05.jpg",
    narration:
      "En dos mil diecisiete ByteDance abre TikTok fuera de China. Uno de los primeros grandes desembarcos es Indonesia. El icono parece una nota musical a punto de vibrar. El gesto es mínimo: deslizas hacia arriba y el mundo cambia. No hay muro de amigos. Hay un río. La página Para Ti decide antes de que tú decidas. Cada repetición, cada pausa, cada video que abandonas a la mitad, es un voto secreto. En Occidente la prensa lo archiva como moda de niños. Se equivoca de escala. Es la primera red masiva diseñada, desde el día uno, para el pulgar distraído y no para el perfil cuidadosamente armado. Al principio el video dura quince segundos. Luego sesenta. El contenedor crece. La regla no: si no enganchas en el primer segundo, no existes. El nombre suena a juego. El sistema es industrial.",
  },
  {
    id: "06",
    kicker: "Fusión",
    title: "La compra",
    year: "2018",
    still: "/film/06.jpg",
    narration:
      "Noviembre de dos mil diecisiete. ByteDance compra Musical punto ly por cerca de mil millones de dólares. No compra una idea. Compra una audiencia: alrededor de sesenta millones de personas en Estados Unidos y Europa que ya saben hacer lip sync. Durante meses las dos apps conviven. Luego, el dos de agosto de dos mil dieciocho, ocurre una de las fusiones más silenciosas de internet. Musical punto ly se apaga. Las cuentas migran. Abres el teléfono y el nombre ya es TikTok. Nadie firma frente a las cámaras. El icono cambia, y mil millones de horas futuras cambian de dueño. ByteDance acaba de unir el algoritmo entrenado en Pekín con los adolescentes de Ohio, de Ciudad de México, de Madrid. Esa mezcla es el explosivo. La discoteca ya tiene fábrica. Y la fábrica acaba de heredar el público que más sabe quedarse mirando.",
  },
  {
    id: "07",
    kicker: "Máquina",
    title: "Para ti",
    year: "2018",
    still: "/film/07.jpg",
    video: "/film/v07.mp4",
    narration:
      "Olvida un momento a los creadores. El producto real se llama Para Ti. No te muestra lo que publicaron tus amigos. Te muestra lo que una persona parecida a ti no pudo dejar de ver. El sistema prueba cada video con un grupo pequeño. Si lo terminan, si lo repiten, si lo comparten, lo empuja a un círculo mayor. Si lo saltan, muere en segundos. Por eso un desconocido puede amanecer con un millón de vistas, y una estrella puede publicar al vacío. No es magia ni un favor del destino. Es un torneo de retención. Likes importan menos que el tiempo que te quedas. Completar el video importa más que comentar. Y es cruelmente parejo con el contenido, e injusto con el sueño de construir una audiencia propia. En TikTok no tienes seguidores. Tienes un permiso temporal. Mañana la máquina puede decidir que ya no eres interesante. Esa es la libertad y la trampa, en el mismo desliz.",
  },
  {
    id: "08",
    kicker: "Cultura",
    title: "La plaza cerrada",
    year: "2020",
    still: "/film/08.jpg",
    narration:
      "Después llega dos mil veinte, y el mundo se encierra. El feed se vuelve la plaza, la escuela y el escenario. Bailes en la sala. Recetas con lo que queda en la alacena. Enfermeras al final de un turno. Un hombre en patineta, un vaso de jugo, y una canción de Fleetwood Mac que despierta cuarenta años después porque el algoritmo le encontró un nuevo cuerpo. La coreografía Renegade recorre el planeta, y con ella una pelea incómoda: quién inventa el baile y quién se queda con la fama. Las canciones ya no nacen en la radio. Nacen si cabe un estribillo de ocho segundos. Old Town Road ya había enseñado el truco en dos mil diecinueve. La pandemia lo vuelve industria. En plena pandemia TikTok cruza los dos mil millones de descargas acumuladas y, en septiembre de dos mil veintiuno, anuncia mil millones de usuarios activos cada mes. La app no acompañó la cultura de esos años. La cronometró.",
  },
  {
    id: "09",
    kicker: "Copia",
    title: "Todos deslizan",
    year: "2020",
    still: "/film/09.jpg",
    narration:
      "Agosto de dos mil veinte. Instagram lanza Reels. Unos meses después, YouTube abre Shorts, primero en India, justo donde TikTok acaba de ser prohibido, y luego en el resto del mundo. Snapchat enciende Spotlight. El gesto de deslizar en vertical deja de ser una marca y se vuelve el idioma por defecto del video. Las plataformas que llevaban años pidiendo que siguieras a alguien aceptan, por fin, la lección de la servilleta: el feed lo decide la máquina, no tu lista de amigos. TikTok responde por el otro lado del negocio. No solo quiere tu atención. Quiere la compra. TikTok Shop lleva el mostrador al mismo video: ves, deseas, pagas, sin salir. En dos mil veintitrés esa tienda se abre con fuerza en Estados Unidos. El baile y el anuncio se funden. La cultura y la caja registradora usan el mismo botón.",
  },
  {
    id: "10",
    kicker: "India",
    title: "Antes del desayuno",
    year: "2020",
    still: "/film/10.jpg",
    narration:
      "El imperio tiene un agujero que no se cierra. El veintinueve de junio de dos mil veinte, India, el mayor mercado internacional, prohíbe TikTok junto con decenas de aplicaciones chinas. El motivo oficial: soberanía, defensa y orden público, después de un choque en la frontera del Himalaya. De un día para otro se apagan más de doscientos millones de usuarios. Creadores pierden el ingreso de la noche a la mañana. Las plazas digitales se vacían. Y hasta hoy, octubre de dos mil veintiséis, esa prohibición sigue vigente. En septiembre de dos mil veinticinco el ministro de tecnología lo dijo sin adorno: no hay propuesta alguna de traerla de vuelta. Mientras Washington negociaba prórrogas, Nueva Delhi ya había decidido. Es la lección más fría de esta historia. Una app puede sentirse íntima. Y un Estado puede borrarla antes del desayuno.",
  },
  {
    id: "11",
    kicker: "Washington",
    title: "La ley",
    year: "2020–2025",
    still: "/film/11.jpg",
    video: "/film/v11.mp4",
    narration:
      "Estados Unidos tarda más, y duda en voz alta. En agosto de dos mil veinte Donald Trump firma órdenes para empujar una venta o un adiós. En junio de dos mil veintiuno Joe Biden retira esas órdenes y las cambia por una revisión más amplia de aplicaciones extranjeras. El miedo no se va: datos de ciudadanos, posible influencia, un algoritmo opaco nacido en una empresa china. En marzo de dos mil veintitrés el director ejecutivo, Shou Zi Chew, se sienta ante el Congreso y responde durante horas si el Partido Comunista puede asomarse a esa máquina. En abril de dos mil veinticuatro Biden firma la ley. ByteDance vende la operación estadounidense, o el país la prohíbe. El diecisiete de enero de dos mil veinticinco la Corte Suprema confirma la ley por unanimidad. Horas después llega la pantalla negra del principio de este documental. Al día siguiente, la resurrección. Trump, ya de regreso en la Casa Blanca, aplaza el castigo. Una vez. Y otra. La prohibición se convierte en prórroga. La prórroga, en una mesa de negociación.",
  },
  {
    id: "12",
    kicker: "Trato",
    title: "La venta",
    year: "2026",
    still: "/film/12.jpg",
    narration:
      "El veintidós de enero de dos mil veintiséis el trato se cierra. Nace una empresa conjunta de mayoría estadounidense: TikTok USDS. Oracle, Silver Lake y el fondo MGX se quedan con un quince por ciento cada uno. ByteDance conserva un diecinueve punto nueve por ciento, justo por debajo del umbral que la ley trataba como control. El resto queda en otros inversionistas de Estados Unidos. La promesa pública es concreta. Los datos de usuarios americanos, y el algoritmo que les recomienda videos, viven en la nube de Oracle, en territorio de Estados Unidos. Un consejo de mayoría americana supervisa. Pero el dinero grande, la publicidad y el comercio, permanece más cerca de la casa original. En octubre de dos mil veintiséis la duda no se ha jubilado. Reportes describen equipos que todavía se coordinan con herramientas nacidas en ByteDance. El ocho de octubre, Meta bloquea anuncios ligados a ByteDance en siete países, Estados Unidos incluido. India sigue en silencio. La app está encendida. La pregunta de quién la opera de verdad, también.",
  },
  {
    id: "13",
    kicker: "Cierre",
    title: "Sígueme",
    year: "Ahora",
    still: "/film/13.jpg",
    narration:
      "¿Qué hizo TikTok, en el fondo? Acortó la distancia entre un pensamiento y una audiencia a un puñado de segundos. Le quitó a la radio el monopolio del estribillo. Le enseñó a Hollywood, a los políticos y a las marcas que el primer segundo lo es todo, y que el resto es negociable. Le entregó a más de mil millones de personas un escenario que no pide permiso, ni productora, ni apellido. El precio viaja en el mismo diseño. Un torneo de atención que no duerme. Una empresa nacida en China. Gobiernos que entendieron tarde que un feed también es infraestructura, tan estratégica como un puerto. Si llegaste hasta aquí, ya viste el apagón, la servilleta, la fusión, la pandemia, la copia, la prohibición india y la venta americana. Quince minutos. Ningún relleno. Si quieres la siguiente historia contada con esta calma y esta prisa, sígueme en YouTube. Busca InodeAi. Activa la campana. El canal donde la historia no se va en el primer segundo.",
  },
];

export function spokenToCaption(text: string): string {
  return text
    .replaceAll("Musical punto ly", "Musical.ly")
    .replaceAll("diecinueve punto nueve", "19.9");
}

export function captionLines(narration: string): string[] {
  return spokenToCaption(narration)
    .split(/(?<=[.!?])\s+/)
    .map((line) => line.trim())
    .filter(Boolean);
}
