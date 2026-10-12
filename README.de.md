# Cachety

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · **Deutsch** · [Nederlands](README.nl.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md) · [فارسی](README.fa.md) · [日本語](README.ja.md) · [简体中文](README.zh.md)

**Wasserzeichen auf Ausweis und vertrauliche Dokumente, ohne dass sie je dein Gerät verlassen.**

Cachety versieht PDFs und Fotos (Personalausweis, Reisepass, Gehaltsabrechnung, Steuerbescheid, Kontoauszug) mit einem Wasserzeichen, komplett in deinem Webbrowser. Keine Datei wird hochgeladen: Es gibt keinen Server, der eine empfangen könnte. Kostenlos, ohne Konto, ohne Tracking und Open Source.

### 👉 Gleich ausprobieren: **[cachety.com](https://cachety.com)**

Verfügbar auf English, Français, Español, Português, Deutsch, Nederlands, Bahasa Indonesia, العربية, فارسی, 日本語 und 简体中文.

![Cachety: ein PDF, im Browser mit Wasserzeichen versehen](docs/preview.png)

## Warum es Cachety gibt

Ständig wird eine Kopie deiner Papiere verlangt, für die Wohnung, den neuen Job oder ein Bankkonto. Einmal verschickt, lässt sich eine nackte Kopie für alles Mögliche weiterverwenden, auch für Identitätsdiebstahl. Ein Wasserzeichen, das Zweck, Empfänger und Datum nennt, bindet die Kopie an genau diese eine Verwendung. Genau das empfiehlt [Cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr), die staatliche französische Anlaufstelle für Opfer von Cyberkriminalität. In Deutschland verlangt das Personalausweisgesetz ohnehin, dass eine Ausweiskopie eindeutig und dauerhaft als Kopie erkennbar ist.

Die meisten Online-Wasserzeichen-Tools laden deinen Ausweis dafür auf ihre Server. Cachety nicht.

## Nutze die Online-Version: Sie ist die beste Wahl

