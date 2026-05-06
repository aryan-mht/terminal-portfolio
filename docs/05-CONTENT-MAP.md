# 05-CONTENT-MAP.md — Content Map

**Single source of truth for all copy, links, and data.**

Never invent content. Never write Lorem Ipsum. Every piece of text on the site must come from this file. If something is missing, add a `[PLACEHOLDER]` tag here first, then fill it in before shipping.

---

## Personal Info

| Field | Value |
|---|---|
| Full name | Aryan Mehta |
| Email (public) | aryanmht9@gmail.com |
| GitHub | https://github.com/aryan-mht |
| LinkedIn | https://www.linkedin.com/in/aryan-mehta09 |
| Resume PDF | `/Resume.pdf` (already in `/public`) |
| Domain | [PLACEHOLDER — no custom domain yet, use Vercel URL] |
| Location | Saskatoon, SK, Canada |
| Availability | Open to new grad SWE opportunities |

---

## About Section

### Bio (for ABOUT_ME.exe card)
Software Engineering student with 2+ years of hands-on experience building production-grade backend systems, data integration pipelines, and cloud-based services. Proven ability to design scalable, reliable infrastructure using Azure, RESTful APIs, and modern DevOps practices. Strong CS fundamentals demonstrated through low-level systems work (OS kernels, interpreters) and a passion for clean architecture.

### Tech stack tags (shown at bottom of About card)
Python · Java · C · C# · TypeScript · JavaScript · Scala · SQL · Bash · React · Next.js · Node.js · ASP.NET Core · Azure · Docker · Boomi

---

## Education

**University of Saskatchewan**
B.Sc. (Honours) Software Engineering | Minor: Mathematics
GPA: 3.8/4.0
September 2021 – April 2026

**Achievements:**
- Dean's Honour List (2021, 2022, 2023)
- Arts and Science Undergraduate Award (2023)

**Relevant Courses:**
Operating Systems (Unix/C) · Computer Architecture (MIPS Assembly) · Data Structures & Algorithms · Object-Oriented Systems (Java) · Functional Programming (Scala) · Advanced Software Engineering · Mathematical Logic & Computing

---

## Experience

### Role 1 — Canpotex

| Field | Value |
|---|---|
| Role | IT Developer Intern — Data & Integrations |
| Company | Canpotex |
| Location | Saskatoon, SK |
| Period | May 2024 – May 2026 |
| Card title | CANPOTEX.log |

**Bullets:**
1. Designed, developed, and deployed multiple production-grade backend data integration services in an Agile team using Boomi (iPaaS), C#/.NET Core, and Microsoft Azure — synchronizing 10,000+ records daily across critical enterprise systems.
2. Led end-to-end ETL pipeline development: translated cross-functional business requirements into system design specifications and scalable, event-driven integration workflows.
3. Built and maintained reliable, high-performance API and service layers, including RESTful integrations between cloud and on-premise systems, enabling real-time data exchange.
4. Drove application modernization by monitoring system performance (Grafana), managing CI/CD deployment pipelines (Azure DevOps), and reducing technical debt through codebase optimization.
5. Maintained high availability of production services through rapid incident triage and root-cause resolution, contributing to platform reliability under SLA constraints.

**Tech tags:** Boomi · C# · .NET Core · Azure · Azure DevOps · ETL · REST APIs · Grafana

---

### Role 2 — ISEA Lab

| Field | Value |
|---|---|
| Role | Summer Research Student |
| Company | Interactive Software Engineering & Analytics Lab — U of S |
| Location | Saskatoon, SK |
| Period | July 2023 – August 2023 |
| Card title | ISEA-LAB.log |

**Bullets:**
1. Contributed to GPTCloneBench (published at ICSME 2023): validated and categorized 3,000+ GPT-generated semantic and cross-language code clone pairs using systematic analysis across multiple programming languages.
2. Applied systematic cross-language analysis to evaluate AI-generated code quality — supporting a peer-reviewed publication in software engineering research.

**Tech tags:** Python · NLP · Code Analysis · Research · ICSME 2023

---

## Projects

Projects are ordered: **Code-Help → Xv6 → FORTH → Pathfinding**
All repos are private. All GitHub links point to profile: `https://github.com/aryan-mht`

### Project 1 — Code-Help (FEATURED)

