import { describe, expect, test } from "bun:test";
import {
  beNnValid,
  brCpfValid,
  cardValid,
  cnIdValid,
  deTaxIdValid,
  esDniValid,
  findInLines,
  findSensitive,
  foldLabel,
  LABEL_HINT,
  LABELS,
  frTaxRefValid,
  frTaxValid,
  ibanValid,
  IBAN_LENGTHS,
  idNikValid,
  irMelliValid,
  itCfValid,
  jpMyNumberValid,
  luhnValid,
  maskedForm,
  MAX_MATCHES,
  nirValid,
  nlBsnValid,
  normaliseDigits,
  ptNifValid,
  rectsFor,
  SENSITIVE_KINDS,
  VALIDATORS,
  type Match,
} from "./sensitive";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MAX_LINE_CHARS, type Line } from "./text-lines";

// Origine des exemples (docs/prd-suggested-areas.md §11.1). Tous sont
// vérifiés ici par l'algorithme publié de chaque numéro.
// - IBAN : exemples publiés (ceux qui accompagnent le registre ISO 13616, puis
//   ceux d'iban.com, relevés le 2026-11-18), un ou deux par pays.
// - Cartes : numéros d'essai courants des réseaux (aucune carte réelle).
// - NIR : exemples de la documentation de python-stdnum (dont la Corse, 2A et
//   2B), relus le 2026-11-18, et exemples d'usage courant (spécimen de carte
//   Vitale) ; deux exemples corses de plus sont calculés par la formule
//   publiée (97 − numéro mod 97).
// - Numéros nationaux : exemples de la documentation de python-stdnum, relus
//   le 2026-11-18 (Allemagne, Espagne, Pays-Bas, Belgique, Portugal, Brésil,
//   Italie, Chine, Japon), et exemples d'usage courant (Iran, autres numéros
//   de chaque pays) ; le NIK, sans clé, est construit.

/** Exemples publiés par iban.com (page « IBAN structure », relevés le 2026-11-18). */
const IBANS_IBAN_COM = [
  "FR7630006000011234567890189",
  "DE75512108001245126199",
  "GB33BUKB20201555555555",
  "ES7921000813610123456789",
  "NL02ABNA0123456789",
  "BE71096123456769",
  "PT50003310311234567890197",
  "IT60X0542811101000000123456",
  "MT31MALT01100000000000000000123",
  "LC14BOSL123456789012345678901234",
  "RU0204452560040702810412345678901",
  "CH5604835012345678009",
  "NO8330001234567",
  "BR1500000000000010932840814P2",
  "HN54PISA00000000000000123124",
];

/** Exemples qui accompagnent le registre ISO 13616. */
const IBANS: Record<string, string> = {
  FR: "FR14 2004 1010 0505 0001 3M02 606",
  DE: "DE89 3704 0044 0532 0130 00",
  GB: "GB29 NWBK 6016 1331 9268 19",
  ES: "ES91 2100 0418 4502 0005 1332",
  NL: "NL91 ABNA 0417 1643 00",
  BE: "BE68 5390 0754 7034",
  PT: "PT50 0002 0123 1234 5678 9015 4",
  IT: "IT60 X054 2811 1010 0000 0123 456",
  // Les plus longs du registre : Malte (31), Sainte-Lucie (32), Russie (33).
  MT: "MT84 MALT 0110 0001 2345 MTLC AST0 01S",
  LC: "LC55 HEMM 0001 0001 0012 0012 0002 3015",
  RU: "RU02 0445 2560 0407 0281 0412 3456 7890 1",
  CH: "CH93 0076 2011 6238 5295 7",
  NO: "NO93 8601 1117 947",
  BR: "BR18 0036 0305 0000 1000 9795 493C 1",
};

const kinds = (matches: Match[]) => matches.map((m) => m.kind);
const found = (text: string) => findSensitive([[text]]);
/** Texte couvert par la correspondance (première ligne). */
const textOf = (pages: string[][], m: Match) => pages[m.page][m.line].slice(m.start, m.end);

