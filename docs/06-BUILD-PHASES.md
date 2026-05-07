# 06-BUILD-PHASES.md — Build Phases

10 phases. Each phase = one PR to main. Work through them strictly in order.

**Before each phase:** Read CLAUDE.md + this file + the relevant specialist doc(s).
**After each prompt step:** Run `npm run build && npm run lint && npm run type-check`. Fix before moving on.
**After each phase:** Open PR, confirm CI passes, confirm Vercel preview deploys.

---

## Phase 1 — Scaffold + CI/CD Pipeline

**Goal:** Bare project that builds, lints, and deploys successfully end to end.
**Relevant docs:** `docs/01-TECH-STACK.md`

### Prompt 1.1 — Initialize project
```
Create a Next.js 14 project with TypeScript, Tailwind CSS, App Router, and src/ directory.
Install: framer-motion, clsx, tailwind-merge

Set up:
- src/lib/utils.ts with cn() helper (clsx + tailwind-merge)
- src/app/globals.css with all CSS variables from docs/02-DESIGN-SYSTEM.md
- src/app/layout.tsx loading JetBrains Mono + Press Start 2P from next/font/google, applied as CSS variables
- src/app/page.tsx as a blank dark page (just var(--color-bg) background)
- .env.local.example with placeholder env var comments
- DECISIONS.md (empty, just the header)
```
**TEST:** `npm run dev` shows a blank dark page with no errors.
**COMMIT:** `feat: phase 1.1 — Next.js scaffold with fonts, CSS variables, and cn() helper`

---

### Prompt 1.2 — CI pipeline
```
Create .github/workflows/ci.yml that triggers on pull_request to main.
Steps: checkout → setup-node (Node 20, npm cache) → npm ci → npm run lint → npm run type-check → npm run build
All steps must pass. Use actions/checkout@v4 and actions/setup-node@v4.
```
**TEST:** Push to a branch, open a draft PR, confirm GitHub Actions runs and passes.
**COMMIT:** `feat: phase 1.2 — GitHub Actions CI pipeline`

---

### Prompt 1.3 — Deploy
```
Connect the repository to Vercel. Framework preset: Next.js. Auto-deploy main branch.
Confirm the blank dark page is live at the Vercel URL.
```
**TEST:** Vercel production URL shows blank dark page. No build errors in Vercel dashboard.
**COMMIT:** `chore: phase 1.3 — Vercel production deploy configured`

---

## Phase 2 — Layout Shell (Navbar + Status Bar)

**Goal:** The outer chrome of the terminal is visible and styled correctly.
**Relevant docs:** `docs/02-DESIGN-SYSTEM.md`

### Prompt 2.1 — Navbar
```
Build src/components/layout/navbar.tsx.
- Fixed top, full width, 40px height (--navbar-height)
- Background: var(--color-surface), 1px bottom border var(--color-border)
- Left: three macOS traffic light dots in CSS (red #ff5f57, yellow #ffbd2e, green #28c840), 12px circles, 6px gap
- Right: command buttons — help, about, projects, skills, experience, contact, clear, refresh
  - JetBrains Mono, transparent bg, 1px border var(--color-accent), text var(--color-accent)
  - Hover: bg fills var(--color-accent) at 10% opacity — CSS transition 0.1s
  - Buttons are visual only for now (onClick wired in Phase 5)
- Mobile: buttons scroll horizontally (overflow-x: auto, no wrapping)
- 'use client' directive
- Add to src/app/layout.tsx
```
**TEST:** Navbar renders at top. Buttons are styled. Traffic lights visible. Mobile: buttons scroll.
**COMMIT:** `feat: phase 2.1 — navbar with traffic lights and command buttons`

---

### Prompt 2.2 — Status Bar
```
Build src/components/layout/status-bar.tsx.
- Fixed bottom, full width, 28px height (--status-bar-height)
- Background: var(--color-surface), 1px top border var(--color-border)
- Left: static placeholder "—°C" (weather wired in Phase 7)
- Center: static "aryan.dev" (placeholder domain)
- Right: static "May 6th, 2026  00:00:00" (clock wired in Phase 7)
- All text: var(--color-muted), font-size var(--text-xs), JetBrains Mono
- Add to src/app/layout.tsx
- Confirm terminal viewport = 100vh - 40px navbar - 28px status bar
```
**TEST:** Status bar renders at bottom. Nothing hidden behind navbar or status bar.
**COMMIT:** `feat: phase 2.2 — status bar layout shell`

