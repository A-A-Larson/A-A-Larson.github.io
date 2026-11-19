// Content for the "What I Can Do" section and the project detail pages at /work/[slug]/.
// `repo` is the GitHub repository name (used for the link). `title` is the text shown on the card,
// so a repo can be renamed on GitHub without touching anything but its `repo` value here.
// All text is stored here, so the build never calls the GitHub API.
//
// Screenshots: drop 4:3 images (1600x1200 is ideal) into src/app/img/projects/<slug>/ and run `npm run shots`
// (`npm run dev` and `npm run build` do it for you). They cycle on the cards and on the detail page, in
// filename order. A project with no folder shows no picture. See scripts/generate-screenshots.mjs.
import screenshots, { files } from './screenshots.generated';

// A specific image from src/app/img/projects/, e.g. 'poll-the-vote/calendar.webp'. Used for the portrait phone
// screenshots that sit next to text instead of in a slideshow. Fails the build with a clear message if missing.
const projectFile = (path) => {
  const src = files[path];
  if (!src) throw new Error(`Missing screenshot: src/app/img/projects/${path}`);
  return src;
};

const GITHUB_USER = 'A-A-Larson';
export const githubProfile = `https://github.com/${GITHUB_USER}?tab=repositories`;

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Screenshots for a project: [{ src, caption, alt }]. Alt text falls back to "<title>: <caption>".
const shotsFor = (slug, title) => {
  const shots = screenshots[slug] ?? [];
  return shots.map((shot, i) => ({
    src: shot.src,
    caption: shot.caption,
    alt: shot.alt || (shot.caption ? `${title}: ${shot.caption}` : `${title} screenshot ${i + 1} of ${shots.length}`),
  }));
};

const item = (repo, title, desc, tags, extra = {}) => {
  const slug = slugify(title);
  return {
    repo,
    title,
    slug,
    desc,
    tags,
    url: `https://github.com/${GITHUB_USER}/${repo}`,
    screenshots: shotsFor(slug, title),
    ...extra,
  };
};

export const intro =
  'Tools change quickly. What stays useful is how I work through a problem. Here is what I bring, with the work to back it up.';

