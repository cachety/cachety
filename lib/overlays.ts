// Signature posée sur la page (mode « signer ») : image peinte sur la page
// rendue, APRÈS les masques et AVANT le filigrane. Comme pour les masques, la
// sortie est entièrement rastérisée : la signature fait partie des pixels de
// la page, on ne peut ni la déplacer ni la retirer en éditant le PDF.
//
// Coordonnées en fractions de la page telle qu'affichée (0–1, rotation
// comprise) : indépendantes de la résolution, et non inversées en RTL.
//
// WP0 : squelette. Corps à écrire en WP1 (voir docs/prd-sign.md §6.2).

export type OverlayRect = { x: number; y: number; w: number; h: number };
export type Overlay = { rect: OverlayRect; image: "signature" | "initials" };
/** Signatures par page (index 0). */
export type PageOverlays = Record<number, Overlay[]>;
export type OverlayImages = { signature: ImageBitmap; initials?: ImageBitmap };

export const DEFAULT_SIGNATURE_WIDTH = 0.28;
export const DEFAULT_INITIALS_WIDTH = 0.16;
export const EDGE_MARGIN = 0.06;

const todo = (name: string): never => {
  throw new Error(`TODO (WP1) : ${name}`);
};

/** Placement par défaut : en bas à droite, marges EDGE_MARGIN, rapport de l'image conservé. */
export function defaultPlacement(_pageAspect: number, _imageAspect: number, _width = DEFAULT_SIGNATURE_WIDTH): OverlayRect {
  return todo("defaultPlacement");
}

export function overlaysKey(_overlays: PageOverlays | undefined): string {
  return todo("overlaysKey");
}

export function paintOverlays(
  _ctx: CanvasRenderingContext2D,
  _width: number,
  _height: number,
  _overlays: Overlay[] | undefined,
  _images: OverlayImages | undefined
): void {
  todo("paintOverlays");
}
