import greenstockSynced from './generated/greenstock.json';
import throughlineSynced from './generated/throughline.json';

// "fallback" is a safety net, not the source of truth — if the synced fetch (see
// scripts/fetch-project-data.mjs) ever fails or hasn't run yet, this is what renders instead
// of a broken-looking blank card. `synced` is guaranteed all-or-nothing (either the complete
// valid object or `{}`), so `{ ...fallback, ...synced }` is safe with no partial-field
// clobbering risk. Going forward, edit each project's own portfolio.json (in that project's
// repo) to change its pitch/description/tech/highlights — not the fallback text here.
const projectBases = [
  {
    slug: 'greenstock',
    thumbnail: '/projects/greenstock/dashboard.png',
    screenshots: [
      { src: '/projects/greenstock/landing.png', caption: 'Landing page — dark by default, with a manual light-mode toggle' },
      { src: '/projects/greenstock/dashboard.png', caption: 'Dashboard — stock trend chart and recent supplier feed imports' },
      { src: '/projects/greenstock/products.png', caption: 'Product catalog — searchable, sortable, paginated' },
      { src: '/projects/greenstock/product-show.png', caption: 'Product detail — full inventory movement ledger' },
      { src: '/projects/greenstock/admin.png', caption: 'Admin area — restricted stock adjustments, recorded on the same ledger' },
    ],
    fallback: {
      name: 'GreenStock',
      pitch: 'A live Laravel inventory pipeline for a plant nursery, built from scratch.',
      description:
        'A from-scratch demo of a nursery/garden-supply inventory system, showing a ' +
        'Laravel ETL pipeline, database schema design, and a Vue 3 + Inertia front end, ' +
        'end to end — deployed as a real, publicly reachable demo rather than a localhost-only project.',
      tech: ['Laravel', 'PHP', 'Vue 3', 'Inertia.js', 'PostgreSQL', 'Chart.js', 'Docker'],
      repoUrl: 'https://github.com/fstocheri/greenstock',
      liveUrl: 'https://greenstock-ztvq.onrender.com',
      highlights: [
        {
          title: 'Inventory as a ledger, not a counter',
          body:
            "Stock isn't a mutable column on products — it's derived by summing an " +
            'append-only inventory_movements table (in / out / adjustment). The number can ' +
            "never drift out of sync with the history that produced it, and that history " +
            'is a useful audit trail on its own.',
        },
        {
          title: 'A real pipeline, not just a script',
          body:
            'A supplier CSV feed runs through five single-purpose stages composed with ' +
            "Laravel's Illuminate\\Pipeline\\Pipeline: ValidateRow → NormalizeSku → " +
            'UpsertProduct → RecordMovement → FlagLowStock. Each stage is independently ' +
            'testable and does exactly one job.',
        },
        {
          title: 'Restricted admin controls',
          body:
            'A single admin-flagged account can issue manual stock adjustments with a ' +
            'required reason. Every adjustment lands on the same movement ledger as ' +
            'automated imports, so manual corrections stay part of the audit trail instead ' +
            'of bypassing it.',
        },
        {
          title: 'Actually deployed, not just runnable',
          body:
            'Docker multi-stage build (Composer → Vite asset build → PHP runtime), running ' +
            "on Render's free tier against a separate managed Postgres database (Neon) so " +
            "data survives container restarts. Chosen deliberately over a localhost-only " +
            'demo — it forced real decisions about trusted proxies, env config, and cold starts.',
        },
      ],
    },
    synced: greenstockSynced,
  },
  {
    slug: 'throughline',
    thumbnail: '/projects/throughline/board.png',
    screenshots: [
      { src: '/projects/throughline/login.png', caption: 'Login — dark by default, demo credentials shown right on the screen' },
      { src: '/projects/throughline/board.png', caption: 'Board — work orders across four stages, drag-and-drop reordering' },
      { src: '/projects/throughline/drawer.png', caption: 'Audit trail — every real stage change logged, drag reorders excluded on purpose' },
    ],
    fallback: {
      name: 'Throughline',
      pitch: 'A decoupled Laravel API + React SPA for scheduling production work orders.',
      description:
        'A production-scheduling Kanban board, built the opposite shape from GreenStock on ' +
        'purpose: an API-only Laravel backend (no Blade, no Inertia) consumed by a fully ' +
        'separate React + TypeScript SPA, deployed to two different platforms and talking ' +
        'cross-origin over a bearer token.',
      tech: ['Laravel', 'PHP', 'React', 'TypeScript', 'PostgreSQL', 'TanStack Query', 'Docker'],
      repoUrl: 'https://github.com/fstocheri/throughline',
      liveUrl: 'https://throughline-seven-theta.vercel.app',
      highlights: [
        {
          title: 'Server-authoritative drag-and-drop',
          body:
            'A dropped card sends the two cards it landed between, never a position it ' +
            'computed itself. The server re-reads real positions inside a transaction, ' +
            'computes the midpoint, and rebalances the whole column if repeated same-spot ' +
            'drops have halved the gap too many times to represent distinctly — so two ' +
            'racing tabs can never corrupt the ordering.',
        },
        {
          title: 'An audit trail, the second time on purpose',
          body:
            'The same append-only-ledger philosophy as GreenStock\'s inventory_movements, ' +
            'applied to workflow instead of stock: every real stage change, line ' +
            'reassignment, or priority edit is logged. A same-column drag reorder ' +
            'deliberately isn\'t — a row saying "position moved from 1500 to 1499.9" has no ' +
            'audit value, so it\'s excluded on purpose rather than by omission.',
        },
        {
          title: 'A genuinely decoupled architecture',
          body:
            'The API (Render) and the SPA (Vercel) know nothing about each other beyond a ' +
            'base URL and a CORS allow-list — no shared cookie, no shared session. Auth is a ' +
            'bearer token, which sidesteps Sanctum\'s SPA-cookie-mode configuration entirely ' +
            'since there\'s no same-site relationship to maintain.',
        },
        {
          title: 'CI from day one',
          body:
            'GitHub Actions runs the backend PHPUnit suite plus a frontend typecheck/lint/' +
            'build on every push — this project\'s first CI pipeline, later extended to ' +
            'GreenStock too. A separate job also notifies this portfolio site to rebuild ' +
            'whenever either project\'s description changes here.',
        },
      ],
    },
    synced: throughlineSynced,
  },
  {
    slug: 'date-night-dles',
    name: 'Date Night Dles',
    pitch: 'A six-game daily puzzle platform on a shared React/TypeScript engine, generated and deployed by CI every night.',
    description:
      'A curated collection of daily "–dle" guessing games (movies, TV, songs, artists, and ' +
      'trivia) built on one shared TypeScript/React engine, with a landing page showing the ' +
      "night's lineup and per-game stats. New puzzles are generated, committed, built, and " +
      'deployed automatically every day with no manual step.',
    tech: ['React', 'TypeScript', 'Vite', 'Supabase', 'GitHub Actions', 'GitHub Pages'],
    repoUrl: 'https://github.com/fstocheri/date-night-dles',
    liveUrl: 'https://fstocheri.github.io/date-night-dles/',
    thumbnail: '/projects/date-night-dles/landing.png',
    screenshots: [
      {
        src: '/projects/date-night-dles/landing.png',
        caption: "Landing page — tonight's lineup of six daily games on a shared engine, with per-game play state",
      },
    ],
    highlights: [
      {
        title: 'One engine, drop-in games',
        body:
          'All six games share a single engine plus a per-game config module and a registry — ' +
          'adding a new game is a matter of dropping in files, not forking the core. Answers ' +
          'are stored as SHA-256 hashes and only one day of puzzles is published ahead, since ' +
          'the deployed files are world-readable.',
      },
      {
        title: 'Fully automated daily content',
        body:
          'A scheduled GitHub Actions workflow generates the day\'s puzzles from five external ' +
          'APIs (TMDB, Deezer, MusicBrainz, Wikidata, OpenTDB) with caching and rate limiting, ' +
          'commits the data back to the repo, builds, and deploys to GitHub Pages — end to end, ' +
          'unattended.',
      },
      {
        title: 'Optional cross-device sync',
        body:
          'Progress and stats live in localStorage by default, with an optional Supabase ' +
          '(PostgreSQL) sync layer behind row-level security so a shared login can pick up ' +
          'streaks across devices, resolving conflicts in favor of the furthest-along copy.',
      },
    ],
  },
  {
    slug: 'taskman',
    name: 'TaskMan',
    pitch: 'A small C# command-line task manager — clean layering, LINQ, and tests.',
    description:
      'A focused, standalone demo of core C# fundamentals: a clean layered design ' +
      '(models / repository / service / CLI), LINQ, JSON persistence, custom exceptions, ' +
      'and unit tests — nothing more than that, on purpose.',
    tech: ['C#', '.NET 10', 'xUnit', 'LINQ'],
    repoUrl: 'https://github.com/fstocheri/taskman',
    thumbnail: null,
    highlights: [
      {
        title: 'Layered on purpose',
        body:
          'Models hold data only. TaskRepository is the one class that knows tasks live ' +
          "in a JSON file. TaskService owns the actual business logic. Swapping storage " +
          "later wouldn't touch the service or CLI layer at all.",
      },
      {
        title: 'Fails loudly, not silently',
        body:
          'A custom TaskNotFoundException gets thrown instead of returning null or a bool ' +
          "— callers can't accidentally ignore a bad id.",
      },
      {
        title: 'Dependency-free by choice',
        body:
          'No argument-parsing library, no ORM — the surface area is small enough that a ' +
          'dependency would be more ceremony than the problem warrants.',
      },
    ],
    // The exact command sequence verified against the real CLI, replayed by TerminalDemo.vue.
    terminalScript: [
      { command: 'taskman add "Write the README" --priority high --due 2026-09-01', output: ['Added task #1: Write the README'] },
      { command: 'taskman add "Buy groceries" --priority low', output: ['Added task #2: Buy groceries'] },
      { command: 'taskman list', output: ['[ ] #1 [High] Write the README (due 2026-09-01)', '[ ] #2 [Low] Buy groceries'] },
      { command: 'taskman done 2', output: ['Completed task #2: Buy groceries'] },
      {
        command: 'taskman list --status all --sort priority',
        output: ['[ ] #1 [High] Write the README (due 2026-09-01)', '[x] #2 [Low] Buy groceries'],
      },
    ],
  },
];

export const projects = projectBases.map(({ fallback, synced, ...base }) =>
  fallback ? { ...base, ...fallback, ...synced } : base,
);

export function findProject(slug) {
  return projects.find((p) => p.slug === slug);
}
