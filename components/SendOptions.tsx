"use client";

// « Avant de télécharger » : tout ce qui concerne le fichier envoyé, à côté
// du bouton qui l'envoie. Format (plusieurs documents seulement), verrou,
// taille. La taille n'est pas demandée : elle est affichée, et réduite à la
// demande, ou proposée d'office au-delà de ce qui passe dans un e-mail.

import { useState } from "react";
import { useT } from "@/lib/i18n";
import { size as formatSize } from "@/lib/doc";
import { mbToBytes, SIZE_TARGETS_MB, type SizeTargetMb } from "@/lib/size-budget";

/** Au-delà, la plupart des messageries refusent la pièce jointe. */
const EMAIL_MB = 10;

export type BundleFormat = "pdf" | "zip";

export function SendOptions({
  multiDoc,
  multiRecipient,
  format,
  onFormat,
  lock,
  zipLocked,
  sizeMb,
  onSize,
  estimate,
}: {
  multiDoc: boolean;
  multiRecipient: boolean;
  format: BundleFormat;
  onFormat: (f: BundleFormat) => void;
  /** Case « Verrouiller avec un mot de passe » et ses options. */
  lock: React.ReactNode;
  /** ZIP de PDF verrouillés : le mot de passe protège les PDF, pas l'archive. */
  zipLocked: boolean;
  sizeMb: SizeTargetMb;
  onSize: (mb: SizeTargetMb) => void;
  /** Taille du fichier produit (ou du plus gros, en ZIP), en octets. */
  estimate: number | null;
}) {
  const t = useT();
  const s = t.send;
  const z = t.size;
  const [open, setOpen] = useState(false);
  const tooBig = !sizeMb && estimate !== null && estimate > mbToBytes(EMAIL_MB);
  const limits = SIZE_TARGETS_MB.filter((mb) => mb > 0).sort((a, b) => b - a);

  return (
    <div className="flex flex-col gap-4">
      {multiDoc && (
        <div>
          <p className="text-sm text-encre-2">{multiRecipient ? s.formatEach : s.format}</p>
          <div role="radiogroup" aria-label={multiRecipient ? s.formatEach : s.format} className="mt-1.5 flex gap-1 rounded-xl bg-papier p-1">
            {(["pdf", "zip"] as const).map((f) => (
              <button
                key={f}
                type="button"
                role="radio"
                aria-checked={format === f}
                onClick={() => onFormat(f)}
                className={`min-h-10 flex-1 rounded-lg px-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu ${
                  format === f ? "bg-white font-semibold text-encre shadow-sm" : "text-encre-2 hover:text-encre"
                }`}
              >
                {f === "pdf" ? s.onePdf : s.zip}
              </button>
            ))}
          </div>
        </div>
      )}

      {lock}

      <div>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <span className="text-sm">
            {estimate !== null &&
              (multiDoc && format === "zip" ? z.largest(formatSize(estimate, t)) : z.estimate(formatSize(estimate, t)))}
            {sizeMb > 0 && ` ${z.keptUnder(sizeMb)}`}
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="py-1 text-sm font-medium text-bleu underline underline-offset-2 hover:no-underline"
          >
            {open ? z.done : z.smaller}
          </button>
        </div>
        {tooBig && !open && (
          <div className="mt-2 flex flex-wrap items-center gap-2 rounded-xl bg-amber-500/10 px-3 py-2 text-sm text-amber-900">
            <span className="flex-1">{z.tooBig(formatSize(estimate!, t))}</span>
            <button
              type="button"
              onClick={() => {
                onSize(EMAIL_MB);
                setOpen(true);
              }}
              className="rounded-lg border border-amber-700/30 bg-white px-3 py-1.5 font-medium"
            >
              {z.smaller}
            </button>
          </div>
        )}
        {open && (
          <div role="radiogroup" aria-label={z.label} className="mt-2 flex flex-col gap-1.5">
            <p className="text-sm text-encre-2">{z.intro}</p>
            {([0, ...limits] as SizeTargetMb[]).map((mb) => (
              <button
                key={mb}
                type="button"
                role="radio"
                aria-checked={sizeMb === mb}
                onClick={() => onSize(mb)}
                className={`flex min-h-10 items-baseline gap-2 rounded-xl border px-3 py-2 text-start text-sm transition-colors ${
                  sizeMb === mb ? "border-bleu bg-bleu/5" : "border-trait bg-white hover:border-bleu"
                }`}
              >
                <span className="font-semibold">{mb ? z.mb(mb) : z.none}</span>
                {mb > 0 && <span className="text-encre-2">{z.hints[mb]}</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {zipLocked && <p className="text-sm text-encre-2">{t.bundlePassword}</p>}
    </div>
  );
}
