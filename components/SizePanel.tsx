"use client";

// Mode « dossier », étape 3 : le fichier à produire (un PDF, un par section,
// un par document) et sa taille maximale. La taille est une promesse
// seulement quand l'estimation dit « tient » : sinon le panneau le dit AVANT
// le téléchargement, avec trois issues (séparer, retirer des pages, choisir
// plus grand). L'estimation vient des poids du premier rendu, sans attendre
// un second (lib/assemble.ts).
//
// Les outils filigrane et signer gardent le bloc « taille » de SendOptions.

import { useState } from "react";
import { useT } from "@/lib/i18n";
import { size as formatSize } from "@/lib/doc";
import type { OutputKind } from "@/lib/dossier-build";
import { mbToBytes, SIZE_TARGETS_MB } from "@/lib/size-budget";
import { CUSTOM_SIZE, type Dossier } from "@/components/useDossier";

const radio = (on: boolean) =>
  `min-h-10 rounded-xl border px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu ${
    on ? "border-bleu bg-bleu/5 font-semibold text-encre" : "border-trait bg-white text-encre hover:border-bleu"
  }`;

/** Un seul PDF, un par section ou un par document ; et le nom du fichier. */
export function DossierOutput({ d }: { d: Dossier }) {
  const t = useT();
  const td = t.dossier;
  const kinds: [OutputKind, string][] = [
    ["one", td.output.one],
    ["sections", td.output.sections],
    ["separate", td.output.separate],
  ];
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm text-encre-2">{td.output.label}</p>
        <div role="radiogroup" aria-label={td.output.label} className="mt-1.5 flex flex-wrap gap-1.5">
          {kinds.map(([kind, label]) => (
            <button key={kind} type="button" role="radio" aria-checked={d.output === kind} onClick={() => d.setOutput(kind)} className={radio(d.output === kind)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        {td.fileName}
        <input
          type="text"
          value={d.fileName}
          maxLength={60}
          onChange={(e) => d.setFileName(e.target.value)}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          // text-base : sous 16 px, iOS Safari zoome la page au focus.
          className="rounded-xl border border-trait bg-white px-3 py-2.5 text-base font-normal focus:outline-none focus:ring-2 focus:ring-bleu"
        />
      </label>
    </div>
  );
}

export function SizePanel({
  d,
  onPages,
}: {
  d: Dossier;
  /** « Retirer des pages », « Séparer en plusieurs fichiers » : retour à la grille des pages. */
  onPages: () => void;
}) {
  const t = useT();
  const td = t.dossier;
  const z = td.size;
  const [other, setOther] = useState(false);
  const custom = other || !d.sizeIsPreset;
  const [draft, setDraft] = useState("");
  const presets = SIZE_TARGETS_MB.filter((mb) => mb > 0);
  const target = d.sizeMb ? t.size.mb(d.sizeMb) : "";
  const estimates = d.estimates;
  const heaviest = estimates.reduce((max, e) => Math.max(max, e.bytes), 0);
  const all = estimates.reduce((sum, e) => sum + e.bytes, 0);
  const several = estimates.length > 1;
  const maxBytes = d.sizeMb ? mbToBytes(d.sizeMb) : 0;

  let headline = "";
  if (estimates.length) {
    if (!d.sizeMb) headline = several ? t.size.largest(formatSize(heaviest, t)) : t.size.estimate(formatSize(heaviest, t));
    else if (d.fit === "fits") headline = z.fits(formatSize(heaviest, t), target);
    // Le moteur remplit la cible sans la dépasser : c'est elle, la taille attendue.
    else if (d.fit === "reduced") headline = z.reduced(formatSize(Math.min(heaviest, maxBytes), t));
    else headline = z.unreachable(target);
  }
  const larger = presets.find((mb) => mb > d.sizeMb);

  return (
    <div data-testid="size-panel" data-fit={estimates.length ? d.fit : undefined} className="flex flex-col gap-2">
      <p className="text-sm">
        <span className="font-semibold">{z.title}</span>
        {d.perFile && <span className="text-encre-2"> ({z.perFile})</span>}
      </p>
      <div role="radiogroup" aria-label={z.title} className="flex flex-wrap gap-1.5">
        <button
          type="button"
          role="radio"
          aria-checked={!custom && d.sizeMb === 0}
          onClick={() => {
            setOther(false);
            d.setSize(0);
          }}
          className={radio(!custom && d.sizeMb === 0)}
        >
          {t.size.none}
        </button>
        {presets.map((mb) => (
          <button
            key={mb}
            type="button"
            role="radio"
            aria-checked={!custom && d.sizeMb === mb}
            onClick={() => {
              setOther(false);
              d.setSize(mb);
            }}
            className={radio(!custom && d.sizeMb === mb)}
          >
            {t.size.mb(mb)}
          </button>
        ))}
        <button
          type="button"
          role="radio"
          aria-checked={custom}
          onClick={() => {
            setOther(true);
            setDraft(d.sizeMb ? String(d.sizeMb) : "");
          }}
          className={radio(custom)}
        >
          {z.other}
        </button>
      </div>
      {custom && (
        <label className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-encre-2">{z.otherLabel}</span>
          <input
            type="number"
            inputMode="decimal"
            min={CUSTOM_SIZE.min}
            max={CUSTOM_SIZE.max}
            step={CUSTOM_SIZE.step}
            value={draft || (d.sizeMb ? String(d.sizeMb) : "")}
            onChange={(e) => {
              setDraft(e.target.value);
              const n = Number.parseFloat(e.target.value.replace(",", "."));
              if (Number.isFinite(n) && n >= CUSTOM_SIZE.min && n <= CUSTOM_SIZE.max) d.setSize(n);
            }}
            onBlur={() => setDraft("")}
            aria-label={z.otherLabel}
            // text-base : sous 16 px, iOS Safari zoome la page au focus.
            className="h-10 w-24 rounded-xl border border-trait bg-white px-3 text-base tabular-nums focus:outline-none focus:ring-2 focus:ring-bleu"
          />
        </label>
      )}

      {headline && (
        <p
          role="status"
          data-testid="size-estimate"
          className={`rounded-xl px-3 py-2 text-sm ${
            d.sizeMb && d.fit === "unreachable"
              ? "border border-sceau/40 bg-sceau/5 font-medium text-sceau-fonce"
              : d.sizeMb && d.fit === "reduced"
                ? "bg-amber-500/10 text-amber-900"
                : "bg-papier text-encre"
          }`}
        >
          {headline}
        </p>
      )}
      {several && (
        <ul data-testid="size-files" className="flex flex-col gap-1 text-sm text-encre-2">
          {estimates.map((e, i) => (
            <li key={`${e.name}-${i}`} data-fit={e.fit} className={d.sizeMb && e.fit === "unreachable" ? "font-medium text-sceau-fonce" : ""}>
              {z.section(e.name, formatSize(e.bytes, t))}
            </li>
          ))}
        </ul>
      )}

      {d.sizeMb > 0 && d.fit === "unreachable" && estimates.length > 0 && (
        <div data-testid="size-exits" className="flex flex-wrap gap-2">
          {d.output !== "sections" && (
            <button
              type="button"
              onClick={() => {
                d.setSplit(true);
                onPages();
              }}
              className="rounded-lg border border-trait bg-white px-3 py-2 text-sm font-medium hover:border-bleu hover:text-bleu"
            >
              {z.exits[0]}
            </button>
          )}
          <button type="button" onClick={onPages} className="rounded-lg border border-trait bg-white px-3 py-2 text-sm font-medium hover:border-bleu hover:text-bleu">
            {z.exits[1]}
          </button>
          <button
            type="button"
            onClick={() => {
              setOther(false);
              d.setSize(larger ?? 0);
            }}
            className="rounded-lg border border-trait bg-white px-3 py-2 text-sm font-medium hover:border-bleu hover:text-bleu"
          >
            {z.exits[2]}
          </button>
        </div>
      )}
      {d.sizeMb > 0 && (d.allowLow || (d.fit !== "fits" && estimates.length > 0)) && (
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input type="checkbox" checked={d.allowLow} onChange={(e) => d.setAllowLow(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-bleu" />
          <span>{z.allowLow}</span>
        </label>
      )}
      {estimates.length > 0 && d.inputBytes > 0 && all > d.inputBytes && (d.sizeMb === 0 || d.fit === "fits") && (
        <p data-testid="size-bigger" className="text-sm text-encre-2">
          {z.biggerWhy}
        </p>
      )}
    </div>
  );
}
