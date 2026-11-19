import type { SuggestCopy } from "./types";

// Draft translation from the English wording, awaiting native review (ROADMAP.md, backlog: Native review).
const COPY: SuggestCopy = {
  banner: (n) =>
    n > 1
      ? `We hebben ${n} nummers gevonden die je misschien wilt afdekken.`
      : "We hebben een nummer gevonden dat je misschien wilt afdekken.",
  review: "Bekijken",
  title: "Suggesties",
  hideAll: "Alles afdekken",
  hideAllDocs: "Alles afdekken in alle documenten",
  hide: "Afdekken",
  hidden: "Afgedekt",
  undo: "Ongedaan maken",
  dismiss: "Deze niet",
  onPage: (p) => `Pagina ${p}`,
  notShown: "Pagina's die niet in het voorbeeld staan",
  coverAll: "De suggesties gelden voor alle pagina's.",
  doneAll: (n, pages, pageCount) =>
    n > 1 ? `${n} gebieden afgedekt (${pageCount > 1 ? "pagina's" : "pagina"} ${pages}).` : `1 gebied afgedekt (pagina ${pages}).`,
  none: "Niets te suggereren in dit document.",
  noText: "Geen tekst om te lezen in dit document: teken de gebieden zelf.",
  incomplete: "De suggesties zijn gestopt voor het einde van dit document.",
  footer:
    "Suggesties kunnen dingen missen. Controleer zelf de hele pagina. Barcodes en QR-codes kunnen dezelfde gegevens bevatten.",
  note: {
    frTax: "De ontvanger kan hiermee controleren of je belastingaanslag echt is. Dek het alleen af als die dat niet nodig heeft.",
    iban: "Als de ontvanger om je bankgegevens heeft gevraagd, is dit nummer nodig.",
  },
  kinds: {
    iban: "Rekeningnummer (IBAN)",
    card: "Kaartnummer",
    "fr-nir": "Socialezekerheidsnummer (Frankrijk)",
    "fr-tax": "Belastingnummer (Frankrijk)",
    "fr-tax-ref": "Kenmerk van de belastingaanslag (Frankrijk)",
    "de-taxid": "Fiscaal identificatienummer (Duitsland, Steuer-ID)",
    "es-dni": "Identiteitsnummer (Spanje, DNI/NIE)",
    "nl-bsn": "Burgerservicenummer (BSN)",
    "be-nn": "Rijksregisternummer (België)",
    "pt-nif": "Belastingnummer (Portugal, NIF)",
    "br-cpf": "CPF (Brazilië)",
    "it-cf": "Fiscale code (Italië, codice fiscale)",
    "cn-id": "Identiteitskaartnummer (China)",
    "jp-mynumber": "My Number (Japan)",
    "ir-melli": "Nationale code (Iran)",
    "id-nik": "NIK (Indonesië)",
  },
  announce: (label, page, hidden) => `${label}, pagina ${page}: ${hidden ? "afgedekt" : "weer zichtbaar"}.`,
};

export default COPY;
