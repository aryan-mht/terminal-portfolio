# 04-COMMAND-SPECS.md — Command Specifications

Every command registered in `src/lib/commands.ts`. Each entry shows: name, aliases, category, usage, and exact output format.

---

## Navigation Commands

### `help` / `?`
- **Aliases:** `?`, `ls`
- **Category:** navigation
- **Usage:** `help`
- **Output:** Grid of all available commands with short descriptions.
  ```
  💡 Terminal Help Menu:
  
  NAVIGATION
  help / ?          Show this help menu
  cd about          About me & education
  cd experience     Work experience
  cd projects       Projects
  cd skills         Skills tree
  cd contact        Contact & links
  resume            Open resume PDF
  clear             Clear terminal
  refresh           Reload page
  
  FUN & UTILITY
  whoami            Who am I?
  neofetch          System info card
  hash [text]       SHA256 + MD5 of text
  ip                Your IP + location
  weather           Current weather
  rps [move]        Rock paper scissors
  ascii [text]      ASCII block art
  matrix            Matrix rain (10s)
  theme [color]     Switch accent color
  uptime            Time since page load
  history           Commands this session
  sudo hire aryan   Try it and see
  
  Tip: Press Tab to autocomplete. Use ↑↓ to navigate history.
  ```
  - Commands in two-column layout, category headers in `var(--color-accent)`
  - Stagger animation: commands appear one by one (50ms between each)

---

### `cd about` / `about`
- **Aliases:** `about`
- **Category:** navigation
- **Usage:** `cd about`
- **Output:** Two stacked cards

**Card 1 — ABOUT_ME.exe**
Content: bio from `docs/05-CONTENT-MAP.md` → About section
Tech stack tags at bottom (accent-colored monospace badges)

**Card 2 — EDUCATION.log**
```
University of Saskatchewan                          2021 – 2026
B.Sc. Honours Software Engineering | Minor: Mathematics
GPA: 3.8/4.0

Achievements
› Dean's Honour List (2021, 2022, 2023)
› Arts and Science Undergraduate Award (2023)

Relevant Courses
Operating Systems · Computer Architecture · Data Structures & Algorithms
Object-Oriented Systems · Functional Programming · Advanced Software Engineering
Mathematical Logic & Computing
```

---

### `cd experience` / `experience`
- **Aliases:** `experience`
- **Category:** navigation
- **Usage:** `cd experience`
- **Output:** One card per role (2 cards — see `docs/05-CONTENT-MAP.md` for exact content)

Each card:
```
┌─────────────────────────────────────────────┐
│ CANPOTEX.log                              ● │
│                                             │
│  IT Developer Intern — Data & Integrations  │
│  Canpotex · Saskatoon, SK    May 2024 – May 2026
│                                             │
│  › bullet 1                                 │
│  › bullet 2                                 │
│  › ...                                      │
│                                             │
│  [Boomi] [C#] [Azure] [ETL] [REST APIs]     │
└─────────────────────────────────────────────┘
```
- Role + company in `var(--color-accent)`, period right-aligned in `var(--color-muted)`
- Bullets prefixed with `›` in `var(--color-muted)`, text in `var(--color-text)`
- Tech tags: small monospace badges, `var(--color-surface)` background, `var(--color-border)` border
- Stagger animation: bullets appear sequentially (30ms between each)

---

### `cd projects` / `projects`
- **Aliases:** `projects`
- **Category:** navigation
- **Usage:** `cd projects`
- **Output:** 2-column grid of project cards. 4 total projects. Pagination if needed (4 per page).

Each project card (macOS window style):
```
┌─ ● ● ●  Code-Help ──────────────────────────┐
│                                              │
│  Code-Help                                   │
│  Full-stack platform with auth, RBAC,        │
│  MySQL, Docker. Node/Express/React.          │
│                                              │
│  [Node.js] [Express] [React] [MySQL] [Docker]│
│                                              │
│  [GitHub ↗]                                  │
└──────────────────────────────────────────────┘
```
- Traffic light dots top-left (red/yellow/green, decorative, `aria-hidden`)
- Project name in `var(--color-accent)`
- Description in `var(--color-text)`
- Tech tags as monospace badges
- GitHub link → `https://github.com/aryan-mht` (profile, all repos private)
- No live demo links (repos are private, no deployed demos)
- Order: Code-Help → Xv6 → FORTH → Pathfinding (see `docs/05-CONTENT-MAP.md`)

