import type { HistoryEntry } from "@/lib/use-terminal";
import { Prompt } from "./prompt";

interface TerminalOutputProps {
  entry: HistoryEntry;
}

export function TerminalOutput({ entry }: TerminalOutputProps) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-base)",
          opacity: 0.85,
        }}
      >
        <Prompt />
        <span style={{ color: "var(--color-text)" }}>{entry.input}</span>
      </div>
      <div style={{ marginTop: "0.5rem" }}>{entry.output}</div>
    </div>
  );
}
