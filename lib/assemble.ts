// Mode « dossier » : assemblage du fichier final à partir de pages DÉJÀ
// reconstruites par le moteur, et budget de taille par page.
//
// RÈGLE DE SÉCURITÉ (docs/security.md, docs/prd-dossier.md §6.4) : c'est le
// seul endroit du projet où une structure PDF est recopiée (copyPages) au
// lieu d'être dessinée. Ce n'est sûr que parce que chaque partie est une
// sortie de Cachety : une image par page, rien d'autre. assemblePdf ne
// reçoit donc que des résultats du moteur (WatermarkResult), jamais un
// fichier d'origine, et vérifie en plus que chaque page recopiée a bien cette
// forme : un PDF d'origine (texte, annotations, pièces jointes, scripts)
// est refusé au lieu d'être recopié.

import { PDFArray, PDFDict, PDFDocument, PDFName, PDFRawStream, PDFRef } from "pdf-lib";
import { newPdf } from "@/lib/files";
import { pageBudget, pdfOverhead } from "@/lib/size-budget";
import type { WatermarkResult } from "@/lib/watermark";

/**
 * Poids d'une page au plancher de lisibilité (DOSSIER_MIN_SCALE, qualité la
 * plus basse) rapporté à son poids au premier rendu (échelle 1, qualité
 * 0,85). Mesuré sur le corpus d'essai (bulletins de paie, pages photo,
 * dossier mixte, photo de téléphone) par e2e/dossier.seam.e2e.ts, qui échoue
 * si la mesure s'écarte de plus de 15 % de cette constante : elle ne peut pas
 * dériver en silence. Mesure du 2026-11-18 : 0,1223 (texte seul 0,240, photos
 * seules 0,063).
 */
export const FLOOR_RATIO = 0.122;

/**
 * Poids (octets) d'une page de texte A4 au plancher. Une page de texte se
 * comprime bien moins qu'une photo (voir les mesures ci-dessus) : avec le
 * seul rapport, un dossier de texte serait annoncé tenable à tort. Aucune
 * page n'est donc estimée sous ce poids (ou sous son propre poids, s'il est
 * plus faible). Même mesure, même garde-fou. Mesure du 2026-11-18 : 38 498 octets
 * (160 536 au premier rendu) ; une page photo du corpus : 18 260 (291 561).
 */
export const FLOOR_PAGE_BYTES = 38_500;

/** Mêmes mesures au dernier barreau de l'échelle (0,4), pour « Accepter une qualité plus faible ». */
export const LOWEST_RATIO = 0.069;
export const LOWEST_PAGE_BYTES = 21_500;

/** Ce que pèse une page à un barreau donné : un rapport, et un poids minimal par page. */
export type FloorModel = { ratio: number; pageBytes: number };
export const FLOOR: FloorModel = { ratio: FLOOR_RATIO, pageBytes: FLOOR_PAGE_BYTES };
export const LOWEST: FloorModel = { ratio: LOWEST_RATIO, pageBytes: LOWEST_PAGE_BYTES };

/**
 * Marge de la prédiction : « tient avec des pages moins nettes » n'est
 * annoncé que si l'estimation au plancher laisse 15 % de marge (la tolérance
 * de la mesure). Dans le doute, l'outil dit que cela ne tient pas.
 */
export const FIT_MARGIN = 1.15;

export type FitState = "fits" | "reduced" | "unreachable";

const sum = (values: readonly number[]) => values.reduce((a, b) => a + b, 0);

/** Taille estimée d'un PDF dont les images de page pèsent `pageBytes`. */
export const estimatePdfSize = (pageBytes: readonly number[]) => (pageBytes.length ? sum(pageBytes) + pdfOverhead(pageBytes.length) : 0);

/**
 * La cible est-elle tenable en restant lisible ? D'après les poids du premier
 * rendu, sans attendre un second : « fits » tel quel, « reduced » en
 * réduisant les pages sans passer sous le plancher, « unreachable » sinon.
 * `floor` : FLOOR par défaut, LOWEST si la qualité plus faible est acceptée.
 */
export function predictFit(pageBytes: readonly number[], target: number, floor: FloorModel = FLOOR): FitState {
  if (!pageBytes.length || !(target > 0)) return "fits";
  if (estimatePdfSize(pageBytes) <= target) return "fits";
  return floorEstimate(pageBytes, floor) * FIT_MARGIN + pdfOverhead(pageBytes.length) <= target ? "reduced" : "unreachable";
}

/**
 * Poids estimé des images de page au plancher : le rapport mesuré sur le
 * corpus, sans jamais descendre sous le poids d'une page de texte (ni compter
 * une page plus lourde qu'elle ne l'est déjà).
 */
export function floorEstimate(pageBytes: readonly number[], floor: FloorModel = FLOOR): number {
  return sum(pageBytes.map((b) => Math.max(b * floor.ratio, Math.min(b, floor.pageBytes))));
}

/**
 * Budget (octets) de l'image de chaque page pour tenir sous `maxBytes`,
 * pondéré par son poids au premier rendu : une page photo reçoit plus qu'une
 * page de texte. Aucune page sous `floor` (par défaut le tiers d'une part
 * égale), pour qu'aucune ne soit sacrifiée ; la somme, structure du PDF
 * comprise, ne dépasse jamais `maxBytes`.
 */
