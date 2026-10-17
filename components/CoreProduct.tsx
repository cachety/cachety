"use client";

// L'outil, en trois étapes : 1. documents, 2. détails (usage et destinataire),
// 3. aperçu et téléchargement. Sur ordinateur, tout est sur un écran (étapes
// 1 et 2 à gauche, aperçu et téléchargement à droite). Sur téléphone, une
// étape à la fois, avec une barre d'étapes et un bouton en bas ; les sections
// d'information de la page ne s'affichent qu'à l'étape 1.
//
// Mode « signer » (mode="sign", page /<lang>/sign) : même outil, même file
// de rendu. L'étape 2 devient la signature (SignaturePad), l'aperçu de
// l'étape 3 l'éditeur de placement (SignatureEditor) ; la sortie est toujours
// un PDF « -signed ». Le filigrane n'est qu'une option (« Ajouter aussi un
// filigrane »). Le mode filigrane, par défaut, ne change pas.

import HelpTour from "@/components/HelpTour";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ACCEPT, hasVisibleText, isSupported, zipDocuments } from "@/lib/files";
import { isBrowserSupported } from "@/lib/compat";
import {
  releaseResult,
  renderFile,
  signPreviewPages,
  watermarkFile,
  type RenderOptions,
  type WatermarkResult,
} from "@/lib/watermark";
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
import { FilePassword, makePassphrase } from "@/components/FilePassword";
import { StampDetails } from "@/components/StampDetails";
import { SendOptions, type BundleFormat } from "@/components/SendOptions";
import { DonePanel, type DoneInfo } from "@/components/DonePanel";
import { combineAsPdf, encryptPdf, protectFile } from "@/lib/file-password";
import { exampleStamp, useT, type ErrorKey } from "@/lib/i18n";
import {
  attemptKey,
  docId,
  docStamp,
  isFresh,
  isPlaced,
  moveTo,
  needsAttention,
  needsPassword,
  needsPlacement,
  outName,
  placeSignature,
  refitOverlays,
  slotToIndex,
  type Doc,
  type Filter,
} from "@/lib/doc";
import { defaultPlacement, overlaysKey, type PageOverlays } from "@/lib/overlays";
import { signatureBitmap, signatureKey, type SignatureImage } from "@/lib/signature";
import { sha256Hex } from "@/lib/fingerprint";
import { lastPageAspect } from "@/lib/page-aspect";
import { SignaturePad } from "@/components/SignaturePad";
import type { FingerprintItem } from "@/components/Fingerprint";
import { DownloadIcon, HideIcon, LockIcon, SlidersIcon, UploadIcon } from "@/components/icons";
import { readPref, writePref } from "@/lib/storage";
import { masksKey, type PageMasks } from "@/lib/masks";
import { mbToBytes, shareOfBudget, SIZE_TARGETS_MB, type SizeTargetMb } from "@/lib/size-budget";
import { cleanRecipients, composeSimple, fillTemplate, hasToken, makeRef, recipientSlug } from "@/lib/stamp-text";
import { SHARE_PARAM, takeSharedFiles } from "@/lib/share-inbox";
import { SpecimenCard, WatermarkLayer } from "@/components/SpecimenCard";
import { BatchSummary } from "@/components/BatchSummary";
import { DocRow } from "@/components/DocList";
import { useDragReorder } from "@/components/useDragReorder";
import { Kiosk } from "@/components/Kiosk";
import { readPrefill } from "@/lib/partners";

// Au-delà de ce nombre de documents, la liste passe en zone défilante bornée
// avec résumé et filtres (sinon mille lignes poussent les étapes 2 et 3 à
// 79 000 pixels du haut de la page).
const LIST_COMPACT_FROM = 6;

type Step = 1 | 2 | 3;

