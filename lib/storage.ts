// localStorage sans risque : il lève une exception quand le stockage est
// bloqué (Safari « bloquer tous les cookies », iframe sandboxée, quota
// atteint). Une préférence perdue ne doit jamais faire planter l'outil.

export function readPref(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writePref(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Préférence non mémorisée : sans conséquence.
  }
}
