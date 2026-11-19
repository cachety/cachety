import type { SuggestCopy } from "./types";

// Wording from docs/prd-suggested-areas.md §10, as written.
const COPY: SuggestCopy = {
  banner: (n) => (n > 1 ? `We found ${n} numbers you may want to hide.` : "We found a number you may want to hide."),
  review: "Review",
  title: "Suggestions",
  hideAll: "Hide them all",
  hideAllDocs: "Hide them all in every document",
  hide: "Hide",
  hidden: "Hidden",
  undo: "Undo",
  dismiss: "Not this one",
  onPage: (p) => `Page ${p}`,
  notShown: "Pages not shown in the preview",
  coverAll: "Suggestions cover every page.",
  doneAll: (n, pages, pageCount) =>
    n > 1 ? `${n} areas hidden (${pageCount > 1 ? "pages" : "page"} ${pages}).` : `1 area hidden (page ${pages}).`,
  none: "Nothing to suggest on this document.",
  noText: "No text to read on this document: draw the areas yourself.",
  incomplete: "Suggestions stopped before the end of this document.",
  footer:
    "Suggestions can miss things. Check the whole page yourself. Barcodes and QR codes can contain the same information.",
  note: {
    frTax: "The recipient may use it to check that your tax notice is genuine. Hide it only if they don't need that.",
    iban: "If they asked for your bank details, they need it.",
  },
  kinds: {
    iban: "Bank account number (IBAN)",
    card: "Card number",
    "fr-nir": "Social security number (France)",
    "fr-tax": "Tax number (France)",
    "fr-tax-ref": "Tax notice reference (France)",
    "de-taxid": "Tax ID (Germany, Steuer-ID)",
    "es-dni": "ID number (Spain, DNI/NIE)",
    "nl-bsn": "Citizen service number (Netherlands, BSN)",
    "be-nn": "National number (Belgium)",
    "pt-nif": "Tax number (Portugal, NIF)",
    "br-cpf": "CPF (Brazil)",
    "it-cf": "Tax code (Italy, codice fiscale)",
    "cn-id": "Resident ID (China)",
    "jp-mynumber": "My Number (Japan)",
    "ir-melli": "National code (Iran)",
    "id-nik": "NIK (Indonesia)",
  },
  announce: (label, page, hidden) => `${label} on page ${page} ${hidden ? "hidden" : "shown again"}.`,
};

export default COPY;