describe("IBAN", () => {
  test("exemples du registre : clé mod 97 et longueur du pays", () => {
    for (const [country, iban] of Object.entries(IBANS)) {
      expect(ibanValid(iban), country).toBe(true);
      expect(iban.replace(/ /g, "").length, country).toBe(IBAN_LENGTHS[country]);
      const m = found(`IBAN : ${iban} BIC AGRIFRPP`);
      expect(kinds(m), country).toEqual(["iban"]);
      expect(textOf([[`IBAN : ${iban} BIC AGRIFRPP`]], m[0]), country).toBe(iban);
    }
    expect(ibanValid(IBANS.MT)).toBe(true);
    expect(IBANS.RU.replace(/ /g, "")).toHaveLength(33);
  });

  test("seconde série d'exemples publiés, sans espaces", () => {
    for (const iban of IBANS_IBAN_COM) {
      expect(ibanValid(iban), iban).toBe(true);
      expect(kinds(found(`Account ${iban}`)), iban).toEqual(["iban"]);
    }
  });

  // Pays hors du registre SWIFT qui écrivent leurs comptes au format IBAN.
  // Exemples de la liste de Wikipédia (« International Bank Account Number »),
  // de mémoire, non relus en ligne ; chacun passe la clé mod 97 à la longueur
  // que donne cette liste (relevée le 2026-11-19).
  test("hors registre : شبا iranien, Maroc, Algérie, Afrique de l'Ouest et centrale", () => {
    const examples = [
      "IR58 0540 1051 8002 1273 1130 07",
      "MA64 0115 1900 0001 2050 0053 4921",
      "DZ58 0002 1000 0111 3000 0005 70",
      "SN08 SN01 0015 2000 0485 0000 3035",
      "CI93 CI00 8011 1301 1342 9120 0589",
      "ML13 ML01 6012 0102 6001 0066 8497",
      "AO06 0044 0000 6729 5030 1010 2",
      "MZ59 0003 0108 0016 3671 0237 1",
      "CM21 1000 2000 3002 7797 6315 008",
      "MG46 0000 5030 0712 8942 1016 045",
    ];
    for (const iban of examples) {
      expect(ibanValid(iban), iban).toBe(true);
      expect(iban.replace(/ /g, "").length, iban).toBe(IBAN_LENGTHS[iban.slice(0, 2)]);
      expect(kinds(found(`IBAN ${iban}`)), iban).toEqual(["iban"]);
    }
    // Le شبا tel qu'on l'écrit en Iran : chiffres persans, avec ou sans espaces.
    expect(kinds(found("شماره شبا: IR۵۸۰۵۴۰۱۰۵۱۸۰۰۲۱۲۷۳۱۱۳۰۰۷"))).toEqual(["iban"]);
    expect(kinds(found("شماره شبا: IR۵۸ ۰۵۴۰ ۱۰۵۱ ۸۰۰۲ ۱۲۷۳ ۱۱۳۰ ۰۷"))).toEqual(["iban"]);
    // Un chiffre changé, ou un chiffre de moins : rien.
    expect(found("IBAN IR58 0540 1051 8002 1273 1130 08")).toEqual([]);
    expect(found("IBAN IR58 0540 1051 8002 1273 1130 0")).toEqual([]);
  });

  test("table des longueurs : 89 pays du registre et 22 hors registre, de 15 (Norvège) à 33 caractères (Russie)", () => {
    // Aucun pays du registre n'atteint les 34 caractères que permet la norme.
    const lengths = Object.values(IBAN_LENGTHS);
    expect(lengths).toHaveLength(111);
    expect(Math.min(...lengths)).toBe(15);
    expect(Math.max(...lengths)).toBe(33);
    expect(IBAN_LENGTHS.HN).toBe(28);
    for (const code of Object.keys(IBAN_LENGTHS)) expect(code).toMatch(/^[A-Z]{2}$/);
  });

  test("un chiffre changé, ou la longueur d'un autre pays : refusé", () => {
    expect(ibanValid("FR14 2004 1010 0505 0001 3M02 607")).toBe(false);
    expect(ibanValid("DE89 3704 0044 0532 0130 01")).toBe(false);
    // Clé recalculée pour un numéro trop court d'un caractère : seule la longueur le trahit.
    expect(ibanValid("DE89 3704 0044 0532 0130 0")).toBe(false);
    expect(ibanValid("ZZ89 3704 0044 0532 0130 00")).toBe(false);
    expect(found("IBAN FR14 2004 1010 0505 0001 3M02 607")).toEqual([]);
    expect(found("IBAN DE89 3704 0044 0532 0130 0")).toEqual([]);
  });

  test("minuscules, sans espaces, espaces irréguliers : acceptés", () => {
    expect(ibanValid("fr14 2004 1010 0505 0001 3m02 606")).toBe(true);
    for (const text of [
      "fr1420041010050500013m02606",
      "FR1420041010050500013M02606",
      "FR14 20041010 0505 00013M02606",
      "FR14 2 0 0 4 1010 0505 0001 3M02 606",
    ]) {
      const m = found(`Compte ${text}.`);
      expect(kinds(m), text).toEqual(["iban"]);
      expect(m[0].masked).toBe("FR14 •••• •••• 2606");
    }
  });

  test("collé à du texte, avant ou après : refusé", () => {
    expect(found("XFR1420041010050500013M02606")).toEqual([]);
    expect(found("FR1420041010050500013M02606X")).toEqual([]);
    expect(found("REFFR14 2004 1010 0505 0001 3M02 606")).toEqual([]);
    // Deux espaces : ce n'est plus le même numéro.
    expect(found("FR14 2004 1010 0505  0001 3M02 606")).toEqual([]);
  });

  test("replié sur deux lignes : une seule correspondance, deux portions", () => {
    const pages = [["Titulaire : Camille Durand", "FR14 2004 1010 0505", "0001 3M02 606", "BIC PSSTFRPPXXX"]];
    const m = findSensitive(pages);
    expect(m).toHaveLength(1);
    expect(m[0]).toMatchObject({ kind: "iban", page: 0, line: 1, start: 0, end: 19, more: [{ line: 2, start: 0, end: 13 }] });
    // La suite doit commencer la ligne : ailleurs, ce n'est pas le même numéro.
    expect(findSensitive([["FR14 2004 1010 0505", "suite 0001 3M02 606"]])).toEqual([]);
  });

  test("un BIC seul n'est pas proposé", () => {
    expect(found("BIC : AGRIFRPP882 — Domiciliation : PARIS")).toEqual([]);
  });
});

