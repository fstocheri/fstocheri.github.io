export const profile = {
  name: 'Forrest Tocheri',
  title: 'Full Stack Developer',
  email: 'ftocheri4@gmail.com',
  summary:
    'Full-stack developer with 8+ years building and maintaining enterprise web ' +
    'applications in PHP/Laravel and JavaScript, complemented by modern front-end work in ' +
    'React, TypeScript, and Vue. Comfortable owning features end to end — from relational ' +
    'data modeling and REST APIs to responsive, accessible interfaces and automated CI/CD ' +
    'deployment. Self-directed and remote-ready, with a portfolio of self-built full-stack ' +
    'projects spanning React/TypeScript, Laravel, and Salesforce.',
};

// Ordered most-recent-first for the timeline (the source resume lists Staples before
// Cactus & Tropicals despite the earlier date range; this corrects the display order).
export const experience = [
  {
    role: 'Application Developer',
    company: 'True Leaf Market',
    period: '2018 — Present',
    highlights: [
      'Developed and maintained enterprise-level systems using PHP and the Laravel framework',
      'Built a comprehensive inventory management system to track and manage company stock',
      'Created marketing and sales management tools to streamline business operations',
      'Developed an in-house production management system to optimize workflow',
      'Implemented front-end solutions using HTML/CSS, JavaScript, and Vue',
    ],
  },
  {
    role: 'Delivery and Receiving',
    company: 'Cactus & Tropicals',
    period: '2015 — 2018',
    highlights: [
      'Delivered plants and garden supplies to residential and commercial customers',
      'Ensured safe handling and timely delivery of orders',
      'Provided customer service during delivery and pickup operations',
    ],
  },
  {
    role: 'Copy & Print Department Manager',
    company: 'Staples',
    period: '2010 — 2015',
    highlights: [
      'Managed daily operations of the Copy & Print department',
      'Supervised team members and ensured quality customer service',
      'Handled complex printing projects and customer orders',
      'Maintained inventory and equipment for department operations',
    ],
  },
];

export const education = [
  {
    degree: 'Bachelor of Science, Web Design and Development',
    school: 'Full Sail University',
    note: 'Graduated',
  },
  {
    degree: 'Computer Science',
    school: 'Iowa State University',
    note: '2 years of study',
  },
];

// Bars show actual years (scaled against a 10-year visual max) rather than an invented
// "skill %" — years are what the resume actually states, an arbitrary mastery percentage
// isn't.
export const skillBars = [
  { name: 'PHP', years: 8 },
  { name: 'JavaScript', years: 8 },
  { name: 'HTML/CSS', years: 8 },
  { name: 'Laravel', years: 5 },
];

export const skillTags = {
  Languages: ['TypeScript', 'JavaScript', 'PHP', 'C#', 'SQL', 'Apex'],
  Frontend: ['Vue.js', 'React', 'Inertia.js', 'Tailwind CSS', 'HTML/CSS'],
  'Backend & Data': [
    'Laravel',
    '.NET',
    'Node.js',
    'REST APIs',
    'ETL Pipelines',
    'PostgreSQL',
    'MySQL',
    'Supabase',
  ],
  'DevOps & Tooling': [
    'Git / GitHub',
    'GitHub Actions',
    'Docker',
    'Vite',
    'Render',
    'Vercel',
    'Salesforce DX',
  ],
  Testing: ['Vitest', 'Jest', 'React Testing Library', 'PHPUnit', 'xUnit'],
};
