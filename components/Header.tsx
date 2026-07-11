"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, type Lang } from "@/lib/i18n";
import { CheckIcon, ChevronDownIcon, Flag, FlagGB, FlagJP, ShieldIcon } from "@/components/icons";

const LANGS: { code: Lang; name: string; tag: string; flag: typeof Flag }[] = [
  { code: "fr", name: "Français", tag: "fr-FR", flag: Flag },
  { code: "en", name: "English", tag: "en-US", flag: FlagGB },
  { code: "ja", name: "日本語", tag: "ja-JP", flag: FlagJP },
];

function LangToggle() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Langue / Language"
        className="flex items-center gap-1.5 rounded-full border border-trait bg-feuille px-2 py-1 transition-colors hover:border-encre-2"
      >
        <span className="h-4 w-6 overflow-hidden rounded-[3px] border border-black/10">
          <current.flag className="h-full w-full" />
        </span>
        <ChevronDownIcon className={`h-3.5 w-3.5 text-encre-2 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 min-w-[190px] overflow-hidden rounded-xl border border-trait bg-feuille py-1 shadow-lg"
        >
          {LANGS.map(({ code, name, tag, flag: FlagIcon }) => {
            const active = lang === code;
            return (
              <li key={code}>
                <button
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setLang(code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-colors ${
                    active ? "bg-bleu/5" : "hover:bg-encre/5"
                  }`}
                >
                  <span className="h-4 w-6 shrink-0 overflow-hidden rounded-[3px] border border-black/10">
                    <FlagIcon className="h-full w-full" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-encre">{name}</span>
                  <span className="text-xs text-encre-2 tabular-nums">{tag}</span>
                  <CheckIcon
                    className={`h-4 w-4 text-bleu ${active ? "" : "invisible"}`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  return (
    <header>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 py-5 sm:hidden">
        <div className="flex min-w-0 items-center gap-2.5">
          <Flag className="h-5 w-7 shrink-0 rounded-sm border border-trait" />
          <h1 className="truncate text-lg font-bold tracking-tight">Filigrane Local</h1>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <a
            href="https://github.com/KazeTachinuu/filigrane-local"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 whitespace-nowrap text-sm text-bleu underline hover:no-underline"
          >
            <ShieldIcon className="h-4 w-4 shrink-0 text-green-700" />
            {t.sourceShort}
          </a>
          <LangToggle />
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="mx-auto flex w-full max-w-6xl justify-end pt-4">
          <LangToggle />
        </div>
        <div className="mx-auto w-full max-w-3xl pb-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <Flag className="h-7 w-10 rounded-sm border border-trait" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Filigrane Local
            </h1>
          </div>
          <p className="mt-4 text-xl text-encre-2 text-balance">
            {t.taglinePre}
            <strong className="text-encre">{t.taglineStrong}</strong>
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-trait bg-feuille px-4 py-1.5 text-sm text-encre-2">
            <ShieldIcon className="h-4 w-4 text-green-700" />
            {t.badge}{" "}
            <a
              href="https://github.com/KazeTachinuu/filigrane-local"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bleu underline hover:no-underline"
            >
              {t.sourceLong}
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}