describe("carte bancaire", () => {
  const PANS = [
    "4111 1111 1111 1111",
    "5555 5555 5555 4444",
    "3782 822463 10005",
    "4242424242424242",
    "2223003122003222", // Mastercard, série 2
    "6011111111111117", // Discover
    "3530111333300000", // JCB
    "6200000000000005", // UnionPay
    "4222222222222", // Visa à 13 chiffres
  ];

  test("numéros d'essai des réseaux : Luhn et préfixe connus", () => {
    for (const pan of PANS) {
      expect(cardValid(pan), pan).toBe(true);
      expect(kinds(found(`Carte n° ${pan} — expire 03/27`)), pan).toEqual(["card"]);
    }
    expect(kinds(found("4111-1111-1111-1111"))).toEqual(["card"]);
  });

  test("Luhn juste mais préfixe inconnu : refusé", () => {
    for (const n of ["1234567812345670", "9999999999999995", "0000000000000000", "1111111111111117"]) {
      expect(luhnValid(n), n).toBe(true);
      expect(cardValid(n), n).toBe(false);
      expect(found(`N° ${n}`), n).toEqual([]);
    }
  });

  test("clé fausse, ou numéro déjà masqué sur le document : refusé", () => {
    expect(cardValid("4111 1111 1111 1112")).toBe(false);
    expect(found("Carte 4111 1111 1111 1112")).toEqual([]);
    expect(found("Carte **** **** **** 1111")).toEqual([]);
    expect(found("Carte 4111 11** **** 1111")).toEqual([]);
  });

  test("dates, téléphones, montants, SIRET : jamais", () => {
    for (const text of [
      "Le 12/05/2026 à 14:32:07",
      "Tél. 01 23 45 67 89 — +33 6 12 34 56 78",
      "06 12 34 56 78 01 23 45 67 89",
      "0033 6 12 34 56 78 - 0044 20 7946 0958",
      "Montant : 4 111,11 € — 5 555 444,00 €",
      "SIRET 812 345 678 00021 — APE 6202A",
      "Période du 01/01/2026 au 31/01/2026",
      "4111 1111 1111", // trop court
    ]) {
      expect(found(text), text).toEqual([]);
    }
  });

  test("un numéro de carte suivi d'une date reste trouvé, sans la date", () => {
    const pages = [["4111 1111 1111 1111 03/27"]];
    const m = findSensitive(pages);
    expect(kinds(m)).toEqual(["card"]);
    expect(textOf(pages, m[0])).toBe("4111 1111 1111 1111");
  });
});

describe("NIR (sécurité sociale française)", () => {
  test("hommes, femmes, écrit avec ou sans espaces", () => {
    for (const nir of ["2 95 10 99 126 111 93", "2 69 05 49 588 157 80", "1 84 12 76 451 089 46", "2 55 08 14 168 025 38", "1 51 02 46 102 043 25"]) {
      expect(nirValid(nir), nir).toBe(true);
      expect(nirValid(nir.replace(/ /g, "")), nir).toBe(true);
      expect(kinds(found(`N° SS : ${nir}`)), nir).toEqual(["fr-nir"]);
      expect(kinds(found(`N° SS : ${nir.replace(/ /g, "")}`)), nir).toEqual(["fr-nir"]);
    }
  });

  test("Corse : 2A compte 19, 2B compte 18", () => {
    // Exemples publiés (python-stdnum).
    expect(nirValid("253072A07300443")).toBe(true);
    expect(nirValid("253072B07300470")).toBe(true);
    expect(nirValid("253072C07300443")).toBe(false);
    expect(kinds(found("NIR 2 53 07 2B 073 004 70"))).toEqual(["fr-nir"]);
    // Clés calculées par la formule publiée (97 − numéro mod 97).
    expect(nirValid("1 85 05 2A 123 456 33")).toBe(true);
    expect(nirValid("2 90 12 2B 123 456 71")).toBe(true);
    expect(nirValid("1 85 05 2B 123 456 33")).toBe(false);
    expect(kinds(found("Sécurité sociale 1 85 05 2A 123 456 33"))).toEqual(["fr-nir"]);
    expect(kinds(found("Sécurité sociale 185052a12345633"))).toEqual(["fr-nir"]);
  });

  test("clé fausse, sexe ou mois impossible, clé absente : refusé", () => {
    expect(nirValid("2 69 05 49 588 157 81")).toBe(false);
    expect(nirValid("295109912611199")).toBe(false);
    expect(nirValid("3 69 05 49 588 157 80")).toBe(false);
    expect(nirValid("2 69 13 49 588 157 80")).toBe(false);
    expect(found("N° SS : 2 69 05 49 588 157 81")).toEqual([]);
    // Sans la clé, rien ne distingue le numéro d'une suite de chiffres.
    expect(found("N° SS : 2 69 05 49 588 157")).toEqual([]);
  });
});

