// Mode « dossier » : du plan (quelles pages dans quel fichier) au fichier
// produit. Ce module ne voit jamais un document d'origine : il ne reçoit que
// les résultats du moteur (pages déjà reconstruites en images) et une
// fonction pour en demander un nouveau rendu sous budget. C'est le seul
// appelant de assemblePdf (vérifié par lib/assemble.test.ts).
//
// Prédiction et fabrication partent des mêmes nombres : le poids de chaque
// page au premier rendu, et son poids MESURÉ au plancher (sonde du premier
// rendu, SIZE_PROBES). Quand l'estimation dit « tient », les budgets donnés
// au second rendu garantissent que le fichier tient.

import {
  assemblePdf,
  estimatePdfSize,
  FLOOR,
  floorWeights,
  LOWEST,
  predictFit,
  weightedBudgets,
  type FitState,
} from "@/lib/assemble";
import { safeFileName, splitBySection, type DossierState } from "@/lib/pages";
import { DOSSIER_MIN_SCALE } from "@/lib/size-budget";
import type { WatermarkResult } from "@/lib/watermark";

/** Un seul PDF, un PDF par section, ou un PDF par document d'origine (dans un ZIP). */
export type OutputKind = "one" | "sections" | "separate";
export const OUTPUT_KINDS: readonly OutputKind[] = ["one", "sections", "separate"];

/**
 * Jusqu'où les pages peuvent être réduites : « floor », le plancher de
 * lisibilité (DOSSIER_MIN_SCALE) ; « lowest », tout en bas de l'échelle,
 * quand la personne accepte une qualité plus faible.
 */
export type FloorKind = "floor" | "lowest";

/**
 * Planchers mesurés par le moteur au premier rendu (RenderOptions.sizeProbes),
 * dans l'ordre de WatermarkResult.probeBytes : le plancher de lisibilité,
 * puis aucun plancher.
 */
export const SIZE_PROBES: readonly number[] = [DOSSIER_MIN_SCALE, 0];
const PROBE_OF: Record<FloorKind, number> = { floor: 0, lowest: 1 };

/** Échelle la plus basse permise au second rendu (RenderOptions.minScale). */
export const minScaleOf = (kind: FloorKind) => (kind === "lowest" ? undefined : DOSSIER_MIN_SCALE);

export type PlannedPage = { doc: string; page: number };
/** Un fichier à produire : son nom (sans extension) et ses pages, dans l'ordre. */
export type PlannedFile = { name: string; pages: PlannedPage[] };

export type PlanOptions = {
  kind: OutputKind;
  /** Nom saisi par l'utilisateur (ou le nom par défaut de la langue). */
  fileName: string;
  /** Nom par défaut, déjà sûr (t.dossier.defaultName). */
  defaultName: string;
  /** Documents dont le rendu est prêt, dans l'ordre de la liste, avec leur nom de fichier d'origine. */
  docs: { id: string; name: string }[];
  /** Nom d'une section sans nom (« Section 2 »). */
  unnamed: (n: number) => string;
};

const baseName = (fileName: string) => fileName.replace(/\.[^.]+$/, "");

/**
 * Fichiers à produire. Seules les pages gardées des documents prêts comptent :
 * un document en erreur ou encore verrouillé ne bloque pas le reste du
 * dossier. Une section vide ne produit pas de fichier. Les noms saisis
 * passent par safeFileName (aucun séparateur de chemin : Zip-Slip).
 */
export function planFiles(state: DossierState, options: PlanOptions): PlannedFile[] {
  const ready = new Set(options.docs.map((d) => d.id));
  const keep = (pages: { doc: string; page: number }[]) =>
    pages.filter((p) => ready.has(p.doc)).map((p) => ({ doc: p.doc, page: p.page }));
  const main = safeFileName(options.fileName, options.defaultName);

  if (options.kind === "sections" && state.sections.length) {
    return splitBySection(state)
      .map((group, i) => ({ name: safeFileName(group.section?.name ?? "", options.unnamed(i + 1)), pages: keep(group.pages) }))
      .filter((file) => file.pages.length);
  }
  if (options.kind === "separate") {
    return options.docs
      .map((doc) => ({
        name: safeFileName(baseName(doc.name), main),
        pages: keep(state.pages.filter((p) => p.doc === doc.id)),
      }))
      .filter((file) => file.pages.length);
  }
  const pages = keep(state.pages);
  return pages.length ? [{ name: main, pages }] : [];
}

/**
 * Pour un fichier : le poids de chaque page au premier rendu, et son poids au
 * plancher choisi. Ce dernier est la mesure du premier rendu ; une page sans
 * mesure (ce qui n'arrive pas en mode dossier) est estimée par le modèle,
 * avec sa marge plus large (floorWeights).
 */
