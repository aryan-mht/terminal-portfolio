# CLAUDE.md — Aryan Mehta Terminal Portfolio

## What This Is

A terminal-emulator portfolio website for Aryan Mehta — Software Engineering Honours student at USask (GPA 3.8/4.0). Visitors interact by typing commands or clicking nav buttons. Portfolio content is revealed through terminal commands that render inline — no page navigation, no page reloads. Everything happens in one continuous terminal session on a single page.

**This is the entry point. All implementation details live in `docs/`.** Read this file first, then load the relevant `docs/0X-*.md` for the area you're working on.

---

## Docs Index

| File | Purpose |
|---|---|
| `docs/01-TECH-STACK.md` | Tech choices, directory layout, CI/CD, package scripts |
| `docs/02-DESIGN-SYSTEM.md` | Colors, typography, spacing, animation specs, component tokens |
| `docs/03-TERMINAL-ARCH.md` | Terminal emulator pattern, command registry, hooks, data flow |
| `docs/04-COMMAND-SPECS.md` | Every command: input → output → handler → aliases |
| `docs/05-CONTENT-MAP.md` | All real copy, links, data — the single source of truth for content |
| `docs/06-BUILD-PHASES.md` | 10 phases, one-at-a-time prompts, TEST + COMMIT checkpoints |
| `docs/07-QA-CHECKLIST.md` | Final ship checklist, Lighthouse targets, accessibility audit |
| `AGENTS.md` | Session setup prompt, Next.js caveats, common agent mistakes |

---

## Architecture

```
[status bar — top, fixed, 28px]
[navbar — macOS style, fixed, 40px, command buttons]
[hero — ASCII name + boot sequence + auto-run help]
[terminal session — command history stacks here, scrollable]
[active prompt — always at bottom, always focused]
```

**Core pattern:** Command registry. Every command is a registered object. Adding a command = adding one entry to `src/lib/commands.ts`. Command handler returns a React component. Output is pushed to a history array and rendered inline.

**Single page:** No routing. No separate pages. Everything on `/`. The `clear` command empties the history array. The `refresh` command calls `window.location.reload()`.

---

## Coding Conventions

- TypeScript strict mode — **no `any` types, ever**
- Functional components only — no class components
- Named exports everywhere — `export function Navbar() {}`
- Default exports only for Next.js files: `page.tsx`, `layout.tsx`, `route.ts`
- Props always use `interface`, never `type`
- Tailwind utility classes for everything — no CSS modules, no styled-components
- Use `cn()` for all conditional classes
- CSS variables (from `globals.css`) for design tokens — **never hardcode hex colors**
- No inline `style={}` except for dynamic JS-computed values
- Framer Motion for all component animations — CSS transitions only for simple hover
- All decorative elements: `aria-hidden="true"`
- All interactive elements: proper `aria-label`
- All external links: `target="_blank" rel="noopener noreferrer"`
- One component per file, max 120 lines — extract if larger
- No comments unless the WHY is non-obvious

---

## What NOT To Do

- Do NOT add a light mode or theme toggle (dark only)
- Do NOT use page routing — everything on single `/` page
- Do NOT use `any` TypeScript type anywhere
- Do NOT add CSS modules or styled-components
- Do NOT hardcode hex colors — use CSS variables
- Do NOT install unnecessary packages — question every new dependency
- Do NOT make components longer than 120 lines without splitting
- Do NOT use `<form>` HTML tags — use controlled React inputs with event handlers
- Do NOT write placeholder or Lorem Ipsum content — use real data from `docs/05-CONTENT-MAP.md`
- Do NOT push directly to main — all changes via PR
- Do NOT skip `npm run build` before committing

---

## Build Overview

10 phases. Each phase = one PR to main. Phases must be completed in order — do not start the next until current phase passes `npm run build`, `npm run lint`, and `npm run type-check` cleanly.

Full phase specs with one-at-a-time prompts: **`docs/06-BUILD-PHASES.md`**

| Phase | Name |
|---|---|
| 1 | Scaffold + CI/CD Pipeline |
| 2 | Layout Shell (Navbar + Status Bar) |
| 3 | Hero Section |
| 4 | Terminal Shell (Input + History + Autocomplete) |
| 5 | Core Portfolio Commands |
| 6 | Fun Commands |
| 7 | Live Status Bar Data |
| 8 | Polish + Animations |
| 9 | SEO + Performance + Accessibility |
| 10 | Final QA |

---

## Commit Convention

```
feat: add hash command with SHA256 and MD5 output
fix: correct autocomplete positioning on mobile
chore: update Next.js to 14.2.x
docs: update CLAUDE.md with neofetch spec
refactor: extract useCommandHistory into separate hook
```

Every commit must pass `npm run build` and `npm run lint`. Include co-author trailer:
`Co-authored-by: Claude <noreply@anthropic.com>`
