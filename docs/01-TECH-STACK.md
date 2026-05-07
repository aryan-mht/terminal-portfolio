# 01-TECH-STACK.md — Technology Stack & Project Structure

## Core Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR, API routes, Vercel-native |
| UI | React 18 | Functional components, hooks |
| Language | TypeScript (strict mode) | Type safety, no `any` |
| Styling | Tailwind CSS | Utility-first, no CSS files per component |
| Animation | Framer Motion | Declarative, `prefers-reduced-motion` support |
| Font (primary) | System mono stack | Terminal aesthetic — `ui-monospace` first, then Cascadia Code / Source Code Pro / Menlo / Consolas / Liberation Mono / Monaco / DejaVu Sans Mono / `monospace`. No web download. |
| Font (retro accent) | VT323 (Google Fonts) | CRT-terminal feel, used for hero welcome line |
| Font (ASCII art) | Courier New (system) | Box-drawing glyphs tile cleanly at line-height: 1 |
| Font (pixel, reserved) | Press Start 2P (Google Fonts) | Loaded but currently unused; kept for future pixel accents |
| Class utility | clsx + tailwind-merge | Conditional classes via `cn()` helper |

---

## External APIs

All external API calls are proxied through Next.js API routes to avoid CORS issues.

### `/api/ip/route.ts`
- Source: `ipapi.co/json`
- No API key required
- Returns: `{ ip: string, city: string, region: string, country: string, latitude: number, longitude: number }`
- Used by: `ip` command (terminal) + status bar weather location lookup

### `/api/weather/route.ts`
- Source: Open-Meteo API (`api.open-meteo.com`)
- No API key required, free, accurate
- Takes: `lat` and `lon` query params (from visitor's IP location)
- Returns: `{ temp: number, condition: string, wind: number, humidity: number, city: string }`
- Cache: `revalidate: 600` (10 minutes)
- Weather codes mapped to readable condition strings (e.g. WMO code 3 → "Overcast")

---

## Package Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint . --max-warnings 0",
  "type-check": "tsc --noEmit",
  "format": "prettier --write ."
}
```

**Zero warnings policy:** `npm run lint` fails if any ESLint warning exists, not just errors.

---

## Dependencies

```
next@14.x
react@18.x
react-dom@18.x
typescript@5.x
tailwindcss@3.x
framer-motion@11.x
clsx@2.x
tailwind-merge@2.x
```

**Dev dependencies:**
```
eslint
eslint-config-next
@types/node
@types/react
@types/react-dom
prettier
```

Do not add dependencies without a clear reason. Browser-native APIs are preferred where available (e.g. `SubtleCrypto` for hashing, no library needed).

---

## Directory Structure

```
/
├── CLAUDE.md                         ← executive summary (read first)
├── AGENTS.md                         ← agent session setup
├── DECISIONS.md                      ← architectural decisions log
├── docs/                             ← specialist docs (load per phase)
│   ├── 01-TECH-STACK.md
│   ├── 02-DESIGN-SYSTEM.md
│   ├── 03-TERMINAL-ARCH.md
│   ├── 04-COMMAND-SPECS.md
│   ├── 05-CONTENT-MAP.md
│   ├── 06-BUILD-PHASES.md
│   └── 07-QA-CHECKLIST.md
├── public/
│   └── Resume.pdf                    ← Aryan's resume PDF (already present)
├── .github/
│   └── workflows/
│       └── ci.yml                    ← lint + typecheck + build on every PR
├── src/
│   ├── app/
│   │   ├── layout.tsx                ← root layout, fonts, metadata
│   │   ├── page.tsx                  ← main terminal page (only page)
│   │   ├── globals.css               ← CSS variables, global resets
│   │   └── api/
│   │       ├── weather/route.ts      ← proxies Open-Meteo API
│   │       └── ip/route.ts           ← proxies ipapi.co
│   ├── components/
│   │   ├── terminal/
│   │   │   ├── terminal.tsx          ← main terminal container
│   │   │   ├── terminal-input.tsx    ← input with autocomplete + history
│   │   │   ├── terminal-output.tsx   ← renders a single command result
│   │   │   ├── terminal-history.tsx  ← renders full session history
│   │   │   ├── autocomplete.tsx      ← dropdown suggestion list
│   │   │   └── prompt.tsx            ← the "aryan@portfolio:~$" line
│   │   ├── layout/
│   │   │   ├── navbar.tsx            ← macOS traffic lights + command buttons
│   │   │   └── status-bar.tsx        ← weather + domain + live clock
│   │   ├── hero/
│   │   │   ├── hero.tsx              ← ASCII name + boot sequence + welcome
│   │   │   ├── ascii-name.tsx        ← pixel font ARYAN display
│   │   │   └── boot-sequence.tsx     ← animated boot lines on page load
│   │   └── commands/
│   │       ├── output-about.tsx
│   │       ├── output-experience.tsx
│   │       ├── output-projects.tsx
│   │       ├── output-skills.tsx
│   │       ├── output-contact.tsx
│   │       ├── output-help.tsx
│   │       ├── output-hash.tsx
│   │       ├── output-weather.tsx
│   │       ├── output-neofetch.tsx
│   │       ├── output-rps.tsx
│   │       └── output-ascii.tsx
│   ├── lib/
│   │   ├── commands.ts               ← command registry (single source of truth)
│   │   ├── use-terminal.ts           ← terminal state hook
│   │   ├── use-command-history.ts    ← arrow key history navigation
│   │   ├── use-autocomplete.ts       ← autocomplete filter logic
│   │   ├── use-clock.ts              ← live clock hook
│   │   └── utils.ts                  ← cn() helper
│   └── data/
│       ├── projects.ts               ← all project data
│       ├── experience.ts             ← all work experience data
│       └── skills.ts                 ← all skills data
```

---

## CI/CD Pipeline

### GitHub Actions (`/.github/workflows/ci.yml`)
Triggers on every pull_request targeting `main`.

Steps:
1. `actions/checkout@v4`
2. `actions/setup-node@v4` — Node 20, npm cache enabled
3. `npm ci`
4. `npm run lint` — zero warnings allowed
5. `npm run type-check` — `tsc --noEmit`
6. `npm run build`

All 4 steps must pass. PRs cannot merge if any step fails.

### Vercel (CD)
- Connected to `main` branch — every merge auto-deploys to production
- Every PR gets a preview deployment URL automatically
- Framework preset: Next.js — no manual config needed
- No manual deployment steps ever

### Branch Protection (set manually on GitHub)
- Require PR before merging to main
- Require CI status checks to pass
- Require branch to be up to date before merging
- No force pushes to main
