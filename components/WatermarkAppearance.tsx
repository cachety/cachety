"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { drawWatermarkRun, outlineRgba } from "@/lib/watermark";
import {
  COLOR_SWATCHES,
  DEFAULT_WATERMARK_STYLE,
  fillRgba,
  fontCss,
  fontFace,
  haloRgba,
  OPACITY_PERCENT,
  SCALE_PERCENT,
  WAVE_PERCENT,
  WATERMARK_FONTS,
  type WatermarkStyle,
} from "@/lib/watermark-style";

// Raccourcis : opacité et taille réglées ensemble (dans les bornes de lib/watermark-style.ts).
const PRESETS = {
  light: { opacity: 0.25, scale: 0.5 },
  medium: { opacity: 0.45, scale: 1 },
  strong: { opacity: 0.7, scale: 1.25 },
} as const;
type PresetId = keyof typeof PRESETS;
const near = (a: number, b: number) => Math.abs(a - b) < 0.001;

export function WatermarkAppearance({
  style,
  sample,
  onChange,
}: {
  style: WatermarkStyle;
  sample: string;
  onChange: (next: WatermarkStyle) => void;
}) {
  const t = useT();
  const s = t.style;
  const sizePercent = Math.round(style.scale * 100);
  const opacityPercent = Math.round(style.opacity * 100);
  const wavePercent = Math.round((style.wave ?? 0) * 100);
  const custom = !COLOR_SWATCHES.some((swatch) => swatch.color === style.color);

  const [more, setMore] = useState(false);
  const preset = (Object.keys(PRESETS) as PresetId[]).find(
    (k) => near(PRESETS[k].opacity, style.opacity) && near(PRESETS[k].scale, style.scale)
  );

  return (
    <div role="group" aria-label={s.legend} className="rounded-2xl border border-trait bg-feuille p-3">
      <div role="radiogroup" aria-label={s.strength} className="flex gap-1 rounded-xl bg-papier p-1">
        {(Object.keys(PRESETS) as PresetId[]).map((k) => (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={preset === k}
            onClick={() => onChange({ ...style, ...PRESETS[k] })}
            className={`min-h-10 flex-1 rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu ${
              preset === k ? "bg-bleu font-semibold text-white shadow-sm" : "text-encre-2 hover:bg-white hover:text-encre"
            }`}
          >
            {s.presets[k]}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setMore((v) => !v)}
        aria-expanded={more}
        className="mt-2 py-1 text-sm font-medium text-bleu underline underline-offset-2 hover:no-underline"
      >
        {more ? s.fewer : s.more}
      </button>
      {more && (
      <div className="mt-1">
      <div className="mt-3">
        <p id="wm-font" className="text-sm text-encre-2">
          {s.font}
        </p>
        <div role="radiogroup" aria-labelledby="wm-font" className="mt-1.5 grid grid-cols-3 gap-1.5">
          {WATERMARK_FONTS.map((id) => {
            const on = style.font === id;
            return (
              <label
                key={id}
                className={`flex cursor-pointer items-center justify-center rounded-lg border px-2 py-1.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-bleu ${
                  on
                    ? "border-bleu bg-bleu/5 font-medium text-bleu"
                    : "border-trait text-encre-2 hover:border-bleu hover:text-bleu"
                }`}
              >
                <input
                  type="radio"
                  name="watermark-font"
                  className="sr-only"
                  checked={on}
                  onChange={() => onChange({ ...style, font: id })}
                />
                <span style={{ fontFamily: fontFace(id).family }}>{s.fonts[id]}</span>
              </label>
            );
          })}
        </div>
      </div>

      <label className="mt-3 block">
        <span className="mb-1 flex items-baseline justify-between gap-3 text-sm">
          <span className="text-encre-2">{s.size}</span>
          <span className="font-medium tabular-nums text-encre">{s.percent(sizePercent)}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-xs text-encre-2" aria-hidden>
            A
          </span>
          <input
            type="range"
            min={SCALE_PERCENT.min}
            max={SCALE_PERCENT.max}
            step={SCALE_PERCENT.step}
            value={sizePercent}
            aria-label={s.size}
            aria-valuetext={s.percent(sizePercent)}
            onChange={(e) => onChange({ ...style, scale: Number(e.target.value) / 100 })}
            className="h-5 w-full cursor-pointer accent-bleu"
          />
          <span className="text-lg leading-none text-encre-2" aria-hidden>
            A
          </span>
        </span>
      </label>

      <div className="mt-3">
        <p id="wm-color" className="text-sm text-encre-2">
          {s.color}
        </p>
        <div className="mt-1.5 flex items-center gap-2" role="group" aria-labelledby="wm-color">
          {COLOR_SWATCHES.map((swatch) => {
            const on = style.color === swatch.color;
            return (
              <button
                key={swatch.id}
                type="button"
                aria-label={s.swatches[swatch.id]}
                aria-pressed={on}
                onClick={() => onChange({ ...style, color: swatch.color })}
                className={`h-7 w-7 rounded-full border border-trait focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu ${
                  on ? "ring-2 ring-bleu ring-offset-2" : ""
                }`}
                style={{ backgroundColor: swatch.color }}
              />
            );
          })}
          <label
            className={`relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-trait ${
              custom ? "ring-2 ring-bleu ring-offset-2" : ""
            }`}
          >
            <span className="sr-only">{s.customColor}</span>
            <input
              type="color"
              value={style.color}
              aria-label={s.customColor}
              onChange={(e) => onChange({ ...style, color: e.target.value })}
              className="absolute inset-0 h-[200%] w-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer border-0 p-0"
            />
          </label>
        </div>
      </div>

      <label className="mt-3 block">
        <span className="mb-1 flex items-baseline justify-between gap-3 text-sm">
          <span className="text-encre-2">{s.opacity}</span>
          <span className="font-medium tabular-nums text-encre">{s.percent(opacityPercent)}</span>
        </span>
        <input
          type="range"
          min={OPACITY_PERCENT.min}
          max={OPACITY_PERCENT.max}
          step={OPACITY_PERCENT.step}
          value={opacityPercent}
          aria-label={s.opacity}
          aria-valuetext={s.percent(opacityPercent)}
          onChange={(e) => onChange({ ...style, opacity: Number(e.target.value) / 100 })}
          className="h-5 w-full cursor-pointer accent-bleu"
        />
      </label>

      <label className="mt-3 block">
        <span className="mb-1 flex items-baseline justify-between gap-3 text-sm">
          <span className="text-encre-2">{s.wave}</span>
          <span className="font-medium tabular-nums text-encre">{s.percent(wavePercent)}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-xs text-encre-2" aria-hidden>
            —
          </span>
          <input
            type="range"
            min={WAVE_PERCENT.min}
            max={WAVE_PERCENT.max}
            step={WAVE_PERCENT.step}
            value={wavePercent}
            aria-label={s.wave}
            aria-valuetext={s.percent(wavePercent)}
            onChange={(e) => onChange({ ...style, wave: Number(e.target.value) / 100 })}
            className="h-5 w-full cursor-pointer accent-bleu"
          />
          <span className="text-lg leading-none text-encre-2" aria-hidden>
            ∿
          </span>
        </span>
      </label>

      {/* Bande claire / sombre : une encre blanche reste lisible à gauche,
          une encre sombre à droite. Ce n'est pas le document, juste le réglage. */}
      <div className="relative mt-3 h-20 overflow-hidden rounded-lg border border-trait" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-r from-feuille from-40% to-encre" />
        <WaveSample style={style} sample={sample} />
      </div>
      <button
        type="button"
        onClick={() => onChange(DEFAULT_WATERMARK_STYLE)}
        className="mt-3 py-1 text-sm font-medium text-bleu underline underline-offset-2 hover:no-underline"
      >
        {s.reset}
      </button>
      </div>
      )}
    </div>
  );
}

function WaveSample({ style, sample }: { style: WatermarkStyle; sample: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    let cancelled = false;
    const paint = () => {
      if (cancelled) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const fontSize = Math.min(28, Math.round(16 * style.scale));
      ctx.font = fontCss(style, fontSize);
      ctx.fillStyle = fillRgba(style);
      ctx.strokeStyle = haloRgba(style);
      ctx.lineWidth = Math.max(1, fontSize / 10);
      ctx.lineJoin = "round";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      drawWatermarkRun(ctx, sample, width / 2, height / 2, fontSize, style.wave ?? 0, outlineRgba(style));
    };
    // Promise.resolve : sans document.fonts, l'enchaînement optionnel sautait
    // aussi le .then, et l'aperçu ne se dessinait jamais.
    Promise.resolve(document.fonts?.load(fontCss(style, 32)))
      .catch(() => undefined)
      .then(paint);
    // Redessine à la taille réelle quand le panneau change de largeur
    // (rotation, fenêtre redimensionnée) : sinon l'aperçu reste étiré et flou.
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(paint) : null;
    observer?.observe(parent);
    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [style, sample]);
  return <canvas ref={ref} className="relative h-full w-full" />;
}
