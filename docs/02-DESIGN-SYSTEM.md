# 02-DESIGN-SYSTEM.md — Design System

## Color Tokens

Defined in `src/app/globals.css`. **Never hardcode hex values — always use these variables.**

```css
:root {
  --color-bg: #0a0a0a;             /* page background */
  --color-surface: #111111;        /* card and navbar background */
  --color-border: #1f1f1f;         /* borders everywhere */
  --color-accent: #00ff9f;         /* terminal green — primary accent */
  --color-accent-dim: #00cc7a;     /* dimmed green for hover states */
  --color-amber: #f5a623;          /* used sparingly — warnings, theme alt */
  --color-text: #e2e8f0;           /* primary text */
  --color-muted: #6b7280;          /* secondary text, comments, tree lines */
  --color-prompt: #00ff9f;         /* aryan@portfolio prompt color */
  --color-user: #60a5fa;           /* username in prompt */
  --color-error: #f87171;          /* error output */
  --color-success: #4ade80;        /* success output */
}
```

---

## Typography

```css
:root {
  --font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro',
               Menlo, Consolas, 'Liberation Mono', Monaco,
               'DejaVu Sans Mono', monospace;                        /* terminal default */
  --font-retro: var(--font-vt323), 'Courier New', monospace;        /* retro CRT accent */
  --font-ascii: 'Courier New', 'Lucida Console', monospace;         /* box-drawing ASCII art */
  --font-pixel: var(--font-press-start-2p), monospace;              /* reserved, not in active use */

  --text-xs: 0.7rem;      /* status bar text, muted labels */
  --text-sm: 0.8rem;      /* terminal body text */
  --text-base: 0.875rem;  /* default terminal text */
  --text-lg: 1rem;        /* section headers in cards */
}
```

**Font usage:**
- `--font-mono` (cross-platform system mono stack) — terminal input, output cards, navbar/status bar, command output. Picks the best native mono available: `ui-monospace` on modern OSes, then Cascadia/Source Code Pro/Menlo/Consolas/Liberation/Monaco/DejaVu in that order, with `monospace` as the final fallback. The default for everything except hero accents.
- `--font-retro` (VT323) — only the hero "Welcome to Aryan's Terminal Portfolio" line. CRT-style retro headline.
- `--font-ascii` (Courier New) — only the ASCII-art name in the hero. Chosen because its box-drawing glyphs (`╗ ╔ ═ ║`) tile cleanly at `line-height: 1`.
- `--font-pixel` (Press Start 2P) — loaded but currently unused; reserved for future pixel-art elements.

VT323 and Press Start 2P are loaded via `next/font/google` in `layout.tsx` and exposed as CSS variables. The system mono stack and Courier New are not loaded — they're picked from whatever the user's OS already has. Never use `@import` or `<link>` in `<head>`.

---

## Layout Tokens

```css
:root {
  --terminal-padding: 1.5rem;
  --section-card-bg: #111111;
  --section-card-border: #1f1f1f;
  --section-card-radius: 0.5rem;
  --navbar-height: 40px;
  --status-bar-height: 28px;
}
```

Terminal viewport: `100vh - var(--navbar-height) - var(--status-bar-height)`

---

## Component Specs

### Navbar
- Fixed top, full width, `var(--navbar-height)` = 40px
- Background: `var(--color-surface)`, 1px bottom border `var(--color-border)`
- **Left:** Three macOS traffic light dots — CSS only, no images
  - Red: `#ff5f57`, Yellow: `#ffbd2e`, Green: `#28c840`
  - Size: 12px circles with 6px gap
- **Right:** Command buttons — `help`, `about`, `projects`, `skills`, `experience`, `contact`, `clear`, `refresh`
  - Font: `var(--font-mono)`, transparent background, 1px border `var(--color-accent)`, text `var(--color-accent)`
  - Hover: background fills `var(--color-accent)` at 10% opacity, border brightens
  - CSS transition on hover only (color + background), 0.1s ease
