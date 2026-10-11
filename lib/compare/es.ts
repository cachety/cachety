import type { Comparison } from "./types";

// Comparativas en español (España primero, pensando también en México y
// Latinoamérica). Publicidad comparativa: cada dato sobre otra herramienta sale
// de sus propias páginas públicas (campo `sources`), comprobadas el 2026-10-11.
// Lo que no está publicado se dice como tal («no lo documenta»). Texto plano.
//
// No existe en España una herramienta pública oficial para poner marca de agua
// a copias del DNI (MiDNI, de la Policía Nacional, sirve para identificarse, no
// para marcar copias), así que no hay comparativa con un organismo público.

const CHECKED = "2026-10-11";

// Celdas de Cachety que se repiten de una página a otra (hoja de datos verificada).
const C = {
  where: "En tu propio dispositivo, dentro del navegador. El archivo no se envía a ningún servidor.",
  retention: "Nada que borrar: Cachety nunca recibe tus archivos.",
  account: "No hace falta cuenta ni registro.",
  price: "Gratis, sin versión de pago.",
  ads: "Hoy no hay anuncios, ni rastreadores, ni cookies de seguimiento, ni estadísticas de visitas.",
  watermark: "Solo texto, repetido en diagonal por toda la página y fundido en la imagen de la página: no se quita editando el PDF.",
  redact: "Sí: dibujas rectángulos y lo tapado se elimina de verdad del archivo.",
  password: "Sí, cifrado AES-256 opcional del PDF final.",
  recipients: "Sí: hasta 20 destinatarios, una versión para cada uno, con referencia única opcional.",
  offline: "Sí: una vez cargada la página, funciona en modo avión.",
  openSource: "Sí, licencia AGPL-3.0, código público.",
  logo: "No, solo marcas de agua de texto.",
  otherTools: "No: solo marca de agua, ocultar zonas, contraseña, unir documentos y ajustar el peso.",
};

const HOW_TO: { type: "steps"; items: string[] } = {
  type: "steps",
  items: [
    "Abre cachety.com en el navegador del móvil o del ordenador. No hay que instalar nada.",
    "Suelta tu DNI, NIE, pasaporte o nómina en la página. Puedes añadir varios archivos a la vez.",
    "Escribe para qué es la copia, para quién y la fecha, por ejemplo: Solo para alquiler – Inmobiliaria Sol – 11/10/2026.",
    "Si quieres, tapa lo que no necesitan ver y añade una contraseña.",
    "Descarga la copia con marca de agua y envía esa, nunca el original.",
  ],
};

const AIRPLANE_TIP = {
  type: "tip" as const,
  text: "La prueba del modo avión: abre Cachety, activa el modo avión y añade tu documento. Si la marca de agua se aplica igual, es que nada ha salido de tu dispositivo. Con una herramienta que sube archivos, sin conexión no funciona.",
};

