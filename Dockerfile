# syntax=docker/dockerfile:1
#
# Cachety en local : docker run --rm -p 127.0.0.1:8000:8080 ghcr.io/cachety/cachety
# puis http://localhost:8000. Usage local seulement (voir docker/nginx.conf).
#
# Construction depuis les sources : docker build -t cachety .
# La CI ne reconstruit pas : elle remplace l'étape « site » par l'export déjà
# testé (--build-context site=./out), comme pour le déploiement.
#
# Images épinglées par digest (Dependabot les met à jour).

# Même chaîne d'outils que la CI : Node 24 (.nvmrc) pour next build, Bun 1.4.2
# (bun-version dans ci.yml). L'export ne dépend pas de l'architecture : construit
# une fois, sur l'hôte. Bun a sa propre étape pour être, lui aussi, celui de
# l'hôte (un COPY --from=<image> prendrait celui de la plateforme cible).
FROM --platform=$BUILDPLATFORM oven/bun:1.4.2@sha256:9114c058aeae42162ee16dd5084b95fe9473970bb6bcb5b232ab1630f0546895 AS bun

FROM --platform=$BUILDPLATFORM node:24-bookworm-slim@sha256:873f586f3794f52281bd039bf02c048a0be08fde619338f9941bad1eb6b34530 AS build
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /src
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM scratch AS site
COPY --from=build /src/out/ /

# nginx sans privilèges (utilisateur non root, port 8080). Aucun RUN ici :
# l'image arm64 se construit sans émulation.
FROM nginxinc/nginx-unprivileged:1.31-alpine@sha256:b5047b9b76845eac124358373c6852377c52e4b05834a47647e955dd91cb8f1e
LABEL org.opencontainers.image.title="Cachety" \
      org.opencontainers.image.description="Watermark ID documents and other files privately, in your browser. Nothing is uploaded." \
      org.opencontainers.image.source="https://github.com/cachety/cachety" \
      org.opencontainers.image.licenses="AGPL-3.0-only"
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=site / /usr/share/nginx/html/
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://127.0.0.1:8080/ || exit 1
