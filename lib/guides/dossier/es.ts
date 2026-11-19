// Guías de la herramienta Dossier (es): unir PDF, pasar fotos a PDF, ordenar
// y girar páginas, eliminar datos ocultos. Cada entrada lleva tool: "dossier".
// Pensadas sobre todo para España. Solo texto plano: sin enlaces, sin HTML,
// sin markdown. Empresas y nombres de ejemplo inventados.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
//
// Estas guías describen la herramienta Dossier (docs/prd-dossier.md) tal como
// se ha publicado, con secciones, enderezado de fotos y tamaño a medida. Los
// textos citados («Un solo PDF», «Un PDF por sección», «Separar en varios
// archivos», «Nueva sección aquí», «Enderezar y recortar», «Aplicar»,
// «Blanquear el fondo», «Blanco y negro», «Aplicar a todas las fotos»,
// «Otro…», «Deshacer», «Recuperar sus páginas») son los del bloque `dossier`
// de lib/locales/es/strings.ts, comprobados el 2026-11-19: hay que mantenerlos
// al día.

import type { Guide } from "../types";

const UPDATED = "2026-11-19";

/** Dirección de la herramienta, escrita sin esquema (las guías no llevan enlaces). */
const TOOL = "cachety.com/es/dossier";

const NOT_UPLOADED =
  "Cachety funciona dentro de tu navegador. No hay ningún servidor que reciba tus archivos, y la página prohíbe a tu navegador contactar con cualquier otra web. Compruébalo tú mismo: carga la página, activa el modo avión y sigue funcionando. Es gratis, sin cuenta, y el código es abierto.";

const PIXELS =
  "Para eliminar los datos ocultos, Cachety rehace cada página como una imagen. Por eso el texto del nuevo PDF no se puede seleccionar ni buscar, y un PDF que solo tenía texto puede salir más pesado que el original. Tus archivos originales no se modifican: guárdalos.";