Du musst nichts installieren oder bauen. **[cachety.com](https://cachety.com)** ist die Version, die wir allen empfehlen:

- **Genauso privat.** Auch online verlassen deine Dateien nie dein Gerät: Die Seite erledigt alles in deinem Browser und darf technisch keine Daten irgendwohin senden. Prüf es selbst: Seite laden, Flugmodus einschalten, Dokument mit Wasserzeichen versehen.
- **Besser geschützt.** Die offizielle Website wird mit allen Sicherheits-Headern ausgeliefert (Clickjacking-Schutz, HSTS, Cross-Origin-Isolation, strikte Content-Security-Policy pro Seite). Einer selbst gebauten Kopie auf einem einfachen Webserver fehlen oft einige davon.
- **Immer aktuell.** Sicherheitskorrekturen und Verbesserungen bekommst du beim nächsten Besuch, ohne etwas zu aktualisieren.
- **Überall schnell.** Ausgeliefert über ein weltweites CDN, öffnet sich schnell, wo immer du bist, und funktioniert nach dem Laden auch offline.
- **Angenehm auf jedem Gerät.** Läuft auf Computern, iPhone und Android. Leg es wie eine App auf den Startbildschirm; auf Android kannst du eine Datei direkt an Cachety teilen.
- **Hilfe inklusive.** Eine geführte Tour zeigt neuen Besuchern, wo sie anfangen, und Ratgeber erklären typische Situationen.

Selbst hosten ist weiterhin möglich und vollständig unterstützt (siehe unten), für Organisationen, die das brauchen.

## Funktionen

- **PDFs und Bilder:** JPG, PNG, WebP, GIF, BMP, AVIF und iPhone-Fotos (HEIC). Eine Datei oder viele auf einmal (bis zu 200 MB pro Datei, 500 Seiten pro PDF).
- **Wasserzeichen über die ganze Seite**, mit dem Bild verschmolzen. Mit einem PDF-Editor lässt es sich nicht einfach entfernen, und seine Anordnung variiert bei jeder Kopie. Schrift, Größe, Farbe, Deckkraft und Welleneffekt sind wählbar.
- **Drei einfache Schritte:** dein Dokument, wofür es ist und wer es bekommt, dann Vorschau und Download. Der Wasserzeichentext wird für dich geschrieben („Zweck, Empfänger, Datum“, mit fertigen Beispielen) und lässt sich frei bearbeiten.
- **Versteckte Daten entfernt:** markierbarer Text, Metadaten und der GPS-Standort von Fotos. Jede Seite wird aus Pixeln neu aufgebaut.
- **Schwärzen:** IBAN, Steuer-ID oder Foto unkenntlich machen. Der Inhalt wird wirklich entfernt, nicht nur abgedeckt.
- **Nachverfolgbare Kopien:** Füge `{code}` in den Text ein, und jede Kopie bekommt eine eigene kurze Referenz, die nach dem Download zum Aufbewahren aufgelistet wird.
- **Mehrere Empfänger:** eine Kopie pro Empfänger (bis zu 20), jeweils mit dessen Namen, in einem einzigen Download.
- **Passwort:** AES-256-Verschlüsselung für PDFs (PDF 2.0). Ein Häkchen bei „Mit Passwort schützen“ erzeugt ein gut lesbares Passwort aus 12 zufälligen Wörtern (132 Bit, BIP39-Wortliste); ein eigenes Passwort oder ein zufälliges 256-Bit-Passwort sind weiterhin möglich. Automatisches Leeren der Zwischenablage.
- **Dateigröße vor dem Download sichtbar**, mit „Verkleinern“ (10, 5, 2 oder 1 MB) für Upload-Portale und E-Mails mit Größenlimit.
- **Ein gemeinsames PDF** in der Reihenfolge deiner Wahl (per Drag & Drop) oder ein **ZIP-Archiv**.
- **Funktioniert auf dem Handy**, lässt sich als App installieren und läuft nach dem Laden **offline**.
- **Mehrere Sprachen**, mit Rechts-nach-links-Layout für Arabisch und Persisch und eigenen Schriften für jede Schrift.
- **Geführte Hilfe-Tour** für neue Besucher, angeboten, wenn jemand unsicher wirkt, wo er anfangen soll.
- **Praktische Ratgeber** für Alltagssituationen in Deutschland, Frankreich, Großbritannien, den Niederlanden, Spanien und Lateinamerika, Brasilien, Indonesien, der arabischen Welt, Iran, Japan und China.
- **Geprüfte Vergleiche** mit anderen Wasserzeichen-Tools (PDF24, iLovePDF, Proton, Smallpdf, Adobe Acrobat und weitere), mit Quellen, auch dazu, wann ein anderes Tool die bessere Wahl ist.
- **Auf Partner-Websites:** freigegebene Websites können das Tool in ihren Seiten zeigen (ein iframe von cachety.com, die einbindende Website sieht die Dokumente nicht). Siehe [docs/embed.md](docs/embed.md) und [cachety.com/de/partners](https://cachety.com/de/partners).

## Datenschutz von Grund auf, und überprüfbar

- Die gesamte Verarbeitung passiert im Browser (pdf.js, Canvas, pdf-lib). Dateien existieren nur im Speicher als `File`/`Blob`-Objekte.
- Die Content-Security-Policy setzt `connect-src 'self'`, der Browser selbst verweigert also jede Anfrage an eine andere Domain, selbst wenn irgendwie bösartiger Code liefe.
- Keine Cookies, keine Analyse, keine Skripte von Dritten, keine Konten. Nur Anzeigeeinstellungen werden im `localStorage` gespeichert. Die Schriften liefert die Website selbst aus.
- Jede Zusage wird durch automatische Tests abgesichert, die bei jeder Änderung laufen: CSP, keine externen Ressourcen, Bereinigung der Ausgabedateien und ein simulierter Exfiltrationsversuch.

Vollständiges Bedrohungsmodell, Maßnahmen und Tests: **[docs/security.md](docs/security.md)**. Sicherheitslücken meldest du wie in **[SECURITY.md](SECURITY.md)** beschrieben.

## Selbst hosten

Du musst unserer Installation nicht vertrauen: Die Website ist ein statischer Export, den du selbst hosten kannst.

Voraussetzung: [Bun](https://bun.sh).

```sh
git clone https://github.com/cachety/cachety
cd cachety
bun install
bun run build      # statischer Export in out/
bunx serve out     # oder ein beliebiger Server für statische Dateien
```

`out/` kann unverändert auf jeden statischen Hoster. Jede Seite trägt ihre eigene Content-Security-Policy in einem `<meta>`-Tag, die Netzwerksperre greift also auch ohne unsere HTTP-Header. Für denselben Schutz wie auf cachety.com setzt du zusätzlich die Header aus `out/_headers`. Siehe [docs/deploy.md](docs/deploy.md) für Cloudflare Pages, GitHub Pages und andere Server.

## Cachety auf deiner Website einbinden (Partner)

Hausverwaltungen, HR-Plattformen, Vereine: Freigegebene Websites können das komplette Tool in ihren eigenen Seiten zeigen, damit Menschen ihre Dokumente direkt dort mit einem Wasserzeichen versehen.

- **Privat von Grund auf:** Das Tool läuft in einem Rahmen, den cachety.com ausliefert. Die einbindende Seite und ihre Skripte können die Dokumente nicht lesen. Sie verlassen nie das Gerät der Besucher.
- **Anpassbar:** Zweck und Empfänger vorausgefüllt (Besucher können sie ändern), Farbe der Schaltflächen und Sprache. An die Seite geht nur die Höhe des Rahmens.
- **Nur freigegebene Partner:** Die erlaubten Websites stehen in [`partners.json`](partners.json). Alle anderen lehnt der Browser ab.
- **Kostenlos**, wie das ganze Projekt. Eine Spende ist willkommen, wenn es dir nützt.

**So wirst du Partner:** [Stell eine Anfrage](https://github.com/cachety/cachety/issues/new?template=partner.yml) mit der Adresse deiner Website. Sobald sie freigegeben und veröffentlicht ist, füge den Code ein:

```html
<iframe src="https://cachety.com/embed/de#for=Mietbewerbung&to=Hausverwaltung%20Martin"
        title="Cachety" loading="lazy" allow="clipboard-write"
        style="width: 100%; min-height: 640px; border: 0"></iframe>
```

Die [Seite für Websites](https://cachety.com/de/partners) erstellt diesen Code für dich, mit echter Vorschau, dem kurzen Skript für die automatische Höhe und einem Text zum Übernehmen. Technische Details: [docs/embed.md](docs/embed.md).

## Entwicklung

```sh
bun run dev        # Entwicklungsserver
bun test           # Unit-Tests und statische Sicherheitsprüfungen
bun run test:e2e   # Browser-Tests (CHROMIUM_EXE=/pfad/zu/chrome für ein lokales Chrome)
```

Stack: Next.js (statischer Export), React, Tailwind CSS, PDF.js, pdf-lib, libheif.

- Texte der Oberfläche: `lib/i18n.tsx` (Französisch, Englisch, Japanisch, Chinesisch) und `lib/locales/<lang>/strings.ts` (weitere Sprachen).
- Texte der Website: `lib/site-copy.ts` und `lib/locales/<lang>/site.ts`. Seiten-Metadaten: `lib/site-meta.ts` und `lib/locales/<lang>/meta.ts`.
- Ratgeber: `lib/guides/<lang>.ts`.
- Vergleichsseiten („Cachety oder X“): `lib/compare/<lang>.ts`. Jede Aussage über ein anderes Tool muss ihre Quelle nennen (`sources`) und das Prüfdatum tragen (`checked`), und jede Seite muss sagen, wann das andere Tool die bessere Wahl ist. Prüf diese Angaben regelmäßig nach: Dienste ändern sich.
- Vorschaubilder für soziale Netzwerke (`public/og/<lang>.png`, 1200×630) werden mit `bun run og` aus den eigenen Texten und Schriften der Website erzeugt (benötigt Chrome: `CHROMIUM_EXE` setzen). Neu erzeugen, wenn sich Überschrift oder Versprechen ändern.
- Rechts-nach-links-Sprachen nutzen logische Tailwind-Klassen (`ms-`, `pe-`, `start-`, `end-`…) statt `ml-`, `pr-`, `left-`, `right-`.

Alle Sprachen müssen dieselbe Struktur behalten; Tests prüfen das. Regeln für Beiträge und Dateiübersicht: **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## Das Projekt unterstützen

Cachety ist kostenlos und bleibt es. Wenn es dir geholfen hat, kannst du es [auf GitHub Sponsors unterstützen](https://github.com/sponsors/amirhmoradi). Spenden helfen, Domain und Entwicklungswerkzeuge zu bezahlen, und vor allem die Zeit, die das Projekt kostet.

Heute gibt es keine Werbung. Vielleicht zeigt das Projekt eines Tages ein paar handverlesene, gesponserte Links im selben Geist (Verschlüsselungs-Tools, Open-Source-Software, sicherer Dokumentenversand). Die Regeln dafür sind streng und Teil des Datenschutzversprechens:

- klar als gesponsert gekennzeichnet;
- von Cachetys eigener Domain ausgeliefert (nur Bilder und Links): kein Werbenetzwerk, kein Skript von Dritten, kein Tracking-Pixel;
- nie nach dem ausgewählt oder angezeigt, was jemand in das Tool eingibt;
- die Content-Security-Policy bleibt so streng wie heute (`connect-src 'self'`).

## Danksagung und Lizenz

Cachety ist ein persönliches Projekt, entwickelt und betreut von **[Amir Moradi](https://amirmoradi.com)** in Frankreich.

Es ist eine veränderte Version von **[Filigrane Local](https://github.com/KazeTachinuu/filigrane-local)** von Hugo Sibony (KazeTachinuu). Dieses Projekt war seinerseits eine Neufassung, inspiriert von **[Filigraneur](https://github.com/cyberclarence/filigraneur)** von CyberClarence. Danke an beide. Details in [NOTICE](NOTICE).

Gut lesbare Passwörter nutzen die **[englische BIP39-Wortliste](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)** (MIT License, © 2013 Marek Palatinus, Pavol Rusnak, Aaron Voisine, Sean Bowe).

Was geplant ist: **[ROADMAP.md](ROADMAP.md)**, auch zu sehen unter [cachety.com/de/roadmap](https://cachety.com/de/roadmap).

Lizenziert unter der **GNU Affero General Public License v3.0** ([LICENSE](LICENSE)). Wer eine veränderte Version als Dienst betreibt, muss den Nutzern nach der AGPL den Quellcode anbieten.
