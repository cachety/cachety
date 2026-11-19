import type { SuggestCopy } from "./types";

// Draft translation from the English wording, awaiting native review (ROADMAP.md, backlog: Native review).
const COPY: SuggestCopy = {
  banner: (n) =>
    n > 1
      ? `Wir haben ${n} Nummern gefunden, die du vielleicht schwärzen möchtest.`
      : "Wir haben eine Nummer gefunden, die du vielleicht schwärzen möchtest.",
  review: "Ansehen",
  title: "Vorschläge",
  hideAll: "Alle schwärzen",
  hideAllDocs: "Alle in allen Dokumenten schwärzen",
  hide: "Schwärzen",
  hidden: "Geschwärzt",
  undo: "Rückgängig",
  dismiss: "Diese nicht",
  onPage: (p) => `Seite ${p}`,
  notShown: "Seiten, die nicht in der Vorschau sind",
  coverAll: "Die Vorschläge gelten für alle Seiten.",
  doneAll: (n, pages, pageCount) =>
    n > 1 ? `${n} Bereiche geschwärzt (${pageCount > 1 ? "Seiten" : "Seite"} ${pages}).` : `1 Bereich geschwärzt (Seite ${pages}).`,
  none: "Für dieses Dokument gibt es keine Vorschläge.",
  noText: "In diesem Dokument gibt es keinen lesbaren Text: Zeichne die Bereiche selbst ein.",
  incomplete: "Die Vorschläge wurden vor dem Ende dieses Dokuments abgebrochen.",
  footer:
    "Vorschläge können etwas übersehen. Prüfe die ganze Seite selbst. Barcodes und QR-Codes können dieselben Angaben enthalten.",
  note: {
    frTax: "Der Empfänger kann damit prüfen, ob dein Steuerbescheid echt ist. Schwärze sie nur, wenn er das nicht braucht.",
    iban: "Wenn er nach deiner Bankverbindung gefragt hat, braucht er sie.",
  },
  kinds: {
    iban: "Kontonummer (IBAN)",
    card: "Kartennummer",
    "fr-nir": "Sozialversicherungsnummer (Frankreich)",
    "fr-tax": "Steuernummer (Frankreich)",
    "fr-tax-ref": "Referenz des Steuerbescheids (Frankreich)",
    "de-taxid": "Steuer-ID",
    "es-dni": "Ausweisnummer (Spanien, DNI/NIE)",
    "nl-bsn": "Bürgerservicenummer (Niederlande, BSN)",
    "be-nn": "Nationalregisternummer (Belgien)",
    "pt-nif": "Steuernummer (Portugal, NIF)",
    "br-cpf": "CPF (Brasilien)",
    "it-cf": "Steuernummer (Italien, codice fiscale)",
    "cn-id": "Personalausweisnummer (China)",
    "jp-mynumber": "My Number (Japan)",
    "ir-melli": "Nationaler Code (Iran)",
    "id-nik": "NIK (Indonesien)",
  },
  announce: (label, page, hidden) => `${label}, Seite ${page}: ${hidden ? "geschwärzt" : "wieder sichtbar"}.`,
};

export default COPY;