export const COMPARISONS_ES: Comparison[] = [
  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    slug: "cachety-vs-ilovepdf",
    competitor: "ilovepdf",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/es",
    title: "Cachety o iLovePDF: ¿cuál usar para poner marca de agua a tu DNI?",
    metaTitle: "Alternativa a iLovePDF para la marca de agua del DNI",
    description:
      "iLovePDF o Cachety para poner marca de agua a tu DNI: dónde va tu archivo, cuánto tiempo se guarda y cuándo conviene cada uno. Comparativa clara.",
    intro:
      "iLovePDF, una empresa de Barcelona, es probablemente la web de PDF más usada en español. Su herramienta de marca de agua funciona bien, pero tu archivo se sube a sus servidores. Cachety hace la marca de agua sin que el documento salga de tu móvil u ordenador.",
    verdict:
      "Para un documento de identidad, la diferencia clave es dónde está tu archivo mientras se procesa. Con iLovePDF se sube a sus servidores y se borra en un plazo de hasta dos horas, según su política. Con Cachety no sale de tu dispositivo. Si necesitas un logo como marca de agua o muchas otras herramientas PDF, iLovePDF es más completo.",
    table: [
      { criterion: "Dónde se procesa el archivo", cachety: C.where, other: "En los servidores de iLovePDF, tras subirlo con conexión cifrada. Su app de escritorio sí procesa en local.", edge: "cachety" },
      { criterion: "Cuánto tiempo se guarda", cachety: C.retention, other: "Su política de privacidad dice que borra los archivos en un máximo de dos horas tras procesarlos.", edge: "cachety" },
      { criterion: "Cuenta", cachety: C.account, other: "La herramienta web se puede usar sin registrarse, con límites más bajos que con cuenta o Premium." },
      { criterion: "Precio", cachety: C.price, other: "Versión gratuita con límites y plan Premium de pago." },
      { criterion: "Anuncios y rastreo", cachety: C.ads, other: "La versión gratuita muestra anuncios: el servicio sin anuncios es una ventaja de Premium. Su aviso de cookies pide consentimiento para socios publicitarios.", edge: "cachety" },
      { criterion: "Tipo de marca de agua", cachety: C.watermark, other: "Texto o imagen, con posición, mosaico, transparencia, rotación y capa por encima o por debajo del contenido. No documenta si queda fundida en la página." },
      { criterion: "Marca de agua con logo", cachety: C.logo, other: "Sí, puedes insertar una imagen.", edge: "other" },
      { criterion: "Ocultar datos y contraseña", cachety: "Sí, las dos cosas en el mismo paso que la marca de agua.", other: "Sí, con sus herramientas aparte Censurar PDF y Proteger PDF." },
      { criterion: "Una copia por destinatario", cachety: C.recipients, other: "No lo documenta en su herramienta de marca de agua.", edge: "cachety" },
      { criterion: "Otras herramientas PDF", cachety: C.otherTools, other: "Muchas: unir, dividir, comprimir, convertir, firmar, OCR y más.", edge: "other" },
    ],
    body: [
      { type: "h2", text: "La diferencia que importa con un DNI" },
      {
        type: "p",
        text: "Cuando usas iLovePDF, tu archivo viaja por internet hasta sus servidores, se procesa allí y vuelve a ti. Durante un rato, una copia de tu DNI está en un ordenador de otra empresa, bajo sus reglas. iLovePDF explica que protege esos archivos y los borra en un plazo de hasta dos horas. Con Cachety, ese viaje no existe: todo pasa dentro de tu navegador.",
      },
      {
        type: "p",
        text: "No se trata de desconfiar de iLovePDF. Es una empresa europea con certificación ISO/IEC 27001 y sujeta al RGPD. Se trata de una regla sencilla: un documento de identidad que no se copia a ningún sitio no puede filtrarse desde ese sitio.",
      },
      { type: "h2", text: "En qué es mejor iLovePDF" },
      {
        type: "list",
        items: [
          "Puedes usar una imagen o un logo como marca de agua.",
          "Tiene decenas de herramientas: comprimir, convertir a Word, firmar, OCR, organizar páginas.",
          "Tiene apps para móvil y una app de escritorio para Windows y Mac que procesa los archivos en tu ordenador.",
          "Se conecta con Google Drive y Dropbox.",
        ],
      },
      { type: "h2", text: "En qué ayuda Cachety con documentos personales" },
      {
        type: "list",
        items: [
          "La marca de agua se repite en diagonal por toda la página y queda fundida en ella.",
          "Puedes tapar un número o una foto en el mismo paso, y lo tapado se borra de verdad.",
          "Creas una versión distinta para cada destinatario, por ejemplo una por inmobiliaria.",
          "Quita datos ocultos como metadatos o la ubicación GPS de las fotos del móvil.",
        ],
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Quieres poner un logo o una imagen como marca de agua.",
      "Necesitas otras herramientas PDF, como comprimir, convertir o firmar, en la misma web.",
      "Prefieres una app de escritorio con muchas funciones y soporte de una empresa.",
    ],
    chooseCachety: [
      "Vas a marcar tu DNI, NIE, pasaporte o nóminas y no quieres que salgan de tu dispositivo.",
      "Quieres tapar datos y añadir contraseña en el mismo paso que la marca de agua.",
      "Envías el mismo documento a varias personas y quieres una copia para cada una.",
    ],
    faq: [
      {
        q: "¿Es seguro usar iLovePDF para el DNI?",
        a: "iLovePDF cifra la subida y dice que borra los archivos en un plazo de hasta dos horas. Aun así, tu DNI pasa un tiempo en sus servidores. Si prefieres que no salga de tu móvil u ordenador, usa una herramienta que trabaje en el navegador, como Cachety.",
      },
      {
        q: "¿Cuánto tiempo guarda iLovePDF mis archivos?",
        a: "Según su política de privacidad, los borra en un máximo de dos horas después de procesarlos. Su página de preguntas frecuentes habla de entre una y dos horas.",
      },
      {
        q: "¿Cachety es una alternativa gratuita a iLovePDF?",
        a: "Para poner marcas de agua de texto, tapar datos y proteger con contraseña, sí: es gratis y sin cuenta. Para convertir, comprimir o firmar PDF, no: Cachety no hace esas tareas.",
      },
      {
        q: "¿Cómo sé que Cachety no sube mi archivo?",
        a: "Haz la prueba del modo avión: abre la página, desconéctate de internet y añade tu documento. Si funciona igual, es que nada se ha enviado.",
      },
    ],
    sources: [
      { label: "iLovePDF: política de privacidad", url: "https://www.ilovepdf.com/es/ayuda/privacidad" },
      { label: "iLovePDF: preguntas frecuentes", url: "https://www.ilovepdf.com/es/ayuda/preguntas-frecuentes" },
      { label: "iLovePDF: herramienta de marca de agua", url: "https://www.ilovepdf.com/es/insertar_imagen_texto_pdf" },
      { label: "iLovePDF: precios y ventajas Premium", url: "https://www.ilovepdf.com/es/precio" },
      { label: "iLovePDF: app de escritorio", url: "https://www.ilovepdf.com/es/escritorio" },
      { label: "iLovePDF: seguridad e ISO 27001", url: "https://www.ilovepdf.com/help/security" },
    ],
    checked: CHECKED,
    updated: CHECKED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    slug: "cachety-vs-smallpdf",
    competitor: "smallpdf",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/es",
    title: "Cachety o Smallpdf para poner marca de agua a tus documentos",
    metaTitle: "Smallpdf o Cachety: marca de agua para tu DNI",
    description:
      "¿Smallpdf sube tus archivos? Comparamos Smallpdf y Cachety para poner marca de agua al DNI: servidores, borrado, rastreo y lo que hace mejor cada uno.",
    intro:
      "Smallpdf es una conocida web suiza de herramientas PDF. Su herramienta de marca de agua se usa desde el navegador, pero el archivo se procesa en sus servidores. Cachety lo hace todo en tu dispositivo.",
    verdict:
      "Que una web funcione desde el navegador no significa que tu archivo se quede en tu dispositivo. Smallpdf sube los archivos a sus servidores y su página dice que los borra tras una hora. Cachety no sube nada. Smallpdf es mejor si buscas un paquete completo de herramientas PDF y guardar tus archivos en una cuenta.",
    table: [
      { criterion: "Dónde se procesa el archivo", cachety: C.where, other: "En sus servidores. Su política cita servidores de Hetzner en la Unión Europea.", edge: "cachety" },
      { criterion: "Cuánto tiempo se guarda", cachety: C.retention, other: "La página de la herramienta dice que se borra tras una hora. Su política de privacidad, sin cuenta, habla de un plazo razonable desde la última vez que se abrió el archivo.", edge: "cachety" },
      { criterion: "Cuenta", cachety: C.account, other: "No hace falta registrarse para la herramienta de marca de agua." },
      { criterion: "Precio", cachety: C.price, other: "Gratis con límites de uso, como un límite diario de descargas, y plan Pro de pago." },
      { criterion: "Rastreo", cachety: C.ads, other: "Su política nombra, con tu consentimiento, Google Analytics, Hotjar, Google Ads, Meta Pixel y LinkedIn Insight Tag.", edge: "cachety" },
      { criterion: "Tipo de marca de agua", cachety: C.watermark, other: "Solo texto, con fuente, tamaño, color y opacidad, en todas las páginas. No documenta la posición ni si queda fundida." },
      { criterion: "Ocultar datos", cachety: C.redact, other: "Sí, con su herramienta aparte para censurar PDF." },
      { criterion: "Contraseña", cachety: C.password, other: "Sí, con su herramienta aparte para proteger PDF." },
      { criterion: "Uso sin conexión", cachety: C.offline, other: "La herramienta web necesita conexión para subir el archivo. Tiene app de escritorio y apps móviles.", edge: "cachety" },
      { criterion: "Otras herramientas PDF", cachety: C.otherTools, other: "Muchas: comprimir, convertir, editar, firmar y más.", edge: "other" },
    ],
    body: [
      { type: "h2", text: "En el navegador no siempre quiere decir en tu dispositivo" },
      {
        type: "p",
        text: "Smallpdf anuncia que funciona desde el navegador, y es verdad: no tienes que instalar nada. Pero su propia página de marca de agua explica que los archivos se suben con cifrado TLS y se borran de sus servidores tras una hora. Es decir, durante ese tiempo una copia de tu documento está en un ordenador de otra empresa.",
      },
      {
        type: "p",
        text: "Cachety también funciona desde el navegador, pero el trabajo se hace en tu móvil u ordenador. No hay ningún servidor que reciba tus archivos, y puedes comprobarlo con el modo avión.",
      },
      { type: "h2", text: "Lo que hace bien Smallpdf" },
      {
        type: "list",
        items: [
          "Reúne muchas herramientas PDF en una interfaz muy sencilla.",
          "Con cuenta, puedes guardar tus archivos y retomarlos más tarde.",
          "Ofrece app de escritorio y apps móviles.",
          "Dice cumplir el RGPD y tener certificación ISO.",
        ],
      },
      { type: "h2", text: "Por qué Cachety encaja mejor con documentos de identidad" },
      {
        type: "list",
        items: [
          "El documento nunca sale de tu dispositivo.",
          "La marca de agua cubre toda la página en diagonal, difícil de recortar.",
          "Tapar datos, añadir contraseña y crear una copia por destinatario se hace en el mismo paso.",
          "Hoy no hay rastreadores ni cookies publicitarias.",
        ],
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Necesitas convertir, comprimir, editar o firmar PDF en la misma web.",
      "Quieres guardar tus documentos en una cuenta en la nube.",
      "Trabajas en equipo y te interesa un plan de empresa con soporte.",
    ],
    chooseCachety: [
      "Quieres marcar tu DNI o tus nóminas sin subirlos a ningún servidor.",
      "Prefieres una web sin rastreadores ni cookies de publicidad.",
      "Necesitas varias copias, una por destinatario, con su propio texto.",
    ],
    faq: [
      {
        q: "¿Smallpdf sube mis archivos a internet?",
        a: "Sí. Su página de marca de agua explica que los archivos se suben con cifrado TLS y se borran de sus servidores tras una hora, salvo que los guardes en una cuenta.",
      },
      {
        q: "¿Es seguro usar Smallpdf con el DNI?",
        a: "Smallpdf cifra las transferencias y borra los archivos al poco tiempo. Pero tu DNI pasa por sus servidores. Si prefieres que no salga de tu dispositivo, usa una herramienta que trabaje en local, como Cachety.",
      },
      {
        q: "¿Smallpdf permite poner un logo como marca de agua?",
        a: "Su herramienta de marca de agua dice que solo admite texto; para imágenes remite a su editor de PDF. Cachety tampoco admite logos: solo texto.",
      },
    ],
    sources: [
      { label: "Smallpdf: herramienta de marca de agua (FAQ)", url: "https://smallpdf.com/watermark-pdf" },
      { label: "Smallpdf: página en español", url: "https://smallpdf.com/es/marca-de-agua-pdf" },
      { label: "Smallpdf: aviso de privacidad", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf: planes y límites", url: "https://smallpdf.com/pricing" },
    ],
    checked: CHECKED,
    updated: CHECKED,
  },

  // ───────────────────────────── PDF24 ─────────────────────────────
  {
    slug: "cachety-vs-pdf24",
    competitor: "pdf24",
    competitorName: "PDF24 Tools",
    competitorUrl: "https://tools.pdf24.org/es/",
    title: "Cachety o PDF24: marca de agua en tus documentos, con y sin subirlos",
    metaTitle: "PDF24 o Cachety: marca de agua sin subir el archivo",
    description:
      "PDF24 es gratis y sin límites, pero procesa en sus servidores y vive de la publicidad. Comparamos PDF24 y Cachety para la marca de agua de tu DNI.",
    intro:
      "PDF24 es una web alemana muy popular: gratis, sin registro y con decenas de herramientas. Su marca de agua se añade en sus servidores en Alemania. Cachety la añade en tu propio dispositivo.",
    verdict:
      "Las dos son gratis y sin cuenta. La diferencia está en el recorrido de tu archivo: PDF24 lo sube y lo borra en una hora, y se financia con publicidad. Cachety no lo sube y hoy no tiene anuncios. Si usas Windows y quieres muchas herramientas sin conexión, el programa gratuito PDF24 Creator es una muy buena opción.",
    table: [
      { criterion: "Dónde se procesa el archivo", cachety: C.where, other: "En servidores de PDF24 en Alemania. Su programa PDF24 Creator para Windows trabaja en tu PC.", edge: "cachety" },
      { criterion: "Cuánto tiempo se guarda", cachety: C.retention, other: "Se borra automáticamente del servidor una hora después del proceso. También puedes borrarlo tú antes.", edge: "cachety" },
      { criterion: "Cuenta", cachety: C.account, other: "No hace falta registro." },
      { criterion: "Precio", cachety: C.price, other: "Gratis y sin límites, también para empresas." },
      { criterion: "Anuncios y rastreo", cachety: C.ads, other: "Se financia con publicidad. Su política de privacidad cita Google AdSense, Google Analytics y remarketing de Google.", edge: "cachety" },
      { criterion: "Tipo de marca de agua", cachety: C.watermark, other: "Texto con fuente, tamaño, color, transparencia, ángulo y espaciado, en 9 posiciones o rellenando la página. No documenta si queda fundida." },
      { criterion: "Ocultar datos, contraseña y metadatos", cachety: "Sí, todo en el mismo paso que la marca de agua.", other: "Sí, con herramientas aparte: censurar, proteger y quitar metadatos." },
      { criterion: "Una copia por destinatario", cachety: C.recipients, other: "No lo documenta en su herramienta de marca de agua.", edge: "cachety" },
      { criterion: "Uso sin conexión", cachety: C.offline, other: "Con PDF24 Creator, gratis para Windows." },
      { criterion: "Otras herramientas PDF", cachety: C.otherTools, other: "Muchísimas: unir, comprimir, convertir, OCR, aplanar y más.", edge: "other" },
    ],
    body: [
      { type: "h2", text: "Dos herramientas gratuitas, dos recorridos distintos" },
      {
        type: "p",
        text: "PDF24 lo dice con claridad: la marca de agua se añade en sus servidores en la nube, situados en Alemania, y el archivo se borra una hora después. Es un servicio serio y sujeto al RGPD. Pero, durante esa hora, una copia de tu documento está fuera de tu dispositivo.",
      },
      {
        type: "p",
        text: "Con Cachety el archivo no viaja. La página se carga una vez y, a partir de ahí, todo el trabajo lo hace tu navegador. Por eso sigue funcionando en modo avión.",
      },
      { type: "h2", text: "Lo que hace muy bien PDF24" },
      {
        type: "list",
        items: [
          "Es gratis y sin límites de uso, sin cuenta.",
          "Tiene decenas de herramientas PDF en la misma web.",
          "PDF24 Creator, su programa gratuito para Windows, trabaja sin conexión y deja los archivos en tu PC.",
          "Su marca de agua tiene muchas opciones de posición, ángulo y espaciado.",
        ],
      },
      { type: "h2", text: "Lo que añade Cachety para documentos personales" },
      {
        type: "list",
        items: [
          "Tapar datos, cifrar y quitar datos ocultos en el mismo paso, sin pasar por varias herramientas.",
          "Una versión por destinatario, cada una con su nombre y una referencia única.",
          "Funciona igual en el móvil, también con fotos del iPhone en HEIC.",
          "Hoy sin anuncios ni rastreadores.",
        ],
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Usas Windows y quieres un programa gratuito con muchas herramientas que funcione sin conexión: PDF24 Creator.",
      "Necesitas convertir, comprimir, hacer OCR o aplanar PDF, además de la marca de agua.",
      "Quieres colocar la marca de agua en una posición concreta de la página.",
    ],
    chooseCachety: [
      "Quieres marcar tu DNI desde el móvil o desde cualquier ordenador sin subirlo a ningún servidor.",
      "Prefieres una web sin publicidad ni rastreadores de anuncios.",
      "Necesitas tapar datos y crear una copia por destinatario en un solo paso.",
    ],
    faq: [
      {
        q: "¿PDF24 es seguro para el DNI?",
        a: "PDF24 procesa los archivos en servidores en Alemania y los borra en una hora. Es un servicio serio, pero tu DNI sale de tu dispositivo. Si no quieres que salga, usa PDF24 Creator en Windows o una web que trabaje en local como Cachety.",
      },
      {
        q: "¿PDF24 tiene anuncios?",
        a: "Sí. La propia web dice que es gratis gracias a la publicidad, y su política de privacidad menciona Google AdSense.",
      },
      {
        q: "¿PDF24 guarda mis archivos?",
        a: "Según su web, los borra del servidor automáticamente una hora después del proceso, y puedes borrarlos tú antes.",
      },
      {
        q: "¿Puedo usar Cachety sin internet como PDF24 Creator?",
        a: "Sí, en cuanto la página está cargada. También puedes añadirla a la pantalla de inicio del móvil como si fuera una app.",
      },
    ],
    sources: [
      { label: "PDF24: herramienta de marca de agua", url: "https://tools.pdf24.org/en/add-watermark-to-pdf" },
      { label: "PDF24: preguntas frecuentes", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24: política de privacidad", url: "https://www.pdf24.org/en/privacy-policy" },
      { label: "PDF24: todas las herramientas", url: "https://tools.pdf24.org/en/all-tools" },
    ],
    checked: CHECKED,
    updated: CHECKED,
  },

  // ───────────────────────────── Sejda ─────────────────────────────
  {
    slug: "cachety-vs-sejda",
    competitor: "sejda",
    competitorName: "Sejda",
    competitorUrl: "https://www.sejda.com/es",
    title: "Cachety o Sejda: marca de agua en PDF, en la nube o en tu dispositivo",
    metaTitle: "Sejda o Cachety: comparativa de marca de agua PDF",
    description:
      "Sejda sube tus PDF y los borra a las 2 horas; Cachety no los sube. Comparamos los dos para poner marca de agua a tu DNI, nóminas y documentos.",
    intro:
      "Sejda es un editor de PDF neerlandés con una herramienta de marca de agua muy completa. La versión web sube tus archivos a sus servidores; su versión de escritorio no. Cachety trabaja siempre en tu dispositivo, desde el navegador.",
    verdict:
      "Sejda es más flexible en el diseño de la marca de agua: admite imágenes, posiciones exactas y también puede crear una versión por destinatario. Su versión web, eso sí, sube tus archivos y los borra a las dos horas. Cachety no sube nada y añade tapar datos y contraseña en el mismo paso.",
    table: [
      { criterion: "Dónde se procesa el archivo", cachety: C.where, other: "Sejda Web: en sus servidores, tras una subida cifrada. Sejda Desktop: en tu ordenador.", edge: "cachety" },
      { criterion: "Cuánto tiempo se guarda", cachety: C.retention, other: "Su web dice que se borra automáticamente a las 2 horas, sin copias de seguridad según su política.", edge: "cachety" },
      { criterion: "Precio y límites", cachety: C.price, other: "Gratis hasta 200 páginas o 50 MB y 3 tareas por hora; planes de pago para más." },
      { criterion: "Rastreo", cachety: C.ads, other: "Su política menciona cookies de socios de analítica y de publicidad, con opción de rechazar la analítica.", edge: "cachety" },
      { criterion: "Tipo de marca de agua", cachety: C.watermark, other: "Texto o imagen, con posición libre o por coordenadas, rotación, tamaño, opacidad, color y fuente. No documenta si queda fundida." },
      { criterion: "Marca de agua con logo", cachety: C.logo, other: "Sí: JPG, PNG, GIF o SVG.", edge: "other" },
      { criterion: "Una copia por destinatario", cachety: C.recipients, other: "Sí: escribes varios textos, uno por línea, y genera una versión con cada uno." },
      { criterion: "Ocultar datos", cachety: C.redact, other: "No encontramos una herramienta para censurar en su web.", edge: "cachety" },
      { criterion: "Contraseña", cachety: C.password, other: "Sí, con su herramienta Proteger." },
      { criterion: "Otras herramientas PDF", cachety: C.otherTools, other: "Muchas: editar, unir, dividir, comprimir, firmar, rellenar formularios.", edge: "other" },
    ],
    body: [
      { type: "h2", text: "Una herramienta muy completa, pero en la nube" },
      {
        type: "p",
        text: "La marca de agua de Sejda permite casi todo: texto o logo, posición exacta, páginas concretas y plantillas. Para usarla en la web, el PDF se sube a sus servidores y se borra a las dos horas. Si prefieres que no salga de tu ordenador, Sejda ofrece una versión de escritorio que, según su web, tiene las mismas funciones y no envía los archivos a ninguna parte.",
      },
      {
        type: "p",
        text: "Cachety no tiene tantas opciones de diseño, pero nunca sube tu documento. Todo se hace en el navegador, también en el móvil, y lo puedes comprobar con el modo avión.",
      },
      { type: "h2", text: "En qué es mejor Sejda" },
      {
        type: "list",
        items: [
          "Admite logos e imágenes como marca de agua.",
          "Puedes colocar la marca de agua exactamente donde quieras.",
          "Sejda Desktop procesa en tu ordenador, sin subir nada.",
          "Incluye un editor de PDF completo.",
        ],
      },
      { type: "h2", text: "En qué ayuda Cachety" },
      {
        type: "list",
        items: [
          "Funciona en local también desde el móvil, sin instalar nada.",
          "Tapa zonas como un número de cuenta y las elimina de verdad del archivo.",
          "La marca de agua cubre toda la página en diagonal y queda fundida en ella.",
          "Es gratis sin límite de tareas por hora.",
        ],
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Necesitas un logo o una imagen como marca de agua, en una posición exacta.",
      "Quieres un editor de PDF completo, en la web o en el escritorio.",
      "Trabajas en un ordenador y prefieres Sejda Desktop para procesar en local con más opciones de diseño.",
    ],
    chooseCachety: [
      "Quieres marcar documentos de identidad sin subirlos, también desde el móvil.",
      "Necesitas tapar datos sensibles en el mismo paso que la marca de agua.",
      "Prefieres una herramienta gratuita sin límite de tareas por hora.",
    ],
    faq: [
      {
        q: "¿Sejda guarda mis archivos?",
        a: "Su herramienta web indica que los archivos se borran automáticamente a las dos horas. Su política añade que no hace copias de seguridad de ellos.",
      },
      {
        q: "¿Sejda puede crear una copia distinta para cada destinatario?",
        a: "Sí. Si escribes varios textos de marca de agua, uno por línea, genera una versión del documento con cada texto. Cachety también lo hace, hasta 20 destinatarios.",
      },
      {
        q: "¿Hay una alternativa a Sejda que no suba el PDF?",
        a: "Sí: Sejda Desktop trabaja en tu ordenador sin subir los archivos. Cachety trabaja en tu navegador, gratis, también en el móvil.",
      },
    ],
    sources: [
      { label: "Sejda: herramienta de marca de agua", url: "https://www.sejda.com/es/watermark-pdf" },
      { label: "Sejda: política de privacidad", url: "https://www.sejda.com/privacy" },
      { label: "Sejda: política de cookies", url: "https://www.sejda.com/cookies" },
      { label: "Sejda: precios", url: "https://www.sejda.com/pricing" },
    ],
    checked: CHECKED,
    updated: CHECKED,
  },

  // ───────────────────────────── Adobe Acrobat ─────────────────────────────
  {
    slug: "cachety-vs-adobe-acrobat",
    competitor: "adobe-acrobat",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/es/acrobat.html",
    title: "Cachety o Adobe Acrobat: poner marca de agua sin pagar una suscripción",
    metaTitle: "Marca de agua sin Adobe Acrobat: alternativa gratis",
    description:
      "Las herramientas online gratuitas de Adobe no incluyen la marca de agua: va en Acrobat de pago. Comparamos Adobe Acrobat y Cachety para tus documentos.",
    intro:
      "Adobe Acrobat es la referencia del PDF. Pero añadir una marca de agua es una función de Acrobat de pago: no aparece entre sus herramientas online gratuitas. Cachety lo hace gratis, en tu navegador y sin subir el archivo.",
    verdict:
      "Si ya pagas Acrobat y trabajas con PDF a diario, su marca de agua es muy completa: texto o imagen, por delante o por detrás de la página. Si solo quieres proteger la copia de tu DNI o de tus nóminas, Cachety lo hace gratis, sin cuenta y sin que el documento salga de tu dispositivo.",
    table: [
      { criterion: "Marca de agua gratis", cachety: "Sí, siempre gratis.", other: "No: no está entre sus herramientas online gratuitas. Hace falta Acrobat de pago.", edge: "cachety" },
      { criterion: "Dónde se procesa el archivo", cachety: C.where, other: "Acrobat de escritorio trabaja en tu ordenador. Acrobat en la web usa la nube de Adobe." },
      { criterion: "Cuenta", cachety: C.account, other: "Hace falta una cuenta de Adobe con suscripción.", edge: "cachety" },
      { criterion: "Rastreo", cachety: C.ads, other: "Su política de privacidad dice que usa cookies y otras tecnologías para seguir el uso de sus servicios.", edge: "cachety" },
      { criterion: "Tipo de marca de agua", cachety: C.watermark, other: "Texto o imagen, con fuente, tamaño, color, opacidad y posición, delante o detrás de la página." },
      { criterion: "Marca de agua con logo", cachety: C.logo, other: "Sí.", edge: "other" },
      { criterion: "Ocultar datos", cachety: C.redact, other: "Sí, la censura de datos se incluye en Acrobat Pro." },
      { criterion: "Contraseña", cachety: C.password, other: "Sí, incluso con su herramienta online gratuita Proteger PDF." },
      { criterion: "Código abierto", cachety: C.openSource, other: "No, es software privativo.", edge: "cachety" },
      { criterion: "Otras herramientas PDF", cachety: C.otherTools, other: "El paquete más completo: editar, firmar, comparar, OCR, formularios y más.", edge: "other" },
    ],
    body: [
      { type: "h2", text: "La marca de agua en Adobe es de pago" },
      {
        type: "p",
        text: "Mucha gente busca cómo poner una marca de agua con Adobe y descubre que no está entre las herramientas online gratuitas de Adobe, que sí incluyen editar, unir o proteger con contraseña. La marca de agua forma parte de Acrobat de pago, en el ordenador o en la web con suscripción.",
      },
      {
        type: "p",
        text: "Cachety cubre justo esa necesidad sin coste: marca de agua de texto, tapar datos y contraseña. Y lo hace en tu navegador, sin cuenta y sin subir tu documento.",
      },
      { type: "h2", text: "Cuándo Acrobat merece la pena" },
      {
        type: "list",
        items: [
          "Trabajas con PDF todos los días y necesitas editar, firmar, comparar o hacer OCR.",
          "Quieres usar el logo de tu empresa como marca de agua.",
          "Tu empresa ya tiene licencias de Acrobat.",
        ],
      },
      { type: "h2", text: "Cuándo basta con Cachety" },
      {
        type: "list",
        items: [
          "Solo quieres proteger la copia de tu DNI, NIE, pasaporte o nóminas.",
          "No quieres crear una cuenta ni pagar una suscripción.",
          "Quieres hacerlo desde el móvil, también con fotos del iPhone.",
        ],
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Ya pagas Acrobat y quieres hacerlo todo en el mismo programa.",
      "Necesitas una marca de agua con logo o imagen.",
      "Necesitas edición profesional de PDF: editar texto, firmar, comparar, OCR.",
    ],
    chooseCachety: [
      "Quieres una marca de agua gratis, sin cuenta ni suscripción.",
      "No quieres que tu documento de identidad salga de tu dispositivo.",
      "Quieres tapar datos y cifrar el PDF sin instalar nada.",
    ],
    faq: [
      {
        q: "¿Se puede poner una marca de agua gratis con Adobe?",
        a: "No con sus herramientas online gratuitas: la marca de agua no está en esa lista. Es una función de Acrobat de pago.",
      },
      {
        q: "¿Cómo poner una marca de agua en un PDF sin Adobe Acrobat?",
        a: "Con una herramienta gratuita como Cachety: abres la web, sueltas el PDF, escribes el texto y descargas la copia. El archivo no sale de tu dispositivo.",
      },
      {
        q: "¿Cachety puede sustituir a Acrobat?",
        a: "Para poner marcas de agua de texto, tapar datos y proteger con contraseña, sí. Para editar texto, firmar, convertir o hacer OCR, no: Cachety no hace esas tareas.",
      },
    ],
    sources: [
      { label: "Adobe: herramientas online gratuitas de Acrobat", url: "https://www.adobe.com/acrobat/online.html" },
      { label: "Adobe: comparación de versiones de Acrobat", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
      { label: "Adobe: qué es una marca de agua", url: "https://www.adobe.com/acrobat/resources/what-is-a-watermark.html" },
      { label: "Adobe: política de privacidad", url: "https://www.adobe.com/privacy/policy.html" },
    ],
    checked: CHECKED,
    updated: CHECKED,
  },

  // ───────────────────────────── Canva ─────────────────────────────
  {
    slug: "cachety-vs-canva",
    competitor: "canva",
    competitorName: "Canva",
    competitorUrl: "https://www.canva.com/",
    title: "Cachety o Canva: ¿dónde poner la marca de agua a tu DNI?",
    metaTitle: "Canva o Cachety: marca de agua para documentos",
    description:
      "Canva es ideal para diseñar, pero tus archivos se suben a tu cuenta. Comparamos Canva y Cachety para poner marca de agua a tu DNI y documentos.",
    intro:
      "Canva es una plataforma de diseño australiana que mucha gente usa para poner su logo en fotos. Para un documento de identidad, sin embargo, implica subirlo a tu cuenta de Canva. Cachety pone la marca de agua sin que el archivo salga de tu dispositivo.",
    verdict:
      "Canva es la mejor opción para marcar con tu logo fotos o diseños que vas a publicar. Para la copia de tu DNI o de tus nóminas, Cachety es más directo: sin cuenta, sin subir nada y con funciones pensadas para documentos personales, como tapar datos o crear una copia por destinatario.",
    table: [
      { criterion: "Dónde se procesa el archivo", cachety: C.where, other: "En la nube de Canva: el archivo se sube a tu cuenta.", edge: "cachety" },
      { criterion: "Cuánto tiempo se guarda", cachety: C.retention, other: "Su política dice que conserva el contenido el tiempo comercialmente razonable y mientras tenga un fin válido, también para copias de seguridad.", edge: "cachety" },
      { criterion: "Cuenta", cachety: C.account, other: "Te registras gratis con correo, Google u otras cuentas.", edge: "cachety" },
      { criterion: "Publicidad y rastreo", cachety: C.ads, other: "Su política menciona cookies para publicidad y comparte datos con redes publicitarias como Facebook o Google.", edge: "cachety" },
      { criterion: "Uso de tu contenido para IA", cachety: "No aplica: Cachety no recibe tus archivos.", other: "Su política dice que puede analizar el contenido subido para entrenar sus modelos de IA, con opción de desactivarlo.", edge: "cachety" },
      { criterion: "Tipo de marca de agua", cachety: C.watermark, other: "Con la app Watermark Maker: texto o logo, con fuente, opacidad y distribución. No documenta si queda fundida." },
      { criterion: "Marca de agua con logo y diseño", cachety: C.logo, other: "Sí, con todas las herramientas de diseño de Canva.", edge: "other" },
      { criterion: "Ocultar datos y contraseña", cachety: "Sí, las dos cosas.", other: "No encontramos herramientas de censura ni de contraseña de PDF.", edge: "cachety" },
      { criterion: "Una copia por destinatario", cachety: C.recipients, other: "No lo documenta.", edge: "cachety" },
    ],
    body: [
      { type: "h2", text: "Una gran herramienta de diseño, no de documentos privados" },
      {
        type: "p",
        text: "Canva es excelente para crear publicaciones, carteles o fotos con tu logo. Pero todo lo que editas en Canva se guarda en tu cuenta, en su nube. Para un DNI eso significa que una copia de tu documento queda en los servidores de una empresa, según su política, durante el tiempo que considere razonable.",
      },
      {
        type: "p",
        text: "Cachety funciona al revés: no hay cuenta ni nube. Abres la página, añades tu documento y descargas la copia. El original no sale de tu móvil u ordenador.",
      },
      { type: "h2", text: "En qué es mejor Canva" },
      {
        type: "list",
        items: [
          "Marcas de agua con tu logo y un diseño cuidado.",
          "Miles de plantillas, fuentes y elementos gráficos.",
          "Ideal para proteger fotos que vas a publicar en redes o en una web.",
        ],
      },
      { type: "h2", text: "En qué es mejor Cachety para tu DNI" },
      {
        type: "list",
        items: [
          "No necesitas cuenta y el archivo no se sube.",
          "La marca de agua se repite por toda la página y queda fundida en ella.",
          "Puedes tapar datos, quitar metadatos y proteger el PDF con contraseña.",
        ],
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Quieres poner tu logo en fotos o diseños que vas a publicar.",
      "Necesitas un diseño cuidado, con tus fuentes y colores de marca.",
      "Ya trabajas en Canva y quieres tenerlo todo en el mismo sitio.",
    ],
    chooseCachety: [
      "Vas a enviar la copia de tu DNI, NIE o pasaporte y no quieres subirla a ninguna nube.",
      "No quieres crear una cuenta para algo que se hace en un minuto.",
      "Necesitas tapar datos o proteger el PDF con contraseña.",
    ],
    faq: [
      {
        q: "¿Es buena idea subir mi DNI a Canva?",
        a: "Canva no está pensado para documentos de identidad. Lo que subes queda en tu cuenta, en su nube. Para la copia de tu DNI es más prudente una herramienta que trabaje en tu dispositivo, como Cachety.",
      },
      {
        q: "¿Cómo pongo una marca de agua en Canva?",
        a: "Canva ofrece la app Watermark Maker, que permite añadir un texto o un logo como marca de agua a tus diseños. Según Canva, se puede usar con cualquier plan.",
      },
      {
        q: "¿Cachety puede poner mi logo como marca de agua?",
        a: "No. Cachety solo hace marcas de agua de texto. Para un logo, Canva es mejor opción.",
      },
    ],
    sources: [
      { label: "Canva: política de privacidad", url: "https://www.canva.com/policies/privacy-policy/" },
      { label: "Canva: app Watermark Maker", url: "https://www.canva.com/apps/AAGa702Tp2E/watermark-maker" },
      { label: "Canva: poner marca de agua a un PDF", url: "https://www.canva.com/features/add-watermark-to-pdf/" },
      { label: "Canva: registro e inicio de sesión", url: "https://www.canva.com/help/sign-up-log-in-variantb/" },
    ],
    checked: CHECKED,
    updated: CHECKED,
  },

  // ───────────────────────────── Watermarkly ─────────────────────────────
  {
    slug: "cachety-vs-watermarkly",
    competitor: "watermarkly",
    competitorName: "Watermarkly",
    competitorUrl: "https://watermarkly.com/es/",
    title: "Cachety o Watermarkly: dos herramientas que no suben tus archivos",
    metaTitle: "Watermarkly o Cachety: ¿cuál elegir para tu DNI?",
    description:
      "Watermarkly y Cachety trabajan en tu navegador sin subir archivos. Te contamos en qué se diferencian para fotos, logos y documentos de identidad.",
    intro:
      "Watermarkly, con sede en Polonia, procesa los archivos en tu dispositivo, igual que Cachety. Las dos son buenas opciones para no subir tus documentos. La diferencia está en para qué está pensada cada una.",
    verdict:
      "Watermarkly está pensada para fotógrafos y marcas: logos, muchas fotos a la vez, vídeos y apps de escritorio. Cachety está pensada para documentos personales: tapar datos, contraseña, una copia por destinatario y código abierto. Si vas a proteger la copia de tu DNI, Cachety reúne más funciones útiles; si vas a firmar tus fotos con un logo, Watermarkly.",
    table: [
      { criterion: "Dónde se procesa el archivo", cachety: C.where, other: "En tu dispositivo: dice que no envía tus archivos a sus servidores ni los guarda." },
      { criterion: "Cuenta", cachety: C.account, other: "No hace falta registrarse: no tiene cuentas." },
      { criterion: "Precio", cachety: C.price, other: "Versión gratuita y versiones de pago." },
      { criterion: "Rastreo", cachety: C.ads, other: "Mide las visitas con Google Analytics, según su política.", edge: "cachety" },
      { criterion: "Tipo de marca de agua", cachety: C.watermark, other: "Texto y logo, con fuente, color, tamaño, opacidad, rotación, efectos y mosaico. No documenta si queda fundida." },
      { criterion: "Marca de agua con logo", cachety: C.logo, other: "Sí.", edge: "other" },
      { criterion: "Ocultar datos y contraseña", cachety: "Sí, las dos cosas.", other: "No las encontramos en sus páginas de marca de agua.", edge: "cachety" },
      { criterion: "Una copia por destinatario", cachety: C.recipients, other: "No lo documenta.", edge: "cachety" },
      { criterion: "Apps y lotes grandes", cachety: "Web que se puede añadir a la pantalla de inicio. Sin app de escritorio.", other: "Apps para Windows, Mac, iOS y Android; la de escritorio procesa hasta 50.000 archivos.", edge: "other" },
      { criterion: "Código abierto", cachety: C.openSource, other: "No lo indica." , edge: "cachety" },
    ],
    body: [
      { type: "h2", text: "Las dos trabajan en tu dispositivo" },
      {
        type: "p",
        text: "No todas las webs de marca de agua suben tus archivos. Watermarkly explica que procesa los archivos en tu dispositivo y no los envía a sus servidores. Cachety hace lo mismo. En los dos casos, tu documento no se copia a ningún servidor.",
      },
      {
        type: "p",
        text: "Una diferencia: el código de Cachety es público, así que cualquiera puede revisar lo que hace. Y su página bloquea técnicamente el envío de datos a otros sitios. Con las dos herramientas puedes hacer la prueba del modo avión.",
      },
      { type: "h2", text: "En qué es mejor Watermarkly" },
      {
        type: "list",
        items: [
          "Admite logos y muchos estilos de marca de agua.",
          "Procesa grandes lotes de fotos, sobre todo con su app de escritorio.",
          "Además de fotos y PDF, también trabaja con vídeos.",
        ],
      },
      { type: "h2", text: "En qué es mejor Cachety para documentos personales" },
      {
        type: "list",
        items: [
          "Tapa datos como un número de cuenta, y lo tapado desaparece del archivo.",
          "Protege el PDF con contraseña.",
          "Crea una versión por destinatario con referencia única, para saber de dónde salió una copia.",
          "Quita datos ocultos como metadatos o la ubicación GPS de las fotos.",
        ],
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Quieres poner tu logo en fotos o vídeos.",
      "Tienes que marcar cientos o miles de fotos de una vez.",
      "Prefieres una app de escritorio o de móvil instalada.",
    ],
    chooseCachety: [
      "Vas a proteger la copia de tu DNI, NIE o nóminas y quieres tapar datos y añadir contraseña.",
      "Quieres una copia distinta para cada destinatario.",
      "Prefieres una herramienta de código abierto y sin estadísticas de visitas.",
    ],
    faq: [
      {
        q: "¿Watermarkly sube mis archivos?",
        a: "Según su web y su política de privacidad, no: procesa los archivos en tu dispositivo y no los envía a sus servidores.",
      },
      {
        q: "¿Es Watermarkly gratis?",
        a: "Tiene una versión gratuita y versiones de pago con más funciones. Cachety es gratis, sin versión de pago.",
      },
      {
        q: "¿Cuál es mejor para el DNI, Watermarkly o Cachety?",
        a: "Las dos trabajan sin subir el archivo. Cachety añade funciones pensadas para documentos de identidad: tapar datos, contraseña y una copia por destinatario.",
      },
    ],
    sources: [
      { label: "Watermarkly: marca de agua en PDF", url: "https://watermarkly.com/es/watermark-pdf/" },
      { label: "Watermarkly: política de privacidad", url: "https://watermarkly.com/privacy/" },
      { label: "Watermarkly: página principal y apps", url: "https://watermarkly.com/" },
      { label: "Watermarkly: precios", url: "https://watermarkly.com/pricing/" },
    ],
    checked: CHECKED,
    updated: CHECKED,
  },

  // ───────────────────────────── Saferlayer ─────────────────────────────
  {
    slug: "cachety-vs-saferlayer",
    competitor: "saferlayer",
    competitorName: "Saferlayer",
    competitorUrl: "https://saferlayer.com/",
    title: "Cachety o Saferlayer: marca de agua para compartir tu DNI",
    metaTitle: "Saferlayer o Cachety: marca de agua para el DNI",
    description:
      "Saferlayer y Cachety ponen la marca de agua en tu navegador. Comparamos formatos, PDF, precio y rastreo para compartir tu DNI con seguridad.",
    intro:
      "Saferlayer es una herramienta de marca de agua pensada para compartir el DNI, que se rige por la ley española. Como Cachety, procesa las imágenes en tu navegador, sin subirlas. Cambian los formatos admitidos, el precio y las funciones.",
    verdict:
      "Las dos protegen tu privacidad de la misma forma: el archivo no sale de tu dispositivo. Saferlayer Free trabaja solo con imágenes; para PDF y lotes hace falta su plan Pro, de pago y con cuenta. Cachety admite PDF e imágenes gratis y sin cuenta, y añade tapar datos y contraseña.",
    table: [
      { criterion: "Dónde se procesa el archivo", cachety: C.where, other: "Free y Pro: en tu navegador, sin enviar archivos a sus servidores. Su API para empresas sí procesa en servidores en Finlandia." },
      { criterion: "Cuenta", cachety: C.account, other: "Free: sin registro. Pro: cuenta de pago." },
      { criterion: "PDF", cachety: "Sí, gratis, hasta 500 páginas por PDF.", other: "No en la versión Free; sí en Pro, de pago.", edge: "cachety" },
      { criterion: "Precio", cachety: C.price, other: "Versión gratuita para imágenes y plan Pro de pago." , edge: "cachety" },
      { criterion: "Rastreo", cachety: C.ads, other: "Cookies analíticas, como Google Analytics 4, solo si las aceptas. Dice no usar cookies de publicidad." },
      { criterion: "Tipo de marca de agua", cachety: C.watermark, other: "Dice ofrecer marcas de agua difíciles de quitar, incluso con IA. No detalla el diseño en sus textos legales." },
      { criterion: "Ocultar datos y contraseña", cachety: "Sí, las dos cosas.", other: "No lo documenta.", edge: "cachety" },
      { criterion: "Una copia por destinatario", cachety: C.recipients, other: "No lo documenta.", edge: "cachety" },
      { criterion: "Integración para empresas", cachety: "No hay API.", other: "Sí, Saferlayer Enterprise ofrece una API.", edge: "other" },
      { criterion: "Código abierto", cachety: C.openSource, other: "No lo indica.", edge: "cachety" },
    ],
    body: [
      { type: "h2", text: "La misma idea: no subir tu documento" },
      {
        type: "p",
        text: "Saferlayer y Cachety coinciden en lo más importante. Las dos ponen la marca de agua dentro de tu navegador, así que tu DNI no viaja a ningún servidor.",
      },
      {
        type: "p",
        text: "La diferencia está en lo que puedes hacer gratis. Saferlayer Free trabaja con imágenes; los PDF y los lotes son para su plan Pro, de pago y con cuenta. Cachety admite PDF, fotos del iPhone y otras imágenes sin pagar ni registrarte.",
      },
      { type: "h2", text: "En qué destaca Saferlayer" },
      {
        type: "list",
        items: [
          "Está muy enfocado en compartir documentos de identidad de forma segura.",
          "Ofrece una API para empresas que quieran integrar la marca de agua.",
          "Dice no usar cookies de publicidad.",
        ],
      },
      { type: "h2", text: "En qué destaca Cachety" },
      {
        type: "list",
        items: [
          "PDF gratis, varios archivos a la vez, y unir documentos en un solo PDF.",
          "Tapar datos y proteger con contraseña en el mismo paso.",
          "Una copia por destinatario con referencia única.",
          "Código abierto: cualquiera puede comprobar lo que hace.",
        ],
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Eres una empresa y necesitas una API para añadir marcas de agua desde tu propio sistema.",
      "Ya usas Saferlayer y solo marcas fotos de tu DNI.",
    ],
    chooseCachety: [
      "Quieres marcar PDF gratis y sin cuenta.",
      "Necesitas tapar datos, añadir contraseña o crear una copia por destinatario.",
      "Prefieres una herramienta de código abierto.",
    ],
    faq: [
      {
        q: "¿Saferlayer sube mi DNI?",
        a: "Según su aviso legal y su política de privacidad, las versiones Free y Pro procesan los archivos en tu navegador y no los envían a sus servidores. Solo su API para empresas procesa documentos en servidores.",
      },
      {
        q: "¿Saferlayer es gratis para PDF?",
        a: "No. Según sus condiciones, la versión gratuita solo trabaja con imágenes; los PDF son para el plan Pro, de pago. En Cachety los PDF son gratis.",
      },
      {
        q: "¿Qué texto pongo en la marca de agua del DNI?",
        a: "Uno que diga para qué es la copia, para quién y la fecha, por ejemplo: Solo para alquiler – Inmobiliaria Sol – 11/10/2026. Puedes ponerla con Saferlayer, con Cachety o con otra herramienta.",
      },
    ],
    sources: [
      { label: "Saferlayer: aviso legal", url: "https://saferlayer.com/legal/en-legal-notice" },
      { label: "Saferlayer: política de privacidad", url: "https://saferlayer.com/legal/en-privacy" },
      { label: "Saferlayer: política de cookies", url: "https://saferlayer.com/legal/en-cookies" },
      { label: "Saferlayer: página principal", url: "https://saferlayer.com/" },
    ],
    checked: CHECKED,
    updated: CHECKED,
  },
];
