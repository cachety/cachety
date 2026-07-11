import { PDFDocument } from "pdf-lib";

export type WatermarkResult = {
  blob: Blob;
  url: string;
  extension: "pdf" | "png";
  previews: string[];
  pageCount: number;
};

export function releaseResult(result: WatermarkResult) {
  URL.revokeObjectURL(result.url);
  result.previews.forEach(URL.revokeObjectURL);
}

export type ProgressFn = (done: number, total: number) => void;

const RENDER_SCALE = 2;
const JPEG_QUALITY = 0.85;
const PREVIEW_MAX_PAGES = 12;
const WATERMARK_OPACITY = 0.45;
const MIN_IMAGE_SIDE = 800;
export const MAX_CANVAS_AREA = 16_777_216;
export const MAX_CANVAS_SIDE = 8192;

export function fitScale(width: number, height: number, scale: number) {
  const byArea = Math.sqrt(MAX_CANVAS_AREA / (width * height * scale * scale));
  const bySide = MAX_CANVAS_SIDE / (Math.max(width, height) * scale);
  return scale * Math.min(1, byArea, bySide);
}

export async function watermarkFile(
  file: File,
  text: string,
  onProgress?: ProgressFn
): Promise<WatermarkResult> {
  if (file.type === "application/pdf") return watermarkPdf(file, text, onProgress);
  if (file.type.startsWith("image/")) return watermarkImage(file, text);
  throw new Error("unsupported");
}

async function watermarkPdf(
  file: File,
  text: string,
  onProgress?: ProgressFn
): Promise<WatermarkResult> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

  const loadingTask = pdfjs.getDocument({
    data: await file.arrayBuffer(),
    standardFontDataUrl: "/pdfjs/standard_fonts/",
    cMapUrl: "/pdfjs/cmaps/",
    wasmUrl: "/pdfjs/wasm/",
    iccUrl: "/pdfjs/iccs/",
  });

  let pdf;
  try {
    pdf = await loadingTask.promise;
  } catch {
    await loadingTask.destroy();
    throw new Error("pdf_unreadable");
  }

  const pageCount = pdf.numPages;
  if (pageCount === 0) {
    await loadingTask.destroy();
    throw new Error("pdf_empty");
  }

  const out = await PDFDocument.create();
  const previews: string[] = [];

  try {
    for (let i = 1; i <= pageCount; i++) {
      const page = await pdf.getPage(i);
      const base = page.getViewport({ scale: 1 });
      const scale = fitScale(base.width, base.height, RENDER_SCALE);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas_unavailable");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvas, viewport }).promise;

      drawWatermark(ctx, canvas.width, canvas.height, text);

      const pageBlob = await canvasToBlob(canvas, "image/jpeg", JPEG_QUALITY);
      const jpeg = await out.embedJpg(await pageBlob.arrayBuffer());
      const outPage = out.addPage([base.width, base.height]);
      outPage.drawImage(jpeg, {
        x: 0,
        y: 0,
        width: outPage.getWidth(),
        height: outPage.getHeight(),
      });

      if (previews.length < PREVIEW_MAX_PAGES) {
        previews.push(URL.createObjectURL(pageBlob));
      }
      canvas.width = 0;
      onProgress?.(i, pageCount);
    }

    const bytes = await out.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    return { blob, url: URL.createObjectURL(blob), extension: "pdf", previews, pageCount };
  } catch (e) {
    previews.forEach(URL.revokeObjectURL);
    throw e;
  } finally {
    await loadingTask.destroy();
  }
}

async function watermarkImage(file: File, text: string): Promise<WatermarkResult> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("image_unreadable");
  }

  const upscale = Math.max(1, MIN_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height));
  const scale = fitScale(bitmap.width, bitmap.height, upscale);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(bitmap.width * scale));
  canvas.height = Math.max(1, Math.floor(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("canvas_unavailable");
  }

  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  drawWatermark(ctx, canvas.width, canvas.height, text);

  const blob = await canvasToBlob(canvas, "image/png");
  return {
    blob,
    url: URL.createObjectURL(blob),
    extension: "png",
    previews: [URL.createObjectURL(blob)],
    pageCount: 1,
  };
}

function drawWatermark(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  text: string
) {
  const line = text.trim();
  if (!line) return;

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const font = (px: number) => `600 ${px}px ui-monospace, monospace`;
  let fontSize = Math.max(12, Math.round(Math.min(width, height) / 14));
  ctx.font = font(fontSize);

  const measured = ctx.measureText(line).width;
  const maxWidth = watermarkMaxLineWidth(width, height, fontSize);
  if (measured > maxWidth) {
    fontSize = Math.max(6, Math.floor((fontSize * maxWidth) / measured));
    ctx.font = font(fontSize);
  }

  ctx.fillStyle = `rgba(196, 38, 46, ${WATERMARK_OPACITY})`;

  const cx = width / 2;
  const cy = height / 2;
  ctx.translate(cx, cy);
  ctx.rotate(-Math.PI / 4);
  ctx.translate(-cx, -cy);

  const stepX = ctx.measureText(line).width + fontSize * 2.5;
  const stepY = fontSize * 3.5;
  const radius = Math.hypot(width, height) / 2;
  const nx = Math.ceil((radius + stepX) / stepX);
  const ny = Math.ceil((radius + stepY) / stepY);
  for (let i = -nx; i <= nx; i++) {
    for (let j = -ny; j <= ny; j++) {
      ctx.fillText(line, cx + i * stepX, cy + j * stepY);
    }
  }

  ctx.restore();
}

export function watermarkMaxLineWidth(width: number, height: number, lineHeight: number) {
  return Math.SQRT2 * Math.min(width, height) * 0.9 - lineHeight;
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("export_failed"))),
      type,
      quality
    );
  });
}
