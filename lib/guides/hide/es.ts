// Guías sobre las zonas sugeridas para ocultar (es): encontrar y ocultar
// números de cuenta, dar el IBAN, enviar una copia de la tarjeta bancaria.
// Pensadas sobre todo para España. Solo texto plano: sin enlaces, sin HTML,
// sin markdown. Empresas y nombres de ejemplo inventados.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
//
// Estas guías describen la función `suggested-areas` (docs/prd-suggested-areas.md).
// Se publican con ella, no antes. Los botones nuevos de la función se describen
// sin citar su nombre: cuando existan en lib/locales/es/strings.ts, conviene
// citarlos tal cual.

import type { Guide } from "../types";

const UPDATED = "2026-11-18";

export const HIDE_GUIDES_ES: Guide[] = [
  // ------------------------------------------------------------------
  {
    slug: "ocultar-numeros-de-cuenta-pdf",
    topic: "auto-redact",
    title: "Cómo encontrar y ocultar números de cuenta en un PDF antes de enviarlo",
    metaTitle: "Encontrar y ocultar números de cuenta en un PDF, gratis",
    description:
      "Cachety detecta los IBAN y los números de tarjeta de tu PDF y te propone taparlos, en tu dispositivo. No se sube nada y nada se oculta sin ti.",
    intro:
      "Una nómina, una factura o un extracto bancario suelen llevar más de lo que necesita quien te los pide, como un número de cuenta o un número de tarjeta. Cachety te los señala en la página y te deja taparlos con un toque, sin que el archivo salga de tu dispositivo.",
    example: "Justificante de ingresos – Inmobiliaria Los Olivos – 18/11/2026",
    body: [
      { type: "h2", text: "Los números que envías sin darte cuenta" },
      {
        type: "p",
        text: "Cuando una inmobiliaria te pide tres nóminas, quiere ver quién te paga y cuánto. No necesita saber en qué cuenta cobras. Cuando una factura de la luz sirve de justificante de domicilio, nadie necesita los datos bancarios impresos al pie para la domiciliación. Pero esos números van en letra pequeña, en la página dos o tres, y casi todo el mundo envía el archivo tal cual.",
      },
      {
        type: "p",
        text: "Ocultarlos a mano funciona, pero hay que saber dónde mirar. Ahora Cachety los busca por ti.",
      },
      { type: "h2", text: "Qué busca Cachety" },
      {
        type: "p",
        text: "Cuando añades un PDF, Cachety lee su texto en tu navegador y busca números cuyo formato puede comprobar:",
      },
      {
        type: "list",
        items: [
          "Números de cuenta bancaria escritos como IBAN, de cualquier país.",
          "Números de tarjeta de pago de las principales redes de tarjetas.",
          "Números de la seguridad social de Francia, números fiscales franceses y referencias de avisos de impuestos franceses.",
        ],
      },
      {
        type: "p",
        text: "Un número solo se propone cuando supera la comprobación propia de su formato, como los dígitos de control de un IBAN, o cuando una etiqueta a su lado dice qué es. Un teléfono, una fecha o el total de una factura no se señalan solo por ser una fila de cifras.",
      },
      { type: "h2", text: "Cómo ocultarlos, paso a paso" },
      {
        type: "steps",
        items: [
          "Abre cachety.com en tu navegador, en el ordenador o en el móvil. No hay cuenta que crear.",
          "Añade tu PDF. Di para qué es la copia y luego quién la va a recibir.",
          "Si Cachety ha encontrado algo, un mensaje encima de la vista previa te dice cuántos números ha encontrado. Abre desde ahí la lista de sugerencias.",
          "Cada sugerencia aparece enmarcada en la página y figura en la lista con su nombre, por ejemplo número de cuenta bancaria (IBAN). Toca las que quieras ocultar, o elige ocultarlas todas. Puedes deshacer cada una.",
          "Revisa tú mismo todas las páginas. Dibuja un rectángulo sobre cualquier otra cosa que quieras ocultar y descarga tu copia.",
        ],
      },
      {
        type: "tip",
        text: "Nada se oculta hasta que tú lo decides. Si el destinatario te ha pedido tus datos bancarios, deja el IBAN a la vista: es justo lo que necesita.",
      },
      { type: "h2", text: "Lo que no puede encontrar" },
      {
        type: "list",
        items: [
          "Nada de lo que haya en una foto o en un escaneo. En una imagen no hay texto que leer, así que no hay sugerencias: dibuja tú los rectángulos.",
          "Los códigos de barras y los códigos QR. Pueden contener la misma información que el texto impreso a su lado.",
          "Los números con formatos que Cachety no comprueba, como un número de cliente o de contrato, o un número de pasaporte o de permiso de conducir.",
          "Nombres, direcciones, fechas de nacimiento y teléfonos. Suelen ser lo que el destinatario necesita, así que no se proponen.",
        ],
      },
      {
        type: "warning",
        text: "Las sugerencias son una ayuda, no una garantía. Pueden pasar cosas por alto. Revisa siempre tú mismo la página entera antes de enviarla.",
      },
      { type: "h2", text: "Eliminado de verdad, y sin subir nada" },
      {
        type: "p",
        text: "Una zona oculta no es una forma negra puesta encima del texto. Cachety rehace cada página como una imagen, así que el número desaparece del archivo y no se puede copiar de debajo. La búsqueda de números se hace en tu navegador, con reglas sencillas. Tu documento no se envía a ningún servidor ni a ningún servicio de inteligencia artificial, y la página sigue funcionando en modo avión una vez cargada.",
      },
    ],
    faq: [
      {
        q: "¿Cachety oculta los números automáticamente?",
        a: "No. Enmarca lo que ha encontrado y tú decides, uno por uno o todos a la vez. Algunos números están ahí porque el destinatario los necesita, y eso solo lo sabes tú.",
      },
      {
        q: "¿Funciona con una foto o un documento escaneado?",
        a: "No. Las sugerencias necesitan un PDF con texto de verdad, como las nóminas, facturas y extractos que descargas de una web. En una foto o un escaneo, dibuja tú los rectángulos con «Ocultar algo».",
      },
      {
        q: "¿Se envía mi documento a algún sitio para analizarlo?",
        a: "No. Las comprobaciones se hacen en tu navegador, en tu dispositivo. No se sube nada, y ningún servicio de inteligencia artificial lee tu archivo.",
      },
      {
        q: "¿Se le puede escapar algún número?",
        a: "Sí. Un número dentro de una imagen, un código de barras o un formato que Cachety no comprueba no se propondrá. Por eso la página siempre te pide que revises tú mismo.",
      },
      {
        q: "¿Cubre todas las páginas de un PDF largo?",
        a: "Sí. Las sugerencias cubren todas las páginas, también las que no se muestran en la vista previa. Para esas, la lista muestra los primeros y los últimos caracteres de cada número, para que sepas qué estás ocultando.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "es-seguro-dar-numero-de-cuenta-iban",
    topic: "iban",
    title: "¿Es seguro dar tu IBAN? Qué pueden hacer con tu número de cuenta",
    metaTitle: "¿Es seguro dar tu IBAN o tu número de cuenta?",
    description:
      "Qué puede y qué no puede hacer alguien con tu IBAN o tu número de cuenta, cuándo darlo y cómo ocultarlo en los documentos que no lo necesitan.",
    intro:
      "Das tu número de cuenta para que te paguen, y además va impreso en muchos documentos que envías por otros motivos. Por sí solo, el riesgo es bajo. El problema empieza cuando viaja junto con el resto de tus papeles.",
    example: "Datos bancarios para la nómina – RR. HH. de Conservas Albora – 18/11/2026",
    body: [
      { type: "h2", text: "Qué puede hacer alguien con tu número de cuenta" },
      {
        type: "p",
        text: "Con tu IBAN, alguien puede ingresar dinero en tu cuenta. Para eso sirve. Por sí solo, no basta para sacar dinero ni para hacer una transferencia: para eso hace falta tu tarjeta, tu acceso a la banca online o tu autorización.",
      },
      {
        type: "p",
        text: "El único riesgo real es un recibo domiciliado a tu nombre sin tu consentimiento. En la zona euro, puedes pedir a tu banco la devolución de un recibo domiciliado en un plazo de ocho semanas, y de trece meses si nunca lo autorizaste. Así que revisa tus extractos y avisa a tu banco de cualquier cargo que no reconozcas.",
      },
      { type: "h2", text: "El verdadero peligro es el conjunto" },
      {
        type: "p",
        text: "Los datos bancarios le sirven mucho más a un estafador cuando llegan junto con una copia de tu documento de identidad, tu dirección, tu firma y tus nóminas. Todo junto basta para intentar abrir una cuenta o pedir un crédito a tu nombre. Una solicitud de alquiler o la documentación para un trabajo contienen justo ese conjunto. Así que la pregunta no es tanto «¿mi número de cuenta es secreto?» como «¿esta persona lo necesita de verdad?».",
      },
      { type: "h2", text: "Cuándo darlo y cuándo ocultarlo" },
      {
        type: "list",
        items: [
          "Dalo cuando alguien tenga que pagarte o cobrarte un pago que has aceptado: tu empresa, un casero que te devuelve la fianza, una compañía de suministros que pagas por domiciliación.",
          "Ocúltalo cuando el documento se envía por otro motivo: una nómina como justificante de ingresos, una factura como justificante de domicilio, un extracto bancario que solo tiene que mostrar tu nombre y tu dirección.",
          "Si puedes, envía tus datos bancarios aparte, no en el mismo archivo que tu documento de identidad.",
        ],
      },
      { type: "h2", text: "Ocultar un número de cuenta con Cachety" },
      {
        type: "steps",
        items: [
          "Abre cachety.com en tu navegador. No se instala nada y no hay cuenta.",
          "Añade tu PDF o tu foto. Di para qué es la copia y luego quién la va a recibir.",
          "En un PDF, Cachety busca los IBAN y te avisa si encuentra alguno. Abre la lista de sugerencias y toca la sugerencia para ocultarla.",
          "Un número de cuenta que no esté escrito como IBAN no se propone, y tampoco nada de lo que haya en una foto: pulsa «Ocultar algo» y dibuja un rectángulo encima.",
          "Revisa todas las páginas y descarga tu copia.",
        ],
      },
      {
        type: "tip",
        text: "Cuando sí tengas que enviar tus datos bancarios, añade una marca de agua que diga para quién son y para qué, como «Datos bancarios para la nómina – RR. HH. de Conservas Albora». Una copia marcada así es difícil de reutilizar en otro sitio.",
      },
      { type: "h2", text: "Tu archivo se queda contigo" },
      {
        type: "p",
        text: "Cachety funciona en tu navegador. Tu extracto o tu nómina no se suben nunca, y el número oculto se elimina del propio archivo, no solo se tapa. Recuerda que las sugerencias pueden pasar cosas por alto: revisa cada página antes de enviarla.",
      },
    ],
    faq: [
      {
        q: "¿Pueden sacarme dinero de la cuenta con mi IBAN?",
        a: "Directamente, no. Un IBAN sirve para ingresar dinero. El riesgo es un recibo domiciliado sin tu consentimiento, y tienes derecho a que te lo devuelvan. Revisa tus extractos y avisa de todo lo que no reconozcas.",
      },
      {
        q: "¿Debo ocultar el IBAN en una nómina?",
        a: "Si la nómina se envía como justificante de ingresos, sí: el destinatario necesita tu nombre, tu empresa y tu sueldo, no tu cuenta. Si tu empresa te pide tus datos bancarios, envíalos aparte.",
      },
      {
        q: "Mi casero me ha pedido mi número de cuenta. ¿Es normal?",
        a: "Puede serlo, por ejemplo para domiciliar el alquiler o devolverte la fianza. En ese caso necesita el número, así que no lo ocultes. Añade una marca de agua con su nombre y el motivo.",
      },
      {
        q: "¿Qué hago si veo un recibo domiciliado que nunca autoricé?",
        a: "Avisa a tu banco enseguida y pide la devolución. En la zona euro tienes trece meses para reclamar un recibo domiciliado que no autorizaste.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "enviar-foto-tarjeta-bancaria-que-ocultar",
    topic: "bank-card",
    title: "¿Te piden una copia de tu tarjeta bancaria? Qué ocultar antes de enviarla",
    metaTitle: "Enviar una copia de tu tarjeta bancaria: qué ocultar",
    description:
      "¿Un hotel o un vendedor te pide una foto de tu tarjeta bancaria? Qué cifras ocultar, por qué no enviar nunca el código de seguridad y cómo taparlas.",
    intro:
      "Hoteles, empresas de alquiler de coches y algunos vendedores online siguen pidiendo una foto de tu tarjeta «para confirmar la reserva». Antes de enviar nada, oculta lo que nadie necesita. Mejor aún, pide una forma de pago más segura.",
    example: "Confirmación de reserva – Hotel Costa Alborada – 18/11/2026",
    body: [
      { type: "h2", text: "Por qué una foto de tu tarjeta es un riesgo" },
      {
        type: "p",
        text: "El anverso de una tarjeta muestra el número largo, la fecha de caducidad y tu nombre. El reverso muestra el código de seguridad (CVV), de tres cifras. Juntos, son todo lo que hace falta para pagar por internet con tu tarjeta. Un correo o un mensaje de chat puede quedarse años en varias bandejas de entrada, muy lejos de tu control.",
      },
      {
        type: "warning",
        text: "No envíes nunca el código de seguridad (CVV): las tres cifras del reverso de la tarjeta, o las cuatro del anverso en una American Express. Ningún negocio honrado lo necesita en una foto. Las propias normas de seguridad del sector de las tarjetas prohíben a los negocios conservarlo una vez hecho el pago.",
      },
      { type: "h2", text: "Pide antes otra forma" },
      {
        type: "p",
        text: "Un negocio que acepta tarjetas debería poder enviarte un enlace de pago seguro, cobrar a través de su sistema de reservas o comprobar la tarjeta cuando llegues. Pregunta. Si insisten en una copia, suele ser para comprobar que la tarjeta existe y está a tu nombre, y para eso basta una copia tapada en parte.",
      },
      { type: "h2", text: "Qué ocultar y qué dejar" },
      {
        type: "list",
        items: [
          "Oculta las cifras centrales del número de la tarjeta. Deja como mucho las cuatro últimas, que es lo que muestran los tiques.",
          "Oculta el código de seguridad. En el reverso, oculta toda la banda donde está impreso.",
          "Oculta la fecha de caducidad, salvo que te la pidan por un buen motivo.",
          "Deja tu nombre y el logotipo del banco, para que la copia siga demostrando que la tarjeta es tuya.",
        ],
      },
      { type: "h2", text: "Ocultar las cifras con Cachety" },
      {
        type: "steps",
        items: [
          "Haz una foto del anverso de la tarjeta. Fotografía el reverso solo si te lo piden.",
          "Abre cachety.com en el móvil o en el ordenador y añade la foto.",
          "Di para qué es la copia y luego quién la va a recibir, por ejemplo «Confirmación de reserva» y el nombre del hotel.",
          "Debajo de la vista previa, pulsa «Ocultar algo» y dibuja un rectángulo sobre las cifras centrales, la fecha de caducidad y el código de seguridad.",
          "Revisa la vista previa, descarga la copia y envíala.",
        ],
      },
      {
        type: "tip",
        text: "En un PDF, como un extracto que muestra un número de tarjeta completo, Cachety puede encontrar el número y proponerte ocultarlo. En una foto de la tarjeta no hay texto que leer, así que los rectángulos los dibujas tú.",
      },
      { type: "h2", text: "Qué pasa con la foto" },
      {
        type: "p",
        text: "Nada sale de tu dispositivo. Cachety funciona en tu navegador y no hay ningún servidor que reciba tu foto. Las cifras ocultas se eliminan de la imagen, no solo se tapan, y el lugar donde se hizo la foto se borra del archivo. La marca de agua dice para quién se hizo la copia, lo que hace más difícil reutilizarla.",
      },
      {
        type: "p",
        text: "Para ser sinceros, una copia tapada y con marca de agua reduce el riesgo, pero no lo elimina. Si una petición te da mala espina, no envíes la tarjeta, y llama al negocio a un número que hayas buscado tú.",
      },
    ],
    faq: [
      {
        q: "¿Qué cifras del número de mi tarjeta puedo enseñar?",
        a: "Las cuatro últimas bastan para casi todas las comprobaciones, y son las que las tiendas imprimen en los tiques. Las normas de seguridad de las tarjetas permiten a un negocio mostrar, como mucho, las primeras cifras, que identifican al banco, y las cuatro últimas. Oculta el resto.",
      },
      {
        q: "¿Es seguro enviar una foto de mi tarjeta por correo o WhatsApp?",
        a: "No con el número completo y el código de seguridad a la vista. Los mensajes se copian, se reenvían y se guardan, y la propia Visa aconseja no enviar nunca datos de pago por correo electrónico. Si tienes que enviar una copia, oculta antes las cifras centrales y el código de seguridad.",
      },
      {
        q: "El hotel quiere el anverso y el reverso. ¿Qué hago?",
        a: "Pregunta por qué y propón a cambio un enlace de pago seguro. Si acabas enviando el reverso, oculta el código de seguridad y la banda que lo rodea. Las normas del sector de las tarjetas no permiten a un negocio conservar ese código una vez hecho el pago.",
      },
      {
        q: "Ya he enviado una foto completa de mi tarjeta. ¿Y ahora?",
        a: "Llama a tu banco. Puede bloquear la tarjeta y enviarte una nueva, y te dirá cómo reclamar cualquier pago que no hayas hecho. Vigila tus extractos durante las semanas siguientes.",
      },
    ],
    updated: UPDATED,
  },
];
