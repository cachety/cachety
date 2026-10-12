"use client";

// Après le téléchargement : les fichiers produits, le mot de passe à envoyer
// à part, et la liste des codes de chaque copie. Rien n'est conservé : la
// liste peut être copiée ou enregistrée par l'utilisateur, c'est tout.

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { copySecret } from "@/lib/clipboard";
import { CheckIcon } from "@/components/icons";

export type DoneInfo = {
  files: string[];
  copies: number;
  password: string;
  isWords: boolean;
  /** Destinataire (ou libellé « sans destinataire ») et code de sa copie. */
  codes: { name: string; code: string }[];
  date: string;
};

export function DonePanel({ info, onClose, onAnother }: { info: DoneInfo; onClose: () => void; onAnother: () => void }) {
  const t = useT();
  const d = t.done;
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLElement>(null);
  // Sur téléphone, le panneau apparaît sous l'aperçu : on l'amène à l'écran.
  useEffect(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), []);
  const title = info.copies > 1 ? d.titleMany(info.copies) : info.files.length > 1 ? d.titleFiles : d.title;

  const copy = async () => {
    try {
      await copySecret(info.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch {
      setCopied(false);
    }
  };

  const saveList = () => {
    const text = info.codes.map((c) => t.trace.line(c.name, c.code, info.date)).join("\n") + "\n";
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${t.trace.listFile}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  };

  return (
    <section ref={ref} role="status" aria-labelledby="done-title" className="rounded-2xl border border-green-700/25 bg-green-700/5 p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700/15 text-green-800">
          <CheckIcon className="h-5 w-5" />
        </span>
        <div>
          <h3 id="done-title" className="text-lg font-semibold">
            {title}
          </h3>
          <p className="text-sm text-encre-2">{d.saved}</p>
        </div>
      </div>

      <ul className="mt-3 flex flex-col gap-1.5">
        {info.files.map((f) => (
          <li key={f} className="truncate rounded-lg border border-trait bg-feuille px-3 py-2 text-sm">
            {f}
          </li>
        ))}
      </ul>

      {info.password && (
        <div className="mt-4 rounded-xl border border-amber-600/30 bg-amber-50 p-3">
          <p className="font-semibold">{d.pwTitle}</p>
          <p className="mt-2 break-words rounded-lg bg-white px-3 py-2 font-mono text-base font-semibold">{info.password}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copy}
              className="rounded-lg border border-trait bg-white px-3 py-1.5 text-sm font-medium hover:border-bleu hover:text-bleu"
            >
              {copied ? t.filePassword.copied : t.filePassword.copy}
            </button>
            {info.isWords && <span className="text-xs text-amber-900">{d.pwWords}</span>}
          </div>
          <p className="mt-2 text-sm text-amber-900">{d.pwAdvice}</p>
        </div>
      )}

      {info.codes.length > 0 && (
        <div className="mt-4 rounded-xl border border-trait bg-feuille p-3">
          <p className="font-semibold">{d.codesTitle}</p>
          <p className="mt-1 text-sm text-encre-2">{d.codesKeep}</p>
          <ul className="mt-2">
            {info.codes.map((c) => (
              <li key={c.name} className="flex justify-between gap-3 border-t border-trait py-1.5 text-sm">
                <span className="min-w-0 truncate">{c.name}</span>
                <span className="font-mono text-encre-2">{c.code}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={saveList}
            className="mt-2 rounded-lg border border-trait bg-white px-3 py-1.5 text-sm font-medium hover:border-bleu hover:text-bleu"
          >
            {d.saveList}
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onAnother}
          className="rounded-xl bg-encre px-4 py-2.5 text-sm font-semibold text-white hover:bg-encre/85"
        >
          {d.another}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-trait bg-white px-4 py-2.5 text-sm font-medium hover:border-bleu hover:text-bleu"
        >
          {d.close}
        </button>
      </div>
    </section>
  );
}