function triggerDownload(url: string, name: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Signature prête pour le moteur : empreinte courte (clé du tampon) et image décodée. */
type SigReady = { sig: SignatureImage; key: string; bitmap: ImageBitmap };

export default function CoreProduct({
  embed = false,
  mode = "watermark",
  onHasDocs,
}: {
  embed?: boolean;
  mode?: "watermark" | "sign";
  /** Page intégrée : prévenir avant de changer d'outil, ce qui retirerait les documents. */
  onHasDocs?: (has: boolean) => void;
} = {}) {
  const t = useT();
  const sign = mode === "sign";
  const ts = t.sign;
  // Libellés communs aux deux modes (étapes, champ de dépôt).
  const labels = sign ? ts : t;
  const [docs, setDocs] = useState<Doc[]>([]);
  // Étape 2 : motif, destinataires (un champ chacun), texte libre éventuel.
  const [purpose, setPurpose] = useState("");
  const [fields, setFields] = useState<string[]>([""]);
  const [custom, setCustom] = useState(false);
  const [customText, setCustomText] = useState("");
  const [view, setView] = useState(0);
  const [style, setStyle] = useState<WatermarkStyle>(DEFAULT_WATERMARK_STYLE);
  // Verrou : mot de passe créé pour l'utilisateur (12 mots) ou choisi par lui.
  const [lock, setLock] = useState(false);
  const [lockPassword, setLockPassword] = useState("");
  const [ownPassword, setOwnPassword] = useState(false);
  const [isWords, setIsWords] = useState(false);
  const filePassword = lock ? lockPassword : "";
  const [format, setFormat] = useState<BundleFormat>("pdf");
  const [tool, setTool] = useState<null | "hide" | "adjust">(null);
  const [done, setDone] = useState<DoneInfo | null>(null);
  const [rejected, setRejected] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  // Résumé du lot (mode compact) : filtre par état et recherche par nom.
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [sizeMb, setSizeMb] = useState<SizeTargetMb>(0);
  const [shareNotice, setShareNotice] = useState("");
  // Étape affichée sur téléphone (sur ordinateur, tout est visible).
  const [step, setStep] = useState<Step>(1);
  const toolRef = useRef<HTMLDivElement>(null);
  // Mode « signer » : signature finale (lignes sous la signature comprises),
  // en mémoire seulement ; paraphe sur chaque page ; filigrane en option.
  const [signature, setSignature] = useState<SignatureImage | null>(null);
  const [sigReady, setSigReady] = useState<SigReady | null>(null);
  const [initials, setInitials] = useState(false);
  const [withWatermark, setWithWatermark] = useState(false);
  // Change à « Signer un autre document » : le pavé repart de zéro.
  const [padKey, setPadKey] = useState(0);

  // Sur téléphone, les étapes 2 et 3 occupent l'écran : l'en-tête et les
  // sections d'information de la page sont masqués (voir globals.css).
  useEffect(() => {
    document.documentElement.dataset.toolStep = String(step);
    return () => {
      delete document.documentElement.dataset.toolStep;
    };
  }, [step]);
  const goTo = (s: Step) => {
    setStep(s);
    setTool(null);
    requestAnimationFrame(() => toolRef.current?.scrollIntoView({ block: "start" }));
  };

  // Vérifié après montage seulement : au build statique (SSR), window n'existe
  // pas et le HTML prérendu suppose un navigateur capable.
  const [unsupported, setUnsupported] = useState(false);
  useEffect(() => {
    if (!isBrowserSupported()) setUnsupported(true);
  }, []);

  // Lien pré-rempli (partenaires) : motif et destinataire dans le fragment de
  // l'URL, après « # », jamais envoyé à un serveur. Le visiteur peut les modifier.
  useEffect(() => {
    const prefill = readPrefill(window.location.hash);
    if (prefill.purpose) setPurpose(prefill.purpose);
    if (prefill.recipient) setFields([prefill.recipient]);
    // Signer : un motif ou un destinataire fourni par le lien n'a de sens
    // qu'avec le filigrane, qui part donc coché (le visiteur peut le retirer).
    if (sign && (prefill.purpose || prefill.recipient)) setWithWatermark(true);
    // Une fois, au chargement.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const savedSize = Number(readPref("sizeMb"));
    if ((SIZE_TARGETS_MB as readonly number[]).includes(savedSize)) setSizeMb(savedSize as SizeTargetMb);
    setStyle(readStyle(readPref(styleStorageKey)));
  }, []);

  const updateSize = (mb: SizeTargetMb) => {
    setSizeMb(mb);
    writePref("sizeMb", String(mb));
  };

  const updateStyle = (next: WatermarkStyle) => {
    const clean = normalizeStyle(next);
    setStyle(clean);
    writePref(styleStorageKey, serializeStyle(clean));
  };

  const updateLock = async (on: boolean) => {
    setLock(on);
    if (on && !lockPassword && !ownPassword) {
      setLockPassword(await makePassphrase());
      setIsWords(true);
    }
  };
  const updateOwn = async (own: boolean) => {
    setOwnPassword(own);
    if (own) {
      setLockPassword("");
      setIsWords(false);
    } else {
      setLockPassword(await makePassphrase());
      setIsWords(true);
    }
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
  /** Mode « signer » : nouveau placement ; `undefined` le fait reposer à sa place par défaut par la file. */
  const setOverlays = useCallback((id: string, overlays: PageOverlays | undefined) => {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, overlays } : d)));
  }, []);
  const listRef = useRef<HTMLUListElement>(null);
  const { drag, start: startDrag } = useDragReorder(listRef, moveDoc);

  const clearAll = () => {
    setDocs([]);
    setRejected([]);
    setQuery("");
    setFilter("all");
    setDone(null);
    setStep(1);
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

  const maxBytes = sizeMb ? mbToBytes(sizeMb) : undefined;

  // Références de traçabilité ({code}), une par destinataire (clé "" sans
  // destinataire). Tirées une fois puis stables : la même copie garde sa
  // référence tant que l'utilisateur n'en demande pas de nouvelles. Jamais enregistrées.
  const refs = useRef(new Map<string, string>());
  const [, renewRefs] = useState(0);
  const refFor = (key: string) => {
    let ref = refs.current.get(key);
    if (!ref) refs.current.set(key, (ref = makeRef()));
    return ref;
  };
  // Mode « signer » : un seul destinataire, et seulement avec l'option filigrane.
  const recipients = sign ? (withWatermark ? cleanRecipients(fields).slice(0, 1) : []) : cleanRecipients(fields);
  const tokens = t.stampCard.tokens;
  const trace = custom && hasToken(customText, "code", tokens);
  /** Texte réellement apposé pour un destinataire (ou sans destinataire). */
  const stampFor = (recipient?: string) =>
    sign
      ? // Texte vide : pas de filigrane (le moteur ne charge même pas la police).
        withWatermark && (hasVisibleText(purpose) || recipient)
        ? composeSimple({ purpose, recipient, date: today() }, { sep: t.stampSep, onDate: t.onDate })
        : ""
      : custom
        ? fillTemplate(customText, { recipient, date: today(), code: trace ? refFor(recipient ?? "") : undefined }, tokens)
        : composeSimple({ purpose, recipient, date: today() }, { sep: t.stampSep, onDate: t.onDate });
  // Aperçu : le destinataire choisi (le premier par défaut). Les autres sont
  // rendus au téléchargement.
  const viewIndex = Math.min(view, Math.max(recipients.length - 1, 0));
  const previewRecipient = recipients[viewIndex];
  const previewText = stampFor(previewRecipient);
  const liveStyle = style;
  // Mode « signer » : la signature (son empreinte) et le paraphe font partie
  // du réglage commun ; son placement, propre à chaque document, est dans docStamp.
  const stamp = sign
    ? `${stampKey(previewText, liveStyle)}\0${sizeMb}\0${sigReady?.key ?? ""}\0${initials ? "i" : ""}`
    : `${stampKey(previewText, liveStyle)}\0${sizeMb}`;
  // Le formulaire simple porte toujours la date : il faut un motif ou un destinataire.
  // Mode « signer » : il faut une signature.
  const meaningful = sign
    ? !!sigReady
    : custom
      ? hasVisibleText(fillTemplate(customText, { date: "" }, tokens))
      : hasVisibleText(purpose) || recipients.length > 0;
  /** Options du moteur pour un document : en mode « signer », signature, paraphe, PDF toujours, aperçus jusqu'à la dernière page. */
  const renderOptions = (doc: Doc, budget: number | undefined, overlays = doc.overlays): RenderOptions =>
    sign
      ? {
          masks: doc.masks,
          maxBytes: budget,
          overlays,
          overlayImages: sigReady ? { signature: sigReady.bitmap } : undefined,
          initialsEveryPage: initials,
          forcePdf: true,
          previewPages: signPreviewPages,
        }
      : { masks: doc.masks, maxBytes: budget };
  const render = sign ? renderFile : watermarkFile;
  // Trié : réordonner la liste ne change pas la clé, donc ne relance pas
  // le filigrane. L'ordre n'intervient qu'au moment du PDF unique.
  const fileKey = docs
    .map((d) => d.id)
    .sort()
    .join("|");
  // Change à chaque déverrouillage soumis ou masque modifié : relance le
  // traitement sans toucher aux documents déjà prêts (protégés par stampedWith).
  const unlockKey = docs
    .map((d) => `${d.id}:${d.tries ?? 0}:${masksKey(d.masks)}${sign ? `:${d.overlays ? overlaysKey(d.overlays) || "-" : ""}` : ""}`)
    .sort()
    .join("|");
  // Réglage courant, lu à la fin d'un assemblage long (si le texte a changé
  // entre-temps, le fichier porterait l'ancien filigrane) et à l'arrêt d'un lot.
  const stampRef = useRef(stamp);
  stampRef.current = stamp;
  /** Document de l'aperçu (calculé plus bas), rendu en premier par la file. */
  const shownIdRef = useRef<string | undefined>(undefined);
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

  // Mode « signer » : image de la signature remplacée. L'ancienne est fermée
  // (.close()) dès qu'aucun rendu ni téléchargement ne peut plus la peindre.
  const sigLive = useRef<SigReady | null>(null);
  // Rapport largeur / hauteur de l'image sur lequel les placements sont
  // calés. Gardé quand la signature est effacée (null) : la suivante recale
  // les boîtes depuis ce rapport, sinon elle serait étirée dans l'ancienne.
  const fitAspect = useRef<number | null>(null);
  const retired = useRef(new Set<ImageBitmap>());
  const bundlingRef = useRef(false);
  const flushRetired = () => {
    if (inFlight.current.size || bundlingRef.current) return;
    retired.current.forEach((b) => b.close());
    retired.current.clear();
  };
  useEffect(() => {
    if (!sign) return;
    let live = true;
    const replace = (next: SigReady | null) => {
      const old = sigLive.current;
      // Même image (même PNG : espace ajoutée en fin de nom, encre reprise…) :
      // on garde l'ancienne. La retirer fermerait un bitmap qu'un passage de
      // la file, lancé avec ce même réglage, s'apprête encore à peindre.
      if (next && old && next.key === old.key) {
        next.bitmap.close();
        return;
      }
      sigLive.current = next;
      setSigReady(next);
      if (old) {
        retired.current.add(old.bitmap);
        flushRetired();
      }
      // Autre rapport largeur / hauteur : chaque placement garde sa largeur
      // et son bord bas, la hauteur suit la nouvelle image. Depuis le dernier
      // rapport connu, même si la signature a été effacée entre-temps.
      if (!next) return;
      const before = fitAspect.current;
      const after = next.sig.width / next.sig.height;
      fitAspect.current = after;
      if (before && Math.abs(before - after) > 1e-6) {
        setDocs((prev) => prev.map((d) => (d.overlays ? { ...d, overlays: refitOverlays(d.overlays, before, after) } : d)));
      }
    };
    if (!signature) {
      if (sigLive.current) replace(null);
      return;
    }
    Promise.all([signatureKey(signature), signatureBitmap(signature)]).then(
      ([key, bitmap]) => {
        if (live) replace({ sig: signature, key, bitmap });
        else bitmap.close();
      },
      () => live && replace(null)
    );
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, sign]);
  useEffect(
    () => () => {
      retired.current.forEach((b) => b.close());
      sigLive.current?.bitmap.close();
    },
    []
  );

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
              // Mode « signer » : signature effacée puis refaite, les masques et
              // les placements de chaque document restent.
              ...(sign ? { masks: d.masks, overlays: d.overlays } : {}),
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
      // Le document affiché d'abord : l'aperçu se met à jour sans attendre les autres.
      const queue = prevDocs.current
        .slice()
        .sort((a, b) => Number(b.id === shownIdRef.current) - Number(a.id === shownIdRef.current));
      for (const queued of queue) {
        if (cancelled) return;
        let doc = queued;
        let own = docStamp(doc, stamp);
        // Échec déjà constaté avec ce réglage et cet essai : inutile de retenter.
        if (doc.error && doc.failedWith === attemptKey(doc, own)) continue;
        // Mode « signer », document jamais placé (ou remis « à sa place par
        // défaut ») : signature posée d'office en bas à droite de la dernière
        // page. AVANT le test « déjà à jour » : un rendu précédent, fait sans
        // signature, ne doit pas dispenser de la reposer. Format de la page lu
        // sans rendu, pour que le premier rendu soit déjà le bon.
        if (sign && sigReady && !doc.overlays) {
          try {
            const last = await lastPageAspect(doc.file, doc.password);
            // Signature changée entre-temps : le passage suivant recalcule (avec
            // le rapport de la nouvelle image, que le recalage n'aurait pas vu).
            if (cancelled || sigLive.current !== sigReady) return;
            const overlays: PageOverlays = {
              [last.pageCount - 1]: [
                { rect: defaultPlacement(last.aspect, sigReady.sig.width / sigReady.sig.height), image: "signature" },
              ],
            };
            doc = { ...doc, overlays };
            own = docStamp(doc, stamp);
            update(doc.id, { overlays });
          } catch (e) {
            if (cancelled) return;
            const key = e instanceof Error ? (e.message as ErrorKey) : "";
            update(doc.id, {
              status: "error",
              result: undefined,
              stampedWith: undefined,
              error: t.errors[key as ErrorKey] ? (key as ErrorKey) : "generic",
              failedWith: attemptKey(doc, own),
              progress: undefined,
            });
            continue;
          }
        }
        if (doc.result && doc.stampedWith === own) continue;
        // Déjà en cours, lancé par un passage précédent avec ce même réglage :
        // il se termine de lui-même et publie son résultat.
        if (
          [...inFlight.current].some(
            (j) => j.id === doc.id && j.stamp === own && !j.aborter.signal.aborted
          )
        )
          continue;
        // Signature remplacée depuis le début de ce passage : son image a pu
        // être fermée entre deux documents. Le passage suivant (réglage changé)
        // reprend avec la nouvelle.
        if (sign && sigLive.current !== sigReady) return;
        const job = { id: doc.id, stamp: own, tries: doc.tries ?? 0, aborter: new AbortController() };
        inFlight.current.add(job);
        // Un travail en cours publie son résultat même si ce passage a été
        // remplacé ; seul l'abandon (réglage changé, document retiré) l'en empêche.
        const keep = () =>
          !job.aborter.signal.aborted && liveDocs.current.some((d) => d.id === doc.id);
        patch(doc.id, { status: "processing", error: undefined, failedWith: undefined });
        try {
          const result = await render(
            doc.file,
            previewText,
            (done, total) => keep() && update(doc.id, { progress: [done, total] }),
            doc.password,
            job.aborter.signal,
            liveStyle,
            renderOptions(doc, maxBytes)
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
          flushRetired();
        }
      }
    }, 500);
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
    // Dépendances volontairement restreintes : `t` est lu ici mais ne doit
    // pas relancer le lot (changer de langue retraiterait mille documents pour
    // rien). `stamp` porte déjà le texte et l'apparence.
  }, [fileKey, unlockKey, stamp, meaningful]);

  // Des documents chargés seraient perdus par un rechargement accidentel :
  // rien n'est persisté, par conception (confidentialité).
  const hasDocs = docs.length > 0;
  useEffect(() => onHasDocs?.(hasDocs), [hasDocs, onHasDocs]);
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

  // Mode « signer » : un document n'est prêt que signé (signature ni retirée,
  // ni encore à reposer par la file).
  const isReady = (d: Doc) => isFresh(d, stamp) && (!sign || isPlaced(d));
  const ready = docs.filter(isReady);
  const processing = docs.some((d) => d.status === "processing");

  // Un lot volumineux ne doit pas repousser les étapes 2 et 3 hors de l'écran :
  // au-delà de LIST_COMPACT_FROM, la liste devient une zone à hauteur bornée,
  // coiffée d'un résumé (progression + filtres).
  const attention = docs.filter((d) => needsAttention(d, sign));
  const doneCount = docs.filter((d) => d.status === "ready" || d.error).length;
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
          if (effFilter === "attention") return needsAttention(d, sign);
          if (effFilter === "ready") return isFresh(d, stamp) && (!sign || isPlaced(d));
          return true;
        })
        .filter((d) => !needle || d.file.name.toLocaleLowerCase(t.locale).includes(needle)),
    [docs, effFilter, needle, stamp, t.locale, sign]
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
  // Mais un réglage modifié ne le fait pas sauter d'un document à l'autre
  // (tailles différentes, page qui saute) : il reste sur celui affiché, avec
  // son aperçu précédent le temps du nouveau rendu. Seul un ajout de fichier
  // le libère.
  const sticky = useRef<{ id: string; fileKey: string } | null>(null);
  const kept =
    sticky.current?.fileKey === fileKey ? docs.find((d) => d.id === sticky.current!.id && (d.result || d.error)) : undefined;
  const shown =
    docs.find((d) => d.id === activeId) ??
    kept ??
    [...docs].reverse().find((d) => isFresh(d, stamp)) ??
    docs.find((d) => d.result || d.error);
  sticky.current = shown ? { id: shown.id, fileKey } : null;
  shownIdRef.current = shown?.id;

  const [bundling, setBundling] = useState(false);
  // Quelle étape a échoué : le message doit nommer la bonne (assemblage ou
  // chiffrement), pas se fier au mot de passe saisi au moment de l'affichage.
  const [bundleError, setBundleError] = useState<null | "export" | "encrypt" | "stale">(null);
  useEffect(() => {
    setBundleError(null);
  }, [stamp, ready.length, filePassword]);
  // Tout ce qui change le contenu d'un téléchargement : réglage de l'aperçu,
  // autres destinataires et leurs références, et chaque document prêt (dans
  // l'ordre du PDF unique) avec ses masques et sa signature. Relu à la fin
  // d'un assemblage long : la signature déplacée entre-temps rend le fichier périmé.
  const bundleKey = `${stamp}\0${format}\0${recipients.map((r) => `${r}:${trace ? refFor(r) : ""}`).join("|")}\0${ready
    .map((d) => `${d.id}\0${docStamp(d, "")}`)
    .join("|")}`;
  const bundleKeyRef = useRef(bundleKey);
  bundleKeyRef.current = bundleKey;
  const [bundleProgress, setBundleProgress] = useState("");
  const lastFileUrl = useRef<string | null>(null);
  useEffect(() => () => {
    if (lastFileUrl.current) URL.revokeObjectURL(lastFileUrl.current);
  }, []);

  type Rendered = { doc: Doc; result: WatermarkResult };
  /** Rend les documents prêts avec un autre texte (destinataire suivant, ou budget réduit). */
  const renderAll = async (text: string, budget?: (d: Doc) => number | undefined) => {
    const out: Rendered[] = [];
    try {
      for (const doc of ready) {
        const result = await render(
          doc.file,
          text,
          undefined,
          doc.password,
          undefined,
          liveStyle,
          renderOptions(doc, budget ? budget(doc) : maxBytes)
        );
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

  /**
   * Un seul bouton : un document sans destinataires multiples part tel quel
   * (chiffré si verrouillé) ; sinon un PDF unique ou un ZIP selon le format,
   * et un fichier (ou dossier) par destinataire.
   */
  const download = async () => {
    const startKey = bundleKey;
    setBundling(true);
    bundlingRef.current = true;
    setBundleError(null);
    const zipName = sign ? ts.zipName : t.zipName;
    const suffix = sign ? ts.suffix : undefined;
    let step: "export" | "encrypt" = "export";
    const targets: (string | undefined)[] = recipients.length ? recipients : [undefined];
    const kind: BundleFormat = ready.length > 1 ? format : "pdf";
    const entries: { name: string; bytes: Uint8Array; folder?: string }[] = [];
    let single: { name: string; bytes: Uint8Array; type: string } | null = null;
    try {
      for (const [i, recipient] of targets.entries()) {
        if (recipient && targets.length > 1) setBundleProgress(t.download.preparing(i + 1, targets.length, recipient));
        const text = stampFor(recipient);
        // Le destinataire de l'aperçu est déjà rendu.
        const fresh = recipient !== previewRecipient;
        const items: Rendered[] = fresh ? await renderAll(text) : ready.map((doc) => ({ doc, result: doc.result! }));
        try {
          if (ready.length === 1 && targets.length === 1) {
            const { doc, result } = items[0];
            if (filePassword) step = "encrypt";
            const file = await protectFile(result.blob, result.extension, filePassword);
            step = "export";
            const type = file.extension === "pdf" ? "application/pdf" : `image/${file.extension === "jpg" ? "jpeg" : "png"}`;
            single = { name: outName(doc, t, file.extension, suffix), bytes: file.bytes, type };
          } else if (kind === "zip") {
            // Un document à la fois : chiffrer des centaines de fichiers en
            // parallèle garderait tous les originaux et leurs copies en mémoire.
            if (filePassword) step = "encrypt";
            for (const { doc, result } of items) {
              const file = await protectFile(result.blob, result.extension, filePassword);
              entries.push({
                name: outName(doc, t, file.extension, suffix),
                bytes: file.bytes,
                folder: recipient && targets.length > 1 ? recipientSlug(recipient) : undefined,
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
            if (targets.length > 1 && recipient) {
              entries.push({ name: `${zipName}-${recipientSlug(recipient)}.pdf`, bytes });
            } else {
              single = { name: `${zipName}.pdf`, bytes, type: "application/pdf" };
            }
          }
        } finally {
          if (fresh) items.forEach((o) => releaseResult(o.result));
        }
      }
      const out = single ?? {
        name: `${zipName}.zip`,
        bytes: zipDocuments(entries),
        type: "application/zip",
      };
      const url = URL.createObjectURL(new Blob([Uint8Array.from(out.bytes)], { type: out.type }));
      if (bundleKeyRef.current !== startKey) {
        URL.revokeObjectURL(url);
        setBundleError("stale");
        return;
      }
      triggerDownload(url, out.name);
      // Gardé jusqu'au téléchargement suivant : « Télécharger à nouveau » s'en sert
      // (un navigateur peut bloquer un téléchargement lancé trop tard après le clic).
      if (lastFileUrl.current) URL.revokeObjectURL(lastFileUrl.current);
      lastFileUrl.current = url;
      // Mode « signer » : empreinte de chaque fichier produit (dans le ZIP, chaque PDF).
      let fingerprints: FingerprintItem[] | undefined;
      if (sign) {
        const files = single ? [{ name: out.name, bytes: out.bytes }] : entries.map((e) => ({ name: e.folder ? `${e.folder}/${e.name}` : e.name, bytes: e.bytes }));
        fingerprints = await Promise.all(files.map(async (f) => ({ name: f.name, hash: await sha256Hex(f.bytes) })));
      }
      setDone({
        fingerprints,
        file: { url, name: out.name },
        files: single ? [out.name] : entries.map((e) => (e.folder ? `${out.name} › ${e.folder}/${e.name}` : `${out.name} › ${e.name}`)),
        copies: targets.length,
        password: filePassword,
        isWords: isWords && !ownPassword,
        codes: trace ? targets.map((r) => ({ name: r ?? t.trace.self, code: refFor(r ?? "") })) : [],
        date: today(),
      });
    } catch {
      setBundleError(step);
    } finally {
      setBundling(false);
      bundlingRef.current = false;
      flushRetired();
      setBundleProgress("");
    }
  };

  // Taille du fichier produit : somme des documents (PDF unique) ou le plus
  // gros (ZIP). Le chiffrement n'ajoute que quelques octets.
  const sizes = ready.map((d) => d.result!.blob.size);
  const estimate = !sizes.length ? null : ready.length > 1 && format === "zip" ? Math.max(...sizes) : sizes.reduce((a, b) => a + b, 0);
  const hiddenCount = docs.reduce((n, d) => n + Object.values(d.masks ?? {}).reduce((m, list) => m + list.length, 0), 0);
  const summary = [
    // Mode « signer » : une seule copie, toujours ; le dire n'apprend rien.
    ...(sign ? [] : [t.summary.copies(Math.max(1, recipients.length))]),
    ...(ready.length > 1 ? [t.summary.docs(ready.length, format === "zip")] : []),
    t.summary.hidden(hiddenCount),
    filePassword ? t.summary.locked : t.summary.notLocked,
    ...(sizeMb ? [t.summary.under(sizeMb)] : []),
  ].join(" · ");
  // En mode masquage, les zones tracées ne sont pas encore appliquées : « Terminé » d'abord.
  const fresh = !!shown && isFresh(shown, stamp);
  const canDownload = ready.length > 0 && !bundling && !processing && tool !== "hide";
  const downloadLabel = bundling
    ? bundleProgress || (filePassword ? t.filePassword.encrypting : t.processingGeneric)
    : recipients.length > 1
      ? t.download.copies(recipients.length)
      : t.download.one;
  const unplaced = sign && docs.some(needsPlacement);
  const downloadHint = !docs.length
    ? t.needDoc
    : !meaningful
      ? sign
        ? ts.needSignature
        : t.needText
      : unplaced
        ? ts.needPlacement
        : summary;

  const startOver = () => {
    clearAll();
    setPurpose("");
    setFields([""]);
    setCustom(false);
    setCustomText("");
    setLock(false);
    setLockPassword("");
    setOwnPassword(false);
    setIsWords(false);
    if (sign) {
      setSignature(null);
      setPadKey((k) => k + 1);
      setInitials(false);
      setWithWatermark(false);
    }
    window.scrollTo({ top: 0 });
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

  // Sur téléphone : une étape à la fois. Sur ordinateur (lg), tout est visible.
  const onPhone = (s: Step) => (step === s ? "" : "max-lg:hidden");
  const reachable = (s: Step) => s === 1 || (s === 2 && docs.length > 0) || (s === 3 && docs.length > 0 && meaningful);
  const firstRecipient = recipients.length > 1 ? recipients[0] : undefined;
  const codes = trace ? fields.map((f) => refFor(cleanRecipients([f])[0] ?? "")) : undefined;

  return (
    <div ref={toolRef} className="mx-auto w-full max-w-7xl scroll-mt-4 pb-24 lg:pb-0">
      {dragging && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-encre/40 p-6 backdrop-blur-sm">
          <div className="rounded-2xl border-2 border-dashed border-white bg-feuille px-8 py-6 text-center text-lg font-semibold shadow-xl">
            {t.dropAnywhere}
          </div>
        </div>
      )}

      {/* Barre d'étapes, téléphone et tablette seulement. */}
      <nav aria-label={t.tour.stepOf(step, 3)} className="mb-4 flex gap-1.5 lg:hidden">
        {([1, 2, 3] as Step[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => reachable(s) && goTo(s)}
            disabled={!reachable(s)}
            aria-current={step === s ? "step" : undefined}
            className={`flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full px-2 text-sm transition-colors ${
              step === s
                ? "bg-encre font-semibold text-white"
                : reachable(s)
                  ? "bg-encre/10 text-encre"
                  : "bg-encre/5 text-encre-2/60"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-xs ${
                step === s ? "text-encre" : "text-encre-2"
              }`}
            >
              {s}
            </span>
            <span className="truncate">{labels.stepShort[s - 1]}</span>
          </button>
        ))}
      </nav>

      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[400px_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[460px_minmax(0,1fr)] 2xl:grid-cols-[520px_minmax(0,1fr)]">
        <div className="flex flex-col gap-8">
          <section aria-label={labels.step1} className={onPhone(1)}>
            <div className="flex items-center justify-between gap-3">
              <StepLabel n={1} active={docs.length === 0}>
                {labels.step1}
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
                aria-label={labels.inputAria}
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
                done={doneCount}
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
                  compact ? "max-h-[60vh] overflow-y-auto overscroll-contain pe-1 sm:max-h-[26rem]" : ""
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
                      placeMissing={sign && needsPlacement(doc)}
                    />
                  );
                })}
              </ul>
            )}
          </section>

          <section aria-label={labels.step2} data-tour="details" className={onPhone(2)}>
            <StepLabel n={2} active={docs.length > 0 && !meaningful} phoneHidden>
              {labels.step2}
            </StepLabel>
            {sign && !meaningful && <p className="mt-1 text-sm text-encre-2 max-lg:mb-3 lg:ms-10">{ts.pad.empty}</p>}
            <div className="lg:mt-4">
              {sign ? (
                <SignaturePad key={padKey} onChange={setSignature} />
              ) : (
              <StampDetails
                purpose={purpose}
                onPurpose={setPurpose}
                fields={fields}
                onFields={(next) => {
                  setFields(next);
                  setView(0);
                }}
                custom={custom}
                customText={customText}
                onCustomText={setCustomText}
                onEnterCustom={() => {
                  setCustomText(
                    (prev) => prev || [purpose.trim(), tokens.recipient, tokens.date].filter(Boolean).join(t.stampSep)
                  );
                  setCustom(true);
                }}
                onExitCustom={() => setCustom(false)}
                preview={meaningful ? stampFor(recipients[0]) : ""}
                previewFor={firstRecipient}
                codes={codes}
                onRenewCodes={() => {
                  refs.current = new Map();
                  renewRefs((n) => n + 1);
                }}
              />
              )}
            </div>
          </section>
        </div>

        <section
          id="apercu"
          data-tour="result"
          aria-label={labels.step3}
          className={`flex min-w-0 scroll-mt-4 flex-col gap-4 ${onPhone(3)}`}
        >
          <StepLabel n={3} active={ready.length > 0} phoneHidden>
            {labels.step3}
          </StepLabel>

          {/* Mode « signer » : un document à replacer n'est pas prêt, mais doit rester choisissable. */}
          {((sign ? docs.length : ready.length) > 1 || recipients.length > 1) && meaningful && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-encre-2">
              {docs.length > 1 && (
                <label className="inline-flex items-center gap-2">
                  {t.stepShort[0]}
                  <select
                    value={shown?.id ?? ""}
                    onChange={(e) => setActiveId(e.target.value)}
                    className="max-w-[14rem] rounded-lg border border-trait bg-feuille px-2 py-1.5 text-encre"
                  >
                    {docs.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.file.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {recipients.length > 1 && (
                <label className="inline-flex items-center gap-2">
                  {t.stampCard.titleFor("").trim()}
                  <select
                    value={viewIndex}
                    onChange={(e) => setView(Number(e.target.value))}
                    className="max-w-[14rem] rounded-lg border border-trait bg-feuille px-2 py-1.5 text-encre"
                  >
                    {recipients.map((r, i) => (
                      <option key={r} value={i}>
                        {r}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
          )}

          <div>
            {sign && (docs.length === 0 || !meaningful) ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-2xl border border-trait bg-feuille px-6 text-center text-encre-2">
                <p>{docs.length === 0 ? t.emptyStart : ts.pad.empty}</p>
              </div>
            ) : docs.length === 0 || !meaningful ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 rounded-2xl border border-trait bg-feuille px-6 text-center text-encre-2">
                <div className="w-full max-w-[280px] -rotate-2">
                  <SpecimenCard title={t.about.specimenCard} specimen={t.about.specimen}>
                    <WatermarkLayer text={meaningful ? previewText : exampleStamp(t)} style={style} />
                  </SpecimenCard>
                </div>
                <p>{docs.length === 0 ? t.emptyStart : t.emptyText}</p>
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
              <div role="alert" className="rounded-2xl border border-sceau/40 bg-sceau/5 px-5 py-4 text-sceau-fonce">
                {t.docError(shown.file.name, t.errors[shown.error])}
              </div>
            ) : shown?.result ? (
              <>
                {shown.result.overBudget && sizeMb > 0 && (
                  <p role="status" className="mb-3 rounded-xl border border-amber-600/40 bg-amber-500/10 px-4 py-2 text-sm text-amber-900">
                    {t.size.over(sizeMb)}
                  </p>
                )}
                {/* Pendant un nouveau rendu (réglage changé), l'aperçu précédent
                    reste affiché : rien ne saute, et les panneaux ouverts sous
                    l'aperçu restent ouverts. */}
                <Kiosk
                  key={shown.id}
                  doc={shown}
                  onMasks={(masks) => setMasks(shown.id, masks)}
                  maskEditing={tool === "hide" && fresh}
                  onMaskEditing={(on) => setTool(on ? "hide" : null)}
                  updating={!fresh}
                  signing={
                    sign && sigReady
                      ? {
                          sigAspect: sigReady.sig.width / sigReady.sig.height,
                          bitmap: sigReady.bitmap,
                          onPlace: (page, rect) => setOverlays(shown.id, placeSignature(shown.overlays, page, rect)),
                          // Sans placement, la file la repose en bas à droite de la dernière page.
                          onReset: () => setOverlays(shown.id, undefined),
                        }
                      : undefined
                  }
                />
              </>
            ) : (
              <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-trait bg-feuille text-encre-2">
                {/* Pas d'aria-live ici : la région sr-only en fin de composant
                    annonce déjà le traitement, sans répéter chaque page. */}
                {shown
                  ? (sign ? ts : t).processingDoc(shown.file.name, shown.progress)
                  : t.processingGeneric}
              </div>
            )}
          </div>

          {shown?.result && meaningful && tool !== "hide" && (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTool("hide")}
                  disabled={!fresh}
                  className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-trait bg-white px-3 text-sm font-semibold text-encre transition-colors hover:border-bleu disabled:opacity-50"
                >
                  <HideIcon className="h-4 w-4 shrink-0" />
                  {hiddenCount ? t.tools.hidden(hiddenCount) : t.tools.hide}
                </button>
                {/* Mode « signer » : l'apparence ne concerne que le filigrane optionnel. */}
                {(!sign || withWatermark) && (
                <button
                  type="button"
                  onClick={() => setTool(tool === "adjust" ? null : "adjust")}
                  aria-expanded={tool === "adjust"}
                  className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold transition-colors ${
                    tool === "adjust" ? "border-bleu bg-bleu text-white" : "border-trait bg-white text-encre hover:border-bleu"
                  }`}
                >
                  <SlidersIcon className="h-4 w-4 shrink-0" />
                  {t.tools.adjust}
                </button>
                )}
              </div>
              {tool === "adjust" && (!sign || withWatermark) && (
                <WatermarkAppearance style={style} sample={previewText || t.style.sample} onChange={updateStyle} />
              )}
            </div>
          )}

          {sign && docs.length > 0 && meaningful && (
            <section aria-label={ts.place.initials} className="flex flex-col gap-3 rounded-2xl border border-trait bg-feuille p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={initials}
                  onChange={(e) => setInitials(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-bleu"
                />
                <span className="font-semibold">{ts.place.initials}</span>
              </label>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={withWatermark}
                  onChange={(e) => {
                    setWithWatermark(e.target.checked);
                    if (!e.target.checked && tool === "adjust") setTool(null);
                  }}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-bleu"
                />
                <span className="font-semibold">{ts.withWatermark}</span>
              </label>
              {/* Usage et un destinataire seulement : l'outil complet est sur la page d'accueil. */}
              {withWatermark && (
                <div className="ms-8 flex flex-col gap-3">
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    {t.purpose.label}
                    <input
                      type="text"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      placeholder={t.purpose.placeholder}
                      className="rounded-xl border border-trait bg-white px-3 py-2.5 text-base font-normal focus:outline-none focus:ring-2 focus:ring-bleu"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    {t.recipients.label}
                    <input
                      type="text"
                      value={fields[0] ?? ""}
                      onChange={(e) => setFields([e.target.value])}
                      placeholder={t.recipients.placeholder}
                      className="rounded-xl border border-trait bg-white px-3 py-2.5 text-base font-normal focus:outline-none focus:ring-2 focus:ring-bleu"
                    />
                  </label>
                </div>
              )}
            </section>
          )}

          {docs.length > 0 && meaningful && (
            <section aria-labelledby="before-download" className="rounded-2xl border border-trait bg-feuille p-4">
              <h3 id="before-download" className="mb-3 font-semibold">
                {t.send.title} <span className="font-normal text-encre-2">{t.send.optional}</span>
              </h3>
              <SendOptions
                multiDoc={ready.length > 1}
                multiRecipient={recipients.length > 1}
                format={format}
                onFormat={setFormat}
                lock={
                  <FilePassword
                    lock={lock}
                    onLock={updateLock}
                    password={lockPassword}
                    onChange={(p) => {
                      setLockPassword(p);
                      setIsWords(false);
                    }}
                    own={ownPassword}
                    onOwn={updateOwn}
                    isWords={isWords && !ownPassword}
                  />
                }
                zipLocked={ready.length > 1 && format === "zip" && !!filePassword}
                sizeMb={sizeMb}
                onSize={updateSize}
                estimate={estimate}
              />
            </section>
          )}

          <div className="flex flex-col gap-2" aria-busy={bundling || undefined}>
            <p className="text-sm text-encre-2">{downloadHint}</p>
            <button
              type="button"
              onClick={download}
              disabled={!canDownload}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-sceau px-6 py-3.5 font-semibold text-white transition-colors hover:bg-sceau-fonce focus:outline-none focus:ring-2 focus:ring-sceau focus:ring-offset-2 disabled:opacity-40 max-lg:hidden"
            >
              <DownloadIcon className="h-5 w-5 shrink-0" />
              <span className="truncate">{downloadLabel}</span>
            </button>
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

          {done && (
            <DonePanel
              key={done.file?.url}
              info={done}
              onClose={() => setDone(null)}
              onAnother={startOver}
              anotherLabel={sign ? ts.another : undefined}
            />
          )}
        </section>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {processing ? (sign ? ts : t).srProcessing : ready.length > 0 ? t.srReady(ready.length) : ""}
      </p>

      {!embed && (
      <HelpTour
        hasDocs={docs.length > 0}
        lifted
        revealed={step}
        hideOnPhone={step > 1}
        reveal={(i) => setStep((i + 1) as Step)}
        strings={sign ? ts.tour : undefined}
      />
      )}

      {/* Téléphone et tablette : le bouton de l'étape, toujours à portée de pouce. */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-trait bg-papier/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md flex-col gap-1.5">
          {step === 1 && (
            <button
              type="button"
              onClick={() => goTo(2)}
              disabled={!docs.length}
              className="w-full rounded-xl bg-sceau px-6 py-3.5 font-semibold text-white transition-colors hover:bg-sceau-fonce disabled:opacity-40"
            >
              {sign ? ts.next.signature : t.next.details}
            </button>
          )}
          {step === 2 && (
            <>
              <button
                type="button"
                onClick={() => goTo(3)}
                disabled={!meaningful}
                className="w-full rounded-xl bg-sceau px-6 py-3.5 font-semibold text-white transition-colors hover:bg-sceau-fonce disabled:opacity-40"
              >
                {sign ? ts.next.place : t.next.preview}
              </button>
              {!meaningful && <p className="text-center text-sm text-encre-2">{sign ? ts.pad.empty : t.needText}</p>}
            </>
          )}
          {step === 3 && (
            <button
              type="button"
              onClick={download}
              disabled={!canDownload}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-sceau px-6 py-3.5 font-semibold text-white transition-colors hover:bg-sceau-fonce disabled:opacity-40"
            >
              <DownloadIcon className="h-5 w-5 shrink-0" />
              <span className="truncate">{downloadLabel}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepLabel({
  n,
  active,
  phoneHidden,
  children,
}: {
  n: number;
  active: boolean;
  /** Sur téléphone, la barre d'étapes nomme déjà l'étape. */
  phoneHidden?: boolean;
  children: React.ReactNode;
}) {
  return (
    <h2 className={`items-center gap-3 text-lg font-semibold ${phoneHidden ? "hidden lg:flex" : "flex"}`}>
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          active ? "bg-sceau text-white" : "bg-encre/10 text-encre-2"
        }`}
      >
        {n}
      </span>
      {children}
    </h2>
  );
}