| Field | Value |
|---|---|
| ID | `code-help` |
| Name | Code-Help |
| Card title | CODE-HELP.exe |
| Featured | true |
| GitHub | https://github.com/aryan-mht |
| Live | null |

**Description:**
Built a secure full-stack platform with session-based authentication, role-based authorization middleware, and a normalized relational MySQL schema managing users, topics, and responses. Containerized with Docker for consistent, reproducible deployment environments; designed RESTful API endpoints consumed by a React frontend.

**Tech tags:** Node.js · Express · React · MySQL · Docker · JavaScript

---

### Project 2 — Xv6 OS Kernel Extensions

| Field | Value |
|---|---|
| ID | `xv6-kernel` |
| Name | Xv6 OS Kernel Extensions |
| Card title | XV6-KERNEL.exe |
| Featured | true |
| GitHub | https://github.com/aryan-mht |
| Live | null |

**Description:**
Implemented Copy-on-Write fork and optimized the kalloc memory allocator, improving memory efficiency and concurrency for high-throughput process creation — demonstrating low-level systems and performance engineering. Developed an Earliest-Deadline-First (EDF) process scheduler and synchronization primitives (locks, semaphores) for deterministic process management.

**Tech tags:** C · RISC-V Assembly · Makefile · QEMU · GDB · Bash

---

### Project 3 — FORTH Interpreter

| Field | Value |
|---|---|
| ID | `forth-interpreter` |
| Name | FORTH Interpreter |
| Card title | FORTH.exe |
| Featured | false |
| GitHub | https://github.com/aryan-mht |
| Live | null |

**Description:**
Implemented a stack-based language interpreter with support for loops, conditionals, variables, arithmetic, and user-defined commands. Achieved 95% automated test coverage — demonstrating rigorous testing discipline on a language implementation project.

**Tech tags:** C · Makefile · Bash

---

### Project 4 — Pathfinding Algorithm Visualizer

| Field | Value |
|---|---|
| ID | `pathfinding-visualizer` |
| Name | Pathfinding Algorithm Visualizer |
| Card title | PATHFINDER.exe |
| Featured | false |
| GitHub | https://github.com/aryan-mht |
| Live | null |

**Description:**
Built an interactive tool visualizing DFS, BFS, Dijkstra's, and A* algorithms on dynamic grids with wall barriers. Demonstrates algorithm design and foundational UI/UX thinking.

**Tech tags:** Python

---

## Skills

Organized into 7 categories. Used by `cd skills` command (ASCII tree) and About card tags.

```
Languages:       Python, Java, C, C#, JavaScript, TypeScript, Scala, SQL, Bash
Backend & APIs:  ASP.NET Core, Node.js, Express, RESTful API design, ETL pipelines, Session auth & RBAC, Boomi iPaaS
Cloud & DevOps:  Microsoft Azure (AZ-900 certified), Azure DevOps (CI/CD), Docker, Git, AWS fundamentals (pursuing CCP)
Frontend:        React, Next.js, HTML/CSS, Tailwind CSS
Data & Monitoring: MySQL, MongoDB, SSMS, Power BI, Grafana
AI Dev Tools:    Claude API, GitHub Copilot, LLM API integration
Other:           Jira, Agile/Scrum, System design, OS internals (xv6/Unix), MIPS & RISC-V assembly
```

---

## Contact Output

Displayed by `cd contact` command:

```
📧  aryanmht9@gmail.com                → mailto:aryanmht9@gmail.com
🔗  github.com/aryan-mht               → https://github.com/aryan-mht
💼  linkedin.com/in/aryan-mehta09      → https://www.linkedin.com/in/aryan-mehta09
📄  Resume.pdf                         → /Resume.pdf (new tab)

● Available for new grad SWE opportunities
```

---

## Status Bar

- **Left:** Visitor's city + temperature (dynamic, from `/api/ip` + `/api/weather`)
  - Loading state: `— °C`
  - Error state: show `—` only
- **Center:** `[PLACEHOLDER — domain]` (use Vercel URL until custom domain purchased)
- **Right:** Live clock — `May 6th, 2026  15:52:55`

---

## Neofetch Output

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

---

## Placeholders Remaining

Run `grep -r "\[PLACEHOLDER\]" docs/` to find all outstanding items.

- `[PLACEHOLDER — domain]` — custom domain not purchased yet

Everything else in this file is real, confirmed data from resume and interview.