- Clicking a button fires that command exactly as if the user typed and submitted it
- Mobile: traffic lights stay visible, buttons scroll horizontally, no wrapping

### Status Bar
- Fixed bottom, full width, `var(--status-bar-height)` = 28px
- Background: `var(--color-surface)`, 1px top border `var(--color-border)`
- **Left:** Visitor's city + temperature (e.g. `Toronto 12°C`) — from `/api/ip` + `/api/weather`
- **Center:** `aryan.dev` (or Vercel URL until custom domain)
- **Right:** Live clock — format: `May 6th, 2026  15:52:55`, updates every second
- All text: `var(--color-muted)`, font-size `var(--text-xs)`
- Loading state for weather: show `—°C` while fetching
- Error state: show city only if weather fetch fails

### Command Output Cards
All section outputs (about, experience, projects, skills) use this card style:

```
┌──────────────────────────────────────────────┐
│ CARD_TITLE.exe                             ● │
│                                              │
│  content here                                │
│                                              │
└──────────────────────────────────────────────┘
```

- Background: `var(--color-surface)`
- Border: 1px solid `var(--color-border)`
- Border-radius: `var(--section-card-radius)` = 0.5rem
- Title: `var(--color-accent)`, `var(--font-mono)`
- Pulsing dot top-right: `var(--color-accent)`, CSS `@keyframes` pulse (opacity 1→0.4→1, 2s infinite)
- Padding: 1rem inside card

### Prompt Line
```
aryan@portfolio:~$
```
- `aryan` — `var(--color-user)` (blue)
- `@portfolio:~$` — `var(--color-muted)`
- Cursor — `var(--color-accent)`, blinking via CSS `@keyframes`

---

## Animation Specs

**Tool selection rule:** Framer Motion for all component lifecycle animations (mount/unmount, layout shifts). CSS transitions ONLY for simple hover color/border changes. Never use both on the same CSS property.

**Accessibility rule:** Every Framer Motion animation must check `prefers-reduced-motion`. If true, skip the animation (use `initial={false}` or set duration to 0).

### Hero Welcome Block (static)
The hero shows three static lines below the ASCII name. No animation, no boot-sequence stagger. Layout:
- "Welcome to Aryan's Terminal Portfolio" — `--font-retro` (VT323), white, ~2.25rem
- "Type '?' or 'help' to view a list of available commands." — `--font-mono` (system mono stack), `#d1d5db`, 0.95rem
- "visitor@aryan.me:~$" — `--font-mono` (system mono stack), `#d1d5db`, 0.95rem

### Command Output Cards (on mount)
```js
initial: { opacity: 0, y: 10 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.25, ease: 'easeOut' }
```

### Autocomplete Dropdown (on appear)
```js
initial: { opacity: 0, y: 4 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.15, ease: 'easeOut' }
```

### Hero ASCII Name (static)
- Plain `<div>` with `white-space: pre`, no `<pre>` tag (avoids browser scrollbar)
- Font: `--font-ascii` (Courier New stack)
- White (`#ffffff`), `font-weight: 700`, `line-height: 1`, `letter-spacing: 0`
- Responsive size: `clamp(0.7rem, 1.7vw, 1.25rem)`
- No animation, no glitch shadow, no color
- The ASCII art is a literal block of Unicode box-drawing characters spelling "ARYAN"

### Cursor Blink
```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
animation: blink 1s step-end infinite;
color: var(--color-accent);
```

### Navbar Button Hover
```css
transition: background-color 0.1s ease, border-color 0.1s ease;
```
(CSS transition only — no Framer Motion here)

---

## Spacing

- All internal spacing uses Tailwind spacing scale
- Consistent `gap-4` between terminal output blocks
- Terminal has `var(--terminal-padding)` = 1.5rem on all sides
- Viewport height for terminal content area: `calc(100vh - var(--navbar-height) - var(--status-bar-height))`