describe("numéros fiscaux français (sans clé : libellé exigé)", () => {
  test("numéro fiscal : libellé sur la même ligne", () => {
    for (const text of [
      "Numéro fiscal : 30 12 345 678 901",
      "NUMERO FISCAL 3012345678901",
      "N° fiscal (déclarant 1) : 3012345678901",
      "Votre numéro SPI : 12 34 567 890 123",
      "Identifiant fiscal 0212345678901",
    ]) {
      expect(kinds(found(text)), text).toEqual(["fr-tax"]);
    }
    expect(frTaxValid("30 12 345 678 901")).toBe(true);
    expect(frTaxValid("40 12 345 678 901")).toBe(false);
  });

  test("libellé sur la ligne du dessus", () => {
    expect(kinds(findSensitive([["Numéro fiscal", "30 12 345 678 901"]]))).toEqual(["fr-tax"]);
    // Deux lignes plus haut : trop loin.
    expect(findSensitive([["Numéro fiscal", "Déclarant 1", "30 12 345 678 901"]])).toEqual([]);
  });

  test("sans libellé, ou avec un libellé qui n'est qu'un morceau de mot : rien", () => {
    expect(found("30 12 345 678 901")).toEqual([]);
    expect(found("Dossier 3012345678901")).toEqual([]);
    expect(found("Respiration 3012345678901")).toEqual([]);
    expect(found("Numéro fiscal : 40 12 345 678 901")).toEqual([]);
  });

  test("le libellé vaut pour le premier numéro qui le suit, pas pour les suivants", () => {
    const pages = [["Numéro fiscal : 30 12 345 678 901 — Dossier : 1012345678901"]];
    const m = findSensitive(pages);
    expect(kinds(m)).toEqual(["fr-tax"]);
    expect(textOf(pages, m[0])).toBe("30 12 345 678 901");
  });

  test("référence de l'avis : 13 caractères après son libellé", () => {
    expect(frTaxRefValid("24 75 A01234567")).toBe(true);
    expect(kinds(found("Référence de l'avis : 24 75 1234567 89"))).toEqual(["fr-tax-ref"]);
    expect(kinds(found("Référence de l’avis d'impôt : 2475A12345678"))).toEqual(["fr-tax-ref"]);
    expect(found("Avis 2475A12345678")).toEqual([]);
  });

  test("avis d'impôt : chaque numéro prend son libellé", () => {
    const pages = [["Numéro fiscal : 30 12 345 678 901", "Référence de l'avis : 24 75 1234567 89", "N° d'accès en ligne : 1234567"]];
    expect(findSensitive(pages).map((m) => [m.kind, m.line])).toEqual([
      ["fr-tax", 0],
      ["fr-tax-ref", 1],
    ]);
  });
});

