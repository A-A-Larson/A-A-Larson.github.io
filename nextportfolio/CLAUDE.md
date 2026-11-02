# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server at http://localhost:3000
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — `next lint` (extends `next/core-web-vitals`)

No test framework configured.

## Architecture

Single-page personal portfolio, Next.js App Router, plain JavaScript (`.jsx`, no TypeScript). Source lives under `src/app/`; `@/*` alias maps to `src/*` (see `jsconfig.json`).

- `layout.jsx` — root layout. Wraps everything in `ThemeProvider`, renders `NavButton` globally, sets fonts via `font/fonts.js` CSS variables.
- `page.jsx` — marked `'use client'`. Composes the home page from section components in `components/` (Landing, NavHeader, AboutMe, Tech, Project, ApiDemo, Footer2). Section layout classes (`mainGrid`, `landingSection`, etc.) are defined in `globals.css`, not Tailwind.
- `repositories/[tech]/page.jsx` — async server component. Queries the GitHub search API for repos of user `A-A-Larson` by topic (`revalidate: 60`), fetches each repo's raw README, extracts the first markdown image as card thumbnail, renders `RepositoryCard`. Valid `tech` values are hardcoded in `generateStaticParams`; `components/Tech.jsx` links to the same list. Adding a tech means updating both, plus the GitHub repo topic.
- `components/ApiDemo.jsx` — client-side VIN decoder calling the NHTSA vPIC API directly from the browser.

### Theming

Dark mode is class-based (`darkMode: 'class'` in `tailwind.config.js`). `context/ThemeContext.jsx` toggles `dark` on `<html>` and persists to `localStorage`. Tailwind color tokens (`lightBG`, `darkBG`, `lightTxtClr`, `darkHdrClr`, etc.) map to CSS variables defined in `globals.css`. Use these tokens in pairs (`bg-lightBG dark:bg-darkBG`) rather than raw colors.

### Styling

Mix of Tailwind utilities and hand-written classes in `globals.css` (grid areas, scroll-in animations like `column3-grid-animation` triggered by `react-intersection-observer`). Tailwind `xs` breakpoint = 330px.
