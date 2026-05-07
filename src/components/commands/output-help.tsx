'use client';

import { motion } from "framer-motion";

interface HelpCommand {
  name: string;
  description: string;
}

const NAVIGATION: HelpCommand[] = [
  { name: "help / ?", description: "Show this help menu" },
  { name: "cd about", description: "About me & education" },
  { name: "cd experience", description: "Work experience" },
  { name: "cd projects", description: "Projects" },
  { name: "cd skills", description: "Skills tree" },
  { name: "cd contact", description: "Contact & links" },
  { name: "resume", description: "Open resume PDF" },
  { name: "clear", description: "Clear terminal" },
  { name: "refresh", description: "Reload page" },
];

const FUN: HelpCommand[] = [
  { name: "whoami", description: "Who am I?" },
  { name: "uname [-a]", description: "Print system information" },
  { name: "date", description: "Print the current date and time" },
  { name: "echo <text>", description: "Print the given text" },
  { name: "hash [text]", description: "SHA-256 + MD5 of text" },
  { name: "ip", description: "Your IP + location" },
  { name: "weather", description: "Current weather" },
  { name: "stock <symbol>", description: "Stock price for a ticker" },
  { name: "timer <seconds>", description: "Start a countdown timer" },
  { name: "rps [move]", description: "Rock paper scissors" },
  { name: "ascii [text]", description: "ASCII block art" },
  { name: "theme [color]", description: "Switch accent color" },
  { name: "uptime", description: "Time since page load" },
  { name: "history", description: "Commands this session" },
  { name: "sudo hire aryan", description: "Try it and see" },
];

function CommandRow({
  command,
  index,
  baseDelay,
}: {
  command: HelpCommand;
  index: number;
  baseDelay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, delay: baseDelay + index * 0.05 }}
      style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "0.2rem",
        whiteSpace: "pre",
      }}
    >
      <span
        style={{
          color: "var(--color-text)",
          minWidth: "16ch",
          display: "inline-block",
        }}
      >
        {command.name}
      </span>
      <span style={{ color: "var(--color-muted)" }}>{command.description}</span>
    </motion.div>
  );
}

function Section({
  title,
  commands,
  baseDelay,
}: {
  title: string;
  commands: HelpCommand[];
  baseDelay: number;
}) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div
        style={{
          color: "var(--color-accent)",
          fontWeight: 700,
          marginBottom: "0.5rem",
          letterSpacing: "0.1em",
        }}
      >
        {title}
      </div>
      {commands.map((c, i) => (
        <CommandRow key={c.name} command={c} index={i} baseDelay={baseDelay} />
      ))}
    </div>
  );
}

export function OutputHelp() {
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
        fontSize: "var(--text-sm)",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        💡{" "}
        <span style={{ color: "var(--color-text)" }}>Terminal Help Menu:</span>
      </div>
      <Section title="NAVIGATION" commands={NAVIGATION} baseDelay={0.1} />
      <Section
        title="FUN & UTILITY"
        commands={FUN}
        baseDelay={0.1 + NAVIGATION.length * 0.05}
      />
      <div
        style={{
          color: "var(--color-muted)",
          marginTop: "0.5rem",
        }}
      >
        Tip: Press Tab to autocomplete. Use ↑↓ to navigate history.
      </div>
    </motion.div>
  );
}
