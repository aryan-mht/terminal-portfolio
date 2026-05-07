'use client';

import { motion } from "framer-motion";
import { experience, type Experience } from "@/data/experience";
import { Card } from "./card";

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

function Role({ entry, delay }: { entry: Experience; delay: number }) {
  return (
    <Card title={entry.cardTitle} delay={delay}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "space-between",
          color: "var(--color-accent)",
          marginBottom: "0.25rem",
        }}
      >
        <span>{entry.role}</span>
        <span style={{ color: "var(--color-muted)" }}>{entry.period}</span>
      </div>
      <div style={{ color: "var(--color-muted)", marginBottom: "1rem" }}>
        {entry.company} · {entry.location}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem" }}>
        {entry.bullets.map((bullet, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: "easeOut", delay: delay + i * 0.03 }}
            style={{
              color: "var(--color-muted)",
              marginBottom: "0.5rem",
              lineHeight: 1.6,
            }}
          >
            ›{" "}
            <span style={{ color: "var(--color-text)" }}>{bullet}</span>
          </motion.li>
        ))}
      </ul>

      <div>
        {entry.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </Card>
  );
}

export function OutputExperience() {
  return (
    <div>
      {experience.map((entry, i) => (
        <Role key={entry.cardTitle} entry={entry} delay={i * 0.05} />
      ))}
    </div>
  );
}
