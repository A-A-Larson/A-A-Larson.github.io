// Career timeline shown in the About Me section. Newest first.
// To add a milestone, put a new object at the top of the array.
//   when:    label shown beside the entry ("2007", "Now", "2024 - 2025"). Leave '' to hide.
//   title:   what you did or became
//   org:     optional employer, school, or project
//   summary: one to three sentences
//   tags:    optional short skill/tool labels
const timeline = [
  {
    when: 'Next',
    title: 'Learning new skills and building AI workflows',
    summary:
      "I'm focused on learning new skills and getting better at designing AI-assisted development workflows, while continuing to grow my portfolio and take on opportunities that stretch me.",
    tags: ['AI workflows'],
  },
  {
    when: '2026',
    title: 'Introduced AI tooling and workflows',
    summary: 'Brought AI tools into my development workflow.',
    tags: ['AI tooling'],
  },
  {
    when: '2025 - Now',
    title: 'Software Developer',
    summary:
      "Graduated, completed an internship on a mobile app project, and became the primary developer on the Angular project I started in 2024. Outside of work, I'm building a Flutter app as a passion project.",
    tags: ['Angular', 'Flutter'],
  },
  {
    when: '2024',
    title: 'Internship: business analyst, then software developer',
    summary:
      'Started in a hybrid business analyst role with a focus on QA testing. The internship grew into a software developer role.',
    tags: ['Business analysis', 'QA testing'],
  },
  {
    when: '2020',
    title: 'Career change to dental equipment service technician',
    summary: 'Changed careers and worked as a dental equipment service technician while going to school.',
  },
  {
    when: '2016',
    title: 'Mechanical team lead',
    org: 'Production line',
    summary:
      'Led a team on a line that used Six Sigma methodology and Lean production, with weekly sprints.',
    tags: ['Six Sigma', 'Lean', 'Sprints'],
  },
  {
    when: '2014',
    title: 'Earned Master Automotive Technician title',
    summary: 'Earned the title of Master Automotive Technician and ran out of new things to learn.',
  },
  {
    when: '2008',
    title: 'Independent mechanic',
    org: 'Commission shop',
    summary: 'Worked as a self-starter, independently and on tight deadlines.',
  },
  {
    when: '2007',
    title: 'Started a career as a mechanic',
    summary: 'Began with a degree in automotive technology.',
  },
];

export default timeline;
