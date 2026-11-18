// Numéros sensibles dans le texte d'un document : IBAN, carte bancaire,
// numéros de sécurité sociale, fiscaux et d'identité. Pur (ni DOM ni pdf.js) :
// des lignes de texte en entrée, des correspondances en sortie.
//
// Règle du produit (docs/prd-suggested-areas.md §4.2) : un numéro n'est
// proposé que si sa clé de contrôle est juste (IBAN mod 97, Luhn, clé du
// NIR…) ou, pour les formats sans clé, si un libellé l'accompagne (« Numéro
// fiscal », « NIK »…). Une simple suite de chiffres n'est jamais proposée.
//
// Ce module ne masque rien : il suggère. La personne décide (§4.1).
//
// Coût : chaque ligne est parcourue une fois, et chaque début de mot ne
// déclenche qu'un travail borné (une lecture de 34 caractères au plus par
// catégorie). Les expressions régulières n'ont aucun quantificateur
// imbriqué et ne portent que sur des numéros déjà extraits ou sur une ligne
// entière, une fois : pas de retour arrière explosif (sensitive.test.ts).

import type { MaskRect } from "@/lib/masks";
import { lineNeighbours, MAX_LINE_CHARS, type Line, type LineNeighbours } from "@/lib/text-lines";

export const SENSITIVE_KINDS = [
  "iban",
  "card",
  "fr-nir",
  "fr-tax",
  "fr-tax-ref",
  "de-taxid",
  "es-dni",
  "nl-bsn",
  "be-nn",
  "pt-nif",
  "br-cpf",
  "it-cf",
  "cn-id",
  "jp-mynumber",
  "ir-melli",
  "id-nik",
] as const;
export type SensitiveKind = (typeof SENSITIVE_KINDS)[number];

/** Portion d'une ligne : caractères `start` (compris) à `end` (exclu). */
export type MatchSpan = { line: number; start: number; end: number };
export type Match = {
  kind: SensitiveKind;
  /** Page (index 0) et ligne de la page. */
  page: number;
  line: number;
  start: number;
  end: number;
  /** Forme affichée dans le panneau : « FR76 •••• •••• 0189 ». Jamais journalisée. */
  masked: string;
  /** Suite du numéro sur les lignes suivantes (IBAN coupé en fin de colonne). */
  more?: MatchSpan[];
};

/** Au-delà, la recherche s'arrête : un document forgé ne remplit pas le panneau de milliers de lignes. */
export const MAX_MATCHES = 2000;

// ───────────────────────── Normalisation ─────────────────────────

const FOREIGN =
  /[\t ٠-٩۰-۹  - ‐-―  −　０-９Ａ-Ｚａ-ｚ]/;
const FOREIGN_ALL = new RegExp(FOREIGN.source, "g");

function asciiOf(ch: string): string {
  const c = ch.charCodeAt(0);
  if (c >= 0x0660 && c <= 0x0669) return String.fromCharCode(48 + c - 0x0660); // chiffres arabes
  if (c >= 0x06f0 && c <= 0x06f9) return String.fromCharCode(48 + c - 0x06f0); // chiffres persans
  if (c >= 0xff10 && c <= 0xff19) return String.fromCharCode(48 + c - 0xff10); // chiffres pleine chasse
  if ((c >= 0xff21 && c <= 0xff3a) || (c >= 0xff41 && c <= 0xff5a)) return String.fromCharCode(c - 0xfee0); // lettres pleine chasse
  if ((c >= 0x2010 && c <= 0x2015) || c === 0x2212) return "-"; // tirets
  return " "; // espaces insécables, fines, idéographiques, tabulation
}

/**
 * Chiffres arabes (U+0660–0669), persans (U+06F0–06F9) et pleine chasse
 * (U+FF10–FF19) ramenés aux chiffres ASCII ; espaces insécables et fines
 * ramenées à l'espace. Même longueur que l'entrée : les positions restent
 * celles de la ligne d'origine.
 */
export function normaliseDigits(s: string): string {
  return FOREIGN.test(s) ? s.replace(FOREIGN_ALL, asciiOf) : s;
}

/** Numéro sans ses séparateurs, en majuscules. */
const compactOf = (s: string) => normaliseDigits(s).replace(/[\s.\-\/]/g, "").toUpperCase();

// ───────────────────────── Clés de contrôle ─────────────────────────
//
// Chaque contrôle existe en deux formes : `xxxOk` reçoit le numéro déjà
// débarrassé de ses séparateurs, en majuscules (ce que lit la recherche) ;
// `xxxValid`, exportée, accepte le numéro tel qu'il est écrit.

/** Longueur de l'IBAN par pays (registre ISO 13616 tenu par SWIFT). */
export const IBAN_LENGTHS: Readonly<Record<string, number>> = {
  AD: 24, AE: 23, AL: 28, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BI: 27, BR: 29, BY: 28, CH: 21, CR: 22,
  CY: 28, CZ: 24, DE: 22, DJ: 27, DK: 18, DO: 28, EE: 20, EG: 29, ES: 24, FI: 18, FK: 18, FO: 18, FR: 27, GB: 22,
  GE: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21, HU: 28, IE: 22, IL: 23, IQ: 23, IS: 26, IT: 27, JO: 30, KW: 30,
  KZ: 20, LB: 28, LC: 32, LI: 21, LT: 20, LU: 20, LV: 21, LY: 25, MC: 27, MD: 24, ME: 22, MK: 19, MN: 20, MR: 27,
  MT: 31, MU: 30, NI: 28, NL: 18, NO: 15, OM: 23, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29, RO: 24, RS: 22, RU: 33,
  SA: 24, SC: 31, SD: 18, SE: 24, SI: 19, SK: 24, SM: 27, SO: 23, ST: 25, SV: 28, TL: 23, TN: 24, TR: 26, UA: 29,
  VA: 22, VG: 24, XK: 20, YE: 30,
};

/** Reste modulo 97 d'un numéro écrit en chiffres et en lettres (A = 10 … Z = 35). */
function mod97(s: string): number {
  let rem = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    rem = c <= 57 ? (rem * 10 + (c - 48)) % 97 : (rem * 100 + (c - 55)) % 97;
  }
  return rem;
}

