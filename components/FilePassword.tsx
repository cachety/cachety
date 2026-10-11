"use client";

import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/icons";
import { copySecret } from "@/lib/clipboard";
import { useT } from "@/lib/i18n";
import {
  clampPassword,
  generateFilePassword,
  passwordIsShort,
  passwordIsStrong,
} from "@/lib/file-password";

export function FilePassword({
  password,
  onChange,
}: {
  password: string;
  onChange: (password: string) => void;
}) {
  const t = useT();
  const p = t.filePassword;
  const [visible, setVisible] = useState(false);
  // L'aide et l'avertissement de force sont reliés au champ : sans cela, un
  // lecteur d'écran n'annonce jamais qu'un mot de passe est trop faible.
  const id = useId();
  const short = passwordIsShort(password);
  const strong = passwordIsStrong(password);
  const describedBy = [`${id}-hint`, short && `${id}-weak`, strong && `${id}-strong`]
    .filter(Boolean)
    .join(" ");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    onChange(generateFilePassword());
    setVisible(true);
    setCopied(false);
  };

  const copy = async () => {
    try {
      await copySecret(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch {
      setVisible(true);
    }
  };

  return (
    <div role="group" aria-label={p.legend} className="mt-4 rounded-xl border border-trait bg-feuille p-3">
      <p className="text-sm font-medium text-encre">{p.legend}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[12rem] flex-1">
          <input
            type={visible ? "text" : "password"}
            value={password}
            onChange={(e) => {
              onChange(clampPassword(e.target.value));
              setCopied(false);
            }}
            placeholder={p.placeholder}
            aria-label={p.label}
            aria-describedby={describedBy}
            autoComplete="one-time-code"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className="w-full rounded-lg border border-trait bg-white py-1.5 ps-3 pe-9 font-mono text-base focus:outline-none focus:ring-2 focus:ring-bleu sm:text-sm"
          />
          {password && (
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              aria-label={visible ? p.hide : p.show}
              aria-pressed={visible}
              className="absolute end-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-encre-2 transition-colors hover:text-encre focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
            >
              {visible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={generate}
          className="rounded-lg border border-trait bg-feuille px-3 py-1.5 text-sm text-encre-2 transition-colors hover:border-bleu hover:text-bleu"
        >
          {p.generate}
        </button>
        {password && (
          <button
            type="button"
            onClick={copy}
            className="rounded-lg border border-trait bg-feuille px-3 py-1.5 text-sm text-encre-2 transition-colors hover:border-bleu hover:text-bleu"
          >
            {copied ? p.copied : p.copy}
          </button>
        )}
      </div>
      <p id={`${id}-hint`} className="mt-2 text-sm text-encre-2">
        {p.hint}
      </p>
      {short && (
        <p id={`${id}-weak`} role="status" className="mt-1 text-sm text-sceau-fonce">
          {p.weak}
        </p>
      )}
      {strong && (
        <p id={`${id}-strong`} className="mt-1 text-sm text-bleu">
          {p.strong}
        </p>
      )}
    </div>
  );
}
