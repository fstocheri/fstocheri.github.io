export const projects = [
  {
    slug: 'greenstock',
    name: 'GreenStock',
    pitch: 'A live Laravel inventory pipeline for a plant nursery, built from scratch.',
    description:
      'A from-scratch demo of a nursery/garden-supply inventory system, showing a ' +
      'Laravel ETL pipeline, database schema design, and a Vue 3 + Inertia front end, ' +
      'end to end — deployed as a real, publicly reachable demo rather than a localhost-only project.',
    tech: ['Laravel', 'PHP', 'Vue 3', 'Inertia.js', 'PostgreSQL', 'Chart.js', 'Docker'],
    repoUrl: 'https://github.com/ftocheri/greenstock',
    liveUrl: 'https://greenstock-ztvq.onrender.com',
    thumbnail: '/projects/greenstock/dashboard.png',
    screenshots: [
      { src: '/projects/greenstock/landing.png', caption: 'Landing page — dark by default, with a manual light-mode toggle' },
      { src: '/projects/greenstock/dashboard.png', caption: 'Dashboard — stock trend chart and recent supplier feed imports' },
      { src: '/projects/greenstock/products.png', caption: 'Product catalog — searchable, sortable, paginated' },
      { src: '/projects/greenstock/product-show.png', caption: 'Product detail — full inventory movement ledger' },
      { src: '/projects/greenstock/admin.png', caption: 'Admin area — restricted stock adjustments, recorded on the same ledger' },
    ],
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
  {
    slug: 'taskman',
    name: 'TaskMan',
    pitch: 'A small C# command-line task manager — clean layering, LINQ, and tests.',
    description:
      'A focused, standalone demo of core C# fundamentals: a clean layered design ' +
      '(models / repository / service / CLI), LINQ, JSON persistence, custom exceptions, ' +
      'and unit tests — nothing more than that, on purpose.',
    tech: ['C#', '.NET 10', 'xUnit', 'LINQ'],
    repoUrl: 'https://github.com/ftocheri/taskman',
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

export function findProject(slug) {
  return projects.find((p) => p.slug === slug);
}
