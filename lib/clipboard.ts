// Copie d'un secret (mot de passe de fichier) avec effacement différé, à la
// manière des gestionnaires de mots de passe : un mot de passe ne doit pas
// traîner dans le presse-papiers du système, où toute application le lit.
//
// Aucun accès au presse-papiers hors d'un geste de l'utilisateur : on ne le
// relit jamais, et l'effacement n'est pas fait en arrière-plan (certains
// navigateurs et systèmes demandent alors une autorisation d'accès au
// presse-papiers). Passé le délai, il est fait au clic ou à la touche suivante
// dans la page. On y renonce si l'utilisateur a copié autre chose dans la page.

export const CLIPBOARD_CLEAR_MS = 60_000;

type Env = {
  clipboard: Pick<Clipboard, "writeText">;
  doc: Pick<Document, "addEventListener" | "removeEventListener">;
  setTimer: (fn: () => void, ms: number) => unknown;
  clearTimer: (id: unknown) => void;
};

/** Gestes de l'utilisateur pendant lesquels l'effacement est permis sans demande. */
const GESTURES = ["pointerdown", "keydown"] as const;

let cancelPending: (() => void) | null = null;

/** Copie `secret`, puis l'efface au premier geste dans la page après `delayMs`. Rejette si la copie échoue. */
export async function copySecret(secret: string, delayMs = CLIPBOARD_CLEAR_MS, env?: Env) {
  const e: Env = env ?? {
    clipboard: navigator.clipboard,
    doc: document,
    setTimer: (fn, ms) => setTimeout(fn, ms),
    clearTimer: (id) => clearTimeout(id as ReturnType<typeof setTimeout>),
  };
  cancelPending?.();
  await e.clipboard.writeText(secret);

  let timer: unknown;
  const cleanup = () => {
    e.clearTimer(timer);
    e.doc.removeEventListener("copy", cleanup);
    for (const g of GESTURES) e.doc.removeEventListener(g, clear, true);
    if (cancelPending === cleanup) cancelPending = null;
  };
  function clear() {
    cleanup();
    e.clipboard.writeText("").catch(() => {});
  }
  // Une copie faite ensuite dans la page remplace déjà le secret : on n'efface
  // pas, ce serait détruire ce que l'utilisateur vient de copier.
  e.doc.addEventListener("copy", cleanup);
  timer = e.setTimer(() => {
    for (const g of GESTURES) e.doc.addEventListener(g, clear, true);
  }, delayMs);
  cancelPending = cleanup;
}
