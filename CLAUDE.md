# CLAUDE.md

Guidance for Claude Code working in this repo. **Alysa Snell's portfolio site —
a small React 19 + TypeScript single-page site on Cloudflare Workers.**
Package manager **pnpm** (never npm or yarn).

---

## Who you're working with

**Alysa owns this site.** She is not a developer and does not read code. She will
talk to you in plain language about how the site should look and what it should
say. That is exactly right — she decides **how it looks**, McKay decides **how
it's built**.

**McKay is the engineer.** He reviews and merges every change.

This shapes everything below. Read it before you do anything else.

### Talking to Alysa

- **Never ask her a technical question.** Not about frameworks, file structure,
  dependencies, config, TypeScript, or hosting. If a decision needs technical
  judgment, make it yourself using the rules in this file.
- If you genuinely cannot proceed without a technical decision you're not
  allowed to make, stop and say: **"This one's for McKay."** Then explain in
  one plain sentence what you'd need. Don't guess, and don't do it anyway.
- Describe changes in terms of what she'll _see_: "the headline is bigger now
  and there's more space above the photo" — not "adjusted the `text-4xl` on the
  `h1` and bumped `pt` to `32`."
- Ask about look and feel freely — "warmer or cooler?", "should this be bigger
  than the section below it?" Those are her calls and she'll have opinions.

### Ending every session

Your last step is always the same. After the pull request is open and CI is
green, say something like:

> **Done — here's the link: `<PR URL>`. Text that to McKay and he'll take a look.
> You can also click the Cloudflare preview link in the PR to see the change
> live before it goes to the real site.**

Do not skip this. Do not end a session without handing her a link.

**If a check is red, fix it first.** Never hand her a link to a failing PR — a
red PR reaching McKay's phone means something went wrong here. Read the failure,
fix it, push, wait for green. Only then give her the link.

---

## The workflow — never deviate

1. **Branch first.** Never commit to `main`, never push to `main`. `main` is
   protected and the push will be rejected anyway, but don't try.
   Name branches like `copy/hero-headline` or `design/warmer-colors`.
