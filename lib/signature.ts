// Image de la signature (dessinée, tapée ou importée) : traitement de pixels
// pur, testable sous Bun sans canvas (entrées de type ImageData). Rien n'est
// persisté : la signature n'existe qu'en mémoire (docs/prd-sign.md §4.4).
//
// WP0 : squelette. Corps à écrire en WP2.

/** Sous-ensemble d'ImageData : suffisant pour les fonctions pures, constructible sous Bun. */
export type Pixels = { data: Uint8ClampedArray; width: number; height: number };

export type SignatureImage = {
  /** PNG transparent, rogné à l'encre. */
  png: Uint8Array;
  width: number;
  height: number;
};

export const SIGNATURE_MIN_WIDTH = 1200;
export const INK = { black: "#111111", blue: "#1b3a8a" } as const;
export type InkId = keyof typeof INK;

const todo = (name: string): never => {
  throw new Error(`TODO (WP2) : ${name}`);
};

/** Pixels plus clairs que `threshold` (luma 0..255) deviennent transparents. */
export function removeBackground(_data: Pixels, _threshold: number): Pixels {
  return todo("removeBackground");
}

/** Tous les pixels opaques prennent la couleur donnée ; l'alpha est conservé. */
export function recolor(_data: Pixels, _hex: string): Pixels {
  return todo("recolor");
}

/** Boîte englobante des pixels non transparents, avec marge relative ; null si rien. */
export function inkBounds(_data: Pixels, _alphaMin?: number, _pad?: number): { x: number; y: number; w: number; h: number } | null {
  return todo("inkBounds");
}

export function trim(_data: Pixels, _pad?: number): Pixels {
  return todo("trim");
}
