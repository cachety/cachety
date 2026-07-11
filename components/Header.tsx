"use client";

import { useLang, type Lang } from "@/lib/i18n";
import { Flag, FlagGB, ShieldIcon } from "@/components/icons";

const LANGS: { code: Lang; label: string; flag: typeof Flag }[] = [
  { code: "fr", label: "Français", flag: Flag },
  { code: "en", label: "English", flag: FlagGB },
];

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Langue / Language"
      className="flex items-center gap-0.5 rounded-full border border-trait bg-feuille p-0.5"
    >
      {LANGS.map(({ code, label, flag: FlagIcon }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            aria-label={label}
            aria-pressed={active}
            title={label}
            className={`flex h-5 w-7 items-center justify-center overflow-hidden rounded-full transition ${
              active
                ? "ring-2 ring-bleu ring-offset-1 ring-offset-feuille"
                : "opacity-40 hover:opacity-80"
            }`}
          >
            <FlagIcon className="h-full w-full" />
          </button>
        );
      })}
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
            {t.taglinePre}{" "}
            <strong className="text-encre">{t.taglineStrong}</strong>.
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
