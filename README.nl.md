# Cachety

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · **Nederlands** · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md) · [فارسی](README.fa.md) · [日本語](README.ja.md) · [简体中文](README.zh.md)

**Zet een watermerk op je identiteitsbewijs en gevoelige documenten zonder dat ze ooit je apparaat verlaten.**

Cachety zet een watermerk op pdf's en foto's (ID-kaarten, paspoorten, loonstroken, belastingpapieren, bankafschriften), helemaal in je webbrowser. Er wordt nooit een bestand geüpload: er is geen server die er een zou kunnen ontvangen. Het is gratis, je hebt geen account nodig, er is geen tracking en het is open source.

### 👉 Gebruik het nu: **[cachety.com](https://cachety.com)**

Beschikbaar in English, Français, Español, Português, Deutsch, Nederlands, Bahasa Indonesia, العربية, فارسی, 日本語 en 简体中文.

![Cachety: een pdf met watermerk in de browser](docs/preview.png)

## Waarom het bestaat

Mensen worden steeds om kopieën van hun papieren gevraagd: voor een huurwoning, een nieuwe baan of een bankrekening. Eenmaal verstuurd, kan een kale kopie voor alles worden hergebruikt, ook voor identiteitsfraude. Een watermerk dat zegt waarvoor de kopie is, voor wie en op welke datum, koppelt hem aan dat ene gebruik. De Franse overheidsdienst voor hulp bij cybercriminaliteit, [Cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr), raadt precies dat aan, en de Nederlandse Rijksoverheid geeft hetzelfde advies voor een veilige kopie van je identiteitsbewijs.

De meeste online watermerktools uploaden je identiteitsbewijs daarvoor naar hun servers. Cachety niet.

## Gebruik de online versie: dat is de beste manier

