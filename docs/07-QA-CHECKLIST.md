# 07-QA-CHECKLIST.md — Final QA Checklist

Run through this entire checklist before marking Phase 10 complete. Every item must be checked. If an item fails, fix it before proceeding.

---

## Terminal Behavior

- [ ] All commands return correct output (run every command in docs/04-COMMAND-SPECS.md)
- [ ] Unknown commands show `command not found: X`
- [ ] `clear` wipes terminal history (hero remains)
- [ ] `refresh` reloads the page
- [ ] ↑ arrow navigates back through command history
- [ ] ↓ arrow navigates forward through command history
- [ ] Tab autocompletes with top suggestion
- [ ] Autocomplete filters correctly as user types (starts-with matching)
- [ ] Autocomplete disappears when input is empty
- [ ] Autocomplete disappears on Escape
- [ ] Auto-focus works after every command submission
- [ ] Auto-focus on page load
- [ ] Terminal scrolls to bottom after every command
- [ ] Empty input submission does nothing (no blank history entry)
- [ ] Boot sequence plays on page load
- [ ] `help` auto-runs after boot sequence completes

---

## Command Output Correctness

- [ ] `help` — shows all commands in two-column grid with categories
- [ ] `cd about` / `about` — bio from resume, education with courses, correct GPA
- [ ] `cd experience` / `experience` — 2 roles only (Canpotex + ISEA Lab), no Affinity Insurance
- [ ] `cd projects` / `projects` — Code-Help first, all 4 projects, correct descriptions
- [ ] `cd skills` / `skills` — 7 categories, AI Dev Tools and Data & Monitoring included
- [ ] `cd contact` / `contact` — all 4 links correct and clickable
- [ ] `resume` — opens /Resume.pdf in new tab
- [ ] `hash hello` — shows SHA-256 and MD5
- [ ] `hash` (no args) — shows usage
- [ ] `ip` — shows real IP and city
- [ ] `weather` — shows visitor's city and temperature
- [ ] `rps rock` / `paper` / `scissors` — correct win/lose/tie logic
- [ ] `rps` (no args) — shows usage
- [ ] `ascii ARYAN` — renders block letters in accent color
- [ ] `neofetch` — matches exact output in docs/05-CONTENT-MAP.md
- [ ] `matrix` — triggers full-screen canvas, auto-dismisses in 10s
- [ ] `matrix` — dismisses on any keypress before 10s
- [ ] `theme green` / `theme amber` — switches accent color for session
- [ ] `uptime` — shows correct elapsed time since page load
- [ ] `whoami` — correct one-liner bio
- [ ] `sudo hire aryan` — easter egg output with mailto link
- [ ] `history` — shows all commands run this session
- [ ] `man cd about` — shows usage for the command
- [ ] `man doesnotexist` — shows "No manual entry for: doesnotexist"
- [ ] All aliases work: `about`, `projects`, `experience`, `skills`, `contact`, `?`, `ls`

---

## Content Accuracy (verify against docs/05-CONTENT-MAP.md)

- [ ] Aryan's name spelled correctly everywhere
- [ ] Email: aryanmht9@gmail.com
- [ ] GitHub link: https://github.com/aryan-mht — opens correct profile
- [ ] LinkedIn: https://www.linkedin.com/in/aryan-mehta09 — opens correctly
- [ ] Resume PDF at /Resume.pdf — opens and displays correctly
- [ ] Canpotex period: May 2024 – May 2026 (not "Present")
- [ ] ISEA Lab: July 2023 – August 2023
- [ ] Code-Help is first in project list
- [ ] Pathfinding Visualizer mentions DFS, BFS, Dijkstra's, A*
- [ ] Skills include AZ-900 certified and pursuing AWS CCP
- [ ] AI Dev Tools category present in skills
- [ ] No Affinity Insurance in experience
- [ ] No Lorem Ipsum or placeholder content visible anywhere
- [ ] All external links open in `target="_blank"` with `rel="noopener noreferrer"`

---

