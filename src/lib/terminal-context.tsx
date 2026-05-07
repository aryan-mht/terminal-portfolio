'use client';

import { createContext, type ReactNode, useContext } from "react";
import { useTerminal, type HistoryEntry } from "./use-terminal";

interface TerminalContextValue {
  history: HistoryEntry[];
  runCommand: (input: string) => void;
  clearHistory: () => void;
  pageLoadedAt: number;
}

const TerminalContext = createContext<TerminalContextValue | null>(null);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const terminal = useTerminal();
  return (
    <TerminalContext.Provider value={terminal}>{children}</TerminalContext.Provider>
  );
}

export function useTerminalContext(): TerminalContextValue {
  const ctx = useContext(TerminalContext);
  if (!ctx) {
    throw new Error("useTerminalContext must be used within TerminalProvider");
  }
  return ctx;
}
