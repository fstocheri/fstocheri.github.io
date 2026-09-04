// The single source-of-truth mapping between a portfolio slug and the GitHub repo whose
// portfolio.json feeds that project's pitch/description/tech/links/highlights. Read by
// scripts/fetch-project-data.mjs at build time. Adding a new synced project means updating
// this file, adding a base entry in projects.js, and adding a notify-portfolio CI job to the
// new repo itself — see README.md's "Adding a new synced project" section.
export const PROJECT_SOURCES = [
  { slug: 'greenstock', repo: 'fstocheri/greenstock' },
  { slug: 'throughline', repo: 'fstocheri/throughline' },
];
