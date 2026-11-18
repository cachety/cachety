import type { SuggestCopy } from "./types";

// Textes de docs/prd-suggested-areas.md §10, tels quels.
const COPY: SuggestCopy = {
  banner: (n) =>
    n > 1
      ? `Nous avons trouvé ${n} numéros que vous voudrez peut-être masquer.`
      : "Nous avons trouvé un numéro que vous voudrez peut-être masquer.",
  review: "Voir",
  title: "Suggestions",
  hideAll: "Tout masquer",
  hideAllDocs: "Tout masquer dans tous les documents",
  hide: "Masquer",
  hidden: "Masqué",
  undo: "Annuler",
  dismiss: "Pas celui-ci",
  onPage: (p) => `Page ${p}`,
  notShown: "Pages non affichées dans l'aperçu",
  coverAll: "Les suggestions couvrent toutes les pages.",
  doneAll: (n, pages, pageCount) =>
    n > 1 ? `${n} zones masquées (${pageCount > 1 ? "pages" : "page"} ${pages}).` : `1 zone masquée (page ${pages}).`,
  none: "Rien à suggérer sur ce document.",
  noText: "Pas de texte à lire sur ce document : tracez les zones vous-même.",
  incomplete: "Les suggestions se sont arrêtées avant la fin de ce document.",
  footer:
    "Les suggestions peuvent en oublier. Vérifiez vous-même toute la page. Les codes-barres et QR codes peuvent contenir les mêmes informations.",
  note: {
    frTax:
      "Le destinataire peut s'en servir pour vérifier que votre avis d'impôt est authentique. Ne le masquez que s'il n'en a pas besoin.",
    iban: "S'il vous a demandé vos coordonnées bancaires, il en a besoin.",
  },
  kinds: {
    iban: "Numéro de compte (IBAN)",
    card: "Numéro de carte bancaire",
    "fr-nir": "Numéro de sécurité sociale",
    "fr-tax": "Numéro fiscal",
    "fr-tax-ref": "Référence de l'avis d'impôt",
    "de-taxid": "Identifiant fiscal (Allemagne, Steuer-ID)",
    "es-dni": "Numéro d'identité (Espagne, DNI/NIE)",
    "nl-bsn": "Numéro de service citoyen (Pays-Bas, BSN)",
    "be-nn": "Numéro national (Belgique)",
    "pt-nif": "Numéro fiscal (Portugal, NIF)",
    "br-cpf": "CPF (Brésil)",
    "it-cf": "Code fiscal (Italie, codice fiscale)",
    "cn-id": "Carte d'identité de résident (Chine)",
    "jp-mynumber": "My Number (Japon)",
    "ir-melli": "Code national (Iran)",
    "id-nik": "NIK (Indonésie)",
  },
  announce: (label, page, hidden) => `${label}, page ${page} : ${hidden ? "masqué" : "de nouveau visible"}.`,
};

export default COPY;