describe("numéros nationaux (WP4)", () => {
  test("Allemagne, Steuer-ID : ISO 7064 MOD 11,10 et un seul chiffre répété", () => {
    for (const id of ["36574261809", "86095742719", "47036892816", "65929970489", "57549285017", "25768131411"]) {
      expect(deTaxIdValid(id), id).toBe(true);
    }
    expect(deTaxIdValid("36 574 261 809")).toBe(true);
    expect(deTaxIdValid("36574261808")).toBe(false);
    expect(deTaxIdValid("36574261890")).toBe(false);
    expect(deTaxIdValid("36554266806")).toBe(false); // deux chiffres répétés
    expect(deTaxIdValid("06574261809")).toBe(false);
    expect(kinds(found("Steuer-ID: 36 574 261 809"))).toEqual(["de-taxid"]);
    expect(kinds(found("IdNr. 36574261809"))).toEqual(["de-taxid"]);
    // Morceau d'une suite de chiffres plus longue : pas proposé.
    expect(found("12 36 574 261 809")).toEqual([]);
    expect(found("36 574 261 809 12")).toEqual([]);
  });

  test("Espagne, DNI et NIE : lettre de contrôle (mod 23)", () => {
    for (const id of ["12345678Z", "54362315K", "X1234567L", "X2482300W", "Y1234567X", "Z1234567R"]) {
      expect(esDniValid(id), id).toBe(true);
      expect(kinds(found(`DNI/NIE: ${id}`)), id).toEqual(["es-dni"]);
    }
    expect(esDniValid("12345678A")).toBe(false);
    expect(esDniValid("54362315Z")).toBe(false);
    expect(esDniValid("x-2482300w")).toBe(true);
    expect(esDniValid("x-2482300a")).toBe(false);
    expect(kinds(found("nie x-2482300w"))).toEqual(["es-dni"]);
    expect(kinds(found("NIF 12.345.678-Z"))).toEqual(["es-dni"]);
    expect(kinds(found("NIE X-1234567-L"))).toEqual(["es-dni"]);
    expect(found("12345678A")).toEqual([]);
    expect(found("12345678 Zona norte")).toEqual([]);
  });

  test("Pays-Bas, BSN : épreuve des onze, libellé exigé", () => {
    expect(nlBsnValid("111222333")).toBe(true);
    expect(nlBsnValid("123456782")).toBe(true);
    expect(nlBsnValid("123456789")).toBe(false);
    expect(nlBsnValid("1112.52.333")).toBe(false);
    expect(kinds(found("BSN: 111222333"))).toEqual(["nl-bsn"]);
    expect(kinds(found("Burgerservicenummer 1112.22.333"))).toEqual(["nl-bsn"]);
    expect(found("Klantnummer 111222333")).toEqual([]);
    expect(found("BSN: 123456789")).toEqual([]);
  });

  test("Belgique, numéro national : 97 − mod 97, avec le 2 des naissances depuis 2000", () => {
    expect(beNnValid("85.07.30-033 28")).toBe(true);
    expect(beNnValid("17 07 30 033 84")).toBe(true);
    expect(beNnValid("85.07.30-033 29")).toBe(false);
    expect(beNnValid("12345678901")).toBe(false);
    expect(beNnValid("85.13.30-033 28")).toBe(false);
    expect(kinds(found("Rijksregisternummer 85.07.30-033.28"))).toEqual(["be-nn"]);
    expect(kinds(found("N° national : 17073003384"))).toEqual(["be-nn"]);
  });

  test("Portugal, NIF : mod 11, libellé exigé", () => {
    expect(ptNifValid("501964843")).toBe(true);
    expect(ptNifValid("123456789")).toBe(true);
    expect(ptNifValid("123456788")).toBe(false);
    expect(ptNifValid("501 964 842")).toBe(false);
    expect(kinds(found("NIF: 501 964 843"))).toEqual(["pt-nif"]);
    expect(kinds(found("N.º de contribuinte 501964843"))).toEqual(["pt-nif"]);
    expect(found("Cliente 501964843")).toEqual([]);
  });

  test("Brésil, CPF : deux chiffres de contrôle ; écriture typique ou libellé", () => {
    for (const cpf of ["390.533.447-05", "111.444.777-35", "529.982.247-25"]) {
      expect(brCpfValid(cpf), cpf).toBe(true);
      expect(kinds(found(`Titular ${cpf}`)), cpf).toEqual(["br-cpf"]);
    }
    expect(brCpfValid("390.533.447-06")).toBe(false);
    expect(brCpfValid("231.002.999-00")).toBe(false);
    expect(brCpfValid("111.111.111-11")).toBe(false);
    expect(kinds(found("CPF 39053344705"))).toEqual(["br-cpf"]);
    // Onze chiffres nus, sans libellé ni points : pas un CPF.
    expect(kinds(found("Protocolo 39053344705"))).not.toContain("br-cpf");
  });

  test("Italie, codice fiscale : lettre de contrôle", () => {
    for (const cf of ["RCCMNL83S18D969H", "CNTCHR83T41D969D", "RSSMRA80A01H501U", "RSSMRA85T10A562S", "MRTMTT25D09F205Z"]) {
      expect(itCfValid(cf), cf).toBe(true);
      expect(kinds(found(`Codice fiscale: ${cf}`)), cf).toEqual(["it-cf"]);
    }
    expect(itCfValid("RCCMNL83S18D969X")).toBe(false);
    expect(kinds(found("c.f. rccmnl83s18d969h"))).toEqual(["it-cf"]);
    expect(found("Codice RCCMNL83S18D969X")).toEqual([]);
  });

  test("Chine, carte de résident : ISO 7064 MOD 11-2, X admis", () => {
    for (const id of ["11010519491231002X", "360426199101010071", "110101199003074477"]) {
      expect(cnIdValid(id), id).toBe(true);
      expect(kinds(found(`公民身份号码 ${id}`)), id).toEqual(["cn-id"]);
    }
    expect(cnIdValid("110105194912310021")).toBe(false);
    expect(cnIdValid("11010519491331002X")).toBe(false); // mois 13
    expect(kinds(found("身份证号：11010519491231002X"))).toEqual(["cn-id"]);
  });

  test("Japon, My Number : chiffre de contrôle, libellé exigé", () => {
    expect(jpMyNumberValid("6214 9832 0257")).toBe(true);
    expect(jpMyNumberValid("6214 9832 0258")).toBe(false);
    expect(kinds(found("個人番号 6214 9832 0257"))).toEqual(["jp-mynumber"]);
    expect(kinds(found("マイナンバー：621498320257"))).toEqual(["jp-mynumber"]);
    // Chiffres pleine chasse, collés au libellé.
    expect(kinds(found("個人番号６２１４９８３２０２５７"))).toEqual(["jp-mynumber"]);
    expect(found("会員番号 6214 9832 0257")).toEqual([]);
  });

  test("Iran, code national : mod 11, libellé exigé", () => {
    for (const id of ["0499370899", "0084575948", "0790419904", "0067749828"]) expect(irMelliValid(id), id).toBe(true);
    expect(irMelliValid("0499370898")).toBe(false);
    expect(irMelliValid("1111111111")).toBe(false);
    expect(kinds(found("کد ملی: ۰۴۹۹۳۷۰۸۹۹"))).toEqual(["ir-melli"]);
    expect(kinds(found("شماره ملی 0084575948"))).toEqual(["ir-melli"]);
    // Kaf et yé arabes, formes de présentation : le même libellé.
    expect(kinds(found("كد ملي: ٠٤٩٩٣٧٠٨٩٩"))).toEqual(["ir-melli"]);
    expect(found("تلفن ۰۴۹۹۳۷۰۸۹۹")).toEqual([]);
  });

  test("Indonésie, NIK : structure (région, date), libellé exigé", () => {
    // Pas de clé : exemple construit (Jawa Barat, née le 1er juillet 1989).
    expect(idNikValid("3201234107890001")).toBe(true);
    expect(idNikValid("3201233207890001")).toBe(false); // jour 32
    expect(idNikValid("0101234107890001")).toBe(false); // province 01
    expect(kinds(found("NIK : 3201234107890001"))).toEqual(["id-nik"]);
    expect(kinds(found("Nomor Induk Kependudukan 3201234107890001"))).toEqual(["id-nik"]);
    expect(found("No. Pelanggan 3201234107890001")).toEqual([]);
    expect(found("NIKEL 3201234107890001")).toEqual([]);
  });

  test("un validateur par catégorie", () => {
    expect(Object.keys(VALIDATORS).sort()).toEqual([...SENSITIVE_KINDS].sort());
  });
});

