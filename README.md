# fstocheri.github.io

My personal portfolio — a Vue 3 SPA presenting my resume and projects interactively. Live at
[fstocheri.github.io](https://fstocheri.github.io).

## Stack

- Vue 3 + Vite + vue-router (SPA, no backend — deployed as static files)
- Hand-written CSS with a small design-token system (`src/styles/tokens.css`): a warm
  paper/ink palette (not the default indigo-on-white), a serif display face (Fraunces) paired
  with system-ui body text, sharp corners and hairline rules instead of rounded cards and
  drop shadows — a deliberate move away from the generic "AI-template" SaaS look
- No animation library — a tiny `IntersectionObserver`-based composable
  (`src/composables/useInView.js`) drives a restrained opacity-only scroll-reveal, and
  `TerminalDemo.vue` hand-rolls a typing effect for the TaskMan project page

## Structure

- `src/data/resume.js` — resume content (summary, experience, education, skills) as the single
  source of truth for the Home/About pages
- `src/data/projects.js` — one entry per project (pitch, tech, links, screenshots or a terminal
  script). For GreenStock and Throughline, the pitch/description/tech/highlights fields are
  *synced* from that project's own repo at build time (see "Keeping project descriptions in
  sync" below) — the `fallback` object here is a safety net, not the thing to edit. TaskMan has
  no live app to sync from, so it stays a plain hand-authored object.
- `src/views/` — one file per route; `src/views/projects/ProjectDetail.vue` is the shared
  dynamic template for every project's detail page
- `public/404.html` — the standard GitHub Pages SPA fallback trick, needed because GH Pages is
  static file hosting with no server-side rewrites for client-side routes

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build && npm run preview
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes
it via GitHub Pages (Actions deployment, not a `gh-pages` branch).

## Keeping project descriptions in sync

GreenStock's and Throughline's pitch/description/tech/highlights live in a `portfolio.json` at
the root of *that project's own repo* — editing it there, not here, is how those cards update.
`scripts/fetch-project-data.mjs` runs automatically before every `npm run dev`/`npm run build`
(via `predev`/`prebuild`), fetches each known project's `portfolio.json` from
`raw.githubusercontent.com`, and writes it to `src/data/generated/<slug>.json` (gitignored,
regenerated every run — never committed). `projects.js` statically imports those files and
merges them over each project's `fallback` object. Validation is all-or-nothing per project: a
missing, unreachable, or invalid `portfolio.json` writes `{}` instead, which spreads as a no-op
and leaves the fallback content showing — the build can never break or show a blank card because
of this.

Each of those two repos also has a CI job that, on a successful push to `main`, fires this
repo's `workflow_dispatch` trigger directly (the same one `deploy.yml` already exposes for a
manual rebuild), so a change to `portfolio.json` shows up live here within a couple of minutes
without ever touching this repo. That call needs a fine-grained GitHub PAT (scoped to just this
repo, `Actions: Read and write` permission) stored as a `PORTFOLIO_DISPATCH_TOKEN` secret in
each source repo.

**Adding a new synced project later** means touching three places:
1. `src/data/projectSources.js` — add `{ slug, repo }`.
2. `src/data/projects.js` — add a base entry (`slug`, `thumbnail`, `screenshots`, `fallback`,
   and `synced: <newSlug>Synced` imported from `./generated/<newSlug>.json`).
3. The new repo itself — add its own `portfolio.json` and a `notify-portfolio` CI job (copy the
   one from GreenStock or Throughline) using the same `PORTFOLIO_DISPATCH_TOKEN` secret.

Screenshots are deliberately **not** part of this sync — they're captured manually with a
Playwright script when something visual changes, so a bad screenshot never goes live unreviewed.

## Updating the resume PDF

`public/resume-forrest-tocheri.pdf` is generated from a standalone HTML template (not checked
into this repo) with the phone number intentionally left off, kept consistent with the contact
info shown on the site itself. Regenerate by rendering that template to PDF and replacing the
file at that path.
