import type { RoadmapCopy, RoadmapId, Text } from "./types";

const ITEMS: Record<RoadmapId, Text> = {
  "per-recipient-password": {
    title: "Ein eigenes Passwort für jeden Empfänger",
    body: "Jede Kopie bekommt ihr eigenes Passwort, aufgelistet mit den Codes nach dem Download. Gerät ein Passwort in falsche Hände, öffnet es nur eine einzige Kopie.",
  },
  "suggested-areas": {
    title: "Vorschläge, was geschwärzt werden sollte",
    body: "Cachety erkennt IBANs, Ausweisnummern und ähnliche Angaben auf der Seite und bietet an, sie zu schwärzen. Die Erkennung läuft wie alles andere auf deinem Gerät.",
  },
  "more-languages": {
    title: "Weitere Sprachen",
    body: "Italienisch, Koreanisch und Türkisch.",
  },
  "purpose-from-recipient": {
    title: "Zweck passend zum Empfänger vorschlagen",
    body: "Gibst du den Empfänger ein, etwa eine Hausverwaltung, könnte der passende Zweck gleich vorgeschlagen werden.",
  },
  "local-word-lists": {
    title: "Gut lesbare Passwörter in deiner Sprache",
    body: "Passwortwörter in deiner eigenen Sprache, nur mit einfachen Buchstaben, damit sie sich auf jeder Tastatur gleich tippen lassen.",
  },
  "simpler-tool": {
    title: "Ein einfacheres Tool",
    body: "Drei Schritte in klaren Worten: dein Dokument, wofür und für wen, dann Vorschau und Download. Alle weiteren Optionen sind nur einen Tipp entfernt.",
  },
  "easy-passwords": {
    title: "Gut lesbare Passwörter",
    body: "Wer eine Datei schützt, bekommt jetzt ein Passwort aus 12 zufälligen Wörtern, so stark wie die Wiederherstellungsphrase einer Krypto-Wallet.",
  },
};

const COPY: RoadmapCopy = {
  nav: "Roadmap",
  title: "Was als Nächstes kommt",
  lead: "Woran wir als Nächstes arbeiten und welche Ideen wir prüfen. Cachety bleibt kostenlos, Open Source und auf deinem Gerät.",
  next: "Als Nächstes",
  idea: "Ideen, die wir prüfen",
  shipped: "Kürzlich hinzugefügt",
  suggest: "Idee vorschlagen",
  suggestBody: "Fehlt dir etwas? Eröffne ein Issue auf GitHub. Ideen sind in jeder Sprache willkommen.",
  meta: {
    title: "Roadmap: was als Nächstes zu Cachety kommt",
    description: "Geplante Funktionen von Cachety, dem kostenlosen Wasserzeichen-Tool, bei dem deine Dokumente auf deinem Gerät bleiben: nächste Schritte, Ideen, Neues.",
  },
};

export default { items: ITEMS, copy: COPY };
