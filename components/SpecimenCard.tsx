"use client";

import { useEffect, useRef } from "react";
import { drawWatermark } from "@/lib/watermark";

export function SpecimenCard({
  specimen,
  children,
}: {
  specimen: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative aspect-[85/54] overflow-hidden rounded-lg border border-trait bg-gradient-to-br from-white to-bleu/5 shadow-sm">
      <div className="flex items-center justify-between bg-bleu px-3 py-1.5">
        <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/90">
          Carte d&apos;identité
        </span>
        <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/70">
          {specimen}
        </span>
      </div>
      <div className="flex gap-3 p-3">
        <div className="flex h-16 w-12 shrink-0 items-end justify-center overflow-hidden rounded bg-encre/10">
          <svg viewBox="0 0 24 24" className="h-11 w-11 text-encre/25" fill="currentColor" aria-hidden>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
          </svg>
        </div>
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-2 w-3/4 rounded bg-encre/10" />
          <div className="h-2 w-1/2 rounded bg-encre/10" />
          <div className="h-2 w-2/3 rounded bg-encre/10" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 space-y-0.5 bg-white/70 px-3 py-1.5 font-mono text-[7px] leading-tight tracking-wider text-encre/40">
        <div>IDFRASPECIMEN&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
        <div>0000000000&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
      </div>
      {children}
    </div>
  );
}

export function WatermarkLayer({ text }: { text: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWatermark(ctx, canvas.width, canvas.height, text);
  }, [text]);
  return (
    <canvas
      ref={ref}
      width={740}
      height={470}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