---

### `cd skills` / `skills`
- **Aliases:** `skills`
- **Category:** navigation
- **Usage:** `cd skills`
- **Output:** ASCII directory tree

```
skills/
├── Languages/
│   ├── Python
│   ├── Java
│   ├── C
│   ├── C#
│   ├── JavaScript
│   ├── TypeScript
│   ├── Scala
│   ├── SQL
│   └── Bash
├── Backend & APIs/
│   ├── ASP.NET Core
│   ├── Node.js
│   ├── Express
│   ├── RESTful API design
│   ├── ETL pipelines
│   ├── Session auth & RBAC
│   └── Boomi iPaaS
├── Cloud & DevOps/
│   ├── Microsoft Azure (AZ-900 certified)
│   ├── Azure DevOps (CI/CD)
│   ├── Docker
│   ├── Git
│   └── AWS fundamentals (pursuing CCP)
├── Frontend/
│   ├── React
│   ├── Next.js
│   ├── HTML/CSS
│   └── Tailwind CSS
├── Data & Monitoring/
│   ├── MySQL
│   ├── MongoDB
│   ├── SSMS
│   ├── Power BI
│   └── Grafana
├── AI Dev Tools/
│   ├── Claude API
│   ├── GitHub Copilot
│   └── LLM API integration
└── Other/
    ├── Jira / Agile / Scrum
    ├── System design
    ├── OS internals (xv6/Unix)
    └── MIPS & RISC-V assembly
```
- Tree lines (`├──`, `│`, `└──`) in `var(--color-muted)`
- Skill names in `var(--color-text)`
- Directory names in `var(--color-accent)`
- Lines appear with stagger animation (20ms between each line)

---

### `cd contact` / `contact`
- **Aliases:** `contact`
- **Category:** navigation
- **Usage:** `cd contact`
- **Output:**
```
📧  aryanmht9@gmail.com          mailto:aryanmht9@gmail.com
🔗  github.com/aryan-mht         https://github.com/aryan-mht
💼  linkedin.com/in/aryan-mehta09  https://www.linkedin.com/in/aryan-mehta09
📄  Resume.pdf                   /Resume.pdf (opens new tab)

● Available for new grad SWE opportunities
```
Each link: clickable, opens in new tab, `var(--color-accent)` color

---

### `resume`
- **Category:** navigation
- **Usage:** `resume`
- **Output:** `Opening resume...` then `window.open('/Resume.pdf', '_blank')`

---

### `clear`
- **Category:** utility
- **Usage:** `clear`
- **Output:** Calls `clearHistory()` — empties history array. No output rendered.

---

### `refresh`
- **Category:** utility
- **Usage:** `refresh`
- **Output:** Calls `window.location.reload()`

---

## Fun / Utility Commands

### `whoami`
- **Category:** fun
- **Usage:** `whoami`
- **Output:**
```
aryan — Software Engineering student @ USask. Builds kernels, integration 
pipelines, and full-stack apps. Open to new grad SWE opportunities.
```

---

### `neofetch`
- **Category:** fun
- **Usage:** `neofetch`
- **Output:** (styled to look like real neofetch)
```
       ___           aryan@portfolio
      /   \          ───────────────
     / USk  \        OS: PortfolioOS 1.0.0
    /________\       Host: University of Saskatchewan
    |        |       Kernel: Linux 6.x (xv6 extended)
    |  [A]   |       Shell: bash 5.2.0
    |________|       DE: Terminal (browser-native)
                     CPU: Brain @ 3.8GHz
    aryan@portfolio  Memory: Too much coffee
                     Languages: Python Java C# JS TS Scala C Bash
                     Cloud: Azure (AZ-900) · AWS (pursuing CCP)
```
ASCII art in `var(--color-accent)`, labels in `var(--color-muted)`, values in `var(--color-text)`

---

