import type { SuggestCopy } from "./types";

// Draft translation from the English wording, awaiting native review (ROADMAP.md, backlog: Native review).
const COPY: SuggestCopy = {
  banner: (n) =>
    n > 1 ? `Hemos encontrado ${n} números que quizá quieras ocultar.` : "Hemos encontrado un número que quizá quieras ocultar.",
  review: "Revisar",
  title: "Sugerencias",
  hideAll: "Ocultar todos",
  hideAllDocs: "Ocultar todos en todos los documentos",
  hide: "Ocultar",
  hidden: "Oculto",
  undo: "Deshacer",
  dismiss: "Este no",
  onPage: (p) => `Página ${p}`,
  notShown: "Páginas que no aparecen en la vista previa",
  coverAll: "Las sugerencias cubren todas las páginas.",
  doneAll: (n, pages, pageCount) =>
    n > 1 ? `${n} zonas ocultas (${pageCount > 1 ? "páginas" : "página"} ${pages}).` : `1 zona oculta (página ${pages}).`,
  none: "No hay nada que sugerir en este documento.",
  noText: "No hay texto que leer en este documento: dibuja las zonas tú mismo.",
  incomplete: "Las sugerencias se han detenido antes del final de este documento.",
  footer:
    "Las sugerencias pueden pasar cosas por alto. Revisa tú mismo toda la página. Los códigos de barras y los códigos QR pueden contener la misma información.",
  note: {
    frTax: "El destinatario puede usarlo para comprobar que tu aviso de impuestos es auténtico. Ocúltalo solo si no lo necesita.",
    iban: "Si te ha pedido tus datos bancarios, lo necesita.",
  },
  kinds: {
    iban: "Número de cuenta (IBAN)",
    card: "Número de tarjeta",
    "fr-nir": "Número de la seguridad social (Francia)",
    "fr-tax": "Número fiscal (Francia)",
    "fr-tax-ref": "Referencia del aviso de impuestos (Francia)",
    "de-taxid": "Identificación fiscal (Alemania, Steuer-ID)",
    "es-dni": "Número de identidad (DNI/NIE)",
    "nl-bsn": "Número de servicio ciudadano (Países Bajos, BSN)",
    "be-nn": "Número nacional (Bélgica)",
    "pt-nif": "Número fiscal (Portugal, NIF)",
    "br-cpf": "CPF (Brasil)",
    "it-cf": "Código fiscal (Italia, codice fiscale)",
    "cn-id": "Documento de identidad de residente (China)",
    "jp-mynumber": "My Number (Japón)",
    "ir-melli": "Código nacional (Irán)",
    "id-nik": "NIK (Indonesia)",
  },
  announce: (label, page, hidden) => `${label}, página ${page}: ${hidden ? "oculto" : "visible de nuevo"}.`,
};

export default COPY;