const digitAt = (s: string, i: number) => s.charCodeAt(i) - 48;

function ibanOk(c: string): boolean {
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/.test(c)) return false;
  if (IBAN_LENGTHS[c.slice(0, 2)] !== c.length) return false;
  return mod97(c.slice(4) + c.slice(0, 4)) === 1;
}
/** IBAN : longueur du pays (ISO 13616) et clé mod 97 = 1. Espaces et minuscules acceptés. */
export const ibanValid = (s: string) => ibanOk(compactOf(s));

function luhnOk(c: string): boolean {
  let sum = 0;
  for (let i = 0; i < c.length; i++) {
    let d = digitAt(c, c.length - 1 - i);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}
/** Formule de Luhn (cartes bancaires). */
export function luhnValid(s: string): boolean {
  const c = compactOf(s);
  return /^[0-9]{2,19}$/.test(c) && luhnOk(c);
}

/** La longueur convient-elle au réseau de la carte, reconnu à ses premiers chiffres ? */
function cardNetworkOk(c: string): boolean {
  const n = c.length;
  const d0 = digitAt(c, 0);
  const p2 = d0 * 10 + digitAt(c, 1);
  if (d0 === 4) return n === 13 || n === 16 || n === 19; // Visa
  if (p2 >= 51 && p2 <= 55) return n === 16; // Mastercard
  if (p2 === 34 || p2 === 37) return n === 15; // American Express
  if (p2 === 65 || p2 === 35 || p2 === 62) return n >= 16; // Discover, JCB, UnionPay
  const p4 = p2 * 100 + digitAt(c, 2) * 10 + digitAt(c, 3);
  if (p4 >= 2221 && p4 <= 2720) return n === 16; // Mastercard, série 2
  if (p4 === 6011) return n >= 16; // Discover
  return false;
}
/** Chiffres seulement, de 13 à 19 : la recherche le garantit, la forme exportée le vérifie. */
const cardOk = (c: string) => cardNetworkOk(c) && luhnOk(c);
/** Numéro de carte : Luhn, et préfixe et longueur d'un réseau connu. */
export function cardValid(s: string): boolean {
  const c = compactOf(s);
  return /^[0-9]{13,19}$/.test(c) && cardOk(c);
}

function nirOk(c: string): boolean {
  if (!/^[12][0-9]{2}(0[1-9]|1[0-2]|[23][0-9]|4[0-2]|[5-9][0-9])([0-9]{2}|2[AB])[0-9]{8}$/.test(c)) return false;
  const body = c.slice(0, 13).replace("2A", "19").replace("2B", "18");
  return 97 - mod97(body) === Number(c.slice(13));
}
/**
 * NIR français (numéro de sécurité sociale), 13 caractères et une clé de
 * 2 chiffres : clé = 97 − (numéro mod 97), la Corse comptant 19 (2A) et 18 (2B).
 */
export const nirValid = (s: string) => nirOk(compactOf(s));

const frTaxOk = (c: string) => /^[0-3][0-9]{12}$/.test(c);
/** Numéro fiscal français : 13 chiffres, le premier de 0 à 3. Sans clé : un libellé est exigé. */
export const frTaxValid = (s: string) => frTaxOk(compactOf(s));

const frTaxRefOk = (c: string) => /^[0-9]{2}[0-9A-Z]{11}$/.test(c) && c.replace(/[A-Z]/g, "").length >= 8;
/** Référence d'un avis d'impôt français : 13 caractères, surtout des chiffres. Sans clé : un libellé est exigé. */
export const frTaxRefValid = (s: string) => frTaxRefOk(compactOf(s));

function deTaxIdOk(c: string): boolean {
  if (!/^[1-9][0-9]{10}$/.test(c)) return false;
  const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 10; i++) counts[digitAt(c, i)]++;
  let repeated = 0;
  for (const n of counts) {
    if (n > 3) return false;
    if (n > 1) repeated++;
  }
  if (repeated !== 1) return false;
  let product = 10;
  for (let i = 0; i < 10; i++) {
    let sum = (digitAt(c, i) + product) % 10;
    if (sum === 0) sum = 10;
    product = (sum * 2) % 11;
  }
  return (11 - product) % 10 === digitAt(c, 10);
}
/**
 * Identifiant fiscal allemand (Steuer-ID) : 11 chiffres, le premier non nul,
 * un seul chiffre répété (deux ou trois fois) parmi les dix premiers, et un
 * chiffre de contrôle ISO 7064 MOD 11,10.
 */
export const deTaxIdValid = (s: string) => deTaxIdOk(compactOf(s));

const DNI_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";
function esDniOk(c: string): boolean {
  if (!/^([0-9]{8}|[XYZ][0-9]{7})[A-Z]$/.test(c)) return false;
  const n = Number(c.slice(0, 8).replace("X", "0").replace("Y", "1").replace("Z", "2"));
  return DNI_LETTERS[n % 23] === c[8];
}
/** DNI ou NIE espagnol : 8 chiffres (ou X, Y, Z et 7 chiffres) et une lettre, reste de la division par 23. */
export const esDniValid = (s: string) => esDniOk(compactOf(s));

function nlBsnOk(c: string): boolean {
  if (!/^[0-9]{9}$/.test(c) || c === "000000000") return false;
  let sum = 0;
  for (let i = 0; i < 8; i++) sum += digitAt(c, i) * (9 - i);
  return (sum - digitAt(c, 8)) % 11 === 0;
}
/** BSN néerlandais : 9 chiffres, « épreuve des onze » (le dernier chiffre pèse −1). */
export const nlBsnValid = (s: string) => nlBsnOk(compactOf(s));

