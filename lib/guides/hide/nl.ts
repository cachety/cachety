// Uitleg over voorgestelde gebieden om af te dekken (nl): rekeningnummers
// vinden en afdekken, je rekeningnummer delen, een kopie van je bankpas sturen.
// Geschreven voor lezers in Nederland. Alleen platte tekst: geen links, geen
// HTML, geen markdown. Bedrijfsnamen zijn verzonnen.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
//
// Deze uitleg beschrijft de functie `suggested-areas` (docs/prd-suggested-areas.md)
// zoals die is uitgebracht. De aangehaalde knoppen (“Bekijken”, “Alles
// afdekken”, “Deze niet”, “Klaar”, “Iets afdekken”) zijn gecontroleerd tegen
// lib/suggest-copy/nl.ts en lib/locales/nl/strings.ts, en de lijst met nummers
// tegen lib/sensitive.ts: houd ze gelijk.

import type { Guide } from "../types";

const UPDATED = "2026-11-19";

export const HIDE_GUIDES_NL: Guide[] = [
  // ───────────────────────── Nummers vinden en afdekken ─────────────────────────
  {
    slug: "rekeningnummer-zwartlakken-pdf",
    topic: "auto-redact",
    title: "Rekeningnummers in een pdf vinden en zwartlakken voordat je hem verstuurt",
    metaTitle: "Rekeningnummer zwartlakken in een pdf, gratis",
    description:
      "Cachety vindt IBAN's en kaartnummers in je pdf en biedt aan ze zwart te lakken, op je eigen apparaat. Er wordt niets geüpload en niets afgedekt zonder jou.",
    intro:
      "Op een loonstrook, een rekening of een bankafschrift staat vaak meer dan de ontvanger nodig heeft, zoals een rekeningnummer of een kaartnummer. Cachety wijst die aan op de pagina en laat je ze met één tik zwartlakken, zonder dat het bestand je apparaat verlaat.",
    example: "Inkomensbewijs voor huuraanvraag, Makelaardij De Linde, 18-11-2026",
    body: [
      { type: "h2", text: "De nummers die je ongemerkt meestuurt" },
      {
        type: "p",
        text: "Vraagt een makelaar om drie loonstroken, dan wil hij zien wie je betaalt en hoeveel. De rekening waarop je salaris binnenkomt, heeft hij niet nodig. Dient een energierekening als bewijs van je adres, dan heeft niemand het rekeningnummer nodig dat onderaan staat voor de automatische incasso. Maar die nummers staan in kleine letters, op pagina twee of drie, en de meeste mensen sturen het hele bestand zoals het is.",
      },
      {
        type: "p",
        text: "Met de hand afdekken werkt, maar dan moet je weten waar je moet kijken. Cachety zoekt nu voor je.",
      },
      { type: "h2", text: "Waar Cachety naar zoekt" },
      {
        type: "p",
        text: "Voeg je een pdf toe, dan leest Cachety de tekst in je browser en zoekt het naar nummers waarvan het de opbouw kan controleren:",
      },
      {
        type: "list",
        items: [
          "Rekeningnummers die als IBAN zijn geschreven, uit elk land.",
          "Nummers van betaalkaarten van de grote kaartnetwerken.",
          "Je burgerservicenummer (BSN), als erbij staat wat het is: BSN, burgerservicenummer of sofinummer.",
          "Franse socialezekerheidsnummers, Franse belastingnummers en kenmerken van Franse belastingaanslagen.",
          "Identiteits- en belastingnummers uit andere landen: het Duitse fiscale identificatienummer (Steuer-ID), het Spaanse DNI en NIE, het Belgische rijksregisternummer, het Portugese NIF, het Braziliaanse CPF, de Italiaanse fiscale code, het Chinese identiteitskaartnummer, het Japanse My Number, de Iraanse nationale code en het Indonesische NIK.",
        ],
      },
      {
        type: "p",
        text: "Een nummer wordt alleen voorgesteld als het de controle doorstaat die in de opbouw zit, zoals de controlecijfers van een IBAN, of als er een aanduiding naast staat die zegt wat het is. Een telefoonnummer, een datum of een factuurbedrag wordt niet aangewezen alleen omdat het een rij cijfers is.",
      },
      { type: "h2", text: "Zo dek je ze af, stap voor stap" },
      {
        type: "steps",
        items: [
          "Open cachety.com in je browser, op een computer of een telefoon. Je hoeft geen account aan te maken.",
          "Voeg je pdf toe. Vul bij “Waarvoor is deze kopie?” het doel in en bij “Wie krijgt hem?” de ontvanger.",
          "Heeft Cachety iets gevonden, dan zegt een melding boven het voorbeeld hoeveel nummers het zijn. Kies “Bekijken”.",
          "Elke suggestie is omlijnd op de pagina en staat in de lijst met een naam, bijvoorbeeld “Rekeningnummer (IBAN)”. Tik op de suggesties die je wilt afdekken, of kies “Alles afdekken”. Elke afdekking kun je ongedaan maken, en een suggestie die niet klopt, zet je opzij met “Deze niet”.",
          "Loop zelf elke pagina na en teken een rechthoek over alles wat je verder wilt afdekken. Kies dan “Klaar”: pas op dat moment worden de gebieden uit het bestand verwijderd.",
          "Controleer het voorbeeld en download je kopie.",
        ],
      },
      {
        type: "tip",
        text: "Er wordt niets afgedekt tot jij het zegt. Vroeg de ontvanger om je rekeningnummer, laat je IBAN dan zichtbaar: dat is juist wat hij nodig heeft. Hetzelfde geldt voor het belastingnummer en het kenmerk op een Franse belastingaanslag: daarmee kan de ontvanger controleren of de aanslag echt is.",
      },
      {
        type: "p",
        text: "Dezelfde suggesties krijg je in de twee andere tools van Cachety: als je een pdf ondertekent, en als je met Dossier meerdere documenten in één bestand zet.",
      },
      { type: "h2", text: "Wat Cachety niet kan vinden" },
      {
        type: "list",
        items: [
          "Alles op een foto of een scan. In een afbeelding staat geen tekst om te lezen, dus er komen geen suggesties: teken de rechthoeken zelf.",
          "Streepjescodes en QR-codes. Daarin kan dezelfde informatie zitten als in de tekst die ernaast staat.",
          "Een BSN waar niet bij staat wat het is. Negen cijfers kunnen van alles zijn, dus zonder een aanduiding als BSN of burgerservicenummer wordt het nummer niet voorgesteld.",
          "Nummers met een opbouw die Cachety niet controleert, zoals een oud rekeningnummer zonder IBAN, een klant- of contractnummer, een paspoort- of rijbewijsnummer.",
          "Een kaartnummer dat al deels is afgeschermd, zoals de laatste vier cijfers op een bon. Daar valt niets meer af te dekken.",
          "Namen, adressen, geboortedata en telefoonnummers. Die heeft de ontvanger meestal juist nodig, dus ze worden niet voorgesteld.",
        ],
      },
      {
        type: "warning",
        text: "Suggesties zijn een hulpmiddel, geen garantie. Er kan iets worden gemist. Controleer altijd zelf de hele pagina voordat je verstuurt.",
      },
      { type: "h2", text: "Echt verwijderd, en nooit geüpload" },
      {
        type: "p",
        text: "Een afgedekt gebied is geen zwarte vorm die over de tekst ligt. Cachety bouwt elke pagina opnieuw op als afbeelding, dus het nummer is weg uit het bestand en kan er niet onder vandaan worden gekopieerd. Het zoeken naar nummers gebeurt in je browser, met eenvoudige regels. Je document gaat niet naar een server of naar een AI-dienst, en na het laden blijft de pagina werken in vliegtuigmodus.",
      },
    ],
    faq: [
      {
        q: "Dekt Cachety nummers automatisch af?",
        a: "Nee. Het omlijnt wat het heeft gevonden en jij beslist, één voor één of allemaal tegelijk. Sommige nummers staan er omdat de ontvanger ze nodig heeft, en dat weet alleen jij.",
      },
      {
        q: "Werkt het op een foto of een gescand document?",
        a: "Nee. Voor suggesties is een pdf met echte tekst nodig, zoals de loonstroken, rekeningen en afschriften die je van een website downloadt. Op een foto of een scan teken je de rechthoeken zelf met “Iets afdekken”.",
      },
      {
        q: "Wordt mijn document ergens heen gestuurd om het te analyseren?",
        a: "Nee. De controles draaien in je browser, op je eigen apparaat. Er wordt niets geüpload, en geen AI-dienst leest je bestand.",
      },
      {
        q: "Kan er een nummer worden gemist?",
        a: "Ja. Een nummer in een afbeelding, in een streepjescode of met een opbouw die Cachety niet controleert, wordt niet voorgesteld. Daarom vraagt de pagina je altijd om zelf te controleren.",
      },
      {
        q: "Geldt het voor elke pagina van een lange pdf?",
        a: "Ja. De suggesties gelden voor elke pagina, ook voor de pagina's die niet in het voorbeeld te zien zijn. Voor die pagina's toont de lijst de eerste en laatste tekens van elk nummer, zodat je weet wat je afdekt.",
      },
    ],
    updated: UPDATED,
  },

  // ───────────────────────── Rekeningnummer delen ─────────────────────────
  {
    slug: "rekeningnummer-iban-delen-veilig",
    topic: "iban",
    title: "Is het veilig om je rekeningnummer te delen? Wat iemand met je IBAN kan",
    metaTitle: "Is het veilig om je IBAN of rekeningnummer te delen?",
    description:
      "Wat iemand wel en niet kan met je IBAN, wanneer je je rekeningnummer deelt, en hoe je het afdekt op documenten waar het niet op hoeft te staan.",
    intro:
      "Je geeft je rekeningnummer om betaald te worden, en het staat op heel wat documenten die je om andere redenen verstuurt. Op zichzelf is het risico klein. Het wordt pas een probleem als het nummer meereist met de rest van je papieren.",
    example: "Rekeningnummer voor salaris, Groenhof Logistiek, afdeling HR, 18-11-2026",
    body: [
      { type: "h2", text: "Wat iemand met je rekeningnummer kan" },
      {
        type: "p",
        text: "Met je IBAN kan iemand geld naar je rekening overmaken. Daar is het voor. Het nummer alleen is niet genoeg om geld op te nemen of over te boeken: daarvoor zijn je bankpas, je inloggegevens voor internetbankieren of jouw goedkeuring nodig.",
      },
      {
        type: "p",
        text: "Het grootste risico is een automatische incasso die zonder jouw toestemming op jouw naam wordt ingesteld. Bij een Europese incasso (SEPA), de gewone incasso in het hele eurogebied, kun je elke afschrijving tot acht weken na de afboeking door je bank laten terugboeken, zonder reden op te geven. Gaf je er nooit toestemming voor, dan kun je dat tot dertien maanden na de afboeking bij je bank melden: je bank onderzoekt de melding en boekt het bedrag terug als de incasso onterecht was. Controleer dus je afschriften, en meld elke afschrijving die je niet herkent bij je bank.",
      },
      { type: "h2", text: "Het echte gevaar is het hele pakket" },
      {
        type: "p",
        text: "Een rekeningnummer wordt voor een oplichter veel bruikbaarder als het samen komt met een kopie van je paspoort, je adres, je handtekening en je loonstroken. Samen is dat genoeg om te proberen op jouw naam een rekening te openen of krediet aan te vragen. In een huuraanvraag of de papieren voor een nieuwe baan zit precies dat pakket. De vraag is dus minder “is mijn rekeningnummer geheim?” dan “heeft deze persoon het wel nodig?”.",
      },
      { type: "h2", text: "Wanneer je het deelt, en wanneer je het afdekt" },
      {
        type: "list",
        items: [
          "Deel het als iemand je moet betalen of een betaling moet innen waarmee je hebt ingestemd: je werkgever, een verhuurder die je borg terugstort, een energieleverancier die je per automatische incasso betaalt.",
          "Dek het af als je het document om een andere reden verstuurt: een loonstrook als inkomensbewijs, een rekening als bewijs van je adres, een bankafschrift dat alleen je naam en adres hoeft te tonen.",
          "Stuur je rekeningnummer als het kan apart, niet in hetzelfde bestand als je identiteitsbewijs.",
        ],
      },
      { type: "h2", text: "Een rekeningnummer afdekken met Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com in je browser. Er wordt niets geïnstalleerd en je hebt geen account nodig.",
          "Voeg je pdf of foto toe. Vul bij “Waarvoor is deze kopie?” het doel in en bij “Wie krijgt hem?” de ontvanger.",
          "In een pdf zoekt Cachety naar IBAN's en meldt het als het er een vindt. Kies “Bekijken”, tik op de suggestie om het nummer af te dekken en kies dan “Klaar”.",
          "Een rekeningnummer dat niet als IBAN is geschreven, wordt niet voorgesteld, en hetzelfde geldt voor alles op een foto: kies “Iets afdekken” en teken er een rechthoek overheen.",
          "Controleer elke pagina en download dan je kopie.",
        ],
      },
      {
        type: "tip",
        text: "Moet je je rekeningnummer wel versturen, zet er dan een watermerk op dat zegt voor wie en waarvoor het is, zoals “Rekeningnummer voor salaris, Groenhof Logistiek, afdeling HR”. Een kopie met zo'n vermelding is moeilijk ergens anders te hergebruiken.",
      },
      { type: "h2", text: "Je bestand blijft bij jou" },
      {
        type: "p",
        text: "Cachety werkt in je browser. Je afschrift of loonstrook wordt nooit geüpload, en het afgedekte nummer wordt uit het bestand zelf verwijderd, niet alleen bedekt. Bedenk dat suggesties iets kunnen missen: loop elke pagina na voordat je verstuurt.",
      },
    ],
    faq: [
      {
        q: "Kan iemand met mijn IBAN geld van mijn rekening halen?",
        a: "Niet rechtstreeks. Met een IBAN kunnen mensen geld naar je overmaken. Het risico is een automatische incasso die zonder jouw toestemming is ingesteld, en zo'n incasso kun je laten terugboeken. Controleer je afschriften en meld wat je niet herkent.",
      },
      {
        q: "Moet ik mijn IBAN afdekken op een loonstrook?",
        a: "Als je de loonstrook als inkomensbewijs verstuurt, ja: de ontvanger heeft je naam, je werkgever en je loon nodig, niet je rekening. Vraagt je werkgever om je rekeningnummer, stuur het dan apart.",
      },
      {
        q: "Mijn verhuurder vroeg om mijn rekeningnummer. Is dat normaal?",
        a: "Dat kan, bijvoorbeeld om de huurbetaling te regelen of de borg terug te storten. Dan heeft hij het nummer nodig, dus dek het niet af. Zet er een watermerk op met zijn naam en de reden.",
      },
      {
        q: "Wat doe ik als ik een incasso zie waarvoor ik nooit toestemming gaf?",
        a: "Neem direct contact op met je bank en vraag om terugboeking. Bij een Europese incasso (SEPA) heb je dertien maanden om een afschrijving te melden waarvoor je geen toestemming gaf.",
      },
    ],
    updated: UPDATED,
  },

  // ───────────────────────── Kopie van je bankpas ─────────────────────────
  {
    slug: "kopie-bankpas-creditcard-veilig-versturen",
    topic: "bank-card",
    title: "Kopie van je bankpas of creditcard gevraagd? Dit dek je af voordat je hem verstuurt",
    metaTitle: "Kopie van je bankpas of creditcard sturen: wat dek je af?",
    description:
      "Vraagt een hotel of verkoper een foto van je bankpas of creditcard? Welke cijfers je afdekt, waarom de beveiligingscode nooit mee mag, en hoe je dat doet.",
    intro:
      "Hotels, autoverhuurders en sommige webwinkels vragen nog steeds om een foto van je kaart “om de reservering te bevestigen”. Dek voordat je iets verstuurt de delen af die niemand nodig heeft. Nog beter: vraag om een veiligere manier van betalen.",
    example: "Reserveringsbevestiging, Hotel Duinzicht Zandvoort, 18-11-2026",
    body: [
      { type: "h2", text: "Waarom een foto van je kaart riskant is" },
      {
        type: "p",
        text: "Bij de meeste kaarten staan op de voorkant het lange kaartnummer, de vervaldatum en je naam, en staat op de achterkant de beveiligingscode (CVC) van drie cijfers. Bij sommige nieuwere kaarten staat dat allemaal op de achterkant. Samen is dat alles wat iemand nodig heeft om online met je kaart te betalen. Een e-mail of een chatbericht kan jarenlang in verschillende inboxen blijven staan, ver buiten jouw bereik.",
      },
      {
        type: "warning",
        text: "Stuur nooit de beveiligingscode (CVC) mee: de drie cijfers op de achterkant van de kaart, of de vier cijfers op de voorkant van een American Express-kaart. Geen eerlijk bedrijf heeft die op een foto nodig. De eigen beveiligingsregels van de kaartsector verbieden bedrijven om de code te bewaren nadat de betaling is goedgekeurd.",
      },
      { type: "h2", text: "Vraag eerst om een andere manier" },
      {
        type: "p",
        text: "Een bedrijf dat kaarten accepteert, zou je een beveiligde betaallink moeten kunnen sturen, de betaling via zijn boekingssysteem kunnen doen, of de kaart kunnen controleren als je aankomt. Vraag ernaar. Staat het bedrijf toch op een kopie, dan is dat meestal om te controleren of de kaart bestaat en op jouw naam staat, en daarvoor volstaat een deels afgedekte kopie.",
      },
      { type: "h2", text: "Wat je afdekt en wat je laat staan" },
      {
        type: "list",
        items: [
          "Dek de middelste cijfers van het kaartnummer af. Laat hooguit de laatste vier cijfers staan: die staan ook op de bon die je zelf meekrijgt.",
          "Dek de beveiligingscode af. Dek op de achterkant van de kaart de hele strook af waarop de code staat.",
          "Dek de vervaldatum af, tenzij er met een goede reden om wordt gevraagd.",
          "Laat je naam en het logo van de bank staan, zodat de kopie nog steeds laat zien dat de kaart van jou is.",
        ],
      },
      { type: "h2", text: "De cijfers afdekken met Cachety" },
      {
        type: "steps",
        items: [
          "Maak een foto van de voorkant van de kaart. Fotografeer de achterkant alleen als erom wordt gevraagd.",
          "Open cachety.com op je telefoon of computer en voeg de foto toe.",
          "Vul bij “Waarvoor is deze kopie?” het doel in, bijvoorbeeld “Reserveringsbevestiging”, en bij “Wie krijgt hem?” de naam van het hotel.",
          "Kies onder het voorbeeld “Iets afdekken” en teken een rechthoek over de middelste cijfers, de vervaldatum en de beveiligingscode.",
          "Controleer het voorbeeld, download de kopie en verstuur die.",
        ],
      },
      {
        type: "tip",
        text: "In een pdf, zoals een afschrift waarop een volledig kaartnummer staat, kan Cachety het nummer vinden en aanbieden het af te dekken. Op een foto van de kaart staat geen tekst om te lezen, dus daar teken je de rechthoeken zelf.",
      },
      { type: "h2", text: "Wat er met de foto gebeurt" },
      {
        type: "p",
        text: "Er verlaat niets je apparaat. Cachety werkt in je browser en er is geen server die je foto ontvangt. De afgedekte cijfers worden uit de afbeelding verwijderd, niet alleen bedekt, en de plek waar de foto is gemaakt, wordt uit het bestand gehaald. Het watermerk zegt voor wie de kopie is gemaakt, en dat maakt hergebruik moeilijker.",
      },
      {
        type: "p",
        text: "Eerlijk is eerlijk: een afgedekte kopie met watermerk verkleint het risico, maar neemt het niet weg. Voelt een verzoek niet goed, stuur de kaart dan helemaal niet en bel het bedrijf op een nummer dat je zelf hebt opgezocht.",
      },
    ],
    faq: [
      {
        q: "Welke cijfers van mijn kaartnummer mag ik laten zien?",
        a: "De laatste vier zijn voor de meeste controles genoeg, en die drukken winkels ook af op de bon die je zelf meekrijgt. Volgens de beveiligingsregels voor kaarten hoort een bedrijf normaal niet meer te tonen dan de eerste cijfers, waaraan je de bank herkent, en de laatste vier. Dek de rest af.",
      },
      {
        q: "Is het veilig om een foto van mijn kaart te mailen of via WhatsApp te sturen?",
        a: "Niet met het volledige nummer en de beveiligingscode zichtbaar. Berichten worden gekopieerd, doorgestuurd en bewaard, en Visa raadt zelf aan om betaalgegevens nooit per e-mail te versturen. Moet je toch een kopie sturen, dek dan eerst de middelste cijfers en de beveiligingscode af.",
      },
      {
        q: "Het hotel wil de voorkant en de achterkant. Wat doe ik?",
        a: "Vraag waarom, en stel een beveiligde betaallink voor. Stuur je de achterkant toch, dek dan de beveiligingscode en de strook eromheen af. De regels van de kaartsector staan een bedrijf niet toe die code te bewaren nadat de betaling is goedgekeurd.",
      },
      {
        q: "Ik heb al een volledige foto van mijn kaart gestuurd. Wat nu?",
        a: "Bel je bank. Die kan de kaart blokkeren en een nieuwe sturen, en legt uit hoe je een betaling betwist die je niet hebt gedaan. Houd je afschriften de weken daarna in de gaten.",
      },
    ],
    updated: UPDATED,
  },
];
