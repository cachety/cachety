// Dimensions d'une image lues dans son en-tête, SANS la décoder. Sert de
// garde contre les « bombes de décompression » : quelques Ko de PNG peuvent
// annoncer 40 000 × 40 000 pixels, soit 6,4 Go une fois décodés par
// createImageBitmap, avant tout plafonnement du canvas.
//
// Formats lus : PNG, GIF, BMP, JPEG, WebP. Format inconnu ou en-tête
// tronqué : null (le décodeur du navigateur reste seul juge).

export type Size = { width: number; height: number };

/** 250 Mpx (1 Go en RGBA) : laisse passer les photos de 200 Mpx des téléphones récents. */
export const MAX_IMAGE_PIXELS = 250_000_000;

const u16be = (b: Uint8Array, i: number) => (b[i] << 8) | b[i + 1];
const u16le = (b: Uint8Array, i: number) => b[i] | (b[i + 1] << 8);
const u24le = (b: Uint8Array, i: number) => b[i] | (b[i + 1] << 8) | (b[i + 2] << 16);
const u32be = (b: Uint8Array, i: number) =>
  ((b[i] << 24) >>> 0) + (b[i + 1] << 16) + (b[i + 2] << 8) + b[i + 3];
const i32le = (b: Uint8Array, i: number) =>
  b[i] | (b[i + 1] << 8) | (b[i + 2] << 16) | (b[i + 3] << 24);
const ascii = (b: Uint8Array, i: number, n: number) =>
  String.fromCharCode(...b.subarray(i, i + n));

export function imageSize(b: Uint8Array): Size | null {
  // PNG : signature puis IHDR (largeur, hauteur en big-endian).
  if (b.length >= 24 && b[0] === 0x89 && ascii(b, 1, 3) === "PNG" && ascii(b, 12, 4) === "IHDR") {
    return { width: u32be(b, 16), height: u32be(b, 20) };
  }
  // GIF : écran logique.
  if (b.length >= 10 && ascii(b, 0, 4) === "GIF8") {
    return { width: u16le(b, 6), height: u16le(b, 8) };
  }
  // BMP : BITMAPINFOHEADER ; hauteur négative = image « de haut en bas ».
  if (b.length >= 26 && ascii(b, 0, 2) === "BM") {
    return { width: Math.abs(i32le(b, 18)), height: Math.abs(i32le(b, 22)) };
  }
  // WebP : conteneur RIFF, trois variantes de flux.
  if (b.length >= 30 && ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "WEBP") {
    const chunk = ascii(b, 12, 4);
    if (chunk === "VP8X") return { width: u24le(b, 24) + 1, height: u24le(b, 27) + 1 };
    if (chunk === "VP8L" && b[20] === 0x2f) {
      const bits = b[21] | (b[22] << 8) | (b[23] << 16) | (b[24] << 24);
      return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8 ") return { width: u16le(b, 26) & 0x3fff, height: u16le(b, 28) & 0x3fff };
    return null;
  }
  // JPEG : on saute les segments jusqu'au premier SOFn (EXIF et vignettes
  // peuvent précéder).
  if (b.length >= 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) return null;
      const marker = b[i + 1];
      if (marker === 0xff) {
        i++; // octet de remplissage
        continue;
      }
      // SOF0–SOF15, hors DHT (C4), JPG (C8) et DAC (CC).
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { width: u16be(b, i + 7), height: u16be(b, i + 5) };
      }
      i += 2 + u16be(b, i + 2);
    }
  }
  return null;
}

/** L'image décodée dépasserait le plafond de pixels. */
export const tooManyPixels = (s: Size | null) => !!s && s.width * s.height > MAX_IMAGE_PIXELS;