---

## Phase 3 — Hero Section

**Goal:** Boot sequence and ASCII hero are visible and animated.
**Relevant docs:** `docs/02-DESIGN-SYSTEM.md`, `docs/03-TERMINAL-ARCH.md`

### Prompt 3.1 — ASCII Name
```
Build src/components/hero/ascii-name.tsx.
- Use a <div> (NOT a <pre>) with white-space: pre to preserve the box-drawing characters.
- Render the multi-line Unicode ASCII art that spells "ARYAN" using box-drawing glyphs (█ ╗ ╔ ═ ║ ╚ ╝).
- Font: var(--font-ascii) — Courier New / Lucida Console system stack
- Color: white, font-weight 700, line-height 1, letter-spacing 0
- Responsive size: clamp(0.7rem, 1.7vw, 1.25rem)
- No animation, no glitch effect, no text-shadow, no color
- aria-label="Aryan" on the element
- overflow: hidden to prevent any phantom scrollbars
```
**TEST:** "ARYAN" renders cleanly in box-drawing chars, no overlap, no scrollbar.
**COMMIT:** `feat: phase 3.1 — ASCII name`

---

### Prompt 3.2 — Welcome Block (static)
```
Build src/components/hero/boot-sequence.tsx.
No props, no animation, no Framer Motion. Three static lines:

1. "Welcome to Aryan's Terminal Portfolio"
   - Font: VT323 (apply via vt323.className from next/font/google directly, NOT through a CSS variable indirection)
   - Color: white, font-size: 2.25rem
2. "Type '?' or 'help' to view a list of available commands."
   - Font: var(--font-mono) (system mono stack)
   - Color: #d1d5db, font-size: 0.95rem, marginTop: 0.75rem
3. "visitor@aryan.me:~$"
   - Font: var(--font-mono)
   - Color: #d1d5db, font-size: 0.95rem, marginTop: 0.5rem

Wrap all three in a div and apply vt323.className so the welcome line inherits VT323.
The whole block has marginTop: 2rem.
```
**TEST:** All three lines render statically on page load with the correct fonts.
**COMMIT:** `feat: phase 3.2 — hero welcome block`

---

### Prompt 3.3 — Hero Component
```
Build src/components/hero/hero.tsx.
- No logo, no circular "A" — strip it, the design is text-only now.
- AsciiName at the top.
- BootSequence directly below.
- Entire hero renders once on page load — no re-renders, no state.
- Padding: var(--terminal-padding), paddingTop: 2.5rem, paddingBottom: 2rem.
- Wire into src/app/page.tsx.
```
**TEST:** Hero shows on page load — ASCII ARYAN in white, then welcome block underneath.
**COMMIT:** `feat: phase 3.3 — hero section assembled`

---

## Phase 4 — Terminal Shell (Input + History + Autocomplete)

**Goal:** Terminal is interactive. User can type, submit, see history.
**Relevant docs:** `docs/03-TERMINAL-ARCH.md`, `docs/04-COMMAND-SPECS.md`

### Prompt 4.1 — Data files + Command registry scaffold
```
Create src/data/projects.ts, experience.ts, skills.ts using exact data from docs/05-CONTENT-MAP.md.
Create src/lib/commands.ts — command registry with all command entries.
Handlers return placeholder text for now: <span>Command output coming in Phase 5</span>
Include all commands from docs/04-COMMAND-SPECS.md with correct names, aliases, descriptions, categories, usage.
```
**TEST:** `tsc --noEmit` passes. All command entries are typed correctly.
**COMMIT:** `feat: phase 4.1 — data files and command registry scaffold`

---

### Prompt 4.2 — Hooks
```
Build these hooks:
- src/lib/use-terminal.ts — history: HistoryEntry[], runCommand(input), clearHistory()
- src/lib/use-command-history.ts — addToHistory, navigateUp, navigateDown, reset
- src/lib/use-autocomplete.ts — suggestions, selectedIndex, selectNext, selectPrev, selectCurrent, reset
- src/lib/use-clock.ts — returns formatted string "May 6th, 2026  15:52:55", updates every second

All specs in docs/03-TERMINAL-ARCH.md.
```
**TEST:** Hooks compile. useClock returns correct format in isolation.
**COMMIT:** `feat: phase 4.2 — terminal state hooks`

