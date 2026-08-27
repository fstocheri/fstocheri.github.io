// Runs automatically before `npm run dev`/`npm run build` (via package.json's predev/prebuild
// hooks) — never invoked directly. For each project in projectSources.js, fetches that
// project's own portfolio.json from its live GitHub repo and writes it to
// src/data/generated/<slug>.json, which projects.js statically imports and merges over a
// hand-authored fallback.
//
// Hard rule this whole file exists to enforce: nothing that happens here may ever fail the
// build. A broken network, a missing portfolio.json, or an invalid payload must degrade to
// "write {} and keep the fallback content" — never a non-zero exit, and never a half-written
// project (a missing generated/<slug>.json file is a hard Vite build error, not a soft one,
// since projects.js imports it statically).
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROJECT_SOURCES } from '../src/data/projectSources.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'src', 'data', 'generated');
const FETCH_TIMEOUT_MS = 10_000;

// GitHub Actions renders a `::warning::`-prefixed line as a visible annotation on the run
// summary, so a broken upstream portfolio.json shows up somewhere instead of silently
// degrading forever. Outside CI this just prints as a normal console line.
function warn(message) {
  console.warn(`::warning::${message}`);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isNonEmptyStringArray(value) {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);
}

function isValidHighlights(value) {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (item) => item && typeof item === 'object' && isNonEmptyString(item.title) && isNonEmptyString(item.body),
    )
  );
}

// Deliberately all-or-nothing: a present-but-empty field (e.g. `"pitch": ""`) would otherwise
// win a `{ ...fallback, ...synced }` spread and silently clobber good fallback content with a
// blank one. Validating the whole object at once and discarding it entirely on any failure
// avoids ever having to reason about a partially-broken merge.
function isValidPortfolioData(data) {
  return (
    data !== null &&
    typeof data === 'object' &&
    isNonEmptyString(data.name) &&
    isNonEmptyString(data.pitch) &&
    isNonEmptyString(data.description) &&
    isNonEmptyStringArray(data.tech) &&
    isNonEmptyString(data.repoUrl) &&
    (data.liveUrl === undefined || isNonEmptyString(data.liveUrl)) &&
    isValidHighlights(data.highlights)
  );
}

// Only ever pass through fields the app actually knows about — an upstream portfolio.json
// shouldn't be able to inject arbitrary keys into the site's data model.
function pickKnownFields(data) {
  const picked = {
    name: data.name,
    pitch: data.pitch,
    description: data.description,
    tech: data.tech,
    repoUrl: data.repoUrl,
    highlights: data.highlights,
  };

  if (data.liveUrl !== undefined) {
    picked.liveUrl = data.liveUrl;
  }

  return picked;
}

async function fetchProjectData(slug, repo) {
  const url = `https://raw.githubusercontent.com/${repo}/main/portfolio.json`;

  let response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  } catch (error) {
    warn(`[${slug}] Failed to reach ${url}: ${error.message}`);
    return {};
  }

  if (!response.ok) {
    warn(`[${slug}] ${url} returned HTTP ${response.status} — has portfolio.json been added to that repo yet?`);
    return {};
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    warn(`[${slug}] portfolio.json is not valid JSON: ${error.message}`);
    return {};
  }

  if (!isValidPortfolioData(data)) {
    warn(`[${slug}] portfolio.json is missing or has invalid required fields — discarding the whole payload rather than merging a partial one.`);
    return {};
  }

  return pickKnownFields(data);
}

async function main() {
  try {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    warn(`Failed to create ${OUTPUT_DIR}: ${error.message}`);
  }

  for (const { slug, repo } of PROJECT_SOURCES) {
    let data = {};

    try {
      data = await fetchProjectData(slug, repo);
    } catch (error) {
      warn(`[${slug}] Unexpected error while syncing: ${error.message}`);
    }

    // Reached unconditionally, regardless of what happened above — every known slug gets a
    // file written on every run, even if that file is just "{}".
    try {
      writeFileSync(join(OUTPUT_DIR, `${slug}.json`), JSON.stringify(data, null, 2) + '\n');
      console.log(
        Object.keys(data).length > 0
          ? `[${slug}] synced from ${repo}`
          : `[${slug}] no synced data — using portfolio fallback content`,
      );
    } catch (error) {
      warn(`[${slug}] Failed to write generated file: ${error.message}`);
    }
  }
}

main().catch((error) => {
  // Absolute last resort. Even a bug in this file's own control flow must not fail
  // `npm run build` — log it and let whatever generated files exist stand.
  console.error(`fetch-project-data.mjs failed unexpectedly (ignoring so the build can proceed): ${error.message}`);
});
