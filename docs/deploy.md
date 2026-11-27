# Deploying Cachety

Cachety is a static export (`out/`). It can be hosted anywhere that serves files. Two free options fit well:

| | **Cloudflare Pages** (recommended, configured) | **GitHub Pages** |
| --- | --- | --- |
| Price | Free tier: unlimited bandwidth and requests, 500 builds/month | Free for public repositories |
| Custom domain + HTTPS | Yes | Yes |
| HTTP security headers (`_headers`) | **Yes**: per-page CSP, HSTS, `frame-ancestors`, COOP/COEP, Permissions-Policy | **No**: GitHub Pages ignores `_headers` |
| Network lock (CSP `connect-src 'self'`) | Header and `<meta>` | `<meta>` only (still enforced) |
| Clean URLs (`/fr` → `fr.html`) | Yes | Yes |

**Recommendation: Cloudflare Pages.** The `<meta>` CSP keeps the "nothing can be uploaded" guarantee on both hosts. But only Cloudflare applies the headers that are impossible in a `<meta>` tag: clickjacking protection (`frame-ancestors`), HSTS, cross-origin isolation (COOP/COEP/CORP) and Permissions-Policy. The privacy page also names Cloudflare as the host.

---

## Cloudflare Pages via GitHub Actions (set up in this repository)

`.github/workflows/ci.yml` runs on every push and pull request:

1. `test` job: dependency audit, unit tests, static export, export security tests, then the Chromium browser suite. On a push to `main` or a `v*` tag, it uploads the tested `out/` as an artifact.
2. `browsers` job: the same browser suite on WebKit (blocking) and Firefox (informational).
3. `deploy` job: **only on a push to `main`, and only if `test` and `browsers` passed.** It downloads the exact `out/` that was tested and publishes it with Wrangler, which is pinned in `bun.lock`.
4. `image` job: on a push to `main` (`edge` tag) or a `v*` tag (`1.2.3`, `1.2`, `1`, `latest`), after `test` and `browsers`. It packages the same tested `out/` into the Docker image (nginx), checks that pages, the pdf.js worker and the 404 are served, then publishes it for amd64 and arm64 to `ghcr.io/<owner>/cachety` with a build attestation.

Pull requests and the weekly audit run never deploy or publish an image; a `v*` tag publishes the image but does not redeploy the site.

**Manual publish.** To force a deploy without a new commit (for example after adding the secrets, or after a Cloudflare setting change): GitHub → *Actions* → *CI* → *Run workflow*, pick the `main` branch, keep **Publish** checked, and run. The full test suite runs first, as for a push; untick **Publish** to only run the tests. Manual runs on other branches never deploy.

### One-time setup

1. **Create the Pages project** (once, from your machine):
   ```sh
   bunx wrangler login
   bunx wrangler pages project create cachety --production-branch main
   ```
   Do *not* connect the project to Git in the Cloudflare dashboard. GitHub Actions does the deploying, after the tests.

2. **Create an API token**: Cloudflare dashboard → *My Profile* → *API Tokens* → *Create Token* → *Custom token*.
   - Permissions: **Account → Cloudflare Pages → Edit**. Nothing else.
   - Account resources: your account only.

3. **Add two repository secrets**: GitHub → *Settings* → *Secrets and variables* → *Actions*.
   - `CLOUDFLARE_API_TOKEN`: the token from step 2.
   - `CLOUDFLARE_ACCOUNT_ID`: shown in the right-hand sidebar of the Cloudflare dashboard (*Workers & Pages* overview).

4. **Optional but recommended**: GitHub → *Settings* → *Environments* → `production`. Restrict deployments to the `main` branch, and add yourself as a required reviewer if you want to approve each release.

5. **Custom domain**: Cloudflare → *Workers & Pages* → `cachety` → *Custom domains* → add `cachety.com`, then `www.cachety.com`. If the domain's DNS is already on Cloudflare, the records are created for you. Then redirect `www` to the apex: *Rules* → *Redirect Rules* → `www.cachety.com/*` → `https://cachety.com/${1}`, 301. Do not skip it: without it, `www` serves a second copy of the site (kept out of search by an `X-Robots-Tag: noindex` rule in `_headers`, as is `cachety.pages.dev`), and in Google Search Console use a **Domain** property (`cachety.com`) or the `https://cachety.com/` prefix, not `https://www.cachety.com/`, or the sitemap is rejected because its URLs are on another host.

6. **Keep it tracker-free**: do **not** enable *Web Analytics* or *Zaraz* on the zone or the Pages project. They inject a third-party script, which the CSP would block, and they would contradict the privacy page. Leave *Email obfuscation* and *Rocket Loader* off too, since they rewrite HTML and break the CSP hashes.

From then on, every push to `main` that passes the tests is live within a few minutes.

### Manual deploy (from your machine)

```sh
bun run deploy     # build, then wrangler pages deploy
```