// icon: key into the icons map in Work.jsx
export const capabilities = [
  {
    icon: 'ui',
    title: 'Build interfaces',
    desc: 'Responsive, accessible front ends in React, Angular, and Flutter.',
    proof: 'Poll The Vote, this portfolio, React Frontend Exercise',
  },
  {
    icon: 'data',
    title: 'Connect data and APIs',
    desc: 'Wire interfaces to REST APIs, SQL databases, and Python or PHP back ends.',
    proof: "Poll The Vote, the VIN decoder demo, PythonAPI-FastAPI Exercise, Build-A-Guild's plant data pipeline",
  },
  {
    icon: 'test',
    title: 'Test and clarify',
    desc: 'Business analysis with a QA focus: finding what breaks, and what is unclear, before users do. Now building automated API tests and documentation checks.',
    proof: "2024 internship, Poll The Vote's release checks",
  },
  {
    icon: 'ai',
    title: 'Work with AI',
    desc: 'Design AI-assisted workflows, and decide what to delegate and what to own. I plan first, test against real data, and push back when the AI takes a shortcut.',
    proof: 'Build-A-Guild, Flutter Boilerplate, PDF Scraping Budget Tool',
  },
  {
    icon: 'ship',
    title: 'Ship and maintain',
    desc: 'Release pipelines with standard pull request templates, documentation checks and automated API tests, plus GitHub Actions deploys and regular dependency audits.',
    proof: "Poll The Vote's release process, this site's deploy pipeline",
  },
  {
    icon: 'team',
    title: 'Improve how teams work',
    desc: 'Six Sigma and Lean experience from leading a production-line team, applied to software: standard templates and documentation, and mentoring junior developers.',
    proof: "2016 team lead, Poll The Vote's interns and release process",
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

// The day-job project. Shown above the repo groups and gets a full case-study page.
// Keep this to what the owner has approved: product-level features, no backend internals, no admin screenshots.
export const featured = {
  slug: 'poll-the-vote',
  sectionId: 'featured-project', // id of this section on the home page; "Back to work" links here
  title: 'Poll The Vote',
  badge: 'Day job',
  blurb: 'The product I build every day as a contract full-stack developer.',
  eyebrow: 'Ideologix Insights · Contract · Sep 2024 to present',
  pitch:
    'A nonpartisan civic engagement platform: a mobile web app, admin portal and API that connect people with their elected officials, candidates and community leaders.',
  chips: ['Mobile web app', 'Admin portal', 'API'],
  screenshots: shotsFor('poll-the-vote', 'Poll The Vote'),
  siteUrl: 'https://pollthevote.com/',
  facts: [
    { label: 'Role', value: 'Full-stack developer (contract)' },
    { label: 'Scope', value: 'Mobile web app, admin portal, API' },
    { label: 'Commits', value: '379 across all three codebases' },
    { label: 'Team', value: 'Only full-time developer, plus part-time interns' },
  ],
  product: [
    'People create a free account, get matched to their elected officials by address, and follow community leaders and organizations. Those leaders send polls, announcements and newsletters, and people answer anonymously. The platform is built by Ideologix Insights, a data analytics company in Omaha.',
  ],
  built: [
    {
      heading: 'Mobile web app',
      items: [
        'Calendar and events with RSVP',
        'Ranked-choice poll question type',
        'Dashboard filters by city, state, zip and organization type',
        'Rich-text editing with images and video for announcements and newsletters',
        'Email and text notification settings for each user',
      ],
    },
    {
      heading: 'Admin portal',
      items: [
        'Pages for admins to manage calendar events',
        'Redesigned organization admin dashboard',
        'Bulk member invitations',
      ],
      note: 'Admin screens are not shown publicly.',
    },
    {
      heading: 'API',
      items: [
        'Built and extended the endpoints behind calendar, polls and notification settings',
        'One developer working across the mobile web app, admin portal and API',
      ],
    },
    {
      heading: 'Release process',
      items: [
        'Pull request and release-promotion templates, with the release template filled in automatically',
        'Automated checks that required documentation is present before a change can merge',
        'API test suites that run on every change, with more automated testing being added',
        'One standard process across all three codebases and both environments, so releases are faster and safer',
      ],
    },
    {
      heading: 'Day to day',
      items: [
        'The only full-time developer: I talk with the owner, build features, test, approve pull requests and fix bugs',
        'Keep improving the release pipeline and the documentation',
        'Mentor the interns by sharing what I know and reviewing their code',
      ],
    },
  ],
  walkthroughs: [
    {
      title: 'Ranked-choice polls',
      does: 'Voters rank their choices instead of picking one. Ranking questions give poll creators structured, comparative insight that standard rating or multiple-choice questions cannot capture.',
      built: 'The new question type, from the poll form to the voting screen.',
      image: projectFile('poll-the-vote/ranked-choice.webp'),
      imageAlt: 'A ranked-choice poll question in the mobile web app. A list of issues, each with a rank dropdown, with Affordable Housing ranked first.',
    },
    {
      title: 'Calendar and events',
      does: 'A mini calendar with event dots, a day view that handles several events, and RSVP.',
      built: 'The biggest feature I have built from scratch on this project: the calendar and RSVP in the app, the admin page for managing events, and the API behind both.',
      image: projectFile('poll-the-vote/calendar.webp'),
      imageAlt: 'The calendar in the mobile web app showing November 2026 with event days highlighted and an Upcoming Events list with RSVP buttons.',
    },
    {
      title: 'Notifications',
      does: 'An inbox for announcements, newsletters and new events from the leaders and organizations a person follows. Each person also chooses email, text or both, and does not get alerts for polls they already finished.',
      built: 'The notification inbox, the settings screen and the supporting API changes.',
      image: projectFile('poll-the-vote/notifications.webp'),
      imageAlt: 'The notifications panel in the mobile web app, listing announcements, newsletters and a new event.',
    },
  ],
  privateNote: "Source code is private. Shown with the owner's permission.",
};

export const handCoded = {
  sectionId: 'hand-coded',
  heading: 'Hand-coded',
  badge: 'No AI assistance',
  blurb: 'These show my level of experience before I switched to AI-written code.',
  repos: [
    item(
      'A-A-Larson.github.io',
      'This portfolio',
      'My developer portfolio, built with Next.js, React, and Tailwind CSS. The original version was written by hand.',
      ['Next.js', 'React', 'Tailwind'],
      {
        note: 'Later updates, such as the timeline and the deploy pipeline, were built with AI assistance.',
        story: [
          {
            heading: 'Why I built it',
            paragraphs: [
              'I wanted a modular portfolio I could keep growing and refining. It was also my first site hosted on the internet, so it taught me the whole path from idea to hosting to upkeep.',
            ],
          },
          {
            heading: 'How it changed',
            paragraphs: [
              'I hand-coded the first version, including a tech stack section. As AI coding tools made specializing in one technology less meaningful, I redesigned the site around what I can do and what I have done. I used Claude design to mock up new layouts before settling on the current one.',
              'The About Me section started as plain text. I added the timeline to present that history better.',
              'AI also handled tedious work: capturing and formatting the screenshots, and interviewing me to draft the project descriptions on this site.',
            ],
          },
          {
            heading: 'What I am proud of',
            paragraphs: [
              'The landing page. Getting the layers right so the page looks like it is lifted by hands took a long time to work out.',
              'The VIN decoder demo, which calls a public vehicle API from the browser. I have used it myself more than once.',
            ],
          },
          {
            heading: 'Upkeep',
            paragraphs: [
              'Dependabot and security upgrades keep the dependencies current, and a GitHub Actions workflow builds and deploys the site.',
            ],
          },
        ],
      }
    ),
    item(
      '2ndAngular',
      'Angular Frontend Exercise',
      'A sandbox for practicing Angular tools, libraries, and common design patterns and architecture.',
      ['Angular', 'TypeScript', 'Tailwind'],
      {
        story: [
          {
            heading: 'What it is',
            paragraphs: [
              'A sandbox I started when I first picked up Angular, to get comfortable with the framework. It fetches plant data from the Trefle plant database API and shows it in a grid of cards.',
            ],
          },
          {
            heading: 'What I practiced',
            paragraphs: [
              'Routing, services, forms, state, directives, RxJS and observables, and signals.',
            ],
          },
          {
            heading: 'A problem I solved',
            paragraphs: [
              'Calling the API straight from the browser failed with CORS errors. I worked out how to run a proxy server so the requests could go through.',
            ],
          },
          {
            heading: 'What I use from it now',
            paragraphs: [
              'It built my foundation for calling APIs and displaying the fetched data, which I still do often.',
            ],
          },
        ],
      }
    ),
    item(
      'Typescript_Final',
      'React Frontend Exercise',
      'A front end built with React and TypeScript, with strongly typed props and data. My final project for a TypeScript class.',
      ['React', 'TypeScript', 'Tailwind'],
      {
        story: [
          {
            heading: 'What it is',
            paragraphs: [
              'The final project for my TypeScript class, built while I was still in school. The main goal was to type everything: props, data and state. Along the way I learned how TypeScript works with JavaScript.',
              'It also covers fetching data, hooks, routing and state in React.',
            ],
          },
          {
            heading: 'A bug I learned from',
            paragraphs: [
              'The app was meant to load its data from an API. A bug fired a burst of requests in a short time and used up my API key rate limit. To hand the assignment in on time, I switched to a local data file.',
              'Now, when code gets stuck in a loop, I step through it in the debugger instead of guessing.',
            ],
          },
        ],
      }
    ),
    item(
      'PythonAPI-FastAPI',
      'PythonAPI-FastAPI Exercise',
      'An API built with the FastAPI framework, backed by SQL. My final project for a Python class on APIs.',
      ['Python', 'FastAPI', 'SQL'],
      {
        story: [
          {
            heading: 'What it does',
            paragraphs: [
              'A student records API with four endpoints: get one student, get all students, create a student and update a student. The data lives in a single SQL table, which I queried with raw SQL.',
              'The screenshots show the interactive docs FastAPI generates automatically, including request validation.',
            ],
          },
          {
            heading: 'A problem I solved',
            paragraphs: [
              'My test calls kept failing until I configured the CORS middleware correctly.',
            ],
          },
          {
            heading: 'What it taught me',
            paragraphs: [
              'This project cemented how an API works: an endpoint is a function triggered by an HTTP request that fetches data from a database. It also gave me a working understanding of REST and CORS.',
            ],
          },
        ],
      }
    ),
  ],
};

// aiHelped / owned: one or two sentences each. While empty, the labelled blocks are hidden on the card.
export const aiAssisted = {
  sectionId: 'ai-assisted',
  heading: 'AI-assisted',
  badge: 'Built with AI tooling',
  blurb: 'Built with AI tooling. For each one, what the AI did and what I decided and owned.',
  repos: [
    item(
      'Build-A-Guild',
      'Build-A-Guild',
      'A puzzle game about building plant guilds: groups of plants that help each other grow. Built with Flutter, and currently an MVP.',
      ['Flutter', 'Dart'],
      {
        aiHelped:
          'Claude Code wrote most of the Dart code, including the garden simulation and the drag-and-drop board, working from my designs and plans. It also helped me learn game development, since this is my first game.',
        owned:
          'The game mechanics and the game loop, which I decided before any code was written, and the rule that plant stats come from real data. When the AI wanted to approximate a value to save effort, I made it source the real number.',
        story: [
          {
            heading: 'The game',
            paragraphs: [
              'A plant guild is a group of different plant species that support each other, the way plants do in wild communities. The classic example is the Three Sisters. Corn grows tall, bean vines climb the corn and put nitrogen back into the soil, and squash spreads along the ground to block weeds and keep the soil moist. Together they produce more food from the same space.',
              'In Build-A-Guild you design new combinations. The star plant is the tallest, at the center, and the companion plants around it exist to help it, by covering the ground to hold water or by raising soil fertility. The game uses real-world variables and data to show how well your star performs over the years.',
            ],
          },
          {
            heading: 'Where it came from',
            paragraphs: [
              'I design guilds for my own garden as a hobby. Planning them felt like solving a puzzle, so I set out to turn that into a game. If enough people play, maybe some strong guild combinations will turn up.',
            ],
          },
          {
            heading: 'How I built it',
            paragraphs: [
              'I started with the design system and the screen plans, then built the game board and rebuilt it through several iterations.',
              'Before I could test a single game round, I needed a way to source the data. I wanted every plant stat to come from real data, so I built a pipeline that either looks up or calculates values such as canopy size and calories produced per year. I am still refining it.',
            ],
          },
          {
            heading: 'Where it stands',
            paragraphs: [
              'It is an MVP. I am balancing the mechanics and building a tutorial. What I am proudest of is the chance that it is a fun puzzle, an educational tool and a data model that could reveal strong guilds.',
            ],
          },
        ],
      }
    ),
    item(
      'flutter_boilerplate',
      'Flutter Boilerplate',
      'A reusable starting point for Flutter mobile apps, with a landing page, log in, and routing with a bottom bar.',
      ['Flutter', 'Dart'],
      {
        aiHelped:
          'Described the trade-offs of each design choice, such as Firebase or my own login, and which database and back end to use. It then wrote the screens, form validation, error handling and session code from step-by-step plans.',
        owned:
          'Every design decision. I weighed the pros and cons and chose the navigation structure, how login should work and what the template must include.',
        story: [
          {
            heading: 'Why I built it',
            paragraphs: [
              'Every mobile app I wanted to make needed the same things: a login, routing, a database and state management. I built this template so I would not rewrite them each time. It also let me learn how login works, including using JSON Web Tokens to validate a user.',
            ],
          },
          {
            heading: 'What I learned',
            paragraphs: [
              'Building my own login showed me how much work Firebase takes off your plate. For most apps, writing my own login is not worth it.',
            ],
          },
        ],
      }
    ),
    item(
      'Web-Scraper',
      'PDF Scraping Budget Tool',
      'A tool I use every month. It reads a bank statement PDF and adds the line items and totals to my budget sheet.',
      ['Python'],
      {
        aiHelped:
          'Recommended the language and library for simplicity, then built a first working version from my specs. It took several rounds of testing and bug fixes to get right.',
        owned:
          'Everything else: what the tool does, the spending categories and matching rules, the review step where I confirm each line, and the decision to work from downloaded PDFs instead of the bank site.',
        story: [
          {
            heading: 'The problem',
            paragraphs: [
              'Each month I used to go through my bank statement by hand. I found the fixed bills and copied over the date and title, did the same for groceries and income, then worked out gross and net expenses and profit. It was tedious enough that I once fell a year behind.',
              'A month with many transactions took half an hour to an hour.',
            ],
          },
          {
            heading: 'How it works',
            paragraphs: [
              'I download my statement as a PDF and give it to the tool, which runs on my own computer. It sorts the transactions into my categories, shows every line so I can confirm or fix it, and then adds the totals to my budget file.',
              'I chose not to scrape the bank website. It was not clear that automating a login was allowed, even for my own account, so the design works only from files I download myself and never stores credentials.',
            ],
          },
          {
            heading: 'How I built it',
            paragraphs: [
              'I started with a planning phase. When the specs were solid, I had the AI build a first version and tested it against my real statements. There were plenty of bugs at first and it took several iterations.',
            ],
          },
          {
            heading: 'The result and what is next',
            paragraphs: [
              'I use it every month, and downloading the PDF now takes longer than processing it. Next I want a tool that visualizes the data in my budget sheet, so I can track trends over a longer period and find where to improve.',
            ],
          },
        ],
      }
    ),
  ],
};

// Every project that gets a detail page, in page order. `kind` picks the label and layout.
export const projects = [
  { kind: 'featured', ...featured },
  ...handCoded.repos.map((repo) => ({ kind: 'hand', ...repo })),
  ...aiAssisted.repos.map((repo) => ({ kind: 'ai', ...repo })),
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const projectPath = (slug) => `/work/${slug}/`;

// Home page link back to the section a project lives in, by project kind ('featured' | 'hand' | 'ai').
const SECTION_IDS = { featured: featured.sectionId, hand: handCoded.sectionId, ai: aiAssisted.sectionId };
export const backToWorkPath = (kind) => `/#${SECTION_IDS[kind]}`;