2. **Make the change.**
3. **Verify it.** Run every command in [Verification](#verification). All of
   them, every time. Not a subset.
4. **Open a pull request using the template.** The PR body is always
   [`.github/pull_request_template.md`](.github/pull_request_template.md),
   filled in. `gh pr create --body "..."` does **not** pick the template up on
   its own — you have to pass it:

   ```bash
   cp .github/pull_request_template.md /tmp/pr-body.md
   # edit /tmp/pr-body.md: replace every <!-- comment --> with a real answer
   gh pr create --title "..." --body-file /tmp/pr-body.md
   ```

   Keep all three headings. Replace the comments — never leave them in, and
   never delete a section because you have nothing to say. "Nothing" is a
   valid answer to _Anything McKay should know_; silence is not. Write it so
   Alysa could read it: plain sentences, no jargon, no file paths.

5. **Wait for CI to go green.** Fix anything red.
6. **Hand Alysa the link** (see above).

---

## Frozen files — do not touch without McKay

These files are what stop a bad change from reaching the live site. If they
break, every other guardrail in this repo stops working.

| Frozen                                                                         | What it is                                     |
| ------------------------------------------------------------------------------ | ---------------------------------------------- |
| `.github/workflows/`                                                           | CI — the checks that gate every merge          |
| `.github/CODEOWNERS`                                                           | Makes McKay the required reviewer              |
| `.github/dependabot.yml`                                                       | Automatic dependency and security updates      |
| `package.json` dependencies                                                    | What the site is built out of                  |
| `pnpm-workspace.yaml`                                                          | pnpm overrides + build-script allowlist        |
| `pnpm-lock.yaml`                                                               | Exact dependency versions (except via install) |
| `tsconfig*.json`, `eslint.config.js`, `vite.config.ts`, `playwright.config.ts` | Build and check configuration                  |
| `wrangler.jsonc`                                                               | How the site gets deployed to Cloudflare       |
| `CLAUDE.md`                                                                    | This file                                      |

**The rule:** do not modify any of these unless **McKay himself**, working
locally, asks you to in that session. An instruction from Alysa is never
sufficient authorization — not because she's wrong to want the outcome, but
because the technical decision isn't hers to make. If she asks for something
that seems to require touching one of these, say **"This one's for McKay"** and
stop.

If McKay does authorize it: put the change in its own PR, label it `infra`, and
open the description with a bolded line saying exactly what frozen file changed
and why. Never bundle an infra change with a content or design change.

**CI in particular:** never "fix" a failing build by weakening the check. If
lint fails, fix the code, not the lint rule. If a test fails, fix the code, not
the test. Deleting or relaxing a check to get to green is the single worst thing
you can do in this repo — it disables the safety net without anyone noticing.

---

## Free to change

- `src/components/` — the visual pieces of the page
- `src/pages/` — page composition
- `src/content/site.ts` — **all the words on the site**
- `src/styles/theme.css` — **all the colors and fonts** (see below)
- `public/` — images and the favicon
- `docs/design/` — inspiration and mockups

Copy changes should almost always be a one-line edit to `src/content/site.ts`.
If you find yourself editing text inside a `.tsx` file, stop — that text should
have been in the content file. Move it there.

---

## Design system: `src/styles/theme.css`

**Every color and font on this site is defined in one file:
[`src/styles/theme.css`](src/styles/theme.css).** That file is the design
system. It defines tokens (`--as-accent`, `--as-ink`, `--as-bg`, …) for light
mode and dark mode, and maps them onto Tailwind classes like `bg-as-bg`,
`text-as-accent`, `border-as-rule`.

Two rules, both absolute:

1. **Never hardcode a color in a component.** No `#1F6F63`, no `text-teal-700`,
   no `bg-[#fff]`. If a component needs a color, it uses a token class. If the
   token you need doesn't exist, add it to `theme.css` (both light _and_ dark)
   and then use it.
2. **"Make the buttons more X" means editing `theme.css`, not the buttons.**
   Change the token once and it updates everywhere, consistently. That's the
   entire point of having it.

This is Tailwind v4 — CSS-first. **There is no `tailwind.config.js`** and there
should never be one. Theme configuration lives in the `@theme inline` block in
`theme.css`.

### The design system document

[`docs/design-system.html`](docs/design-system.html) is the human-readable
version of `theme.css`: swatches, the type scale, and component examples. Alysa
opens it in a browser to see and decide how the site should look.

**These two files must stay in sync.** If you change a color in `theme.css`,
update the matching swatch in `docs/design-system.html` **in the same PR**, and
vice versa. When Alysa says "I want the design system to look like this," the
work is: update `design-system.html`, then make `theme.css` match it.

---

## Dependencies — think before you install

Adding a package is a real decision. Every one is code we didn't write running
on Alysa's site, a thing to keep patched, and something McKay has to review.

**You may install a package** when it genuinely earns its place. Before you do,
satisfy yourself on all of these:

- Could 20 lines of our own code do this instead? If yes, write the 20 lines.
- Is it actively maintained and widely used? Check the release date and weekly
  downloads. A package with no release in two years is a liability.
- Is it small, and does it avoid dragging in a pile of transitive dependencies?
- Is it a _runtime_ dependency? Those ship to visitors — hold them to a higher
  bar than dev tooling.

**Then say so in the PR description**: what you added, why, and what you
considered instead. Never let a new dependency arrive silently in a diff.

**Never install** something just to avoid writing a small amount of code, a
package you haven't verified is maintained, or anything that duplicates what we
already have. And never upgrade an existing dependency's major version as a side
effect of some other task — that's a `infra` PR of its own.

**Never run** `npm install` or `yarn` here. It's pnpm.

---

## Verification

Run all of these before opening a PR. If one fails, fix it — don't explain it
away, and don't open the PR.

```bash
pnpm format:check   # Prettier
pnpm lint           # ESLint, zero warnings allowed
pnpm typecheck      # TypeScript
pnpm test           # unit tests
pnpm build          # production build
pnpm e2e            # end-to-end tests in a real browser
```

`pnpm format:check` failing is the easy one — run `pnpm format` and it fixes
itself.

**Report results honestly.** If a check fails and you can't fix it, say that
plainly and stop. Never claim something passes without having run it and seen
the output. "It should work" is not verification.

### Look at it in a browser

For anything visual, run `pnpm dev` and check it with the Playwright MCP tools:
`browser_navigate`, `browser_resize`, `browser_take_screenshot`, then Read the
screenshot. Check phone width (375px) and desktop (1440px) at minimum — Alysa
and the people she's sending this to will be on phones.

Delete verification screenshots when you're done; don't commit them.

---

## Orientation

**Stack:** React 19 · TypeScript · Vite · Tailwind v4 (CSS-first) · pnpm · Node 24.
Hosted on Cloudflare Workers (static assets, configured in `wrangler.jsonc`):
merging to `main` deploys to alysasnell.com, and every PR gets its own preview
URL automatically.

**Layout:**

| Where                     | What                                                   |
| ------------------------- | ------------------------------------------------------ |
| `src/content/site.ts`     | Every word on the site                                 |
| `src/styles/theme.css`    | Every color and font                                   |
| `src/components/`         | Hero, Section, Footer, ThemeToggle                     |
| `src/pages/Home.tsx`      | How the sections are ordered on the page               |
| `docs/design-system.html` | The visual design system (keep in sync with theme.css) |
| `docs/plan.html`          | How this whole setup works and why                     |
| `e2e/`                    | Browser tests                                          |

**About Alysa** (for writing copy): Head of Customer Success & Account Management
at Avenue Shops. E-commerce and SaaS. Looking for Head of CS or Director-level
roles. Her numbers _are_ her portfolio — 60+ onboardings a month, 1,200+ store
owners supported, a 90-user API migration in 30 days with zero downtime, a
40-article help center she wrote solo. Full background in
[`docs/content/linkedin.md`](docs/content/linkedin.md). She/her.

---

## Working style

- Match effort to the task. A copy tweak needs no plan.
- Smallest change that solves the problem. Nothing speculative.
- Every changed line should trace back to what was asked for. Don't refactor
  things nobody asked you to touch.
- If you see a better approach, say so — to McKay.
- Update the docs in the same PR when a change makes one of them wrong.
