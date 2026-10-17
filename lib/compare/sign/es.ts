import type { Comparison } from "../types";

// Comparatifs de l'outil de signature (es). Même règle éditoriale que les
// comparatifs du filigrane (lib/compare/types.ts) ; chaque entrée porte tool: "sign".
//
// Comparativas de la herramienta de firma en español (España primero). Cada
// dato sobre otra herramienta sale de sus propias páginas públicas (campo
// `sources`), comprobadas el 2026-10-17. Sin precios. Nada sobre si el
// resultado de las otras herramientas queda aplanado o no, porque no lo
// documentan. La jurisprudencia francesa no se presenta como derecho español.
// Texto plano.

const CHECKED = "2026-10-17";
const UPDATED = "2026-10-17";

// Celdas de Cachety que se repiten de una página a otra (hoja de datos verificada).
const C = {
  where: "En tu propio dispositivo, dentro del navegador. El documento no se envía a ningún servidor.",
  account: "No hace falta cuenta ni registro.",
  price: "Gratis, sin versión de pago.",
  level:
    "Una imagen de tu firma en la página, lo que se suele llamar firma electrónica «simple». Sin certificado ni sello de tiempo.",
  audit:
    "No: ni registro de auditoría ni certificado de finalización. Tras la descarga, Cachety muestra una huella SHA-256 del archivo que puedes guardar.",
  sending: "No: firmas tú. No se envía a nadie para firmar, no hay orden de firma y solo firma una persona.",
  identity: "Sin verificación de identidad.",
  retention: "No se guarda nada: tu firma solo existe en la memoria de la pestaña y el documento no sale de tu dispositivo.",
  ads: "Sin anuncios ni rastreadores.",
  fields:
    "Firma dibujada, escrita o importada desde una foto (se quita el fondo). Opcional: fecha, lugar y una mención debajo, rúbrica en cada página, marca de agua.",
};

const LEGAL = {
  type: "p" as const,
  text: "Una imagen de tu firma colocada en el documento, como la que crea Cachety, es lo que se suele llamar una firma electrónica simple. En la UE, a una firma no se le pueden negar efectos jurídicos ni validez como prueba solo por ser electrónica (Reglamento eIDAS, artículo 25). Una imagen así vale si nadie la impugna, pero pesa poco si alguien lo hace. Solo una firma cualificada, hecha con un certificado de un prestador cualificado, se presume fiable y equivale a una firma manuscrita.",
};

const WHEN_NOT = {
  type: "warning" as const,
  text: "No uses Cachety cuando se exija una firma avanzada o cualificada, cuando tengan que firmar varias personas o haga falta un registro de auditoría, cuando la ley pida una mención escrita de tu puño y letra (aval personal, reconocimiento de deuda), para un testamento o una escritura ante notario, o cuando la otra parte imponga una plataforma concreta.",
};

const HOW_TO: { type: "steps"; items: string[] } = {
  type: "steps",
  items: [
    "Abre cachety.com/es/sign en tu navegador, en el ordenador o en el móvil. No hay nada que instalar ni cuenta que crear.",
    "Suelta tu PDF o una foto del documento (JPG, PNG, HEIC). Puedes añadir varios a la vez; una foto se convierte en una página de tamaño A4.",
    "Dibuja tu firma con el dedo o el ratón, escribe tu nombre o importa una foto de tu firma. La fecha, el lugar y una mención debajo son opcionales.",
    "Arrastra la firma a su sitio. Si quieres, rubrica cada página, añade una marca de agua o pon una contraseña.",
    "Descarga el PDF firmado y guarda la huella del archivo que aparece en pantalla.",
  ],
};

const AIRPLANE_TIP = {
  type: "tip" as const,
  text: "La prueba del modo avión: abre cachety.com/es/sign, activa el modo avión y firma tu documento. Si todo sigue funcionando, es que nada ha salido de tu dispositivo. Un servicio que sube los documentos no puede hacerlo sin conexión.",
};

