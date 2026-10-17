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
          "En «¿Para qué es esta copia?», escribe el motivo o elige el ejemplo Alquiler en «O elige uno:». En «¿Quién la va a recibir?», pon el nombre de la inmobiliaria. La fecha se añade sola.",
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
        text: "¿Estás mirando varios pisos? Añade cada inmobiliaria con «+ Añadir otro destinatario»: cada una recibe su propia copia, con su nombre. Si una copia aparece donde no debe, sabrás de dónde salió.",
      },
      { type: "h2", text: "Oculta lo que no necesitan ver" },
      {
        type: "p",
        text: "Para comprobar tus ingresos, la inmobiliaria necesita ver tu sueldo, no en qué gastaste el resto del mes. Debajo de la vista previa, pulsa «Ocultar algo» y dibuja rectángulos sobre los números de cuenta o movimientos que no vienen al caso; luego pulsa «Listo». Lo que ocultas se elimina de verdad del archivo, no solo se cubre. Ten en cuenta, eso sí, que una marca de agua disuade y permite rastrear una filtración, pero no hace imposible el mal uso: alguien siempre podría fotografiar un documento.",
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
    updated: "2026-10-12",
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
          "Di para qué es la copia (escríbelo o elige un ejemplo) y quién la va a recibir. La fecha se añade sola.",
          "Revisa la vista previa. Comprueba que tu foto y tus datos se siguen leyendo a través de la marca.",
          "Descarga la copia con marca de agua y adjunta esa a tu correo.",
        ],
      },
      { type: "h2", text: "Anverso y reverso en un solo archivo" },
      {
        type: "p",
        text: "Si te piden las dos caras del documento, añade las dos fotos a la vez y descárgalas juntas en un solo PDF. Tú eliges el orden, para que el anverso vaya primero. Antes de descargar ves el tamaño del archivo; si la web donde tienes que subirlo lo limita, pulsa «Reducir el tamaño» y elige 10, 5, 2 o 1 MB.",
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
        a: "No. Con «Ajustar la marca de agua» eliges Suave, Normal o Marcado, y el resto (tamaño, color, opacidad) está en «Más ajustes». La vista previa te muestra exactamente lo que verá el destinatario antes de descargar.",
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
    updated: "2026-10-12",
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
          "Di para qué es la copia (escríbelo o elige el ejemplo Préstamo o Impuestos) y quién la va a recibir. La fecha se añade sola.",
          "Debajo de la vista previa, pulsa «Ocultar algo», dibuja rectángulos sobre los números que no deben verse y pulsa «Listo».",
          "Revisa cada página en la vista previa. En «Antes de descargar», elige «Un solo PDF» para juntarlo todo en el orden que quieras, o «Archivos separados (ZIP)», y descarga.",
        ],
      },
      {
        type: "tip",
        text: "Pulsa «Editar el texto» e inserta {código}, por ejemplo «ref. {código}»: cada copia lleva su propio código corto, y tras la descarga Cachety te muestra la lista para que la guardes con «Guardar la lista». Si un día una nómina aparece donde no debe, sabrás a quién se la enviaste.",
      },
      { type: "h2", text: "Añade una contraseña si va por correo" },
      {
        type: "p",
        text: "Marca «Proteger con contraseña» y el PDF se cifra con AES-256. Cachety crea una contraseña fácil de leer, de 12 palabras, y te la muestra después de descargar; si prefieres la tuya, elige «Elegir mi propia contraseña». Así, si el correo acaba en la bandeja equivocada, nadie podrá abrir el archivo sin ella. Envía la contraseña por otra vía, por ejemplo en un SMS o por teléfono, nunca en el mismo correo que el archivo.",
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
    updated: "2026-10-12",
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
          "Di para qué es la copia y quién la va a recibir. La fecha se añade sola.",
          "Debajo de la vista previa, pulsa «Ocultar algo», dibuja rectángulos sobre todo lo que quieras tapar y pulsa «Listo».",
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
    updated: "2026-10-12",
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
        text: "Tus fotos de documentos viven en tu móvil, así que tiene sentido ponerles la marca de agua ahí mismo. No hace falta enviártelas por correo, pasarlas a otro equipo ni dejar copias sueltas por ahí. Cachety funciona en el navegador del móvil, como Safari o Chrome. Tus fotos se procesan en el propio teléfono y nunca se suben. Es la misma herramienta que en un PC, con las mismas funciones: ejemplos listos, zonas ocultas, varios destinatarios y contraseña opcional.",
      },
      { type: "h2", text: "Paso a paso" },
      {
        type: "steps",
        items: [
          "Abre cachety.com en Safari, Chrome o el navegador que uses.",
          "Toca la zona para elegir archivos y selecciona las fotos o los PDF que quieres enviar. Puedes elegir varios a la vez.",
          "Di para qué es la copia (escríbelo o elige un ejemplo) y quién la va a recibir. La fecha se añade sola.",
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
    updated: "2026-10-12",
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
          "Di para qué es la copia y quién la va a recibir. La fecha se agrega sola.",
          "Si no hace falta mostrar tu domicilio o alguna clave, toca «Ocultar algo» debajo de la vista previa y dibuja un rectángulo encima.",
          "Revisa la vista previa y descarga la copia. Envía esa, nunca la foto original.",
        ],
      },
      {
        type: "tip",
        text: "Toca «Editar el texto» e inserta {código}: cada copia lleva su propio código corto, y tras la descarga Cachety te da la lista para que la guardes. Si tu INE aparece donde no debe, sabrás a quién se la diste.",
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
    updated: "2026-10-12",
  },

  // Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
  // Guías de firma (herramienta Firmar, /es/sign).
  {
    slug: "firmar-contrato-alquiler-online",
    topic: "sign",
    tool: "sign",
    title: "Cómo firmar un contrato de alquiler o un documento del piso online, sin subirlo",
    metaTitle: "Firmar un contrato de alquiler online, gratis y sin subirlo",
    description:
      "Firma el contrato de alquiler, el inventario o cualquier papel del piso en tu navegador: dibuja o escribe tu firma, colócala y descarga. No se sube nada.",
    intro:
      "Las inmobiliarias y los caseros suelen mandar el contrato de alquiler en PDF y pedir que se lo devuelvas firmado por correo. No hace falta imprimir, escanear ni crear una cuenta: puedes firmarlo en tu navegador en un minuto, y el documento nunca sale de tu dispositivo.",
    example: "Contrato de alquiler firmado – solo para Inmobiliaria Sol – 17/10/2026",
    body: [
      { type: "h2", text: "Lo que te pueden pedir firmar" },
      {
        type: "p",
        text: "Alquilar un piso trae papeles: el contrato de alquiler, el inventario del mobiliario o el acta de entrega de llaves, a veces una declaración para el estudio de solvencia. Casi todo llega en PDF, con una línea para la firma. Lo habitual es una web de firma que te pide subir el archivo y abrir una cuenta, o imprimir, firmar, escanear y reenviar. Cachety lo hace en tu navegador.",
      },
      { type: "h2", text: "Cómo firmar los papeles del alquiler con Cachety" },
      {
        type: "steps",
        items: [
          "Abre cachety.com/es/sign en tu navegador, en el ordenador o en el móvil. No hay nada que instalar ni cuenta que crear.",
          "Tus documentos: suelta el PDF en la página o tócala para elegirlo. Puedes añadir varios a la vez, por ejemplo el contrato y el inventario. También vale una foto de un documento en papel: se convierte en un PDF de una página.",
          "Tu firma: dibújala con el dedo, un lápiz táctil o el ratón, escribe tu nombre o sube una foto de tu firma sobre papel blanco. Debajo puedes dejar la fecha de hoy y, si quieres, añadir el lugar y una nota breve como «Leído y conforme».",
          "Coloca, revisa y descarga: tu firma aparece abajo a la derecha de la última página. Arrástrala hasta la línea de firma y cambia su tamaño desde la esquina. Si la inmobiliaria pide rubricar cada página, activa la opción de rubricar todas las páginas.",
          "Revisa la vista previa y descarga. La copia firmada conserva el nombre original con -signed al final. Esa es la copia que devuelves.",
        ],
      },
      {
        type: "p",
        text: "Con varios documentos, cada uno tiene su propia colocación. Un documento no está listo hasta que tu firma está en él: la lista te indica cuáles siguen esperando.",
      },
      {
        type: "tip",
        text: "Después de la descarga, Cachety muestra la huella de cada archivo: un código corto calculado a partir del archivo exacto que enviaste. Cópiala y guárdala con tus papeles. Si algún día aparece otra versión del contrato, podrás demostrar que no es la que firmaste.",
      },
      { type: "h2", text: "Opciones que conviene conocer" },
      {
        type: "list",
        items: [
          "Rubricar todas las páginas pone una copia pequeña de tu firma abajo a la derecha de cada una de las demás páginas, así una página cambiada se nota más.",
          "«Proteger con contraseña» está desactivada por defecto, porque la inmobiliaria tiene que poder abrir el archivo. Actívala solo si le das la contraseña por otra vía, por ejemplo por teléfono.",
          "«Reducir el tamaño» ayuda cuando el correo o el portal de la inmobiliaria limita el peso del archivo.",
          "Añadir también una marca de agua escribe el motivo, el destinatario y la fecha sobre la copia firmada.",
        ],
      },
      { type: "h2", text: "Tus documentos nunca salen de tu dispositivo" },
      {
        type: "p",
        text: "Cachety funciona dentro de tu navegador. No hay ningún servidor que reciba tus documentos, y la página tiene técnicamente prohibido contactar con cualquier otra web. Compruébalo tú mismo: cuando la página haya cargado, activa el modo avión y firma tu documento. Todo sigue funcionando. Tu firma tampoco se guarda: solo existe en la memoria de la pestaña y desaparece al cerrarla.",
      },
      {
        type: "p",
        text: "Cada página de la copia firmada se reconstruye a partir de sus píxeles. Así se elimina el texto oculto y los metadatos, y el texto ya no se puede seleccionar en la copia firmada. Tu original se queda contigo, intacto.",
      },
      { type: "h2", text: "¿Vale esta firma para un contrato de alquiler?" },
      {
        type: "p",
        text: "Una firma que dibujas o escribes y colocas en el documento es lo que la ley llama una firma electrónica simple. En la UE, a una firma no se le pueden negar efectos jurídicos solo por ser electrónica (Reglamento eIDAS, artículo 25). Para los papeles habituales de un alquiler, suele bastar. Aun así, las normas cambian según el país y el documento.",
      },
      {
        type: "p",
        text: "Si alguna vez se discute la firma, puede que tengas que demostrar tú que firmaste. Una firma cualificada, hecha con un certificado de un proveedor reconocido, goza de una presunción de fiabilidad que la firma simple no tiene.",
      },
      {
        type: "warning",
        text: "No es la herramienta adecuada cuando se exige una firma cualificada o cuando la otra parte insiste en una plataforma concreta: algunos contratos de préstamo o de seguro, las escrituras ante notario, ciertos trámites con la Administración. En esos casos, usa lo que te pidan. Esto no es asesoramiento jurídico.",
      },
      { type: "h2", text: "¿Alguien puede reutilizar mi firma?" },
      {
        type: "p",
        text: "Tu firma forma parte de la imagen de cada página, así que no se puede mover ni borrar editando el PDF. Pero, como con una firma en papel escaneada, alguien podría recortarla de la imagen y pegarla en otro sitio. Ninguna imagen de una firma puede impedirlo. Para reducir el riesgo, añade una marca de agua que ate la copia a su motivo y su destinatario, y rubrica cada página.",
      },
    ],
    faq: [
      {
        q: "¿La inmobiliaria acepta un documento firmado así?",
        a: "En la mayoría de los casos, sí: devolver un PDF firmado por correo es habitual en los papeles de alquiler. Si la inmobiliaria usa su propia plataforma de firma y la exige, usa la suya.",
      },
      {
        q: "¿Tengo que imprimir algo?",
        a: "No. Firmas en la pantalla y devuelves el PDF firmado. Si solo tienes el documento en papel, hazle una foto nítida con buena luz y firma sobre la foto.",
      },
      {
        q: "¿Se guarda mi firma?",
        a: "No. Solo existe en la memoria de la pestaña. Ciérrala y desaparece. La próxima vez la vuelves a dibujar o escribir.",
      },
      {
        q: "¿Puedo copiar todavía el texto del PDF firmado?",
        a: "No. Cada página se reconstruye a partir de sus píxeles, lo que también elimina el texto oculto y los metadatos. Guarda tu original si necesitas el texto.",
      },
      {
        q: "¿Cachety es gratis de verdad?",
        a: "Sí. Es gratis, sin cuenta y sin rastreo. Es software libre hecho en Francia por Amir Moradi.",
      },
    ],
    updated: "2026-10-17",
  },
  {
    slug: "firmar-pdf-desde-el-movil",
    topic: "sign-phone",
    tool: "sign",
    title: "Cómo firmar un PDF desde el móvil, en iPhone o Android",
    metaTitle: "Firmar un PDF desde el móvil: iPhone y Android, gratis",
    description:
      "Firma un PDF con el dedo en tu iPhone o tu móvil Android. Sin instalar ninguna app, sin cuenta, y el documento nunca se sube a internet. Gratis.",
    intro:
      "Te han mandado un PDF para firmar y devolver, y no tienes un ordenador a mano. Puedes firmarlo con el dedo en el móvil, en el propio navegador, en un minuto.",
    example: "Autorización firmada – solo para el colegio Los Almendros – 17/10/2026",
    body: [
      { type: "h2", text: "Sin app, sin cuenta, sin subir nada" },
      {
        type: "p",
        text: "Cachety funciona en el navegador de tu móvil, como Safari o Chrome. No hay nada que descargar de una tienda de aplicaciones ni cuenta que crear. El documento se procesa en el propio móvil y nunca se sube: la página tiene técnicamente prohibido contactar con cualquier otra web.",
      },
      { type: "h2", text: "Paso a paso" },
      {
        type: "steps",
        items: [
          "Guarda en el móvil el PDF que te enviaron. En la mayoría de las apps de correo, toca el adjunto y guárdalo en Archivos en el iPhone o en Descargas en Android.",
          "Abre cachety.com/es/sign en tu navegador, toca la zona para elegir archivos y escoge el PDF. También vale una foto de un documento en papel.",
          "Dibuja tu firma en el recuadro con el dedo. ¿No te convence? Deshaz el último trazo o bórrala entera y vuelve a intentarlo. También puedes escribir tu nombre o subir una foto de tu firma.",
          "Elige qué va debajo de la firma, si quieres algo. La fecha de hoy viene activada, y puedes añadir el lugar y una nota como «Leído y conforme».",
          "Pasa al paso de colocar, revisar y descargar. Tu firma aparece abajo a la derecha de la última página. Arrástrala con el dedo y cambia su tamaño desde la esquina.",
          "Revisa la vista previa, descarga el PDF firmado y devuélvelo por correo o por una app de mensajería.",
        ],
      },
      {
        type: "tip",
        text: "Firma un poco más grande que en papel y sin prisa. El espacio vacío alrededor de la firma se recorta solo, para que quede nítida en la página.",
      },
      { type: "h2", text: "¿Prefieres una foto de tu firma?" },
      {
        type: "p",
        text: "Si firmar con el dedo te resulta incómodo, firma en una hoja blanca con un bolígrafo oscuro, hazle una foto con luz de día y elige subir una imagen. El fondo blanco se quita automáticamente. Si todavía se ve algo de papel, mueve el control de sensibilidad. Las fotos del iPhone (HEIC) también funcionan.",
      },
      { type: "h2", text: "Comprueba que todo se queda en tu móvil" },
      {
        type: "p",
        text: "Cuando la página haya cargado, activa el modo avión, elige tu PDF y fírmalo. Todo sigue funcionando, lo que demuestra que no se envía nada a ninguna parte. Tu firma no se guarda: cierra la pestaña y desaparece.",
      },
      { type: "h2", text: "Opciones antes de descargar" },
      {
        type: "list",
        items: [
          "Rubricar todas las páginas añade una copia pequeña de tu firma en las demás páginas.",
          "«Reducir el tamaño» deja el archivo por debajo del peso que admite un correo o una web.",
          "«Proteger con contraseña» está desactivada por defecto, para que el destinatario pueda abrir el archivo enseguida.",
          "Tras la descarga se muestra la huella del archivo. Guárdala: si algún día aparece otra versión, podrás demostrar que no es la que firmaste.",
        ],
      },
      { type: "h2", text: "Qué valor tiene esta firma" },
      {
        type: "p",
        text: "Una firma dibujada en el móvil y colocada en el documento es una firma electrónica simple. Suele bastar para documentos del día a día, como autorizaciones del colegio, formularios de un club o una asociación, presupuestos y papeles del alquiler. Si alguna vez se discute, puede que tengas que demostrar tú que firmaste.",
      },
      {
        type: "warning",
        text: "No es la herramienta adecuada cuando se exige una firma cualificada con certificado, o cuando la otra parte insiste en su propia plataforma: algunos contratos de préstamo o de seguro, las escrituras ante notario, ciertos trámites con la Administración. Y, como con una firma en papel escaneada, alguien podría recortar tu firma de la copia y reutilizarla. Una marca de agua con el motivo y el destinatario, y una rúbrica en cada página, reducen ese riesgo. Esto no es asesoramiento jurídico.",
      },
    ],
    faq: [
      {
        q: "¿Tengo que descargar una app?",
        a: "No. Cachety funciona en el navegador del móvil. Puedes añadirlo a la pantalla de inicio para tenerlo a mano, pero no es obligatorio.",
      },
      {
        q: "¿Puedo firmar con un lápiz táctil?",
        a: "Sí. El recuadro de firma funciona con el dedo, con un lápiz táctil o, en el ordenador, con el ratón.",
      },
      {
        q: "¿Se sube el PDF a algún sitio?",
        a: "No. Todo ocurre en tu móvil. Activa el modo avión cuando la página haya cargado y verás que sigue funcionando.",
      },
      {
        q: "¿Por qué ya no puedo seleccionar el texto del PDF firmado?",
        a: "Cada página se reconstruye a partir de sus píxeles: así la firma no se puede despegar y se eliminan los datos ocultos. Tu original sigue en tu móvil, intacto.",
      },
    ],
    updated: "2026-10-17",
  },
];
