# alysasnell.com

Alysa Snell's portfolio site — Head of Customer Success & Account Management.

React 19 · TypeScript · Vite · Tailwind v4 · pnpm · deployed on Cloudflare Pages.

---

## How changes get made

Alysa talks to Claude in the Claude desktop app. Claude branches, makes the
change, runs the checks, and opens a pull request. CI runs; Cloudflare posts a
preview link. She texts McKay the link, he looks at the preview, and merges.
Merging to `main` deploys to alysasnell.com.

Nobody pushes to `main`. It's protected, and it's the reason this works.

The full picture — accounts, hosting, guardrails, cost — is in
**[`docs/plan.html`](docs/plan.html)**. Open it in a browser.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

## Scripts

| Command             | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `pnpm dev`          | Dev server with hot reload                      |
| `pnpm build`        | Typecheck, then production build into `dist/`   |
| `pnpm preview`      | Serve the built site locally                    |
| `pnpm typecheck`    | TypeScript, no emit                             |
| `pnpm lint`         | ESLint — zero warnings allowed                  |
| `pnpm format`       | Prettier, writes fixes                          |
| `pnpm format:check` | Prettier, check only (this is what CI runs)     |
| `pnpm test`         | Unit tests (Vitest)                             |
| `pnpm e2e`          | Browser tests (Playwright) against a real build |

First time running e2e: `pnpm e2e:install` to download the browsers.

CI runs all of these on every pull request. If they pass locally, they pass there.

## Where things live

| Path                      | What                                              |
| ------------------------- | ------------------------------------------------- |
| `src/content/site.ts`     | **Every word on the site.** Change copy here.     |
| `src/styles/theme.css`    | **Every color and font.** Change the design here. |
| `src/components/`         | Hero, Section, Footer, ThemeToggle                |
| `src/pages/Home.tsx`      | Section order                                     |
| `public/`                 | Images, favicon                                   |
| `e2e/`                    | Browser tests                                     |
| `docs/plan.html`          | How the whole setup works and why                 |
| `docs/design-system.html` | The visual design system                          |
| `docs/design/`            | Inspiration screenshots and mockups               |
| `docs/content/`           | Source material for the copy                      |
| `CLAUDE.md`               | Rules for Claude working in this repo             |
| `SETUP-CHECKLIST.md`      | McKay's one-time setup steps                      |

## The design system

Every color and font is defined once, in
[`src/styles/theme.css`](src/styles/theme.css), as design tokens
(`--as-accent`, `--as-ink`, `--as-bg`, …) with light and dark values. Components
use Tailwind classes that resolve to those tokens — `bg-as-bg`,
`text-as-accent`, `border-as-rule`. **No component ever hardcodes a color.**

[`docs/design-system.html`](docs/design-system.html) is the same system as a
browsable page: swatches, type scale, component examples. It's what Alysa looks
at to decide how the site should look.

**The two files must change together.** A color updated in one and not the other
means the documentation is lying.

This is Tailwind v4, which is CSS-first — there is no `tailwind.config.js` and
there shouldn't be. Theme config lives in the `@theme inline` block in
`theme.css`.

## Deployment

Cloudflare Pages, connected to this repo:

- **Merge to `main`** → deploys to alysasnell.com
- **Any pull request** → gets its own preview URL, posted on the PR

Build command `pnpm build`, output directory `dist`, Node 24 (from
`.node-version`).