### `hash [text]`
- **Category:** utility
- **Usage:** `hash Hello`
- **Output:**
```
🔒 Hash output for "Hello":

SHA-256: 185f8db32921bd46d35...
MD5:     8b1a9953c4611296a827...
```
- Computed client-side via browser `SubtleCrypto` API — no external library
- If no text provided: show `Usage: hash [text]`

---

### `ip`
- **Category:** fun
- **Usage:** `ip`
- **Output:**
```
🌐 Your connection:
   IP:       203.0.113.42
   Location: Toronto, Ontario, Canada
```
- Fetches from `/api/ip` (proxied ipapi.co)
- Shows loading state while fetching

---

### `weather`
- **Category:** fun
- **Usage:** `weather`
- **Output:**
```
🌤  Toronto, ON
    12°C — Partly Cloudy
    Wind: 18 km/h NW
    Humidity: 52%
```
- Uses visitor's location (from `/api/ip` then `/api/weather`)
- Shows loading state while fetching

---

### `rps [move]`
- **Aliases:** none
- **Category:** fun
- **Usage:** `rps rock` / `rps paper` / `rps scissors`
- **Output:**
```
You:      🪨 rock
Computer: ✂️  scissors

Result: You win! Computer chose scissors.
Score this session: 2W – 1L – 0T
```
- Computer choice: `Math.random()` of the three options
- Score tracked in component state for the session
- Invalid move: show `Usage: rps [rock|paper|scissors]`
- No args: show `Usage: rps [rock|paper|scissors]`

---

### `ascii [text]`
- **Category:** fun
- **Usage:** `ascii ARYAN`
- **Output:** Block letter ASCII art (figlet-style, A-Z mapping)
- Built-in character map for A-Z, 0-9, space
- Text rendered in `var(--color-accent)`
- If no text: show `Usage: ascii [text]`
- Max 8 characters (longer strings wrap oddly — just cap it)

---

### `matrix`
- **Category:** fun
- **Usage:** `matrix`
- **Output:** Full-screen canvas overlay with falling green characters
- Auto-dismisses after 10 seconds OR on any keypress
- Classic Matrix rain: green characters (`var(--color-accent)`), black background, fade trails
- Canvas: position fixed, z-index 9999, covers entire viewport
- After dismiss: refocus terminal input

---

### `theme [color]`
- **Category:** utility
- **Usage:** `theme green` / `theme amber`
- **Output:**
```
Theme switched to: green
```
- `theme green` → `document.documentElement.style.setProperty('--color-accent', '#00ff9f')`
- `theme amber` → `document.documentElement.style.setProperty('--color-accent', '#f5a623')`
- Session only — resets on page reload
- Invalid color: show `Available themes: green, amber`

---

### `uptime`
- **Category:** utility
- **Usage:** `uptime`
- **Output:**
```
⏱  Page loaded: 4 minutes, 32 seconds ago
```
- Calculate from `Date.now()` minus page load timestamp (stored in `useTerminal` init)

---

### `history`
- **Category:** utility
- **Usage:** `history`
- **Output:** Numbered list of commands run this session
```
  1  help
  2  cd about
  3  cd experience
  4  rps rock
```
- Line numbers in `var(--color-muted)`, commands in `var(--color-text)`
- `clear` is included in history

---

### `sudo hire aryan`
- **Category:** fun
- **Usage:** `sudo hire aryan`
- **Output:**
```
[sudo] password for visitor: ••••••••

Verifying credentials...
Access granted.

Initiating hire sequence for aryan...
✓ Resume reviewed
✓ References checked
✓ Offer letter prepared

→ Please reach out: aryanmht9@gmail.com
```
- Typing animation on the password dots (appears one by one)
- `aryanmht9@gmail.com` is a mailto link

---

### `man [command]`
- **Aliases:** none
- **Category:** utility
- **Usage:** `man help` / `man rps`
- **Output:** Shows `usage` string for the named command
```
Usage: rps [rock|paper|scissors]
Description: Play rock paper scissors against the computer.
```
- If command not found: `No manual entry for: [name]`

---

## Command Aliases Summary

```
about       → cd about
projects    → cd projects
experience  → cd experience
skills      → cd skills
contact     → cd contact
?           → help
ls          → help
```