function beNnOk(c: string): boolean {
  if (!/^[0-9]{11}$/.test(c)) return false;
  const month = Number(c.slice(2, 4));
  const day = Number(c.slice(4, 6));
  // Mois +20 ou +40 : numéros « bis » ; 00 : date inconnue.
  if (!(month <= 12 || (month >= 20 && month <= 32) || (month >= 40 && month <= 52)) || day > 31) return false;
  const body = Number(c.slice(0, 9));
  const key = Number(c.slice(9));
  return 97 - (body % 97) === key || 97 - ((2_000_000_000 + body) % 97) === key;
}
/**
 * Numéro national belge : AAMMJJ, 3 chiffres d'ordre, clé = 97 − (les neuf
 * premiers chiffres mod 97), précédés d'un 2 pour les personnes nées en 2000 ou après.
 */
export const beNnValid = (s: string) => beNnOk(compactOf(s));

function ptNifOk(c: string): boolean {
  if (!/^[1-9][0-9]{8}$/.test(c)) return false;
  let sum = 0;
  for (let i = 0; i < 8; i++) sum += digitAt(c, i) * (9 - i);
  const check = 11 - (sum % 11);
  return (check >= 10 ? 0 : check) === digitAt(c, 8);
}
/** NIF portugais : 9 chiffres, clé mod 11. */
export const ptNifValid = (s: string) => ptNifOk(compactOf(s));

function brCpfOk(c: string): boolean {
  if (!/^[0-9]{11}$/.test(c) || /^([0-9])\1{10}$/.test(c)) return false;
  for (const len of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += digitAt(c, i) * (len + 1 - i);
    if (((sum * 10) % 11) % 10 !== digitAt(c, len)) return false;
  }
  return true;
}
/** CPF brésilien : 11 chiffres dont deux de contrôle (mod 11). */
export const brCpfValid = (s: string) => brCpfOk(compactOf(s));

const CF_ODD: Record<string, number> = {
  0: 1, 1: 0, 2: 5, 3: 7, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19, 9: 21,
  A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21, K: 2, L: 4, M: 18, N: 20, O: 11, P: 3, Q: 6,
  R: 8, S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23,
};
function itCfOk(c: string): boolean {
  if (!/^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$/.test(c)) return false;
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    const ch = c[i];
    // Rangs comptés à partir de 1 : le premier caractère est « impair ».
    if (i % 2 === 0) sum += CF_ODD[ch];
    else sum += ch <= "9" ? ch.charCodeAt(0) - 48 : ch.charCodeAt(0) - 65;
  }
  return String.fromCharCode(65 + (sum % 26)) === c[15];
}
/** Codice fiscale italien : 16 caractères, le dernier étant la lettre de contrôle (tables des rangs pairs et impairs). */
export const itCfValid = (s: string) => itCfOk(compactOf(s));

const CN_WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
function cnIdOk(c: string): boolean {
  if (!/^[1-9][0-9]{5}(18|19|20)[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9X]$/.test(c)) return false;
  let sum = 0;
  for (let i = 0; i < 17; i++) sum += digitAt(c, i) * CN_WEIGHTS[i];
  return "10X98765432"[sum % 11] === c[17];
}
/** Carte d'identité de résident chinoise : 17 chiffres (dont la date de naissance) et une clé ISO 7064 MOD 11-2. */
export const cnIdValid = (s: string) => cnIdOk(compactOf(s));

function jpMyNumberOk(c: string): boolean {
  if (!/^[0-9]{12}$/.test(c)) return false;
  let sum = 0;
  for (let n = 1; n <= 11; n++) sum += digitAt(c, 11 - n) * (n <= 6 ? n + 1 : n - 5);
  const rem = sum % 11;
  return (rem <= 1 ? 0 : 11 - rem) === digitAt(c, 11);
}
/** My Number japonais (個人番号) : 11 chiffres et un chiffre de contrôle (mod 11, poids 2 à 7 puis 2 à 6). */
export const jpMyNumberValid = (s: string) => jpMyNumberOk(compactOf(s));

