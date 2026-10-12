"use client";

// Étape 2 : à quoi sert la copie, et qui la reçoit. Le texte du filigrane
// est composé pour l'utilisateur (« motif, destinataire, date ») et affiché
// tel qu'il sera imprimé ; « Modifier le texte » le rend éditable sur place,
// avec les mots {destinataire}, {date} et {code}.

import { useId, useState } from "react";
import { useT } from "@/lib/i18n";
import { CloseIcon, PencilIcon } from "@/components/icons";
import { hasToken, MAX_RECIPIENTS } from "@/lib/stamp-text";

// Sur téléphone, seuls les premiers exemples sont affichés ; « Plus » déplie le reste.
const EXAMPLES_MOBILE = 6;
const EXAMPLES_DESKTOP = 9;
const TEXT_MAX = 120;

export function StampDetails({
  purpose,
  onPurpose,
  fields,
  onFields,
  custom,
  customText,
  onCustomText,
  onEnterCustom,
  onExitCustom,
  preview,
  previewFor,
  codes,
  onRenewCodes,
}: {
  purpose: string;
  onPurpose: (v: string) => void;
  /** Un champ par destinataire, tel que saisi (vide compris). */
  fields: string[];
  onFields: (v: string[]) => void;
  custom: boolean;
  customText: string;
  onCustomText: (v: string) => void;
  onEnterCustom: () => void;
  onExitCustom: () => void;
  /** Texte final pour le premier destinataire. */
  preview: string;
  /** Premier destinataire, s'il y en a plusieurs. */
  previewFor?: string;
  /** Code par champ (même index), quand le texte libre contient {code}. */
  codes?: string[];
  onRenewCodes: () => void;
}) {
  const t = useT();
  const p = t.purpose;
  const r = t.recipients;
  const c = t.stampCard;
  const tokens = c.tokens;
  const id = useId();
  const [allExamples, setAllExamples] = useState(false);
  const filled = fields.filter((f) => f.trim()).length;
  const trace = custom && hasToken(customText, "code", tokens);
  const sameText = custom && filled > 1 && !hasToken(customText, "recipient", tokens) && !trace;

  // En texte libre, un exemple remplace le motif en tête du texte (ou s'y ajoute).
  const pickExample = (text: string) => {
    onPurpose(text);
    if (!custom) return;
    const old = [...t.presets.map((x) => x.text), purpose].find((x) => x && customText.startsWith(x));
    const next = old ? text + customText.slice(old.length) : customText ? `${text}${t.stampSep}${customText}` : text;
    onCustomText(next.slice(0, TEXT_MAX));
  };
  const insert = (word: string) => {
    const sep = customText && !/[\s,،、，]$/.test(customText) ? t.stampSep : "";
    onCustomText(`${customText}${sep}${word}`.slice(0, TEXT_MAX));
  };
  const setField = (i: number, v: string) => onFields(fields.map((f, j) => (j === i ? v : f)));
  // Un seul bouton par ligne : il efface le nom, ou retire la ligne s'il y en a plusieurs.
  const clearField = (i: number) =>
    onFields(fields.length > 1 ? fields.filter((_, j) => j !== i) : [""]);

  const examples = t.presets.map((x, i) => {
    const on = custom ? customText.startsWith(x.text) : purpose === x.text;
    return (
      <button
        key={x.label}
        type="button"
        onClick={() => pickExample(x.text)}
        aria-pressed={on}
        className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
          on ? "border-bleu bg-bleu text-white" : "border-trait bg-feuille text-encre hover:border-bleu hover:text-bleu"
        } ${
          allExamples
            ? ""
            : i >= EXAMPLES_DESKTOP
              ? "hidden"
              : i >= EXAMPLES_MOBILE
                ? "hidden sm:inline-block"
                : ""
        }`}
      >
        {x.label}
      </button>
    );
  });

  return (
    <div className="flex flex-col">
      {!custom ? (
        <>
          <label htmlFor={`${id}-purpose`} className="font-semibold">
            {p.label}
          </label>
          <div className="relative mt-2">
            <input
              id={`${id}-purpose`}
              value={purpose}
              maxLength={80}
              onChange={(e) => onPurpose(e.target.value)}
              placeholder={p.placeholder}
              className="w-full rounded-xl border border-trait bg-feuille py-3 ps-4 pe-11 text-base focus:outline-none focus:ring-2 focus:ring-bleu"
            />
            {purpose && (
              <button
                type="button"
                onClick={() => onPurpose("")}
                aria-label={p.clear}
                className="absolute end-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-encre-2 hover:text-encre focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="font-semibold">{p.label}</p>
      )}
      <p className="mt-3 text-sm text-encre-2">{custom ? p.examplesEditing : p.examples}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {examples}
        <button
          type="button"
          onClick={() => setAllExamples((v) => !v)}
          aria-expanded={allExamples}
          className="rounded-full px-3 py-1.5 text-sm font-medium text-bleu underline-offset-2 hover:underline"
        >
          {allExamples ? (
            t.fewerPresets
          ) : (
            <>
              <span className="sm:hidden">{t.morePresets(t.presets.length - EXAMPLES_MOBILE)}</span>
              <span className="hidden sm:inline">{t.morePresets(t.presets.length - EXAMPLES_DESKTOP)}</span>
            </>
          )}
        </button>
      </div>

      <p id={`${id}-who`} className="mt-6 font-semibold">
        {r.label}
      </p>
      <p id={`${id}-who-help`} className="mt-1 text-sm text-encre-2">
        {r.help}
      </p>
      <ul aria-labelledby={`${id}-who`} className="mt-2 grid gap-2 xl:grid-cols-2">
        {fields.map((value, i) => (
          <li key={i} className="flex gap-2">
            <div className="relative min-w-0 flex-1">
              <input
                value={value}
                maxLength={60}
                onChange={(e) => setField(i, e.target.value)}
                placeholder={i === 0 ? r.placeholder : r.another}
                aria-label={r.aria(i + 1)}
                aria-describedby={i === 0 ? `${id}-who-help` : undefined}
                className={`w-full rounded-xl border border-trait bg-feuille py-3 ps-4 text-base focus:outline-none focus:ring-2 focus:ring-bleu ${
                  trace ? "pe-24" : "pe-4"
                }`}
              />
              {trace && codes?.[i] && value.trim() && (
                <span
                  title={c.codeTitle}
                  className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 rounded-full bg-sceau/10 px-2 py-0.5 font-mono text-xs font-semibold text-sceau-fonce"
                >
                  {codes[i]}
                </span>
              )}
            </div>
            {(fields.length > 1 || value) && (
              <button
                type="button"
                onClick={() => clearField(i)}
                aria-label={fields.length > 1 ? r.remove(i + 1) : r.clear}
                title={fields.length > 1 ? r.remove(i + 1) : r.clear}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-trait bg-feuille text-encre-2 transition-colors hover:border-bleu hover:text-bleu"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-1 flex flex-wrap items-center gap-x-4">
        {fields.length < MAX_RECIPIENTS ? (
          <button
            type="button"
            onClick={() => onFields([...fields, ""])}
            className="py-2 text-sm font-medium text-bleu underline underline-offset-2 hover:no-underline"
          >
            {r.add}
          </button>
        ) : (
          <span className="py-2 text-sm text-encre-2">{r.limit(MAX_RECIPIENTS)}</span>
        )}
        {filled > 1 && <span className="text-sm text-encre-2">{r.eachOwn}</span>}
      </div>

      <div className="mt-5 rounded-2xl border border-trait bg-feuille p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-encre-2">
            {previewFor ? c.titleFor(previewFor) : c.title}
          </p>
          {!custom ? (
            <button
              type="button"
              onClick={onEnterCustom}
              className="inline-flex items-center gap-1.5 py-1 text-sm font-medium text-bleu underline underline-offset-2 hover:no-underline"
            >
              <PencilIcon className="h-3.5 w-3.5" />
              {c.edit}
            </button>
          ) : (
            <button
              type="button"
              onClick={onExitCustom}
              className="py-1 text-sm font-medium text-bleu underline underline-offset-2 hover:no-underline"
            >
              {c.back}
            </button>
          )}
        </div>
        {!custom ? (
          preview ? (
            <p className="mt-2 font-mono text-base font-semibold text-sceau rtl:font-sans">{preview}</p>
          ) : (
            <p className="mt-2 text-base text-encre-2">{c.empty}</p>
          )
        ) : (
          <>
            <textarea
              value={customText}
              maxLength={TEXT_MAX}
              rows={2}
              aria-label={t.textareaAria}
              aria-describedby={`${id}-tokens`}
              onChange={(e) => onCustomText(e.target.value.replace(/\n/g, " "))}
              className="mt-2 w-full resize-y rounded-xl border border-trait bg-white px-3 py-2.5 font-mono text-base rtl:font-sans field-sizing-content focus:outline-none focus:ring-2 focus:ring-bleu"
            />
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-sm text-encre-2">{c.insert}</span>
              {[tokens.recipient, tokens.date, `${t.trace.refLabel} ${tokens.code}`].map((word) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => insert(word)}
                  className="rounded-full border border-trait bg-feuille px-2.5 py-1 font-mono text-sm text-encre hover:border-bleu hover:text-bleu"
                >
                  {word}
                </button>
              ))}
              <span className="ms-auto text-xs tabular-nums text-encre-2">
                {customText.length} / {TEXT_MAX}
              </span>
            </div>
            <p id={`${id}-tokens`} className="mt-2 text-sm text-encre-2">
              {c.tokensHelp}
            </p>
            {trace && (
              <p className="mt-1.5 text-sm text-encre-2">
                {c.codesNote}{" "}
                <button type="button" onClick={onRenewCodes} className="text-bleu underline underline-offset-2 hover:no-underline">
                  {c.newCodes}
                </button>
              </p>
            )}
            {sameText && (
              <p role="status" className="mt-2 rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-900">
                {c.sameText}
              </p>
            )}
            <p className="mt-3 border-t border-trait pt-2.5 text-sm text-encre-2">
              {previewFor ? c.willSee(previewFor) : c.willRead}{" "}
              <span className="font-mono font-semibold text-sceau rtl:font-sans">{preview || c.empty}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