## Layout & Styling

- [ ] Navbar fixed at top, correct height (40px), no content hidden behind it
- [ ] Status bar fixed at bottom, correct height (28px), no content hidden behind it
- [ ] Terminal content area = 100vh - 40px - 28px, no overflow issues
- [ ] No horizontal scroll at any viewport width
- [ ] macOS traffic lights visible on left side of navbar
- [ ] Navbar command buttons visible and styled correctly
- [ ] Status bar: city + temp on left, center text, clock on right
- [ ] Clock ticking in real time (check by watching for 5 seconds)
- [ ] Weather updates on load (not static placeholder)
- [ ] All text uses JetBrains Mono (check in DevTools → Computed)
- [ ] "ARYAN" hero name uses Press Start 2P only
- [ ] No hex color values hardcoded in JSX (CSS variables only)

---

## Desktop at 1440px

- [ ] Projects grid: 2 columns
- [ ] All content readable and well-spaced
- [ ] Navbar buttons not wrapping to second line

---

## Mobile at 375px

- [ ] Navbar: traffic lights visible, command buttons scroll horizontally
- [ ] Status bar: readable (no text clipping)
- [ ] Terminal input accessible and usable
- [ ] Keyboard opening on mobile doesn't cause layout breaks (check on real device or Chrome DevTools mobile emulation)
- [ ] Projects: 1 column
- [ ] Contact links: tappable, large enough hit targets
- [ ] No horizontal scroll

---

## Tablet at 768px

- [ ] All content readable
- [ ] Projects: 2 columns
- [ ] No layout breaks

---

## Animations

- [ ] Boot sequence lines appear one by one (not all at once)
- [ ] Command output cards fade in on render
- [ ] Help command: commands stagger in
- [ ] Skills tree: lines stagger in
- [ ] Experience bullets: stagger in sequentially
- [ ] Autocomplete dropdown: fade-in on appear
- [ ] Hero name glitch animation plays on load
- [ ] Cursor blinks in input area

### Reduced Motion

- [ ] With `prefers-reduced-motion: reduce` in OS settings (or DevTools: Rendering → Emulate prefers-reduced-motion):
  - [ ] Boot sequence appears instantly (no animation)
  - [ ] Command cards appear instantly (no animation)
  - [ ] No stagger animations
  - [ ] No hero glitch animation

---

## Performance (Lighthouse — DevTools → Lighthouse)

Run Lighthouse in incognito mode on the production Vercel URL.

- [ ] Performance score: **≥ 90**
- [ ] Accessibility score: **≥ 95**
- [ ] Best Practices score: **≥ 90**
- [ ] SEO score: **≥ 95**
- [ ] No console errors in production build
- [ ] No console warnings in production build

---

## Accessibility

- [ ] All navbar buttons have `aria-label`
- [ ] Terminal input has `aria-label="Terminal input"`
- [ ] All decorative elements (traffic lights, pulse dots) have `aria-hidden="true"`
- [ ] Tab key navigates through navbar buttons, terminal input, and all contact links
- [ ] Focus rings visible on all focusable elements
- [ ] Color contrast: accent green (#00ff9f) on dark background (#0a0a0a) passes WCAG AA

---

## SEO

- [ ] Page title: "Aryan Mehta — Software Engineer"
- [ ] Meta description: present and under 160 characters
- [ ] og:title and og:description present
- [ ] og:image present (even placeholder)
- [ ] Twitter card meta tags present
- [ ] robots.txt in /public — accessible at /robots.txt
- [ ] sitemap.xml in /public — accessible at /sitemap.xml

---

## CI/CD

- [ ] GitHub Actions CI passes on a test PR (lint + typecheck + build all green)
- [ ] Vercel preview deployment generates on PR
- [ ] Merging to main triggers Vercel production deployment
- [ ] No TypeScript errors (`tsc --noEmit` exits 0)
- [ ] No ESLint warnings (`npm run lint` exits 0)

---

## Final Sign-Off

All boxes checked? Ship it.