function irMelliOk(c: string): boolean {
  if (!/^[0-9]{10}$/.test(c) || /^([0-9])\1{9}$/.test(c)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += digitAt(c, i) * (10 - i);
  const rem = sum % 11;
  const check = digitAt(c, 9);
  return rem < 2 ? check === rem : check === 11 - rem;
}
/** Code national iranien (کد ملی) : 10 chiffres, clé mod 11. */
export const irMelliValid = (s: string) => irMelliOk(compactOf(s));

function idNikOk(c: string): boolean {
  if (!/^[0-9]{16}$/.test(c)) return false;
  const province = Number(c.slice(0, 2));
  const day = Number(c.slice(6, 8));
  const month = Number(c.slice(8, 10));
  // Jour + 40 pour les femmes.
  const dayOk = (day >= 1 && day <= 31) || (day >= 41 && day <= 71);
  return province >= 11 && province <= 94 && dayOk && month >= 1 && month <= 12 && c.slice(12) !== "0000";
}
/** NIK indonésien : 16 chiffres (région, date de naissance, rang). Sans clé : structure vérifiée, libellé exigé. */
export const idNikValid = (s: string) => idNikOk(compactOf(s));

/** Validateur de chaque catégorie. */
export const VALIDATORS: Readonly<Record<SensitiveKind, (s: string) => boolean>> = {
  iban: ibanValid,
  card: cardValid,
  "fr-nir": nirValid,
  "fr-tax": frTaxValid,
  "fr-tax-ref": frTaxRefValid,
  "de-taxid": deTaxIdValid,
  "es-dni": esDniValid,
  "nl-bsn": nlBsnValid,
  "be-nn": beNnValid,
  "pt-nif": ptNifValid,
  "br-cpf": brCpfValid,
  "it-cf": itCfValid,
  "cn-id": cnIdValid,
  "jp-mynumber": jpMyNumberValid,
  "ir-melli": irMelliValid,
  "id-nik": idNikValid,
};

// ───────────────────────── Forme affichée ─────────────────────────

/**
 * Forme partiellement masquée : le début et la fin seulement, pour que la
 * personne reconnaisse ce qu'elle masque. Au plus 4 caractères de chaque
 * côté, et jamais plus de la moitié d'un numéro court.
 */
export function maskedForm(value: string): string {
  const c = compactOf(value);
  const keep = Math.min(4, Math.floor(c.length / 4));
  return `${c.slice(0, keep)} •••• •••• ${keep ? c.slice(-keep) : ""}`.trim();
}

// ───────────────────────── Libellés ─────────────────────────

const FOLDED_CHARS = new Map<number, string>();

/** Un caractère replié : minuscule, sans accent ni forme de présentation. */
function foldChar(code: number, ch: string): string {
  if (code < 128) {
    if (code >= 65 && code <= 90) return String.fromCharCode(code + 32);
    if (code === 96) return "'";
    return code === 9 || code === 10 || code === 13 ? " " : ch;
  }
  let folded = FOLDED_CHARS.get(code);
  if (folded === undefined) {
    folded = ch
      .normalize("NFKD")
      .replace(/[̀-ًͯ-ٟـٰ‌‍]/g, "")
      .toLowerCase()
      .replace(/[’ʼ]/g, "'")
      .replace(/[°º]/g, "o")
      .replace(/ك/g, "ک") // kaf arabe → kaf persan
      .replace(/[يى]/g, "ی") // yé arabe → yé persan
      .replace(/\s/g, " ");
    if (FOLDED_CHARS.size < 8192) FOLDED_CHARS.set(code, folded);
  }
  return folded;
}

type Folded = {
  text: string;
  /** `offset[i]` : longueur du texte replié avant le caractère `i` de la ligne. */
  offset: Int32Array;
};

function foldWithOffsets(s: string): Folded {
  const offset = new Int32Array(s.length + 1);
  let text = "";
  let space = false;
  for (let i = 0; i < s.length; i++) {
    offset[i] = text.length;
    const f = foldChar(s.charCodeAt(i), s[i]);
    // Espaces réduites à une seule.
    if (f === " ") {
      if (space) continue;
      space = true;
    } else if (f) space = false;
    text += f;
  }
  offset[s.length] = text.length;
  return { text, offset };
}

/** Texte comparable aux libellés : minuscules, sans accents ni formes de présentation, espaces réduites. */
export function foldLabel(s: string): string {
  return foldWithOffsets(s).text.trim();
}

// Libellés par catégorie (pas par langue de l'interface : un bulletin
// allemand peut être ouvert dans l'interface française). Ce sont des données
// de détection, pas des textes d'interface : ils ne sont pas traduits.
export const LABELS: Readonly<Partial<Record<SensitiveKind, readonly string[]>>> = {
  "fr-tax": ["numéro fiscal", "n° fiscal", "identifiant fiscal", "SPI"],
  "fr-tax-ref": ["référence de l'avis", "réf. de l'avis", "réf de l'avis", "référence avis"],
  "nl-bsn": ["BSN", "burgerservicenummer", "burgerservicenr", "sofinummer"],
  "pt-nif": ["NIF", "contribuinte"],
  "br-cpf": ["CPF"],
  "jp-mynumber": ["個人番号", "マイナンバー"],
  "ir-melli": ["کد ملی", "کدملی", "شماره ملی"],
  "id-nik": ["NIK", "nomor induk kependudukan"],
};

/**
 * Une page sans aucun de ces fragments ne porte aucun libellé : la recherche
 * des libellés y est sautée d'un seul test par ligne. Tout libellé de LABELS
 * doit contenir l'un d'eux (vérifié par sensitive.test.ts) ; l'écriture
 * arabe ou persane compte d'office, ses formes de présentation étant variées.
 */
export const LABEL_HINT =
  /fiscal|spi|avis|bsn|burgerservice|sofi|nif|contribuinte|cpf|nik|kependudukan|個人番号|マイナン|[؀-ۿﭐ-ﻼｦ-ﾟ]/i;

const isLatinWordChar = (ch: string | undefined) => !!ch && /[a-z0-9]/.test(ch);

/** Fins (croissantes) des occurrences d'un des libellés dans un texte replié ; mot entier pour les libellés latins. */
function labelEnds(text: string, labels: readonly string[]): number[] {
  const ends: number[] = [];
  for (const label of labels) {
    for (let at = text.indexOf(label); at >= 0; at = text.indexOf(label, at + 1)) {
      const end = at + label.length;
      if (isLatinWordChar(label[0]) && isLatinWordChar(text[at - 1])) continue;
      if (isLatinWordChar(label[label.length - 1]) && isLatinWordChar(text[end])) continue;
      ends.push(end);
    }
  }
  return ends.sort((a, b) => a - b);
}

// ───────────────────────── Règles ─────────────────────────

type Rule = {
  kind: SensitiveKind;
  /** Premiers chiffres possibles (vide : le numéro commence par une lettre). */
  first: string;
  /** Longueurs du numéro sans séparateurs, de la plus longue à la plus courte. */
  lengths: readonly number[];
  /** Des lettres peuvent faire partie du numéro. */
  letters?: boolean;
  /** Séparateurs admis (espace, point, tiret), un seul à la fois, entre deux caractères du numéro. */
  seps: string;
  /** Les mêmes, en masque de bits (calculé). */
  sepMask: number;
  ok: (compact: string) => boolean;
  /** Libellés (repliés) dont l'un doit accompagner le numéro. */
  labels?: string[];
  /** Écriture si typique qu'elle dispense du libellé (« 000.000.000-00 »). */
  typical?: (text: string, at: number) => boolean;
  /** Le numéro ne doit pas être un morceau d'une suite de chiffres plus longue. */
  alone?: boolean;
  /** Contrôle de l'écriture en groupes (carte bancaire), d'après les tampons de lecture. */
  layout?: (length: number) => boolean;
  /** Peut continuer sur la ligne suivante. */
  wraps?: boolean;
};

const DIGITS = "0123456789";
const NONZERO = "123456789";
const labelsOf = (kind: SensitiveKind) => (LABELS[kind] ?? []).map(foldLabel);

/** Espace : 1, point : 2, tiret : 4. */
const sepBit = (c: number) => (c === 32 ? 1 : c === 46 ? 2 : c === 45 ? 4 : 0);
const ALL_SEPS = 7;
const rule = (r: Omit<Rule, "sepMask">): Rule => ({
  ...r,
  sepMask: Array.from(r.seps).reduce((m, ch) => m | sepBit(ch.charCodeAt(0)), 0),
});

/** « 000.000.000-00 » : l'écriture habituelle d'un CPF. */
const cpfWritten = (text: string, at: number) =>
  text[at + 3] === "." && text[at + 7] === "." && text[at + 11] === "-" && /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/.test(text.slice(at, at + 14));

// Tampons de lecture, réutilisés. Après take() : caractères lus (en
// majuscules) et, pour chaque nombre k de caractères lus, la position dans
// la ligne après le k-ième, le nombre de groupes et les séparateurs franchis.
const MAX_READ = 34;
const READ = new Uint16Array(MAX_READ);
const ENDS = new Int32Array(MAX_READ + 1);
const GROUPS = new Uint8Array(MAX_READ + 1);
const SEPS = new Uint8Array(MAX_READ + 1);
const SIZES = new Uint8Array(MAX_READ + 2);
const readString = (count: number) => String.fromCharCode.apply(null, READ.subarray(0, count) as unknown as number[]);

/**
 * Écriture d'un numéro de carte : d'un seul tenant, par groupes de 4 (le
 * dernier peut être plus court), ou 4-6-5 (American Express). Deux nombres
 * voisins dans un tableau ne forment pas une carte.
 */
function cardLayoutOk(length: number): boolean {
  const groups = GROUPS[length];
  if (groups === 1) return true;
  if (groups > 5) return false;
  SIZES.fill(0, 0, groups + 1);
  for (let k = 1; k <= length; k++) SIZES[GROUPS[k]]++;
  if (groups === 3 && SIZES[1] === 4 && SIZES[2] === 6 && SIZES[3] === 5) return true;
  for (let g = 1; g < groups; g++) if (SIZES[g] !== 4) return false;
  return SIZES[groups] <= 4;
}

// Ordre = priorité quand deux catégories conviennent aux mêmes caractères, à
// preuve égale : la plus précise d'abord, la carte bancaire en dernier.
const RULES: Rule[] = [
  rule({ kind: "iban", first: "", lengths: [], letters: true, seps: " ", ok: ibanOk, wraps: true }),
  rule({ kind: "fr-nir", first: "12", lengths: [15], letters: true, seps: " .", ok: nirOk }),
  rule({ kind: "it-cf", first: "", lengths: [16], letters: true, seps: "", ok: itCfOk }),
  rule({ kind: "cn-id", first: NONZERO, lengths: [18], letters: true, seps: "", ok: cnIdOk }),
  rule({ kind: "es-dni", first: DIGITS, lengths: [9], letters: true, seps: ".-", ok: esDniOk }),
  rule({ kind: "br-cpf", first: DIGITS, lengths: [11], seps: ".-", ok: brCpfOk, labels: labelsOf("br-cpf"), typical: cpfWritten }),
  rule({ kind: "be-nn", first: DIGITS, lengths: [11], seps: " .-", ok: beNnOk, alone: true }),
  rule({ kind: "de-taxid", first: NONZERO, lengths: [11], seps: " ", ok: deTaxIdOk, alone: true }),
  rule({ kind: "fr-tax", first: "0123", lengths: [13], seps: " ", ok: frTaxOk, labels: labelsOf("fr-tax") }),
  rule({ kind: "fr-tax-ref", first: DIGITS, lengths: [13], letters: true, seps: " ", ok: frTaxRefOk, labels: labelsOf("fr-tax-ref") }),
  rule({ kind: "nl-bsn", first: DIGITS, lengths: [9], seps: " .", ok: nlBsnOk, labels: labelsOf("nl-bsn") }),
  rule({ kind: "pt-nif", first: NONZERO, lengths: [9], seps: " ", ok: ptNifOk, labels: labelsOf("pt-nif") }),
  rule({ kind: "jp-mynumber", first: DIGITS, lengths: [12], seps: " -", ok: jpMyNumberOk, labels: labelsOf("jp-mynumber") }),
  rule({ kind: "ir-melli", first: DIGITS, lengths: [10], seps: " -", ok: irMelliOk, labels: labelsOf("ir-melli") }),
  rule({ kind: "id-nik", first: NONZERO, lengths: [16], seps: " .", ok: idNikOk, labels: labelsOf("id-nik") }),
  rule({ kind: "card", first: "23456", lengths: [19, 18, 17, 16, 15, 13], seps: " -", ok: cardOk, layout: cardLayoutOk }),
];
const RANK = new Map(RULES.map((r, i) => [r.kind, i]));
const RULE = Object.fromEntries(RULES.map((r) => [r.kind, r])) as Record<SensitiveKind, Rule>;
/**
 * Pour chaque premier chiffre (0 à 9), les règles qu'une seule lecture de
 * chiffres suffit à essayer. Le NIR et la carte d'identité chinoise en font
 * partie (15 ou 18 chiffres) ; leurs écritures avec une lettre (2A, 2B, X),
 * le DNI et la référence d'avis sont essayés à part.
 */
const DIGIT_RULES = Array.from(DIGITS, (d) =>
  RULES.filter((r) => r.first.includes(d) && (!r.letters || r.kind === "fr-nir" || r.kind === "cn-id"))
);
const SHORTEST = Math.min(...RULES.filter((r) => r.first).map((r) => r.lengths[r.lengths.length - 1]));
const LONGEST_DIGITS = 19;

// ───────────────────────── Lecture d'une ligne ─────────────────────────

const isDigit = (c: number) => c >= 48 && c <= 57;
const isLetter = (c: number) => (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
const isAlnum = (c: number) => isDigit(c) || isLetter(c);
/** Chiffre, ou lettre qui remplace un chiffre dans un codice fiscale (homonymes). */
const isCfDigit = (c: number) => isDigit(c) || "LMNPQRSTUVlmnpqrstuv".includes(String.fromCharCode(c));

/**
 * Lit au plus `count` caractères du numéro à partir de `at`, en sautant un
 * séparateur isolé entre deux d'entre eux. Rend le nombre de caractères lus ;
 * le détail est dans les tampons. Coût borné par `count`.
 */
function take(text: string, at: number, count: number, letters: boolean, sepMask: number): number {
  const n = text.length;
  let i = at;
  let got = 0;
  let groups = 1;
  let seps = 0;
  while (got < count && i < n) {
    const c = text.charCodeAt(i);
    if (isDigit(c) || (letters && isLetter(c))) {
      READ[got++] = c >= 97 ? c - 32 : c;
      i++;
      ENDS[got] = i;
      GROUPS[got] = groups;
      SEPS[got] = seps;
      continue;
    }
    const bit = sepBit(c) & sepMask;
    if (bit && got && i + 1 < n) {
      const next = text.charCodeAt(i + 1);
      if (isDigit(next) || (letters && isLetter(next))) {
        groups++;
        seps |= bit;
        i++;
        continue;
      }
    }
    break;
  }
  return got;
}

const CHAIN_SEPS = " .-/,";

type Candidate = {
  rule: Rule;
  spans: MatchSpan[];
  compact: string;
  /** Force de la preuve : 3 IBAN, libellé sur la ligne ou écriture typique ; 2 libellé au-dessus ; 1 clé seule ; 0,5 carte. */
  proof: number;
};

type LineInfo = {
  folded: Folded;
  /** `digits[i]` : nombre de chiffres du texte replié avant la position `i`. */
  digits: Int32Array;
  labels: Map<SensitiveKind, number[]>;
};

type PageContext = {
  /** Lignes normalisées de la page. */
  lines: string[];
  /** Voisinage géométrique des lignes, demandé à la première utilisation seulement. */
  neighbours: LineNeighbours[] | undefined;
  ask: (() => LineNeighbours[] | undefined) | undefined;
  info: Map<number, LineInfo>;
  /** La page contient-elle de quoi faire un libellé ? Calculé à la première demande. */
  hint: boolean | undefined;
};

function lineInfo(ctx: PageContext, index: number): LineInfo {
  let info = ctx.info.get(index);
  if (!info) {
    const folded = foldWithOffsets(ctx.lines[index] ?? "");
    const digits = new Int32Array(folded.text.length + 1);
    for (let i = 0; i < folded.text.length; i++) digits[i + 1] = digits[i] + (isDigit(folded.text.charCodeAt(i)) ? 1 : 0);
    info = { folded, digits, labels: new Map() };
    ctx.info.set(index, info);
  }
  return info;
}

function labelEndsOf(info: LineInfo, r: Rule): number[] {
  let ends = info.labels.get(r.kind);
  if (!ends) {
    ends = labelEnds(info.folded.text, r.labels!);
    info.labels.set(r.kind, ends);
  }
  return ends;
}

function nearOf(ctx: PageContext, line: number): LineNeighbours | undefined {
  if (ctx.ask) {
    ctx.neighbours = ctx.ask();
    ctx.ask = undefined;
  }
  return ctx.neighbours?.[line];
}

/** La page peut-elle porter un libellé ? Un seul test par ligne, une fois par page. */
function pageHasHint(ctx: PageContext): boolean {
  if (ctx.hint === undefined) ctx.hint = ctx.lines.some((l) => LABEL_HINT.test(l));
  return ctx.hint;
}

/**
 * Preuve apportée par un libellé : 3 s'il précède le numéro sur sa ligne (ou
 * termine le segment voisin de la même rangée), 2 s'il est sur la ligne du
 * dessus, 0 sinon. « Précède » : entre le libellé et le numéro, au plus
 * quelques chiffres (« Déclarant 1 : ») ; s'il y a déjà un autre numéro, le
 * libellé est le sien. Chaque ligne n'est repliée et fouillée qu'une fois.
 */
function labelProof(r: Rule, ctx: PageContext, line: number, start: number): number {
  if (!pageHasHint(ctx)) return 0;
  const info = lineInfo(ctx, line);
  const ends = labelEndsOf(info, r);
  if (ends.length) {
    const pos = info.folded.offset[start];
    // Dernière occurrence qui finit avant le numéro (recherche dichotomique).
    let lo = 0;
    let hi = ends.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (ends[mid] <= pos) lo = mid + 1;
      else hi = mid;
    }
    if (lo > 0 && info.digits[pos] - info.digits[ends[lo - 1]] <= 4) return 3;
  }
  const near = nearOf(ctx, line);
  for (const b of near?.before ?? []) {
    const other = lineInfo(ctx, b);
    const last = labelEndsOf(other, r).at(-1);
    if (last !== undefined && other.digits[other.folded.text.length] - other.digits[last] <= 4) return 3;
  }
  // Sans géométrie (texte seul) : la ligne du dessus est la précédente.
  const above = near ? near.above : line > 0 ? [line - 1] : [];
  for (const a of above) {
    if (labelEndsOf(lineInfo(ctx, a), r).length) return 2;
  }
  return 0;
}

/** Fin de numéro acceptable : pas de lettre ni de chiffre collé derrière. */
const endsCleanly = (text: string, end: number) => end >= text.length || !isAlnum(text.charCodeAt(end));

/**
 * Ce qui se vérifie avant même de regarder le numéro : il n'est pas un
 * morceau d'une suite plus longue, et son libellé est là. Rend la force de la
 * preuve (0 : inutile de continuer).
 */
function proofAt(r: Rule, ctx: PageContext, line: number, at: number): number {
  const text = ctx.lines[line];
  // Ni précédé ni suivi d'un autre groupe de chiffres (« 12 345… » dans un tableau).
  if (r.alone && at >= 2 && CHAIN_SEPS.includes(text[at - 1]) && isDigit(text.charCodeAt(at - 2))) return 0;
  if (!r.labels) return r.kind === "iban" ? 3 : r.kind === "card" ? 0.5 : 1;
  return r.typical?.(text, at) ? 3 : labelProof(r, ctx, line, at);
}

/** Les `length` premiers caractères lus (tampons) forment-ils un numéro valable ? Si oui, l'ajoute. */
function accept(r: Rule, ctx: PageContext, line: number, at: number, length: number, proof: number, out: Candidate[]): boolean {
  const text = ctx.lines[line];
  const end = ENDS[length];
  if (r.layout && !r.layout(length)) return false;
  if (r.alone && end + 1 < text.length && CHAIN_SEPS.includes(text[end]) && isDigit(text.charCodeAt(end + 1))) return false;
  const compact = readString(length);
  if (!r.ok(compact)) return false;
  out.push({ rule: r, spans: [{ line, start: at, end }], compact, proof });
  return true;
}

/**
 * Numéro interrompu par la fin de la ligne : il peut continuer au début de la
 * suivante (IBAN replié dans une colonne étroite). Trois lignes de plus au maximum.
 */
function readWrapped(r: Rule, ctx: PageContext, line: number, at: number, length: number, got: number): Candidate | null {
  if (got < 4) return null;
  const spans: MatchSpan[] = [{ line, start: at, end: ENDS[got] }];
  let compact = readString(got);
  let current = line;
  let rest = ctx.lines[line].slice(ENDS[got]);
  for (let hop = 0; hop < 3; hop++) {
    if (rest.trim()) return null;
    const near = nearOf(ctx, current);
    const next = near ? near.next : current + 1;
    if (next === undefined || next >= ctx.lines.length || spans.some((s) => s.line === next)) return null;
    const below = ctx.lines[next];
    let start = 0;
    while (start < below.length && below[start] === " ") start++;
    const more = take(below, start, length - compact.length, !!r.letters, r.sepMask);
    if (!more) return null;
    spans.push({ line: next, start, end: ENDS[more] });
    compact += readString(more);
    if (compact.length === length) {
      return endsCleanly(below, ENDS[more]) && r.ok(compact) ? { rule: r, spans, compact, proof: 3 } : null;
    }
    current = next;
    rest = below.slice(ENDS[more]);
  }
  return null;
}

/** Tente une règle au caractère `at`, avec sa propre lecture (numéros qui contiennent des lettres). */
function attempt(r: Rule, ctx: PageContext, line: number, at: number, length: number, out: Candidate[]) {
  const proof = proofAt(r, ctx, line, at);
  if (!proof) return;
  const text = ctx.lines[line];
  const got = take(text, at, length, !!r.letters, r.sepMask);
  if (got < length) {
    const wrapped = r.wraps ? readWrapped(r, ctx, line, at, length, got) : null;
    if (wrapped) out.push(wrapped);
  } else if (endsCleanly(text, ENDS[length])) accept(r, ctx, line, at, length, proof, out);
}

const NEXT_DIGIT = /[0-9]/g;
/** Un numéro qui commence par des lettres a son premier chiffre dans ses 16 premiers caractères. */
const LETTERS_BEFORE_DIGIT = 16;

function scanLine(ctx: PageContext, line: number, out: Candidate[]) {
  const text = ctx.lines[line];
  const n = text.length;
  const at = (i: number) => (i < n ? text.charCodeAt(i) : 0);

  // De chiffre en chiffre (recherche native) : un texte sans chiffre ne coûte
  // presque rien. Chaque mot qui contient un chiffre est examiné une fois, à
  // son début.
  for (let from = 0; from < n; ) {
    NEXT_DIGIT.lastIndex = from;
    if (!NEXT_DIGIT.test(text)) break;
    const found = NEXT_DIGIT.lastIndex - 1;
    // Début du mot. Débuts de mot seulement : « XFR76… » collé à une lettre n'est pas un IBAN.
    let i = found;
    while (i > from && found - i < LETTERS_BEFORE_DIGIT && isAlnum(text.charCodeAt(i - 1))) i--;
    let end = found + 1;
    while (end < n && isAlnum(text.charCodeAt(end))) end++;
    from = end;
    if (i > 0 && isAlnum(text.charCodeAt(i - 1))) continue;
    const c = text.charCodeAt(i);

    if (i < found) {
      // Un mot qui commence par une lettre : IBAN (deux lettres, deux
      // chiffres), codice fiscale (16 caractères d'un seul tenant) ou NIE.
      const c1 = at(i + 1);
      if (isLetter(c1)) {
        if (isDigit(at(i + 2)) && isDigit(at(i + 3))) {
          const length = IBAN_LENGTHS[text.slice(i, i + 2).toUpperCase()];
          if (length) attempt(RULE.iban, ctx, line, i, length, out);
        } else if (end - i === 16 && isLetter(at(i + 15)) && isCfDigit(at(i + 6)) && isCfDigit(at(i + 7))) {
          attempt(RULE["it-cf"], ctx, line, i, 16, out);
        }
      } else if ((c === 88 || c === 89 || c === 90 || c === 120 || c === 121 || c === 122) && (isDigit(c1) || (c1 === 45 && isDigit(at(i + 2))))) {
        attempt(RULE["es-dni"], ctx, line, i, 9, out);
      }
      continue;
    }

    // NIE écrit « X-1234567-L » : la lettre est séparée des chiffres par un tiret.
    if (i >= 2 && text.charCodeAt(i - 1) === 45 && (i === 2 || !isAlnum(text.charCodeAt(i - 3)))) {
      const x = text.charCodeAt(i - 2) | 32;
      if (x === 120 || x === 121 || x === 122) attempt(RULE["es-dni"], ctx, line, i - 2, 9, out);
    }

    // Un mot qui commence par un chiffre : une seule lecture de chiffres,
    // tous séparateurs admis, sert à toutes les règles « chiffres seuls »
    // (chacune vérifie ensuite que seuls ses séparateurs ont été franchis).
    const got = take(text, i, LONGEST_DIGITS, false, ALL_SEPS);
    if (got < 2) continue;
    // Positions utiles relevées maintenant : les lectures à lettres ci-dessous réutilisent les tampons.
    const after6 = got === 6 ? at(ENDS[6]) | 32 : 0;
    const after8 = got >= 8 && !(SEPS[8] & ~2) ? at(ENDS[8]) : 0;
    const dniLetter = after8 === 45 ? isLetter(at(ENDS[8] + 1)) : isLetter(after8);
    const after17 = got === 17 && !SEPS[17] ? at(ENDS[17]) | 32 : 0;
    if (got >= SHORTEST) {
      for (const r of DIGIT_RULES[c - 48]) {
        let proof = -1;
        for (const length of r.lengths) {
          if (length > got || SEPS[length] & ~r.sepMask || !endsCleanly(text, ENDS[length])) continue;
          if (proof < 0) proof = proofAt(r, ctx, line, i);
          if (!proof || accept(r, ctx, line, i, length, proof, out)) break;
        }
      }
    }
    // Écritures avec une lettre : Corse (2A, 2B), X final chinois, lettre du DNI, référence d'avis.
    if ((c === 49 || c === 50) && (after6 === 97 || after6 === 98)) attempt(RULE["fr-nir"], ctx, line, i, 15, out);
    if (after17 === 120) attempt(RULE["cn-id"], ctx, line, i, 18, out);
    if (dniLetter) attempt(RULE["es-dni"], ctx, line, i, 9, out);
    if (pageHasHint(ctx)) attempt(RULE["fr-tax-ref"], ctx, line, i, 13, out);
  }
}

// ───────────────────────── Recherche ─────────────────────────

const overlap = (a: MatchSpan, b: MatchSpan) => a.line === b.line && a.start < b.end && b.start < a.end;

/**
 * Cherche les numéros sensibles dans le texte d'un document : `pages[p][l]`
 * est la ligne `l` de la page `p`. Linéaire en la longueur du texte.
 *
 * `neighbours` (facultatif) donne, pour une page, le voisinage géométrique
 * de chaque ligne (lib/text-lines.ts) : les libellés sont alors cherchés dans
 * la colonne voisine et juste au-dessus. Sans lui, « au-dessus » est la ligne
 * précédente.
 */
export function findSensitive(
  pages: string[][],
  neighbours?: (page: number) => LineNeighbours[] | undefined
): Match[] {
  const matches: Match[] = [];
  for (let page = 0; page < pages.length && matches.length < MAX_MATCHES; page++) {
    const source = pages[page] ?? [];
    if (!source.length) continue;
    const ctx: PageContext = {
      lines: source.map((l) => normaliseDigits(l.length > MAX_LINE_CHARS ? l.slice(0, MAX_LINE_CHARS) : l)),
      neighbours: undefined,
      ask: neighbours ? () => neighbours(page) : undefined,
      info: new Map(),
      hint: undefined,
    };
    const candidates: Candidate[] = [];
    for (let line = 0; line < ctx.lines.length; line++) scanLine(ctx, line, candidates);
    if (!candidates.length) continue;
    // La preuve la plus forte d'abord, puis la catégorie la plus précise.
    candidates.sort(
      (a, b) =>
        b.proof - a.proof ||
        RANK.get(a.rule.kind)! - RANK.get(b.rule.kind)! ||
        a.spans[0].line - b.spans[0].line ||
        a.spans[0].start - b.spans[0].start
    );
    const kept: Candidate[] = [];
    const taken = new Map<number, MatchSpan[]>();
    for (const cand of candidates) {
      if (cand.spans.some((s) => taken.get(s.line)?.some((o) => overlap(o, s)))) continue;
      kept.push(cand);
      for (const s of cand.spans) {
        const list = taken.get(s.line);
        if (list) list.push(s);
        else taken.set(s.line, [s]);
      }
    }
    kept.sort((a, b) => a.spans[0].line - b.spans[0].line || a.spans[0].start - b.spans[0].start);
    for (const cand of kept) {
      if (matches.length >= MAX_MATCHES) break;
      const [head, ...more] = cand.spans;
      matches.push({
        kind: cand.rule.kind,
        page,
        line: head.line,
        start: head.start,
        end: head.end,
        masked: maskedForm(cand.compact),
        ...(more.length ? { more } : {}),
      });
    }
  }
  return matches;
}

/** Même recherche sur les lignes extraites d'un PDF, avec leur géométrie pour situer les libellés. */
export function findInLines(lines: Line[][]): Match[] {
  return findSensitive(
    lines.map((page) => page.map((l) => l.text)),
    (page) => lineNeighbours(lines[page])
  );
}

// ───────────────────────── Rectangles ─────────────────────────

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Rectangles à masquer pour une correspondance : les boîtes de ses caractères,
 * avec une marge (15 % de la hauteur du texte de part et d'autre, une
 * demi-largeur de caractère à chaque bout). Un rectangle par ligne. Fonction
 * pure des lignes : recalculable si la page est tournée.
 */
export function rectsFor(match: Match, lines: Line[][]): MaskRect[] {
  const out: MaskRect[] = [];
  const page = lines[match.page];
  if (!page) return out;
  for (const span of [{ line: match.line, start: match.start, end: match.end }, ...(match.more ?? [])]) {
    const boxes = (page[span.line]?.boxes.slice(span.start, span.end) ?? []).filter(
      (b) => b && Number.isFinite(b.x + b.y + b.w + b.h) && b.w >= 0 && b.h >= 0
    );
    if (!boxes.length) continue;
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    let thickX = 0;
    let thickY = 0;
    for (const b of boxes) {
      x0 = Math.min(x0, b.x);
      y0 = Math.min(y0, b.y);
      x1 = Math.max(x1, b.x + b.w);
      y1 = Math.max(y1, b.y + b.h);
      thickX = Math.max(thickX, b.w);
      thickY = Math.max(thickY, b.h);
    }
    const first = boxes[0];
    const last = boxes[boxes.length - 1];
    const dx = Math.abs(last.x + last.w / 2 - first.x - first.w / 2);
    const dy = Math.abs(last.y + last.h / 2 - first.y - first.h / 2);
    // Texte lu à la verticale (page tournée) : la marge « le long » est en y.
    const vertical = boxes.length > 1 && dy > dx;
    const mx = vertical ? 0.15 * thickX : (0.5 * (x1 - x0)) / boxes.length;
    const my = vertical ? (0.5 * (y1 - y0)) / boxes.length : 0.15 * thickY;
    const left = clamp01(x0 - mx);
    const top = clamp01(y0 - my);
    const w = clamp01(x1 + mx) - left;
    const h = clamp01(y1 + my) - top;
    if (w > 0 && h > 0) out.push({ x: left, y: top, w, h });
  }
  return out;
}
