# ftocheri.github.io

My personal portfolio — a Vue 3 SPA presenting my resume and projects interactively. Live at
[ftocheri.github.io](https://ftocheri.github.io).

## Stack

- Vue 3 + Vite + vue-router (SPA, no backend — deployed as static files)
- Hand-written CSS with a small design-token system (`src/styles/tokens.css`), light/dark
  theme via CSS custom properties and `localStorage`
- No animation library — a tiny `IntersectionObserver`-based composable
  (`src/composables/useInView.js`) drives scroll-reveal, and `TerminalDemo.vue` hand-rolls a
  typing effect for the TaskMan project page

## Structure

- `src/data/resume.js` — resume content (summary, experience, education, skills) as the single
  source of truth for the Home/About pages
- `src/data/projects.js` — one entry per project (pitch, tech, links, screenshots or a terminal
  script); adding a new project is a new object here plus nothing else
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

## Updating the resume PDF

`public/resume-forrest-tocheri.pdf` is generated from a standalone HTML template (not checked
into this repo) with the phone number intentionally left off, kept consistent with the contact
info shown on the site itself. Regenerate by rendering that template to PDF and replacing the
file at that path.
