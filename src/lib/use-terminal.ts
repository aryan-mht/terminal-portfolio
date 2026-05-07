'use client';

import { createElement, type ReactNode, useCallback, useRef, useState } from "react";
import { findCommand } from "./commands";

export interface HistoryEntry {
  id: string;
  input: string;
  output: ReactNode;
}

interface UseTerminalReturn {
  history: HistoryEntry[];
  runCommand: (input: string) => void;
  clearHistory: () => void;
  pageLoadedAt: number;
}

let entrySeq = 0;
const nextId = () => {
  entrySeq += 1;
  return `entry-${entrySeq}`;
};

export function useTerminal(): UseTerminalReturn {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const pageLoadedAtRef = useRef<number>(Date.now());

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const runCommand = useCallback((rawInput: string) => {
    const input = rawInput.trim();
    if (!input) return;

    if (input === "clear") {
      setHistory([]);
      return;
    }

    if (input === "refresh") {
      if (typeof window !== "undefined") {
        window.location.reload();
      }
      return;
    }

    if (input === "resume") {
      if (typeof window !== "undefined") {
        window.open("/Resume.pdf", "_blank", "noopener,noreferrer");
      }
    }

    const match = findCommand(input);
    let output: ReactNode;
    if (!match) {
      output = createElement(
        "span",
        { style: { color: "var(--color-error)" } },
        `command not found: ${input}`
      );
    } else {
      output = match.command.handler(match.args);
    }

    setHistory((prev) => [...prev, { id: nextId(), input, output }]);
  }, []);

  return {
    history,
    runCommand,
    clearHistory,
    pageLoadedAt: pageLoadedAtRef.current,
  };
}