describe("normalisation des chiffres et des espaces", () => {
  test("chiffres persans, arabes, pleine chasse ; même longueur", () => {
    expect(normaliseDigits("۰۱۲۳۴۵۶۷۸۹")).toBe("0123456789");
    expect(normaliseDigits("٠١٢٣٤٥٦٧٨٩")).toBe("0123456789");
    expect(normaliseDigits("０１２３４５６７８９")).toBe("0123456789");
    for (const s of ["۴۱۱۱ ۱۱۱۱", "a b c d", "ＦＲ１４", "été 2026"]) {
      expect(normaliseDigits(s)).toHaveLength(s.length);
    }
    expect(normaliseDigits("ＦＲ１４")).toBe("FR14");
    expect(normaliseDigits("été 2026")).toBe("été 2026");
  });

  test("espaces insécables et fines comptent pour des espaces", () => {
    expect(normaliseDigits("a b c d")).toBe("a b c d");
    const nbsp = "FR14 2004 1010 0505 0001 3M02 606";
    const thin = "4111 1111 1111 1111";
    expect(kinds(found(`IBAN : ${nbsp}`))).toEqual(["iban"]);
    expect(kinds(found(thin))).toEqual(["card"]);
  });

  test("une carte en chiffres persans ou arabes est trouvée, à sa place dans la ligne", () => {
    const pages = [["کارت ۴۱۱۱ ۱۱۱۱ ۱۱۱۱ ۱۱۱۱ بانک"], ["بطاقة ٤١١١١١١١١١١١١١١١"]];
    const m = findSensitive(pages);
    expect(kinds(m)).toEqual(["card", "card"]);
    expect(textOf(pages, m[0])).toBe("۴۱۱۱ ۱۱۱۱ ۱۱۱۱ ۱۱۱۱");
    expect(textOf(pages, m[1])).toBe("٤١١١١١١١١١١١١١١١");
  });

  test("chaque libellé contient un des fragments du test rapide (sinon il ne serait jamais cherché)", () => {
    for (const list of Object.values(LABELS)) {
      for (const label of list ?? []) {
        expect(LABEL_HINT.test(label), label).toBe(true);
        expect(LABEL_HINT.test(foldLabel(label)), label).toBe(true);
        expect(LABEL_HINT.test(label.toUpperCase()), label).toBe(true);
      }
    }
    expect(LABEL_HINT.test("Salaire net à payer 1 234,56")).toBe(false);
  });

  test("libellés : accents, casse, apostrophes et « n° » repliés", () => {
    expect(foldLabel("RÉFÉRENCE de l’Avis")).toBe("reference de l'avis");
    expect(foldLabel("N°  Fiscal")).toBe("no fiscal");
    expect(foldLabel("Nº fiscal")).toBe("no fiscal");
  });
});

describe("chevauchements : la catégorie la plus précise l'emporte", () => {
  test("carte d'identité chinoise qui passe aussi Luhn avec un préfixe UnionPay", () => {
    // Région 620102 (Lanzhou) : 18 chiffres valides pour les deux contrôles.
    const id = "620102199001010257";
    expect(cnIdValid(id)).toBe(true);
    expect(cardValid(id)).toBe(true);
    expect(kinds(found(`证件号码 ${id}`))).toEqual(["cn-id"]);
  });

  test("NIK qui passe aussi Luhn avec un préfixe JCB : le libellé décide", () => {
    const nik = "3520124107890009";
    expect(idNikValid(nik)).toBe(true);
    expect(cardValid(nik)).toBe(true);
    expect(kinds(found(`NIK: ${nik}`))).toEqual(["id-nik"]);
    // Sans libellé, ce n'est qu'un numéro de carte plausible.
    expect(kinds(found(`No. ${nik}`))).toEqual(["card"]);
  });

  test("un IBAN n'est pas aussi proposé comme carte ou numéro national", () => {
    for (const iban of Object.values(IBANS)) expect(kinds(found(iban)), iban).toEqual(["iban"]);
  });

  test("plusieurs numéros sur une ligne : chacun le sien, dans l'ordre", () => {
    const pages = [["IBAN FR14 2004 1010 0505 0001 3M02 606 — Carte 4111 1111 1111 1111 — SS 2 69 05 49 588 157 80"]];
    const m = findSensitive(pages);
    expect(kinds(m)).toEqual(["iban", "card", "fr-nir"]);
    expect(m.map((x) => textOf(pages, x))).toEqual(["FR14 2004 1010 0505 0001 3M02 606", "4111 1111 1111 1111", "2 69 05 49 588 157 80"]);
  });
});

describe("forme masquée", () => {
  test("au plus 4 caractères de chaque bout, jamais plus de 8 de l'original", () => {
    expect(maskedForm("FR76 3000 6000 0112 3456 7890 189")).toBe("FR76 •••• •••• 0189");
    expect(maskedForm("4111 1111 1111 1111")).toBe("4111 •••• •••• 1111");
    const samples = [...Object.values(IBANS), "4111111111111111", "269054958815780", "111222333", "0499370899", "12345678Z", "RCCMNL83S18D969H"];
    for (const value of samples) {
      const shown = maskedForm(value).replace(/[• ]/g, "");
      expect(shown.length, value).toBeLessThanOrEqual(8);
      // Un numéro court n'est jamais montré à plus de la moitié.
      expect(shown.length, value).toBeLessThanOrEqual(value.replace(/ /g, "").length / 2);
    }
    // Dans les correspondances aussi.
    for (const m of findSensitive([Object.values(IBANS)])) {
      expect(m.masked.replace(/[• ]/g, "").length).toBeLessThanOrEqual(8);
      expect(m.masked).toContain("••••");
    }
  });
});

