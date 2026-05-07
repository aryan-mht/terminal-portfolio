import { Card } from "./card";

const BIO =
  "Software Engineering student with 2+ years of hands-on experience building production-grade backend systems, data integration pipelines, and cloud-based services. Proven ability to design scalable, reliable infrastructure using Azure, RESTful APIs, and modern DevOps practices. Strong CS fundamentals demonstrated through low-level systems work (OS kernels, interpreters) and a passion for clean architecture.";

const TECH_TAGS = [
  "Python",
  "Java",
  "C",
  "C#",
  "TypeScript",
  "JavaScript",
  "Scala",
  "SQL",
  "Bash",
  "React",
  "Next.js",
  "Node.js",
  "ASP.NET Core",
  "Azure",
  "Docker",
  "Boomi",
];

const COURSES = [
  "Operating Systems (Unix/C)",
  "Computer Architecture (MIPS Assembly)",
  "Data Structures & Algorithms",
  "Object-Oriented Systems (Java)",
  "Functional Programming (Scala)",
  "Advanced Software Engineering",
  "Mathematical Logic & Computing",
];

function Tag({ children }: { children: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "var(--text-xs)",
        color: "var(--color-accent)",
        background: "transparent",
        border: "1px solid var(--color-border)",
        borderRadius: 4,
        padding: "0.15rem 0.5rem",
        marginRight: "0.4rem",
        marginBottom: "0.4rem",
      }}
    >
      {children}
    </span>
  );
}

export function OutputAbout() {
  return (
    <div>
      <Card title="ABOUT_ME.exe">
        <p style={{ margin: 0, lineHeight: 1.6 }}>{BIO}</p>
        <div style={{ marginTop: "1rem" }}>
          {TECH_TAGS.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Card>

      <Card title="EDUCATION.log" delay={0.05}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "var(--color-accent)",
            marginBottom: "0.25rem",
          }}
        >
          <span>University of Saskatchewan</span>
          <span style={{ color: "var(--color-muted)" }}>2021 – 2026</span>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          B.Sc. Honours Software Engineering · Minor: Mathematics
        </div>
        <div style={{ marginBottom: "1rem", color: "var(--color-muted)" }}>
          GPA: <span style={{ color: "var(--color-text)" }}>3.8 / 4.0</span>
        </div>

        <div
          style={{
            color: "var(--color-accent)",
            marginBottom: "0.25rem",
          }}
        >
          Achievements
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 1rem",
          }}
        >
          <li style={{ color: "var(--color-muted)" }}>
            ›{" "}
            <span style={{ color: "var(--color-text)" }}>
              Dean&apos;s Honour List (2021, 2022, 2023)
            </span>
          </li>
          <li style={{ color: "var(--color-muted)" }}>
            ›{" "}
            <span style={{ color: "var(--color-text)" }}>
              Arts and Science Undergraduate Award (2023)
            </span>
          </li>
        </ul>

        <div
          style={{
            color: "var(--color-accent)",
            marginBottom: "0.25rem",
          }}
        >
          Relevant Courses
        </div>
        <div style={{ color: "var(--color-text)", lineHeight: 1.7 }}>
          {COURSES.join(" · ")}
        </div>
      </Card>
    </div>
  );
}
