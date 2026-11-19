# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Run from `nextportfolio/` (the git root is its parent, so paths in git are prefixed `nextportfolio/`).

- `npm run dev` â€” dev server at http://localhost:3000
- `npm run build` â€” static export to `out/` (`output: 'export'`); `npm start` does not apply
- `npm run shots` (also runs automatically before `dev` and `build`) regenerates `src/app/data/screenshots.generated.js` from the folders in `src/app/img/projects/`. Commit the generated file.
- `node scripts/compose-phones.mjs <out> <shot1> [shot2] [shot3]` puts 1 to 3 phone screenshots side by side on a 1600x1200 canvas (see "Project screenshots").
- `npm run lint` â€” `eslint src` (ESLint 9 flat config in `eslint.config.mjs`, extends `eslint-config-next/core-web-vitals`). `next lint` no longer exists in Next 16.

No test framework configured.

## Deployment

Hosted on GitHub Pages at https://a-a-larson.github.io, repo `A-A-Larson/A-A-Larson.github.io` (served from the root, so no `basePath`). The old `A-A-Larson/NextReact` repo is archived; Vercel is no longer the host.

- `.github/workflows/deploy.yml` (at the git root, not in `nextportfolio/`) builds in `nextportfolio/` and deploys `nextportfolio/out`. Runs on push to `main`, nightly, and manually.
- Static export constraints: no server runtime, no ISR/`revalidate`, `images.unoptimized` is on (so `next/image` does no resizing; compress images at the source), `trailingSlash` is on. The `/work/[slug]/` detail pages work because of `generateStaticParams` plus `dynamicParams = false`; a slug that is not in `data/work.js` is a 404.
- Pushing to `main` deploys. Dependabot alerts and the dependency graph are under the repo's Settings, Advanced Security.

## Architecture

Single-page personal portfolio, Next.js 16 App Router, plain JavaScript (`.jsx`, no TypeScript). Source lives under `src/app/`; `@/*` alias maps to `src/*` (see `jsconfig.json`).

- `layout.jsx` â€” root layout. Wraps everything in `ThemeProvider`, renders `NavButton` globally, sets fonts via `font/fonts.js` CSS variables.
- `page.jsx` â€” marked `'use client'`. Composes the home page from section components in `components/` (Landing, NavHeader, AboutMe, Work, ApiDemo, Footer2). Section layout classes (`mainGrid`, `landingSection`, etc.) are defined in `globals.css`, not Tailwind.
- `components/Work.jsx` + `data/work.js` â€” the "What I Can Do" section (capability cards, Featured project, Hand-coded repos, AI-assisted repos). Every card links to a detail page at `/work/<slug>/`. All text lives in `data/work.js`, the single source of truth for both the cards and the detail pages. Each repo has `repo` (GitHub name, used for the "View on GitHub" link), `title` (card text) and a `slug` generated from the title, so renaming a card never needs a GitHub rename, but it does change the URL. `projects` lists every detail page in order, each with a `kind` of `featured`, `hand` or `ai`; `backToWorkPath(kind)` is the home-page anchor each "Back to work" link returns to (`#featured-project`, `#hand-coded`, `#ai-assisted`). No GitHub API calls at build time. Repo entries can carry `story: [{ heading, paragraphs }]`, shown as headed sections on the detail page only (cards keep the short `desc`). AI-assisted entries also have `aiHelped`/`owned`; the labelled blocks stay hidden when empty.
- Featured project (Poll The Vote, a private day-job app shown with the owner's permission): keep it to user-visible features. No backend internals, security or auth details, admin screenshots, tech-stack tags or GitHub link, and nothing the owner would not want public. The admin portal may only be described in general terms.
- `work/[slug]/page.jsx` — server component for the detail pages (`FeaturedDetail` for the featured project, `RepoDetail` for the rest), with `generateStaticParams`, `generateMetadata`, a theme toggle and a pager to the next project.
- `components/Slideshow.jsx` — client slideshow system. `SlideshowProvider` holds one shared clock so every card cycles in unison (4.5 s), honours `prefers-reduced-motion`, and pauses while a card is hovered or focused. `CardSlides` is the card version, `Carousel` the detail-page version with prev/next, dots, caption and pause, and `SlideshowToggle` the section-wide pause button.
- `components/ThemeButton.jsx` — accessible light/dark toggle used on the detail pages (the home page uses `NavButton`).
- `components/Timeline.jsx` + `data/timeline.js` â€” About Me career timeline, newest first.
- `components/ApiDemo.jsx` â€” client-side VIN decoder calling the NHTSA vPIC API directly from the browser.

### Theming

Dark mode is class-based (`darkMode: 'class'` in `tailwind.config.js`). `context/ThemeContext.jsx` toggles `dark` on `<html>` and persists to `localStorage`; it reads `localStorage` in a mount effect, with a deliberate `eslint-disable` for `react-hooks/set-state-in-effect`. Tailwind color tokens (`lightBG`, `darkBG`, `lightTxtClr`, `darkHdrClr`, etc.) map to CSS variables defined in `globals.css`. Use these tokens in pairs (`bg-lightBG dark:bg-darkBG`) rather than raw colors.

### Project screenshots

Each project has a folder `src/app/img/projects/<slug>/`. Drop 4:3 images in it (1600x1200, WebP preferred, about 150 KB or less), name them with number prefixes (`01-home.webp`) because they show in filename order, and run `npm run shots`. `scripts/generate-screenshots.mjs` writes `data/screenshots.generated.js`: the default export maps each slug to its slideshow images, and the named export `files` holds every image by `"<slug>/<filename>"`. `work.js` reads the default export through `shotsFor(slug, title)`. A project with no folder shows no picture.

- `captions.json` in a folder sets the caption and alt text per file (a string, or `{ "caption", "alt" }`); without it the caption comes from the filename.
- Portrait images (taller than wide) are skipped by the slideshows but stay in `files`. The Poll The Vote walkthrough phone shots use this through `projectFile('poll-the-vote/calendar.webp')`, which fails the build with a clear message if the file is missing. Do not leave raw phone screenshots in a project folder unless a page places them by name.
- Phone apps (the Flutter projects): capture portrait screenshots on an emulator, keep them outside the repo, and compose them into 4:3 images with `scripts/compose-phones.mjs`. Use a release build so there is no debug banner, and no real data in the shots.

### Styling

Mix of Tailwind utilities and hand-written classes in `globals.css` (grid areas, scroll-in animations triggered by `react-intersection-observer` (e.g. the `workCapVisible` stagger and icon draw-in in the Work section, gated by `prefers-reduced-motion`)). Tailwind `xs` breakpoint = 330px.

- Tailwind's `dark:` variant only matches descendants of `.dark`, so it cannot style `<html>` itself. `globals.css` sets the dark page background with `html.dark { ... }`.
- `.workWrap` carries the Work section's local color palette; the detail pages reuse it, and their styles are the `.proj*` and `.carousel*` classes.
- Anchors that land on a section heading rely on `scroll-margin-top` using `--stickyNavH` (72px from 768px up; the nav measures 54px on desktop and 78px around 820px wide). If the nav height changes, update that one variable.
