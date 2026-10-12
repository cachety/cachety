// Texte final du filigrane, et ses morceaux.
//
//   Formulaire simple : « Dossier location, Agence Martin, le 10/10/2026 »
//   Texte libre :       « Copie pour {recipient}, {date}, réf. {code} »
//
// La référence ({code}) identifie une copie : si un document fuite, elle dit à
// quel destinataire il avait été remis. Rien n'est conservé par l'application ;
// la liste (destinataire → référence) est donnée à l'utilisateur, qui la garde.

/** Base32 de Crockford sans I, L, O, U : se lit et se dicte sans ambiguïté. */
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
export const REF_LENGTH = 5; // 32^5 ≈ 33 millions de références

export function makeRef(random: (n: number) => Uint8Array = (n) => crypto.getRandomValues(new Uint8Array(n))) {
  // 32 divise 256 : le modulo ne biaise aucun caractère.
  return Array.from(random(REF_LENGTH), (b) => ALPHABET[b % 32]).join("");
}

export const MAX_RECIPIENTS = 20;
export const MAX_RECIPIENT_LENGTH = 60;

/** Un champ par destinataire : espaces rognés, champs vides et doublons (casse comprise) retirés, liste bornée. */
export function cleanRecipients(fields: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const field of fields) {
    const name = field.replace(/\s+/g, " ").trim().slice(0, MAX_RECIPIENT_LENGTH);
    const key = name.toLocaleLowerCase();
    if (!name || seen.has(key)) continue;
    seen.add(key);
    out.push(name);
    if (out.length === MAX_RECIPIENTS) break;
  }
  return out;
}

/** Ponctuation de liaison, toutes écritures : virgules latine, arabe, japonaise, chinoise. */
const SEP = "[,،、，;·]";

/**
 * Formulaire simple : « motif, destinataire, date », dans l'ordre recommandé
 * (Cybermalveillance). Le séparateur et la place de la date viennent de la
 * langue (`onDate` : « …, le 10/10/2026 », « …（2026/10/10） »).
 */
export function composeSimple(
  { purpose, recipient, date }: { purpose: string; recipient?: string; date: string },
  lang: { sep: string; onDate: (base: string, date: string) => string }
) {
  const base = [purpose.trim(), recipient?.trim()].filter(Boolean).join(lang.sep);
  return base ? lang.onDate(base, date) : date;
}

/** Mots à remplacer dans le texte libre. Chaque mot accepte sa forme traduite et l'anglaise. */
export type StampTokens = { recipient: string; date: string; code: string };
export const ENGLISH_TOKENS: StampTokens = { recipient: "{recipient}", date: "{date}", code: "{code}" };

export function hasToken(text: string, key: keyof StampTokens, tokens: StampTokens) {
  return text.includes(tokens[key]) || text.includes(ENGLISH_TOKENS[key]);
}

/**
 * Texte libre : remplace {recipient}, {date} et {code}. Un mot sans valeur
 * (pas de destinataire) disparaît avec sa ponctuation, sans laisser « , , ».
 */
export function fillTemplate(
  template: string,
  values: { recipient?: string; date: string; code?: string },
  tokens: StampTokens
) {
  let text = template;
  for (const key of ["recipient", "date", "code"] as const) {
    const value = values[key] ?? "";
    for (const token of new Set([tokens[key], ENGLISH_TOKENS[key]])) text = text.split(token).join(value);
  }
  return text
    .replace(new RegExp(`\\s*(${SEP})(\\s*${SEP})+`, "g"), "$1")
    .replace(new RegExp(`^[\\s]*${SEP}+\\s*|\\s*${SEP}+[\\s]*$`, "g"), "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Nom de fichier ou de dossier dérivé d'un destinataire : lisible, sans séparateur de chemin. */
export function recipientSlug(name: string) {
  const slug = name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 40);
  return slug || "destinataire";
}
