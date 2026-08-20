# Setup checklist — McKay

One-time steps to take this scaffold live. Phases match
[`docs/plan.html`](docs/plan.html) — open that in a browser for the reasoning
behind each step and the links to official docs.

Work top to bottom. Everything above the line is done.

---

## ✅ Phase 0 — Scaffold (done)

- [x] Vite + React 19 + TypeScript + Tailwind v4 + pnpm
- [x] `CLAUDE.md` guardrails, `.github/CODEOWNERS`, PR template
- [x] CI workflow (`.github/workflows/ci.yml`) — validated with `actionlint`
- [x] `.github/dependabot.yml` — grouped version updates
- [x] Design system: `src/styles/theme.css` + `docs/design-system.html`
- [x] Unit tests (Vitest) and end-to-end tests (Playwright, Chrome + mobile Safari)
- [x] Verified locally: format, lint, typecheck, test, build, e2e all pass

**Verify it yourself before pushing anything:**

```bash
pnpm install
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
pnpm exec playwright install chromium webkit   # first time only
pnpm e2e
pnpm dev                                       # then open http://localhost:5173
```

Also open `docs/design-system.html` in a browser — that's the file Alysa will
look at when she decides how the site should look.

---

## ☐ Phase 1 — GitHub

- [x] Alysa creates her account at **github.com/signup** and verifies her email
- [x] She creates a **public** repo — it's `alysasnell/alysasnell-portfolio`
      (`git@github.com:alysasnell/alysasnell-portfolio.git`)
- [x] She adds `mckayqsnell` as a collaborator
      (Settings → Collaborators → Add people); invite accepted — push confirmed
- [x] `git init` here, commit the scaffold, push to her repo
- [ ] **Protect main.** Settings → Rules → Rulesets → New branch ruleset,
      named `protect-main`:
  - [ ] **Enforcement status: Active** — it defaults to Disabled, easy to miss
  - [ ] Target branches → Add a target → **Default branch**
  - [ ] Require a pull request before merging → **1 approval**
  - [ ] Require review from **Code Owners** (this is what makes CODEOWNERS bite)
  - [ ] Require status checks to pass → add `Typecheck · Lint · Test · Build`
        and `End-to-end (Playwright)`

> **Order matters:** status check names don't appear in the search box until CI
> has run at least once. Push the scaffold, open one throwaway PR to make CI
> run, then come back and add the checks.

### Dependabot — turn both of these on

`.github/dependabot.yml` configures _routine version updates_. **Security
alerts and their automatic PRs are separate settings in the web UI and are
not configured by any file in this repo.** Both must be switched on:

- [ ] Settings → **Advanced Security** → **Dependabot alerts** → Enable
- [ ] Settings → **Advanced Security** → **Dependabot security updates** → Enable
      ← _this is the one that opens a PR automatically when a vulnerability is found_
- [ ] Settings → Advanced Security → **Dependency graph** → Enable (usually on
      by default for public repos; the other two need it)

Without the second box, GitHub tells you about vulnerabilities but never fixes
them, which is the worst of both worlds for a repo nobody checks daily.

- [ ] Create the `infra` and `dependencies` labels (Issues → Labels). Both
      `dependabot.yml` and CLAUDE.md reference them; a label that doesn't exist
      is silently dropped, so infra PRs would arrive unmarked.

> **Known risk:** GitHub documents Dependabot's pnpm support as covering
> pnpm v7–v10; this repo pins pnpm 11. If Dependabot PRs show up unable to
> update `pnpm-lock.yaml`, drop `packageManager` in `package.json` to the
> latest pnpm 10 and regenerate the lockfile.

---

## ☐ Phase 2 — Cloudflare

- [ ] Alysa creates an account at **dash.cloudflare.com/sign-up**, verifies email
- [ ] She invites `mckayqsnell@gmail.com` as **Administrator**
      (Manage Account → Members → Invite); you accept
- [ ] Register **alysasnell.com** (Domain Registration → Register domains, ~$10.44/yr,
      her card, auto-renew on)

## ☐ Phase 3 — Cloudflare Workers

