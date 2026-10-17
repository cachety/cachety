"use client";

// Étape 2 du mode « signer » : la signature, de trois façons (onglets).
//  - Dessiner : toile transparente (fond blanc et ligne de base en CSS, sinon
//    le rognage les prendrait pour de l'encre), événements pointeur seulement,
//    traits lissés (milieux et courbes quadratiques), nets à la densité de l'écran.
//  - Taper : le nom en serif italique (le chemin au clavier, toujours offert).
//  - Importer : une photo de la signature, fond retiré (seuil réglable), encre
//    d'origine ou recolorée.
// Puis, en option, les lignes sous la signature (mention, lieu, date), dans
// la même image : un seul geste pour placer le tout.
//
// Rien n'est enregistré : ni le nom, ni le lieu, ni la mention, ni l'image.
// Seules les préférences d'affichage (encre, dernier onglet, date cochée) le sont.

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useT, type ErrorKey } from "@/lib/i18n";
import { readPrefill } from "@/lib/partners";
import { readPref, writePref } from "@/lib/storage";
import {
  BACKGROUND_THRESHOLD,
  canvas2d,
  finishSignature,
  fromFile,
  hasInk,
  INK,
  type InkId,
  makeCanvas,
  type Pixels,
  recolor,
  removeBackground,
  renderTypedSignature,
  type SignatureImage,
  signatureBitmap,
  signatureFromCanvas,
  TYPED_FONT_FAMILY,
} from "@/lib/signature";
import { composeSignBlock, composeSignatureWithBlock, signDate } from "@/lib/sign-block";
import { UndoIcon, UploadIcon } from "@/components/icons";

type Tab = "draw" | "type" | "upload";
const TABS: Tab[] = ["draw", "type", "upload"];
type UploadInk = "keep" | InkId;
const INKS: readonly InkId[] = ["black", "blue"];
const UPLOAD_INKS: readonly UploadInk[] = ["keep", "black", "blue"];

/** Point du tracé, en fractions de la LARGEUR de la toile (x et y) : la toile garde son rapport 3:1. */
type Point = { x: number; y: number };

/** Épaisseur du trait, en pixels CSS de la toile affichée. */
const STROKE_PX = 2.5;
/** Largeur de la toile d'export : le trait est redessiné à cette taille, net, avant rognage. */
const EXPORT_WIDTH = 1800;
const PAD_RATIO = 3;

const PREF_INK = "signInk";
const PREF_TAB = "signTab";
const PREF_DATE = "signDate";

const UPLOAD_ACCEPT = "image/png,image/jpeg,image/webp,image/heic,image/heif,.heic,.heif";
const UPLOAD_ERRORS: ErrorKey[] = ["unsupported", "file_too_large", "image_too_large", "image_unreadable"];

/** Trace des traits lissés : courbe quadratique d'un milieu de segment au suivant. */
function paintStrokes(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  strokes: Point[][],
  scale: number,
  lineWidth: number,
  color: string
) {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  for (const s of strokes) {
    if (!s.length) continue;
    const p = (i: number) => ({ x: s[i].x * scale, y: s[i].y * scale });
    if (s.length === 1) {
      // Un simple appui : un point, pas un trait vide.
      ctx.beginPath();
      ctx.arc(p(0).x, p(0).y, lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(p(0).x, p(0).y);
    for (let i = 1; i < s.length - 1; i++) {
      const a = p(i);
      const b = p(i + 1);
      ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
    }
    const last = p(s.length - 1);
    ctx.lineTo(last.x, last.y);
    ctx.stroke();
  }
}

/**
 * Groupe role="radio" (tabindex mobile) : un seul arrêt de Tab, sur le choix
 * coché ; les flèches changent de choix et déplacent le focus, comme des
 * boutons radio natifs (gauche et droite inversées en arabe et en persan).
 */
function radioKeys<T>(values: readonly T[], current: T, pick: (v: T) => void) {
  return (e: React.KeyboardEvent<HTMLElement>) => {
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const next = e.key === "ArrowDown" || e.key === (rtl ? "ArrowLeft" : "ArrowRight");
    const prev = e.key === "ArrowUp" || e.key === (rtl ? "ArrowRight" : "ArrowLeft");
    if (!next && !prev) return;
    e.preventDefault();
    const i = Math.max(0, values.indexOf(current));
    const j = (i + (next ? 1 : -1) + values.length) % values.length;
    pick(values[j]);
    e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]')[j]?.focus();
  };
}

/** Petit aperçu de la signature finale, dessiné depuis ses octets (pas d'URL blob:). */
function SignaturePreview({ sig, label }: { sig: SignatureImage; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let live = true;
    signatureBitmap(sig).then((bitmap) => {
      const canvas = ref.current;
      if (live && canvas) {
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
      }
      bitmap.close();
    });
    return () => {
      live = false;
    };
  }, [sig]);
  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={label}
      className="mx-auto block h-auto max-h-36 w-auto max-w-full"
      style={{ aspectRatio: `${sig.width} / ${sig.height}` }}
    />
  );
}