export function weightedBudgets(pageBytes: readonly number[], maxBytes: number, floor?: number): number[] {
  const n = pageBytes.length;
  if (!n) return [];
  const available = Math.max(0, Math.floor(maxBytes - pdfOverhead(n)));
  // Le plancher ne peut pas promettre plus que ce qu'il y a à partager.
  const min = Math.max(0, Math.min(Math.floor(floor ?? pageBudget(maxBytes, n) / 3), Math.floor(available / n)));
  // Chaque page reçoit le plancher (ou son propre poids, s'il est plus léger :
  // elle n'a besoin de rien de plus). Ce qui reste est réparti au prorata de
  // ce que chaque page pèse AU-DESSUS de ce plancher.
  const sizes = pageBytes.map((b) => Math.max(0, Math.floor(b)));
  const floors = sizes.map((b) => Math.min(min, b));
  const wants = sizes.map((b, i) => b - floors[i]);
  const wanted = sum(wants);
  const pool = available - sum(floors);
  // Tout tient déjà : chaque page garde son poids d'origine.
  if (wanted <= pool) return sizes;
  return wants.map((w, i) => floors[i] + Math.floor((pool * w) / wanted));
}

const ALLOWED_CATALOG = new Set(["Type", "Pages"]);
// pdf-lib écrit lui-même, sur chaque page qu'il crée, un tableau /Annots et
// des dictionnaires /Font et /ExtGState : admis seulement s'ils sont VIDES.
const ALLOWED_PAGE = new Set(["Type", "Parent", "Resources", "Contents", "MediaBox", "Annots"]);
const ALLOWED_RESOURCES = new Set(["XObject", "ProcSet", "Font", "ExtGState"]);
const MUST_BE_EMPTY = ["Font", "ExtGState"];

const keysOf = (dict: PDFDict) => dict.keys().map((k) => k.decodeText());

/**
 * Refuse tout PDF qui n'a pas la forme d'une sortie Cachety : un catalogue
 * nu, aucune métadonnée, et des pages qui ne portent qu'une image (pas
 * d'annotation, de police, de formulaire, d'action). Défense en profondeur :
 * le type de assemblePdf interdit déjà de lui passer un fichier d'origine.
 */
function assertRebuilt(doc: PDFDocument) {
  const refuse = (): never => {
    throw new Error("assemble_foreign_page");
  };
  if (keysOf(doc.catalog).some((k) => !ALLOWED_CATALOG.has(k))) refuse();
  const info = doc.context.trailerInfo.Info;
  const infoDict = info ? doc.context.lookup(info) : undefined;
  if (infoDict instanceof PDFDict && infoDict.keys().length) refuse();
  if (doc.context.trailerInfo.Encrypt) refuse();
  for (const page of doc.getPages()) {
    if (keysOf(page.node).some((k) => !ALLOWED_PAGE.has(k))) refuse();
    const annots = page.node.lookup(PDFName.of("Annots"));
    if (annots !== undefined && !(annots instanceof PDFArray && annots.size() === 0)) refuse();
    const resources = page.node.Resources();
    if (!resources || keysOf(resources).some((k) => !ALLOWED_RESOURCES.has(k))) refuse();
    for (const key of MUST_BE_EMPTY) {
      const value = resources!.lookup(PDFName.of(key));
      if (value !== undefined && !(value instanceof PDFDict && value.keys().length === 0)) refuse();
    }
    const xobjects = resources!.lookupMaybe(PDFName.of("XObject"), PDFDict);
    const entries = xobjects?.entries() ?? [];
    // Une image par page, et rien d'autre (ni formulaire XObject, ni PostScript).
    if (entries.length !== 1) refuse();
    for (const [, value] of entries) {
      const stream = value instanceof PDFRef ? doc.context.lookup(value) : value;
      if (!(stream instanceof PDFRawStream)) refuse();
      const subtype = (stream as PDFRawStream).dict.get(PDFName.of("Subtype"));
      if (!(subtype instanceof PDFName) || subtype.decodeText() !== "Image") refuse();
    }
    const procSet = resources!.get(PDFName.of("ProcSet"));
    if (procSet && !(procSet instanceof PDFArray) && !(procSet instanceof PDFRef)) refuse();
  }
}

/**
 * Recopie, dans l'ordre donné, des pages de PDF déjà reconstruits par le
 * moteur. `parts` : résultat du rendu de chaque document (Doc.id → sa sortie),
 * jamais un fichier d'origine. Le fichier produit n'a aucune métadonnée
 * (newPdf). Lève « assemble_missing_part » si une page vise un document
 * absent ou une page qui n'existe pas, « assemble_foreign_page » si une
 * partie n'a pas la forme d'une sortie Cachety.
 */
export async function assemblePdf(
  parts: ReadonlyMap<string, WatermarkResult>,
  order: readonly { doc: string; page: number }[]
): Promise<Uint8Array> {
  const out = await newPdf();
  // Un seul chargement et une seule copie par document, quel que soit l'ordre des pages.
  const wanted = new Map<string, number[]>();
  for (const { doc, page } of order) wanted.set(doc, [...(wanted.get(doc) ?? []), page]);
  const copied = new Map<string, Awaited<ReturnType<PDFDocument["copyPages"]>>>();
  for (const [id, pages] of wanted) {
    const part = parts.get(id);
    if (!part || part.extension !== "pdf") throw new Error("assemble_missing_part");
    const src = await PDFDocument.load(new Uint8Array(await part.blob.arrayBuffer()), { updateMetadata: false });
    assertRebuilt(src);
    const count = src.getPageCount();
    if (pages.some((p) => !Number.isInteger(p) || p < 0 || p >= count)) throw new Error("assemble_missing_part");
    copied.set(id, await out.copyPages(src, pages));
  }
  const next = new Map<string, number>();
  for (const { doc } of order) {
    const i = next.get(doc) ?? 0;
    next.set(doc, i + 1);
    const page = copied.get(doc)![i];
    // Le tableau /Annots vide que pdf-lib pose sur chaque page ne sert à rien : retiré.
    page.node.delete(PDFName.of("Annots"));
    out.addPage(page);
  }
  return out.save();
}
