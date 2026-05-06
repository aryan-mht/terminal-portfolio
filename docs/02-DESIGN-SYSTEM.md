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
  --font-mono: 'JetBrains Mono', monospace;   /* used everywhere */
  --font-pixel: 'Press Start 2P', monospace;  /* hero "ARYAN" name only */

  --text-xs: 0.7rem;      /* status bar text, muted labels */
  --text-sm: 0.8rem;      /* terminal body text */
  --text-base: 0.875rem;  /* default terminal text */
  --text-lg: 1rem;        /* section headers in cards */
}
```

Fonts loaded via `next/font/google` in `layout.tsx`. Applied as CSS variables. Never import via `@import` or `<link>` in `<head>`.

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

### Boot Sequence (per line)
```js
initial: { opacity: 0, x: -10 }
animate: { opacity: 1, x: 0 }
transition: { duration: 0.3, ease: 'easeOut' }
// Stagger: 400ms delay between each line
```

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

### Hero Name Glitch
- CSS-only animation, not Framer Motion
- Subtle: `text-shadow` shifts by 2–3px on X axis, slight opacity flicker
- Duration: 3s, runs once on load then idles at 10% probability per 5s
- Color: `var(--color-text)` with `var(--color-accent)` text-shadow

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
