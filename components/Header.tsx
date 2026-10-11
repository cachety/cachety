"use client";

import { useLang } from "@/lib/i18n";
import { SITE_COPY } from "@/lib/site-copy";
import { BRAND } from "@/lib/brand";
import SiteNav from "@/components/SiteNav";
import { CheckIcon, ShieldIcon } from "@/components/icons";

/**
 * En-tête de l'accueil : navigation, promesse, et rien de plus. Sur mobile
 * le bloc reste court : l'outil doit apparaître sans avoir à défiler.
 */
export default function Header() {
  const { lang } = useLang();
  const c = SITE_COPY[lang];
  const h = c.hero;
  return (
    <>
      <SiteNav current="tool" />
      <div className="mx-auto w-full max-w-3xl pb-6 pt-2 text-center sm:pb-10 sm:pt-6">
        {/* Sous 1280 px, la barre n'a pas la place pour l'étymologie du nom. */}
        <p className="mb-2 text-xs text-encre-2 sm:text-sm xl:hidden">
          <span className="font-semibold text-encre">{BRAND}</span> · {c.nav.nameShort}
        </p>
        <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{h.title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-base text-encre-2 sm:mt-4 sm:text-xl">{h.lead}</p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {h.pills.map((p, i) => (
            <li
              key={p}
              className="inline-flex items-center gap-1.5 rounded-full border border-trait bg-feuille px-3 py-1 text-sm text-encre"
            >
              {i === 2 ? (
                <ShieldIcon className="h-3.5 w-3.5 shrink-0 text-green-700" />
              ) : (
                <CheckIcon className="h-3.5 w-3.5 shrink-0 text-green-700" />
              )}
              {p}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
