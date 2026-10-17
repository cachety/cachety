"use client";

import { memo, useState } from "react";
import { useT } from "@/lib/i18n";
import { needsPassword, size, type Doc, type Status } from "@/lib/doc";
import { CloseIcon, EyeIcon, EyeOffIcon, GripIcon, LockIcon } from "@/components/icons";

// Mémoïsée : pendant un lot, chaque page rendue re-rend CoreProduct. Sans
// cette barrière, les mille lignes seraient re-diffées plusieurs fois par
// seconde alors qu'une seule change.
export const DocRow = memo(function DocRow({
  doc,
  selected,
  onSelect,
  onRemove,
  onUnlock,
  index,
  total,
  onMoveTo,
  onDragStart,
  dragging,
  dropEdge,
  placeMissing,
}: {
  doc: Doc;
  selected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onUnlock: (id: string, password: string) => void;
  /** Position dans le lot (0 = premier). */
  index: number;
  total: number;
  /** Absent : réordonnancement indisponible (liste filtrée, document seul). */
  onMoveTo?: (id: string, to: number) => void;
  onDragStart?: (id: string, from: number, e: React.PointerEvent) => void;
  dragging?: boolean;
  /** Où la ligne glissée atterrira, s'il s'agit de cette ligne. */
  dropEdge?: "before" | "after";
  /** Mode « signer » : signature retirée de ce document, à replacer (pastille d'attention). */
  placeMissing?: boolean;
}) {
  const t = useT();
  const reorder = !!onMoveTo && !!onDragStart;
  return (
    // Le bouton « retirer » vit dans la carte : en colonne séparée, il volait
    // 56 px de large à chaque ligne, d'où des noms tronqués très tôt.
    <li
      data-doc-index={index}
      className={`relative rounded-xl border bg-feuille transition-colors ${
        selected ? "border-bleu ring-1 ring-bleu" : "border-trait hover:border-encre-2"
      } ${dragging ? "opacity-50" : ""}`}
    >
      {/* Trait d'insertion : où la ligne glissée va se poser. */}
      {dropEdge && (
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-x-1 h-0.5 rounded-full bg-bleu ${
            dropEdge === "before" ? "-top-[5px]" : "-bottom-[5px]"
          }`}
        />
      )}
      <div className="flex items-center">
        {reorder && (
          <div className="flex shrink-0 items-center gap-0.5 py-1 ps-1">
            <button
              type="button"
              aria-label={t.dragHandle(doc.file.name)}
              onPointerDown={(e) => onDragStart!(doc.id, index, e)}
              onKeyDown={(e) => {
                const to =
                  e.key === "ArrowUp" ? index - 1
                  : e.key === "ArrowDown" ? index + 1
                  : e.key === "Home" ? 0
                  : e.key === "End" ? total - 1
                  : null;
                if (to === null) return;
                e.preventDefault();
                onMoveTo!(doc.id, to);
              }}
              className="flex h-11 w-7 cursor-grab touch-none select-none items-center justify-center rounded-md text-encre-2 hover:bg-bleu/10 hover:text-bleu focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu active:cursor-grabbing"
            >
              <GripIcon className="h-5 w-5" />
            </button>
            <PositionInput
              name={doc.file.name}
              position={index + 1}
              total={total}
              onCommit={(n) => onMoveTo!(doc.id, n - 1)}
            />
          </div>
        )}
        <button
          id={`doc-${doc.id}`}
          onClick={() => onSelect(doc.id)}
          aria-current={selected || undefined}
          className={`flex min-w-0 flex-1 items-center justify-between gap-3 py-3 ps-4 pe-2 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu ${
            reorder ? "" : "rounded-s-xl"
          }`}
        >
          <span className="min-w-0">
            <span className="block truncate font-medium">{doc.file.name}</span>
            <span className="block text-sm text-encre-2">
              {size(doc.file.size, t)}
              {doc.result &&
                doc.result.extension === "pdf" &&
                ` · ${t.pages(doc.result.pageCount)}`}
            </span>
            {/* La raison de l'échec directement dans la ligne : indispensable
                pour trier un lot, la pastille seule ne dit pas pourquoi. */}
            {doc.error && !needsPassword(doc) && (
              <span className="block text-sm text-sceau-fonce">{t.errors[doc.error]}</span>
            )}
          </span>
          <DocStatus doc={doc} placeMissing={placeMissing} />
        </button>
        <button
          onClick={() => onRemove(doc.id)}
          aria-label={t.remove(doc.file.name)}
          className="me-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-encre-2 transition-colors hover:bg-sceau/10 hover:text-sceau focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
      {needsPassword(doc) && (
        <UnlockForm
          name={doc.file.name}
          wrong={doc.error === "pdf_password_wrong"}
          onUnlock={(pw) => onUnlock(doc.id, pw)}
        />
      )}
    </li>
  );
});


const STATUS_STYLES: Record<Status, string> = {
  pending: "bg-encre/5 text-encre-2",
  processing: "bg-bleu/10 text-bleu",
  ready: "bg-green-700/10 text-green-800",
  error: "bg-sceau/10 text-sceau-fonce",
};

/**
 * Position éditable : taper « 1 » puis Entrée envoie le document en tête.
 * Validée à Entrée ou en quittant le champ ; Échap annule. Une valeur hors
 * limites est bornée, une saisie vide ou illisible est ignorée.
 */
function PositionInput({
  name,
  position,
  total,
  onCommit,
}: {
  name: string;
  position: number;
  total: number;
  onCommit: (position: number) => void;
}) {
  const t = useT();
  // Brouillon seulement pendant une saisie : hors saisie, le champ montre
  // toujours la place réelle. Un brouillon synchronisé après coup (effet)
  // était en retard d'une image ; si la ligne bougeait (glisser) puis que le
  // champ perdait le focus, l'ancienne valeur était « validée » à tort.
  const [draft, setDraft] = useState<string | null>(null);
  const commit = () => {
    if (draft === null) return;
    const n = Number.parseInt(draft, 10);
    setDraft(null);
    if (Number.isInteger(n) && n !== position) onCommit(Math.min(total, Math.max(1, n)));
  };
  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={draft ?? String(position)}
      onChange={(e) => setDraft(e.target.value.replace(/\D/g, "").slice(0, 5))}
      onFocus={(e) => e.target.select()}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit();
        } else if (e.key === "Escape") {
          setDraft(null);
          e.currentTarget.blur();
        }
      }}
      aria-label={t.positionOf(name, total)}
      // text-base sous sm : sous 16 px, iOS Safari zoome la page au focus.
      className="h-8 w-10 rounded-md border border-transparent bg-transparent text-center text-base font-semibold tabular-nums text-encre-2 hover:border-trait focus:border-bleu focus:bg-white focus:text-encre focus:outline-none focus:ring-2 focus:ring-bleu sm:text-sm"
    />
  );
}

function DocStatus({ doc, placeMissing }: { doc: Doc; placeMissing?: boolean }) {
  const t = useT();
  if (placeMissing && doc.status === "ready") {
    return (
      <span className="whitespace-nowrap rounded-full bg-amber-500/15 px-3 py-1 text-sm font-medium text-amber-900">
        {t.sign.attentionPlace}
      </span>
    );
  }
  if (needsPassword(doc)) {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-encre/5 px-3 py-1 text-sm font-medium text-encre-2">
        <LockIcon className="h-3.5 w-3.5" />
        {t.unlock.locked}
      </span>
    );
  }
  return (
    <span
      className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium ${STATUS_STYLES[doc.status]}`}
    >
      {doc.status === "processing" && doc.progress
        ? t.pageOf(doc.progress[0], doc.progress[1])
        : t.status[doc.status]}
    </span>
  );
}

function UnlockForm({
  name,
  wrong,
  onUnlock,
}: {
  name: string;
  wrong: boolean;
  onUnlock: (password: string) => void;
}) {
  const t = useT();
  const [pw, setPw] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <form
      className="border-t border-trait px-4 py-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (pw) onUnlock(pw);
      }}
    >
      {/* flex-wrap : sur un écran étroit, le bouton passe sous le champ plutôt
          que de le comprimer jusqu'à « Mot de pass… ». */}
      <div className="flex flex-wrap items-center gap-2">
        <LockIcon className="h-4 w-4 shrink-0 text-encre-2" />
        <div className="relative min-w-[10rem] flex-1">
          <input
            type={visible ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder={t.unlock.placeholder}
            aria-label={t.unlock.aria(name)}
            aria-invalid={wrong || undefined}
            // one-time-code : contrairement à "off" (ignoré pour les champs
            // password), supprime la proposition d'enregistrement dans le
            // gestionnaire de mots de passe. Ce mot de passe de document n'a
            // rien à faire dans un coffre synchronisé.
            autoComplete="one-time-code"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            // text-base : sous 16px, iOS Safari zoome la page au focus.
            className={`w-full rounded-lg border bg-white py-1.5 ps-3 pe-9 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-bleu sm:text-sm ${
              wrong ? "border-sceau/60" : "border-trait"
            }`}
          />
          {pw && (
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              aria-label={visible ? t.unlock.hide : t.unlock.show}
              aria-pressed={visible}
              className="absolute end-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-encre-2 transition-colors hover:text-encre focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
            >
              {visible ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={!pw}
          className="ml-auto shrink-0 rounded-lg border border-trait px-3 py-2 text-sm font-medium text-encre-2 transition-colors hover:border-bleu hover:text-bleu disabled:opacity-40"
        >
          {t.unlock.button}
        </button>
      </div>
      {wrong && (
        <p role="alert" className="mt-2 text-sm text-sceau-fonce">
          {t.errors.pdf_password_wrong}
        </p>
      )}
    </form>
  );
}