---

### Prompt 4.3 — Prompt + Autocomplete components
```
Build src/components/terminal/prompt.tsx:
- Renders: aryan@portfolio:~$
- "aryan" in var(--color-user), "@portfolio:~$" in var(--color-muted)

Build src/components/terminal/autocomplete.tsx:
- Dropdown above input, appears when input has 1+ characters
- Filters command names + aliases that start with current input (max 6)
- Each row: command name (accent) + description (muted)
- Selected item: background var(--color-accent) at 15% opacity
- Framer Motion: opacity 0→1, y: 4→0, 0.15s on appear
- Keyboard: Tab selects top, ↑↓ navigate, Escape dismisses, click selects
- Disappears when input is empty or Escape pressed
```
**TEST:** Prompt renders correctly. Autocomplete appears/disappears, filters correctly.
**COMMIT:** `feat: phase 4.3 — prompt and autocomplete components`

---

### Prompt 4.4 — Terminal Input + History + Container
```
Build src/components/terminal/terminal-input.tsx:
- Prompt component on left, invisible input on right
- Blinking cursor (CSS @keyframes, var(--color-accent))
- 'use client', auto-focus on mount and after each command
- Wired to useTerminal, useCommandHistory, useAutocomplete
- Enter: runCommand, Tab: autocomplete, ↑↓: history/autocomplete, Escape: close autocomplete

Build src/components/terminal/terminal-output.tsx:
- Renders one history entry: prompt line (dimmed) + output component below

Build src/components/terminal/terminal-history.tsx:
- Maps history array to TerminalOutput components

Build src/components/terminal/terminal.tsx:
- 'use client'
- Overflow-y scroll, var(--terminal-padding) padding
- Renders: Hero → TerminalHistory → TerminalInput
- Ref on bottom element, scrollIntoView on every history change

Wire into src/app/page.tsx.
```
**TEST:**
- Type a known command → see placeholder output
- Type unknown command → "command not found: X"
- Submit empty input → nothing happens
- ↑↓ arrows navigate command history
- Tab autocompletes
- Terminal scrolls to bottom after each command
**COMMIT:** `feat: phase 4.4 — interactive terminal shell assembled`

---

## Phase 5 — Core Portfolio Commands

**Goal:** All portfolio content accessible via commands and nav buttons.
**Relevant docs:** `docs/04-COMMAND-SPECS.md`, `docs/05-CONTENT-MAP.md`

### Prompt 5.1 — About + Education output
```
Build src/components/commands/output-about.tsx.
Two stacked cards using exact content from docs/05-CONTENT-MAP.md.
Card 1: ABOUT_ME.exe — bio + tech stack tags.
Card 2: EDUCATION.log — university, GPA, achievements, relevant courses.
Framer Motion: opacity 0→1, y: 10→0, 0.25s on mount.
Register handler in commands.ts.
```
**TEST:** `cd about` renders both cards with correct real content.
**COMMIT:** `feat: phase 5.1 — cd about command`

---

### Prompt 5.2 — Experience output
```
Build src/components/commands/output-experience.tsx.
One card per role from docs/05-CONTENT-MAP.md experience section (2 roles).
Bullet stagger animation: each bullet fades in 30ms after the previous.
Tech tags at bottom of each card.
Register handler in commands.ts.
```
**TEST:** `cd experience` renders 2 cards with correct bullets, no Affinity Insurance.
**COMMIT:** `feat: phase 5.2 — cd experience command`

---

### Prompt 5.3 — Projects output
```
Build src/components/commands/output-projects.tsx.
2-column grid (1 column on mobile). 4 project cards.
macOS window style per card (traffic light dots decorative, aria-hidden).
Order: Code-Help → Xv6 → FORTH → Pathfinding.
GitHub link → https://github.com/aryan-mht for all (repos private).
No live demo links.
Register handler in commands.ts.
```
**TEST:** `cd projects` renders 4 cards in correct order with correct content.
**COMMIT:** `feat: phase 5.3 — cd projects command`

