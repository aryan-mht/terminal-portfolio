import type { HistoryEntry } from "@/lib/use-terminal";
import { TerminalOutput } from "./terminal-output";

interface TerminalHistoryProps {
  entries: HistoryEntry[];
}

export function TerminalHistory({ entries }: TerminalHistoryProps) {
  return (
    <div>
      {entries.map((entry) => (
        <TerminalOutput key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
