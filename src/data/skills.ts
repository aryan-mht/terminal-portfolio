export interface SkillCategory {
  name: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    name: "Languages",
    items: ["Python", "Java", "C", "C#", "JavaScript", "TypeScript", "Scala", "SQL", "Bash"],
  },
  {
    name: "Backend & APIs",
    items: [
      "ASP.NET Core",
      "Node.js",
      "Express",
      "RESTful API design",
      "ETL pipelines",
      "Session auth & RBAC",
      "Boomi iPaaS",
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      "Microsoft Azure (AZ-900 certified)",
      "Azure DevOps (CI/CD)",
      "Docker",
      "Git",
      "AWS fundamentals (pursuing CCP)",
    ],
  },
  {
    name: "Frontend",
    items: ["React", "Next.js", "HTML/CSS", "Tailwind CSS"],
  },
  {
    name: "Data & Monitoring",
    items: ["MySQL", "MongoDB", "SSMS", "Power BI", "Grafana"],
  },
  {
    name: "AI Dev Tools",
    items: ["Claude API", "GitHub Copilot", "LLM API integration"],
  },
  {
    name: "Other",
    items: [
      "Jira / Agile / Scrum",
      "System design",
      "OS internals (xv6/Unix)",
      "MIPS & RISC-V assembly",
    ],
  },
];
