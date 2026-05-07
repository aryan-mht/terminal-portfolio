'use client';

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
  delay?: number;
}

export function Card({ title, children, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay }}
      style={{
        position: "relative",
        background: "var(--section-card-bg)",
        border: "1px solid var(--section-card-border)",
        borderRadius: "var(--section-card-radius)",
        padding: "1rem",
        marginBottom: "1rem",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-base)",
        color: "var(--color-text)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
        }}
      >
        <span
          style={{
            color: "var(--color-accent)",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          {title}
        </span>
        <span
          aria-hidden="true"
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--color-accent)",
            animation: "pulse-dot 2s infinite",
          }}
        />
      </div>
      {children}
    </motion.div>
  );
}
