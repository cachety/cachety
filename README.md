# Filigrane Local

Ajoutez un filigrane à vos documents (PDF, images) **entièrement dans votre navigateur**. Aucun fichier n'est envoyé à un serveur.

**[filigrane-local.fr](https://filigrane-local.fr)**

![Aperçu de Filigrane Local : un PDF filigrané dans le navigateur](docs/preview.png)

> Inspiré de [Filigraneur](https://github.com/cyberclarence/filigraneur) (CyberClarence), réécrit par KazeTachinuu. Licence AGPL.

## Pourquoi local

Les services en ligne de filigrane envoient vos documents sur leurs serveurs. Pour une carte d'identité ou un justificatif, c'est un risque inutile : tout le traitement peut se faire sur votre appareil. C'est ce que fait Filigrane Local.

La promesse est appliquée par le navigateur, pas seulement affirmée : une Content-Security-Policy stricte (`connect-src 'self'`) bloque toute requête vers un domaine externe. Le site fonctionne d'ailleurs hors-ligne après la première visite.

J'explique la démarche et la comparaison avec l'outil du gouvernement dans un article : [Watermarking an ID: what actually leaves your device](https://hugosibony.com/blog/filigrane-local-vs-serveur/).

## Comment ça marche

- Les pages PDF sont rendues dans le navigateur avec PDF.js, les images via `createImageBitmap`.
- Le filigrane est dessiné en mosaïque diagonale puis **aplati dans les pixels** : impossible à retirer comme un simple calque PDF.
- Les pages filigranées sont réassemblées en PDF avec pdf-lib (les images ressortent en PNG).
- Rien ne quitte l'onglet : ni réseau, ni stockage serveur.

## Fonctionnalités

- Plusieurs documents à la fois, formats mélangés (PDF et images).
- Interface français / anglais (détection automatique).
- Téléchargement groupé en un seul ZIP.
- Aperçu automatique ou application à la demande, au choix.
- Installable et utilisable hors-ligne (PWA).

## Développement

```sh
bun install
bun run dev      # serveur de développement
bun run test     # tests (bun test)
bun run build    # export statique dans out/
bun run deploy   # build + déploiement Cloudflare Pages
```

Stack : Next.js (export statique), React, Tailwind CSS, PDF.js, pdf-lib, fflate. Aucun serveur.

Contributions bienvenues via les issues et pull requests.

## Licence

AGPL-3.0