export const SIGN_COMPARISONS_ES: Comparison[] = [
  // ───────────────────────────── DocuSign ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-docusign",
    competitor: "docusign",
    competitorName: "DocuSign",
    competitorUrl: "https://www.docusign.com/",
    title: "Cachety o DocuSign: ¿firmar tú mismo o enviar a firmar?",
    metaTitle: "DocuSign o Cachety: firmar un PDF tú mismo",
    description:
      "DocuSign envía contratos a firmar, con certificado de finalización. Cachety firma tu PDF en tu dispositivo, sin cuenta. Comparativa clara y honesta.",
    intro:
      "DocuSign es una de las plataformas de firma electrónica más conocidas: subes un contrato, lo envías a otras personas para que lo firmen y al final recibes un certificado de finalización. Cachety hace algo mucho más pequeño: firmas tú mismo un documento, en el navegador, y no sale de tu dispositivo.",
    verdict:
      "Para contratos con varios firmantes, un registro de auditoría, verificación de identidad o una firma avanzada o cualificada, DocuSign es mejor opción. Cachety está pensado para el día a día: un formulario, un certificado o un presupuesto que firmas tú y devuelves, sin cuenta y sin subir nada. El resultado es una imagen de tu firma sobre un PDF aplanado, es decir, una firma electrónica simple.",
    table: [
      {
        criterion: "Dónde se procesa el documento",
        cachety: C.where,
        other: "En la nube de DocuSign, en una de sus cinco regiones de centros de datos: Estados Unidos, Canadá, Europa, Australia o Japón.",
        edge: "cachety",
      },
      {
        criterion: "Cuenta y uso gratuito",
        cachety: "Sin cuenta, gratis, sin versión de pago.",
        other: "Para enviar, un plan de pago (Personal, Standard, Business Pro, Advanced) tras una prueba gratuita de 30 días; Personal incluye 5 sobres al mes. Los destinatarios firman gratis y sin cuenta.",
        edge: "cachety",
      },
      {
        criterion: "Nivel de firma",
        cachety: C.level,
        other: "Los documentos se sellan digitalmente con una infraestructura de clave pública (PKI). Firma avanzada disponible y firma cualificada como complemento; DocuSign es prestador cualificado de servicios de confianza en Europa.",
        edge: "other",
      },
      {
        criterion: "Registro de auditoría y certificado",
        cachety: C.audit,
        other: "Certificado de finalización y registro de auditoría en todos los planes.",
        edge: "other",
      },
      {
        criterion: "Enviar a otros para firmar",
        cachety: C.sending,
        other: "Sí: varios firmantes en serie, en paralelo o en orden mixto, recordatorios automáticos, plantillas, envío masivo.",
        edge: "other",
      },
      {
        criterion: "Verificación de identidad",
        cachety: C.identity,
        other: "Código de un solo uso por SMS, verificación por teléfono o con un documento de identidad oficial.",
        edge: "other",
      },
      {
        criterion: "Conservación",
        cachety: C.retention,
        other: "El cliente decide cuánto tiempo se conservan los documentos y puede borrarlos en cualquier momento.",
      },
      {
        criterion: "Campos, idiomas, integraciones",
        cachety: C.fields,
        other: "Iniciales, campos de texto, casillas, botones de opción, listas desplegables; firma en 44 idiomas, más de 1.100 integraciones, API, apps para iOS y Android.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Dos herramientas muy distintas" },
      {
        type: "p",
        text: "DocuSign está hecho para cuando firman otros: subes el contrato, decides quién firma, dónde y en qué orden, y DocuSign lo envía, manda recordatorios y reúne las firmas. Cada documento completado lleva un certificado de finalización, y la identidad de los firmantes se puede comprobar con un código por SMS o un documento de identidad. Para empresas, departamentos de recursos humanos o inmobiliarias, es el marco adecuado.",
      },
      {
        type: "p",
        text: "Cachety no tiene nada de eso. Coloca una imagen de tu firma en tu propio documento, dentro de tu navegador. Encaja cuando alguien te manda un PDF y te pide que lo devuelvas firmado, y no quieres crear una cuenta ni subir el archivo a ningún sitio.",
      },
      { type: "h2", text: "¿Qué valor tiene la firma de Cachety?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "En qué es mejor DocuSign" },
      {
        type: "list",
        items: [
          "Varios firmantes en un orden fijo, con recordatorios automáticos.",
          "Un certificado de finalización y un registro de auditoría en cada documento.",
          "Verificación de identidad por SMS, teléfono o documento de identidad.",
          "Firma avanzada, y firma cualificada como complemento.",
          "Plantillas, envío masivo, más de 1.100 integraciones y API.",
        ],
      },
      { type: "h2", text: "En qué encaja mejor Cachety" },
      {
        type: "list",
        items: [
          "Firmas tú, y el documento se queda en tu dispositivo.",
          "Sin cuenta, sin periodo de prueba, sin suscripción.",
          "La foto de un documento en papel se convierte directamente en una página A4 firmada.",
          "Las páginas se reconstruyen: desaparecen el texto oculto, los metadatos, los adjuntos y la ubicación GPS de las fotos.",
        ],
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Tienen que firmar varias personas, en un orden fijo y con recordatorios.",
      "Necesitas un registro de auditoría o un certificado de finalización que demuestre quién firmó y cuándo.",
      "Te piden una firma avanzada o cualificada, o hay que verificar la identidad de los firmantes.",
      "Envías contratos a menudo y quieres plantillas, envío masivo o conexión con tu software.",
    ],
    chooseCachety: [
      "Tienes que firmar tú un PDF y devolverlo, como un certificado, un formulario o un presupuesto.",
      "No quieres crear una cuenta ni subir el documento para hacerlo.",
      "Firmas de vez en cuando y no necesitas ni periodo de prueba ni suscripción.",
    ],
    faq: [
      {
        q: "¿Se puede firmar gratis con DocuSign?",
        a: "Como destinatario, sí: DocuSign dice que los destinatarios firman gratis y sin cuenta. Para enviar documentos a firmar necesitas un plan de pago; hay una prueba gratuita de 30 días.",
      },
      {
        q: "¿Vale lo mismo una firma con Cachety que una con DocuSign?",
        a: "En caso de disputa, no. Cachety coloca una imagen de tu firma, una firma electrónica simple sin certificado ni registro de auditoría. Vale si nadie la impugna, pero pesa poco si alguien lo hace. DocuSign sella digitalmente los documentos, entrega un certificado de finalización y ofrece también firmas avanzadas y cualificadas. Solo la cualificada equivale a una firma manuscrita.",
      },
      {
        q: "¿Dónde guarda DocuSign mis documentos?",
        a: "En su nube, en una de cinco regiones: Estados Unidos, Canadá, Europa, Australia o Japón. Cuánto tiempo se quedan allí lo decide el cliente. Con Cachety no se sube nada.",
      },
      {
        q: "Me han enviado un enlace de DocuSign. ¿Necesito Cachety?",
        a: "No. En ese caso firmas directamente en DocuSign, gratis y sin cuenta. Si la otra parte impone una plataforma, usa esa.",
      },
    ],
    sources: [
      { label: "DocuSign: firmar un PDF gratis (prueba)", url: "https://www.docusign.com/learn/add-electronic-signature-pdf-free" },
      { label: "DocuSign: firmar documentos online gratis", url: "https://www.docusign.com/en-gb/esignature/sign-document-online-free" },
      { label: "DocuSign: planes de eSignature", url: "https://ecom.docusign.com/plans-and-pricing/esignature" },
      { label: "DocuSign: funciones", url: "https://www.docusign.com/en-ca/products/electronic-signature/features" },
      { label: "DocuSign: eSignature", url: "https://www.docusign.com/products/electronic-signature" },
      { label: "DocuSign: firma avanzada", url: "https://www.docusign.com/en-gb/products/electronic-signature/advanced-electronic-signature" },
      { label: "DocuSign: firma cualificada", url: "https://www.docusign.com/en-gb/products/electronic-signature/qualified-electronic-signature" },
      { label: "DocuSign: residencia de datos", url: "https://www.docusign.com/privacy/data-residency" },
      { label: "DocuSign: gestión de datos", url: "https://www.docusign.com/trust/privacy/data-mgmt-privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Youtrust (antes Yousign) ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-yousign",
    competitor: "yousign",
    competitorName: "Youtrust (antes Yousign)",
    competitorUrl: "https://www.youtrust.com/",
    title: "Cachety o Youtrust (antes Yousign): ¿con cuál firmar?",
    metaTitle: "Youtrust (Yousign) o Cachety: firmar un PDF",
    description:
      "Youtrust, antes Yousign, ofrece firma simple, avanzada y cualificada. Cachety firma tu PDF sin cuenta y sin que salga de tu dispositivo. Comparativa.",
    intro:
      "Desde julio de 2026, el nombre Youtrust sustituye al de Yousign; durante la transición, el nombre antiguo puede seguir apareciendo en la aplicación. Youtrust es una plataforma francesa de firma electrónica, alojada en Francia. Cachety es una pequeña herramienta del navegador para firmar tú mismo un documento, sin cuenta y sin subirlo.",
    verdict:
      "Si tienen que firmar otras personas, necesitas un expediente de pruebas con sello de tiempo o te piden una firma avanzada o cualificada, Youtrust es mejor opción, y su plan gratuito ya incluye dos solicitudes de firma al mes. Cachety encaja cuando solo quieres firmar tú, sin cuenta y sin subir el documento. El resultado es una firma electrónica simple, una imagen sobre un PDF aplanado.",
    table: [
      {
        criterion: "Dónde se procesa el documento",
        cachety: C.where,
        other: "En los servidores de Youtrust, que según la empresa están alojados exclusivamente en Francia.",
        edge: "cachety",
      },
      { criterion: "Cuenta", cachety: C.account, other: "Hace falta cuenta, también en el plan gratuito.", edge: "cachety" },
      {
        criterion: "Uso gratuito",
        cachety: C.price,
        other: "Plan gratuito: firmar tú mismo sin límite y 2 solicitudes de firma al mes. Por encima, los planes One, Plus y Pro.",
      },
      {
        criterion: "Nivel de firma",
        cachety: C.level,
        other: "Simple (con código de un solo uso opcional), avanzada (con verificación del documento de identidad) y cualificada (con identificación por vídeo); las dos últimas, como complementos de pago en Plus y Pro. Youtrust figura en la lista de la UE de prestadores cualificados de servicios de confianza.",
        edge: "other",
      },
      {
        criterion: "Prueba de la firma",
        cachety: C.audit,
        other: "Expediente de pruebas con sello de tiempo en todos los planes, archivado 10 años.",
        edge: "other",
      },
      {
        criterion: "Enviar a otros para firmar",
        cachety: C.sending,
        other: "Sí: aprobaciones, orden de firmantes, recordatorios automáticos, plantillas; conexión con Zapier y HubSpot, API como producto aparte.",
        edge: "other",
      },
      {
        criterion: "Verificación de identidad",
        cachety: C.identity,
        other: "Código de acceso por SMS antes de firmar (Plus), verificación del documento de identidad para la firma avanzada e identificación por vídeo para la cualificada.",
        edge: "other",
      },
      {
        criterion: "Conservación",
        cachety: C.retention,
        other: "Pruebas de firma durante 10 años y datos de identidad durante 90 días, según su política de privacidad.",
      },
      { criterion: "Anuncios", cachety: C.ads, other: "Según Youtrust, el plan gratuito no tiene anuncios." },
    ],
    body: [
      { type: "h2", text: "Qué hace Youtrust" },
      {
        type: "p",
        text: "Youtrust, que en julio de 2026 empezó a sustituir el nombre Yousign, es una plataforma de firma electrónica de Youtrust SAS, con sede en Caen (Francia). Firmas tú o envías documentos a firmar, fijas el orden, y Youtrust manda recordatorios automáticos a los firmantes. Cada firma lleva un expediente de pruebas con sello de tiempo que se archiva diez años. Hay tres niveles, hasta la firma cualificada con identificación por vídeo, que Youtrust presenta como el equivalente legal de una firma manuscrita.",
      },
      {
        type: "p",
        text: "La propia Youtrust distingue claramente sus firmas de las simples imágenes o firmas escaneadas. Eso es justo lo que crea Cachety: una imagen de tu firma en la página. Es otra herramienta para otra necesidad, no un sustituto de una plataforma de firma.",
      },
      { type: "h2", text: "¿Qué valor tiene la firma de Cachety?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "En qué es mejor Youtrust" },
      {
        type: "list",
        items: [
          "Solicitudes de firma a otras personas, con orden, aprobaciones y recordatorios, dos al mes ya en el plan gratuito.",
          "Un expediente de pruebas con sello de tiempo, archivado diez años.",
          "Firmas avanzadas y cualificadas con verificación de identidad.",
          "Una empresa europea, con alojamiento en Francia, en la lista de la UE de prestadores cualificados de servicios de confianza.",
        ],
      },
      { type: "h2", text: "En qué encaja mejor Cachety" },
      {
        type: "list",
        items: [
          "Sin cuenta: abres la página, firmas y descargas.",
          "El documento no se sube, así que tampoco se guarda en ningún sitio.",
          "Rúbrica en cada página y marca de agua con motivo y destinatario en el mismo paso.",
          "Una vez cargada la página, funciona también en modo avión.",
        ],
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Tienen que firmar otras personas y quieres orden de firma, recordatorios y un expediente de pruebas con sello de tiempo.",
      "Necesitas una firma avanzada o cualificada, por ejemplo porque la otra parte la exige.",
      "Hay que verificar la identidad de los firmantes, con código por SMS, documento de identidad o vídeo.",
    ],
    chooseCachety: [
      "Solo quieres firmar tú un documento, sin crear una cuenta para ello.",
      "El documento no debe salir de tu dispositivo, por ejemplo porque contiene datos personales.",
      "Quieres rubricar cada página y añadir una marca de agua con el motivo y el destinatario.",
    ],
    faq: [
      {
        q: "¿Yousign ahora es Youtrust?",
        a: "Sí. Según el anuncio de la empresa, Yousign pasa a llamarse Youtrust a partir de julio de 2026. Durante la transición puede seguir apareciendo «Yousign» en la aplicación; la migración debería terminar en 2027.",
      },
      {
        q: "¿Youtrust es gratis?",
        a: "Tiene un plan gratuito y sin anuncios, con cuenta: firmar tú mismo sin límite y 2 solicitudes de firma al mes. Las firmas avanzadas y cualificadas son complementos de pago en los planes Plus y Pro. Cachety es gratis y sin cuenta, pero no puede enviar solicitudes.",
      },
      {
        q: "¿Dónde están mis documentos en Youtrust?",
        a: "Según Youtrust, exclusivamente en Francia; las pruebas las archiva Arkhinéo. Las pruebas de firma se conservan 10 años y los datos de identidad, 90 días. Con Cachety no se sube ni se guarda nada.",
      },
      {
        q: "¿Una firma con Cachety tiene el mismo valor?",
        a: "En caso de disputa, no. Cachety crea una firma electrónica simple, una imagen sin certificado ni expediente de pruebas. Vale si nadie la impugna, pero pesa poco si alguien lo hace. Solo una firma cualificada, como la que ofrece Youtrust, equivale a una firma manuscrita.",
      },
    ],
    sources: [
      { label: "Youtrust: Yousign pasa a ser Youtrust", url: "https://youtrust.com/yousign-becomes-youtrust" },
      { label: "Youtrust: página de inicio", url: "https://www.youtrust.com/" },
      { label: "Youtrust: plan gratuito", url: "https://youtrust.com/electronic-signature-freemium" },
      { label: "Youtrust: planes", url: "https://youtrust.com/pricing-application" },
      { label: "Youtrust: firma electrónica", url: "https://youtrust.com/e-signature" },
      { label: "Youtrust: funciones de la aplicación", url: "https://youtrust.com/application" },
      { label: "Youtrust: seguridad", url: "https://youtrust.com/security" },
      { label: "Youtrust: privacidad", url: "https://youtrust.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Adobe Acrobat ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-adobe-fill-sign",
    competitor: "adobe-fill-sign",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/acrobat/online/sign-pdf.html",
    title: "Cachety o Adobe Acrobat: ¿con cuál firmar un PDF?",
    metaTitle: "Adobe Acrobat o Cachety: firmar un PDF",
    description:
      "Adobe Acrobat firma PDF online en servidores de Adobe y Acrobat Sign los envía a varios firmantes. Cachety funciona en tu navegador, sin cuenta.",
    intro:
      "Con Adobe Acrobat se puede firmar de varias formas: en la herramienta online «Firmar PDF», en las apps Acrobat Reader y Fill & Sign, y en Acrobat Sign, su producto para empresas. Cachety es una herramienta sencilla del navegador para firmar tú mismo tu documento, sin que salga de tu dispositivo.",
    verdict:
      "Si tienen que firmar varias personas, necesitas registros de auditoría o una firma avanzada o cualificada, Adobe con Acrobat Sign es mejor opción. Para una firma rápida tuya en un PDF, Cachety te ahorra la subida y el inicio de sesión. Crea una imagen de tu firma sobre un PDF aplanado, es decir, una firma electrónica simple.",
    table: [
      {
        criterion: "Dónde se procesa el documento",
        cachety: C.where,
        other: "Herramienta online: en servidores de Adobe. El archivo se borra salvo que inicies sesión para guardarlo; la página no indica plazo ni país.",
        edge: "cachety",
      },
      {
        criterion: "Cuenta",
        cachety: C.account,
        other: "Según la página, tienes que iniciar sesión para completar el formulario rellenable.",
        edge: "cachety",
      },
      {
        criterion: "Nivel de firma",
        cachety: C.level,
        other: "Según Adobe, las firmas digitales basadas en certificado cumplen el nivel cualificado de eIDAS y otras normas internacionales. Acrobat Sign ofrece firmas simples, avanzadas y cualificadas, con más de 200 prestadores de servicios de confianza.",
        edge: "other",
      },
      {
        criterion: "Registro de auditoría",
        cachety: C.audit,
        other: "Disponible en Acrobat Sign. En la herramienta online, según Adobe, pedir firmas y acceder a los registros de auditoría puede requerir un plan de pago de Acrobat.",
        edge: "other",
      },
      {
        criterion: "Enviar a otros para firmar",
        cachety: C.sending,
        other: "Acrobat Sign: a varios firmantes, con plantillas, también directamente desde Microsoft Word, Teams, Salesforce o Workday.",
        edge: "other",
      },
      {
        criterion: "Firma y campos",
        cachety: C.fields,
        other: "Firma escrita, dibujada o subida como imagen; iniciales, texto, marcas de verificación y líneas.",
      },
      {
        criterion: "En el móvil",
        cachety: "En el navegador de iPhone y Android, sin app. La foto de un documento en papel se convierte en una página A4.",
        other: "La app Acrobat Reader para iOS y Android permite firmar; la app Adobe Fill & Sign para iOS rellena formularios a partir de una foto del papel.",
      },
      {
        criterion: "Quién trata tus datos",
        cachety: "Solo tu navegador: Cachety nunca recibe tu documento. Sin anuncios ni rastreadores.",
        other: "Adobe; el responsable para los usuarios de la UE es Adobe Systems Software Ireland Limited.",
      },
    ],
    body: [
      { type: "h2", text: "Qué ofrece Adobe" },
      {
        type: "p",
        text: "En la herramienta online «Firmar PDF» escribes o dibujas tu firma, o subes una imagen de ella, y puedes añadir iniciales, texto, marcas de verificación y líneas. El archivo se procesa en servidores de Adobe y se borra, salvo que inicies sesión para guardarlo. Para enviar documentos a varias personas, con plantillas y registros de auditoría, está Acrobat Sign, que también funciona desde Word, Teams, Salesforce o Workday.",
      },
      {
        type: "p",
        text: "En niveles de firma, Adobe cubre mucho: según Adobe, Acrobat Sign admite firmas simples, avanzadas y cualificadas conforme a eIDAS y trabaja para ello con más de 200 prestadores de servicios de confianza. Cachety no ofrece nada de eso, solo una imagen de tu firma.",
      },
      { type: "h2", text: "¿Qué valor tiene la firma de Cachety?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "En qué es mejor Adobe" },
      {
        type: "list",
        items: [
          "Firmas basadas en certificado: avanzadas y cualificadas.",
          "Acrobat Sign para varios firmantes, con plantillas y registros de auditoría.",
          "Funciona desde Microsoft Word, Teams, Salesforce y Workday.",
          "Apps para iOS y Android, y Fill & Sign para formularios en papel en el iPhone.",
        ],
      },
      { type: "h2", text: "En qué encaja mejor Cachety" },
      {
        type: "list",
        items: [
          "El documento no se sube, ni siquiera un momento.",
          "Sin iniciar sesión, sin cuenta de Adobe.",
          "Rúbrica en cada página, marca de agua y contraseña en el mismo paso.",
          "Varios documentos a la vez, también fotos de documentos en papel.",
        ],
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Ya trabajas con Acrobat y quieres enviar documentos a firmar directamente desde Word, Teams o Salesforce.",
      "Tienen que firmar varias personas, con plantillas y registro de auditoría.",
      "Necesitas una firma basada en certificado, avanzada o cualificada.",
    ],
    chooseCachety: [
      "Quieres firmar tú un PDF rápidamente, sin iniciar sesión en ningún sitio.",
      "El documento no debe ir a servidores ajenos, ni siquiera un momento.",
      "Quieres rubricar cada página, añadir una marca de agua y poner una contraseña de una vez.",
    ],
    faq: [
      {
        q: "¿Adobe guarda mi PDF si lo firmo online?",
        a: "Según Adobe, el archivo se procesa en sus servidores y se borra, salvo que inicies sesión para guardarlo. La página no indica ningún plazo. Con Cachety, el documento ni siquiera se sube.",
      },
      {
        q: "¿Necesito una cuenta de Adobe?",
        a: "Para completar un formulario rellenable en la herramienta online, Adobe pide iniciar sesión, y pedir firmas y acceder a los registros de auditoría puede requerir un plan de pago, según Adobe. Cachety no necesita cuenta.",
      },
      {
        q: "¿Qué diferencia hay entre Acrobat y Acrobat Sign?",
        a: "Con la herramienta online y las apps de Acrobat firmas tú. Acrobat Sign es el producto para empresas: envía documentos a varios firmantes, con plantillas y registros de auditoría, y según Adobe admite firmas simples, avanzadas y cualificadas conforme a eIDAS.",
      },
      {
        q: "¿La firma de Cachety es jurídicamente vinculante?",
        a: "Cachety no lo promete. Crea una firma electrónica simple: vale si nadie la impugna, pero pesa poco si alguien lo hace. Si te piden una firma cualificada, usa una herramienta que la ofrezca, como Acrobat Sign.",
      },
    ],
    sources: [
      { label: "Adobe: firmar PDF online", url: "https://www.adobe.com/acrobat/online/sign-pdf.html" },
      { label: "Adobe: Acrobat Sign para empresas", url: "https://www.adobe.com/acrobat/business/sign.html" },
      { label: "Adobe: eIDAS", url: "https://www.adobe.com/acrobat/business/compliance/eidas.html" },
      { label: "App Store: Adobe Fill & Sign", url: "https://apps.apple.com/cr/app/adobe-fill-sign/id950099951" },
      { label: "Adobe: política de privacidad", url: "https://www.adobe.com/privacy/policy.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-ilovepdf-sign",
    competitor: "ilovepdf-sign",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/sign-pdf",
    title: "Cachety o iLovePDF: ¿firmar un PDF en su servidor o en tu dispositivo?",
    metaTitle: "iLovePDF o Cachety: firmar un PDF",
    description:
      "iLovePDF firma PDF en sus servidores y también los envía a otros. Cachety firma en tu dispositivo, sin subir nada. Comparativa clara y honesta.",
    intro:
      "iLovePDF, una empresa de Barcelona, tiene su propia herramienta de firma, también llamada iLoveSign: firma simple para ti, firma digital e invitaciones a otras personas. Para usarla, el documento se sube a los servidores de iLovePDF. Cachety firma en el navegador y el documento se queda en tu dispositivo.",
    verdict:
      "Si quieres que firmen otras personas, con orden, recordatorios y registro de auditoría, o necesitas una firma digital o avanzada, iLovePDF es mejor opción. Para tu propia firma en un documento personal, Cachety evita la subida y los anuncios. Crea una firma electrónica simple, una imagen sobre un PDF aplanado.",
    table: [
      {
        criterion: "Dónde se procesa el documento",
        cachety: C.where,
        other: "En los servidores de iLovePDF; según su política de privacidad, los datos se tratan dentro del EEE.",
        edge: "cachety",
      },
      {
        criterion: "Cuánto tiempo se guarda",
        cachety: C.retention,
        other: "Los archivos se borran en un plazo de dos horas; los documentos firmados se conservan hasta 5 años y el registro de auditoría se archiva 10 años.",
        edge: "cachety",
      },
      {
        criterion: "Cuenta y uso gratuito",
        cachety: "Sin cuenta, gratis, sin versión de pago.",
        other: "Gratis: firmas simples para ti sin límite, solicitudes a otros limitadas, 50 MB al firmar. Para pedir firmas a otros hace falta cuenta.",
      },
      {
        criterion: "Anuncios",
        cachety: C.ads,
        other: "Según su página de precios, la versión gratuita Basic no está libre de anuncios.",
        edge: "cachety",
      },
      {
        criterion: "Nivel de firma",
        cachety: C.level,
        other: "Firma simple; firma digital (Premium) con un hash certificado firmado y un sello de tiempo cualificado; con validación por SMS, firma avanzada según eIDAS.",
        edge: "other",
      },
      {
        criterion: "Registro de auditoría",
        cachety: C.audit,
        other: "Registro de auditoría al terminar, archivado 10 años.",
        edge: "other",
      },
      {
        criterion: "Enviar a otros para firmar",
        cachety: C.sending,
        other: "Sí: «Solo yo» o «Varias personas», con orden de firma, fecha de caducidad y recordatorios; con Premium, 5 invitaciones al mes.",
        edge: "other",
      },
      {
        criterion: "Verificación de identidad",
        cachety: C.identity,
        other: "Validación por SMS y, como opción, escaneo de un documento de identidad.",
        edge: "other",
      },
      {
        criterion: "Firma y campos",
        cachety: C.fields,
        other: "Dibujada, escrita o subida como imagen (PNG, JPG, SVG); iniciales, fecha, campos de texto. Apps para iOS y Android.",
      },
    ],
    body: [
      { type: "h2", text: "Qué pasa con tu documento en iLovePDF" },
      {
        type: "p",
        text: "iLovePDF procesa el documento en sus servidores dentro del EEE, tiene la certificación ISO/IEC 27001 y borra los archivos en un plazo de dos horas. Los documentos firmados los conserva hasta cinco años, y el registro de auditoría se archiva diez años. Para una plataforma de firma tiene sentido: la prueba tiene que seguir ahí más adelante.",
      },
      {
        type: "p",
        text: "Pero si solo vas a firmar tú un certificado o un formulario, puede que no necesites esa prueba, y entonces tu documento tampoco tiene por qué ir a un servidor ajeno. Cachety coloca la firma dentro de tu navegador, sin subir nada.",
      },
      { type: "h2", text: "¿Qué valor tiene la firma de Cachety?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "En qué es mejor iLovePDF" },
      {
        type: "list",
        items: [
          "Invitaciones a otras personas, con orden de firma, fecha de caducidad y recordatorios.",
          "Un registro de auditoría, archivado diez años.",
          "Firma digital con sello de tiempo cualificado y firma avanzada con validación por SMS.",
          "Apps para iOS y Android.",
        ],
      },
      { type: "h2", text: "En qué encaja mejor Cachety" },
      {
        type: "list",
        items: [
          "El documento no sale de tu dispositivo, así que no se guarda en ningún sitio.",
          "Sin anuncios ni rastreadores.",
          "A la foto de tu firma se le quita el fondo y se le cambia el color de la tinta.",
          "Rúbrica en cada página, marca de agua y contraseña en el mismo paso.",
        ],
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Tienen que firmar otras personas, con orden de firma, fecha de caducidad y recordatorios.",
      "Necesitas un registro de auditoría o una firma digital con sello de tiempo cualificado.",
      "Te piden una firma avanzada con validación por SMS o el escaneo de tu documento de identidad.",
      "Ya usas iLovePDF para otras tareas con PDF.",
    ],
    chooseCachety: [
      "Firmas tú un documento personal y no quieres subirlo.",
      "Prefieres una web sin anuncios ni rastreadores.",
      "Quieres rubricar cada página y añadir una marca de agua, sin cuenta.",
    ],
    faq: [
      {
        q: "¿iLovePDF sube mi documento para firmarlo?",
        a: "Sí. iLovePDF trata los datos dentro del EEE y borra los archivos en un plazo de dos horas; los documentos firmados los conserva hasta cinco años. Con Cachety no se sube nada.",
      },
      {
        q: "¿Firmar con iLovePDF es gratis?",
        a: "Según iLoveSign, las firmas simples para ti son gratis y sin límite, las solicitudes a otros están limitadas y la versión Basic muestra anuncios. La firma digital y la avanzada forman parte de Premium.",
      },
      {
        q: "¿Qué diferencia hay entre la firma simple y la digital en iLovePDF?",
        a: "iLovePDF distingue una firma simple y una firma digital (Premium). En la digital, según iLovePDF, se incrusta un hash certificado firmado y un sello de tiempo cualificado; con validación por SMS pasa a ser una firma avanzada según eIDAS. Cachety solo ofrece una imagen de tu firma, es decir, una firma electrónica simple.",
      },
    ],
    sources: [
      { label: "iLovePDF: firmar PDF", url: "https://www.ilovepdf.com/sign-pdf" },
      { label: "iLovePDF: cómo firmar un PDF", url: "https://www.ilovepdf.com/blog/how-to-add-a-signature-to-a-pdf-document-online-using-ilovepdf" },
      { label: "iLovePDF: precios", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLoveSign: precios", url: "https://www.ilovesign.com/esignature-pricing" },
      { label: "iLovePDF: seguridad", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF: privacidad", url: "https://www.ilovepdf.com/help/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-smallpdf-sign",
    competitor: "smallpdf-sign",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/sign-pdf",
    title: "Cachety o Smallpdf: firmar un PDF sin cuenta, pero ¿dónde?",
    metaTitle: "Smallpdf o Cachety: firmar un PDF online",
    description:
      "Smallpdf firma PDF sin cuenta en servidores de la UE y los borra al cabo de una hora. Cachety firma en tu dispositivo, sin subir nada. Comparativa clara.",
    intro:
      "Smallpdf, con sede en Zúrich, es una de las webs de PDF más conocidas. Su herramienta «Firmar PDF» funciona sin cuenta y sin instalar nada; las solicitudes a otras personas pasan por Sign.com. Para firmar, el archivo se sube a los servidores de Smallpdf. Cachety firma en el navegador, sin subir nada.",
    verdict:
      "Las dos funcionan sin cuenta cuando firmas tú. La diferencia: Smallpdf procesa el archivo en sus servidores y lo borra al cabo de una hora, Cachety ni siquiera lo sube. Si tienen que firmar otras personas, con seguimiento, sello digital y certificado de finalización, Smallpdf con Sign.com es mejor opción; Cachety solo crea una firma electrónica simple, una imagen sobre un PDF aplanado.",
    table: [
      {
        criterion: "Dónde se procesa el documento",
        cachety: C.where,
        other: "En los servidores de Smallpdf (Hetzner, en la UE), a través de Cloudflare en Estados Unidos o Europa, con cifrado TLS.",
        edge: "cachety",
      },
      {
        criterion: "Cuánto tiempo se guarda",
        cachety: C.retention,
        other: "Se borra automáticamente al cabo de una hora, salvo que lo guardes en tu cuenta de Smallpdf.",
        edge: "cachety",
      },
      { criterion: "Cuenta", cachety: C.account, other: "Para firmar no hace falta crear una cuenta ni instalar nada." },
      {
        criterion: "Uso gratuito",
        cachety: C.price,
        other: "Gratis con un límite diario de descargas; Sign.com, gratis para un número limitado de documentos al mes.",
      },
      {
        criterion: "Anuncios y rastreo",
        cachety: C.ads,
        other: "Con tu consentimiento: Google Analytics, remarketing de Google Ads, píxel de Facebook y LinkedIn, según su política de privacidad.",
        edge: "cachety",
      },
      {
        criterion: "Nivel de firma",
        cachety: C.level,
        other: "Sign.com dice que sus firmas son «legalmente válidas y vinculantes según los estándares eIDAS», sin indicar el nivel.",
      },
      {
        criterion: "Sello y certificado",
        cachety: C.audit,
        other: "Con Sign.com: sellos digitales y certificado de finalización.",
        edge: "other",
      },
      {
        criterion: "Enviar a otros para firmar",
        cachety: C.sending,
        other: "Con Sign.com: pedir firmas y seguir su estado.",
        edge: "other",
      },
      {
        criterion: "Firma y campos",
        cachety: C.fields,
        other: "Dibujada, escrita o subida; firma, iniciales, texto y fechas. App para Android e iOS.",
      },
    ],
    body: [
      { type: "h2", text: "Qué pasa con tu archivo en Smallpdf" },
      {
        type: "p",
        text: "Smallpdf hace que firmar sea cómodo: sin cuenta, sin instalar nada, con la firma dibujada, escrita o subida. Para ello, el archivo viaja cifrado hasta servidores de Hetzner en la UE, en parte a través de Cloudflare en Estados Unidos o Europa, y se borra solo al cabo de una hora si no lo guardas en una cuenta. El responsable es Smallpdf AG, en Zúrich.",
      },
      {
        type: "p",
        text: "Cachety se ahorra ese viaje. La página se carga una vez, después todo pasa dentro de tu navegador y el archivo no va a ninguna parte. Tampoco hay servicios de analítica ni de publicidad.",
      },
      { type: "h2", text: "¿Qué valor tiene la firma de Cachety?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "En qué es mejor Smallpdf" },
      {
        type: "list",
        items: [
          "Pedir firmas a otras personas con Sign.com y seguir su estado.",
          "Sellos digitales y un certificado de finalización.",
          "Una app para Android e iOS.",
        ],
      },
      { type: "h2", text: "En qué encaja mejor Cachety" },
      {
        type: "list",
        items: [
          "El archivo no se sube, ni siquiera durante una hora.",
          "Sin servicios de analítica ni de publicidad, tampoco con consentimiento.",
          "La foto de un documento en papel se convierte directamente en una página A4 firmada.",
          "Las páginas se reconstruyen: desaparecen el texto oculto, los metadatos, los adjuntos y la ubicación GPS de las fotos.",
        ],
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Tienen que firmar otras personas y quieres seguir el estado de las firmas.",
      "Necesitas un sello digital o un certificado de finalización.",
      "Ya usas Smallpdf para otras tareas con PDF.",
    ],
    chooseCachety: [
      "Tu documento tiene datos personales y no debe salir de tu dispositivo.",
      "Prefieres una web sin servicios de analítica ni de publicidad.",
      "Quieres rubricar cada página, añadir una marca de agua y poner una contraseña de una vez.",
    ],
    faq: [
      {
        q: "¿Smallpdf guarda mi PDF firmado?",
        a: "Según Smallpdf, los archivos se borran automáticamente al cabo de una hora, salvo que los guardes en tu cuenta de Smallpdf. Se procesan en servidores de la UE. Con Cachety, el archivo no se sube.",
      },
      {
        q: "¿Es jurídicamente vinculante una firma con Smallpdf o con Cachety?",
        a: "Smallpdf presenta sus firmas como jurídicamente vinculantes, con el aviso de que compruebes siempre la legislación local; Sign.com habla de estándares eIDAS sin indicar el nivel. Cachety crea una firma electrónica simple: vale si nadie la impugna, pero pesa poco si alguien lo hace. Solo una firma cualificada equivale a una firma manuscrita.",
      },
      {
        q: "¿Smallpdf es gratis?",
        a: "Smallpdf se puede usar gratis, con un límite diario de descargas; Sign.com es gratis para un número limitado de documentos al mes. Cachety es gratis, sin versión de pago.",
      },
    ],
    sources: [
      { label: "Smallpdf: firmar PDF", url: "https://smallpdf.com/sign-pdf" },
      { label: "Smallpdf: firma electrónica", url: "https://smallpdf.com/sign" },
      { label: "Smallpdf: precios", url: "https://smallpdf.com/pricing" },
      { label: "Sign.com para Smallpdf", url: "https://sign.com/smallpdf" },
      { label: "Smallpdf: política de privacidad", url: "https://smallpdf.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
