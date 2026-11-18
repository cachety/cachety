import type { SuggestCopy } from "./types";

// Draft translation from the English wording, awaiting native review (ROADMAP.md, backlog: Native review).
const COPY: SuggestCopy = {
  banner: (n) =>
    n > 1 ? `Encontramos ${n} números que você talvez queira ocultar.` : "Encontramos um número que você talvez queira ocultar.",
  review: "Revisar",
  title: "Sugestões",
  hideAll: "Ocultar todos",
  hideAllDocs: "Ocultar todos em todos os documentos",
  hide: "Ocultar",
  hidden: "Oculto",
  undo: "Desfazer",
  dismiss: "Este não",
  onPage: (p) => `Página ${p}`,
  notShown: "Páginas que não aparecem na prévia",
  coverAll: "As sugestões cobrem todas as páginas.",
  doneAll: (n, pages, pageCount) =>
    n > 1 ? `${n} áreas ocultas (${pageCount > 1 ? "páginas" : "página"} ${pages}).` : `1 área oculta (página ${pages}).`,
  none: "Nada a sugerir neste documento.",
  noText: "Não há texto para ler neste documento: desenhe as áreas você mesmo.",
  incomplete: "As sugestões pararam antes do fim deste documento.",
  footer:
    "As sugestões podem deixar passar alguma coisa. Confira você mesmo a página inteira. Códigos de barras e QR codes podem conter as mesmas informações.",
  note: {
    frTax: "O destinatário pode usá-lo para verificar se o seu aviso de imposto é autêntico. Oculte-o só se ele não precisar disso.",
    iban: "Se ele pediu seus dados bancários, precisa dele.",
  },
  kinds: {
    iban: "Número da conta (IBAN)",
    card: "Número do cartão",
    "fr-nir": "Número da seguridade social (França)",
    "fr-tax": "Número fiscal (França)",
    "fr-tax-ref": "Referência do aviso de imposto (França)",
    "de-taxid": "Identificação fiscal (Alemanha, Steuer-ID)",
    "es-dni": "Número de identidade (Espanha, DNI/NIE)",
    "nl-bsn": "Número de serviço ao cidadão (Países Baixos, BSN)",
    "be-nn": "Número nacional (Bélgica)",
    "pt-nif": "Número de contribuinte (Portugal, NIF)",
    "br-cpf": "CPF",
    "it-cf": "Código fiscal (Itália, codice fiscale)",
    "cn-id": "Documento de identidade de residente (China)",
    "jp-mynumber": "My Number (Japão)",
    "ir-melli": "Código nacional (Irã)",
    "id-nik": "NIK (Indonésia)",
  },
  announce: (label, page, hidden) => `${label}, página ${page}: ${hidden ? "oculto" : "visível de novo"}.`,
};

export default COPY;