export function pageWeights(file: PlannedFile, results: ReadonlyMap<string, WatermarkResult>, kind: FloorKind = "floor") {
  const natural = file.pages.map((p) => results.get(p.doc)?.pageBytes?.[p.page] ?? 0);
  const measured = file.pages.map((p) => results.get(p.doc)?.probeBytes?.[PROBE_OF[kind]]?.[p.page]);
  return { natural, floors: floorWeights(natural, measured, kind === "lowest" ? LOWEST : FLOOR) };
}

export type FileEstimate = { name: string; pages: number; bytes: number; fit: FitState };

/**
 * Taille estimée de chaque fichier, et si la cible (par fichier) est tenable,
 * d'après le premier rendu : poids des pages, et leur poids mesuré au plancher.
 */
export function estimateFiles(
  files: PlannedFile[],
  results: ReadonlyMap<string, WatermarkResult>,
  targetBytes: number,
  kind: FloorKind = "floor"
): FileEstimate[] {
  return files.map((file) => {
    const { natural, floors } = pageWeights(file, results, kind);
    return {
      name: file.name,
      pages: file.pages.length,
      bytes: estimatePdfSize(natural),
      fit: targetBytes > 0 ? predictFit(natural, targetBytes, floors) : "fits",
    };
  });
}

/** L'état le plus défavorable : c'est celui qu'on annonce pour l'ensemble. */
export function worstFit(estimates: FileEstimate[]): FitState {
  if (estimates.some((e) => e.fit === "unreachable")) return "unreachable";
  return estimates.some((e) => e.fit === "reduced") ? "reduced" : "fits";
}

export type BuiltFile = { name: string; bytes: Uint8Array; over: boolean };

export type BuildOptions = {
  files: PlannedFile[];
  /** Premier rendu de chaque document (Doc.id → résultat du moteur). */
  results: ReadonlyMap<string, WatermarkResult>;
  /** Taille maximale de CHAQUE fichier, en octets ; absente : aucune limite. */
  maxBytes?: number;
  /** Jusqu'où réduire : le même choix que pour l'estimation (estimateFiles). */
  floor?: FloorKind;
  /**
   * Nouveau rendu d'un document avec un budget par page (0 : page sans
   * limite). Le résultat est libéré par l'appelant (`release`) après assemblage.
   */
  rerender: (doc: string, pageBudgets: number[]) => Promise<WatermarkResult>;
  release: (result: WatermarkResult) => void;
  onProgress?: (done: number, total: number) => void;
};

/**
 * Produit les fichiers. Sans cible, ou si un fichier tient déjà : assemblage
 * direct des pages du premier rendu. Sinon, second rendu des documents
 * concernés, chaque page avec un budget qui couvre son poids mesuré au
 * plancher, le reste étant réparti selon son poids au premier rendu (une
 * photo reçoit plus qu'une page de texte), puis assemblage.
 * `over` : la cible n'a pas pu être tenue au plancher.
 */
export async function buildDossier({ files, results, maxBytes, floor = "floor", rerender, release, onProgress }: BuildOptions): Promise<BuiltFile[]> {
  // Budget de chaque page des fichiers trop lourds, par document.
  const budgets = new Map<string, number[]>();
  if (maxBytes) {
    for (const file of files) {
      const { natural, floors } = pageWeights(file, results, floor);
      if (estimatePdfSize(natural) <= maxBytes) continue;
      const shares = weightedBudgets(natural, maxBytes, floors);
      file.pages.forEach((p, i) => {
        const list = budgets.get(p.doc) ?? new Array<number>(results.get(p.doc)?.pageCount ?? 0).fill(0);
        // Au moins 1 : un budget nul voudrait dire « sans limite ».
        list[p.page] = Math.max(1, shares[i]);
        budgets.set(p.doc, list);
      });
    }
  }

  const second = new Map<string, WatermarkResult>();
  const total = budgets.size + files.length;
  let done = 0;
  try {
    for (const [doc, pageBudgets] of budgets) {
      second.set(doc, await rerender(doc, pageBudgets));
      onProgress?.(++done, total);
    }
    const parts = new Map<string, WatermarkResult>([...results, ...second]);
    const built: BuiltFile[] = [];
    for (const file of files) {
      const bytes = await assemblePdf(parts, file.pages);
      built.push({ name: file.name, bytes, over: !!maxBytes && bytes.length > maxBytes });
      onProgress?.(++done, total);
    }
    return built;
  } finally {
    second.forEach(release);
  }
}
