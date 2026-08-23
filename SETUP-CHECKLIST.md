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
- [x] **Protect main.** Settings → Rules → Rulesets → New branch ruleset,
      named `protect-main` — **done, and active.** Verified via the API:
      enforcement `active`, 1 approval, code-owner review on, both CI checks
      required, deletion and force-push blocked. Phase 1.5 below revises it.

> **Order matters:** status check names don't appear in the search box until CI
> has run at least once. Push the scaffold, open one throwaway PR to make CI
> run, then come back and add the checks.

---

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

## ☐ Phase 1.5 — GitHub org, admin, and the review model

> **Why this exists.** Two problems showed up the first time McKay opened a PR:
>
> 1. **He can't approve his own pull requests.** GitHub hardcodes author ≠
>    approver. No permission level changes it — not admin, not owner. Combined
>    with `* @mckayqsnell` in CODEOWNERS, his own infra PRs were unmergeable by
>    anyone.
> 2. **He can't be made an admin.** A repo owned by a **personal account** has
>    exactly two permission levels — owner and collaborator. Roles
>    (Read/Triage/Write/Maintain/Admin) are an **organization-only** feature, so
>    there is no button on Alysa's account that grants admin, and only Admin can
>    edit rulesets. There is no fix for this short of moving the repo.
>
> Meanwhile the `*` in CODEOWNERS put McKay on **every** PR, including one-line
> copy tweaks — the opposite of the point.
>
> Moving to a free org fixes all of it, and lets the bypass name **one specific
> user** instead of a role. On a personal repo bypass actors are role-based
> only, so "just McKay" is not expressible there.

**Alysa only has to do two things in this whole phase: click an email link, and
click Transfer.** Everything else is McKay's, and after the transfer he never
needs her for a settings change again. The transfer itself can't be delegated —
it requires administrator access to the repo, which on a personal account only
the owner has.

### McKay — create the org

- [ ] Profile picture → **Settings** → sidebar "Access" → **Organizations** →
      **New organization** → **Free** plan (unlimited, free for public repos)
- [ ] Invite `alysasnell` as a **Member**. Confirm Settings → Member privileges
      lets members create **public** repositories — that's the default, and the
      transfer fails without it.

### Alysa — two clicks

- [ ] Accept the org invite from her email
- [ ] Her repo → **Settings** → scroll to **Danger Zone** → **Transfer** →
      "Select one of my organizations" → the new org → type the repo name →
      **I understand, transfer this repository**

> Issues, PRs, stars, watchers, webhooks, secrets, deploy keys, and full commit
> history all move. Existing collaborators carry over. Old URLs redirect.

### McKay — now an admin, so all of this is his

- [ ] Settings → Collaborators and teams → confirm `alysasnell` has **Write**
      (she needs to merge her own copy PRs; she does not need Admin)
- [ ] Settings → Rules → Rulesets → `protect-main`:
  - [ ] Required approvals: **1 → 0**. This is the switch that lets Alysa merge
        a copy change herself. Code-owner review still blocks anything frozen.
  - [ ] **Keep** "Require review from Code Owners" checked — it is now the
        entire gate
  - [ ] Required status checks → add **`Guardrails (frozen files)`**
        (won't appear in the search box until that job has run once)
  - [ ] **Bypass list** → Add bypass → the user **`@mckayqsnell`** → **Always**
        ("Always", not "For pull requests only" — pull-requests-only still
        blocks direct pushes to `main`)
- [ ] Verify: `gh api repos/<org>/alysasnell-portfolio/rulesets/<id> --jq .current_user_can_bypass`
      should no longer say `never`
- [ ] `git remote set-url origin <new-url>` in every local clone

### McKay — reconnect the two GitHub Apps

The repo moved, so app installations scoped to Alysa's account no longer cover
it.

- [ ] Install the **Cloudflare Workers and Pages** GitHub App on the org, then
      Worker → Settings → Build → re-point the Git connection at the new repo
- [ ] Reauthorize the **Claude GitHub App** for the new location so Alysa's
      cloud sessions can still open PRs

> **Watch the first PR after the move closely.** The Cloudflare connection is
> the piece most likely to come back wrong, and a broken build there is exactly
> the failure that already cost a round of debugging once.

### What the review model becomes

| A PR that changes…                        | Needs McKay? | Who merges |
| ----------------------------------------- | ------------ | ---------- |
| `src/`, `public/`, `docs/`                | No           | Alysa      |
| anything in `.github/CODEOWNERS` patterns | **Yes**      | McKay      |

Set by [`.github/CODEOWNERS`](.github/CODEOWNERS), which lists only the frozen
paths. GitHub requests a code owner's review **only** when a PR actually changes
a matching file, so the gate is conditional on content rather than on a label
anyone could forget to add.

> **Unverified, worth a throwaway PR:** that required-approvals **0** plus
> code-owner review reliably blocks. The docs don't state the interaction for
> rulesets. Test it by opening a PR that touches only `CLAUDE.md` and confirming
> the merge button is blocked before trusting the setup.

> **Open question for McKay:** `e2e/` and `src/**/*.test.tsx` are **not** frozen,
> so Claude can edit tests without review. CLAUDE.md calls weakening a check
> "the single worst thing you can do in this repo." Freezing them would close
> that hole — but a legitimate copy change often has to update a test that
> asserts the old text, which would route ordinary copy edits to McKay and
> defeat the point. Left open deliberately.

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
