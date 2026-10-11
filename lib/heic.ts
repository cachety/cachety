// HEIC / HEIF (photos d'iPhone) décodés dans le navigateur, sans envoi.
//
// Safari les décode nativement ; ailleurs, on charge à la demande libheif
// (bibliothèque officielle de Struktur AG, compilée en WebAssembly, ~2 Mo).
// Le module n'est téléchargé qu'au premier fichier HEIC déposé, et le
// WebAssembly est embarqué dans le script : aucune requête réseau de plus.
// Revue de la dépendance : docs/security.md §4.8.

import { MAX_IMAGE_PIXELS } from "@/lib/image-size";

export const HEIC_TYPES = ["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"];

export function isHeic(file: { type: string; name: string }) {
  const type = file.type.toLowerCase().split(";")[0].trim();
  if (HEIC_TYPES.includes(type)) return true;
  return (type === "" || type === "application/octet-stream") && /\.(heic|heif)$/i.test(file.name);
}

/** Image principale du fichier, en pixels RGBA. Lève `image_too_large` ou `image_unreadable`. */
export async function decodeHeic(bytes: Uint8Array): Promise<ImageData> {
  const { default: factory } = await import("libheif-js/libheif-wasm/libheif-bundle.mjs");
  const lib = factory();
  let images;
  try {
    images = new lib.HeifDecoder().decode(bytes);
  } catch {
    throw new Error("image_unreadable");
  }
  if (!images?.length) throw new Error("image_unreadable");
  try {
    const image = images[0];
    const width = image.get_width();
    const height = image.get_height();
    // Dimensions connues avant le décodage des pixels : même garde que pour
    // les autres formats contre les bombes de décompression.
    if (!(width > 0 && height > 0)) throw new Error("image_unreadable");
    if (width * height > MAX_IMAGE_PIXELS) throw new Error("image_too_large");
    const target = new ImageData(width, height);
    await new Promise<void>((resolve, reject) =>
      image.display(target, (result) => (result ? resolve() : reject(new Error("image_unreadable"))))
    );
    return target;
  } finally {
    for (const image of images) image.free();
  }
}
