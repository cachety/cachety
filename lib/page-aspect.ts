// Mode « signer » : nombre de pages et rapport largeur / hauteur de la
// DERNIÈRE page, lus sans rien rendre, pour poser la signature à sa place
// par défaut dès le premier rendu (sans eux, il faudrait rendre le document
// une fois sans signature, mesurer, puis le rendre à nouveau).
//
// Mêmes gardes et mêmes erreurs que le moteur (lib/watermark.ts) : un PDF
// verrouillé lève `pdf_password`, ce qui ouvre le déverrouillage dans la liste.

import { pdfjsWorkerSrc } from "@/lib/compat";
import { fileKind } from "@/lib/files";
import { decodeHeic, isHeic } from "@/lib/heic";
import { imageSize, tooManyPixels } from "@/lib/image-size";
import { MAX_FILE_BYTES, MAX_PDF_PAGES } from "@/lib/watermark";

export type LastPage = {
  pageCount: number;
  /** Largeur / hauteur de la dernière page, rotation comprise. */
  aspect: number;
};

/** Nombre de pages et format de la dernière (une image : une page). */
export async function lastPageAspect(file: File, password?: string): Promise<LastPage> {
  if (file.size > MAX_FILE_BYTES) throw new Error("file_too_large");
  const kind = fileKind(file);
  if (kind === "pdf") return pdfLastPage(file, password);
  if (kind === "image") return { pageCount: 1, aspect: await imageAspect(file) };
  throw new Error("unsupported");
}

async function pdfLastPage(file: File, password?: string): Promise<LastPage> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc();
  const task = pdfjs.getDocument({ data: await file.arrayBuffer(), password, enableXfa: false, wasmUrl: "/pdfjs/wasm/" });
  try {
    let pdf;
    try {
      pdf = await task.promise;
    } catch (e) {
      if ((e as { name?: string } | null)?.name === "PasswordException") {
        throw new Error(password ? "pdf_password_wrong" : "pdf_password");
      }
      throw new Error("pdf_unreadable");
    }
    if (pdf.numPages === 0) throw new Error("pdf_empty");
    if (pdf.numPages > MAX_PDF_PAGES) throw new Error("pdf_too_many_pages");
    // Viewport à l'échelle 1 : /Rotate appliqué, comme au rendu.
    const view = (await pdf.getPage(pdf.numPages)).getViewport({ scale: 1 });
    return { pageCount: pdf.numPages, aspect: view.width / view.height };
  } finally {
    await task.destroy();
  }
}

async function imageAspect(file: File): Promise<number> {
  if (!isHeic(file)) {
    const head = new Uint8Array(await file.slice(0, 512 * 1024).arrayBuffer());
    if (tooManyPixels(imageSize(head))) throw new Error("image_too_large");
  }
  try {
    // createImageBitmap applique l'orientation EXIF, comme le moteur.
    const bitmap = await createImageBitmap(file);
    const aspect = bitmap.width / bitmap.height;
    bitmap.close();
    return aspect;
  } catch {
    if (!isHeic(file)) throw new Error("image_unreadable");
    const pixels = await decodeHeic(new Uint8Array(await file.arrayBuffer()));
    return pixels.width / pixels.height;
  }
}
