"use client";

import HelpTour from "@/components/HelpTour";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ACCEPT, hasVisibleText, isSupported, zipDocuments } from "@/lib/files";
import { isBrowserSupported } from "@/lib/compat";
import { releaseResult, watermarkFile, type WatermarkResult } from "@/lib/watermark";
import {
  DEFAULT_WATERMARK_STYLE,
  normalizeStyle,
  readStyle,
  serializeStyle,
  stampKey,
  styleStorageKey,
  type WatermarkStyle,
} from "@/lib/watermark-style";
import { WatermarkAppearance } from "@/components/WatermarkAppearance";
import { FilePassword } from "@/components/FilePassword";
import { CopyOptions } from "@/components/CopyOptions";
import { combineAsPdf, encryptPdf, protectFile } from "@/lib/file-password";
import { exampleStamp, useT, type ErrorKey } from "@/lib/i18n";
import {
  attemptKey,
  docId,
  docStamp,
  isFresh,
  moveTo,
  needsAttention,
  needsPassword,
  outName,
  slotToIndex,
  type Doc,
  type Filter,
} from "@/lib/doc";
import { DownloadIcon, LockIcon, UploadIcon } from "@/components/icons";
import { readPref, writePref } from "@/lib/storage";
import { masksKey, type PageMasks } from "@/lib/masks";
import { mbToBytes, shareOfBudget, SIZE_TARGETS_MB, type SizeTargetMb } from "@/lib/size-budget";
import { composeStamp, makeRef, MAX_RECIPIENTS, parseRecipients, recipientSlug } from "@/lib/stamp-text";
import { SHARE_PARAM, takeSharedFiles } from "@/lib/share-inbox";
import { SpecimenCard, WatermarkLayer } from "@/components/SpecimenCard";
import { BatchSummary } from "@/components/BatchSummary";
import { DocRow } from "@/components/DocList";
import { useDragReorder } from "@/components/useDragReorder";
import { Kiosk } from "@/components/Kiosk";

// Sur téléphone, seuls les premiers modèles sont affichés (les 23 occupaient
// un écran entier entre le texte et l'aperçu) ; un bouton déplie le reste.
const PRESETS_MOBILE = 8;

// Au-delà de ce nombre de documents, la liste passe en zone défilante bornée
// avec résumé et filtres (sinon mille lignes poussent les étapes 2 et 3 à
// 79 000 pixels du haut de la page).
const LIST_COMPACT_FROM = 6;