---

### Prompt 5.4 — Skills + Contact output
```
Build src/components/commands/output-skills.tsx.
ASCII directory tree, 7 categories, exact content from docs/05-CONTENT-MAP.md.
Lines stagger in 20ms apart.

Build src/components/commands/output-contact.tsx.
4 links + availability line from docs/05-CONTENT-MAP.md.
All links open new tab.

Register both handlers in commands.ts.
```
**TEST:** `cd skills` renders tree. `cd contact` renders all 4 links correctly.
**COMMIT:** `feat: phase 5.4 — cd skills and cd contact commands`

---

### Prompt 5.5 — Help output + wire navbar
```
Build src/components/commands/output-help.tsx.
Two-column command grid with category headers.
Stagger animation: commands appear 50ms apart.

Wire navbar buttons: each button calls runCommand(commandName) via prop/context.
Pass runCommand from useTerminal down to Navbar via layout or context.

Register resume command: window.open('/Resume.pdf', '_blank').
Register all aliases in commands.ts.
```
**TEST:**
- `help` renders full command grid
- All 8 navbar buttons fire their commands and render correct output
- `resume` opens /Resume.pdf in new tab
- All aliases work (about, projects, experience, skills, contact, ?, ls)
**COMMIT:** `feat: phase 5.5 — help output and wired navbar buttons`

---

## Phase 6 — Fun Commands

**Goal:** Terminal feels alive and surprising.
**Relevant docs:** `docs/04-COMMAND-SPECS.md`

### Prompt 6.1 — hash + ip + weather
```
Build src/components/commands/output-hash.tsx.
Uses browser SubtleCrypto API for SHA-256. Use a simple hex encoding function for MD5 (implement manually or use SubtleCrypto — MD5 is not natively supported, so implement a pure-JS MD5 or use a tiny inline implementation). No external libraries.

Build /api/ip/route.ts — fetches ipapi.co/json, returns { ip, city, region, country, latitude, longitude }.
Build /api/weather/route.ts — takes lat/lon query params, fetches Open-Meteo, returns { temp, condition, wind, humidity, city }.
Build src/components/commands/output-weather.tsx — shows loading state, then weather output.

Register all three handlers in commands.ts.
```
**TEST:**
- `hash hello` shows SHA-256 and MD5
- `ip` shows IP and city
- `weather` shows visitor's weather
**COMMIT:** `feat: phase 6.1 — hash, ip, and weather commands`

---

### Prompt 6.2 — neofetch + rps + ascii
```
Build src/components/commands/output-neofetch.tsx.
Exact content from docs/05-CONTENT-MAP.md neofetch section.

Build src/components/commands/output-rps.tsx.
Computer choice: Math.random(). Session score tracking in useState.
Invalid move: show usage string.

Build src/components/commands/output-ascii.tsx.
Built-in A-Z character map for block letters (5 rows tall).
Cap at 8 characters, render in var(--color-accent).

Register all three in commands.ts.
```
**TEST:** All three commands render correct output. RPS score tracks correctly across multiple plays.
**COMMIT:** `feat: phase 6.2 — neofetch, rps, and ascii commands`

---

### Prompt 6.3 — matrix + theme + uptime + whoami + sudo + history
```
matrix: full-screen canvas overlay, falling green characters, auto-dismiss 10s or any keypress, refocus input after.
theme: switches --color-accent CSS variable on document root. green=#00ff9f, amber=#f5a623.
uptime: time since page load (store load timestamp in useTerminal init).
whoami: one-liner bio from docs/05-CONTENT-MAP.md.
sudo hire aryan: exact output from docs/04-COMMAND-SPECS.md, mailto link on email.
history: numbered list of commands from session.
man: shows usage for named command, "No manual entry for: X" if not found.

Register all in commands.ts.
```
**TEST:** All commands work. Matrix auto-dismisses. Theme persists during session but resets on reload.
**COMMIT:** `feat: phase 6.3 — matrix, theme, uptime, whoami, sudo, history, man commands`

---

## Phase 7 — Live Status Bar Data

**Goal:** Weather and clock are real and live.
**Relevant docs:** `docs/03-TERMINAL-ARCH.md`

