import type { SiteCopy } from "@/lib/site-copy";

// Textos del sitio en español neutro, tuteo. Mismas promesas que en inglés,
// ni una más (cf. docs/security.md).

export const SITE_ES: SiteCopy = {
  nav: {
    tool: "La herramienta",
    about: "¿Por qué una marca de agua?",
    guides: "Guías",
    privacy: "Privacidad",
    menu: "Menú",
    close: "Cerrar el menú",
    donate: "Donar",
    compare: "Comparativas",
    nameShort: "cachet (sello) + cacher (ocultar)",
  },
  hero: {
    title: "Pon una marca de agua a tus documentos sin enviarlos a ningún sitio",
    lead: "DNI, pasaporte, nómina, extracto bancario: añade una marca de agua en segundos. Tus archivos se quedan en tu dispositivo de principio a fin.",
    pills: ["Gratis", "Sin cuenta", "Nada se sube", "Hecho en Francia"],
  },
  landing: {
    howTitle: "Cómo funciona",
    how: [
      { title: "Suelta tu documento", body: "Un PDF o una foto, incluso hecha con un iPhone. Varios a la vez si lo necesitas." },
      {
        title: "Di para qué es",
        body: "Por ejemplo «Solicitud de alquiler, Inmobiliaria Sol, 11/10/2026». Incluye plantillas ya hechas.",
      },
      {
        title: "Revisa y descarga",
        body: "La vista previa muestra exactamente lo que obtendrás. El archivo con marca de agua se guarda en tu dispositivo.",
      },
    ],
    trustTitle: "Tus documentos nunca salen de tu dispositivo",
    trustLead:
      "La mayoría de las webs de marcas de agua suben tu documento de identidad a sus servidores. Cachety no: todo el trabajo lo hace tu navegador, en tu propio móvil o PC.",
    trust: [
      {
        title: "Procesado en tu dispositivo",
        body: "Tus archivos se quedan en la memoria de tu dispositivo. Cierra la pestaña y todo desaparece.",
      },
      {
        title: "Protección integrada",
        body: "La página prohíbe a tu navegador enviar datos a cualquier otra web. Aunque algo fallara, tus archivos no podrían salir.",
      },
      {
        title: "Sin cuenta, sin rastreo",
        body: "Sin registro, sin cookies de seguimiento, sin estadísticas de visitas, sin redes publicitarias.",
      },
      {
        title: "Código abierto y verificable",
        body: "El código es público. Cualquiera puede leerlo, revisarlo o alojar su propia copia del sitio.",
      },
    ],
    airplaneTitle: "Compruébalo tú mismo: la prueba del modo avión",
    airplaneBody:
      "Abre esta página y luego desconecta internet (modo avión). Suelta un documento: Cachety sigue funcionando. Es la prueba de que nada pasa por internet.",
    featuresTitle: "Todo lo que necesitas para proteger una copia",
    features: [
      {
        title: "Marca de agua en toda la página",
        body: "Repetida en diagonal y fundida en la imagen: no se puede borrar con solo editar el PDF.",
      },
      {
        title: "Tachar información",
        body: "Oculta un número de cuenta, un número fiscal o una foto. El contenido se elimina de verdad, no solo se tapa.",
      },
      {
        title: "Un código único en cada copia",
        body: "Al editar el texto, añade un código corto distinto en cada copia: si una aparece en algún sitio, sabrás de dónde salió.",
      },
      {
        title: "Una copia por destinatario",
        body: "Añade cada destinatario: cada uno recibe su propia copia, con su nombre, en una sola descarga.",
      },
      {
        title: "Una contraseña creada para ti",
        body: "Protege el archivo con 12 palabras al azar, fáciles de dictar por teléfono, y cifrado AES-256.",
      },
      {
        title: "Datos ocultos eliminados",
        body: "El texto seleccionable, los metadatos y la ubicación GPS de las fotos se borran del archivo final.",
      },
      {
        title: "Ligero para cualquier web",
        body: "Si una web o un correo rechaza tu archivo, redúcelo a 10, 5, 2 o 1 MB.",
      },
      {
        title: "Funciona en el móvil",
        body: "iPhone y Android, fotos HEIC incluidas. Añade Cachety a tu pantalla de inicio como una app.",
      },
    ],
    originTitle: "Gratis, de código abierto, hecho en Francia",
    originBody:
      "Cachety es software libre y gratuito (licencia AGPL). Su código está abierto a todos y lo seguirá estando. Se basa en Filigrane Local y Filigraneur, dos proyectos franceses de código abierto.",
    originBy: "Creado y mantenido por",
    supportTitle: "Apoya a Cachety",
    supportBody:
      "Cachety es gratis y lo seguirá siendo. Pero lleva tiempo, y el dominio y las herramientas de desarrollo cuestan dinero. Si Cachety te ha sido útil, una pequeña donación ayuda a mantenerlo.",
    supportCta: "Hacer una donación",
    supportNote: "Opcional. El pago se hace en GitHub Sponsors, fuera de este sitio.",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Se suben mis archivos a un servidor?",
        a: "No, nunca. El sitio ni siquiera tiene un servidor que pueda recibir un archivo. Tu navegador hace todo el trabajo, y la página le impide técnicamente conectarse a cualquier otra web. La prueba del modo avión lo demuestra en diez segundos.",
      },
      {
        q: "¿De verdad es gratis? ¿Dónde está la trampa?",
        a: "No la hay: sin cuenta, sin versión de pago, sin recoger datos. Como nada se procesa en un servidor, alojar el sitio casi no cuesta nada, y el código abierto garantiza que seguirá siendo gratis. Para financiar su desarrollo, Cachety cuenta con donaciones voluntarias, y quizá algún día muestre unos pocos enlaces patrocinados elegidos a mano (herramientas de cifrado, software libre…). Nunca anuncios que te rastreen, y nunca nada basado en tus documentos.",
      },
      {
        q: "¿Qué archivos puedo marcar?",
        a: "PDF e imágenes: JPG, PNG, fotos de iPhone (HEIC), WebP, GIF, BMP y AVIF. Hasta 200 MB por archivo y 500 páginas por PDF, con varios archivos a la vez.",
      },
      {
        q: "¿Se puede quitar la marca de agua?",
        a: "No con un editor de PDF: la marca de agua forma parte de la imagen de cada página. Siendo sinceros, nada impide que alguien fotografíe o retoque un documento. Una marca de agua disuade de reutilizarlo y te permite saber de dónde vino una filtración.",
      },
      {
        q: "¿Qué escribo en la marca de agua?",
        a: "Tres cosas: para qué es la copia, a quién se la envías y la fecha. Por ejemplo «Solicitud de alquiler, Inmobiliaria Sol, 11/10/2026».",
      },
      {
        q: "¿Funciona en el móvil?",
        a: "Sí, en iPhone y Android. Abre cachety.com en tu navegador, toca la zona para soltar archivos y elige una foto o un PDF. También puedes añadir Cachety a tu pantalla de inicio.",
      },
    ],
    guidesTitle: "Guías prácticas",
    guidesLead: "Ayuda paso a paso para situaciones del día a día.",
    guidesAll: "Todas las guías",
    backToTop: "Poner una marca de agua",
  },
  privacy: {
    title: "Privacidad y seguridad",
    lead: "Tus documentos son personales. Aquí te explicamos, con palabras sencillas, qué hace Cachety y qué no hace, y cómo comprobarlo tú mismo.",
    updated: "Actualizado el 12 de octubre de 2026",
    sections: [
      {
        title: "En resumen",
        items: [
          "Tus archivos nunca se suben: los procesa tu navegador, en tu dispositivo.",
          "Sin cuenta, sin cookies de seguimiento, sin estadísticas de visitas, sin redes publicitarias.",
          "No se guarda nada: cierra la pestaña y tus documentos desaparecen de la memoria.",
          "El código es público y cualquiera puede revisarlo.",
        ],
      },
      {
        title: "Qué pasa cuando sueltas un archivo",
        paras: [
          "Tu navegador lee el archivo en la memoria de tu dispositivo. Cada página se convierte en una imagen, se dibuja encima la marca de agua y se crea un archivo totalmente nuevo. Cuando haces clic en Descargar, se guarda directamente en tu dispositivo.",
          "En ningún momento viajan por internet el archivo, el texto de la marca de agua, los nombres de los destinatarios ni la contraseña.",
        ],
      },
      {
        title: "Lo que no recogemos",
        items: [
          "Tus documentos y sus vistas previas.",
          "El texto de tu marca de agua y los nombres de tus destinatarios.",
          "Tus contraseñas.",
          "Tu identidad: no hay cuenta ni formulario.",
          "Tus hábitos: nada de Google Analytics, ni píxel publicitario, ni cookie de seguimiento.",
        ],
      },
      {
        title: "Lo que se guarda en tu dispositivo",
        paras: [
          "Solo tus ajustes: idioma, aspecto de la marca de agua y el tamaño máximo de archivo que elegiste. Se quedan en tu navegador para que no tengas que configurarlos otra vez. Nunca se guarda ahí ningún archivo, texto ni contraseña. Puedes borrarlos cuando quieras eliminando los datos de este sitio en tu navegador.",
          "Para funcionar sin conexión, tu navegador también guarda una copia de las páginas del sitio (no de tus documentos).",
        ],
      },
      {
        title: "Alojamiento y financiación",
        paras: [
          "Las páginas del sitio las sirve Cloudflare. Como cualquier proveedor de alojamiento, ve técnicamente las direcciones IP de los visitantes y las páginas que piden, para poder servirlas. Nunca ve tus documentos, porque nunca se envían.",
          "Las donaciones pasan por GitHub Sponsors, en la propia web de GitHub y bajo su propia política de privacidad. Cachety nunca ve tus datos de pago, y sus páginas no contienen ningún formulario ni script de pago.",
          "Hoy no hay anuncios en Cachety. Para que el proyecto siga adelante, en el futuro podrían aparecer algunos enlaces patrocinados, elegidos a mano y fieles a su espíritu: herramientas de cifrado, software libre, envío seguro de documentos. Estarán claramente señalados, los servirá el propio Cachety sin redes publicitarias ni scripts de terceros, y nunca dependerán de tus documentos. La política de seguridad de la página seguirá prohibiendo cualquier conexión a otra web.",
        ],
      },
      {
        title: "Cómo comprobarlo tú mismo",
        items: [
          "La prueba del modo avión: abre el sitio, desconecta internet y pon una marca de agua a un documento. Todo funciona.",
          "El código fuente es público: cualquiera puede leerlo, y unas pruebas automáticas comprueban en cada cambio que ningún dato puede salir.",
          "Para curiosos: la política de seguridad de la página (CSP) prohíbe al navegador conectarse a cualquier otra web.",
          "¿Prefieres no fiarte de nadie? Puedes ejecutar el sitio en tu propio equipo o servidor.",
        ],
      },
      {
        title: "Tus copias, bien protegidas",
        items: [
          "Las zonas ocultas se eliminan de verdad del archivo, no solo se tapan con un rectángulo.",
          "Se eliminan el texto oculto, los metadatos y la ubicación GPS de las fotos.",
          "Las contraseñas usan cifrado AES-256; una vez copiada, la contraseña se borra del portapapeles al cabo de un minuto.",
          "¿Has encontrado un fallo de seguridad? Avísanos en privado desde la página de seguridad del repositorio de GitHub.",
        ],
      },
      {
        title: "Lo que una marca de agua no puede hacer",
        paras: [
          "Una marca de agua disuade de reutilizar una copia y te ayuda a saber de dónde vino una filtración. No impide que alguien fotografíe o retoque una copia. Envía solo los documentos que de verdad te piden, y oculta todo lo que no haga falta.",
        ],
      },
    ],
  },
  guidesUi: {
    title: "Guías prácticas",
    lead: "Alquiler, banco, pasaporte, móvil: cómo proteger tus documentos paso a paso, sin saber de informática.",
    read: "Leer la guía",
    example: "Ejemplo de marca de agua",
    faqTitle: "Preguntas frecuentes",
    related: "Sigue leyendo",
    cta: "Poner la marca de agua a mi documento",
    ctaNote: "Gratis, sin cuenta. El documento nunca sale de tu dispositivo.",
    updated: (d) => `Actualizado el ${d}`,
    allGuides: "Todas las guías",
  },
  compareUi: {
    title: "Cachety frente a otras herramientas de marca de agua",
    lead: "Comparativas claras y verificadas con las herramientas más usadas: adónde van tus archivos, cuánto cuesta y cuándo otra herramienta es mejor opción.",
    read: "Leer la comparativa",
    verdictTitle: "En resumen",
    tableTitle: "Cara a cara",
    criterion: "Criterio",
    edgeCachety: "Ventaja de Cachety",
    edgeOther: (n: string) => `Ventaja de ${n}`,
    chooseOther: (n: string) => `Cuándo ${n} es mejor opción`,
    chooseCachety: "Cuándo Cachety es mejor opción",
    sourcesTitle: "Fuentes",
    checked: (d: string) =>
      `Datos comprobados el ${d} en las páginas públicas de cada empresa. Los servicios cambian: si algo ya no es correcto, avísanos en GitHub y lo corregiremos.`,
    disclosure: "Escrito por el autor de Cachety. Buscamos ser objetivos y justos: cada afirmación sobre otra herramienta enlaza a su fuente.",
    allComparisons: "Todas las comparativas",
    related: "Otras comparativas",
  },
  footer: {
    tagline: "Pon una marca de agua a tus documentos sin que salgan nunca de tu dispositivo.",
    name: {
      pron: "/ka.ʃə.ti/",
      pos: "sustantivo",
      def: "Del francés cachet, el sello que da fe de un documento, y cacher, ocultar. Un sello sobre lo que compartes, un velo sobre el resto.",
    },
    support: "Apoya el proyecto",
    madeIn: "Hecho en Francia",
    by: "por",
    basedOn: "Basado en",
    inspiredBy: "que a su vez se inspira en",
    license: "Licencia AGPL-3.0",
    source: "Código fuente",
    free: "Servicio gratuito, sin rastreo",
  },
};
