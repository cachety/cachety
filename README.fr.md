# Cachety

[English](README.md) · **Français** · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Nederlands](README.nl.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md) · [فارسی](README.fa.md) · [日本語](README.ja.md) · [简体中文](README.zh.md)

**Filigranez vos papiers d'identité et documents sensibles sans qu'ils quittent jamais votre appareil.**

Cachety ajoute un filigrane à vos PDF et à vos photos (carte d'identité, passeport, fiche de paie, avis d'imposition, relevé bancaire) entièrement dans votre navigateur. Aucun fichier n'est jamais envoyé : il n'existe d'ailleurs aucun serveur capable d'en recevoir un. C'est gratuit, sans compte, sans pistage, et open source.

### 👉 À utiliser tout de suite : **[cachety.com](https://cachety.com)**

Disponible en English, Français, Español, Português, Deutsch, Nederlands, Bahasa Indonesia, العربية, فارسی, 日本語 et 简体中文.

![Cachety : un PDF filigrané dans le navigateur](docs/preview.png)

## Pourquoi Cachety existe

On nous demande sans cesse des copies de nos papiers : pour louer un appartement, commencer un nouveau travail, ouvrir un compte en banque. Une fois envoyée, une copie sans protection peut servir à n'importe quoi, y compris à une usurpation d'identité. Un filigrane qui indique à quoi sert la copie, à qui elle est destinée et la date la limite à cet usage précis. C'est exactement ce que recommande [Cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr), le dispositif national d'assistance aux victimes de cybermalveillance.

La plupart des outils de filigrane en ligne le font en envoyant votre pièce d'identité sur leurs serveurs. Pas Cachety.

## Utilisez la version en ligne : c'est la meilleure solution

