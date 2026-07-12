import { zipSync } from "fflate";

export const ACCEPT =
  "application/pdf,image/png,image/jpeg,image/webp,image/gif,image/bmp,image/avif";
const SUPPORTED = new Set(ACCEPT.split(","));

export const isSupported = (type: string) => SUPPORTED.has(type);

const INVISIBLE = /[\u200B-\u200F\u202A-\u202E\u2060\uFEFF]/g;
export const hasVisibleText = (s: string) => s.replace(INVISIBLE, "").trim().length > 0;

export function outputName(fileName: string, extension: string, suffix: string) {
  const base = fileName.replace(/\.[^.]+$/, "");
  return `${base}-${suffix}.${extension}`;
}

export function uniqueName(name: string, used: Set<string>) {
  if (!used.has(name)) return used.add(name), name;
  const dot = name.lastIndexOf(".");
  const base = dot < 0 ? name : name.slice(0, dot);
  const ext = dot < 0 ? "" : name.slice(dot);
  let i = 2;
  while (used.has(`${base}-${i}${ext}`)) i++;
  const n = `${base}-${i}${ext}`;
  return used.add(n), n;
}

// Ne garde que le dernier segment du chemin : un nom hostile comme
// « ../evil.pdf » ne peut pas s'échapper du dossier à l'extraction
// (Zip-Slip). File.name est déjà un basename ; c'est une défense en
// profondeur au cas où un nom serait forgé en amont.
const basename = (name: string) => name.split(/[/\\]/).pop() || "document";

export function zipDocuments(files: { name: string; bytes: Uint8Array }[]): Uint8Array {
  const used = new Set<string>();
  const entries: Record<string, [Uint8Array, { level: 0 }]> = {};
  for (const f of files) entries[uniqueName(basename(f.name), used)] = [f.bytes, { level: 0 }];
  return zipSync(entries);
}
