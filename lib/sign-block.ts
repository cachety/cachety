// Lignes sous la signature (mention, lieu, date), dans la langue de la page.
//
// WP0 : squelette. Corps à écrire en WP2.

export type SignBlockParts = { date?: string; place?: string; mention?: string };

/** 0 à 2 lignes : la mention, puis « lieu, date ». Champs vides ignorés. */
export function composeSignBlock(_parts: SignBlockParts): string[] {
  throw new Error("TODO (WP2) : composeSignBlock");
}
