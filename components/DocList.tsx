"use client";

import { memo, useState } from "react";
import { useT } from "@/lib/i18n";
import { needsPassword, size, type Doc, type Status } from "@/lib/doc";
import { CloseIcon, EyeIcon, EyeOffIcon, LockIcon } from "@/components/icons";

// Mémoïsée : pendant un lot, chaque page rendue re-rend CoreProduct. Sans
// cette barrière, les mille lignes seraient re-diffées plusieurs fois par
// seconde alors qu'une seule change.
export const DocRow = memo(function DocRow({
  doc,
  selected,
  onSelect,
  onRemove,
  onUnlock,
}: {
  doc: Doc;
  selected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onUnlock: (id: string, password: string) => void;
}) {
  const t = useT();
  return (
    // Le bouton « retirer » vit dans la carte : en colonne séparée, il volait
    // 56 px de large à chaque ligne, d'où des noms tronqués très tôt.
    <li
      className={`rounded-xl border bg-feuille transition-colors ${
        selected ? "border-bleu ring-1 ring-bleu" : "border-trait hover:border-encre-2"
      }`}
    >
      <div className="flex items-center">
        <button
          id={`doc-${doc.id}`}
          onClick={() => onSelect(doc.id)}
          aria-current={selected || undefined}
          className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-l-xl py-3 pl-4 pr-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
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
          <DocStatus doc={doc} />
        </button>
        <button
          onClick={() => onRemove(doc.id)}
          aria-label={t.remove(doc.file.name)}
          className="mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-encre-2 transition-colors hover:bg-sceau/10 hover:text-sceau focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
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

function DocStatus({ doc }: { doc: Doc }) {
  const t = useT();
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
            className={`w-full rounded-lg border bg-white py-1.5 pl-3 pr-9 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-bleu sm:text-sm ${
              wrong ? "border-sceau/60" : "border-trait"
            }`}
          />
          {pw && (
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              aria-label={visible ? t.unlock.hide : t.unlock.show}
              aria-pressed={visible}
              className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-encre-2 transition-colors hover:text-encre focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu"
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
