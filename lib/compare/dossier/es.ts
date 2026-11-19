import type { Comparison } from "../types";

// Comparativas de la herramienta Dossier (es): unir PDF y fotos en un solo
// archivo y dejarlo por debajo de un límite de tamaño. Misma regla editorial
// que las demás comparativas (lib/compare/types.ts); cada entrada lleva
// tool: "dossier". Pensadas sobre todo para España. Solo texto plano.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
// Cada dato sobre otra herramienta sale de una página citada en `sources`,
// leída en la fecha `checked`. Los precios cambian a menudo: no se cita ninguno.
//
// La columna de Cachety describe la herramienta Dossier tal como se ha
// publicado (con secciones, enderezado de fotos y tamaño a medida): límites de
// lib/watermark.ts y lib/pages.ts, tamaños de lib/size-budget.ts y del bloque
// `dossier` de lib/locales/es/strings.ts, de donde salen también los textos
// citados («Un solo PDF», «Otro…»), comprobados el 2026-11-19. Hay que
// mantenerla al día con ellos. Lo que se dice de las demás herramientas es lo
// mismo que en la comparativa en inglés (lib/compare/dossier/en.ts), ni más ni menos.

const CHECKED = "2026-11-19";
const UPDATED = "2026-11-19";

/** Dirección de la herramienta, escrita sin esquema. */
const TOOL = "cachety.com/es/dossier";

// Texto común de la columna de Cachety.
const CACHETY = {
  where: "En tu navegador, en tu propio dispositivo. No se sube nada.",
  kept: "No se guarda nada: no hay ningún servidor que reciba tus archivos.",
  free: "Gratis, sin cuenta, sin versión de pago y sin límite diario. Hasta 200 MB por archivo, 500 páginas por PDF y 1.000 páginas en total.",
  pages: "Todas las páginas de todos los archivos en una sola cuadrícula: mueve una página, incluso de un archivo a otro, gírala o quítala. Un solo PDF, o un PDF por cada sección, con el nombre que le pongas.",
  size: "Eliges un tamaño máximo: 1, 2, 5 o 10 MB, o cualquier límite de 0,5 a 50 MB. Cachety te dice antes de descargar si el archivo cabrá y se seguirá leyendo bien.",
  output:
    "Cada página se rehace como una imagen. El texto no se puede seleccionar ni buscar, y un PDF que solo tiene texto puede salir más pesado.",
  hidden: "Se eliminan en todos los archivos: texto oculto, autor y demás propiedades, adjuntos, enlaces y la ubicación GPS de las fotos.",
  inputs: "PDF y fotos a la vez, incluidas las fotos HEIC del iPhone. La foto de una hoja se puede enderezar, recortar y blanquear. No admite archivos de Word, Excel ni PowerPoint.",
  offline: "Nada que instalar. La página sigue funcionando en modo avión una vez cargada, en el móvil o en el ordenador.",
  ads: "Sin anuncios ni rastreadores. El código es abierto.",
};

/** Fila «Opciones de unión» de la tabla, para las herramientas que tienen marcadores e índice. */
const MERGE_OPTIONS = "El orden de las páginas, y un PDF por sección si quieres varios archivos. Ni marcadores ni índice de contenidos.";

const PIXELS: Comparison["body"] = [
  { type: "h2", text: "Cómo es un archivo hecho con Cachety" },
  {
    type: "p",
    text: "Cachety no une tus páginas originales. Rehace cada página como una imagen y crea un PDF nuevo con esas imágenes. Así elimina lo que no se ve: el texto oculto, el nombre del autor, los adjuntos, los enlaces y la ubicación GPS de las fotos. El precio es real: el texto del nuevo archivo no se puede seleccionar ni buscar, y un PDF que solo tenía texto puede salir más pesado que el original, salvo que elijas un tamaño máximo.",
  },
  {
    type: "warning",
    text: "Cachety no es la herramienta adecuada cuando el texto debe poder seguir seleccionándose o buscándose, cuando necesitas conservar marcadores o campos de formulario, cuando quieres añadir archivos de Word o Excel, o cuando necesitas reconocimiento de texto (OCR) en un escaneo.",
  },
];

const HOW_TO: Comparison["body"] = [
  { type: "h2", text: "Cómo hacer un solo PDF con Cachety" },
  {
    type: "steps",
    items: [
      `Abre ${TOOL} en tu navegador, en el ordenador o en el móvil. No hay nada que instalar ni cuenta que crear.`,
      "Añade tus PDF y tus fotos. Cada foto se convierte en una página.",
      "Pasa a las páginas: arrástralas para ordenarlas, gira las que estén de lado y quita las que no quieras.",
      "Elige «Un solo PDF» y, si te han dado un límite de tamaño, elige 1, 2, 5 o 10 MB, u «Otro…» para otro límite.",
      "Revisa la vista previa, oculta cualquier dato que el destinatario no necesite y descarga el archivo.",
    ],
  },
];

const FAQ_UPLOADED = (other: string, answer: string) => ({
  q: `¿Se suben mis archivos con Cachety o con ${other}?`,
  a: `Con Cachety, no: el trabajo se hace en tu navegador y no hay ningún servidor que reciba tus archivos. ${answer}`,
});

const FAQ_TEXT = {
  q: "¿Se puede seguir seleccionando el texto después de unir con Cachety?",
  a: "No. Cachety rehace cada página como una imagen, lo que elimina los datos ocultos pero también el texto seleccionable. Si necesitas el texto, usa una herramienta que una las páginas originales.",
};

