export const profile = {
  name: 'Forrest Tocheri',
  title: 'Full Stack Developer',
  email: 'ftocheri4@gmail.com',
  summary:
    'Experienced developer with 5+ years of Laravel expertise and 8+ years of PHP and ' +
    'JavaScript development. Strong background in front-end development including ' +
    'HTML/CSS, Vue, and React. Proven track record of building and maintaining ' +
    'enterprise-level systems for inventory management, marketing, sales, and production ' +
    'operations.',
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
      'Implemented front-end solutions using HTML/CSS and JavaScript',
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
  {
    degree: 'High School Diploma',
    school: 'Marshalltown High School',
    note: 'Graduated',
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
  Frontend: ['Vue.js', 'React'],
  'Systems & Tools': [
    'Inventory Management',
    'Marketing Systems',
    'Sales Management',
    'Production Management',
  ],
};
