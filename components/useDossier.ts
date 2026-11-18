"use client";

// Mode « dossier » : tout ce que CoreProduct n'a pas besoin de savoir. La
// liste des pages (ordre, rotations, retraits, sections), le fichier à
// produire (un PDF, un par section, un par document), la taille cible et son
// estimation, et la fabrication du fichier. CoreProduct garde les documents,
// la file de rendu, l'aperçu et le téléchargement, communs aux trois modes.
//
// Inactif (`enabled` faux) dans les modes filigrane et signer : aucun effet,
// aucun état utile.

import { useCallback, useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { FLOOR, LOWEST } from "@/lib/assemble";
import { attemptKey, docStamp, renderedRotation, type Doc } from "@/lib/doc";
import {
  buildDossier,
  estimateFiles,
  OUTPUT_KINDS,
  planFiles,
  worstFit,
  type BuiltFile,
  type OutputKind,
} from "@/lib/dossier-build";
import { fileKind } from "@/lib/files";
import type { Strings } from "@/lib/i18n";
import { clearPageMasks } from "@/lib/masks";
import {
  addSection,
  dropPage,
  editsFor,
  editsKey,
  EMPTY_DOSSIER,
  MAX_DOSSIER_PAGES,
  movePage,
  movePageToSection,
  presetSections,
  removePage,
  removeSection,
  renameSection,
  resetOrder,
  restoreDoc,
  rotatePage,
  safeFileName,
  sectionOf,
  stepPage,
  syncPages,
  updatePage,
  type CleanOptions,
  type DossierState,
  type PageRef,
  type Quad,
} from "@/lib/pages";
import { readPrefill } from "@/lib/partners";
import { DOSSIER_MIN_SCALE, mbToBytes, SIZE_TARGETS_MB } from "@/lib/size-budget";
import { readPref, writePref } from "@/lib/storage";
import { releaseResult, type RenderOptions, type WatermarkResult } from "@/lib/watermark";

/** Durée du bandeau « Page retirée. Annuler » (docs/prd-dossier.md §5, étape 2). */
export const UNDO_MS = 8000;
/** Taille libre (« Autre… ») : de 0,5 à 50 Mo, par pas de 0,5. */
export const CUSTOM_SIZE = { min: 0.5, max: 50, step: 0.5 };

/** Taille cible valide : 0 (aucune limite) ou un multiple de 0,5 entre 0,5 et 50 Mo. */
export function cleanSizeMb(value: unknown): number {
  const n = typeof value === "number" ? value : Number.parseFloat(String(value).replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) return 0;
  const stepped = Math.round(n / CUSTOM_SIZE.step) * CUSTOM_SIZE.step;
  return Math.min(CUSTOM_SIZE.max, Math.max(CUSTOM_SIZE.min, stepped));
}

/** Une page de la grille, avec ce qu'il faut pour la dessiner. */
export type GridPage = {
  ref: PageRef;
  /** Nom du fichier d'origine. */
  name: string;
  /** Vignette du rendu actuel de la page, s'il existe. */
  thumb?: string;
  /** Quarts de tour que la vignette n'a pas encore (nouveau rendu en cours). */
  turn: number;
  /** Rendu en cours ou document pas encore prêt. */
  busy: boolean;
  /** Document en échec ou encore verrouillé : la page ne sera pas dans le fichier. */
  blocked: boolean;
  /** Fichier image : redressement, recadrage et nettoyage proposés. */
  photo: boolean;
};

type Undo = { id: number; label: string; run: (current: DossierState) => DossierState };

export function useDossier({
  enabled,
  embed,
  docs,
  setDocs,
  t,
  stampRef,
  isReady,
}: {
  enabled: boolean;
  /** Page intégrée : taille et sections pré-remplies par le partenaire (fragment de l'URL). */
  embed: boolean;
  docs: Doc[];
  setDocs: Dispatch<SetStateAction<Doc[]>>;
  t: Strings;
  /** Réglage commun courant (texte du filigrane, apparence), pour marquer un document écarté. */
  stampRef: { current: string };
  /** Rendu à jour avec le réglage courant. */
  isReady: (d: Doc) => boolean;
}) {
  const td = t.dossier;
  const [state, setState] = useState<DossierState>(EMPTY_DOSSIER);
  const [output, setOutputState] = useState<OutputKind>("one");
  const [sizeMb, setSizeState] = useState(0);
  const [allowLow, setAllowLow] = useState(false);
  /** Nom saisi ; null : le nom par défaut de la langue affichée. */
  const [customName, setCustomName] = useState<string | null>(null);
  const [undo, setUndo] = useState<Undo | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [notice, setNotice] = useState("");
  /** Page (document et index) dont la photo est en cours de redressement. */
  const [fixing, setFixing] = useState<{ doc: string; page: number } | null>(null);
  /** Noms de sections fournis par le partenaire, à la place de la liste de la langue. */
  const [presetNames, setPresetNames] = useState<string[] | null>(null);
  const undoSeq = useRef(0);

  // Préférences d'affichage (jamais de contenu) et pré-remplissage du partenaire.
  useEffect(() => {
    if (!enabled) return;
    const saved = readPref("dossierOutput");
    if (saved && (OUTPUT_KINDS as readonly string[]).includes(saved)) setOutputState(saved as OutputKind);
    setSizeState(cleanSizeMb(readPref("dossierSizeMb")));
    const prefill = readPrefill(window.location.hash);
    if (prefill.size) setSizeState(prefill.size);
    if (prefill.sections?.length) {
      setPresetNames(prefill.sections);
      setState((prev) => (prev.sections.length ? prev : presetSections(prev, prefill.sections!)));
      setOutputState("sections");
    }
    // Une fois, au chargement.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, embed]);

  const setSize = useCallback((mb: number) => {
    const clean = cleanSizeMb(mb);
    setSizeState(clean);
    writePref("dossierSizeMb", String(clean));
  }, []);

  // Suit la liste des documents : pages des nouveaux, départ des retirés.
  const pagesKey = docs.map((d) => `${d.id}:${d.result?.pageCount ?? 0}`).join("|");
  const overCounts = useRef(new Map<string, number>());
  useEffect(() => {
    if (!enabled) return;
    const list = docs.map((d) => ({ id: d.id, pageCount: d.result?.pageCount ?? 0 }));
    const { over, ...next } = syncPages(state, list);
    if (next.pages !== state.pages || next.sections !== state.sections || next.known !== state.known) setState(next);
    // Au-delà de 1 000 pages : le document est écarté, avec sa raison, et son rendu libéré.
    if (over.length) {
      for (const id of over) overCounts.current.set(id, list.find((d) => d.id === id)?.pageCount ?? 0);
      setDocs((prev) =>
        prev.map((d) =>
          over.includes(d.id)
            ? {
                ...d,
                status: "error" as const,
                error: "dossier_too_many_pages" as const,
                result: undefined,
                stampedWith: undefined,
                progress: undefined,
                failedWith: attemptKey(d, docStamp(d, stampRef.current)),
              }
            : d
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, pagesKey]);

  // De la place s'est libérée : un document écarté retente sa chance.
  const total = state.pages.length;
  useEffect(() => {
    if (!enabled || !overCounts.current.size) return;
    const alive = new Set(docs.map((d) => d.id));
    for (const id of [...overCounts.current.keys()]) if (!alive.has(id)) overCounts.current.delete(id);
    const retry = docs.find(
      (d) => d.error === "dossier_too_many_pages" && total + (overCounts.current.get(d.id) ?? Infinity) <= MAX_DOSSIER_PAGES
    );
    if (!retry) return;
    overCounts.current.delete(retry.id);
    setDocs((prev) =>
      prev.map((d) =>
        d.id === retry.id
          ? { ...d, status: "pending" as const, error: undefined, failedWith: undefined, tries: (d.tries ?? 0) + 1 }
          : d
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, total, docs.length]);

  // Retouches de chaque document (rotation, recadrage, nettoyage) : elles
  // entrent dans son réglage (docStamp), la file ne rend à nouveau que lui.
  const editsSignature = useMemo(() => docs.map((d) => editsKey(editsFor(state, d.id))).join("\u0001"), [docs, state]);
  useEffect(() => {
    if (!enabled) return;
    setDocs((prev) => {
      let changed = false;
      const next = prev.map((d) => {
        const edits = editsFor(state, d.id);
        if (editsKey(edits) === editsKey(d.edits)) return d;
        changed = true;
        return { ...d, edits: Object.keys(edits).length ? edits : undefined };
      });
      return changed ? next : prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, editsSignature]);

  // Bandeau « Annuler » : huit secondes, puis il disparaît.
  useEffect(() => {
    if (!undo) return;
    const timer = setTimeout(() => setUndo((u) => (u?.id === undo.id ? null : u)), UNDO_MS);
    return () => clearTimeout(timer);
  }, [undo]);

  const byId = useMemo(() => new Map(docs.map((d) => [d.id, d])), [docs]);
  const pageNumber = (index: number) => index + 1;

  /** Les masques sont tracés sur la page telle qu'elle s'affiche : après une rotation ou un recadrage, ils ne valent plus. */
  const dropMasks = useCallback(
    (ref: { doc: string; page: number }) => {
      const doc = byId.get(ref.doc);
      if (!doc?.masks?.[ref.page]?.length) return;
      setDocs((prev) => prev.map((d) => (d.id === ref.doc ? { ...d, masks: clearPageMasks(d.masks, ref.page) } : d)));
      setNotice(td.grid.rotateClearsMasks);
    },
    [byId, setDocs, td]
  );

  const move = useCallback(
    (from: number, to: number) => {
      setState((prev) => {
        const next = movePage(prev, from, to);
        if (next !== prev) setAnnouncement(td.grid.moved(Math.min(prev.pages.length, Math.max(1, to + 1)), prev.pages.length));
        return next;
      });
    },
    [td]
  );
  const drop = useCallback(
    (from: number, slot: number, section?: string) => {
      setState((prev) => {
        const page = prev.pages[from];
        const next = dropPage(prev, from, slot, section);
        if (next !== prev && page) setAnnouncement(td.grid.moved(next.pages.indexOf(page) + 1, next.pages.length));
        return next;
      });
    },
    [td]
  );
  /** Un pas au clavier ; rend le nouvel index de la page (pour garder le focus dessus). */
  const step = useCallback(
    (index: number, dir: -1 | 1) => {
      const result = stepPage(state, index, dir);
      if (result.state !== state) {
        setState(result.state);
        setAnnouncement(td.grid.moved(result.index + 1, result.state.pages.length));
      }
      return result.index;
    },
    [state, td]
  );
  const rotate = useCallback(
    (index: number) => {
      const page = state.pages[index];
      if (!page) return;
      setState((prev) => rotatePage(prev, prev.pages.indexOf(page)));
      setAnnouncement(td.grid.rotated(pageNumber(index)));
      dropMasks(page);
    },
    [state, td, dropMasks]
  );
  const remove = useCallback(
    (index: number) => {
      if (!state.pages[index]) return;
      const removed = removePage(state, index);
      setState(removed.state);
      const label = td.grid.removed(pageNumber(index));
      setAnnouncement(label);
      setUndo({ id: ++undoSeq.current, label, run: removed.undo });
    },
    [state, td]
  );
  const undoLast = useCallback(() => {
    if (!undo) return;
    setState((prev) => undo.run(prev));
    setAnnouncement(td.grid.undo);
    setUndo(null);
  }, [undo, td]);
  const reset = useCallback(() => {
    setState((prev) => resetOrder(prev, docs.map((d) => ({ id: d.id, pageCount: d.result?.pageCount ?? 0 }))));
    setAnnouncement(td.grid.reset);
  }, [docs, td]);
  const restore = useCallback(
    (id: string) => {
      const doc = byId.get(id);
      const pageCount = doc?.result?.pageCount ?? state.known?.[id] ?? 0;
      setState((prev) => restoreDoc(prev, { id, pageCount }));
    },
    [byId, state.known]
  );

  // Sections. Le nom proposé est le premier de la liste qui ne sert pas encore.
  const names = presetNames ?? td.sections.presets;
  const nextName = (taken: string[]) => names.find((n) => !taken.includes(n)) ?? "";
  const split = state.sections.length > 0;
  const setSplit = useCallback(
    (on: boolean) => {
      setState((prev) => {
        if (on === prev.sections.length > 0) return prev;
        return on ? addSection(prev, 0, names[0] ?? "") : { ...prev, sections: [] };
      });
      setOutputState((prev) => {
        const next = on ? "sections" : prev === "sections" ? "one" : prev;
        writePref("dossierOutput", next);
        return next;
      });
    },
    [names]
  );
  const setOutput = useCallback(
    (kind: OutputKind) => {
      setOutputState(kind);
      writePref("dossierOutput", kind);
      // « Un PDF par section » sans section : la première se crée, avec toutes les pages.
      if (kind === "sections") setState((prev) => (prev.sections.length ? prev : addSection(prev, 0, names[0] ?? "")));
    },
    [names]
  );
  const startSection = useCallback(
    (index: number) => {
      setState((prev) => {
        const taken = prev.sections.map((s) => s.name);
        const first = prev.sections.length ? "" : nextName(taken);
        return addSection(prev, index, nextName(first ? [...taken, first] : taken), first);
      });
      setOutputState("sections");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [names]
  );
  const rename = useCallback((id: string, name: string) => setState((prev) => renameSection(prev, id, name)), []);
  const dropSection = useCallback((id: string) => {
    setState((prev) => {
      const next = removeSection(prev, id);
      if (!next.sections.length) setOutputState((kind) => (kind === "sections" ? "one" : kind));
      return next;
    });
  }, []);
  const toSection = useCallback(
    (index: number, id: string) => {
      const result = movePageToSection(state, index, id);
      if (result.state !== state) {
        setState(result.state);
        setAnnouncement(td.grid.moved(result.index + 1, result.state.pages.length));
      }
      return result.index;
    },
    [state, td]
  );

  // Photos : redressement, recadrage, nettoyage.
  const indexOf = (ref: { doc: string; page: number }) => state.pages.findIndex((p) => p.doc === ref.doc && p.page === ref.page);
  const setPhoto = useCallback(
    (ref: { doc: string; page: number }, changes: { crop?: Quad | null; clean?: CleanOptions }) => {
      const index = indexOf(ref);
      const page = state.pages[index];
      if (!page) return;
      const cropChanged = "crop" in changes && JSON.stringify(changes.crop ?? null) !== JSON.stringify(page.crop ?? null);
      setState((prev) =>
        updatePage(prev, prev.pages.indexOf(page), {
          ...("crop" in changes ? { crop: changes.crop ?? undefined } : {}),
          ...(changes.clean ? { clean: changes.clean } : {}),
        })
      );
      if (cropChanged) dropMasks(page);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, dropMasks]
  );
  const isPhoto = useCallback((id: string) => {
    const doc = byId.get(id);
    return !!doc && fileKind(doc.file) === "image";
  }, [byId]);
  const cleanAllPhotos = useCallback(
    (clean: CleanOptions) => {
      setState((prev) => {
        let next = prev;
        prev.pages.forEach((p, i) => {
          if (isPhoto(p.doc)) next = updatePage(next, i, { clean });
        });
        return next;
      });
    },
    [isPhoto]
  );

  // Ce que la grille dessine.
  const grid: GridPage[] = useMemo(
    () =>
      state.pages.map((ref) => {
        const doc = byId.get(ref.doc);
        const thumb = doc?.result?.thumbs?.[ref.page];
        const shown = doc ? renderedRotation(doc, ref.page) : 0;
        return {
          ref,
          name: doc?.file.name ?? "",
          thumb,
          turn: thumb ? (((ref.rotate - shown) % 360) + 360) % 360 : 0,
          busy: !doc || (!doc.error && !isReady(doc)),
          blocked: !!doc?.error,
          photo: !!doc && fileKind(doc.file) === "image",
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.pages, byId]
  );

  // Fichiers à produire, et leur estimation.
  const ready = useMemo(() => docs.filter(isReady), [docs, isReady]);
  const fileName = customName ?? td.defaultName;
  const kind: OutputKind = output === "sections" && !split ? "one" : output;
  const files = useMemo(
    () =>
      planFiles(state, {
        kind,
        fileName,
        defaultName: td.defaultName,
        docs: ready.map((d) => ({ id: d.id, name: d.file.name })),
        unnamed: td.sections.unnamed,
      }),
    [state, kind, fileName, ready, td]
  );
  const results = useMemo(() => new Map(ready.map((d) => [d.id, d.result!] as const)), [ready]);
  const maxBytes = sizeMb ? mbToBytes(sizeMb) : 0;
  const estimates = useMemo(
    () => estimateFiles(files, results, maxBytes, allowLow ? LOWEST : FLOOR),
    [files, results, maxBytes, allowLow]
  );
  const keptPages = files.reduce((n, f) => n + f.pages.length, 0);
  // Un document ni prêt ni en échec (retouche juste demandée, rendu pas encore lancé) : le
  // téléchargement attend, sinon le fichier partirait sans ses pages, sans le dire.
  const waiting = docs.some((d) => !d.error && !isReady(d));
  // Poids des originaux dont au moins une page est gardée : pour dire quand le fichier grossit.
  const inputBytes = useMemo(() => {
    const used = new Set(files.flatMap((f) => f.pages.map((p) => p.doc)));
    return ready.filter((d) => used.has(d.id)).reduce((n, d) => n + d.file.size, 0);
  }, [files, ready]);

  /** Options du moteur pour un document du dossier (premier rendu : sans limite de taille). */
  const renderOptions = useCallback(
    (doc: Doc): RenderOptions => ({
      masks: doc.masks,
      edits: doc.edits,
      forcePdf: true,
      photoPage: true,
      // Vignettes : 160 px CSS, à la densité de l'écran, 320 px au plus.
      thumbnails: Math.round(160 * Math.min(2, typeof window === "undefined" ? 1 : window.devicePixelRatio || 1)),
    }),
    []
  );

  /**
   * Fabrique les fichiers. `rerender` : second rendu d'un document sous un
   * budget par page (CoreProduct y met le texte du filigrane et l'apparence).
   */
  const build = useCallback(
    (
      rerender: (doc: Doc, options: RenderOptions) => Promise<WatermarkResult>,
      onProgress?: (done: number, total: number) => void
    ): Promise<BuiltFile[]> =>
      buildDossier({
        files,
        results,
        maxBytes: maxBytes || undefined,
        rerender: (id, pageBudgets) => {
          const doc = byId.get(id);
          if (!doc) throw new Error("assemble_missing_part");
          return rerender(doc, {
            ...renderOptions(doc),
            thumbnails: undefined,
            previewPages: () => [],
            pageBudgets,
            minScale: allowLow ? undefined : DOSSIER_MIN_SCALE,
          });
        },
        release: releaseResult,
        onProgress,
      }),
    [files, results, maxBytes, byId, renderOptions, allowLow]
  );

  /** Documents dont plus aucune page n'est gardée (« Aucune page gardée », « Remettre ses pages »). */
  const emptied = useMemo(() => {
    const kept = new Set(state.pages.map((p) => p.doc));
    return new Set(Object.keys(state.known ?? {}).filter((id) => !kept.has(id)));
  }, [state.pages, state.known]);

  // Photo en cours de redressement : la page (pour ses réglages actuels) et le fichier à afficher.
  const fixingRef = fixing ? state.pages.find((p) => p.doc === fixing.doc && p.page === fixing.page) : undefined;
  const fixingFile = fixing ? byId.get(fixing.doc)?.file : undefined;
  const fixingTarget = fixingRef && fixingFile ? { ref: fixingRef, file: fixingFile } : null;

  // Tout ce qui change le fichier produit sans passer par le rendu : ordre et
  // choix des pages, noms, taille cible. Relu à la fin d'un assemblage long.
  const planKey = `${JSON.stringify(files)}\u0001${sizeMb}\u0001${allowLow ? 1 : 0}`;

  const startOver = useCallback(() => {
    setState(EMPTY_DOSSIER);
    setCustomName(null);
    setUndo(null);
    setNotice("");
    setAnnouncement("");
    setFixing(null);
    setAllowLow(false);
    overCounts.current.clear();
  }, []);

  return {
    state,
    grid,
    total,
    emptied,
    announcement,
    notice,
    clearNotice: () => setNotice(""),
    undo,
    undoLast,
    move,
    drop,
    step,
    rotate,
    remove,
    reset,
    restore,
    custom: !!state.custom,
    // Sections
    split,
    setSplit,
    startSection,
    rename,
    dropSection,
    toSection,
    sectionOf: (index: number) => sectionOf(state, index),
    sectionNames: names,
    // Photos
    fixing,
    fixingTarget,
    setFixing,
    setPhoto,
    cleanAllPhotos,
    hasPhotos: grid.some((p) => p.photo),
    // Sortie
    output: kind,
    setOutput,
    sizeMb,
    setSize,
    allowLow,
    setAllowLow,
    sizeIsPreset: (SIZE_TARGETS_MB as readonly number[]).includes(sizeMb),
    fileName,
    setFileName: (name: string) => setCustomName(name),
    /** Nom du fichier produit (sans extension), sûr pour un téléchargement. */
    safeName: safeFileName(fileName, td.defaultName),
    files,
    estimates,
    fit: worstFit(estimates),
    keptPages,
    waiting,
    inputBytes,
    perFile: files.length > 1 || kind !== "one",
    renderOptions,
    build,
    planKey,
    startOver,
  };
}

export type Dossier = ReturnType<typeof useDossier>;
