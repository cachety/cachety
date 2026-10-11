// Texte final du filigrane : texte commun + destinataire + traçabilité.
//
//   « Dossier location — Agence Martin · 10/10/2026 · réf. K7Q2M »
//
// La référence identifie une copie : si un document fuite, elle dit à quel
// destinataire il avait été remis. Rien n'est conservé par l'application ;
// le registre (destinataire → référence) est affiché pour que l'utilisateur
// le garde lui-même.

/** Base32 de Crockford sans I, L, O, U : se lit et se dicte sans ambiguïté. */
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
export const REF_LENGTH = 5; // 32^5 ≈ 33 millions de références

export function makeRef(random: (n: number) => Uint8Array = (n) => crypto.getRandomValues(new Uint8Array(n))) {
  // 32 divise 256 : le modulo ne biaise aucun caractère.
  return Array.from(random(REF_LENGTH), (b) => ALPHABET[b % 32]).join("");
}

export const MAX_RECIPIENTS = 20;
export const MAX_RECIPIENT_LENGTH = 60;

/** Une ligne par destinataire : espaces rognés, lignes vides et doublons retirés, liste bornée. */
export function parseRecipients(input: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of input.split(/\r?\n/)) {
    const name = line.replace(/\s+/g, " ").trim().slice(0, MAX_RECIPIENT_LENGTH);
    const key = name.toLocaleLowerCase();
    if (!name || seen.has(key)) continue;
    seen.add(key);
    out.push(name);
    if (out.length === MAX_RECIPIENTS) break;
  }
  return out;
}

export function composeStamp(
  base: string,
  {
    recipient,
    trace,
  }: {
    recipient?: string;
    trace?: { date: string; ref: string; refLabel: string };
  } = {}
) {
  let text = base.trim();
  if (recipient) text = text ? `${text} — ${recipient}` : recipient;
  if (trace) {
    // La date n'est pas répétée si le texte la porte déjà (modèle « … le 10/10/2026 »).
    const parts = text.includes(trace.date) ? [text] : [text, trace.date];
    text = [...parts, `${trace.refLabel} ${trace.ref}`].filter(Boolean).join(" · ");
  }
  return text;
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
