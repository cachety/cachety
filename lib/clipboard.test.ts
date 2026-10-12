import { describe, expect, test } from "bun:test";
import { copySecret } from "./clipboard";

/** Faux navigateur : presse-papiers, événements et minuterie pilotés à la main. */
function fakeEnv() {
  const listeners: Record<string, Set<() => void>> = {};
  const timers = new Map<number, () => void>();
  let nextId = 1;
  const writes: string[] = [];
  const state = {
    clipboard: "",
    writes,
    fire: (t: string) => [...(listeners[t] ?? [])].forEach((fn) => fn()),
    tick: () => {
      const due = [...timers.values()];
      timers.clear();
      due.forEach((fn) => fn());
    },
  };
  const env = {
    clipboard: {
      writeText: async (s: string) => {
        writes.push(s);
        state.clipboard = s;
      },
    },
    doc: {
      addEventListener: (t: string, fn: () => void) => (listeners[t] ??= new Set()).add(fn),
      removeEventListener: (t: string, fn: () => void) => listeners[t]?.delete(fn),
    },
    setTimer: (fn: () => void) => (timers.set(nextId, fn), nextId++),
    clearTimer: (id: unknown) => timers.delete(id as number),
  };
  return { state, env: env as any };
}

const flush = () => new Promise((r) => setTimeout(r, 0));

describe("copySecret : le mot de passe ne traîne pas dans le presse-papiers", () => {
  test("jamais d'accès en arrière-plan : effacé au premier geste après l'échéance", async () => {
    const { state, env } = fakeEnv();
    await copySecret("s3cret", 60_000, env);
    expect(state.clipboard).toBe("s3cret");
    state.tick();
    await flush();
    // Échéance passée, mais aucun geste : rien n'est écrit en arrière-plan.
    expect(state.clipboard).toBe("s3cret");
    expect(state.writes).toEqual(["s3cret"]);
    state.fire("pointerdown");
    await flush();
    expect(state.clipboard).toBe("");
  });

  test("une touche du clavier suffit aussi", async () => {
    const { state, env } = fakeEnv();
    await copySecret("s3cret", 60_000, env);
    state.tick();
    state.fire("keydown");
    await flush();
    expect(state.clipboard).toBe("");
  });

  test("un geste avant l'échéance n'efface pas (le temps de coller ailleurs)", async () => {
    const { state, env } = fakeEnv();
    await copySecret("s3cret", 60_000, env);
    state.fire("pointerdown");
    await flush();
    expect(state.clipboard).toBe("s3cret");
  });

  test("une autre copie dans la page entre-temps n'est pas effacée", async () => {
    const { state, env } = fakeEnv();
    await copySecret("s3cret", 60_000, env);
    state.fire("copy");
    state.clipboard = "autre chose";
    state.tick();
    state.fire("pointerdown");
    await flush();
    expect(state.clipboard).toBe("autre chose");
  });

  test("une nouvelle copie remplace l'échéance précédente", async () => {
    const { state, env } = fakeEnv();
    await copySecret("premier", 60_000, env);
    await copySecret("second", 60_000, env);
    state.tick();
    state.fire("pointerdown");
    await flush();
    expect(state.clipboard).toBe("");
    expect(state.writes).toEqual(["premier", "second", ""]);
  });
});
