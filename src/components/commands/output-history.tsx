'use client';

import { useTerminalContext } from "@/lib/terminal-context";

export function OutputHistory() {
  const { history } = useTerminalContext();
  const entries = history.map((h) => h.input);

  if (entries.length === 0) {
    return <span style={{ color: "var(--color-muted)" }}>No commands yet.</span>;
  }

  return (
    <div style={{ fontFamily: "var(--font-mono)", whiteSpace: "pre" }}>
      {entries.map((cmd, i) => (
        <div key={i}>
          <span style={{ color: "var(--color-muted)" }}>
            {String(i + 1).padStart(3, " ")}{"  "}
          </span>
          <span style={{ color: "var(--color-text)" }}>{cmd}</span>
        </div>
      ))}
    </div>
  );
}
