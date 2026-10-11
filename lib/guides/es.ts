import type { Guide } from "./types";

// Guías en español, pensadas sobre todo para España (DNI, NIE, nóminas,
// Hacienda) y, en la última, para México y Latinoamérica (credencial del INE).
// No son traducciones: son equivalentes locales. Solo texto plano: sin enlaces,
// sin HTML, sin markdown. Empresas y nombres de ejemplo inventados.

export const GUIDES_ES: Guide[] = [
  {
    slug: "marca-de-agua-dni-alquiler",
    topic: "rental",
    title: "Cómo poner una marca de agua a tu DNI, NIE y nóminas para alquilar un piso",
    metaTitle: "Marca de agua en el DNI y nóminas para alquilar un piso",
    description:
      "¿Vas a alquilar? Pon una marca de agua a tu DNI o NIE, nóminas y extractos para la inmobiliaria en un minuto, gratis y sin subirlos a ninguna web.",
    intro:
      "Para alquilar un piso te piden casi siempre la misma carpeta: DNI o NIE, nóminas, contrato de trabajo y a veces extractos del banco. Una marca de agua deja claro para quién era cada copia y la hace mucho menos útil para cualquier otra persona.",
    example: "Solicitud de alquiler – Inmobiliaria Sol – 11/10/2026",
    body: [
      { type: "h2", text: "Por qué te piden tantos papeles" },
      {
        type: "p",
        text: "El propietario o la inmobiliaria quiere saber quién eres y si puedes pagar el alquiler. Por eso te piden una copia de tu documento de identidad y pruebas de tus ingresos: las últimas nóminas, el contrato de trabajo, a veces la declaración de la renta o un informe de vida laboral. Casi siempre se tratan con cuidado. Pero esos papeles viajan por correo o por WhatsApp, se quedan en bandejas de entrada y carpetas compartidas, y a veces pasan a una aseguradora de impago. Cada copia de más es una oportunidad más de que algo salga mal.",
      },
      { type: "h2", text: "El timo del piso que no existe" },
      {
        type: "p",
        text: "Es un engaño muy extendido. Alguien publica un piso bonito a buen precio, a menudo copiado de un anuncio real. Te dice que hay muchos interesados y te pide tu DNI y tus nóminas «para reservar la visita». El piso no existe, y tus documentos acaban sirviendo para abrir cuentas o pedir créditos a tu nombre. Una marca de agua con el nombre de la inmobiliaria y el motivo hace que esa copia sirva de muy poco: quien intente reutilizarla tendría que explicar por qué tu DNI dice «Solicitud de alquiler – Inmobiliaria Sol».",
      },
      {
        type: "warning",
        text: "Desconfía si te piden el DNI antes de haber visto el piso, o una señal por transferencia para reservar una vivienda que no has visitado. Si crees que te han engañado, avisa a tu banco enseguida y denuncia ante la Policía o la Guardia Civil. En España, el 017 de INCIBE te asesora gratis sobre ciberseguridad.",
      },
      { type: "h2", text: "Cómo hacerlo con Cachety" },
      {
        type: "steps",
        items: [
          "Abre cachety.com en tu navegador. No hay nada que instalar ni cuenta que crear.",
          "Suelta tus archivos en la página o tócala para elegirlos. Puedes añadir a la vez el DNI, las nóminas y los extractos.",
          "Escribe el texto de la marca de agua o elige la plantilla Alquiler y complétala. Añade el nombre de la inmobiliaria y pulsa el botón para añadir la fecha de hoy.",
          "Revisa la vista previa: el texto se repite en diagonal por todas las páginas.",
          "Descarga las copias con marca de agua y envía esas, nunca los originales.",
        ],
      },
      {
        type: "p",
        text: "Tus archivos no salen de tu dispositivo. Cachety funciona dentro de tu navegador: no hay ningún servidor que reciba tus documentos. Una vez cargada la página, puedes incluso activar el modo avión y sigue funcionando.",
      },
      {
        type: "tip",
        text: "¿Estás mirando varios pisos? Activa la opción de varios destinatarios para crear de una vez una versión por inmobiliaria, cada una con su nombre. Si una copia aparece donde no debe, sabrás de dónde salió.",
      },
      { type: "h2", text: "Oculta lo que no necesitan ver" },
      {
        type: "p",
        text: "Para comprobar tus ingresos, la inmobiliaria necesita ver tu sueldo, no en qué gastaste el resto del mes. En la vista previa puedes dibujar rectángulos para tapar números de cuenta o movimientos que no vienen al caso. Lo que ocultas se elimina de verdad del archivo, no solo se cubre. Ten en cuenta, eso sí, que una marca de agua disuade y permite rastrear una filtración, pero no hace imposible el mal uso: alguien siempre podría fotografiar un documento.",
      },
    ],
    faq: [
      {
        q: "¿La inmobiliaria aceptará un DNI con marca de agua?",
        a: "En la gran mayoría de los casos, sí. La marca de agua es semitransparente, así que tus datos se siguen leyendo bien. Si necesitan ver el original, te lo pedirán en persona; la copia con marca de agua es para lo que envías por correo o subes a una web.",
      },
      {
        q: "¿Qué pongo en la marca de agua?",
        a: "Tres cosas: para qué es, para quién y la fecha. Por ejemplo: Solicitud de alquiler – Inmobiliaria Sol – 11/10/2026.",
      },
      {
        q: "¿Cachety es gratis de verdad?",
        a: "Sí. Es gratis, sin cuenta y sin rastreo. Es software de código abierto hecho en Francia por Amir Moradi.",
      },
      {
        q: "¿La inmobiliaria puede quitar la marca de agua?",
        a: "No con solo editar el PDF: la marca de agua queda fundida en la propia página. Aun así, ninguna marca de agua hace imposible el mal uso, así que envía solo lo que de verdad te piden.",
      },
    ],
    updated: "2026-10-11",
  },
  {
    slug: "marca-de-agua-copia-dni-nie",
    topic: "id-card",
    title: "Cómo poner una marca de agua a una copia del DNI o del NIE",
    metaTitle: "Cómo poner una marca de agua a una copia del DNI o NIE",
    description:
      "Protege la copia de tu DNI o NIE con una marca de agua antes de enviarla. Gratis, sin cuenta y sin que la foto de tu documento salga de tu móvil.",
    intro:
      "Una copia limpia de tu DNI o de tu tarjeta de extranjero es justo lo que busca quien quiere suplantar una identidad. Ponerle una marca de agua antes de enviarla lleva un minuto y la hace mucho más difícil de aprovechar.",
    example: "Copia para alta de cliente – Banco Mirasol – 11/10/2026",
    body: [
      { type: "h2", text: "Por qué una copia sin marca es un riesgo" },
      {
        type: "p",
        text: "Tu DNI o tu NIE reúnen tu nombre completo, tu número de documento, tu fecha de nacimiento, tu foto y tu firma. Te piden una copia el banco, la empresa que te contrata, la compañía de la luz, el gimnasio o la gestoría. En cuanto la envías, ya no controlas dónde se guarda ni quién la ve. Una copia sin marca vale para cualquier cosa. Una copia con marca de agua dice para quién era, para qué y cuándo. Así cuesta mucho más usarla para otra cosa, como abrir una cuenta a tu nombre.",
      },
      { type: "h2", text: "Cómo es una buena marca de agua" },
      {
        type: "p",
        text: "Sigue una fórmula sencilla: motivo, destinatario y fecha. «Copia para alta de cliente – Banco Mirasol – 11/10/2026» es perfecta. Evita poner solo «COPIA»: no dice dónde debería haberse quedado esa copia. Y sé breve: la marca de agua admite hasta 120 caracteres, pero con una docena de palabras basta.",
      },
      {
        type: "list",
        items: [
          "Motivo: alta de cliente, contrato de alquiler, proceso de selección.",
          "Destinatario: el nombre de la empresa o de la persona.",
          "Fecha: el día en que la envías, para que una copia antigua no pase por nueva.",
        ],
      },
      { type: "h2", text: "Paso a paso con Cachety" },
      {
        type: "steps",
        items: [
          "Abre cachety.com en el ordenador o en el móvil.",
          "Suelta una foto o un escaneo de tu DNI o NIE. Las fotos de iPhone (HEIC) también valen.",
          "Escribe el texto de la marca de agua o parte de una plantilla, y pulsa el botón para añadir la fecha de hoy.",
          "Revisa la vista previa. Comprueba que tu foto y tus datos se siguen leyendo a través de la marca.",
          "Descarga la copia con marca de agua y adjunta esa a tu correo.",
        ],
      },
      { type: "h2", text: "Anverso y reverso en un solo archivo" },
      {
        type: "p",
        text: "Si te piden las dos caras del documento, añade las dos fotos a la vez y descárgalas juntas en un solo PDF. Tú eliges el orden, para que el anverso vaya primero. Si la web donde tienes que subirlo limita el tamaño, puedes fijar un máximo de 1, 2, 5 o 10 MB por archivo.",
      },
      {
        type: "tip",
        text: "Cachety también borra los datos ocultos del archivo que te entrega, como la ubicación GPS que guardan las fotos del móvil. Así tu copia no revela sin querer dónde vives.",
      },
      {
        type: "p",
        text: "Todo ocurre en tu propio dispositivo: tu DNI no se sube a ningún sitio, porque no hay servidor al que subirlo. Recuerda que una marca de agua disuade y permite rastrear una filtración, pero no impide que alguien fotografíe el documento. Si pierdes el DNI o crees que lo están usando sin tu permiso, denúncialo ante la Policía y avisa a tu banco.",
      },
    ],
    faq: [
      {
        q: "¿Es seguro enviar una foto del DNI por correo o WhatsApp?",
        a: "Es habitual, pero hazlo solo con quien hayas comprobado que es de fiar, y solo cuando de verdad lo necesite. Ponle antes una marca de agua para que la copia quede vinculada a ese único uso.",
      },
      {
        q: "¿La marca de agua hará ilegible mi DNI?",
        a: "No. Puedes ajustar el tamaño, el color y la opacidad, y la vista previa te muestra exactamente lo que verá el destinatario antes de descargar.",
      },
      {
        q: "¿Cachety guarda una copia de mi DNI?",
        a: "No. Tu archivo se procesa en tu navegador, en tu dispositivo, y nunca se envía a Cachety ni a nadie.",
      },
      {
        q: "¿Sirve también para el pasaporte o el carné de conducir?",
        a: "Sí. Funciona igual con cualquier documento en PDF o en imagen: JPG, PNG, HEIC, WebP y otros formatos habituales.",
      },
    ],
    updated: "2026-10-11",
  },
  {
    slug: "enviar-nominas-declaracion-renta-seguro",
    topic: "tax-payslip",
    title: "Cómo enviar tus nóminas o la declaración de la renta de forma segura",
    metaTitle: "Enviar nóminas o la declaración de la renta con seguridad",
    description:
      "¿Te piden nóminas o la declaración de la renta? Ponles marca de agua y oculta el número de cuenta o de la Seguridad Social antes de enviarlas. Gratis.",
    intro:
      "Para una hipoteca, un préstamo o un alquiler te piden a menudo tus últimas nóminas y la declaración de la renta. Son de los papeles que más datos personales contienen. Así puedes compartirlos sin dar más de lo necesario.",
    example: "Estudio de préstamo – Financiera Alameda – 11/10/2026",
    body: [
      { type: "h2", text: "Lo que revelan estos documentos" },
      {
        type: "p",
        text: "Una nómina suele incluir tu nombre, tu NIF, tu número de afiliación a la Seguridad Social, el nombre de tu empresa, tu sueldo y a veces tu número de cuenta. La declaración de la renta va más allá: tu domicilio, tus ingresos de todo el año, tu situación familiar y la cuenta para la devolución. Con todo eso junto, alguien podría hacerse pasar por ti de forma muy convincente.",
      },
      { type: "h2", text: "Envía solo lo que te piden" },
      {
        type: "list",
        items: [
          "Si te piden las tres últimas nóminas, envía esas tres, no las del año entero.",
          "Si basta con el resumen de la declaración, no mandes todas las páginas.",
          "Oculta el número de cuenta si nadie tiene que hacerte un ingreso.",
          "Oculta el número de la Seguridad Social si no te lo han pedido expresamente.",
        ],
      },
      { type: "h2", text: "Paso a paso con Cachety" },
      {
        type: "steps",
        items: [
          "Abre cachety.com en tu navegador. No hace falta registrarse.",
          "Suelta tus nóminas y tu declaración en la página. Puedes añadir varios PDF a la vez.",
          "Escribe la marca de agua con el motivo, el destinatario y la fecha, o empieza desde la plantilla Préstamo o Hacienda.",
          "Pulsa «Ocultar una zona» y dibuja rectángulos sobre los números que no deben verse.",
          "Revisa cada página en la vista previa y descarga. Si quieres, júntalo todo en un solo PDF en el orden que elijas.",
        ],
      },
      {
        type: "tip",
        text: "Activa la copia rastreable: cada copia lleva la fecha y una referencia única, y Cachety te da un registro para que lo guardes. Si un día una nómina aparece donde no debe, sabrás a quién se la enviaste.",
      },
      { type: "h2", text: "Añade una contraseña si va por correo" },
      {
        type: "p",
        text: "Puedes proteger el PDF con una contraseña con cifrado AES-256. Así, si el correo acaba en la bandeja equivocada, nadie podrá abrir el archivo sin ella. Envía la contraseña por otra vía, por ejemplo en un SMS o por teléfono, nunca en el mismo correo que el archivo.",
      },
      {
        type: "warning",
        text: "Nadie serio te pedirá tu contraseña de acceso a Hacienda, tu Cl@ve o los códigos que te llegan por SMS para «verificar» tus nóminas. Si alguien lo hace, es un intento de fraude.",
      },
      {
        type: "p",
        text: "Todo el proceso ocurre en tu dispositivo: tus nóminas y tu declaración no se suben a ningún servidor. Una marca de agua no impide que alguien fotografíe la pantalla, pero deja claro para quién era cada copia y desanima a reutilizarla.",
      },
    ],
    faq: [
      {
        q: "¿Puedo tapar datos de una nómina antes de enviarla?",
        a: "Sí, siempre que dejes visible lo que te piden comprobar, normalmente tu nombre, tu empresa y tu sueldo. Si dudas, pregunta qué datos necesitan exactamente.",
      },
      {
        q: "¿El banco aceptará una declaración con marca de agua?",
        a: "Normalmente sí, porque los datos se siguen leyendo. Si alguna entidad necesita un documento oficial verificable, te lo dirá; la copia con marca de agua es para lo que envías tú.",
      },
      {
        q: "¿Se puede seguir buscando texto en el PDF después?",
        a: "No. Cachety rehace cada página como imagen, así que el texto ya no se puede seleccionar ni copiar. Es justo lo que protege lo que has ocultado. Guarda tu original en un lugar seguro.",
      },
    ],
    updated: "2026-10-11",
  },
  {
    slug: "tachar-datos-pdf-gratis",
    topic: "redact",
    title: "Cómo tachar u ocultar datos de un PDF gratis, y de verdad",
    metaTitle: "Cómo tachar u ocultar datos de un PDF gratis y de verdad",
    description:
      "Tacha datos de un PDF gratis y asegúrate de que el texto oculto desaparece. Por qué un recuadro negro a menudo no basta y cómo hacerlo bien.",
    intro:
      "Dibujar un recuadro negro sobre un número parece ocultarlo. Pero en muchos PDF el texto sigue debajo y cualquiera puede copiarlo. Así se tachan datos como es debido, gratis.",
    example: "Justificante de domicilio – Eléctrica Alborada – 11/10/2026",
    body: [
      { type: "h2", text: "Por qué un recuadro negro no siempre basta" },
      {
        type: "p",
        text: "Un PDF está hecho de capas. Cuando dibujas un rectángulo negro con muchos editores de PDF, solo añades una forma encima. El texto original sigue en el archivo. Alguien puede seleccionarlo, copiarlo y pegarlo en otro sitio, y ahí aparece de nuevo. Les ha pasado a muchas personas y organizaciones. Es un error fácil de cometer, porque en pantalla todo parece correcto.",
      },
      {
        type: "tip",
        text: "Una prueba rápida para cualquier PDF tachado: intenta seleccionar el texto bajo el recuadro, o busca con el lector de PDF una palabra que hayas ocultado. Si la encuentra, el tachado no ha funcionado.",
      },
      { type: "h2", text: "Cómo lo hace Cachety" },
      {
        type: "p",
        text: "Cachety no pone un recuadro encima. Rehace cada página como una imagen, con la zona ocultada en negro de verdad. El texto oculto desaparece del archivo, igual que la capa de texto seleccionable y los datos ocultos del archivo, como su autor o la ubicación GPS de una foto.",
      },
      {
        type: "steps",
        items: [
          "Abre cachety.com en tu navegador. No hace falta registrarse.",
          "Suelta tu PDF o tu imagen en la página. También valen JPG, PNG, HEIC y otros formatos habituales.",
          "Escribe una marca de agua corta con el motivo, el destinatario y la fecha.",
          "En la vista previa, pulsa «Ocultar una zona» y dibuja rectángulos sobre todo lo que quieras tapar.",
          "Revisa todas las páginas en la vista previa y descarga tu copia.",
        ],
      },
      { type: "h2", text: "Lo que se suele ocultar" },
      {
        type: "list",
        items: [
          "Números de cuenta e IBAN.",
          "El número de la Seguridad Social en nóminas y certificados.",
          "El número del DNI o del pasaporte, cuando solo necesitan tu nombre y tu foto.",
          "Datos médicos, o información sobre tus hijos u otros familiares.",
          "La firma, cuando la copia es solo informativa.",
        ],
      },
      { type: "h2", text: "Pensado para la privacidad" },
      {
        type: "p",
        text: "Muchas webs gratuitas para tachar PDF te piden subir el documento a sus servidores. Es una contradicción hacerlo justo con la información que quieres proteger. Cachety funciona al revés: tu archivo se queda en tu dispositivo, no se envía nada, y la página sigue funcionando en modo avión una vez cargada.",
      },
      {
        type: "warning",
        text: "Como la copia se rehace con imágenes, ya no podrás buscar ni copiar su texto. Esa es la idea, pero guarda el original en un lugar seguro por si lo necesitas más adelante. Y recuerda: ni el tachado ni la marca de agua impiden que alguien fotografíe lo que sí ve.",
      },
    ],
    faq: [
      {
        q: "¿Puedo tachar un PDF sin Adobe Acrobat?",
        a: "Sí. Cachety es gratis, funciona en cualquier navegador actual y elimina de verdad lo que ocultas, en lugar de solo taparlo.",
      },
      {
        q: "¿Se puede recuperar un texto tachado?",
        a: "Si solo se cubrió con una forma, muchas veces sí. Con Cachety, la zona ocultada se elimina del propio archivo, así que no queda texto escondido que recuperar.",
      },
      {
        q: "¿Tengo que poner marca de agua para tachar?",
        a: "Cachety está pensado para poner marcas de agua, así que también te pedirá un texto corto. Una marca con el motivo, el destinatario y la fecha es una buena costumbre de todos modos.",
      },
      {
        q: "¿Qué tamaño de PDF admite?",
        a: "Hasta 200 MB por archivo y 500 páginas por PDF.",
      },
    ],
    updated: "2026-10-11",
  },
  {
    slug: "marca-de-agua-desde-el-movil",
    topic: "phone",
    title: "Cómo poner una marca de agua a un documento desde el móvil",
    metaTitle: "Cómo poner una marca de agua desde el móvil, gratis",
    description:
      "Pon una marca de agua a tus documentos desde el móvil o celular, en iPhone o Android. Sin instalar nada, gratis, y tus fotos nunca se suben.",
    intro:
      "Casi siempre fotografiamos el DNI o la nómina con el móvil y lo enviamos desde ahí. Así puedes ponerle una marca de agua sin salir del teléfono y sin instalar ninguna aplicación.",
    example: "Alta de línea móvil – Telefonía Brisa – 11/10/2026",
    body: [
      { type: "h2", text: "Hazlo donde ya están tus fotos" },
      {
        type: "p",
        text: "Tus fotos de documentos viven en tu móvil, así que tiene sentido ponerles la marca de agua ahí mismo. No hace falta enviártelas por correo, pasarlas a otro equipo ni dejar copias sueltas por ahí. Cachety funciona en el navegador del móvil, como Safari o Chrome. Tus fotos se procesan en el propio teléfono y nunca se suben. Es la misma herramienta que en un PC, con las mismas funciones: plantillas, zonas ocultas, varios destinatarios y contraseña opcional.",
      },
      { type: "h2", text: "Paso a paso" },
      {
        type: "steps",
        items: [
          "Abre cachety.com en Safari, Chrome o el navegador que uses.",
          "Toca la zona para elegir archivos y selecciona las fotos o los PDF que quieres enviar. Puedes elegir varios a la vez.",
          "Escribe el texto de la marca de agua o elige una plantilla. Toca el botón para añadir la fecha de hoy.",
          "Revisa la vista previa.",
          "Descarga la copia con marca de agua y compártela por correo, WhatsApp o la aplicación que uses. Borra después las copias sin marca que hayas hecho por el camino.",
        ],
      },
      { type: "h2", text: "Las fotos del iPhone (HEIC) también valen" },
      {
        type: "p",
        text: "El iPhone suele guardar las fotos en un formato llamado HEIC, que algunas webs no aceptan. Cachety admite HEIC además de JPG, PNG, WebP y PDF, así que puedes usar las fotos directamente desde tu galería.",
      },
      {
        type: "tip",
        text: "Las fotos del móvil suelen guardar la ubicación GPS del lugar donde se hicieron, que puede ser tu casa. Cachety elimina esa información oculta de la copia que te entrega.",
      },
      { type: "h2", text: "Añádelo a tu pantalla de inicio" },
      {
        type: "p",
        text: "Puedes instalar Cachety como una app. En iPhone, toca el botón Compartir de Safari y luego «Añadir a pantalla de inicio». En Android, abre el menú del navegador y elige instalar la aplicación o añadirla a la pantalla de inicio. Después se abre con un toque, como cualquier otra app. En Android hay un extra práctico: una vez instalado, Cachety aparece en el menú Compartir. Desde tu galería o tus archivos, toca Compartir en un documento y elige Cachety para ponerle la marca de agua directamente.",
      },
      {
        type: "list",
        items: [
          "Gratis, sin cuenta y sin rastreo.",
          "Funciona sin internet una vez cargada la página.",
          "Varios destinatarios: una versión por persona de una sola vez.",
          "Contraseña opcional en el PDF descargado.",
        ],
      },
      {
        type: "warning",
        text: "Una marca de agua disuade del mal uso y permite rastrear una filtración, pero no impide que alguien haga una captura de tu pantalla. Envía tus documentos solo a quien hayas comprobado que es de fiar. Si alguna vez te engañan para que los compartas, avisa a tu banco y denúncialo.",
      },
    ],
    faq: [
      {
        q: "¿Tengo que descargar una aplicación?",
        a: "No. Cachety funciona en el navegador del móvil. Puedes añadirlo a la pantalla de inicio para tenerlo a mano, pero no es obligatorio.",
      },
      {
        q: "¿Funciona en móviles antiguos?",
        a: "Funciona en cualquier versión reciente de Safari o Chrome. Los PDF muy grandes pueden tardar más en un teléfono antiguo.",
      },
      {
        q: "¿Se suben mis fotos a algún sitio?",
        a: "No. Todo ocurre en tu teléfono. Puedes incluso activar el modo avión una vez cargada la página y sigue funcionando.",
      },
      {
        q: "¿Puedo hacer la foto directamente desde Cachety?",
        a: "Al tocar para elegir un archivo, tu móvil puede ofrecerte hacer una foto o escoger una de la galería. Una foto nítida y con buena luz da el mejor resultado.",
      },
    ],
    updated: "2026-10-11",
  },
  {
    slug: "copia-ine-robo-de-identidad",
    topic: "identity-theft",
    title: "Copia de tu INE: cómo protegerla del robo de identidad",
    metaTitle: "Copia de la INE: cómo protegerte del robo de identidad",
    description:
      "En México te piden copia de la INE para todo. Ponle una marca de agua con el motivo, el destinatario y la fecha para frenar la suplantación de identidad.",
    intro:
      "En México, la credencial para votar sirve de identificación para casi cualquier trámite: rentar un departamento, contratar un celular, pedir un crédito. Por eso circulan tantas copias, y por eso es una de las identificaciones favoritas de quien quiere suplantar a alguien.",
    example: "Copia para contrato de renta – Inmobiliaria Jacarandas – 11/10/2026",
    body: [
      { type: "h2", text: "Por qué la copia de la INE es tan valiosa para un estafador" },
      {
        type: "p",
        text: "Tu credencial reúne tu nombre completo, tu foto, tu firma, tu fecha de nacimiento, tu CURP, tu clave de elector y, muchas veces, tu domicilio. Con una copia limpia, alguien puede intentar abrir una cuenta, contratar un servicio o pedir un crédito a tu nombre. Y una vez que la entregas, no sabes en cuántos cajones, correos o chats va a quedarse.",
      },
      { type: "h2", text: "La vieja costumbre, en versión digital" },
      {
        type: "p",
        text: "Mucha gente ya escribe a mano sobre la fotocopia algo como «Copia para trámite de…». Es una buena idea. Hoy la mayoría de las copias se mandan por WhatsApp o por correo, y la versión digital de esa costumbre es una marca de agua: un texto repetido en diagonal por todo el documento, que dice para qué es la copia, para quién y en qué fecha.",
      },
      {
        type: "list",
        items: [
          "Para qué: contrato de renta, alta de servicio, solicitud de empleo.",
          "Para quién: el nombre de la empresa o de la persona.",
          "Cuándo: la fecha del día en que la envías.",
        ],
      },
      { type: "h2", text: "Paso a paso con Cachety" },
      {
        type: "steps",
        items: [
          "Abre cachety.com en el navegador de tu celular o de tu computadora.",
          "Agrega la foto de tu INE, de frente y de reverso. Las fotos de iPhone (HEIC) también funcionan.",
          "Escribe el texto de la marca de agua y toca el botón para agregar la fecha de hoy.",
          "Si no hace falta mostrar tu domicilio o alguna clave, dibuja un rectángulo para ocultarla.",
          "Revisa la vista previa y descarga la copia. Envía esa, nunca la foto original.",
        ],
      },
      {
        type: "tip",
        text: "Activa la copia rastreable: cada copia lleva una referencia única y Cachety te da un registro para que lo guardes. Si tu INE aparece donde no debe, sabrás a quién se la diste.",
      },
      {
        type: "warning",
        text: "Desconfía de quien te pida una foto de tu INE por mensaje para «liberar un premio», «verificar tu cuenta» o darte un préstamo inmediato. Si crees que están usando tus datos, avisa cuanto antes a tu banco, revisa tu historial en el buró de crédito y presenta una denuncia ante las autoridades. Si el problema es con un banco o una financiera, la CONDUSEF puede orientarte.",
      },
      {
        type: "p",
        text: "Todo ocurre en tu propio dispositivo: la foto de tu INE nunca se sube a ningún servidor. Cachety es gratis y no necesitas crear una cuenta. Recuerda que una marca de agua desanima y deja rastro, pero no impide que alguien fotografíe la copia: entrega solo lo que te piden, y solo a quien conozcas.",
      },
    ],
    faq: [
      {
        q: "¿Me pueden rechazar una copia de la INE con marca de agua?",
        a: "Es poco común, porque los datos se siguen leyendo bien. Si alguien necesita revisar la credencial original, te la pedirá en persona. La copia con marca de agua es para lo que envías por mensaje, correo o una página web.",
      },
      {
        q: "¿Sirve también para el pasaporte u otros documentos?",
        a: "Sí. Funciona con cualquier PDF o imagen: pasaporte, comprobante de domicilio, recibo de nómina o estado de cuenta.",
      },
      {
        q: "¿Cachety guarda una copia de mi INE?",
        a: "No. La imagen se procesa en tu navegador, en tu dispositivo, y nunca se envía a Cachety ni a nadie más.",
      },
      {
        q: "¿Funciona en otros países de Latinoamérica?",
        a: "Sí. Funciona igual con cualquier documento de identidad, sea cual sea tu país. Solo cambia el texto que escribes en la marca de agua.",
      },
    ],
    updated: "2026-10-11",
  },
];
