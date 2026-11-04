// Content for the "What I Can Do" section.
// `repo` is the GitHub repository name (used for the link). `title` is the text shown on the card,
// so a repo can be renamed on GitHub without touching anything but its `repo` value here.
// All text is stored here, so the build never calls the GitHub API.
const GITHUB_USER = 'A-A-Larson';
export const githubProfile = `https://github.com/${GITHUB_USER}?tab=repositories`;

const item = (repo, title, desc, tags, extra = {}) => ({
  repo,
  title,
  desc,
  tags,
  url: `https://github.com/${GITHUB_USER}/${repo}`,
  ...extra,
});

export const intro =
  'Tools change quickly. What stays useful is how I work through a problem. Here is what I bring, with the work to back it up.';

// icon: key into the icons map in Work.jsx
export const capabilities = [
  {
    icon: 'ui',
    title: 'Build interfaces',
    desc: 'Responsive, accessible front ends in React, Angular, and Flutter.',
    proof: 'this portfolio, Typescript_Final, 2ndAngular',
  },
  {
    icon: 'data',
    title: 'Connect data and APIs',
    desc: 'Wire interfaces to REST APIs, SQL databases, and Python or PHP back ends.',
    proof: 'the VIN decoder demo, PythonAPI-FastAPI, full-stack-app',
  },
  {
    icon: 'test',
    title: 'Test and clarify',
    desc: 'Business analysis with a QA focus: finding what breaks, and what is unclear, before users do.',
    proof: '2024 internship, see the timeline',
  },
  {
    icon: 'ai',
    title: 'Work with AI',
    desc: 'Design AI-assisted workflows, and decide what to delegate and what to own.',
    proof: 'Build-A-Guild, flutter_boilerplate, Web-Scraper',
  },
  {
    icon: 'ship',
    title: 'Ship and maintain',
    desc: 'Automated builds and deploys with GitHub Actions, plus regular dependency audits.',
    proof: "this site's deploy pipeline",
  },
  {
    icon: 'team',
    title: 'Improve how teams work',
    desc: 'Six Sigma and Lean experience from leading a production-line team, applied to software.',
    proof: '2016 team lead, see the timeline',
  },
];

export const tools = [
  'React',
  'Next.js',
  'Angular',
  'Flutter',
  'TypeScript',
  'Python',
  'Java',
  'SQL',
  'Tailwind CSS',
];

export const handCoded = {
  heading: 'Hand-coded',
  badge: 'No AI assistance',
  blurb: 'These show my level of experience before I switched to AI-written code.',
  repos: [
    item(
      'A-A-Larson.github.io',
      'This portfolio',
      'My developer portfolio, built with Next.js, React, and Tailwind CSS. The original version was written by hand.',
      ['Next.js', 'React', 'Tailwind'],
      { note: 'Later updates, such as the timeline and the deploy pipeline, were built with AI assistance.' }
    ),
    item(
      '2ndAngular',
      '2ndAngular',
      'A sandbox for practicing Angular tools, libraries, and common design patterns and architecture.',
      ['Angular', 'TypeScript', 'Tailwind']
    ),
    item(
      'Typescript_Final',
      'Typescript_Final',
      'A front end built with React and TypeScript, using data from an API.',
      ['React', 'TypeScript', 'Tailwind']
    ),
    item('full-stack-app', 'full-stack-app', 'A full stack final project focused on PHP and SQL.', ['PHP', 'SQL']),
    item(
      'PythonAPI-FastAPI',
      'PythonAPI-FastAPI',
      'An API built with the FastAPI framework, backed by SQL.',
      ['Python', 'FastAPI', 'SQL']
    ),
    item('BugOutBag', 'BugOutBag', 'A game built with Flutter.', ['Flutter', 'Dart']),
  ],
};

// aiHelped / owned: one or two sentences each. While empty, the labelled blocks are hidden on the card.
export const aiAssisted = {
  heading: 'AI-assisted',
  badge: 'Built with AI tooling',
  blurb: 'Built with AI tooling. For each one, what the AI did and what I decided and owned.',
  repos: [
    item('Build-A-Guild', 'Build-A-Guild', 'A game built with Flutter.', ['Flutter', 'Dart'], {
      aiHelped: '',
      owned: '',
    }),
    item(
      'flutter_boilerplate',
      'flutter_boilerplate',
      'Boilerplate for a Flutter mobile project, with a landing page, log in, and routing with a bottom bar.',
      ['Flutter', 'Dart'],
      { aiHelped: '', owned: '' }
    ),
    item(
      'Web-Scraper',
      'Web-Scraper',
      'A tool that scrapes bank account statements and retrieves line items for tracking.',
      ['Python'],
      { aiHelped: '', owned: '' }
    ),
  ],
};