export const DOSSIER_GUIDES_ES: Guide[] = [
  // ------------------------------------------------------------------
  {
    slug: "unir-pdf-sin-subir-archivos",
    topic: "merge",
    tool: "dossier",
    title: "Cómo unir varios PDF en uno solo sin subirlos a internet",
    metaTitle: "Unir varios PDF en uno solo sin subirlos, gratis",
    description:
      "Une PDF y fotos en un solo PDF en tu navegador. Ordena las páginas, respeta un límite de tamaño y no subas nada. Gratis y sin cuenta.",
    intro:
      "«Envíelo todo en un solo PDF, por favor.» La mayoría de las herramientas gratuitas para unir PDF empiezan por subir tus archivos a sus servidores. Cuando esos archivos son tu DNI, tus nóminas y tus extractos bancarios, hay otra forma: hacerlo en tu propio dispositivo.",
    example: "Solicitud de alquiler – Inmobiliaria Los Olivos – 18/11/2026",
    body: [
      { type: "h2", text: "Por qué unir archivos online no es poca cosa" },
      {
        type: "p",
        text: "Los documentos que la gente une rara vez son fotos de las vacaciones. Son los papeles que ha pedido una inmobiliaria, un banco, una empresa o una administración: un documento de identidad, un justificante de ingresos, un justificante de domicilio. Enviarlos todos de golpe a una web de la que sabes poco, solo para juntarlos, es un riesgo que no hace falta correr.",
      },
      { type: "h2", text: "Une tus archivos con Cachety" },
      {
        type: "steps",
        items: [
          `Abre ${TOOL} en tu navegador, en el ordenador o en el móvil. No hay nada que instalar ni cuenta que crear.`,
          "Añade tus archivos: PDF y fotos a la vez (JPG, PNG, fotos HEIC del iPhone y otros formatos). Cada foto se convierte en una página.",
          "Pasa a las páginas. Cada página de cada archivo se muestra como una imagen pequeña. Arrastra una página para moverla, incluso de un documento a otro. Gira las que estén de lado y quita las que no quieras.",
          "Elige «Un solo PDF». Si la web a la que vas a enviarlo limita el tamaño, elige ese límite: 1, 2, 5 o 10 MB, u «Otro…» para cualquier límite de 0,5 a 50 MB. Cachety te dice antes de descargar si el archivo cabrá y se seguirá leyendo bien.",
          "Revisa la vista previa, pon un nombre al archivo y descárgalo.",
        ],
      },
      {
        type: "tip",
        text: "Antes de descargar, puedes ocultar un número de cuenta o cualquier otro dato que el destinatario no necesite. En un PDF que contiene texto, Cachety te señala los números de cuenta y de tarjeta que encuentra. La zona oculta se elimina del archivo, no solo se tapa.",
      },
      { type: "h2", text: "Un archivo por tipo de documento" },
      {
        type: "p",
        text: "Algunas webs no quieren un solo archivo grande, sino un archivo por tipo de documento: documento de identidad, nóminas, justificante de domicilio. Marca «Separar en varios archivos», luego abre el menú de una página y elige «Nueva sección aquí» donde deba empezar cada archivo nuevo. Pon un nombre a cada sección: será el nombre de su archivo. Entonces queda seleccionado «Un PDF por sección», y descargas todos los archivos a la vez en un archivo ZIP. El límite de tamaño se aplica entonces a cada archivo.",
      },
      { type: "h2", text: "Qué pasa con tus archivos" },
      { type: "p", text: NOT_UPLOADED },
      { type: "h2", text: "Cómo es el nuevo PDF" },
      { type: "p", text: PIXELS },
      {
        type: "p",
        text: "La parte buena es que el nuevo archivo lleva menos cosas que los originales: ni nombre del autor, ni texto oculto, ni adjuntos, ni la ubicación GPS de tus fotos. Lo que ve el destinatario es todo lo que hay.",
      },
      {
        type: "warning",
        text: "Si necesitas que el texto del PDF unido se pueda seguir seleccionando y buscando, por ejemplo en un informe o un trabajo de fin de grado, Cachety no es la herramienta adecuada. Usa una aplicación que funcione en tu ordenador y una las páginas originales tal cual, como Vista Previa en un Mac.",
      },
      { type: "h2", text: "Algunos límites que conviene conocer" },
      {
        type: "list",
        items: [
          "Hasta 200 MB por archivo, 500 páginas por PDF y 1.000 páginas en total.",
          "No se admiten archivos de Word ni de Excel: guárdalos antes como PDF (Imprimir y luego Guardar como PDF).",
          "Se puede añadir un PDF protegido: Cachety te pide su contraseña, en tu dispositivo.",
          "La marca de agua y la contraseña del nuevo archivo son opcionales: no se añaden si no las pides.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Se suben mis PDF para unirlos?",
        a: "No. La unión se hace en tu navegador, en tu dispositivo. Cachety no tiene ningún servidor que pueda recibir tus archivos.",
      },
      {
        q: "¿Puedo unir PDF y fotos a la vez?",
        a: "Sí. Añade PDF y fotos mezclados como quieras. Cada foto se convierte en una página, y puedes poner todas las páginas en el orden que prefieras.",
      },
      {
        q: "¿Se puede seguir seleccionando el texto después de unir?",
        a: "No. Cada página se rehace como una imagen, lo que elimina los datos ocultos. Si necesitas texto seleccionable, usa una aplicación en tu ordenador que conserve las páginas originales.",
      },
      {
        q: "¿Por qué el archivo unido a veces pesa más que mis archivos?",
        a: "Un PDF que solo tenía texto pesa muy poco, y una imagen de la misma página pesa más. Elige un tamaño máximo y Cachety reduce las páginas para que quepa.",
      },
      {
        q: "¿Funciona en el móvil?",
        a: "Sí, en iPhone y Android, en el navegador. Puedes mover las páginas con el dedo.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "pasar-fotos-a-pdf-desde-el-movil",
    topic: "photo-to-pdf",
    tool: "dossier",
    title: "Cómo pasar fotos de documentos en papel a un solo PDF desde el móvil",
    metaTitle: "Pasar fotos a un solo PDF desde el móvil, sin app",
    description:
      "Haz fotos de tus papeles y conviértelas en un solo PDF en el navegador del móvil. Sin app, sin subir nada, y con un tamaño que admite un formulario.",
    intro:
      "Una web te pide un PDF y solo tienes papel. O rechaza la foto de tu iPhone por su formato. No necesitas un escáner ni una app para escanear: bastan la cámara del móvil y su navegador.",
    example: "Solicitud de plaza – Escuela Infantil El Olmo – 18/11/2026",
    body: [
      { type: "h2", text: "Haz fotos que se lean bien" },
      {
        type: "list",
        items: [
          "Pon la hoja plana sobre una superficie lisa y oscura, cerca de una ventana. Evita el flash, que deja una mancha blanca.",
          "Sujeta el móvil recto, justo encima de la hoja, para que los bordes se vean paralelos, y llena el encuadre con la página. Una foto hecha en ángulo se puede enderezar después.",
          "Haz una foto por página. Comprueba que la letra pequeña sale nítida antes de seguir.",
        ],
      },
      { type: "h2", text: "De las fotos a un solo PDF" },
      {
        type: "steps",
        items: [
          `Abre ${TOOL} en el navegador del móvil. No hay ninguna app que instalar.`,
          "Toca la zona para añadir archivos y elige tus fotos. Las fotos del iPhone en formato HEIC valen tal cual.",
          "Pasa a las páginas. Cada foto se ha convertido en una página. Gira las que estén de lado y arrástralas hasta dejarlas en el orden correcto.",
          "Si una foto está torcida o se ve la mesa alrededor de la hoja, toca la página y elige «Enderezar y recortar». Pon cada esquina sobre una esquina de la hoja y elige «Aplicar».",
          "En el mismo sitio, «Blanquear el fondo» deja blanco un papel que se ve gris y «Blanco y negro» quita el color. La página se lee mejor y pesa mucho menos. «Aplicar a todas las fotos» lo hace con todas las fotos a la vez.",
          "Elige «Un solo PDF» y, si el formulario limita el tamaño, elige 1, 2, 5 o 10 MB, u «Otro…» para otro límite.",
          "Revisa la vista previa y descarga el PDF. Se guarda en tu móvil, listo para adjuntar.",
        ],
      },
      {
        type: "tip",
        text: "Puedes mezclar fotos con PDF que ya tengas, como una nómina que hayas descargado. Todo acaba en un solo archivo, en el orden que elijas.",
      },
      { type: "h2", text: "Por qué el formulario rechazó tu foto" },
      {
        type: "p",
        text: "Los formularios online suelen aceptar solo PDF, JPG o PNG, y limitan el tamaño a unos pocos megabytes. Una foto de un móvil reciente puede pesar más, y los iPhone guardan las fotos en HEIC, un formato que muchas webs no leen. Convertir las fotos en un solo PDF con un límite de tamaño resuelve los dos problemas a la vez.",
      },
      { type: "h2", text: "Tus fotos se quedan en tu móvil" },
      { type: "p", text: NOT_UPLOADED },
      {
        type: "p",
        text: "Una foto también recuerda dónde y cuándo se hizo, y con qué móvil. Cachety rehace cada página como una imagen nueva, así que esa información oculta, incluida la ubicación GPS, no está en el PDF que envías.",
      },
      {
        type: "warning",
        text: "Un límite de tamaño muy pequeño y muchas páginas de fotos no siempre son compatibles. Si el archivo no puede caber y seguir leyéndose bien, Cachety te lo dice antes de descargar. Prueba primero con «Blanco y negro»; después quita algunas páginas, separa el archivo en varios archivos o elige un tamaño mayor si la web lo permite.",
      },
    ],
    faq: [
      {
        q: "¿Necesito una app para escanear?",
        a: "No. Haz las fotos con la cámara del móvil y abre Cachety en el navegador. No se instala nada.",
      },
      {
        q: "¿Valen las fotos del iPhone (HEIC)?",
        a: "Sí. Las fotos HEIC se leen en tu dispositivo y se convierten en páginas del PDF, como cualquier otra foto.",
      },
      {
        q: "¿Se suben mis fotos?",
        a: "No. Todo ocurre en el navegador de tu móvil. No hay ningún servidor que reciba tus fotos.",
      },
      {
        q: "¿Puedo buscar o copiar el texto del PDF?",
        a: "No. Las páginas son imágenes: Cachety no lee el texto de una foto. Para un formulario que pide un PDF, eso rara vez es un problema.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "girar-ordenar-eliminar-paginas-pdf",
    topic: "pdf-pages",
    tool: "dossier",
    title: "Cómo girar, ordenar o eliminar páginas de un PDF sin subirlo",
    metaTitle: "Girar, ordenar o eliminar páginas de un PDF sin subirlo",
    description:
      "Gira una página que está de lado, cambia el orden o quita páginas de un PDF en tu navegador. Gratis, sin cuenta, y el archivo no sale de tu dispositivo.",
    intro:
      "Un escaneo que ha salido del revés, una página en blanco en medio, un contrato del que solo necesitas las páginas 1 y 7: arreglos pequeños, pero la mayoría de las herramientas gratuitas quieren que subas antes el documento entero. Así se hace en tu propio dispositivo.",
    example: "Solicitud de hipoteca – Banco Mirasol – 18/11/2026",
    body: [
      { type: "h2", text: "Arregla las páginas con Cachety" },
      {
        type: "steps",
        items: [
          `Abre ${TOOL} en tu navegador, en el ordenador o en el móvil.`,
          "Añade tu PDF. Puedes añadir varios archivos, y también fotos.",
          "Pasa a las páginas. Cada página se muestra como una imagen pequeña, en el orden del archivo final.",
          "Arrastra una página para moverla. Con el botón de girar, la giras un cuarto de vuelta cada vez. Con el botón de quitar, la sacas. Si quitas la página equivocada, «Deshacer» la devuelve a su sitio: el botón se muestra unos segundos. En el móvil, toca una página para ver las mismas acciones en un menú.",
          "Elige «Un solo PDF», revisa la vista previa y descarga.",
        ],
      },
      {
        type: "tip",
        text: "En un ordenador puedes hacerlo todo con el teclado: Alt y las flechas mueven la página seleccionada, R la gira y Supr la quita.",
      },
      { type: "h2", text: "Un giro de verdad, no un ajuste de visualización" },
      {
        type: "p",
        text: "Muchas herramientas solo añaden al PDF una nota que dice «muestra esta página girada». Algunos lectores la ignoran, y la página vuelve a estar de lado para quien la recibe. Cachety rehace la página ya derecha, así que se ve igual en todas partes.",
      },
      { type: "h2", text: "Las páginas quitadas desaparecen de verdad" },
      {
        type: "p",
        text: "Cuando quitas una página, ya no está en el nuevo archivo de ninguna forma. Lo mismo pasa con lo que no se ve en un PDF: el texto oculto, los adjuntos, el nombre del autor. El nuevo archivo se hace con lo que se muestra en cada página, y nada más.",
      },
      { type: "h2", text: "Qué esperar del resultado" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "Si necesitas conservar el texto seleccionable, los marcadores o los campos de formulario, usa una aplicación que funcione en tu ordenador y edite las páginas originales, como Vista Previa en un Mac.",
      },
      { type: "h2", text: "No se sube nada" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "¿Puedo girar solo una página de un PDF?",
        a: "Sí. Cada página tiene su propio botón de girar. Las demás páginas no cambian.",
      },
      {
        q: "¿Puedo pasar una página de un PDF a otro?",
        a: "Sí. Añade los dos archivos: todas sus páginas aparecen juntas y se pueden mover libremente, y luego se guardan en un solo PDF.",
      },
      {
        q: "¿Puedo recuperar una página que he quitado?",
        a: "Sí, con «Deshacer», que se muestra unos segundos después de quitar una página. Si has quitado todas las páginas de un documento, aparece «Recuperar sus páginas» junto a él en la lista. Pasado ese momento, vuelve a añadir el archivo: tu archivo original no se modifica nunca.",
      },
      {
        q: "¿Se sube mi PDF?",
        a: "No. Las páginas se muestran y se rehacen en tu navegador. No hay ningún servidor que reciba tu archivo.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "eliminar-metadatos-pdf-foto",
    topic: "metadata",
    tool: "dossier",
    title: "Cómo eliminar los metadatos y los datos ocultos de un PDF o una foto antes de enviarlos",
    metaTitle: "Eliminar metadatos de un PDF o una foto sin subirlos",
    description:
      "Un PDF o una foto llevan más de lo que ves: autor, fechas, texto oculto, ubicación GPS. Elimínalo todo antes de enviar, en tu navegador y sin subir nada.",
    intro:
      "El archivo que envías dice más de lo que muestra la página. Un PDF puede dar el nombre de su autor y el programa con que se hizo, y conservar texto que creías borrado. Una foto puede decir exactamente dónde se hizo. Esto es lo que se esconde en un archivo, y cómo enviar una copia limpia.",
    example: "Parte de siniestro – Seguros Brisamar – 18/11/2026",
    body: [
      { type: "h2", text: "Lo que un archivo lleva sin decírtelo" },
      {
        type: "list",
        items: [
          "En un PDF: el nombre del autor, el título, el programa utilizado, las fechas de creación y de modificación.",
          "También en un PDF: una capa de texto seleccionable, comentarios, enlaces, archivos adjuntos, datos de formularios y, a veces, texto que sigue debajo de un recuadro negro.",
          "En una foto: la fecha, la marca del móvil y, muy a menudo, la ubicación GPS del lugar donde se hizo.",
        ],
      },
      {
        type: "p",
        text: "Nada de esto se ve al mirar la página. Todo puede leerlo en unos clics quien recibe el archivo, o cualquiera a quien se lo reenvíen.",
      },
      { type: "h2", text: "Haz una copia limpia con Cachety" },
      {
        type: "steps",
        items: [
          `Abre ${TOOL} en tu navegador. No hace falta cuenta.`,
          "Añade tu PDF o tus fotos.",
          "Pasa a las páginas y comprueba que están en el orden correcto. Quita las que no quieras enviar.",
          "Elige «Un solo PDF» y descárgalo.",
          "Envía el archivo nuevo, no el original.",
        ],
      },
      { type: "h2", text: "Cómo funciona la limpieza" },
      {
        type: "p",
        text: "Cachety no intenta encontrar y borrar cada dato oculto, uno por uno. Rehace cada página como una imagen de lo que ves, y crea un PDF nuevo con esas imágenes. Lo que no se veía en la página no está en el nuevo archivo: ni autor, ni texto oculto, ni adjuntos, ni scripts, ni enlaces, ni ubicación GPS.",
      },
      {
        type: "tip",
        text: "Para comprobar un archivo, abre sus propiedades en tu lector de PDF e intenta seleccionar el texto de una página. En una copia hecha con Cachety, las propiedades están vacías y no se puede seleccionar nada.",
      },
      { type: "h2", text: "El precio que se paga" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "Limpiar un archivo elimina lo que está oculto, no lo que está impreso en la página. Un nombre, un número de cuenta o un código de barras que se ven siguen ahí. Ocúltalos antes de descargar: la zona oculta se elimina de verdad.",
      },
      { type: "h2", text: "Tu archivo no se sube para limpiarlo" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "¿Elimina la ubicación GPS de mis fotos?",
        a: "Sí. La página se rehace como una imagen nueva dentro de un PDF, y la información oculta de la foto, incluida la ubicación, no pasa al nuevo archivo.",
      },
      {
        q: "¿Elimina el nombre del autor de un PDF?",
        a: "Sí. El nuevo PDF se hace con imágenes de las páginas y no lleva las propiedades del archivo original.",
      },
      {
        q: "¿Puedo mantener el texto seleccionable y quitar solo los metadatos?",
        a: "Con Cachety, no. Elimina todos los datos ocultos rehaciendo las páginas como imágenes. Para conservar el texto seleccionable, usa la función de «eliminar información oculta» de un editor de PDF en tu ordenador.",
      },
      {
        q: "¿El resultado es un PDF o una foto?",
        a: "Un PDF. Cada foto se convierte en una página del PDF.",
      },
    ],
    updated: UPDATED,
  },
];