function triggerDownload(url: string, name: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function CoreProduct() {
  const t = useT();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [text, setText] = useState("");
  const [style, setStyle] = useState<WatermarkStyle>(DEFAULT_WATERMARK_STYLE);
  const [filePassword, setFilePassword] = useState("");
  const [appliedStyle, setAppliedStyle] = useState<WatermarkStyle>(DEFAULT_WATERMARK_STYLE);
  const [autoApply, setAutoApply] = useState(true);
  const [appliedText, setAppliedText] = useState("");
  const [rejected, setRejected] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  // Résumé du lot (mode compact) : filtre par état et recherche par nom.
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  // Plusieurs destinataires : une version filigranée par ligne.
  const [multi, setMulti] = useState(false);
  const [recipientsText, setRecipientsText] = useState("");
  // Copie traçable : date + référence unique par destinataire.
  const [trace, setTrace] = useState(false);
  const [sizeMb, setSizeMb] = useState<SizeTargetMb>(0);
  const [shareNotice, setShareNotice] = useState("");
  const [allPresets, setAllPresets] = useState(false);
  // Sur téléphone, l'aperçu et le téléchargement sont sous les options :
  // tant que l'étape 3 n'est pas à l'écran, un bouton fixe y mène.
  const step3Ref = useRef<HTMLElement>(null);
  const [step3Visible, setStep3Visible] = useState(true);
  useEffect(() => {
    const el = step3Ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    // « Visible » aussi une fois dépassée (lecture des sections du bas) :
    // le bouton ne sert qu'à descendre vers l'aperçu, jamais à remonter.
    const io = new IntersectionObserver(([e]) => setStep3Visible(e.isIntersecting || e.boundingClientRect.top < 0), {
      rootMargin: "0px 0px -35% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Vérifié après montage seulement : au build statique (SSR), window n'existe
  // pas et le HTML prérendu suppose un navigateur capable.
  const [unsupported, setUnsupported] = useState(false);
  useEffect(() => {
    if (!isBrowserSupported()) setUnsupported(true);
  }, []);

  useEffect(() => {
    if (readPref("autoApply") === "0") setAutoApply(false);
    const savedSize = Number(readPref("sizeMb"));
    if ((SIZE_TARGETS_MB as readonly number[]).includes(savedSize)) setSizeMb(savedSize as SizeTargetMb);
    const saved = readStyle(readPref(styleStorageKey));
    setStyle(saved);
    setAppliedStyle(saved);
  }, []);

  const setAuto = (on: boolean) => {
    setAutoApply(on);
    setAppliedText(text.trim());
    setAppliedStyle(style);
    writePref("autoApply", on ? "1" : "0");
  };

  const updateSize = (mb: SizeTargetMb) => {
    setSizeMb(mb);
    writePref("sizeMb", String(mb));
  };

  const updateStyle = (next: WatermarkStyle) => {
    const clean = normalizeStyle(next);
    setStyle(clean);
    writePref(styleStorageKey, serializeStyle(clean));
  };

  const addFiles = useCallback((list: FileList | File[] | null | undefined) => {
    if (!list) return;
    const incoming = Array.from(list);
    setRejected(incoming.filter((f) => !isSupported(f)).map((f) => f.name));
    const accepted = incoming.filter((f) => isSupported(f));
    if (!accepted.length) return;
    setDocs((prev) => {
      // Le même fichier peut apparaître deux fois dans un seul dépôt :
      // on déduplique aussi à l'intérieur du lot, pas seulement contre
      // l'existant, sinon deux docs partagent la même clé React.
      const seen = new Set(prev.map((d) => d.id));
      const added: Doc[] = [];
      for (const f of accepted) {
        const id = docId(f);
        if (seen.has(id)) continue;
        seen.add(id);
        added.push({ id, file: f, status: "pending" });
      }
      return [...prev, ...added];
    });
  }, []);

  // useCallback : DocRow est mémoïsée, une fonction recréée à chaque rendu
  // annulerait la mémoïsation (mille lignes re-rendues pour rien).
  const removeDoc = useCallback((id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
    inputRef.current?.focus();
  }, []);

  // Annonce aux lecteurs d'écran : la nouvelle position n'est sinon qu'un chiffre visuel.
  const [moveAnnouncement, setMoveAnnouncement] = useState("");
  const moveDoc = useCallback(
    (id: string, to: number) => {
      const current = prevDocs.current;
      const from = current.findIndex((d) => d.id === id);
      const target = Math.min(current.length - 1, Math.max(0, to));
      if (from >= 0 && target !== from) {
        setMoveAnnouncement(t.moved(current[from].file.name, target + 1, current.length));
      }
      setDocs((prev) => moveTo(prev, prev.findIndex((d) => d.id === id), to));
    },
    [t]
  );
  const setMasks = useCallback((id: string, masks: PageMasks) => {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, masks } : d)));
  }, []);
  const listRef = useRef<HTMLUListElement>(null);
  const { drag, start: startDrag } = useDragReorder(listRef, moveDoc);

  const clearAll = () => {
    setDocs([]);
    setRejected([]);
    setQuery("");
    setFilter("all");
    inputRef.current?.focus();
  };

  const today = () => new Date().toLocaleDateString(t.locale);

  // Fichiers partagés depuis le téléphone (menu « Partager ») : repris de la
  // boîte de réception locale du service worker, qui est vidée aussitôt.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(SHARE_PARAM)) return;
    url.searchParams.delete(SHARE_PARAM);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    takeSharedFiles().then((files) => {
      if (!files.length) return;
      addFiles(files);
      setShareNotice(t.shareReceived(files.length));
    });
    // Une seule fois, au chargement ouvert par le partage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => addFiles(e.clipboardData?.files);
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [addFiles]);

  // Accepter un fichier déposé n'importe où sur la page, pas seulement la zone.
  useEffect(() => {
    let depth = 0;
    const hasFiles = (e: DragEvent) =>
      Array.from(e.dataTransfer?.types ?? []).includes("Files");
    // preventDefault on every dragover, otherwise the browser opens the file
    // instead of letting the page receive the drop.
    const onOver = (e: DragEvent) => e.preventDefault();
    const onEnter = (e: DragEvent) => {
      if (hasFiles(e)) {
        depth++;
        setDragging(true);
      }
    };
    const onLeave = () => {
      depth = Math.max(0, depth - 1);
      if (depth === 0) setDragging(false);
    };
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      depth = 0;
      setDragging(false);
      if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
    };
    window.addEventListener("dragover", onOver);
    window.addEventListener("dragenter", onEnter);
    window.addEventListener("dragleave", onLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragover", onOver);
      window.removeEventListener("dragenter", onEnter);
      window.removeEventListener("dragleave", onLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, [addFiles]);

  const prevDocs = useRef<Doc[]>([]);
  useEffect(() => {
    const live = new Set(docs.map((d) => d.result).filter(Boolean));
    for (const old of prevDocs.current) {
      if (old.result && !live.has(old.result)) releaseResult(old.result);
    }
    prevDocs.current = docs;
  }, [docs]);
  useEffect(
    () => () => prevDocs.current.forEach((d) => d.result && releaseResult(d.result)),
    []
  );

  const value = text.trim();
  const active = autoApply ? value : appliedText.trim();
  const liveStyle = autoApply ? style : appliedStyle;
  const maxBytes = sizeMb ? mbToBytes(sizeMb) : undefined;

  // Références de traçabilité, une par destinataire (clé "" sans destinataire).
  // Tirées une fois puis stables : la même copie garde sa référence tant que
  // l'utilisateur n'en demande pas de nouvelles. Jamais enregistrées.
  const refs = useRef(new Map<string, string>());
  const [, renewRefs] = useState(0);
  const refFor = (key: string) => {
    let ref = refs.current.get(key);
    if (!ref) refs.current.set(key, (ref = makeRef()));
    return ref;
  };
  const recipients = multi ? parseRecipients(recipientsText) : [];
  const recipientsTruncated =
    multi && recipientsText.split(/\r?\n/).filter((l) => l.trim()).length > MAX_RECIPIENTS;
  /** Texte réellement apposé pour un destinataire (ou sans destinataire). */
  const stampFor = (base: string, recipient?: string) =>
    composeStamp(base, {
      recipient,
      trace: trace ? { date: today(), ref: refFor(recipient ?? ""), refLabel: t.trace.refLabel } : undefined,
    });
  // Aperçu et rendu immédiat : premier destinataire. Les autres sont rendus
  // au téléchargement.
  const previewText = stampFor(active, recipients[0]);
  const stamp = `${stampKey(previewText, liveStyle)}\0${sizeMb}`;
  const meaningful = hasVisibleText(active) || recipients.length > 0;
  const pending =
    !autoApply && hasVisibleText(value) && stampKey(value, style) !== stampKey(appliedText.trim(), appliedStyle);
  // Trié : réordonner la liste ne change pas la clé, donc ne relance pas
  // le filigrane. L'ordre n'intervient qu'au moment du PDF unique.
  const fileKey = docs
    .map((d) => d.id)
    .sort()
    .join("|");
  // Change à chaque déverrouillage soumis ou masque modifié : relance le
  // traitement sans toucher aux documents déjà prêts (protégés par stampedWith).
  const unlockKey = docs
    .map((d) => `${d.id}:${d.tries ?? 0}:${masksKey(d.masks)}`)
    .sort()
    .join("|");
  // Réglage courant, lu à la fin d'un assemblage long (si le texte a changé
  // entre-temps, le fichier porterait l'ancien filigrane) et à l'arrêt d'un lot.
  const stampRef = useRef(stamp);
  stampRef.current = stamp;
  const liveDocs = useRef(docs);
  liveDocs.current = docs;
  // Documents en cours de rendu. Un lot relancé parce qu'un fichier a été
  // ajouté ou un autre PDF déverrouillé ne les interrompt pas : avant, un
  // PDF de 200 pages à moitié rendu repartait de la page 1 à chaque fois.
  const inFlight = useRef(new Set<{ id: string; stamp: string; tries: number; aborter: AbortController }>());
  useEffect(() => {
    const jobs = inFlight.current;
    return () => jobs.forEach((job) => job.aborter.abort());
  }, []);

  useEffect(() => {
    if (!fileKey || !meaningful) {
      setDocs((prev) =>
        prev.some((d) => d.result || d.status !== "pending")
          ? prev.map((d) => ({
              id: d.id,
              file: d.file,
              status: "pending" as const,
              password: d.password,
              tries: d.tries,
            }))
          : prev
      );
      return;
    }
    let cancelled = false;
    const update = (id: string, changes: Partial<Doc>) =>
      setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, ...changes } : d)));
    const patch = (id: string, changes: Partial<Doc>) => {
      if (!cancelled) update(id, changes);
    };
    const timer = setTimeout(async () => {
      // File d'attente figée : la progression remplace prevDocs.current.
      const queue = prevDocs.current.slice();
      for (const doc of queue) {
        if (cancelled) return;
        const own = docStamp(doc, stamp);
        if (doc.result && doc.stampedWith === own) continue;
        // Échec déjà constaté avec ce réglage et cet essai : inutile de retenter.
        if (doc.error && doc.failedWith === attemptKey(doc, own)) continue;
        // Déjà en cours, lancé par un passage précédent avec ce même réglage :
        // il se termine de lui-même et publie son résultat.
        if (
          [...inFlight.current].some(
            (j) => j.id === doc.id && j.stamp === own && !j.aborter.signal.aborted
          )
        )
          continue;
        const job = { id: doc.id, stamp: own, tries: doc.tries ?? 0, aborter: new AbortController() };
        inFlight.current.add(job);
        // Un travail en cours publie son résultat même si ce passage a été
        // remplacé ; seul l'abandon (réglage changé, document retiré) l'en empêche.
        const keep = () =>
          !job.aborter.signal.aborted && liveDocs.current.some((d) => d.id === doc.id);
        patch(doc.id, { status: "processing", error: undefined, failedWith: undefined });
        try {
          const result = await watermarkFile(
            doc.file,
            previewText,
            (done, total) => keep() && update(doc.id, { progress: [done, total] }),
            doc.password,
            job.aborter.signal,
            liveStyle,
            { masks: doc.masks, maxBytes }
          );
          if (!keep()) releaseResult(result);
          else update(doc.id, { status: "ready", result, stampedWith: own, progress: undefined });
        } catch (e) {
          if (keep()) {
            const key = e instanceof Error ? (e.message as ErrorKey) : "";
            update(doc.id, {
              status: "error",
              result: undefined,
              stampedWith: undefined,
              error: t.errors[key as ErrorKey] ? (key as ErrorKey) : "generic",
              failedWith: attemptKey(doc, own),
              progress: undefined,
            });
          }
        } finally {
          inFlight.current.delete(job);
        }
      }
    }, autoApply ? 500 : 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      // Interrompt ce qui est devenu inutile : réglage changé, document retiré,
      // ou nouveau mot de passe soumis pour ce document précis.
      for (const job of inFlight.current) {
        const doc = liveDocs.current.find((d) => d.id === job.id);
        if (!doc || docStamp(doc, stampRef.current) !== job.stamp || (doc.tries ?? 0) !== job.tries)
          job.aborter.abort();
      }
    };
    // Dépendances volontairement restreintes : `t` et `autoApply` sont lus
    // ici mais ne doivent pas relancer le lot (changer de langue ou basculer
    // l'aperçu auto retraiterait mille documents pour rien). `stamp` porte
    // déjà le texte appliqué et l'apparence.
  }, [fileKey, unlockKey, stamp, meaningful]);

  // Des documents chargés seraient perdus par un rechargement accidentel :
  // rien n'est persisté, par conception (confidentialité).
  const hasDocs = docs.length > 0;
  useEffect(() => {
    if (!hasDocs) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [hasDocs]);

  const unlock = useCallback((id: string, password: string) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, password, tries: (d.tries ?? 0) + 1, status: "pending", error: undefined }
          : d
      )
    );
    // Le formulaire qui portait le focus disparaît : on le rend à la ligne
    // du document plutôt que de le laisser tomber sur <body>.
    requestAnimationFrame(() => document.getElementById(`doc-${id}`)?.focus());
  }, []);

  const apply = () => {
    setAppliedText(value);
    setAppliedStyle(style);
  };
  const ready = docs.filter((d) => isFresh(d, stamp));
  const processing = docs.some((d) => d.status === "processing");

  // Un lot volumineux ne doit pas repousser les étapes 2 et 3 hors de l'écran :
  // au-delà de LIST_COMPACT_FROM, la liste devient une zone à hauteur bornée,
  // coiffée d'un résumé (progression + filtres).
  const attention = docs.filter(needsAttention);
  const done = docs.filter((d) => d.status === "ready" || d.error).length;
  const compact = docs.length > LIST_COMPACT_FROM;
  // Filtre et recherche n'existent que dans le résumé (mode compact). Sous le
  // seuil, la barre disparaît : les appliquer quand même masquerait des
  // documents sans que rien à l'écran n'explique pourquoi. Et un filtre devenu
  // vide (dernier document déverrouillé) retombe sur « tout ».
  const effFilter: Filter = !compact
    ? "all"
    : (filter === "attention" && !attention.length) || (filter === "ready" && !ready.length)
      ? "all"
      : filter;
  // toLocaleLowerCase : « IMPÔTS » doit trouver « impôts ».
  const needle = compact ? query.trim().toLocaleLowerCase(t.locale) : "";
  // Mémoïsé : à chaque page rendue, un patch de progression re-rend le
  // composant. Sans cela, mille documents seraient refiltrés et retriés
  // plusieurs fois par seconde.
  const listed = useMemo(
    () =>
      docs
        .filter((d) => {
          if (effFilter === "attention") return needsAttention(d);
          if (effFilter === "ready") return isFresh(d, stamp);
          return true;
        })
        .filter((d) => !needle || d.file.name.toLocaleLowerCase(t.locale).includes(needle)),
    [docs, effFilter, needle, stamp, t.locale]
  );

  // Index de chaque document : une recherche par ligne rendrait la liste
  // quadratique (mille documents, à chaque mise à jour de progression).
  const indexById = useMemo(() => new Map(docs.map((d, i) => [d.id, i])), [docs]);
  // Réordonner n'a de sens que sur la liste complète (ni filtre ni recherche).
  const reorder = docs.length > 1 && listed.length === docs.length;

  // Trait d'insertion pendant un glisser : au-dessus de la ligne visée, ou
  // sous la dernière. Masqué quand le lâcher ne changerait rien.
  const dropEdgeFor = (index: number): "before" | "after" | undefined => {
    if (!drag || slotToIndex(drag.from, drag.slot) === drag.from) return undefined;
    if (drag.slot === index) return "before";
    if (drag.slot === docs.length && index === docs.length - 1) return "after";
    return undefined;
  };

  // Sans sélection explicite, l'aperçu suit le dernier document terminé.
  const shown =
    docs.find((d) => d.id === activeId) ??
    [...docs].reverse().find((d) => isFresh(d, stamp)) ??
    docs.find((d) => d.result || d.error);

  const [bundling, setBundling] = useState<null | "pdf" | "zip">(null);
  // Quelle étape a échoué : le message doit nommer la bonne (assemblage ou
  // chiffrement), pas se fier au mot de passe saisi au moment de l'affichage.
  const [bundleError, setBundleError] = useState<null | "export" | "encrypt" | "stale">(null);
  useEffect(() => setBundleError(null), [stamp, ready.length, filePassword]);
  // Tout ce qui change le contenu d'un lot : réglage de l'aperçu, autres
  // destinataires et leurs références. Relu à la fin d'un assemblage long.
  const bundleKey = `${stamp}\0${recipients.map((r) => `${r}:${trace ? refFor(r) : ""}`).join("|")}`;
  const bundleKeyRef = useRef(bundleKey);
  bundleKeyRef.current = bundleKey;
  const [bundleProgress, setBundleProgress] = useState("");

  type Rendered = { doc: Doc; result: WatermarkResult };
  /** Rend les documents prêts avec un autre texte (destinataire suivant, ou budget réduit). */
  const renderAll = async (text: string, budget?: (d: Doc) => number | undefined) => {
    const out: Rendered[] = [];
    try {
      for (const doc of ready) {
        const result = await watermarkFile(doc.file, text, undefined, doc.password, undefined, liveStyle, {
          masks: doc.masks,
          maxBytes: budget ? budget(doc) : maxBytes,
        });
        out.push({ doc, result });
      }
      return out;
    } catch (e) {
      out.forEach((o) => releaseResult(o.result));
      throw e;
    }
  };

  /** PDF unique ; sous taille cible, re-rendu avec un budget par document proportionnel à ses pages. */
  const combineWithin = async (items: Rendered[], text: string) => {
    const parts = (list: Rendered[]) =>
      Promise.all(
        list.map(async ({ result }) => ({
          bytes: new Uint8Array(await result.blob.arrayBuffer()),
          extension: result.extension,
        }))
      );
    let bytes = await combineAsPdf(await parts(items));
    if (maxBytes && bytes.length > maxBytes) {
      const total = items.reduce((n, i) => n + i.result.pageCount, 0);
      const pages = new Map(items.map((i) => [i.doc.id, i.result.pageCount]));
      const smaller = await renderAll(text, (d) => shareOfBudget(maxBytes, pages.get(d.id) ?? 1, total));
      try {
        bytes = await combineAsPdf(await parts(smaller));
      } finally {
        smaller.forEach((o) => releaseResult(o.result));
      }
    }
    return bytes;
  };

  const downloadBundle = async (kind: "pdf" | "zip") => {
    const startKey = bundleKey;
    setBundling(kind);
    setBundleError(null);
    let step: "export" | "encrypt" = "export";
    // Sans destinataire : une seule passe, sur les résultats déjà prêts.
    const targets: (string | undefined)[] = recipients.length ? recipients : [undefined];
    const entries: { name: string; bytes: Uint8Array; folder?: string }[] = [];
    let single: Uint8Array | null = null;
    try {
      for (const [i, recipient] of targets.entries()) {
        if (recipient && targets.length > 1) setBundleProgress(t.multi.preparing(i + 1, targets.length, recipient));
        const text = stampFor(active, recipient);
        // Le premier destinataire est celui de l'aperçu : déjà rendu.
        const fresh = i > 0;
        const items: Rendered[] = fresh ? await renderAll(text) : ready.map((doc) => ({ doc, result: doc.result! }));
        try {
          if (kind === "zip") {
            // Un document à la fois : chiffrer des centaines de fichiers en
            // parallèle garderait tous les originaux et leurs copies en mémoire.
            if (filePassword) step = "encrypt";
            for (const { doc, result } of items) {
              const file = await protectFile(result.blob, result.extension, filePassword);
              entries.push({
                name: outName(doc, t, file.extension),
                bytes: file.bytes,
                folder: recipient ? recipientSlug(recipient) : undefined,
              });
            }
            step = "export";
          } else {
            let bytes = await combineWithin(items, text);
            if (filePassword) {
              step = "encrypt";
              bytes = await encryptPdf(bytes, filePassword);
              step = "export";
            }
            if (recipient) entries.push({ name: `${t.zipName}-${recipientSlug(recipient)}.pdf`, bytes });
            else single = bytes;
          }
        } finally {
          if (fresh) items.forEach((o) => releaseResult(o.result));
        }
      }
      const url = single
        ? URL.createObjectURL(new Blob([Uint8Array.from(single)], { type: "application/pdf" }))
        : URL.createObjectURL(new Blob([zipDocuments(entries) as BlobPart], { type: "application/zip" }));
      if (bundleKeyRef.current !== startKey) {
        URL.revokeObjectURL(url);
        setBundleError("stale");
        return;
      }
      triggerDownload(url, `${t.zipName}.${single ? "pdf" : "zip"}`);
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch {
      setBundleError(step);
    } finally {
      setBundling(null);
      setBundleProgress("");
    }
  };

  // Navigateur privé d'une API indispensable (createImageBitmap, toBlob…) :
  // une bannière claire plutôt qu'un outil qui échoue en silence.
  if (unsupported) {
    return (
      <div
        role="alert"
        className="mx-auto w-full max-w-2xl rounded-2xl border border-sceau/40 bg-sceau/5 px-6 py-5 text-center font-medium text-sceau-fonce"
      >
        {t.browserTooOld}
      </div>
    );
  }

  return (
    // La colonne des documents s'élargit avec l'écran : à 400 px fixes, un nom
    // un peu long et sa pastille se disputaient la place. On ne l'élargit
    // qu'à partir de xl, sinon l'aperçu se retrouve plus étroit que la liste.
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:grid lg:grid-cols-[400px_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[460px_minmax(0,1fr)] 2xl:grid-cols-[520px_minmax(0,1fr)]">
      {dragging && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-encre/40 p-6 backdrop-blur-sm">
          <div className="rounded-2xl border-2 border-dashed border-white bg-feuille px-8 py-6 text-center text-lg font-semibold shadow-xl">
            {t.dropAnywhere}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-8">
        <section aria-label={t.step1}>
          <div className="flex items-center justify-between gap-3">
            <StepLabel n={1} active={docs.length === 0}>
              {t.step1}
            </StepLabel>
            {docs.length > 0 && (
              <button
                onClick={clearAll}
                className="text-sm text-encre-2 underline-offset-2 transition-colors hover:text-sceau hover:underline"
              >
                {t.clearAll}
              </button>
            )}
          </div>

          <label
            data-tour="drop"
            className={`motif-filigrane mt-3 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed bg-feuille px-6 text-center transition-colors focus-within:ring-2 focus-within:ring-bleu ${
              docs.length ? "py-5" : "py-12"
            } ${dragging ? "border-sceau bg-sceau/5" : "border-trait hover:border-encre-2"}`}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={ACCEPT}
              aria-label={t.inputAria}
              className="sr-only"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
            {docs.length === 0 ? (
              <>
                <UploadIcon className="h-9 w-9 text-encre-2" />
                <span className="text-lg font-semibold">{t.dropTitle}</span>
                <span className="text-sm text-encre-2">{t.dropHint}</span>
              </>
            ) : (
              <span className="text-sm text-encre-2">{t.dropAdd}</span>
            )}
          </label>

          {shareNotice && (
            <p role="status" className="mt-3 rounded-xl border border-green-700/30 bg-green-700/5 px-4 py-2 text-sm text-green-800">
              {shareNotice}
            </p>
          )}
          {rejected.length > 0 && (
            <div
              role="alert"
              className="mt-3 break-words rounded-xl border border-sceau/40 bg-sceau/5 px-4 py-3 text-sm text-sceau-fonce"
            >
              {t.rejected(rejected.join(", "))}
            </div>
          )}

          {compact && (
            <BatchSummary
              total={docs.length}
              done={done}
              attention={attention.length}
              ready={ready.length}
              filter={effFilter}
              onFilter={setFilter}
              query={query}
              onQuery={setQuery}
              shownCount={listed.length}
            />
          )}

          {reorder && (
            <p id="doc-order-hint" className="mt-3 text-sm font-medium text-encre">
              {t.orderHint}
            </p>
          )}

          <p aria-live="polite" className="sr-only">
            {moveAnnouncement}
          </p>

          {docs.length > 0 && (
            <ul
              ref={listRef}
              aria-describedby={reorder ? "doc-order-hint" : undefined}
              className={`mt-3 flex flex-col gap-2 ${
                // Zone bornée : la liste défile en interne, les étapes 2 et 3
                // restent à l'écran quel que soit le nombre de documents.
                // Sur mobile, une hauteur relative laisse voir plus de lignes.
                compact
                  ? "max-h-[60vh] overflow-y-auto overscroll-contain pe-1 sm:max-h-[26rem]"
                  : ""
              }`}
            >
              {listed.map((doc) => {
                const index = indexById.get(doc.id) ?? -1;
                return (
                  <DocRow
                    key={doc.id}
                    doc={doc}
                    selected={shown?.id === doc.id}
                    onSelect={setActiveId}
                    onRemove={removeDoc}
                    onUnlock={unlock}
                    index={index}
                    total={docs.length}
                    onMoveTo={reorder ? moveDoc : undefined}
                    onDragStart={reorder ? startDrag : undefined}
                    dragging={drag?.id === doc.id}
                    dropEdge={dropEdgeFor(index)}
                  />
                );
              })}
            </ul>
          )}
        </section>

        <section aria-label={t.step2}>
          <StepLabel n={2} active={docs.length > 0 && !meaningful}>
            {t.step2}
          </StepLabel>
          <div data-tour="text">
            <textarea
              value={text}
              maxLength={120}
              rows={2}
              aria-label={t.textareaAria}
              onChange={(e) => setText(e.target.value.replace(/\n/g, " "))}
              placeholder={t.placeholder}
              className="mt-3 w-full resize-y rounded-xl border border-trait bg-feuille px-4 py-3 font-mono rtl:font-sans field-sizing-content focus:outline-none focus:ring-2 focus:ring-bleu"
            />
            <div className="mt-2 flex items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-encre-2">
                <input
                  type="checkbox"
                  checked={autoApply}
                  onChange={(e) => setAuto(e.target.checked)}
                  className="peer sr-only"
                />
                <span className="relative h-5 w-9 rounded-full bg-trait transition-colors after:absolute after:start-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:bg-bleu peer-checked:after:translate-x-4 rtl:peer-checked:after:-translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-bleu peer-focus-visible:ring-offset-1" />
                {t.autoApply}
              </label>
              {text && (
                <span className="text-xs text-encre-2 tabular-nums">{text.length} / 120</span>
              )}
            </div>
            {/* Modèles : le motif (court) et la date du jour, c'est-à-dire deux
                des trois éléments de la formule. Le destinataire est le seul que
                l'outil ne peut pas deviner : l'indication juste en dessous le
                réclame explicitement. */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {t.presets.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setText(t.onDate(p.text, today()).slice(0, 120))}
                  className={`rounded-lg border border-trait bg-feuille px-3 py-1.5 text-sm text-encre-2 transition-colors hover:border-bleu hover:text-bleu ${
                    i >= PRESETS_MOBILE && !allPresets ? "hidden sm:inline-block" : ""
                  }`}
                >
                  {p.label}
                </button>
              ))}
              {t.presets.length > PRESETS_MOBILE && (
                <button
                  type="button"
                  onClick={() => setAllPresets((v) => !v)}
                  aria-expanded={allPresets}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-bleu underline-offset-2 hover:underline sm:hidden"
                >
                  {allPresets ? t.fewerPresets : t.morePresets(t.presets.length - PRESETS_MOBILE)}
                </button>
              )}
              {value && !text.includes(today()) && (
                <button
                  onClick={() => setText(t.onDate(value, today()).slice(0, 120))}
                  className="rounded-lg border border-bleu/40 bg-bleu/5 px-3 py-1.5 text-sm text-bleu transition-colors hover:border-bleu"
                >
                  {t.addDate}
                </button>
              )}
            </div>
            <p className="mt-2 text-sm text-encre-2">{t.presetsHint}</p>
          </div>
          <div data-tour="options">
            <CopyOptions
              multi={multi}
              onMulti={setMulti}
              recipientsText={recipientsText}
              onRecipientsText={setRecipientsText}
              recipients={recipients}
              truncated={recipientsTruncated}
              trace={trace}
              onTrace={setTrace}
              registry={
                trace
                  ? (recipients.length ? recipients : [undefined]).map((r) =>
                      t.trace.line(r ?? t.trace.self, refFor(r ?? ""), today())
                    )
                  : []
              }
              onRenew={() => {
                refs.current = new Map();
                renewRefs((n) => n + 1);
              }}
              sizeMb={sizeMb}
              onSize={updateSize}
            />
            <WatermarkAppearance
              style={style}
              sample={value || t.style.sample}
              onChange={updateStyle}
            />
            <FilePassword password={filePassword} onChange={setFilePassword} />
          </div>
          {!autoApply && (
            <button
              onClick={apply}
              disabled={!pending}
              className="mt-3 w-full rounded-xl bg-sceau px-6 py-3 font-semibold text-white transition-colors hover:bg-sceau-fonce focus:outline-none focus:ring-2 focus:ring-sceau focus:ring-offset-2 disabled:opacity-40"
            >
              {t.apply}
            </button>
          )}
        </section>

        {(ready.length > 1 || (recipients.length > 0 && ready.length > 0)) && (
          <div className="flex flex-col gap-2" aria-busy={bundling !== null || undefined}>
            <button
              type="button"
              onClick={() => downloadBundle("pdf")}
              disabled={bundling !== null}
              className="w-full rounded-xl border-2 border-sceau px-6 py-3 font-semibold text-sceau transition-colors hover:bg-sceau/5 disabled:opacity-50"
            >
              {bundling === "pdf" && filePassword
                ? t.filePassword.encrypting
                : recipients.length
                  ? t.multi.downloadPdf(recipients.length)
                  : t.downloadPdf(ready.length)}
            </button>
            <button
              type="button"
              onClick={() => downloadBundle("zip")}
              disabled={bundling !== null}
              className="w-full rounded-xl border-2 border-sceau px-6 py-3 font-semibold text-sceau transition-colors hover:bg-sceau/5 disabled:opacity-50"
            >
              {bundling === "zip" && filePassword
                ? t.filePassword.encrypting
                : recipients.length
                  ? t.multi.downloadZip(recipients.length)
                  : t.downloadAll(ready.length)}
            </button>
            {bundleProgress && (
              <p role="status" className="text-sm text-encre-2">
                {bundleProgress}
              </p>
            )}
            {filePassword && <p className="text-sm text-encre-2">{t.bundlePassword}</p>}
            {bundleError && (
              <p role="alert" className="text-sm text-sceau-fonce">
                {bundleError === "encrypt"
                  ? t.filePassword.encryptFailed
                  : bundleError === "stale"
                    ? t.bundleStale
                    : t.errors.export_failed}
              </p>
            )}
          </div>
        )}
      </div>

      <section ref={step3Ref} id="apercu" data-tour="result" aria-label={t.step3} className="min-w-0 scroll-mt-4">
        <StepLabel n={3} active={ready.length > 0}>
          {t.step3}
        </StepLabel>

        {pending && ready.length > 0 && (
          <div
            role="alert"
            className="mt-3 rounded-xl border border-amber-600/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-900"
          >
            {t.staleResults}
          </div>
        )}
        <div className="mt-3">
          {docs.length === 0 || !meaningful ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 rounded-2xl border border-trait bg-feuille px-6 text-center text-encre-2">
              <div className="w-full max-w-[280px] -rotate-2">
                <SpecimenCard title={t.about.specimenCard} specimen={t.about.specimen}>
                  <WatermarkLayer text={value || exampleStamp(t)} style={style} />
                </SpecimenCard>
              </div>
              <p>
                {docs.length === 0
                  ? t.emptyStart
                  : !autoApply && hasVisibleText(value)
                    ? t.applyHint
                    : t.emptyText}
              </p>
            </div>
          ) : shown && needsPassword(shown) ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-2xl border border-trait bg-feuille px-6 text-center text-encre-2">
              <LockIcon className="h-8 w-8" />
              <p className="max-w-xs">
                <span className="block font-medium text-encre">{t.errors.pdf_password}</span>
                {t.unlock.hint}
              </p>
            </div>
          ) : shown?.error ? (
            <div
              role="alert"
              className="rounded-2xl border border-sceau/40 bg-sceau/5 px-5 py-4 text-sceau-fonce"
            >
              {t.docError(shown.file.name, t.errors[shown.error])}
            </div>
          ) : shown && isFresh(shown, stamp) ? (
            <>
              {recipients.length > 1 && (
                <p className="mb-3 rounded-xl border border-bleu/30 bg-bleu/5 px-4 py-2 text-sm text-bleu">
                  {t.multi.previewFor(recipients[0])}
                </p>
              )}
              {shown.result?.overBudget && sizeMb > 0 && (
                <p role="status" className="mb-3 rounded-xl border border-amber-600/40 bg-amber-500/10 px-4 py-2 text-sm text-amber-900">
                  {t.size.over(sizeMb)}
                </p>
              )}
              <Kiosk
                key={shown.id}
                doc={shown}
                password={filePassword}
                onMasks={(masks) => setMasks(shown.id, masks)}
                hideDownload={recipients.length > 1}
              />
            </>
          ) : (
            <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-trait bg-feuille text-encre-2">
              {/* Pas d'aria-live ici : la région sr-only en fin de composant
                  annonce déjà le traitement, sans répéter chaque page. */}
              {shown ? t.processingDoc(shown.file.name, shown.progress) : t.processingGeneric}
            </div>
          )}
        </div>
      </section>

      <p className="sr-only" role="status" aria-live="polite">
        {processing ? t.srProcessing : ready.length > 0 ? t.srReady(ready.length) : ""}
      </p>

      <HelpTour hasDocs={docs.length > 0} lifted={ready.length > 0 && !step3Visible} />

      {/* Téléphone et tablette (colonne unique) : raccourci vers l'aperçu. */}
      {ready.length > 0 && !step3Visible && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
          <button
            type="button"
            onClick={() => step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="pointer-events-auto flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-sceau px-6 py-3.5 font-semibold text-white shadow-lg shadow-encre/25 transition-colors hover:bg-sceau-fonce"
          >
            <DownloadIcon className="h-5 w-5 shrink-0" />
            {t.jumpToPreview(ready.length)}
          </button>
        </div>
      )}
    </div>
  );
}


function StepLabel({
  n,
  active,
  children,
}: {
  n: number;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-3 text-lg font-semibold">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
          active ? "bg-sceau text-white" : "bg-encre/10 text-encre-2"
        }`}
      >
        {n}
      </span>
      {children}
    </h2>
  );
}
