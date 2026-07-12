"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";
import type { Filter } from "@/lib/doc";

export function BatchSummary({
  total,
  done,
  attention,
  ready,
  filter,
  onFilter,
  query,
  onQuery,
  shownCount,
}: {
  total: number;
  done: number;
  attention: number;
  ready: number;
  filter: Filter;
  onFilter: (f: Filter) => void;
  query: string;
  onQuery: (q: string) => void;
  shownCount: number;
}) {
  const t = useT();
  const pct = total ? Math.round((done / total) * 100) : 0;

  // Décompte annoncé aux lecteurs d'écran, 500 ms après la dernière frappe.
  const [announced, setAnnounced] = useState("");
  useEffect(() => {
    if (!query.trim()) {
      setAnnounced("");
      return;
    }
    const timer = setTimeout(() => setAnnounced(t.batch.matches(shownCount)), 500);
    return () => clearTimeout(timer);
  }, [query, shownCount, t]);

  const chips: { key: Filter; label: string; count: number; tone: string }[] = [
    { key: "all", label: t.batch.all, count: total, tone: "text-encre" },
    { key: "attention", label: t.batch.attention, count: attention, tone: "text-sceau-fonce" },
    { key: "ready", label: t.batch.ready, count: ready, tone: "text-green-800" },
  ];

  return (
    <div className="mt-3 rounded-xl border border-trait bg-feuille px-4 py-3">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="font-medium">{t.batch.progress(done, total)}</span>
        <span className="text-encre-2 tabular-nums">{pct} %</span>
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-encre/10"
        role="progressbar"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={t.batch.progress(done, total)}
      >
        <div
          className="h-full rounded-full bg-bleu transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {chips.map(({ key, label, count, tone }) => (
          <button
            key={key}
            onClick={() => onFilter(key)}
            aria-pressed={filter === key}
            // Un filtre vide ne sert à rien : on le désactive plutôt que de
            // laisser l'utilisateur atterrir sur une liste vide.
            disabled={key !== "all" && count === 0}
            className={`rounded-full border px-3 py-1 text-sm transition-colors disabled:opacity-40 ${
              filter === key
                ? "border-bleu bg-bleu/10 text-bleu"
                : `border-trait bg-feuille hover:border-encre-2 ${tone}`
            }`}
          >
            {label} <span className="tabular-nums">{count}</span>
          </button>
        ))}
      </div>

      {/* Le champ garde sa propre ligne : dans la colonne de gauche, à côté
          des pastilles, il se réduisait à « Rech… ». */}
      <input
        type="search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder={t.batch.searchPlaceholder}
        aria-label={t.batch.searchAria}
        // text-base : sous 16px, iOS Safari zoome la page au focus.
        className="mt-2 w-full rounded-lg border border-trait bg-white px-3 py-1.5 text-base focus:outline-none focus:ring-2 focus:ring-bleu sm:text-sm"
      />

      {query.trim() && (
        <p className="mt-2 text-sm text-encre-2">{t.batch.matches(shownCount)}</p>
      )}
      {/* Annonce différée : liée au rendu, la région vocaliserait un décompte
          à chaque frappe (« 8 affichés », « 3 affichés », « 1 affiché »…). */}
      <p className="sr-only" role="status" aria-live="polite">
        {announced}
      </p>
    </div>
  );
}