Je hoeft niets te installeren of te bouwen. **[cachety.com](https://cachety.com)** is de versie die we iedereen aanraden:

- **Net zo privé.** Ook online verlaten je bestanden je apparaat nooit: de pagina doet al het werk in je browser en mag technisch nergens gegevens heen sturen. Controleer het zelf: laad de pagina, zet vliegtuigmodus aan en zet een watermerk op een document.
- **Beter beveiligd.** De officiële site wordt geleverd met de volledige set beveiligingsheaders (bescherming tegen clickjacking, HSTS, cross-origin-isolatie, een strikte Content-Security-Policy per pagina). Een zelfgemaakte kopie op een eenvoudige webserver mist er vaak een paar.
- **Altijd bijgewerkt.** Beveiligingsfixes en verbeteringen krijg je bij je volgende bezoek, zonder iets bij te werken.
- **Overal snel.** Geleverd via een wereldwijd CDN, dus het opent snel waar je ook bent, en werkt offline zodra het geladen is.
- **Prettig op elk apparaat.** Werkt op computers, iPhone en Android. Zet het als app op je beginscherm; op Android deel je een bestand direct met Cachety.
- **Hulp inbegrepen.** Een rondleiding laat nieuwe bezoekers zien waar ze moeten beginnen, en praktische uitleg behandelt veelvoorkomende situaties.

Zelf hosten kan nog steeds en wordt volledig ondersteund (zie hieronder), voor organisaties die dat nodig hebben.

## Functies

- **Pdf's en afbeeldingen:** JPG, PNG, WebP, GIF, BMP, AVIF en iPhone-foto's (HEIC). Eén bestand of veel tegelijk (tot 200 MB per bestand, 500 pagina's per pdf).
- **Watermerk over de hele pagina**, opgenomen in het beeld. Het is niet weg te halen door de pdf simpelweg te bewerken, en de opmaak verschilt per kopie. Keuze uit lettertype, grootte, kleur, dekking en een golfeffect.
- **Drie eenvoudige stappen:** je document, waarvoor het is en wie het krijgt, daarna bekijken en downloaden. De watermerktekst wordt voor je geschreven ("doel, ontvanger, datum", met kant-en-klare voorbeelden) en is vrij aan te passen.
- **Verborgen gegevens verwijderd:** selecteerbare tekst, metadata en de gps-locatie van foto's. Elke pagina wordt opnieuw opgebouwd uit pixels.
- **Afdekken:** lak een IBAN, een BSN of een pasfoto zwart. De inhoud wordt echt verwijderd, niet alleen bedekt.
- **Traceerbare kopieën:** zet `{code}` in de tekst en elke kopie krijgt een eigen kort kenmerk, dat na het downloaden in een lijst verschijnt zodat je het kunt bewaren.
- **Meerdere ontvangers:** één kopie per ontvanger (tot 20), elk met de naam van die ontvanger, in één download.
- **Wachtwoord:** AES-256-versleuteling van de pdf (PDF 2.0). Vink je "Beveiligen met een wachtwoord" aan, dan krijg je een goed leesbaar wachtwoord van 12 willekeurige woorden (132 bits, BIP39-woordenlijst); je eigen wachtwoord of een willekeurig wachtwoord van 256 bits blijven mogelijk. Automatisch wissen van het klembord.
- **Bestandsgrootte zichtbaar vóór het downloaden**, met "Kleiner maken" (10, 5, 2 of 1 MB) voor uploadportalen en e-mails die dat beperken.
- **Eén pdf** in de volgorde die je kiest (slepen en neerzetten), of een **ZIP**-bestand.
- **Werkt op telefoons**, is als app te installeren en werkt **offline** zodra het geladen is.
- **11 talen**, met een opmaak van rechts naar links voor Arabisch en Perzisch en eigen lettertypen voor elk schrift.
- **Rondleiding met uitleg** voor nieuwe bezoekers, aangeboden als iemand niet goed weet waar te beginnen.
- **70 praktische uitleggen** voor alledaagse situaties in Nederland, Frankrijk, het Verenigd Koninkrijk, Duitsland, Spanje en Latijns-Amerika, Brazilië, Indonesië, de Arabische wereld, Iran, Japan en China.
- **82 gecontroleerde vergelijkingen** met andere watermerktools (KopieID, iLovePDF, Proton, Smallpdf, PDF24, Adobe Acrobat en meer), met bronnen, inclusief wanneer een andere tool de betere keuze is.
- **Op partnersites:** goedgekeurde sites kunnen de tool op hun eigen pagina's tonen (een iframe van cachety.com, dus de site zelf ziet de documenten niet). Zie [docs/embed.md](docs/embed.md) en [cachety.com/nl/partners](https://cachety.com/nl/partners).

## Privacy by design, en controleerbaar

- Alle verwerking gebeurt in de browser (pdf.js, canvas, pdf-lib). Bestanden bestaan alleen in het geheugen, als `File`/`Blob`-objecten.
- De Content-Security-Policy stelt `connect-src 'self'` in, dus de browser zelf weigert elk verzoek naar een ander domein, zelfs als er op de een of andere manier kwaadaardige code zou draaien.
- Er zijn geen cookies, statistieken, scripts van derden of accounts. Alleen weergavevoorkeuren worden bewaard in `localStorage`. Lettertypen worden door de site zelf geleverd.
- Elke garantie wordt afgedwongen door automatische tests die bij elke wijziging draaien: CSP, de afwezigheid van externe bronnen, het opschonen van uitvoerbestanden en een gesimuleerde poging tot exfiltratie.

Volledig dreigingsmodel, maatregelen en tests: **[docs/security.md](docs/security.md)**. Een kwetsbaarheid melden: zie **[SECURITY.md](SECURITY.md)**.

## Zelf hosten

Je hoeft onze deployment niet te vertrouwen: de site is een statische export die je zelf kunt hosten.

Vereist: [Bun](https://bun.sh).

```sh
git clone https://github.com/cachety/cachety
cd cachety
bun install
bun run build      # statische export in out/
bunx serve out     # of een andere statische bestandsserver
```

`out/` kun je zo op elke statische host zetten. Elke pagina heeft een eigen Content-Security-Policy in een `<meta>`-tag, dus de netwerkblokkade werkt ook zonder onze HTTP-headers. Voor dezelfde bescherming als cachety.com stel je ook de headers uit `out/_headers` in. Zie [docs/deploy.md](docs/deploy.md) voor Cloudflare Pages, GitHub Pages en andere servers.

## Cachety op je eigen website (partners)

Makelaars, hr-platforms, verenigingen: goedgekeurde websites kunnen de volledige tool op hun eigen pagina's tonen, zodat mensen hun documenten daar meteen van een watermerk voorzien.

- **Privé door ontwerp:** de tool draait in een kader dat cachety.com levert. De pagina eromheen, en elk script erop, kan de documenten niet lezen. Ze verlaten nooit het apparaat van de bezoeker.
- **Aan te passen:** doel en ontvanger vooraf ingevuld (de bezoeker kan ze wijzigen), kleur van de knoppen en taal. Alleen de hoogte van het kader gaat naar de pagina.
- **Alleen goedgekeurde partners:** de toegestane websites staan in [`partners.json`](partners.json). De browser weigert alle andere.
- **Gratis**, net als de rest van het project. Een donatie is welkom als je er iets aan hebt.

**Partner worden:** [dien een aanvraag in](https://github.com/cachety/cachety/issues/new?template=partner.yml) met het adres van je website. Zodra die is goedgekeurd en online staat, plak je de code:

```html
<iframe src="https://cachety.com/embed/nl#for=Huuraanvraag&to=Makelaardij%20Martin"
        title="Cachety" loading="lazy" allow="clipboard-write"
        style="width: 100%; min-height: 640px; border: 0"></iframe>
```

De [pagina voor websites](https://cachety.com/nl/partners) maakt deze code voor je, met een echte voorbeeldweergave, het korte script voor automatische hoogte en een tekst om over te nemen. Technische details: [docs/embed.md](docs/embed.md).

## Ontwikkeling

```sh
bun run dev        # ontwikkelserver
bun test           # unittests en statische beveiligingscontroles
bun run test:e2e   # browsertests (CHROMIUM_EXE=/pad/naar/chrome om een lokale Chrome te gebruiken)
```

Stack: Next.js (statische export), React, Tailwind CSS, PDF.js, pdf-lib, libheif.

- Teksten van de interface: `lib/i18n.tsx` (Frans, Engels, Japans, Chinees) en `lib/locales/<lang>/strings.ts` (de andere talen).
- Teksten van de website: `lib/site-copy.ts` en `lib/locales/<lang>/site.ts`. Metadata van de pagina's: `lib/site-meta.ts` en `lib/locales/<lang>/meta.ts`.
- Uitleg: `lib/guides/<lang>.ts`.
- Vergelijkingspagina's ("Cachety vs X"): `lib/compare/<lang>.ts`. Elke bewering over een andere tool moet de bron noemen (`sources`) en de datum waarop hij is gecontroleerd (`checked`), en elke pagina moet zeggen wanneer de andere tool de betere keuze is. Controleer deze feiten regelmatig: diensten veranderen.
- Afbeeldingen voor sociale media (`public/og/<lang>.png`, 1200×630) worden gemaakt uit de eigen tekst en lettertypen van de site met `bun run og` (vereist Chrome: stel `CHROMIUM_EXE` in). Draai het opnieuw als de kop of de beloftes veranderen.
- Talen van rechts naar links gebruiken logische Tailwind-klassen (`ms-`, `pe-`, `start-`, `end-`…) in plaats van `ml-`, `pr-`, `left-`, `right-`.

Elke taal moet dezelfde structuur houden; tests controleren dat. Regels voor bijdragen en een overzicht van de bestanden: **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## Steun het project

Cachety is gratis en blijft gratis. Heeft het je geholpen, dan kun je het [steunen via GitHub Sponsors](https://github.com/sponsors/amirhmoradi). Donaties helpen de domeinnaam en ontwikkeltools te betalen, en vooral de tijd die het kost.

Er zijn vandaag geen advertenties. Het project kan ooit een paar met de hand gekozen gesponsorde links tonen in dezelfde geest (versleutelingstools, opensourcesoftware, veilig documenten delen). Daarvoor gelden strikte regels, die deel uitmaken van de privacybelofte:

- duidelijk gemarkeerd als gesponsord;
- geleverd vanaf het eigen domein van Cachety (alleen afbeeldingen en links): geen advertentienetwerk, geen script van derden, geen trackingpixel;
- nooit gekozen op basis van, of getoond naar aanleiding van, iets wat de gebruiker in de tool stopt;
- de Content-Security-Policy blijft net zo strikt als nu (`connect-src 'self'`).

## Dank en licentie

Cachety is een persoonlijk project, ontworpen en onderhouden door **[Amir Moradi](https://amirmoradi.com)** in Frankrijk.

Het is een aangepaste versie van **[Filigrane Local](https://github.com/KazeTachinuu/filigrane-local)** van Hugo Sibony (KazeTachinuu). Dat project was zelf een herschrijving, geïnspireerd door **[Filigraneur](https://github.com/cyberclarence/filigraneur)** van CyberClarence. Dank aan allebei. Zie [NOTICE](NOTICE) voor details.

Goed leesbare wachtwoorden gebruiken de **[Engelse BIP39-woordenlijst](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)** (MIT-licentie, © 2013 Marek Palatinus, Pavol Rusnak, Aaron Voisine, Sean Bowe).

Wat er gepland is: **[ROADMAP.md](ROADMAP.md)**, ook te zien op [cachety.com/nl/roadmap](https://cachety.com/nl/roadmap).

Uitgebracht onder de **GNU Affero General Public License v3.0** ([LICENSE](LICENSE)). Draai je een aangepaste versie als dienst, dan verplicht de AGPL je om de broncode aan je gebruikers aan te bieden.
