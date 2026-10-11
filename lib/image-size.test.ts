import { describe, expect, test } from "bun:test";
import { PDFDocument } from "pdf-lib";
import { imageSize, MAX_IMAGE_PIXELS, tooManyPixels } from "./image-size";

const PNG_1x1 = Uint8Array.from(
  Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    "base64"
  )
);

/** En-tête PNG forgé : la « bombe » ne pèse que quelques octets. */
function pngHeader(width: number, height: number) {
  const b = new Uint8Array(33);
  b.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13]);
  b.set([0x49, 0x48, 0x44, 0x52], 12);
  new DataView(b.buffer).setUint32(16, width);
  new DataView(b.buffer).setUint32(20, height);
  return b;
}

describe("imageSize (en-tête, sans décodage)", () => {
  test("PNG réel", () => {
    expect(imageSize(PNG_1x1)).toEqual({ width: 1, height: 1 });
  });

  test("JPEG : SOF trouvé derrière un segment EXIF", () => {
    const sof = [0xff, 0xc0, 0, 17, 8, 0x0b, 0xb8, 0x0f, 0xa0, 3, 1, 0x22, 0, 2, 0x11, 1, 3, 0x11, 1];
    const exif = [0xff, 0xe1, 0, 8, 0x45, 0x78, 0x69, 0x66, 0, 0];
    const jpeg = Uint8Array.from([0xff, 0xd8, ...exif, ...sof, 0xff, 0xd9]);
    expect(imageSize(jpeg)).toEqual({ width: 4000, height: 3000 });
  });

  test("GIF, BMP (hauteur négative), WebP VP8X", () => {
    expect(imageSize(Uint8Array.from([..."GIF89a"].map((c) => c.charCodeAt(0)).concat([0x20, 0x03, 0x58, 0x02])))).toEqual({
      width: 800,
      height: 600,
    });
    const bmp = new Uint8Array(30);
    bmp.set([0x42, 0x4d]);
    new DataView(bmp.buffer).setInt32(18, 640, true);
    new DataView(bmp.buffer).setInt32(22, -480, true);
    expect(imageSize(bmp)).toEqual({ width: 640, height: 480 });
    const webp = new Uint8Array(30);
    webp.set([..."RIFF"].map((c) => c.charCodeAt(0)));
    webp.set([..."WEBPVP8X"].map((c) => c.charCodeAt(0)), 8);
    webp.set([0x7f, 0x07, 0x00, 0x37, 0x04, 0x00], 24); // 1920 × 1080, stockés moins un
    expect(imageSize(webp)).toEqual({ width: 1920, height: 1080 });
  });

  test("format inconnu ou tronqué : null, sans exception", () => {
    expect(imageSize(new Uint8Array(0))).toBeNull();
    expect(imageSize(Uint8Array.from([0xff, 0xd8, 0xff]))).toBeNull();
    expect(imageSize(new TextEncoder().encode("pas une image du tout"))).toBeNull();
  });
});

describe("tooManyPixels (bombe de décompression)", () => {
  test("40 000 × 40 000 en quelques octets : refusé", () => {
    expect(tooManyPixels(imageSize(pngHeader(40_000, 40_000)))).toBe(true);
  });

  test("photo de 200 Mpx (16 320 × 12 240) : acceptée ; dimensions inconnues : laissées au décodeur", () => {
    expect(16_320 * 12_240).toBeLessThan(MAX_IMAGE_PIXELS);
    expect(tooManyPixels(imageSize(pngHeader(16_320, 12_240)))).toBe(false);
    expect(tooManyPixels(null)).toBe(false);
  });

  test("le PNG embarqué par pdf-lib reste lisible (contrôle de non-régression du format)", async () => {
    const doc = await PDFDocument.create();
    const img = await doc.embedPng(PNG_1x1);
    expect(imageSize(PNG_1x1)).toEqual({ width: img.width, height: img.height });
  });
});