export function SignaturePad({
  onChange,
  prefill = false,
}: {
  onChange: (sig: SignatureImage | null) => void;
  /** Page intégrée seulement : lieu et mention lus dans le lien du partenaire. */
  prefill?: boolean;
}) {
  const t = useT();
  const s = t.sign.pad;
  const b = t.sign.block;
  const id = useId();
  const [tab, setTab] = useState<Tab>("type");
  const [ink, setInk] = useState<InkId>("black");
  const [dateOn, setDateOn] = useState(true);

  // Préférences d'affichage seulement. Sans dernier onglet connu : Dessiner
  // sur écran tactile, Taper sinon.
  useEffect(() => {
    const savedTab = readPref(PREF_TAB);
    if (TABS.includes(savedTab as Tab)) setTab(savedTab as Tab);
    else if (window.matchMedia?.("(pointer: coarse)").matches) setTab("draw");
    const savedInk = readPref(PREF_INK);
    if (savedInk === "black" || savedInk === "blue") setInk(savedInk);
    if (readPref(PREF_DATE) === "0") setDateOn(false);
  }, []);
  const chooseTab = (next: Tab) => {
    setTab(next);
    writePref(PREF_TAB, next);
  };
  const chooseInk = (next: InkId) => {
    setInk(next);
    writePref(PREF_INK, next);
  };

  // Résultat de chaque onglet, gardé quand on passe de l'un à l'autre.
  const [drawSig, setDrawSig] = useState<SignatureImage | null>(null);
  const [typeSig, setTypeSig] = useState<SignatureImage | null>(null);
  const [uploadSig, setUploadSig] = useState<SignatureImage | null>(null);

  // --- Dessiner ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Point[][]>([]);
  const current = useRef<{ pointer: number; points: Point[] } | null>(null);
  const [strokeCount, setStrokeCount] = useState(0);
  const cssWidth = useRef(600);
  const frame = useRef(0);

  const repaint = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const all = current.current ? [...strokes.current, current.current.points] : strokes.current;
      const dpr = canvas.width / Math.max(1, cssWidth.current);
      paintStrokes(ctx, all, canvas.width, STROKE_PX * dpr, INK[ink]);
    });
  }, [ink]);

  // Toile à la densité de l'écran, redimensionnée avec le panneau.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fit = () => {
      const box = canvas.getBoundingClientRect();
      if (!box.width) return;
      cssWidth.current = box.width;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(box.width * dpr);
      canvas.height = Math.round((box.width / PAD_RATIO) * dpr);
      repaint();
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [repaint]);
  useEffect(() => repaint(), [repaint, strokeCount]);

  // Signature du dessin : retracée en grand puis rognée (un trait de 2,5 px
  // agrandi après coup serait flou).
  useEffect(() => {
    if (!strokeCount) {
      setDrawSig(null);
      return;
    }
    let live = true;
    const timer = setTimeout(async () => {
      const canvas = makeCanvas(EXPORT_WIDTH, EXPORT_WIDTH / PAD_RATIO);
      try {
        paintStrokes(
          canvas2d(canvas),
          strokes.current,
          EXPORT_WIDTH,
          (STROKE_PX * EXPORT_WIDTH) / Math.max(1, cssWidth.current),
          INK[ink]
        );
        const sig = await signatureFromCanvas(canvas);
        if (live) setDrawSig(sig);
      } catch {
        if (live) setDrawSig(null);
      } finally {
        canvas.width = 0;
        canvas.height = 0;
      }
    }, 250);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [strokeCount, ink]);

  const pointOf = (e: { clientX: number; clientY: number }) => {
    const box = canvasRef.current!.getBoundingClientRect();
    return { x: (e.clientX - box.left) / box.width, y: (e.clientY - box.top) / box.width };
  };
  const endStroke = (e: React.PointerEvent) => {
    const c = current.current;
    if (!c || c.pointer !== e.pointerId) return;
    current.current = null;
    strokes.current = [...strokes.current, c.points];
    setStrokeCount(strokes.current.length);
  };

  // --- Taper ---
  const [name, setName] = useState("");
  useEffect(() => {
    if (!name.trim()) {
      setTypeSig(null);
      return;
    }
    let live = true;
    const timer = setTimeout(async () => {
      try {
        const sig = await renderTypedSignature(name, INK[ink]);
        if (live) setTypeSig(sig);
      } catch {
        if (live) setTypeSig(null);
      }
    }, 250);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [name, ink]);

  // --- Importer ---
  const [uploaded, setUploaded] = useState<{ name: string; pixels: Pixels } | null>(null);
  const [uploadError, setUploadError] = useState<ErrorKey | null>(null);
  const [removeBg, setRemoveBg] = useState(true);
  const [threshold, setThreshold] = useState<number>(BACKGROUND_THRESHOLD.fallback);
  const [uploadInk, setUploadInk] = useState<UploadInk>("keep");
  const [uploadEmpty, setUploadEmpty] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const pickFile = async (file: File | undefined) => {
    if (!file) return;
    setUploadError(null);
    try {
      setUploaded({ name: file.name, pixels: await fromFile(file) });
    } catch (e) {
      const key = e instanceof Error ? (e.message as ErrorKey) : "image_unreadable";
      setUploadError(UPLOAD_ERRORS.includes(key) ? key : "image_unreadable");
    }
  };

  useEffect(() => {
    setUploadEmpty(false);
    if (!uploaded) {
      setUploadSig(null);
      return;
    }
    let live = true;
    // Curseur : l'aperçu suit sans recalculer à chaque pas.
    const timer = setTimeout(async () => {
      let px = removeBg ? removeBackground(uploaded.pixels, threshold) : uploaded.pixels;
      if (uploadInk !== "keep") px = recolor(px, INK[uploadInk]);
      if (!hasInk(px)) {
        if (live) {
          setUploadSig(null);
          setUploadEmpty(true);
        }
        return;
      }
      try {
        const sig = await finishSignature(px);
        if (live) setUploadSig(sig);
      } catch {
        if (live) setUploadSig(null);
      }
    }, 120);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [uploaded, removeBg, threshold, uploadInk]);

  // --- Lignes sous la signature ---
  const [place, setPlace] = useState("");
  const [mention, setMention] = useState("");
  // Lien pré-rempli (partenaires approuvés, page intégrée seulement) : lieu et
  // mention, modifiables par le visiteur. Sur cachety.com, un lien quelconque
  // ne doit pas pouvoir glisser une mention dans l'image de la signature.
  useEffect(() => {
    if (!prefill) return;
    const fromLink = readPrefill(window.location.hash);
    if (fromLink.place) setPlace(fromLink.place);
    if (fromLink.note) setMention(fromLink.note);
  }, [prefill]);
  // Date du jour lue après le montage : le HTML statique est construit un
  // autre jour (il afficherait la date du build, puis changerait au chargement).
  const [today, setToday] = useState("");
  useEffect(() => setToday(signDate(t.locale)), [t.locale]);
  const date = dateOn ? today : "";
  const placeLine = place.trim() && date ? t.onDate(place.trim(), date) : place.trim() || date;
  const lines = composeSignBlock({ mention, place: placeLine });
  const linesKey = lines.join("\n");

  const base = tab === "draw" ? drawSig : tab === "type" ? typeSig : uploadSig;
  const blockInk: InkId = tab === "upload" ? (uploadInk === "keep" ? "black" : uploadInk) : ink;
  const [final, setFinal] = useState<SignatureImage | null>(null);
  const emit = useRef(onChange);
  emit.current = onChange;
  useEffect(() => {
    if (!base) {
      setFinal(null);
      emit.current(null);
      return;
    }
    let live = true;
    const timer = setTimeout(async () => {
      try {
        const sig = await composeSignatureWithBlock(base, linesKey ? linesKey.split("\n") : [], blockInk);
        if (!live) return;
        setFinal(sig);
        emit.current(sig);
      } catch {
        if (!live) return;
        setFinal(base);
        emit.current(base);
      }
    }, linesKey ? 200 : 0);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [base, linesKey, blockInk]);

  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ draw: null, type: null, upload: null });
  const onTabKey = (e: React.KeyboardEvent) => {
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const i = TABS.indexOf(tab);
    const next =
      e.key === "Home" ? TABS[0] : e.key === "End" ? TABS[TABS.length - 1] : step ? TABS[(i + (rtl ? -step : step) + 3) % 3] : null;
    if (!next) return;
    e.preventDefault();
    chooseTab(next);
    tabRefs.current[next]?.focus();
  };

  const inkChoice = (value: InkId | "keep", selected: boolean, onPick: () => void) => (
    <button
      key={value}
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      onClick={onPick}
      className={`inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu ${
        selected ? "border-bleu bg-bleu/5 font-semibold text-encre" : "border-trait bg-white text-encre-2 hover:border-bleu"
      }`}
    >
      {value !== "keep" && (
        <span aria-hidden className="h-4 w-4 rounded-full border border-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]" style={{ backgroundColor: INK[value] }} />
      )}
      {value === "keep" ? s.inkKeep : value === "black" ? s.inkBlack : s.inkBlue}
    </button>
  );

  const inputClass =
    "w-full rounded-xl border border-trait bg-white px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-bleu";

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-trait bg-feuille p-4">
        <div role="tablist" aria-label={s.tabsLabel} className="flex gap-1 rounded-xl bg-papier p-1">
          {TABS.map((k) => (
            <button
              key={k}
              ref={(el) => {
                tabRefs.current[k] = el;
              }}
              id={`${id}-tab-${k}`}
              type="button"
              role="tab"
              aria-selected={tab === k}
              aria-controls={`${id}-panel-${k}`}
              tabIndex={tab === k ? 0 : -1}
              onClick={() => chooseTab(k)}
              onKeyDown={onTabKey}
              className={`min-h-10 flex-1 rounded-lg px-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu ${
                tab === k ? "bg-bleu font-semibold text-white shadow-sm" : "text-encre-2 hover:bg-white hover:text-encre"
              }`}
            >
              {s[k]}
            </button>
          ))}
        </div>

        <div id={`${id}-panel-draw`} role="tabpanel" aria-labelledby={`${id}-tab-draw`} hidden={tab !== "draw"} className="mt-3">
          <p className="text-sm text-encre-2">{s.drawHint}</p>
          {/* Fond blanc et ligne de base en CSS : la toile reste transparente. */}
          <div className="relative mt-2 overflow-hidden rounded-xl border border-trait bg-white">
            <span aria-hidden className="pointer-events-none absolute inset-x-6 top-[70%] border-b border-dashed border-encre/20" />
            <canvas
              ref={canvasRef}
              role="img"
              aria-label={s.canvasLabel}
              className="relative block aspect-[3/1] w-full cursor-crosshair touch-none select-none"
              onPointerDown={(e) => {
                if (e.button > 0) return;
                e.preventDefault();
                e.currentTarget.setPointerCapture(e.pointerId);
                current.current = { pointer: e.pointerId, points: [pointOf(e)] };
                repaint();
              }}
              onPointerMove={(e) => {
                const c = current.current;
                if (!c || c.pointer !== e.pointerId) return;
                // Événements regroupés : un trait rapide garde ses courbes.
                const native = e.nativeEvent;
                const events = typeof native.getCoalescedEvents === "function" ? native.getCoalescedEvents() : [];
                for (const ev of events.length ? events : [native]) c.points.push(pointOf(ev));
                repaint();
              }}
              onPointerUp={endStroke}
              onPointerCancel={endStroke}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={!strokeCount}
              onClick={() => {
                strokes.current = strokes.current.slice(0, -1);
                setStrokeCount(strokes.current.length);
              }}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-trait bg-white px-3 text-sm text-encre transition-colors hover:border-bleu disabled:opacity-40"
            >
              <UndoIcon className="h-4 w-4" />
              {s.undo}
            </button>
            <button
              type="button"
              disabled={!strokeCount}
              onClick={() => {
                strokes.current = [];
                setStrokeCount(0);
              }}
              className="min-h-10 rounded-lg border border-trait bg-white px-3 text-sm text-encre transition-colors hover:border-bleu disabled:opacity-40"
            >
              {s.clear}
            </button>
          </div>
        </div>

        <div id={`${id}-panel-type`} role="tabpanel" aria-labelledby={`${id}-tab-type`} hidden={tab !== "type"} className="mt-3">
          <label htmlFor={`${id}-name`} className="text-sm font-medium">
            {s.typeLabel}
          </label>
          <input
            id={`${id}-name`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 80))}
            placeholder={s.typePh}
            autoComplete="off"
            spellCheck={false}
            aria-describedby={`${id}-name-hint`}
            style={{ fontFamily: TYPED_FONT_FAMILY }}
            className={`mt-1.5 ${inputClass} text-2xl italic`}
          />
          <p id={`${id}-name-hint`} className="mt-1 text-sm text-encre-2">
            {s.typeHint}
          </p>
        </div>

        <div id={`${id}-panel-upload`} role="tabpanel" aria-labelledby={`${id}-tab-upload`} hidden={tab !== "upload"} className="mt-3">
          <p className="text-sm text-encre-2">{s.uploadHint}</p>
          <input
            ref={fileRef}
            type="file"
            accept={UPLOAD_ACCEPT}
            aria-label={s.uploadButton}
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              pickFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-xl border border-trait bg-white px-4 text-sm font-semibold text-encre transition-colors hover:border-bleu"
          >
            <UploadIcon className="h-4 w-4" />
            {s.uploadButton}
          </button>
          {uploaded && <span className="ms-3 text-sm break-all text-encre-2">{uploaded.name}</span>}
          {uploadError && (
            <p role="alert" className="mt-2 text-sm text-sceau-fonce">
              {/* Plafond propre à la signature (50 Mo), pas celui des documents. */}
              {uploadError === "file_too_large" ? s.uploadTooLarge : t.errors[uploadError]}
            </p>
          )}
          {uploaded && (
            <div className="mt-3 flex flex-col gap-3">
              <div
                role="radiogroup"
                aria-label={s.removeBg}
                onKeyDown={radioKeys([true, false], removeBg, setRemoveBg)}
                className="flex flex-wrap gap-2"
              >
                {([true, false] as const).map((on) => (
                  <button
                    key={String(on)}
                    type="button"
                    role="radio"
                    aria-checked={removeBg === on}
                    tabIndex={removeBg === on ? 0 : -1}
                    onClick={() => setRemoveBg(on)}
                    className={`min-h-10 rounded-lg border px-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu ${
                      removeBg === on ? "border-bleu bg-bleu/5 font-semibold" : "border-trait bg-white text-encre-2 hover:border-bleu"
                    }`}
                  >
                    {on ? s.removeBg : s.keepBg}
                  </button>
                ))}
              </div>
              {removeBg && (
                <label className="flex flex-col gap-1 text-sm">
                  <span>{s.threshold}</span>
                  <input
                    type="range"
                    min={BACKGROUND_THRESHOLD.min}
                    max={BACKGROUND_THRESHOLD.max}
                    step={BACKGROUND_THRESHOLD.step}
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full accent-bleu"
                  />
                </label>
              )}
              <div>
                <p className="text-sm">{s.ink}</p>
                <div
                  role="radiogroup"
                  aria-label={s.ink}
                  onKeyDown={radioKeys(UPLOAD_INKS, uploadInk, setUploadInk)}
                  className="mt-1.5 flex flex-wrap gap-2"
                >
                  {UPLOAD_INKS.map((v) => inkChoice(v, uploadInk === v, () => setUploadInk(v)))}
                </div>
              </div>
              {uploadEmpty && (
                <p role="status" className="text-sm text-amber-900">
                  {s.empty}
                </p>
              )}
            </div>
          )}
        </div>

        {tab !== "upload" && (
          <div className="mt-3">
            <p className="text-sm">{s.ink}</p>
            <div role="radiogroup" aria-label={s.ink} onKeyDown={radioKeys(INKS, ink, chooseInk)} className="mt-1.5 flex flex-wrap gap-2">
              {INKS.map((v) => inkChoice(v, ink === v, () => chooseInk(v)))}
            </div>
          </div>
        )}

        {final && (tab !== "draw" || lines.length > 0) && (
          <div
            data-testid="signature-preview"
            className="mt-4 rounded-xl border border-trait bg-white bg-[length:16px_16px] p-3 [background-image:linear-gradient(45deg,#f1f1ee_25%,transparent_25%,transparent_75%,#f1f1ee_75%),linear-gradient(45deg,#f1f1ee_25%,transparent_25%,transparent_75%,#f1f1ee_75%)] [background-position:0_0,8px_8px]"
          >
            <SignaturePreview sig={final} label={t.sign.step2} />
          </div>
        )}
      </div>

      <fieldset className="rounded-2xl border border-trait bg-feuille p-4">
        <legend className="px-1 font-semibold">{b.title}</legend>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={dateOn}
            onChange={(e) => {
              setDateOn(e.target.checked);
              writePref(PREF_DATE, e.target.checked ? "1" : "0");
            }}
            className="h-5 w-5 shrink-0 accent-bleu"
          />
          <span>
            {b.date} <span className="text-sm text-encre-2">({b.dateToday}
              {today && `, ${today}`})</span>
          </span>
        </label>
        <label htmlFor={`${id}-place`} className="mt-3 block text-sm font-medium">
          {b.place}
        </label>
        <input
          id={`${id}-place`}
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value.slice(0, 80))}
          placeholder={b.placePh}
          autoComplete="off"
          className={`mt-1.5 ${inputClass}`}
        />
        <label htmlFor={`${id}-mention`} className="mt-3 block text-sm font-medium">
          {b.mention}
        </label>
        <input
          id={`${id}-mention`}
          type="text"
          value={mention}
          onChange={(e) => setMention(e.target.value.slice(0, 80))}
          placeholder={b.mentionPh}
          aria-describedby={`${id}-mention-hint`}
          autoComplete="off"
          className={`mt-1.5 ${inputClass}`}
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {b.mentions.map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mention === m}
              onClick={() => setMention(mention === m ? "" : m)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                mention === m ? "border-bleu bg-bleu/5 text-encre" : "border-trait bg-white text-encre-2 hover:border-bleu"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <p id={`${id}-mention-hint`} className="mt-1.5 text-sm text-encre-2">
          {b.mentionHint}
        </p>
      </fieldset>
    </div>
  );
}