Rien à installer, rien à compiler. **[cachety.com](https://cachety.com)** est la version que nous recommandons à tout le monde :

- **Tout aussi confidentielle.** Même en ligne, vos fichiers ne quittent jamais votre appareil : la page fait tout le travail dans votre navigateur, et il lui est techniquement interdit d'envoyer des données où que ce soit. Vérifiez-le vous-même : ouvrez la page, passez en mode avion, et filigranez un document.
- **Mieux protégée.** Le site officiel est servi avec l'ensemble des en-têtes de sécurité (protection contre le clickjacking, HSTS, isolation cross-origin, Content-Security-Policy stricte page par page). Une copie hébergée soi-même sur un serveur web basique en oublie souvent une partie.
- **Toujours à jour.** Correctifs de sécurité et améliorations vous parviennent à votre prochaine visite, sans rien à mettre à jour.
- **Rapide partout.** Servie depuis un CDN mondial, elle s'ouvre vite où que vous soyez, et fonctionne hors connexion une fois chargée.
- **Agréable sur tous les appareils.** Fonctionne sur ordinateur, iPhone et Android. Ajoutez-la à votre écran d'accueil comme une appli ; sur Android, partagez un fichier directement vers Cachety.
- **Aide comprise.** Une visite guidée montre aux nouveaux venus par où commencer, et des guides pratiques expliquent les situations courantes.

L'auto-hébergement reste possible et pleinement pris en charge (voir plus bas), pour les organisations qui en ont besoin.

## Fonctionnalités

- **PDF et images :** JPG, PNG, WebP, GIF, BMP, AVIF et photos d'iPhone (HEIC). Un fichier ou plusieurs à la fois (jusqu'à 200 Mo par fichier, 500 pages par PDF).
- **Filigrane sur toute la page**, fondu dans l'image. Impossible de l'effacer en modifiant simplement le PDF, et sa disposition varie d'une copie à l'autre. Choix de la police, de la taille, de la couleur, de l'opacité et d'un effet de vague.
- **Trois étapes simples :** votre document, son usage et son destinataire, puis l'aperçu et le téléchargement. Le texte du filigrane est rédigé pour vous (« usage, destinataire, date », avec des exemples prêts à l'emploi) et reste librement modifiable.
- **Données cachées retirées :** texte sélectionnable, métadonnées et position GPS des photos. Chaque page est reconstruite à partir de ses pixels.
- **Masquage :** noircissez un IBAN, un numéro fiscal ou une photo. Le contenu est réellement supprimé, pas seulement recouvert.
- **Copies traçables :** ajoutez `{code}` au texte et chaque copie reçoit sa propre référence courte, listée après le téléchargement pour que vous la conserviez.
- **Plusieurs destinataires :** une copie par destinataire (jusqu'à 20), chacune à son nom, en un seul téléchargement.
- **Mot de passe :** chiffrement PDF AES-256 (PDF 2.0). Cocher « Verrouiller avec un mot de passe » crée un mot de passe facile à lire de 12 mots aléatoires (132 bits, liste de mots BIP39) ; votre propre mot de passe ou un mot de passe aléatoire de 256 bits restent disponibles. Effacement automatique du presse-papiers.
- **Taille du fichier affichée avant le téléchargement**, avec « Réduire la taille » (10, 5, 2 ou 1 Mo) pour les sites de dépôt et les e-mails qui la limitent.
- **Un seul PDF** dans l'ordre de votre choix (glisser-déposer), ou une archive **ZIP**.
- **Fonctionne sur téléphone**, s'installe comme une appli, et fonctionne **hors connexion** une fois chargé.
- **11 langues**, avec mise en page de droite à gauche pour l'arabe et le persan, et des polices dédiées à chaque écriture.
- **Visite guidée** pour les nouveaux venus, proposée quand quelqu'un semble ne pas savoir par où commencer.
- **70 guides pratiques** pour les situations de tous les jours en France, au Royaume-Uni, en Allemagne, aux Pays-Bas, en Espagne et en Amérique latine, au Brésil, en Indonésie, dans le monde arabe, en Iran, au Japon et en Chine.
- **71 comparatifs vérifiés** avec d'autres outils de filigrane (FiligraneFacile, iLovePDF, Smallpdf, PDF24, Adobe Acrobat, KopieID et d'autres), sources à l'appui, y compris quand un autre outil est le meilleur choix.
- **Sur des sites partenaires :** les sites approuvés peuvent afficher l'outil dans leurs pages (une iframe servie par cachety.com : le site qui l'accueille ne voit pas les documents). Voir [docs/embed.md](docs/embed.md) et [cachety.com/fr/partners](https://cachety.com/fr/partners).

## Confidentialité dès la conception, et vérifiable

- Tout le traitement se fait dans le navigateur (pdf.js, canvas, pdf-lib). Les fichiers n'existent qu'en mémoire, sous forme d'objets `File`/`Blob`.
- La Content-Security-Policy fixe `connect-src 'self'` : le navigateur lui-même refuse toute requête vers un autre domaine, même si du code malveillant parvenait à s'exécuter.
- Aucun cookie, aucune statistique de visite, aucun script tiers, aucun compte. Seules les préférences d'affichage sont conservées dans `localStorage`. Les polices sont servies par le site lui-même.
- Chaque garantie est vérifiée par des tests automatiques lancés à chaque modification : CSP, absence de ressources externes, nettoyage des fichiers produits, et une tentative d'exfiltration simulée.

Modèle de menace complet, mesures et tests : **[docs/security.md](docs/security.md)**. Pour signaler une faille, voir **[SECURITY.md](SECURITY.md)**.

## Auto-hébergement

Inutile de faire confiance à notre déploiement : le site est un export statique que vous pouvez héberger vous-même.

Prérequis : [Bun](https://bun.sh).

```sh
git clone https://github.com/cachety/cachety
cd cachety
bun install
bun run build      # static export in out/
bunx serve out     # or any static file server
```

Le dossier `out/` peut être déposé tel quel sur n'importe quel hébergement statique. Chaque page embarque sa propre Content-Security-Policy dans une balise `<meta>`, si bien que le verrou réseau fonctionne même sans nos en-têtes HTTP. Pour obtenir la même protection que cachety.com, configurez aussi les en-têtes de `out/_headers`. Voir [docs/deploy.md](docs/deploy.md) pour Cloudflare Pages, GitHub Pages et d'autres serveurs.

## Développement

```sh
bun run dev        # development server
bun test           # unit tests and static security checks
bun run test:e2e   # browser suite (CHROMIUM_EXE=/path/to/chrome to use a local Chrome)
```

Technologies : Next.js (export statique), React, Tailwind CSS, PDF.js, pdf-lib, libheif.

- Textes de l'interface : `lib/i18n.tsx` (français, anglais, japonais, chinois) et `lib/locales/<lang>/strings.ts` (les autres langues).
- Textes du site : `lib/site-copy.ts` et `lib/locales/<lang>/site.ts`. Métadonnées des pages : `lib/site-meta.ts` et `lib/locales/<lang>/meta.ts`.
- Guides : `lib/guides/<lang>.ts`.
- Pages de comparatif (« Cachety vs X ») : `lib/compare/<lang>.ts`. Chaque affirmation sur un autre outil doit citer sa source (`sources`) et porter sa date de vérification (`checked`), et chaque page doit dire quand l'autre outil est le meilleur choix. Revérifiez ces faits régulièrement : les services évoluent.
- Les langues qui s'écrivent de droite à gauche utilisent les classes Tailwind logiques (`ms-`, `pe-`, `start-`, `end-`…) plutôt que `ml-`, `pr-`, `left-`, `right-`.

Toutes les langues doivent garder la même structure ; des tests le vérifient.

## Soutenir le projet

Cachety est gratuit et le restera. S'il vous a rendu service, vous pouvez [le soutenir sur GitHub Sponsors](https://github.com/sponsors/amirhmoradi). Les dons aident à payer le nom de domaine et les outils de développement, et surtout le temps que tout cela demande.

Il n'y a aucune publicité aujourd'hui. Le projet pourra un jour afficher quelques liens sponsorisés choisis à la main, dans le même esprit (outils de chiffrement, logiciels libres, partage sécurisé de documents). Les règles sont strictes et font partie de la promesse de confidentialité :

- clairement signalés comme sponsorisés ;
- servis depuis le domaine de Cachety lui-même (images et liens uniquement) : aucune régie publicitaire, aucun script tiers, aucun pixel de suivi ;
- jamais choisis ni affichés en fonction de ce que l'utilisateur met dans l'outil ;
- la Content-Security-Policy reste aussi stricte qu'aujourd'hui (`connect-src 'self'`).

## Crédits et licence

Cachety est un projet personnel, conçu et maintenu par **[Amir Moradi](https://amirmoradi.com)** en France.

C'est une version modifiée de **[Filigrane Local](https://github.com/KazeTachinuu/filigrane-local)** de Hugo Sibony (KazeTachinuu), lui-même une réécriture inspirée de **[Filigraneur](https://github.com/cyberclarence/filigraneur)** de CyberClarence. Merci à tous les deux. Voir [NOTICE](NOTICE) pour le détail.

Les mots de passe faciles à lire utilisent la **[liste de mots BIP39 en anglais](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)** (licence MIT, © 2013 Marek Palatinus, Pavol Rusnak, Aaron Voisine, Sean Bowe).

Ce qui est prévu : **[ROADMAP.md](ROADMAP.md)**, également affiché sur [cachety.com/fr/roadmap](https://cachety.com/fr/roadmap).

Sous licence **GNU Affero General Public License v3.0** ([LICENSE](LICENSE)). Si vous proposez une version modifiée sous forme de service, l'AGPL vous oblige à en fournir le code source à vos utilisateurs.
