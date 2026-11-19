"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang, type Lang } from "@/lib/i18n";
import { SITE_COPY } from "@/lib/site-copy";
import { BRAND, DONATE_URL } from "@/lib/brand";
import LangToggle from "@/components/LangToggle";
import ShareButton from "@/components/ShareButton";
import { CloseIcon, HeartIcon, Logo, MenuIcon, PagesIcon, PencilIcon, ShieldIcon } from "@/components/icons";

export type NavKey = "tool" | "sign" | "dossier" | "about" | "guides" | "compare" | "privacy";

/**
 * Navigation commune à toutes les pages, en deux lignes qui ne se mélangent
 * pas :
 *
 * 1. le site : le nom, les pages à lire (guides, comparatifs, pourquoi,
 *    confidentialité), puis le don, le partage et la langue. Sous 1280 px,
 *    les pages à lire passent dans un menu déroulant ;
 * 2. les outils : filigraner, signer, dossier. Toujours visibles, à toutes
 *    les largeurs, celui de la page en évidence : on change d'outil d'un
 *    geste, sans ouvrir de menu.
 *
 * Sous le nom, son étymologie en quelques mots dès 1280 px (en dessous,
 * l'accueil l'affiche au-dessus du titre ; la définition complète est dans le
 * pied de page).
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

  const tools: { key: NavKey; href: string; label: string; Icon: (p: { className?: string }) => React.ReactNode }[] = [
    { key: "tool", href: `/${lang}`, label: c.tool, Icon: ShieldIcon },
    { key: "sign", href: `/${lang}/sign`, label: c.sign, Icon: PencilIcon },
    { key: "dossier", href: `/${lang}/dossier`, label: c.dossier, Icon: PagesIcon },
  ];
  const pages: { key: NavKey; href: string; label: string }[] = [
    { key: "guides", href: `/${lang}/guides`, label: c.guides },
    { key: "compare", href: `/${lang}/compare`, label: c.compare },
    { key: "about", href: `/${lang}/about`, label: c.about },
    { key: "privacy", href: `/${lang}/privacy`, label: c.privacy },
  ];

  return (
    <header className="relative z-40 mx-auto w-full max-w-7xl">
      {/* Ligne 1 : le site. */}
      <div className="relative">
        <div className="flex items-center justify-between gap-3 py-3 sm:py-4">
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

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <nav aria-label={c.menu} className="me-2 hidden items-center gap-0.5 xl:flex">
              {pages.map((i) => (
                <Link
                  key={i.key}
                  href={i.href}
                  aria-current={current === i.key ? "page" : undefined}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu ${
                    current === i.key ? "bg-bleu/10 text-bleu" : "text-encre-2 hover:bg-encre/5 hover:text-encre"
                  }`}
                >
                  {i.label}
                </Link>
              ))}
            </nav>
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-trait bg-feuille text-encre transition-colors hover:border-encre-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu xl:hidden"
            >
              {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="site-menu"
            className="absolute inset-x-0 top-full z-10 rounded-2xl border border-trait bg-feuille p-2 shadow-lg xl:hidden"
          >
            <nav aria-label={c.menu}>
              <ul className="flex flex-col">
                {pages.map((i) => (
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
      </div>

      {/* Ligne 2 : les outils. Masquée sur téléphone aux étapes 2 et 3 d'un
          outil, comme l'accroche (data-tool-aside) : seul l'outil reste à l'écran. */}
      <nav aria-label={c.tools} data-tool-aside data-testid="tool-tabs" className="flex justify-center pb-3 sm:pb-5">
        <ul className="flex w-full items-stretch gap-1 rounded-2xl border border-trait bg-feuille p-1 shadow-sm sm:w-auto sm:rounded-full">
          {tools.map(({ key, href, label, Icon }) => (
            <li key={key} className="flex min-w-0 flex-auto">
              <Link
                href={href}
                aria-current={current === key ? "page" : undefined}
                className={`flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-2.5 text-[13px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu focus-visible:ring-offset-1 sm:rounded-full sm:px-5 sm:text-sm ${
                  current === key ? "bg-bleu text-white" : "text-encre hover:bg-encre/5"
                }`}
              >
                <Icon className="hidden h-4 w-4 shrink-0 sm:block" />
                <span className="truncate">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
