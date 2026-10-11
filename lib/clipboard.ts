// Copie d'un secret (mot de passe de fichier) avec effacement différé, à la
// manière des gestionnaires de mots de passe : un mot de passe ne doit pas
// traîner dans le presse-papiers du système, où toute application le lit.
//
// On ne relit pas le presse-papiers pour vérifier qu'il contient encore le
// secret : cela déclencherait une demande d'autorisation. On renonce seulement
// à l'effacement si l'utilisateur a copié autre chose dans la page entre-temps.

export const CLIPBOARD_CLEAR_MS = 60_000;

type Env = {
  clipboard: Pick<Clipboard, "writeText">;
  doc: Pick<Document, "addEventListener" | "removeEventListener" | "hasFocus">;
  win: Pick<Window, "addEventListener" | "removeEventListener">;
  setTimer: (fn: () => void, ms: number) => unknown;
  clearTimer: (id: unknown) => void;
};

let cancelPending: (() => void) | null = null;

/** Copie `secret`, puis l'efface du presse-papiers après `delayMs`. Rejette si la copie échoue. */
export async function copySecret(secret: string, delayMs = CLIPBOARD_CLEAR_MS, env?: Env) {
  const e: Env = env ?? {
    clipboard: navigator.clipboard,
    doc: document,
    win: window,
    setTimer: (fn, ms) => setTimeout(fn, ms),
    clearTimer: (id) => clearTimeout(id as ReturnType<typeof setTimeout>),
  };
  cancelPending?.();
  await e.clipboard.writeText(secret);

  let timer: unknown;
  const cleanup = () => {
    e.clearTimer(timer);
    e.doc.removeEventListener("copy", cleanup);
    e.win.removeEventListener("focus", clear);
    if (cancelPending === cleanup) cancelPending = null;
  };
  // Le navigateur refuse d'écrire si l'onglet n'a pas le focus : on réessaie
  // alors au retour sur la page.
  function clear() {
    if (!e.doc.hasFocus()) {
      e.win.addEventListener("focus", clear);
      return;
    }
    cleanup();
    e.clipboard.writeText("").catch(() => {});
  }
  // Une copie faite ensuite dans la page remplace déjà le secret : on n'efface
  // pas, ce serait détruire ce que l'utilisateur vient de copier.
  e.doc.addEventListener("copy", cleanup);
  timer = e.setTimer(clear, delayMs);
  cancelPending = cleanup;
}