describe("pages et lignes", () => {
  test("page et ligne de chaque correspondance ; pages vides acceptées", () => {
    const pages = [[], ["Rien ici", "IBAN DE89 3704 0044 0532 0130 00"], [], ["Carte 5555 5555 5555 4444"]];
    expect(findSensitive(pages).map((m) => [m.kind, m.page, m.line])).toEqual([
      ["iban", 1, 1],
      ["card", 3, 0],
    ]);
    expect(findSensitive([])).toEqual([]);
    expect(findSensitive([[""], [" "]])).toEqual([]);
  });

  test("la recherche s'arrête à MAX_MATCHES correspondances", () => {
    const page = Array.from({ length: 60 }, () => "IBAN DE89 3704 0044 0532 0130 00");
    const pages = Array.from({ length: 40 }, () => page);
    expect(findSensitive(pages)).toHaveLength(MAX_MATCHES);
  });
});

describe("rectangles", () => {
  /** Ligne horizontale à chasse fixe : chaque caractère fait `w` de large. */
  const line = (text: string, x = 0.1, y = 0.2, w = 0.01, h = 0.02): Line => ({
    text,
    boxes: Array.from(text, (_, i) => ({ x: x + i * w, y, w, h })),
  });

  test("boîte des caractères, 15 % de la hauteur en haut et en bas, une demi-largeur à chaque bout", () => {
    const lines = [[line("IBAN DE89 3704 0044 0532 0130 00 fin")]];
    const [m] = findInLines(lines);
    expect(m).toMatchObject({ kind: "iban", start: 5, end: 32 });
    const [r] = rectsFor(m, lines);
    expect(r.x).toBeCloseTo(0.1 + 5 * 0.01 - 0.005, 6);
    expect(r.w).toBeCloseTo(27 * 0.01 + 0.01, 6);
    expect(r.y).toBeCloseTo(0.2 - 0.003, 6);
    expect(r.h).toBeCloseTo(0.02 + 0.006, 6);
  });

  test("texte lu à la verticale (page tournée) : les marges suivent le sens du texte", () => {
    const text = "DE89 3704 0044 0532 0130 00";
    const lines: Line[][] = [[{ text, boxes: Array.from(text, (_, i) => ({ x: 0.8, y: 0.1 + i * 0.01, w: 0.02, h: 0.01 })) }]];
    const [m] = findInLines(lines);
    const [r] = rectsFor(m, lines);
    expect(r.x).toBeCloseTo(0.8 - 0.003, 6);
    expect(r.w).toBeCloseTo(0.02 + 0.006, 6);
    expect(r.y).toBeCloseTo(0.1 - 0.005, 6);
    expect(r.h).toBeCloseTo(27 * 0.01 + 0.01, 6);
  });

  test("numéro replié : un rectangle par ligne ; borné à la page", () => {
    const lines = [[line("FR14 2004 1010 0505", 0.7, 0.3), line("0001 3M02 606", 0.7, 0.33), line("suite", 0.7, 0.36)]];
    const [m] = findInLines(lines);
    expect(m.more).toHaveLength(1);
    const rects = rectsFor(m, lines);
    expect(rects).toHaveLength(2);
    expect(rects[0].y).toBeLessThan(rects[1].y);
    const edge = [[line("DE89 3704 0044 0532 0130 00", 0.74, 0.99)]];
    const [r] = rectsFor(findInLines(edge)[0], edge);
    expect(r.x + r.w).toBeLessThanOrEqual(1);
    expect(r.y + r.h).toBeLessThanOrEqual(1);
  });

  test("avec la géométrie : libellé dans la colonne voisine ou juste au-dessus, pas ailleurs", () => {
    // Deux colonnes : le libellé à gauche, la valeur à droite, sur la même rangée.
    const sameRow = [[line("Numéro fiscal", 0.1, 0.2), line("30 12 345 678 901", 0.5, 0.2)]];
    expect(kinds(findInLines(sameRow))).toEqual(["fr-tax"]);
    // Libellé au-dessus de sa valeur, un autre bloc entre les deux dans l'ordre de lecture.
    const above = [[line("Numéro fiscal", 0.1, 0.2), line("Montant", 0.6, 0.2), line("30 12 345 678 901", 0.1, 0.23), line("1 234", 0.6, 0.23)]];
    expect(findInLines(above).map((m) => [m.kind, m.line])).toEqual([["fr-tax", 2]]);
    // Libellé au-dessus d'une autre colonne : il ne vaut pas pour celle-ci.
    const elsewhere = [[line("Numéro fiscal", 0.1, 0.2), line("3012345678901", 0.6, 0.23)]];
    expect(findInLines(elsewhere)).toEqual([]);
    // Libellé trop haut.
    const far = [[line("Numéro fiscal", 0.1, 0.2), line("3012345678901", 0.1, 0.4)]];
    expect(findInLines(far)).toEqual([]);
  });

  test("lignes élaguées (sans boîtes) : aucun rectangle, aucune erreur", () => {
    const m: Match = { kind: "iban", page: 0, line: 0, start: 0, end: 27, masked: "DE89 •••• •••• 3000" };
    expect(rectsFor(m, [[{ text: "DE89 3704 0044 0532 0130 00", boxes: [] }]])).toEqual([]);
    expect(rectsFor(m, [])).toEqual([]);
  });
});

