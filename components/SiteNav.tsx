"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang, type Lang } from "@/lib/i18n";
import { SITE_COPY } from "@/lib/site-copy";
import { BRAND, DONATE_URL } from "@/lib/brand";
import LangToggle from "@/components/LangToggle";
import ShareButton from "@/components/ShareButton";
import { CloseIcon, HeartIcon, Logo, MenuIcon } from "@/components/icons";

export type NavKey = "tool" | "about" | "guides" | "compare" | "privacy";

/**
 * Barre de navigation commune à toutes les pages. Sous 1280 px, les liens
 * passent dans un menu déroulant : la barre garde le logo, le don, le partage
 * et la langue, toujours à portée de pouce. Sous le nom, son étymologie en
 * quelques mots dès 1280 px (en dessous, l'accueil l'affiche au-dessus du titre ;
 * la définition complète est dans le pied de page).
 */
export default function SiteNav({
  current,
  links,
}: {
  current?: NavKey;
  /** Page équivalente dans chaque langue (pages de contenu figées au build). */
  links?: Partial<Record<Lang, string>>;
}) {
  const { lang } = useLang();
  const c = SITE_COPY[lang].nav;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const items: { key: NavKey; href: string; label: string }[] = [
    { key: "tool", href: `/${lang}`, label: c.tool },
    { key: "guides", href: `/${lang}/guides`, label: c.guides },
    { key: "compare", href: `/${lang}/compare`, label: c.compare },
    { key: "about", href: `/${lang}/about`, label: c.about },
    { key: "privacy", href: `/${lang}/privacy`, label: c.privacy },
  ];

  return (
    <header className="relative z-40 mx-auto w-full max-w-7xl">
      <div className="flex items-center justify-between gap-3 py-4">
        <Link
          href={`/${lang}`}
          className="flex min-w-0 items-center gap-2 rounded-lg sm:gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
        >
          <Logo className="h-8 w-8 shrink-0" />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-xl font-bold leading-tight tracking-tight">{BRAND}</span>
            <span className="hidden whitespace-nowrap text-[11px] leading-tight text-encre-2 xl:block">{c.nameShort}</span>
          </span>
        </Link>

        <nav aria-label={c.menu} className="hidden items-center gap-1 xl:flex">
          {items
            .filter((i) => i.key !== "tool" || current !== "tool")
            .map((i) => (
              <Link
                key={i.key}
                href={i.href}
                aria-current={current === i.key ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu ${
                  current === i.key ? "bg-bleu/10 text-bleu" : "text-encre-2 hover:bg-encre/5 hover:text-encre"
                }`}
              >
                {i.label}
              </Link>
            ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.donate}
            className="flex h-9 items-center gap-1.5 rounded-full border border-sceau/50 bg-feuille px-2.5 text-sm font-semibold text-sceau transition-colors hover:bg-sceau hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sceau sm:px-3.5"
          >
            <HeartIcon className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{c.donate}</span>
          </a>
          <ShareButton />
          <LangToggle links={links} />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? c.close : c.menu}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-trait bg-feuille text-encre transition-colors hover:border-encre-2 xl:hidden"
          >
            {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="site-menu"
          className="absolute inset-x-0 top-full rounded-2xl border border-trait bg-feuille p-2 shadow-lg xl:hidden"
        >
          <nav aria-label={c.menu}>
            <ul className="flex flex-col">
              {items.map((i) => (
                <li key={i.key}>
                  <Link
                    href={i.href}
                    onClick={() => setOpen(false)}
                    aria-current={current === i.key ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-base font-medium ${
                      current === i.key ? "bg-bleu/10 text-bleu" : "text-encre active:bg-encre/5"
                    }`}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
