# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Run from `nextportfolio/` (the git root is its parent, so paths in git are prefixed `nextportfolio/`).

- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — static export to `out/` (`output: 'export'`); `npm start` does not apply
- `npm run lint` — `eslint src` (ESLint 9 flat config in `eslint.config.mjs`, extends `eslint-config-next/core-web-vitals`). `next lint` no longer exists in Next 16.

No test framework configured.

## Deployment

Hosted on GitHub Pages at https://a-a-larson.github.io, repo `A-A-Larson/A-A-Larson.github.io` (served from the root, so no `basePath`). The old `A-A-Larson/NextReact` repo is archived; Vercel is no longer the host.

- `.github/workflows/deploy.yml` (at the git root, not in `nextportfolio/`) builds in `nextportfolio/` and deploys `nextportfolio/out`. Runs on push to `main`, nightly, and manually.
- Static export constraints: no server runtime, no ISR/`revalidate`, `images.unoptimized` is on (so `next/image` does no resizing; compress images at the source), `trailingSlash` is on.
- Pushing to `main` deploys. Dependabot alerts and the dependency graph are under the repo's Settings, Advanced Security.

## Architecture

Single-page personal portfolio, Next.js 16 App Router, plain JavaScript (`.jsx`, no TypeScript). Source lives under `src/app/`; `@/*` alias maps to `src/*` (see `jsconfig.json`).

- `layout.jsx` — root layout. Wraps everything in `ThemeProvider`, renders `NavButton` globally, sets fonts via `font/fonts.js` CSS variables.
- `page.jsx` — marked `'use client'`. Composes the home page from section components in `components/` (Landing, NavHeader, AboutMe, Tech, Project, ApiDemo, Footer2). Section layout classes (`mainGrid`, `landingSection`, etc.) are defined in `globals.css`, not Tailwind.
- `repositories/[tech]/page.jsx` — async server component, built once at build time. Queries the GitHub search API for repos of user `A-A-Larson` by topic (sends `GITHUB_TOKEN` when set, to avoid the 60 req/hr unauthenticated limit), fetches each repo's raw README, extracts the first markdown image as card thumbnail, renders `RepositoryCard`. Data only refreshes on rebuild (nightly workflow). A failed GitHub fetch throws and fails the build. Valid `tech` values are hardcoded in `generateStaticParams`; `components/Tech.jsx` links to the same list. Adding a tech means updating both, plus the GitHub repo topic.
- `components/ApiDemo.jsx` — client-side VIN decoder calling the NHTSA vPIC API directly from the browser.

### Theming

Dark mode is class-based (`darkMode: 'class'` in `tailwind.config.js`). `context/ThemeContext.jsx` toggles `dark` on `<html>` and persists to `localStorage`; it reads `localStorage` in a mount effect, with a deliberate `eslint-disable` for `react-hooks/set-state-in-effect`. Tailwind color tokens (`lightBG`, `darkBG`, `lightTxtClr`, `darkHdrClr`, etc.) map to CSS variables defined in `globals.css`. Use these tokens in pairs (`bg-lightBG dark:bg-darkBG`) rather than raw colors.

### Styling

Mix of Tailwind utilities and hand-written classes in `globals.css` (grid areas, scroll-in animations like `column3-grid-animation` triggered by `react-intersection-observer`). Tailwind `xs` breakpoint = 330px.
