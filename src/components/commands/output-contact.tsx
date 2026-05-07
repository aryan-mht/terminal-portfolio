'use client';

import { motion } from "framer-motion";

interface Link {
  icon: string;
  label: string;
  href: string;
}

const LINKS: Link[] = [
  { icon: "📧", label: "aryanmht9@gmail.com", href: "mailto:aryanmht9@gmail.com" },
  { icon: "🔗", label: "github.com/aryan-mht", href: "https://github.com/aryan-mht" },
  {
    icon: "💼",
    label: "linkedin.com/in/aryan-mehta09",
    href: "https://www.linkedin.com/in/aryan-mehta09",
  },
  { icon: "📄", label: "Resume.pdf", href: "/Resume.pdf" },
];

export function OutputContact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        background: "var(--section-card-bg)",
        border: "1px solid var(--section-card-border)",
        borderRadius: "var(--section-card-radius)",
        padding: "1rem",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-base)",
        lineHeight: 2,
      }}
    >
      {LINKS.map((l) => (
        <div key={l.href} style={{ display: "flex", gap: "0.75rem" }}>
          <span aria-hidden="true">{l.icon}</span>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-accent)", textDecoration: "none" }}
          >
            {l.label}
          </a>
        </div>
      ))}
      <div
        style={{
          marginTop: "1rem",
          color: "var(--color-success)",
        }}
      >
        <span aria-hidden="true">● </span>
        Available for new grad SWE opportunities
      </div>
    </motion.div>
  );
}
