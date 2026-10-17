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
  "remember-signature": {
    title: "Meine Unterschrift auf diesem Gerät merken",
    body: "Eine freiwillige Option, deine Unterschrift auf diesem Gerät zu behalten, mit einem klaren Satz dazu, was gespeichert wird, und Löschen mit einem Tipp. Heute wird sie nie gespeichert.",
  },
  "keep-vector-pages": {
    title: "Den Text unterschriebener PDFs behalten",
    body: "Eine Option, zu unterschreiben, ohne die Seiten aus Pixeln neu aufzubauen, damit der Text durchsuchbar bleibt. Sie bekäme ihre eigene Entfernung versteckter Daten.",
  },
  "sign-embed": {
    title: "Unterschreiben auf Partner-Websites",
    body: "Freigegebene Websites könnten das Unterschreiben in ihren eigenen Seiten zeigen, mit bereits ausgefülltem Ort und Vermerk. Die Dokumente blieben trotzdem auf dem Gerät der Besucher.",
  },
  "sign": {
    title: "Dokumente unterschreiben",
    body: "Zeichne, tippe oder lade deine Unterschrift hoch, setze sie auf ein PDF oder Foto und lade ein unterschriebenes PDF herunter. Wie beim Wasserzeichen wird nichts hochgeladen.",
  },
  "simpler-tool": {
    title: "Ein einfacheres Tool",
    body: "Drei Schritte in klaren Worten: dein Dokument, wofür und für wen, dann Vorschau und Download. Alle weiteren Optionen sind nur einen Tipp entfernt.",
  },
  "easy-passwords": {
    title: "Gut lesbare Passwörter",
    body: "Wer eine Datei schützt, bekommt jetzt ein Passwort aus 12 zufälligen Wörtern, so stark wie die Wiederherstellungsphrase einer Krypto-Wallet.",
  },
  "partner-embed": {
    title: "Cachety auf Partner-Websites",
    body: "Freigegebene Websites können das Tool in ihre eigenen Seiten einbinden. Es läuft weiterhin auf cachety.com: Die Dokumente bleiben auf dem Gerät der Besucher, außer Reichweite der einbindenden Website.",
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
    description: "Geplante Funktionen von Cachety, dem kostenlosen Tool für Wasserzeichen und Unterschriften, bei dem deine Dokumente auf deinem Gerät bleiben: Ideen, Neues.",
  },
};

export default { items: ITEMS, copy: COPY };
