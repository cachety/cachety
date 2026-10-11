"use client";

// Options de copie (étape 2) : plusieurs destinataires, copie traçable et
// taille maximale des fichiers. Composant d'affichage : l'état vit dans
// CoreProduct, qui compose le texte final (lib/stamp-text.ts).

import { useId, useState } from "react";
import { useT } from "@/lib/i18n";
import { SIZE_TARGETS_MB, type SizeTargetMb } from "@/lib/size-budget";
import { MAX_RECIPIENTS } from "@/lib/stamp-text";

export function CopyOptions({
  multi,
  onMulti,
  recipientsText,
  onRecipientsText,
  recipients,
  truncated,
  trace,
  onTrace,
  registry,
  onRenew,
  sizeMb,
  onSize,
}: {
  multi: boolean;
  onMulti: (on: boolean) => void;
  recipientsText: string;
  onRecipientsText: (text: string) => void;
  recipients: string[];
  truncated: boolean;
  trace: boolean;
  onTrace: (on: boolean) => void;
  /** Lignes du registre (destinataire → référence), déjà formatées. */
  registry: string[];
  onRenew: () => void;
  sizeMb: SizeTargetMb;
  onSize: (mb: SizeTargetMb) => void;
}) {
  const t = useT();
  const id = useId();
  const [copied, setCopied] = useState(false);

  const copyRegistry = async () => {
    try {
      await navigator.clipboard.writeText(registry.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Presse-papiers refusé : le registre reste lisible et sélectionnable à l'écran.
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-trait bg-feuille p-3">
      <Toggle checked={multi} onChange={onMulti} label={t.multi.toggle} />
      {multi && (
        <div>
          <label htmlFor={`${id}-recipients`} className="text-sm text-encre-2">
            {t.multi.label}
          </label>
          <textarea
            id={`${id}-recipients`}
            value={recipientsText}
            onChange={(e) => onRecipientsText(e.target.value)}
            placeholder={t.multi.placeholder}
            rows={3}
            aria-describedby={`${id}-recipients-count`}
            className="mt-1 w-full resize-y rounded-lg border border-trait bg-white px-3 py-2 text-base field-sizing-content focus:outline-none focus:ring-2 focus:ring-bleu sm:text-sm"
          />
          <p id={`${id}-recipients-count`} className="text-xs text-encre-2" aria-live="polite">
            {t.multi.count(recipients.length)}
            {truncated && ` · ${t.multi.limit(MAX_RECIPIENTS)}`}
          </p>
        </div>
      )}

      <Toggle checked={trace} onChange={onTrace} label={t.trace.toggle} />
      {trace && (
        <div>
          <p className="text-sm text-encre-2">{t.trace.hint}</p>
          {registry.length > 0 && (
            <>
              <p className="mt-2 text-sm font-medium text-encre">{t.trace.registry}</p>
              <ul className="mt-1 max-h-40 overflow-y-auto rounded-lg border border-trait bg-white px-3 py-2 font-mono rtl:font-sans text-xs text-encre">
                {registry.map((line) => (
                  <li key={line} className="truncate">
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copyRegistry}
                  className="rounded-lg border border-trait px-3 py-1.5 text-sm text-encre-2 transition-colors hover:border-bleu hover:text-bleu"
                >
                  {copied ? t.trace.copied : t.trace.copy}
                </button>
                <button
                  type="button"
                  onClick={onRenew}
                  className="rounded-lg border border-trait px-3 py-1.5 text-sm text-encre-2 transition-colors hover:border-bleu hover:text-bleu"
                >
                  {t.trace.renew}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={`${id}-size`} className="text-sm text-encre-2">
          {t.size.label}
        </label>
        <select
          id={`${id}-size`}
          value={sizeMb}
          onChange={(e) => onSize(Number(e.target.value) as SizeTargetMb)}
          className="rounded-lg border border-trait bg-white px-2 py-1.5 text-base focus:outline-none focus:ring-2 focus:ring-bleu sm:text-sm"
        >
          {SIZE_TARGETS_MB.map((mb) => (
            <option key={mb} value={mb}>
              {mb ? t.size.mb(mb) : t.size.none}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (on: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-encre">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span className="relative h-5 w-9 shrink-0 rounded-full bg-trait transition-colors after:absolute after:start-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:bg-bleu peer-checked:after:translate-x-4 rtl:peer-checked:after:-translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-bleu peer-focus-visible:ring-offset-1" />
      {label}
    </label>
  );
}