describe("coût (linéaire, borné)", () => {
  const timed = (fn: () => void) => {
    // Meilleur de trois : la première passe paie la compilation à la volée.
    let best = Infinity;
    for (let i = 0; i < 3; i++) {
      const t0 = performance.now();
      fn();
      best = Math.min(best, performance.now() - t0);
    }
    return best;
  };

  test("500 pages × 60 lignes de texte mêlé de chiffres : moins de 100 ms", () => {
    let state = 12345;
    const rand = (n: number) => ((state = (state * 1103515245 + 12345) & 0x7fffffff) % n);
    const WORDS = ["salaire", "brut", "net", "cotisation", "période", "taux", "base", "montant", "employeur", "total", "IBAN", "réf.", "n°", "du", "au", "page"];
    const number = () => {
      const kind = rand(5);
      if (kind === 0) return `${rand(9999)},${String(rand(100)).padStart(2, "0")}`;
      if (kind === 1) return `${String(rand(28) + 1).padStart(2, "0")}/${String(rand(12) + 1).padStart(2, "0")}/2026`;
      if (kind === 2) return String(rand(1_000_000_000));
      if (kind === 3) return `${rand(99)} ${rand(999)} ${rand(999)} ${rand(999)} ${rand(99)}`;
      return String(rand(1_000_000)).padStart(6, "0") + String(rand(1_000_000)).padStart(6, "0");
    };
    const pages = Array.from({ length: 500 }, () =>
      Array.from({ length: 60 }, () =>
        Array.from({ length: 10 }, () => (rand(3) === 0 ? number() : WORDS[rand(WORDS.length)])).join(" ")
      )
    );
    let result: Match[] = [];
    const ms = timed(() => {
      result = findSensitive(pages);
    });
    expect(ms).toBeLessThan(100);
    // Texte au hasard : presque rien à proposer (seuls des hasards de clé passent).
    // Critère du PRD (§12) : pas plus d'une fausse suggestion pour 20 pages.
    expect(result.length).toBeLessThanOrEqual(25);
  });

  test("ligne pathologique (100 000 chiffres, séparateurs alternés) : moins de 50 ms", () => {
    const seps = [" ", ".", "-", " "];
    for (const build of [
      () => Array.from({ length: 100_000 }, (_, i) => String(i % 10) + seps[i % 4]).join(""),
      () => "4".repeat(100_000),
      () => "FR76".repeat(25_000),
      () => Array.from({ length: 100_000 }, (_, i) => (i % 5 === 4 ? " " : String((i * 7) % 10))).join(""),
      () => "A1 ".repeat(33_000),
    ]) {
      const line = build();
      expect(timed(() => findSensitive([[line]]))).toBeLessThan(50);
      // Le même texte en lignes de 2 000 caractères (ce que livre l'extraction) : rien n'est écarté d'office.
      const cut = Array.from({ length: Math.ceil(line.length / MAX_LINE_CHARS) }, (_, i) => line.slice(i * MAX_LINE_CHARS, (i + 1) * MAX_LINE_CHARS));
      expect(timed(() => findSensitive([cut]))).toBeLessThan(100);
    }
  });

  test("au plafond d'extraction (2 millions de caractères de chiffres serrés) : le temps reste borné", () => {
    // 1 000 lignes de 2 000 caractères, le pire texte pour la recherche : un
    // début de numéro à chaque position ou presque.
    const line = Array.from({ length: 1000 }, (_, i) => String((i * 3) % 10) + " ").join("");
    const pages = [Array.from({ length: 1000 }, () => line)];
    expect(timed(() => findSensitive(pages))).toBeLessThan(2000);
  });
});

describe("expressions régulières (docs/security.md §4.3)", () => {
  // Littéraux d'expressions régulières d'un fichier source : « / » précédé
  // d'un opérateur ou d'une parenthèse (pas d'une valeur : ce serait une division).
  const literals = (file: string) => {
    const source = readFileSync(join(import.meta.dir, file), "utf8")
      .split("\n")
      .filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l))
      .join("\n");
    return [...source.matchAll(/(?<=[=(,:!&|?;{}\[]\s*|return\s+)\/(?![/*])((?:\\.|\[(?:\\.|[^\]\\\n])*\]|[^/\\\n[])+)\/[dgimsuy]*/g)].map((m) => m[1]);
  };

  test("aucun quantificateur non borné : ni « + », ni « * », ni « {n,} »", () => {
    const found = [...literals("sensitive.ts"), ...literals("text-lines.ts"), ...literals("text-extract.ts")];
    // Les littéraux sont bien trouvés (sinon le test ne vérifierait rien).
    expect(found.length).toBeGreaterThanOrEqual(20);
    expect(found.some((r) => r.includes("fiscal|spi|avis"))).toBe(true);
    for (const source of found) {
      // Hors classes de caractères et hors échappements.
      const bare = source.replace(/\\./g, "").replace(/\[[^\]]*\]/g, "");
      expect(bare, source).not.toMatch(/[+*]|\{[0-9]+,\}/);
    }
  });
});