### Docker image (ghcr.io)

The `image` job needs no secret: it pushes with the workflow's own token. Once:

- After the first publish, GitHub → your profile or organisation → *Packages* → `cachety` → *Package settings* → *Change visibility* → **Public**. A new package starts private, so `docker pull` without logging in fails until then.
- Version tags on the image come from git tags: `git tag v1.3.0 && git push origin v1.3.0`. Without one, only `edge` and `sha-…` exist.

Running it locally: see *Self-hosting* → *With Docker* in the [README](../README.md).

### Checking a deployment

```sh
curl -sI https://cachety.com/en | grep -i -E "content-security|strict-transport|x-frame"
```

The response should show a CSP with sha256 hashes, HSTS and `X-Frame-Options: DENY`.

### Limits to keep in mind

`_headers` allows at most **100 rules** and **2,000 characters per line**. The build groups the CSP rules by language: one rule per language for every page under `/fr/`, `/ja/`… plus one exact rule for each home page. If a language's rule would exceed the line limit (the build keeps a margin: 1,950 characters), that language automatically falls back to a finer grouping of **three rules**: one for its guides (`/fr/guides/*`), one for its comparisons (`/fr/compare/*`) and one for every page directly under the language (`/fr/:page`: sign, dossier, about, privacy, roadmap, partners and the two index pages). `:page` is a Cloudflare placeholder: it matches exactly one path segment, so `/fr/sign` gets that rule and `/fr/guides/some-guide` does not. Only if that third line were itself too long would the build go back to one exact rule per page. The build **fails** if either limit is still exceeded, so you will know before deploying.

Where the count stands:

| Date | Pages | Rules | Longest line | Note |
| --- | --- | --- | --- | --- |
| 2026-10-17 | 333 | 66 | 1,919 | Before `/dossier`. Finer grouping was one exact rule per page: 9 rules per language for de, es, id, pt. |
| 2026-11-18 | 345 | 80 | 1,919 | Empty `/dossier` routes added, old grouping: `en` fell back too (10 rules). One more page or guide in the six other grouped languages would have gone past 100. |
| 2026-11-18 | 345 | 45 | 1,919 | Same pages, finer grouping reduced to three rules per language (`/fr/:page`). |
| 2026-11-18 | 367 | 57 | 1,163 | Dossier pages with their content, and two dossier guides per language: every language is now on the finer grouping. Longest line: the Spanish comparisons (`/es/compare/*`, 16 hashes). |

With every language on the finer grouping the count is 57 (4 fixed rules, 3 for scripts and workers, 16 exact rules for the home pages and the pages without a language, 3 per language, 1 for the embed), so new pages and guides no longer move it. A new language adds 4 rules at most. What can still grow is a line: a section (`/fr/guides/*`, `/fr/compare/*`) holds about 30 guides or comparisons before it passes 1,950 characters, and the build fails if one does.

After the first deployment that carries a `/<lang>/:page` rule, check one page of each kind once (the placeholder had not been used on this site before 2026-11-18):

```sh
curl -sI https://cachety.com/de/dossier | grep -i -c "content-security-policy"      # 1
curl -sI https://cachety.com/de/guides/<a-guide> | grep -i "content-security-policy" # one policy, no ", default-src" in the middle
```

---

## GitHub Pages (alternative)

GitHub Pages works, with the header limitations described above. Replace the `deploy` job in `.github/workflows/ci.yml` with the following (SHAs pinned as of 2026-10):

```yaml
  deploy:
    name: Deploy (GitHub Pages)
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    needs: [test, browsers]
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/download-artifact@9000827ccba6bdab643e8b6fd33ac0654aef8333 # v8.0.2
        with:
          name: site
          path: out/
      - uses: actions/configure-pages@45bfe0192ca1faeb007ade9deae92b16b8254a0d # v6.0.0
      - uses: actions/upload-pages-artifact@fc324d3547104276b827a68afc52ff2a11cc49c9 # v5.0.0
        with:
          path: out/
      - id: deployment
        uses: actions/deploy-pages@368f82528645a54fb793d4d04e342629a3f51346 # v5.0.1
```

Then: GitHub → *Settings* → *Pages* → *Source: GitHub Actions*, and add `cachety.com` as the custom domain (DNS: `A`/`AAAA` records to GitHub Pages, or a `CNAME` for `www`).

---

## Any other host (Nginx, Apache, your own server)

Serve `out/` with "try `$uri`, `$uri.html`, `$uri/index.html`" resolution. Reproduce the headers from `out/_headers`: the `/*` block applies to everything, and each path-specific block adds that page's CSP. The `<meta>` CSP in each page already keeps the network lock, so the headers mainly add `frame-ancestors`, HSTS and cross-origin isolation.

For local use, the Docker image does this with nginx (`docker/nginx.conf`), without the headers: see the README.
