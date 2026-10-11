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

1. `test` job: dependency audit, unit tests, static export, export security tests, then the Chromium browser suite. On a push to `main`, it uploads the tested `out/` as an artifact.
2. `browsers` job: the same browser suite on WebKit (blocking) and Firefox (informational).
3. `deploy` job: **only on a push to `main`, and only if `test` and `browsers` passed.** It downloads the exact `out/` that was tested and publishes it with Wrangler, which is pinned in `bun.lock`.

Pull requests and the weekly audit run never deploy.

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

5. **Custom domain**: Cloudflare → *Workers & Pages* → `cachety` → *Custom domains* → add `cachety.com`, then `www.cachety.com`. If the domain's DNS is already on Cloudflare, the records are created for you. Then redirect `www` to the apex: *Rules* → *Redirect Rules* → `www.cachety.com/*` → `https://cachety.com/${1}`, 301.

6. **Keep it tracker-free**: do **not** enable *Web Analytics* or *Zaraz* on the zone or the Pages project. They inject a third-party script, which the CSP would block, and they would contradict the privacy page. Leave *Email obfuscation* and *Rocket Loader* off too, since they rewrite HTML and break the CSP hashes.

From then on, every push to `main` that passes the tests is live within a few minutes.

### Manual deploy (from your machine)

```sh
bun run deploy     # build, then wrangler pages deploy
```

### Checking a deployment

```sh
curl -sI https://cachety.com/en | grep -i -E "content-security|strict-transport|x-frame"
```

The response should show a CSP with sha256 hashes, HSTS and `X-Frame-Options: DENY`.

### Limits to keep in mind

`_headers` allows at most **100 rules** and **2,000 characters per line**. The build writes one CSP rule per page, except guide and comparison pages, which share one rule per language and section (57 rules for 126 pages in 7 languages). It **fails** if either limit is exceeded, so you will know before deploying. Adding guides or comparisons adds no rules; each new language adds about 7.

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
