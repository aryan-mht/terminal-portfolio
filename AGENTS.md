# AGENTS.md — Agent Session Setup & Caveats

## Session Setup Prompt

When starting a new Claude Code session for this project, paste this at the start:

```
I'm building Aryan Mehta's terminal portfolio. The docs are modular:
- CLAUDE.md: project overview, conventions, what NOT to do
- docs/01-TECH-STACK.md: stack, directory layout, CI/CD
- docs/02-DESIGN-SYSTEM.md: colors, typography, animations
- docs/03-TERMINAL-ARCH.md: terminal pattern, hooks, command registry
- docs/04-COMMAND-SPECS.md: every command's input/output/handler spec
- docs/05-CONTENT-MAP.md: ALL real content — never invent content
- docs/06-BUILD-PHASES.md: build phases with one-at-a-time prompts
- docs/07-QA-CHECKLIST.md: final ship checklist

I'm working on Phase [N]. Please read CLAUDE.md and docs/0N-*.md before writing any code.
```

---

## Critical Rules For Agents

**Content:** Always read `docs/05-CONTENT-MAP.md` before writing any component that displays text, links, or data. Never invent names, URLs, bullets, or descriptions. Never write Lorem Ipsum or placeholder copy.

**Build check:** Run `npm run build && npm run lint && npm run type-check` after every prompt step. Do not proceed to the next step if any of these fail.

**Commits:** One logical change per commit. Follow the commit convention in CLAUDE.md. Never commit `.env`, `.env.local`, or `node_modules`.

**TypeScript:** Strict mode is enforced. No `any`. If you're tempted to use `any`, model the type properly instead.

**Colors:** Never hardcode hex values. CSS variables only (`var(--color-accent)`, etc.). All variables are defined in `src/app/globals.css`.

**Animations:** Framer Motion for all component lifecycle animations. CSS transitions ONLY for simple hover color/border changes. Never mix both on the same CSS property.

---

## Next.js 14 App Router Caveats

Things agents commonly get wrong:

1. **Server vs Client components**: The terminal is interactive — `terminal.tsx`, `terminal-input.tsx`, `navbar.tsx`, `status-bar.tsx` must all be `'use client'`. Static layout wrappers (`layout.tsx`) stay as server components.

2. **API routes**: Use `src/app/api/[route]/route.ts` format. Export named `GET`/`POST` functions, not a default export. Use `NextResponse.json()` for responses.

3. **Font loading**: Fonts load via `next/font/google` in `layout.tsx` and are applied via CSS variables. Never import Google Fonts directly in `<head>` or via CSS `@import`.

4. **`'use client'` directive**: Must be the very first line of the file, before any imports.

5. **`next/image`**: Required for all images. Always provide explicit `width` and `height` props or use `fill` with a positioned parent.

6. **Metadata**: Export `metadata` object from `layout.tsx` and `page.tsx`. Do not use `<head>` tags directly.

---

## TypeScript Strict Mode Reminders

- `noImplicitAny: true` — all parameters and variables must be typed
- `strictNullChecks: true` — always handle `null` and `undefined` explicitly
- Prefer `interface` over `type` for props
- Use `React.ReactNode` for children and component return types where needed
- Use `React.FC` only when you need explicit `children` typing — otherwise just type props directly

---

## Common Mistakes To Avoid

- Importing from `react` instead of using the Next.js-compatible patterns
- Using `window` or `document` without checking for browser environment first (use `typeof window !== 'undefined'` guard or `useEffect`)
- Forgetting `prefers-reduced-motion` check on all Framer Motion animations
- Using `<a>` tags instead of `<Link>` for internal navigation (though there's no internal navigation in this project — everything is on `/`)
- Adding new npm packages without checking if a browser-native API can do the job (e.g. `SubtleCrypto` for hashing, no library needed)
- Writing command handlers that return `string` — handlers must return `React.ReactNode`
