"use client";

// « Verrouiller avec un mot de passe » : une case à cocher. Le mot de passe
// est créé pour l'utilisateur (12 mots BIP39, 132 bits) et montré après le
// téléchargement, là où il sert. Son propre mot de passe, le générateur
// 256 bits et l'explication restent derrière un lien.

import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/icons";
import { useT } from "@/lib/i18n";
import { clampPassword, generateFilePassword, passwordIsShort, passwordIsStrong } from "@/lib/file-password";

/** Liste de mots chargée seulement quand on verrouille un fichier. */
export const makePassphrase = () => import("@/lib/passphrase").then((m) => m.generatePassphrase());

export function FilePassword({
  lock,
  onLock,
  password,
  onChange,
  own,
  onOwn,
  isWords,
}: {
  lock: boolean;
  onLock: (on: boolean) => void;
  password: string;
  onChange: (password: string) => void;
  /** Mot de passe choisi par l'utilisateur plutôt que créé pour lui. */
  own: boolean;
  onOwn: (own: boolean) => void;
  /** Vrai si le mot de passe est une phrase de 12 mots créée ici. */
  isWords: boolean;
}) {
  const t = useT();
  const p = t.filePassword;
  const id = useId();
  const [visible, setVisible] = useState(true);
  const [why, setWhy] = useState(false);
  const short = passwordIsShort(password);
  const strong = isWords || passwordIsStrong(password);
  const describedBy = [short && `${id}-weak`, strong && `${id}-strong`].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={lock}
          onChange={(e) => onLock(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-bleu"
        />
        <span>
          <span className="block font-semibold">{p.lock}</span>
          <span className="mt-0.5 block text-sm text-encre-2">{own ? p.lockHelpOwn : p.lockHelp}</span>
        </span>
      </label>
      {lock && (
        <div className="ms-8 mt-2 flex flex-col gap-2">
          {own && (
            <>
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  value={password}
                  onChange={(e) => onChange(clampPassword(e.target.value))}
                  placeholder={p.placeholder}
                  aria-label={p.label}
                  aria-describedby={describedBy}
                  autoComplete="one-time-code"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  className="w-full rounded-xl border border-trait bg-white py-2.5 ps-3 pe-11 font-mono text-base focus:outline-none focus:ring-2 focus:ring-bleu"
                />
                {password && (
                  <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    aria-label={visible ? p.hide : p.show}
                    aria-pressed={visible}
                    className="absolute end-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-encre-2 transition-colors hover:text-encre focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
                  >
                    {visible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                )}
              </div>
              {short && (
                <p id={`${id}-weak`} role="status" className="text-sm text-sceau-fonce">
                  {p.weak}
                </p>
              )}
              {strong && (
                <p id={`${id}-strong`} className="text-sm text-green-800">
                  {isWords ? p.words : p.strong}
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  onChange(generateFilePassword());
                  setVisible(true);
                }}
                className="self-start py-1 text-start text-sm text-bleu underline underline-offset-2 hover:no-underline"
              >
                {p.strongest}
              </button>
            </>
          )}
          <div className="flex flex-wrap gap-x-5">
            <button
              type="button"
              onClick={() => onOwn(!own)}
              className="py-1 text-sm text-bleu underline underline-offset-2 hover:no-underline"
            >
              {own ? p.auto : p.own}
            </button>
            <button
              type="button"
              onClick={() => setWhy((v) => !v)}
              aria-expanded={why}
              className="py-1 text-sm text-bleu underline underline-offset-2 hover:no-underline"
            >
              {p.why}
            </button>
          </div>
          {why && (
            <p className="text-sm text-encre-2">
              {isWords && `${p.whyWords} `}
              {p.hint}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
