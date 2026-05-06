# 03-TERMINAL-ARCH.md — Terminal Architecture

## Core Concept

The entire site is a single-page terminal emulator. The user types a command (or clicks a nav button), a handler returns a React component, and that component is appended to a history array and rendered inline — exactly like a real terminal session. The input prompt stays at the bottom, always focused, always ready.

There is no routing. No separate pages. Everything on `/`.

---

## Command Interface

Every command is a registered object in `src/lib/commands.ts`. This file is the single source of truth for the command registry.

```typescript
interface Command {
  name: string
  aliases?: string[]
  description: string
  usage: string
  category: 'navigation' | 'fun' | 'utility'
  handler: (args: string[]) => React.ReactNode
}
```

**Rules:**
- `handler` must always return `React.ReactNode` — never a string
- `args` is the array of words after the command name (e.g. `rps rock` → `args = ['rock']`)
- Compound commands like `cd about` are registered with the full name `'cd about'` (or `about` as an alias)
- Unknown command → show `command not found: X` (handled in `runCommand`, not in individual handlers)

---

## Data Flow

```
User types or clicks nav button
        ↓
useTerminal.runCommand(input: string)
        ↓
Parse input: trim, split on space, extract command name + args
        ↓
Look up in command registry (try full input, then just first word, then aliases)
        ↓
If found: call handler(args) → returns React.ReactNode
If not found: return error component ("command not found: X")
        ↓
Push { input, output: ReactNode } to history array
        ↓
Terminal re-renders — history.map(entry => <TerminalOutput />)
        ↓
Auto-scroll to bottom (ref on container, scrollIntoView on history change)
        ↓
Auto-focus input (ref on input, .focus() after each command)
        ↓
Input cleared, ready for next command
```

---

## useTerminal Hook (`src/lib/use-terminal.ts`)

```typescript
interface HistoryEntry {
  id: string                  // unique key for React rendering
  input: string               // the raw input the user typed
  output: React.ReactNode     // the component returned by the handler
}

interface UseTerminalReturn {
  history: HistoryEntry[]
  runCommand: (input: string) => void
  clearHistory: () => void
}
```

- `runCommand('')` (empty input) does nothing — no history entry added
- `runCommand('clear')` calls `clearHistory()` which sets `history = []`
- `runCommand('refresh')` calls `window.location.reload()`
- Every `runCommand` call auto-scrolls to bottom and re-focuses input

---

## useCommandHistory Hook (`src/lib/use-command-history.ts`)

Tracks submitted commands. Arrow key navigation through history.

```typescript
interface UseCommandHistoryReturn {
  addToHistory: (cmd: string) => void   // call after successful submission
  navigateUp: () => string | null       // ↑ key — returns previous command
  navigateDown: () => string | null     // ↓ key — returns next command (or empty)
  reset: () => void                     // call after input is cleared
}
```

- History is stored in a `useRef` array (doesn't trigger re-renders)
- Pointer starts at the end (most recent). ↑ moves back, ↓ moves forward.
- Navigating past the most recent returns empty string (clears input)

---

## useAutocomplete Hook (`src/lib/use-autocomplete.ts`)

```typescript
interface AutocompleteSuggestion {
  name: string
  description: string
}

interface UseAutocompleteReturn {
  suggestions: AutocompleteSuggestion[]
  selectedIndex: number
  selectNext: () => void          // ↓ key in autocomplete
  selectPrev: () => void          // ↑ key in autocomplete
  selectCurrent: () => string     // Tab or Enter — returns selected command name
  reset: () => void               // called when input is empty or Escape pressed
}
```

- Filters all registered command names + aliases that **start with** the current input
- Returns max 6 suggestions
- Shows command name + description per suggestion
- Empty input → `suggestions = []` (dropdown hidden)

---

## useClock Hook (`src/lib/use-clock.ts`)

```typescript
// Returns formatted date string, updates every second
// Format: "May 6th, 2026  15:52:55"
// Ordinal suffixes: st, nd, rd, th
function useClock(): string
```

Uses `setInterval` with 1000ms. Cleans up on unmount.

---

## Component Composition

```
src/app/page.tsx
  └── <Terminal />                    (terminal.tsx — 'use client')
        ├── <Hero />                  (hero.tsx — renders once on load)
        │     ├── <AsciiName />       (ascii-name.tsx)
        │     └── <BootSequence />    (boot-sequence.tsx — auto-runs help on complete)
        ├── <TerminalHistory />       (terminal-history.tsx)
        │     └── history.map → <TerminalOutput /> (terminal-output.tsx)
        └── <TerminalInput />         (terminal-input.tsx)
              ├── <Prompt />          (prompt.tsx — the aryan@portfolio:~$ line)
              └── <Autocomplete />    (autocomplete.tsx — dropdown above input)
```

**Hero renders once.** It is not inside the history array. It always shows at the top.

---

## Terminal Input Behavior

- `'use client'` — browser APIs required
- Auto-focuses on page load via `useEffect`
- After every `runCommand` call: clear input, reset autocomplete, reset history pointer, focus input
- **Enter:** submit command via `runCommand`
- **Tab:** autocomplete — select top suggestion if suggestions exist
- **↑ Arrow:** navigate command history backward (if autocomplete closed)
- **↓ Arrow:** navigate command history forward (if autocomplete closed)
- **Escape:** close autocomplete
- **Typing:** update autocomplete filter in real time

---

## Auto-Scroll

A `ref` is attached to the bottom of the terminal history container. After every `runCommand` call:
```typescript
bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
```

---

## Weather + Location (Visitor-Based)

Status bar fetches visitor location on mount:
1. `GET /api/ip` → `{ city, latitude, longitude }`
2. `GET /api/weather?lat=XX&lon=YY` → `{ temp, condition, city }`
3. Status bar displays: `[city] [temp]°C`

Weather refreshes every 10 minutes (`setInterval(fetch, 600_000)`).

The `weather` terminal command triggers the same fetch and displays full output including wind + humidity.

---

## Boot Sequence + Auto-Run Help

`BootSequence` component:
1. Lines appear one by one (Framer Motion stagger, 400ms between lines)
2. After last line renders: 500ms pause
3. Calls `runCommand('help')` — pushes help output into terminal history
4. First prompt appears and focuses

Lines (with delays):
```
Initializing aryan@portfolio...         [0ms]
Loading modules..............  done     [400ms]
Establishing connection......  done     [800ms]
Mounting filesystem..........  done     [1200ms]
                                        [1600ms — blank]
Welcome to Aryan's Terminal Portfolio   [1800ms]
Type 'help' or '?' to view available commands.  [2000ms]
→ auto-run help                         [2500ms]
```
