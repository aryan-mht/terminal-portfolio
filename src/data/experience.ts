export interface Experience {
  cardTitle: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  tech: string[];
}

export const experience: Experience[] = [
  {
    cardTitle: "CANPOTEX.log",
    role: "IT Developer Intern — Data & Integrations",
    company: "Canpotex",
    location: "Saskatoon, SK",
    period: "May 2024 – May 2026",
    bullets: [
      "Designed, developed, and deployed multiple production-grade backend data integration services in an Agile team using Boomi (iPaaS), C#/.NET Core, and Microsoft Azure — synchronizing 10,000+ records daily across critical enterprise systems.",
      "Led end-to-end ETL pipeline development: translated cross-functional business requirements into system design specifications and scalable, event-driven integration workflows.",
      "Built and maintained reliable, high-performance API and service layers, including RESTful integrations between cloud and on-premise systems, enabling real-time data exchange.",
      "Drove application modernization by monitoring system performance (Grafana), managing CI/CD deployment pipelines (Azure DevOps), and reducing technical debt through codebase optimization.",
      "Maintained high availability of production services through rapid incident triage and root-cause resolution, contributing to platform reliability under SLA constraints.",
    ],
    tech: ["Boomi", "C#", ".NET Core", "Azure", "Azure DevOps", "ETL", "REST APIs", "Grafana"],
  },
  {
    cardTitle: "ISEA-LAB.log",
    role: "Summer Research Student",
    company: "Interactive Software Engineering & Analytics Lab — U of S",
    location: "Saskatoon, SK",
    period: "July 2023 – August 2023",
    bullets: [
      "Contributed to GPTCloneBench (published at ICSME 2023): validated and categorized 3,000+ GPT-generated semantic and cross-language code clone pairs using systematic analysis across multiple programming languages.",
      "Applied systematic cross-language analysis to evaluate AI-generated code quality — supporting a peer-reviewed publication in software engineering research.",
    ],
    tech: ["Python", "NLP", "Code Analysis", "Research", "ICSME 2023"],
  },
];
