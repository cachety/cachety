"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, useT, type Lang } from "@/lib/i18n";
import { SITE_META } from "@/lib/site-meta";
import { CheckIcon, ChevronDownIcon, Flag, FlagGB, FlagJP, LinkIcon } from "@/components/icons";

const LANGS: { code: Lang; name: string; tag: string; flag: typeof Flag }[] = [
  { code: "fr", name: "Français", tag: "fr-FR", flag: Flag },
  { code: "en", name: "English", tag: "en-GB", flag: FlagGB },
  { code: "ja", name: "日本語", tag: "ja-JP", flag: FlagJP },
];

export default function LangToggle() {
  const { lang, setLang } = useLang();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<Lang | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus(); // sinon le focus tombe sur <body>
        return;
      }
      // Flèches : circuler entre les éléments du menu, comme un vrai menu.
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const items = [...(ref.current?.querySelectorAll<HTMLButtonElement>("[role^='menuitem']") ?? [])];
      if (!items.length) return;
      e.preventDefault();
      const i = items.indexOf(document.activeElement as HTMLButtonElement);
      const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
      items[next].focus();
    };
    // Fermer quand le focus clavier sort du composant (Tab au-delà du menu).
    const onFocusOut = (e: FocusEvent) => {
      if (ref.current && e.relatedTarget && !ref.current.contains(e.relatedTarget as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onKey);
    ref.current?.addEventListener("focusout", onFocusOut);
    const node = ref.current;
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onKey);
      node?.removeEventListener("focusout", onFocusOut);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  // Copie le lien d'accueil qui impose cette langue (interface et aperçu
  // du lien partagé), sans avoir besoin de changer la langue affichée.
  const copyLink = async (code: Lang) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${SITE_META[code].path}`);
    } catch {
      return;
    }
    setCopiedCode(code);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div ref={ref} className="relative">
      <button
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.langMenu}
        className="flex items-center gap-1.5 rounded-full border border-trait bg-feuille px-2.5 py-1.5 transition-colors hover:border-encre-2"
      >
        <span className="h-4 w-6 overflow-hidden rounded-[3px] border border-black/10">
          <current.flag className="h-full w-full" />
        </span>
        <ChevronDownIcon className={`h-3.5 w-3.5 text-encre-2 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          role="menu"
          aria-label={t.langMenu}
          className="absolute right-0 z-50 mt-2 min-w-[220px] overflow-hidden rounded-xl border border-trait bg-feuille py-1 shadow-lg"
        >
          {LANGS.map(({ code, name, tag, flag: FlagIcon }) => {
            const active = lang === code;
            return (
              <li
                key={code}
                className={`flex items-center transition-colors ${
                  active ? "bg-bleu/5" : "hover:bg-encre/5"
                }`}
              >
                <button
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setLang(code);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className="flex min-w-0 flex-1 items-center gap-3 py-2 pl-3 pr-1 text-left"
                >
                  <span className="h-4 w-6 shrink-0 overflow-hidden rounded-[3px] border border-black/10">
                    <FlagIcon className="h-full w-full" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-encre">{name}</span>
                  <span className="text-xs text-encre-2 tabular-nums">{tag}</span>
                  <CheckIcon className={`h-4 w-4 text-bleu ${active ? "" : "invisible"}`} />
                </button>
                <button
                  role="menuitem"
                  onClick={() => copyLink(code)}
                  aria-label={t.shareLang(name)}
                  title={t.shareLang(name)}
                  className="mr-2 shrink-0 rounded-md p-1.5 text-encre-2 transition-colors hover:bg-encre/10 hover:text-encre"
                >
                  {copiedCode === code ? (
                    <CheckIcon className="h-4 w-4 text-green-700" />
                  ) : (
                    <LinkIcon className="h-4 w-4" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
