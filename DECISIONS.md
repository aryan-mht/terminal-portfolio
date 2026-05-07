# DECISIONS.md — Architectural Decisions Log

## Phase 3 — Hero design pivot

**Date:** 2026-05-06
**Context:** Original spec called for Press Start 2P pixel font for "ARYAN", a circular "A" logo, animated CSS glitch effect, and a 7-line Framer Motion boot sequence (Initializing/Loading/Mounting/etc.).
**Decision:** Replaced with a static text-only hero — Unicode ASCII-art "ARYAN" in Courier New, plus a 3-line static welcome block. No logo, no glitch, no boot stagger.
**Why:**
- Press Start 2P glyphs were too narrow/blocky to read at hero scale and clashed with the terminal aesthetic.
- Animated glitch shadows (chromatic aberration) made the name unreadable on dark background.
- The 7-line boot sequence felt like noise — the user prefers landing on the welcome message immediately.
- A `<pre>` tag was producing a phantom inline-block scrollbar; switched to a `<div>` with `white-space: pre`.

## Phase 3 — Font system

**Date:** 2026-05-06
**Context:** Original spec used JetBrains Mono everywhere + Press Start 2P for the hero name.
**Decision:**
- Dropped JetBrains Mono entirely.
- `--font-mono` is now a cross-platform system mono stack: `ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'Liberation Mono', Monaco, 'DejaVu Sans Mono', monospace`. `ui-monospace` picks the OS-native mono on modern browsers; the rest cover Windows/Linux/older macOS in priority order; `monospace` is the universal fallback.
- Added `--font-retro` (VT323 from Google Fonts) for the hero welcome line — closest CRT-terminal feel available without self-hosting bitmap fonts.
- Added `--font-ascii` (Courier New / Lucida Console) specifically for the ASCII-art name. Courier's box-drawing glyphs (`╗ ╔ ═ ║`) tile cleanly at `line-height: 1`; JetBrains Mono's did not.
- Press Start 2P is still loaded but currently unused — kept available for future pixel accents.
**Why:** The user requested a Menlo-like terminal font. Menlo is a system font, so no network cost. VT323 covers the retro accent need without requiring a bitmap font CDN (Perfect DOS VGA 437 / PxPlus IBM VGA8 aren't on Google Fonts).
**Implementation note:** When using a font via next/font, prefer applying `font.className` directly to the element (as done in `boot-sequence.tsx` for VT323) — wrapping it in a CSS variable can fail to resolve in nested children if the variable scope is wrong.