### Prompt 7.1 — Live clock
```
Wire src/lib/use-clock.ts into status-bar.tsx.
Format: "May 6th, 2026  15:52:55" (ordinal suffixes: st/nd/rd/th).
Updates every second via setInterval. Cleans up on unmount.
```
**TEST:** Status bar clock ticks every second with correct format.
**COMMIT:** `feat: phase 7.1 — live clock in status bar`

---

### Prompt 7.2 — Live weather (visitor location)
```
Wire /api/ip + /api/weather into status-bar.tsx.
On mount: fetch /api/ip → get latitude/longitude → fetch /api/weather?lat=X&lon=Y.
Refresh weather every 10 minutes (setInterval 600_000).
Loading state: show "— °C". Error state: show "—" only.
Display: "[city] [temp]°C" in var(--color-muted).
```
**TEST:** Status bar shows real city + temperature. Loading state shows on first load.
**COMMIT:** `feat: phase 7.2 — live weather in status bar (visitor location)`

---

## Phase 8 — Polish + Animations

**Goal:** Every interaction feels intentional.
**Relevant docs:** `docs/02-DESIGN-SYSTEM.md`

### Prompt 8.1 — Animation audit
```
Audit all command output components:
- Every card has Framer Motion fade-in (opacity 0→1, y: 10→0, 0.25s)
- Help grid has stagger (50ms between commands)
- Skills tree has stagger (20ms between lines)
- Experience bullets have stagger (30ms between each)
- All animations check prefers-reduced-motion — skip if true

Audit autocomplete dropdown — confirm Framer Motion appears/disappears correctly.
```
**TEST:** All animations play. Reduced motion: no animations at all.
**COMMIT:** `feat: phase 8.1 — animation audit and stagger polish`

---

### Prompt 8.2 — Mobile audit
```
At 375px viewport:
- Navbar buttons scroll horizontally, no overflow
- Status bar readable (no text truncation)
- Terminal input accessible (keyboard doesn't cover content — add padding-bottom if needed)
- Project cards: 1 column
- No horizontal scroll anywhere

At 768px:
- Project cards: 2 column
- All content readable

Fix any issues found.
```
**TEST:** Open DevTools → 375px → navigate all commands → no layout breaks, no horizontal scroll.
**COMMIT:** `feat: phase 8.2 — mobile layout audit and fixes`

---

## Phase 9 — SEO + Performance + Accessibility

**Goal:** Lighthouse 90+ across all metrics.
**Relevant docs:** `docs/07-QA-CHECKLIST.md`

### Prompt 9.1 — Metadata
```
Add full metadata to src/app/layout.tsx:
- title: "Aryan Mehta — Software Engineer"
- description: 160-char bio (from docs/05-CONTENT-MAP.md about bio, truncated)
- og:title, og:description, og:image (use placeholder 1200×630 image for now)
- Twitter card meta tags
- canonical link: use Vercel URL until custom domain

Add public/robots.txt and public/sitemap.xml.
```
**TEST:** View source → confirm all meta tags present. Lighthouse SEO audit shows >90.
**COMMIT:** `feat: phase 9.1 — SEO metadata, robots.txt, sitemap`

---

### Prompt 9.2 — Accessibility audit
```
Audit:
- All interactive elements have aria-label
- All decorative elements have aria-hidden="true" (traffic lights, pulse dots, etc.)
- Tab navigation works through navbar buttons, terminal input, all contact links
- Focus rings visible on all focusable elements (don't remove outline: none without replacement)
- Color contrast: var(--color-accent) on var(--color-bg) passes WCAG AA
- All external links have rel="noopener noreferrer"

Run axe DevTools or similar. Fix any violations.
```
**TEST:** Lighthouse Accessibility > 95. No axe violations.
**COMMIT:** `feat: phase 9.2 — accessibility audit and fixes`

---

## Phase 10 — Final QA

**Goal:** Ship it.

Run through the complete checklist in `docs/07-QA-CHECKLIST.md`. Every item must be checked. Open one PR with all remaining fixes. Final Lighthouse run: Performance >90, Accessibility >95, SEO >95.

**COMMIT:** `feat: phase 10 — final QA, all checklist items confirmed`