> **This was originally written for Cloudflare Pages.** The dashboard's "import
> a repository" flow now creates a **Worker** (Workers Builds) instead, which is
> what actually got set up — the project is `alysasnell-portfolio`. Pages is in
> maintenance mode, so staying on Workers is the right call, but it changes one
> thing: Pages reads the output directory from the dashboard, Workers reads it
> from **`wrangler.jsonc` in the repo**. That file was missing, which is why the
> first PR build failed with _"Missing entry-point to Worker script or to assets
> directory."_ It exists now.

- [x] Workers & Pages → Create application → Connect to Git
      (authorized with **her** GitHub, scoped to just this repo)
- [x] Worker name `alysasnell-portfolio`, production branch `main`
- [x] `wrangler.jsonc` committed — assets dir `./dist`, `preview_urls: true`
- [ ] **Set both deploy commands to use pnpm, not npx.** Worker → Settings →
      Build → Deploy command:
  - Build command: `pnpm build`
  - Deploy command: `pnpm run deploy` (was `npx wrangler deploy`)
  - Non-production branch deploy command: `pnpm run deploy:preview`
    (was `npx wrangler versions upload`)

  > `npx` pulls whatever wrangler is latest at build time. `wrangler` is a
  > devDependency now, locked in `pnpm-lock.yaml`, so deploys stop floating.

- [ ] Confirm the build picks Node 24 from `.node-version`; if not, set the
      **`NODE_VERSION`** environment variable to `24`
- [ ] Confirm `alysasnell-portfolio.<subdomain>.workers.dev` loads
- [ ] Worker → Settings → Domains & Routes → Add → Custom domain →
      `alysasnell.com` (always via the dashboard — a hand-made CNAME breaks)
- [ ] Open a test PR and confirm Cloudflare posts a **preview URL** on it.
      That link is the whole review workflow — verify it works before Phase 4.

> **Observed on PR #5:** the build went green and Cloudflare commented
> "Deployment successful," but with a _View logs_ link and **no preview URL**.
> Preview URLs live at `<version>-alysasnell-portfolio.<subdomain>.workers.dev`,
> and that subdomain only exists after the Worker has had a successful
> production deploy — which had never happened, since every build until then
> failed. Expected to resolve once this merges to `main` and the first real
> `wrangler deploy` runs. **Verify on the next PR before moving to Phase 4.**
> If it's still missing, check in order: workers.dev subdomain registered on
> the account, `workers_dev`/`preview_urls` not overridden in the dashboard.

## ☐ Phase 4 — Alysa's Claude setup

- [ ] Claude **Pro** ($20/mo) on her account
- [ ] Claude desktop app → sign in → **Code** tab → environment selector → **Cloud**
- [ ] She authorizes the Claude GitHub App on her account
- [ ] Cloud environment setup script: `corepack enable && pnpm install`
- [ ] **Dry run together:** have her ask for one tiny copy change end-to-end
      while you watch. Confirm Claude opens a PR, CI goes green, and it hands
      her the link to text you. That dry run is the real onboarding.

## ☐ Phase 5 — 1Password (optional)

- [ ] Offer her a seat on Families (3 free seats left, costs $0 extra)
- [ ] If she declines: keep an "Alysa" vault with her logins + 2FA recovery
      codes as break-glass insurance for _her_ lockouts

## ☐ Phase 6 — Design & v1

- [ ] She collects inspiration screenshots → `docs/design/inspiration/`
- [ ] She marks up `docs/design-system.html` with the colors she actually wants
- [ ] You build v1 locally with Playwright checks, PR, merge, live

---

## Notes on the toolchain

**TypeScript is pinned to 6.x, not 7.** TypeScript 7 (the native Go port) is
out, but `typescript-eslint` still declares a peer range of `>=4.8.4 <6.1.0`,
so installing TS 7 breaks linting. Revisit when typescript-eslint ships TS 7
support; nothing else blocks the upgrade.

**Don't add `packages:` to `pnpm-workspace.yaml`.** Listing `"."` as a workspace
package makes `pnpm install` hang indefinitely. The file exists purely to hold
`overrides` and the build-script allowlist, which pnpm 11 no longer reads from
`package.json`.
