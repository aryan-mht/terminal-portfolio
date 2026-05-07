'use client';

import { motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";

function Tag({ children }: { children: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "var(--text-xs)",
        color: "var(--color-accent)",
        background: "var(--color-surface)",
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

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay }}
      style={{
        background: "var(--section-card-bg)",
        border: "1px solid var(--section-card-border)",
        borderRadius: "var(--section-card-radius)",
        padding: "1rem",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-base)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          paddingBottom: "0.75rem",
          marginBottom: "0.75rem",
          borderBottom: "1px solid var(--color-border)",
        }}
        aria-hidden="true"
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        <span
          style={{
            marginLeft: "0.5rem",
            color: "var(--color-muted)",
            fontSize: "var(--text-xs)",
          }}
        >
          {project.cardTitle}
        </span>
      </div>

      <div
        style={{
          color: "var(--color-accent)",
          fontWeight: 700,
          marginBottom: "0.5rem",
        }}
      >
        {project.name}
      </div>
      <div
        style={{
          color: "var(--color-text)",
          marginBottom: "1rem",
          lineHeight: 1.6,
          flexGrow: 1,
        }}
      >
        {project.description}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        {project.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          alignSelf: "flex-start",
          color: "var(--color-accent)",
          fontSize: "var(--text-sm)",
          textDecoration: "none",
          border: "1px solid var(--color-accent)",
          borderRadius: 4,
          padding: "0.25rem 0.6rem",
        }}
      >
        GitHub ↗
      </a>
    </motion.div>
  );
}

export function OutputProjects() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1rem",
      }}
    >
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} delay={i * 0.05} />
      ))}
    </div>
  );
}
