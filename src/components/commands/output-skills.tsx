'use client';

import { motion } from "framer-motion";
import { skills } from "@/data/skills";

interface Line {
  text: string;
  type: "root" | "category" | "item";
}

function buildTree(): Line[] {
  const lines: Line[] = [{ text: "skills/", type: "root" }];
  skills.forEach((cat, ci) => {
    const isLastCat = ci === skills.length - 1;
    const catPrefix = isLastCat ? "└── " : "├── ";
    lines.push({ text: `${catPrefix}${cat.name}/`, type: "category" });
    cat.items.forEach((item, ii) => {
      const isLastItem = ii === cat.items.length - 1;
      const indent = isLastCat ? "    " : "│   ";
      const itemPrefix = isLastItem ? "└── " : "├── ";
      lines.push({ text: `${indent}${itemPrefix}${item}`, type: "item" });
    });
  });
  return lines;
}

const TREE = buildTree();

function colorFor(type: Line["type"]): string {
  switch (type) {
    case "root":
    case "category":
      return "var(--color-accent)";
    case "item":
      return "var(--color-text)";
  }
}

export function OutputSkills() {
  return (
    <pre
      style={{
        background: "var(--section-card-bg)",
        border: "1px solid var(--section-card-border)",
        borderRadius: "var(--section-card-radius)",
        padding: "1rem",
        margin: 0,
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-sm)",
        lineHeight: 1.7,
        whiteSpace: "pre",
        overflowX: "auto",
      }}
    >
      {TREE.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, delay: i * 0.02 }}
          style={{ color: colorFor(line.type) }}
        >
          {line.text}
        </motion.div>
      ))}
    </pre>
  );
}
