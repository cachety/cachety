"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import LangToggle from "@/components/LangToggle";
import ShareButton from "@/components/ShareButton";
import { ChevronIcon, Flag, ShieldIcon } from "@/components/icons";

export default function Header() {
  const { t } = useLang();
  return (
    <header>
      <div className="sm:hidden">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 py-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <Flag className="h-5 w-7 shrink-0 rounded-sm border border-trait" />
            <h1 className="truncate text-lg font-bold tracking-tight">Filigrane Local</h1>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <ShareButton />
            <LangToggle />
          </div>
        </div>
        <div className="mx-auto -mt-2 w-full max-w-6xl pb-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-1 rounded-full border border-trait bg-feuille px-3.5 py-1.5 text-sm font-medium text-bleu transition-colors active:bg-bleu/5"
          >
            {t.about.nav}
            <ChevronIcon direction="right" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between pt-4">
          <Link
            href="/about"
            className="text-sm text-bleu underline underline-offset-4 hover:no-underline"
          >
            {t.about.nav}
          </Link>
          <div className="flex items-center gap-2">
            <ShareButton />
            <LangToggle />
          </div>
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