export const DOSSIER_COMPARISONS_ES: Comparison[] = [
  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-ilovepdf-merge",
    competitor: "ilovepdf-merge",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/",
    title: "Cachety o iLovePDF: unir y comprimir PDF sin subirlos",
    metaTitle: "Alternativa a iLovePDF para unir PDF sin subirlos",
    description:
      "iLovePDF une y comprime PDF en sus servidores. Cachety lo hace en tu navegador: no se sube nada y se eliminan los datos ocultos. Comparativa honesta.",
    intro:
      "iLovePDF es uno de los conjuntos de herramientas PDF online más usados, hecho en Barcelona. Sus herramientas para unir y comprimir procesan tus archivos en sus servidores. Cachety hace un trabajo más limitado en tu propio dispositivo: reúne PDF y fotos en un solo archivo, por debajo de un límite de tamaño, sin subirlos.",
    verdict:
      "iLovePDF hace más cosas: archivos de Office, reconocimiento de texto, muchos archivos a la vez y una aplicación de escritorio de pago que funciona sin conexión. Para eso, es mejor opción. Cachety es mejor opción cuando los archivos son documentos personales que prefieres no subir, cuando fotos y PDF tienen que ir en el mismo archivo, o cuando un formulario fija un límite de tamaño en megabytes.",
    table: [
      {
        criterion: "Dónde se procesan los archivos",
        cachety: CACHETY.where,
        other: "En los servidores de iLovePDF, en el caso de la web. La aplicación de escritorio, con un plan de pago, procesa los archivos en tu ordenador.",
        edge: "cachety",
      },
      {
        criterion: "Cuánto tiempo se guardan los archivos",
        cachety: CACHETY.kept,
        other: "Se borran automáticamente en las dos horas siguientes a su procesamiento. Un botón en la pantalla de descarga los borra antes.",
        edge: "cachety",
      },
      {
        criterion: "Cuenta, uso gratuito y límites",
        cachety: CACHETY.free,
        other: "Gratis sin registrarse, para un número limitado de documentos. Unir gratis: hasta 100 archivos y 300 MB por tarea. Comprimir gratis: 5 archivos por tarea. Un plan de pago amplía los límites.",
      },
      {
        criterion: "Ordenar las páginas",
        cachety: CACHETY.pages,
        other: "Al unir se reordenan archivos enteros. Otra herramienta, la de organizar PDF, ordena, elimina y gira páginas sueltas, y permite añadir más archivos y unirlos (gratis: 5 archivos, 100 MB).",
      },
      {
        criterion: "Quedar por debajo de un límite de tamaño",
        cachety: CACHETY.size,
        other: "Tres niveles de compresión: extrema, recomendada y baja. No hay un tamaño en megabytes al que apuntar.",
        edge: "cachety",
      },
      {
        criterion: "Fotos y PDF a la vez",
        cachety: CACHETY.inputs,
        other: "En dos pasos en la web: primero se convierten las imágenes a PDF y luego se une. Los archivos de Word, Excel y PowerPoint tienen sus propios conversores.",
      },
      {
        criterion: "Cómo es el nuevo PDF",
        cachety: CACHETY.output,
        other: "No se describe en la página de la herramienta de unir. Otra herramienta reconoce el texto (OCR) para que se pueda buscar en un escaneo.",
      },
      {
        criterion: "Datos ocultos",
        cachety: CACHETY.hidden,
        other: "No está documentado para las herramientas de la web. La aplicación de escritorio puede editar o borrar los metadatos de un PDF.",
      },
      {
        criterion: "Aplicaciones y uso sin conexión",
        cachety: CACHETY.offline,
        other: "Una aplicación de escritorio para Windows y Mac que funciona sin conexión: su nivel gratuito es un lector de PDF, y las herramientas requieren un plan de pago. Apps para iOS y Android.",
      },
      {
        criterion: "Anuncios y rastreadores",
        cachety: CACHETY.ads,
        other: "El plan gratuito muestra anuncios; el plan de pago los quita.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Una gran caja de herramientas online y una herramienta que se queda en tu dispositivo" },
      {
        type: "p",
        text: "En la web de iLovePDF, tus archivos se envían a sus servidores, se procesan allí y se borran automáticamente en un plazo de dos horas. Puedes borrarlos antes desde la pantalla de descarga. iLovePDF dice que tiene la certificación ISO/IEC 27001 y que transfiere los archivos por una conexión cifrada. La web está disponible en 26 idiomas.",
      },
      {
        type: "p",
        text: "Cachety solo prepara un archivo para enviar: los PDF y las fotos que te han pedido, en orden, en un solo PDF del tamaño adecuado. Todo ocurre en tu navegador. No se sube nada, así que no hay nada que borrar después.",
      },
      { type: "h2", text: "En qué es mejor iLovePDF" },
      {
        type: "list",
        items: [
          "Convierte archivos de Word, Excel y PowerPoint a PDF.",
          "Reconoce el texto de los escaneos (OCR), así que en un PDF escaneado se puede llegar a buscar texto.",
          "Admite trabajos grandes: hasta 100 archivos en una unión gratuita.",
          "Su aplicación de escritorio de pago procesa los archivos en tu ordenador, con la mayoría de las herramientas de la web.",
        ],
      },
      { type: "h2", text: "En qué es mejor Cachety" },
      {
        type: "list",
        items: [
          "Tus archivos no se suben nunca, gratis, tanto en el móvil como en el ordenador.",
          "Fotos y PDF van al mismo archivo en un solo paso, y las páginas sueltas se pueden mover, girar o quitar en el mismo sitio.",
          "Eliges un tamaño en megabytes, que es como los formularios online indican sus límites, y se te avisa antes de descargar si no se puede alcanzar sin que el archivo deje de leerse bien.",
          "Los datos ocultos se eliminan de todos los archivos, y no hay anuncios.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Necesitas convertir archivos de Word, Excel o PowerPoint, o reconocer el texto de un escaneo.",
      "Tienes muchos archivos o PDF muy grandes que procesar de una vez.",
      "Pagas iLovePDF y usas su aplicación de escritorio, que trabaja en tu ordenador.",
    ],
    chooseCachety: [
      "Los archivos son documentos de identidad, nóminas o extractos bancarios y prefieres no subirlos.",
      "Necesitas fotos y PDF en el mismo archivo, con las páginas en el orden que tú quieras.",
      "Un formulario pide un solo archivo, o un archivo por tipo de documento, por debajo de un límite de tamaño dado en megabytes.",
    ],
    faq: [
      FAQ_UPLOADED(
        "iLovePDF",
        "Con la web de iLovePDF, sí: los archivos se procesan en sus servidores y se borran en un plazo de dos horas. Su aplicación de escritorio procesa los archivos en tu ordenador, con un plan de pago."
      ),
      {
        q: "¿iLovePDF puede comprimir un PDF a un tamaño exacto?",
        a: "No. Ofrece tres niveles de compresión, y su propia guía dice que ninguna herramienta puede prometer un tamaño de salida exacto. Con Cachety eliges un tamaño máximo en megabytes, y se te avisa antes de descargar si el archivo no puede caber y seguir leyéndose bien.",
      },
      {
        q: "¿iLovePDF funciona sin conexión?",
        a: "Su aplicación de escritorio para Windows y Mac sí, pero las herramientas que incluye requieren un plan de pago. Cachety es una página web que sigue funcionando en modo avión una vez cargada, gratis.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "iLovePDF: unir PDF", url: "https://www.ilovepdf.com/merge_pdf" },
      { label: "iLovePDF: comprimir PDF", url: "https://www.ilovepdf.com/compress_pdf" },
      { label: "iLovePDF: precios y límites por herramienta", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF: seguridad", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF: preguntas y respuestas", url: "https://www.ilovepdf.com/help/faq" },
      { label: "iLovePDF Desktop", url: "https://www.ilovepdf.com/desktop" },
      { label: "Blog de iLovePDF: web, escritorio o móvil", url: "https://www.ilovepdf.com/blog/pdf-web-or-desktop" },
      { label: "Blog de iLovePDF: organizar las páginas de un PDF", url: "https://www.ilovepdf.com/blog/organize-pdf-pages" },
      { label: "Blog de iLovePDF: unir archivos PDF y JPG", url: "https://www.ilovepdf.com/blog/merge-pdf-and-jpg-files-online" },
      { label: "Blog de iLovePDF: comprimir un PDF a un tamaño concreto", url: "https://www.ilovepdf.com/blog/compress-pdf-to-specific-size" },
      {
        label: "Blog de iLovePDF: editar o eliminar los metadatos de un PDF",
        url: "https://www.ilovepdf.com/blog/edit-or-remove-pdf-metadata-windows-mac",
      },
      { label: "Blog de iLovePDF: 15 años de iLovePDF", url: "https://www.ilovepdf.com/blog/ilovepdf-15-years-anniversary-milestones" },
      { label: "Acerca de iLovePDF", url: "https://www.ilovepdf.com/help/about" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-smallpdf-merge",
    competitor: "smallpdf-merge",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/",
    title: "Cachety o Smallpdf: unir y comprimir PDF sin subirlos",
    metaTitle: "Alternativa a Smallpdf para unir PDF sin subirlos",
    description:
      "Smallpdf une y comprime PDF en la nube, con un límite diario gratuito. Cachety lo hace en tu navegador, gratis y sin subir nada. Comparativa honesta.",
    intro:
      "Smallpdf es un conocido conjunto de herramientas PDF online de Suiza, con apps para móviles y para Windows. Sus herramientas para unir y comprimir funcionan en la nube. Cachety hace un trabajo más limitado en tu propio dispositivo: reúne PDF y fotos en un solo archivo, por debajo de un límite de tamaño, sin subirlos.",
    verdict:
      "Smallpdf hace más cosas: admite archivos de Word, Excel y PowerPoint, reconoce el texto de los escaneos y tiene una aplicación para Windows que funciona sin conexión. Para eso, es mejor opción. Cachety es mejor opción cuando los archivos son documentos personales que prefieres no subir, cuando el límite diario del plan gratuito no te basta, o cuando un formulario fija un límite de tamaño en megabytes.",
    table: [
      {
        criterion: "Dónde se procesan los archivos",
        cachety: CACHETY.where,
        other: "En la nube. Los archivos se suben a servidores situados en la Unión Europea. La aplicación de escritorio para Windows trabaja con los archivos sin conexión.",
        edge: "cachety",
      },
      {
        criterion: "Cuánto tiempo se guardan los archivos",
        cachety: CACHETY.kept,
        other: "Según las páginas de producto de Smallpdf, se borran de los servidores al cabo de una hora, salvo que los guardes en tu cuenta.",
        edge: "cachety",
      },
      {
        criterion: "Cuenta, uso gratuito y límites",
        cachety: CACHETY.free,
        other: "No hace falta registrarse. El uso gratuito tiene un límite diario de descargas y un límite de tamaño de archivo; un plan de pago los quita.",
        edge: "cachety",
      },
      {
        criterion: "Ordenar las páginas",
        cachety: CACHETY.pages,
        other: "La herramienta de unir puede mostrar las páginas de todos los archivos para reordenarlas, girarlas o eliminarlas; la página de precios de Smallpdf incluye esa vista de páginas en el plan de pago. La herramienta de organizar reordena, gira, elimina y añade páginas, y puede combinar varios documentos.",
      },
      {
        criterion: "Quedar por debajo de un límite de tamaño",
        cachety: CACHETY.size,
        other: "Niveles de compresión, no un tamaño en megabytes. La compresión básica es gratuita; los niveles más fuertes forman parte del plan de pago.",
        edge: "cachety",
      },
      {
        criterion: "Tipos de archivo admitidos",
        cachety: CACHETY.inputs,
        other: "PDF, Word, Excel, PowerPoint, JPG y PNG en la herramienta de unir: los demás archivos se convierten antes a PDF. Fotos HEIC en la herramienta de JPG a PDF.",
        edge: "other",
      },
      {
        criterion: "Cómo es el nuevo PDF",
        cachety: CACHETY.output,
        other: "No se describe en la página de la herramienta de unir. El reconocimiento de texto (OCR) se ofrece como herramienta aparte.",
      },
      {
        criterion: "Datos ocultos",
        cachety: CACHETY.hidden,
        other: "No se describe para la herramienta de unir. El blog de Smallpdf dice que sus herramientas de comprimir y de aplanar (Compress, Flatten) eliminan los metadatos, como paso aparte.",
      },
      {
        criterion: "Aplicaciones y uso sin conexión",
        cachety: CACHETY.offline,
        other: "Apps para iOS y Android, y una aplicación de escritorio para Windows que funciona sin conexión. La aplicación de escritorio para Mac ya no tiene soporte.",
      },
    ],
    body: [
      { type: "h2", text: "Una caja de herramientas en la nube y una herramienta que se queda en tu dispositivo" },
      {
        type: "p",
        text: "Smallpdf describe sus herramientas para unir y comprimir como basadas en la nube: tus archivos se suben, se procesan en sus servidores y se borran al cabo de una hora, salvo que los guardes en tu cuenta. Smallpdf dice que tiene la certificación ISO/IEC 27001 y que usa cifrado TLS durante la transferencia de archivos. Sus herramientas están disponibles en 24 idiomas.",
      },
      {
        type: "p",
        text: "Aquí Cachety tiene una sola tarea: convertir los PDF y las fotos que te han pedido en un solo archivo limpio y del tamaño adecuado. Todo ocurre en tu navegador. No se sube nada, así que no hay nada que borrar después.",
      },
      { type: "h2", text: "En qué es mejor Smallpdf" },
      {
        type: "list",
        items: [
          "Convierte archivos de Word, Excel y PowerPoint a PDF y los une de una vez.",
          "Ofrece reconocimiento de texto (OCR), así que en un escaneo se puede llegar a buscar texto.",
          "Tiene apps para móvil con escáner, y una aplicación para Windows que trabaja con los archivos sin conexión.",
          "Una cuenta te permite guardar tus documentos online y encontrarlos en otro dispositivo.",
        ],
      },
      { type: "h2", text: "En qué es mejor Cachety" },
      {
        type: "list",
        items: [
          "Tus archivos no se suben nunca, tanto en el móvil como en el ordenador, y sin instalar nada.",
          "No hay límite diario ni plan de pago.",
          "Eliges un tamaño en megabytes, que es como los formularios online indican sus límites, y se te avisa antes de descargar si no se puede alcanzar sin que el archivo deje de leerse bien.",
          "Los datos ocultos se eliminan de todos los archivos, sin un paso aparte.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Necesitas añadir archivos de Word, Excel o PowerPoint al PDF unido.",
      "Necesitas que se reconozca el texto de un escaneo (OCR).",
      "Usas Windows y quieres una aplicación instalada que funcione sin conexión.",
      "Quieres guardar tus documentos en una cuenta online.",
    ],
    chooseCachety: [
      "Los archivos son documentos de identidad, nóminas o extractos bancarios y prefieres no subirlos.",
      "Un formulario pide un solo archivo, o un archivo por tipo de documento, por debajo de un límite de tamaño dado en megabytes.",
      "Estás con el móvil y no quieres instalar una app ni crear una cuenta.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Smallpdf",
        "Con las herramientas online de Smallpdf, sí: los archivos se suben a sus servidores y, según sus páginas de producto, se borran al cabo de una hora, salvo que los guardes en tu cuenta. Su aplicación de escritorio para Windows trabaja con los archivos sin conexión."
      ),
      {
        q: "¿Smallpdf puede comprimir un PDF a un tamaño exacto?",
        a: "No. Smallpdf ofrece niveles de compresión, y su propio blog dice que la herramienta no permite introducir un tamaño exacto. Con Cachety eliges un tamaño máximo en megabytes, y el archivo queda por debajo cuando es posible sin que deje de leerse bien.",
      },
      {
        q: "¿Smallpdf es gratis?",
        a: "En parte. Unir y la compresión básica son gratis, con un límite diario de descargas; la compresión más fuerte y el uso ilimitado forman parte del plan de pago. Cachety es gratis, sin límite diario y sin plan de pago.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Smallpdf: unir PDF", url: "https://smallpdf.com/merge-pdf" },
      { label: "Smallpdf: comprimir PDF", url: "https://smallpdf.com/compress-pdf" },
      { label: "Smallpdf: organizar PDF", url: "https://smallpdf.com/organize-pdf" },
      { label: "Smallpdf: JPG a PDF", url: "https://smallpdf.com/jpg-to-pdf" },
      { label: "Smallpdf: precios y comparación de planes", url: "https://smallpdf.com/pricing" },
      { label: "Smallpdf: aviso de privacidad", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf: Trust Center", url: "https://smallpdf.com/trust-center" },
      { label: "Smallpdf: apps y extensiones", url: "https://smallpdf.com/download" },
      { label: "Blog de Smallpdf: comprimir un PDF a un tamaño elegido", url: "https://smallpdf.com/blog/compress-pdf-to-chosen-size" },
      { label: "Blog de Smallpdf: eliminar los metadatos de un PDF", url: "https://smallpdf.com/blog/ways-to-remove-pdf-metadata" },
      { label: "Acerca de Smallpdf", url: "https://smallpdf.com/about" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ─────────────────────────── Adobe Acrobat ───────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-adobe-merge",
    competitor: "adobe-merge",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/acrobat/online.html",
    title: "Cachety o Adobe Acrobat online: unir y comprimir PDF",
    metaTitle: "Alternativa a Adobe Acrobat para unir PDF sin subirlos",
    description:
      "Las herramientas online gratuitas de Adobe unen y comprimen PDF en sus servidores. Cachety lo hace en tu navegador, sin subir nada y sin iniciar sesión.",
    intro:
      "Adobe inventó el PDF, y sus herramientas online gratuitas de Acrobat unen y comprimen PDF en cualquier navegador. Los archivos se tratan en los servidores de Adobe. Cachety hace un trabajo más limitado en tu propio dispositivo: reúne PDF y fotos en un solo archivo, por debajo de un límite de tamaño, sin subirlos.",
    verdict:
      "Para los PDF cuyo texto debe quedar tal cual, la unión de Adobe es mejor opción: combina los archivos sin reducir la calidad de las imágenes, el texto ni el formato, y admite hasta 100 archivos. Su aplicación de escritorio de pago hace mucho más que Cachety. Cachety es mejor opción para documentos personales que prefieres no subir, para mezclar fotos y PDF en un solo paso, y para cumplir un límite de tamaño dado en megabytes.",
    table: [
      {
        criterion: "Dónde se procesan los archivos",
        cachety: CACHETY.where,
        other: "En los servidores de Adobe, en el caso de las herramientas online. La aplicación de escritorio de Acrobat comprime los archivos en local, en tu dispositivo.",
        edge: "cachety",
      },
      {
        criterion: "Cuánto tiempo se guardan los archivos",
        cachety: CACHETY.kept,
        other: "Se borran de los servidores de Adobe salvo que inicies sesión para guardarlos en tu cuenta. Puedes borrar tú mismo un archivo después de descargarlo.",
        edge: "cachety",
      },
      {
        criterion: "Cuenta, uso gratuito y límites",
        cachety: CACHETY.free,
        other: "Unir: hasta 100 archivos de 500 páginas cada uno y 1.500 páginas en el archivo unido, sin marca de agua. Comprimir: gratis con uso limitado; el uso ilimitado requiere un plan de pago.",
      },
      {
        criterion: "Ordenar las páginas",
        cachety: CACHETY.pages,
        other: "Los archivos se pueden reordenar antes de unirlos. Reorganizar páginas sueltas exige iniciar sesión; basta una cuenta gratuita.",
        edge: "cachety",
      },
      {
        criterion: "Quedar por debajo de un límite de tamaño",
        cachety: CACHETY.size,
        other: "Tres niveles de compresión: alto, medio y bajo. Archivos de hasta 2 GB.",
      },
      {
        criterion: "Fotos y otros tipos de archivo",
        cachety: CACHETY.inputs,
        other: "La unión gratuita admite PDF. Combinar PDF con archivos de Word, Excel, PowerPoint o de imagen forma parte de Acrobat Pro. Otras herramientas gratuitas convierten imágenes, incluidas las fotos HEIC, en un PDF, para un número limitado de conversiones.",
      },
      {
        criterion: "Cómo es el nuevo PDF",
        cachety: CACHETY.output,
        other: "Los archivos se combinan sin comprimir ni reducir la calidad de las imágenes, el texto o el formato.",
        edge: "other",
      },
      {
        criterion: "Datos ocultos",
        cachety: CACHETY.hidden,
        other: "Eliminar la información oculta («sanitize») y tachar contenido son funciones de Acrobat Pro, de pago.",
        edge: "cachety",
      },
      {
        criterion: "Aplicaciones y uso sin conexión",
        cachety: CACHETY.offline,
        other: "El Acrobat Reader gratuito permite ver, anotar, rellenar y firmar. Editar, convertir y comprimir están en la aplicación de escritorio de pago. La app para móvil Adobe Scan guarda los escaneos en el almacenamiento en la nube de Adobe.",
      },
    ],
    body: [
      { type: "h2", text: "La referencia del PDF y una herramienta pequeña para una sola tarea" },
      {
        type: "p",
        text: "Adobe ofrece más de 25 herramientas online gratuitas. La de unir PDF admite hasta 100 archivos y los combina sin cambiar su calidad. La de comprimir PDF ofrece tres niveles. Las dos envían tus archivos a los servidores de Adobe, donde se borran salvo que inicies sesión para guardarlos. Adobe dice que los archivos se cifran en tránsito y en reposo, y cita ISO 27001 y SOC 2 entre sus certificaciones para Acrobat en la web.",
      },
      {
        type: "p",
        text: "Cachety solo prepara un archivo para enviar: los PDF y las fotos que te han pedido, en orden, en un solo PDF del tamaño adecuado. Todo ocurre en tu navegador, sin iniciar sesión en ningún paso.",
      },
      { type: "h2", text: "En qué es mejor Adobe Acrobat" },
      {
        type: "list",
        items: [
          "El PDF unido conserva la calidad del texto, las imágenes y el formato originales.",
          "Admite trabajos grandes: hasta 100 archivos en una unión, y archivos de hasta 2 GB en el compresor.",
          "La aplicación de escritorio de pago edita texto e imágenes, convierte archivos, comprime y tacha contenido.",
          "Si ya pagas Acrobat, lo tienes todo en un mismo sitio, con tus archivos en tu cuenta de Adobe.",
        ],
      },
      { type: "h2", text: "En qué es mejor Cachety" },
      {
        type: "list",
        items: [
          "Tus archivos no se suben nunca, y no hay que iniciar sesión en ningún momento.",
          "Mover, girar y quitar páginas sueltas es gratis y no requiere cuenta.",
          "Fotos y PDF van al mismo archivo en un solo paso. Con las herramientas gratuitas de Adobe, primero conviertes las fotos a PDF y luego unes.",
          "Los datos ocultos se eliminan de todos los archivos, una función que Adobe reserva a su plan Pro de pago.",
          "Eliges un tamaño en megabytes y se te dice antes de descargar si se puede alcanzar.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "El texto del PDF unido debe poder seguir seleccionándose y buscándose.",
      "Tienes decenas de archivos o PDF muy grandes que combinar.",
      "Ya pagas Acrobat, o además necesitas editar, convertir o reconocer texto.",
    ],
    chooseCachety: [
      "Los archivos son documentos de identidad, nóminas o extractos bancarios y prefieres no subirlos.",
      "Quieres reordenar, girar o quitar páginas sin iniciar sesión.",
      "Necesitas mezclar fotos y PDF, y que el resultado quede por debajo de un límite de tamaño dado en megabytes.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Adobe Acrobat",
        "Con las herramientas online de Adobe, sí: los archivos se tratan en los servidores de Adobe y se borran salvo que inicies sesión para guardarlos. La aplicación de escritorio de Acrobat trabaja en tu propio dispositivo."
      ),
      {
        q: "¿Necesito una cuenta de Adobe para unir PDF?",
        a: "Para unir y descargar, no. Adobe te pide iniciar sesión para reorganizar páginas sueltas o para compartir el archivo con un enlace. En Cachety no hay ninguna cuenta.",
      },
      {
        q: "¿Acrobat online puede eliminar los metadatos de un PDF?",
        a: "Eliminar la información oculta es una función de Acrobat Pro, de pago. Cachety elimina los datos ocultos de todos los archivos que crea, rehaciendo las páginas como imágenes.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Adobe Acrobat: herramientas online gratuitas", url: "https://www.adobe.com/acrobat/online.html" },
      { label: "Adobe Acrobat: unir PDF", url: "https://www.adobe.com/acrobat/online/merge-pdf.html" },
      { label: "Adobe Acrobat: comprimir PDF", url: "https://www.adobe.com/acrobat/online/compress-pdf.html" },
      { label: "Adobe Acrobat: JPG a PDF", url: "https://www.adobe.com/acrobat/online/jpg-to-pdf.html" },
      { label: "Adobe Acrobat: imagen a PDF", url: "https://www.adobe.com/acrobat/online/image-to-pdf.html" },
      { label: "Adobe Acrobat: HEIC a PDF", url: "https://acrobat.adobe.com/heic-to-pdf" },
      { label: "Adobe Acrobat: reordenar páginas de un PDF", url: "https://www.adobe.com/acrobat/online/rearrange-pdf.html" },
      { label: "Adobe Acrobat: eliminar páginas de un PDF", url: "https://www.adobe.com/acrobat/online/delete-pdf-pages.html" },
      { label: "Adobe Acrobat Reader", url: "https://www.adobe.com/acrobat/pdf-reader.html" },
      { label: "Adobe Acrobat: comparación de planes", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
      { label: "Adobe Scan", url: "https://www.adobe.com/acrobat/mobile/scanner-app.html" },
      {
        label: "Adobe Acrobat Services: resumen de seguridad",
        url: "https://www.adobe.com/cc-shared/assets/pdf/trust-center/ungated/whitepapers/doc-cloud/acrobat-dc-security-overview-ue.pdf",
      },
      { label: "Adobe: lista de certificaciones de cumplimiento", url: "https://www.adobe.com/trust/compliance/compliance-list.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ────────────────────────────── PDF24 ──────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-pdf24-merge",
    competitor: "pdf24-merge",
    competitorName: "PDF24",
    competitorUrl: "https://tools.pdf24.org/",
    title: "Cachety o PDF24: unir y comprimir PDF sin subirlos",
    metaTitle: "Alternativa a PDF24 para unir PDF sin subirlos",
    description:
      "PDF24 une y comprime PDF online en sus servidores; su programa para Windows funciona sin conexión. Cachety funciona en cualquier navegador, sin subir nada.",
    intro:
      "PDF24 es un conjunto alemán y gratuito de herramientas PDF. Sus herramientas online procesan los archivos en los servidores de PDF24, y su programa para Windows, PDF24 Creator, hace el mismo trabajo en tu PC. Cachety funciona en el navegador de cualquier dispositivo y no sube nunca tus archivos, pero hace un trabajo más limitado.",
    verdict:
      "En un ordenador con Windows, PDF24 Creator es difícil de superar: es gratis, funciona sin conexión y une las páginas originales, así que el texto queda como estaba. En un móvil, un Mac o un ordenador donde no puedes instalar nada, PDF24 significa sus herramientas online, que suben tus archivos. Ahí, Cachety es mejor opción para documentos personales, y te deja elegir un tamaño en megabytes.",
    table: [
      {
        criterion: "Dónde se procesan los archivos",
        cachety: CACHETY.where,
        other: "Herramientas online: en la nube, en los servidores de PDF24. PDF24 Creator (Windows): en tu PC, sin subir nada.",
      },
      {
        criterion: "Cuánto tiempo se guardan los archivos",
        cachety: CACHETY.kept,
        other: "Online: se borran automáticamente al cabo de una hora. También se pueden borrar a mano de inmediato.",
        edge: "cachety",
      },
      {
        criterion: "Cuenta, uso gratuito y límites",
        cachety: CACHETY.free,
        other: "Gratis y sin restricciones, sin registro. Online, un archivo puede pesar hasta 1.000 MB y un trabajo hasta 10 GB.",
      },
      {
        criterion: "Ordenar las páginas",
        cachety: CACHETY.pages,
        other: "Los archivos se reordenan arrastrando y soltando. Un modo de páginas muestra las páginas de todos los archivos: eliges las que quieres y las arrastras hasta ordenarlas, y dejas fuera las demás. Girar páginas es una herramienta aparte.",
      },
      {
        criterion: "Quedar por debajo de un límite de tamaño",
        cachety: CACHETY.size,
        other: "Tú fijas la resolución (DPI) y la calidad de imagen, con una opción de escala de grises. No hay una opción de «comprimir a 5 MB».",
        edge: "cachety",
      },
      {
        criterion: "Tipos de archivo admitidos",
        cachety: CACHETY.inputs,
        other: "PDF, imágenes, documentos de Word y otros archivos. Las fotos HEIC del iPhone no se admiten en la herramienta de unir.",
      },
      {
        criterion: "Cómo es el nuevo PDF",
        cachety: CACHETY.output,
        other: "Las páginas se toman tal cual, no se recrean: el texto, las imágenes y las fuentes conservan su calidad.",
        edge: "other",
      },
      {
        criterion: "Datos ocultos",
        cachety: CACHETY.hidden,
        other: "Una herramienta aparte elimina los metadatos de un PDF. La herramienta de comprimir también puede quitar metadatos, adjuntos y anotaciones.",
      },
      {
        criterion: "Opciones de unión",
        cachety: MERGE_OPTIONS,
        other: "Marcadores, un índice de contenidos, una portada antes de cada archivo, páginas en blanco para imprimir a doble cara, el nombre del archivo en las páginas.",
        edge: "other",
      },
      {
        criterion: "Aplicaciones y uso sin conexión",
        cachety: CACHETY.offline,
        other: "PDF24 Creator ofrece todas las herramientas sin conexión, solo en Windows. Todavía no hay versión para Mac ni para Linux, ni app en las tiendas de aplicaciones para móviles: las herramientas online se pueden añadir a la pantalla de inicio del móvil, pero siguen necesitando conexión.",
      },
      {
        criterion: "Anuncios y rastreadores",
        cachety: CACHETY.ads,
        other: "Las herramientas online se financian con publicidad. La política de privacidad menciona Google AdSense y Google Analytics, entre otros.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Dos formas de usar PDF24" },
      {
        type: "p",
        text: "Las herramientas online de PDF24 son gratuitas, no requieren registro y se pagan con publicidad. Procesan tus archivos en los servidores de PDF24: la transferencia va cifrada y los archivos se borran al cabo de una hora. PDF24 lo gestiona una empresa con sede en Berlín.",
      },
      {
        type: "p",
        text: "PDF24 Creator es otra cosa. Es un programa gratuito para Windows que lleva todas las herramientas de PDF24 a tu PC, donde los archivos se quedan en local y no se suben. Si usas Windows y puedes instalar programas, te da la privacidad de Cachety y más funciones.",
      },
      { type: "h2", text: "En qué es mejor PDF24" },
      {
        type: "list",
        items: [
          "El PDF unido conserva las páginas originales tal cual: el texto, las imágenes y las fuentes mantienen su calidad.",
          "Opciones de unión que Cachety no tiene: marcadores, un índice de contenidos, portadas, páginas en blanco para imprimir a doble cara.",
          "Admite documentos de Word y otros archivos, y ofrece reconocimiento de texto (OCR).",
          "En Windows, PDF24 Creator hace todo esto sin conexión y gratis.",
          "Puedes fijar tú mismo la resolución y la calidad de imagen de la compresión.",
        ],
      },
      { type: "h2", text: "En qué es mejor Cachety" },
      {
        type: "list",
        items: [
          "Sin subir nada en ningún dispositivo: un móvil, un Mac, un ordenador con Linux o un PC donde no puedes instalar programas.",
          "Eliges un tamaño en megabytes en lugar de probar ajustes hasta que el archivo pese lo bastante poco.",
          "Las fotos HEIC del iPhone se admiten tal cual.",
          "Los datos ocultos se eliminan de todos los archivos sin un paso aparte.",
          "Sin anuncios ni rastreadores.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Usas Windows y puedes instalar PDF24 Creator: funciona sin conexión y conserva las páginas originales.",
      "El texto del PDF unido debe poder seguir seleccionándose y buscándose.",
      "Necesitas añadir documentos de Word o reconocer el texto de un escaneo.",
      "Quieres fijar tú mismo la resolución y la calidad de imagen.",
    ],
    chooseCachety: [
      "Estás con un móvil, un Mac o un ordenador donde no puedes instalar programas, y prefieres no subir tus documentos.",
      "Un formulario pide un solo archivo, o un archivo por tipo de documento, por debajo de un límite de tamaño dado en megabytes.",
      "Tus fotos vienen de un iPhone.",
    ],
    faq: [
      FAQ_UPLOADED(
        "PDF24",
        "Con las herramientas online de PDF24, sí: los archivos se procesan en sus servidores y se borran al cabo de una hora. Con PDF24 Creator en Windows, no: los archivos se quedan en tu PC."
      ),
      {
        q: "¿PDF24 puede comprimir un PDF a un tamaño determinado?",
        a: "Directamente, no. Tú fijas la resolución y la calidad de imagen, y la propia guía de PDF24 dice que no hay una opción de «comprimir a 5 MB». Con Cachety eliges un tamaño máximo en megabytes, y el archivo queda por debajo cuando es posible sin que deje de leerse bien.",
      },
      {
        q: "¿PDF24 funciona sin conexión en un Mac o en un móvil?",
        a: "No. PDF24 Creator es solo para Windows. En un Mac o en un móvil, PDF24 ofrece sus herramientas online, que procesan los archivos en sus servidores. Cachety funciona en el navegador de cualquier dispositivo sin subir nada.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "PDF24 Tools: unir PDF", url: "https://tools.pdf24.org/en/merge-pdf" },
      { label: "PDF24 Tools: comprimir PDF", url: "https://tools.pdf24.org/en/compress-pdf" },
      { label: "PDF24 Tools: imágenes a PDF", url: "https://tools.pdf24.org/en/images-to-pdf" },
      { label: "PDF24 Tools: eliminar los metadatos de un PDF", url: "https://tools.pdf24.org/en/remove-pdf-metadata" },
      { label: "PDF24 Tools: girar las páginas de un PDF", url: "https://tools.pdf24.org/en/rotate-pdf" },
      { label: "PDF24 Tools: preguntas y respuestas", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24 Creator", url: "https://tools.pdf24.org/en/creator" },
      { label: "Ayuda de PDF24: unir archivos PDF", url: "https://help.pdf24.org/en/how-to-merge-pdf-files-with-pdf24/" },
      { label: "Ayuda de PDF24: comprimir un PDF", url: "https://help.pdf24.org/en/compress-pdf-guide/" },
      { label: "Ayuda de PDF24: Mac, Linux y móviles", url: "https://help.pdf24.org/en/pdf24-for-mac-linux-portable/" },
      { label: "PDF24: política de privacidad", url: "https://www.pdf24.org/en/privacy-policy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ────────────────────────────── Sejda ──────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-sejda-merge",
    competitor: "sejda-merge",
    competitorName: "Sejda",
    competitorUrl: "https://www.sejda.com/",
    title: "Cachety o Sejda: unir y comprimir PDF sin subirlos",
    metaTitle: "Alternativa a Sejda para unir PDF sin subirlos",
    description:
      "Sejda une y comprime PDF online, o en tu ordenador con su aplicación de escritorio, con límites gratuitos. Cachety funciona en tu navegador sin subir nada.",
    intro:
      "Sejda es una caja de herramientas PDF neerlandesa con dos caras: herramientas online que procesan los archivos en sus servidores, y Sejda Desktop, una aplicación para Mac, Windows y Linux que los procesa en tu ordenador. Las dos tienen límites gratuitos. Cachety funciona en el navegador de cualquier dispositivo, no sube nada y no tiene esos límites, pero hace un trabajo más limitado.",
    verdict:
      "La unión de Sejda es más completa: conserva los marcadores, crea un índice de contenidos y puede imprimir el nombre del archivo al pie de las páginas. Sejda Desktop mantiene los archivos en tu ordenador. Elígelo cuando necesites esas opciones. Elige Cachety para documentos personales en el móvil o sin instalar nada, para archivos que superan los límites gratuitos de Sejda, y para un límite de tamaño dado en megabytes.",
    table: [
      {
        criterion: "Dónde se procesan los archivos",
        cachety: CACHETY.where,
        other: "Online: se suben y se procesan en los servidores de Sejda. Sejda Desktop: en tu ordenador, sin subirlos.",
      },
      {
        criterion: "Cuánto tiempo se guardan los archivos",
        cachety: CACHETY.kept,
        other: "Online: se borran automáticamente al cabo de 2 horas. La página de resultado tiene un botón para borrar los archivos («Delete files»).",
        edge: "cachety",
      },
      {
        criterion: "Cuenta, uso gratuito y límites",
        cachety: CACHETY.free,
        other: "Sin registro. Unir gratis online: hasta 50 páginas o 50 MB, 3 tareas por hora. Comprimir gratis: hasta 200 páginas o 100 MB. Escritorio gratis: 3 tareas al día, con documentos de hasta 50 MB y 200 páginas. Un plan de pago quita los límites de páginas y de tareas por hora; entonces se pueden subir archivos de hasta 500 MB.",
        edge: "cachety",
      },
      {
        criterion: "Ordenar las páginas",
        cachety: CACHETY.pages,
        other: "Los archivos se reordenan arrastrando y soltando. Una vista de páginas permite eliminar, reordenar y duplicar páginas antes de unir.",
      },
      {
        criterion: "Quedar por debajo de un límite de tamaño",
        cachety: CACHETY.size,
        other: "Ajustes de calidad de imagen y de resolución, con una opción de escala de grises. No hay un tamaño en megabytes al que apuntar.",
        edge: "cachety",
      },
      {
        criterion: "Tipos de archivo admitidos",
        cachety: CACHETY.inputs,
        other: "PDF e imágenes como JPG y PNG en la herramienta de unir. Las imágenes HEIC no se admiten.",
      },
      {
        criterion: "Opciones de unión",
        cachety: MERGE_OPTIONS,
        other: "Marcadores conservados o creados por archivo, un índice de contenidos, páginas en blanco para imprimir a doble cara, el nombre del archivo en el pie de página.",
        edge: "other",
      },
      {
        criterion: "Datos ocultos",
        cachety: CACHETY.hidden,
        other: "Una herramienta aparte edita los metadatos de un PDF o los elimina todos.",
      },
      {
        criterion: "Aplicaciones y uso sin conexión",
        cachety: CACHETY.offline,
        other: "Sejda Desktop para Mac, Windows y Linux funciona sin conexión, con las mismas funciones que el servicio online.",
      },
    ],
    body: [
      { type: "h2", text: "Online o en tu ordenador: Sejda ofrece las dos cosas" },
      {
        type: "p",
        text: "En la web de Sejda, subes tus documentos y se procesan en sus servidores. Sejda dice que los archivos se cifran en tránsito y en reposo, y que se borran automáticamente al cabo de dos horas. El servicio gratuito está limitado por páginas, megabytes y tareas por hora.",
      },
      {
        type: "p",
        text: "Sejda Desktop procesa los archivos en tu ordenador, sin subirlos, en Mac, Windows y Linux. Su versión gratuita permite tres tareas al día, con documentos de hasta 50 MB y 200 páginas, y uniones de hasta 30 archivos y 50 páginas. Un detalle importa para los documentos personales: las condiciones del servicio de Sejda dicen que los usuarios no deben enviar a su servicio online información personal sensible, como números de identificación oficiales.",
      },
      { type: "h2", text: "En qué es mejor Sejda" },
      {
        type: "list",
        items: [
          "Opciones de unión que Cachety no tiene: marcadores, un índice de contenidos, páginas en blanco para imprimir a doble cara.",
          "Una aplicación de escritorio para Mac, Windows y Linux que mantiene los archivos en tu ordenador.",
          "Muchas otras herramientas en el mismo sitio: reconocimiento de texto (OCR), recorte y enderezado de las páginas de un PDF, edición.",
          "Puede tomar los archivos directamente de Dropbox, Google Drive o OneDrive.",
          "Control fino de la compresión, con ajustes de calidad de imagen y de resolución.",
        ],
      },
      { type: "h2", text: "En qué es mejor Cachety" },
      {
        type: "list",
        items: [
          "No se sube nada ni se instala nada, tanto en el móvil como en el ordenador.",
          "Sin el límite de 50 páginas y sin tope de tareas por hora ni por día: un archivo de 60 páginas o un cuarto archivo en la misma hora no son un problema.",
          "Eliges un tamaño en megabytes y se te dice antes de descargar si se puede alcanzar.",
          "Las fotos HEIC del iPhone se admiten tal cual, y los datos ocultos se eliminan de todos los archivos.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Necesitas marcadores o un índice de contenidos en el PDF unido.",
      "Puedes instalar Sejda Desktop y tu trabajo cabe en sus límites gratuitos, o tienes un plan de pago.",
      "Necesitas reconocimiento de texto, o recortar o enderezar las páginas de un PDF escaneado: Cachety solo lo hace con fotos.",
    ],
    chooseCachety: [
      "Los archivos son documentos de identidad, nóminas o extractos bancarios, y estás con el móvil o no puedes instalar programas.",
      "Tu archivo tiene más de 50 páginas, o tienes varios archivos que preparar en la misma hora.",
      "Un formulario pide un solo archivo, o un archivo por tipo de documento, por debajo de un límite de tamaño dado en megabytes.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Sejda",
        "Con las herramientas online de Sejda, sí: los archivos se suben a sus servidores y se borran al cabo de dos horas. Con Sejda Desktop, no: los archivos se procesan en tu ordenador."
      ),
      {
        q: "¿Cuáles son los límites gratuitos de Sejda para unir?",
        a: "Online, documentos de hasta 50 páginas o 50 MB y tres tareas por hora. La versión gratuita de Sejda Desktop permite tres tareas al día, con documentos de hasta 50 MB y 200 páginas. Cachety no tiene esos límites: hasta 1.000 páginas en un solo archivo.",
      },
      {
        q: "¿Sejda puede comprimir un PDF a un tamaño determinado?",
        a: "Su herramienta de comprimir ofrece ajustes de calidad de imagen y de resolución, no un tamaño al que apuntar. Con Cachety eliges un tamaño máximo en megabytes, y el archivo queda por debajo cuando es posible sin que deje de leerse bien.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Sejda: unir PDF", url: "https://www.sejda.com/merge-pdf" },
      { label: "Sejda: comprimir PDF", url: "https://www.sejda.com/compress-pdf" },
      { label: "Sejda: JPG a PDF", url: "https://www.sejda.com/jpg-to-pdf" },
      { label: "Sejda: organizar las páginas de un PDF", url: "https://www.sejda.com/organize-pdf" },
      { label: "Sejda: editar los metadatos de un PDF", url: "https://www.sejda.com/edit-pdf-metadata" },
      { label: "Sejda: planes y preguntas", url: "https://www.sejda.com/upgrade" },
      { label: "Sejda: página de resultado", url: "https://www.sejda.com/result" },
      { label: "Sejda Desktop", url: "https://www.sejda.com/desktop" },
      { label: "Seguridad en Sejda", url: "https://www.sejda.com/security" },
      { label: "Sejda: política de privacidad", url: "https://www.sejda.com/privacy" },
      { label: "Sejda: condiciones del servicio", url: "https://www.sejda.com/terms" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
