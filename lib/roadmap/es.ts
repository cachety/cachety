import type { RoadmapCopy, RoadmapId, Text } from "./types";

const ITEMS: Record<RoadmapId, Text> = {
  "per-recipient-password": {
    title: "Una contraseña distinta para cada destinatario",
    body: "La copia de cada destinatario, protegida con su propia contraseña, que aparece en la lista junto a los códigos después de descargar. Así, una contraseña filtrada solo abre una copia.",
  },
  "suggested-areas": {
    title: "Zonas para ocultar sugeridas",
    body: "Cachety detecta en la página números de cuenta, números de documento y datos parecidos, y te propone ocultarlos. La detección se hace en tu dispositivo, como todo lo demás.",
  },
  "more-languages": {
    title: "Más idiomas",
    body: "Italiano, coreano y turco.",
  },
  "purpose-from-recipient": {
    title: "Sugerir el motivo según el destinatario",
    body: "Al escribir el destinatario, por ejemplo una inmobiliaria, se podría sugerir el motivo que corresponde.",
  },
  "local-word-lists": {
    title: "Contraseñas fáciles de leer en tu idioma",
    body: "Palabras de la contraseña en tu propio idioma, solo con letras sin acentos para que se escriban igual en cualquier teclado.",
  },
  "simpler-tool": {
    title: "Una herramienta más sencilla",
    body: "Tres pasos con palabras claras: tu documento, para qué es y quién lo recibe, y luego la vista previa y la descarga. Las opciones avanzadas siguen a un toque.",
  },
  "easy-passwords": {
    title: "Contraseñas fáciles de leer",
    body: "Al proteger un archivo, ahora se crea una contraseña de 12 palabras al azar, tan segura como la frase de recuperación de un monedero de criptomonedas.",
  },
};

const COPY: RoadmapCopy = {
  nav: "Próximamente",
  title: "Lo que viene",
  lead: "En qué trabajamos ahora y qué ideas estamos estudiando. Cachety sigue siendo gratis y de código abierto, y todo se queda en tu dispositivo.",
  next: "Lo próximo",
  idea: "Ideas que estudiamos",
  shipped: "Novedades recientes",
  suggest: "Proponer una idea",
  suggestBody: "¿Echas algo en falta? Abre una incidencia en GitHub. Las ideas son bienvenidas en cualquier idioma.",
  meta: {
    title: "Lo que viene en Cachety: próximas funciones",
    description: "Próximas funciones de Cachety, la herramienta gratuita de marcas de agua que no saca tus documentos de tu dispositivo: lo próximo, ideas y novedades.",
  },
};

export default { items: ITEMS, copy: COPY };
