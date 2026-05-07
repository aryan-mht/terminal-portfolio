export interface Project {
  id: string;
  name: string;
  cardTitle: string;
  featured: boolean;
  github: string;
  live: string | null;
  description: string;
  tech: string[];
}

export const projects: Project[] = [
  {
    id: "code-help",
    name: "Code-Help",
    cardTitle: "CODE-HELP.exe",
    featured: true,
    github: "https://github.com/aryan-mht",
    live: null,
    description:
      "Built a secure full-stack platform with session-based authentication, role-based authorization middleware, and a normalized relational MySQL schema managing users, topics, and responses. Containerized with Docker for consistent, reproducible deployment environments; designed RESTful API endpoints consumed by a React frontend.",
    tech: ["Node.js", "Express", "React", "MySQL", "Docker", "JavaScript"],
  },
  {
    id: "xv6-kernel",
    name: "Xv6 OS Kernel Extensions",
    cardTitle: "XV6-KERNEL.exe",
    featured: true,
    github: "https://github.com/aryan-mht",
    live: null,
    description:
      "Implemented Copy-on-Write fork and optimized the kalloc memory allocator, improving memory efficiency and concurrency for high-throughput process creation — demonstrating low-level systems and performance engineering. Developed an Earliest-Deadline-First (EDF) process scheduler and synchronization primitives (locks, semaphores) for deterministic process management.",
    tech: ["C", "RISC-V Assembly", "Makefile", "QEMU", "GDB", "Bash"],
  },
  {
    id: "forth-interpreter",
    name: "FORTH Interpreter",
    cardTitle: "FORTH.exe",
    featured: false,
    github: "https://github.com/aryan-mht",
    live: null,
    description:
      "Implemented a stack-based language interpreter with support for loops, conditionals, variables, arithmetic, and user-defined commands. Achieved 95% automated test coverage — demonstrating rigorous testing discipline on a language implementation project.",
    tech: ["C", "Makefile", "Bash"],
  },
  {
    id: "pathfinding-visualizer",
    name: "Pathfinding Algorithm Visualizer",
    cardTitle: "PATHFINDER.exe",
    featured: false,
    github: "https://github.com/aryan-mht",
    live: null,
    description:
      "Built an interactive tool visualizing DFS, BFS, Dijkstra's, and A* algorithms on dynamic grids with wall barriers. Demonstrates algorithm design and foundational UI/UX thinking.",
    tech: ["Python"],
  },
];
