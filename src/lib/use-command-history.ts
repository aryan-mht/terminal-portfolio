'use client';

import { useCallback, useRef } from "react";

interface UseCommandHistoryReturn {
  addToHistory: (cmd: string) => void;
  navigateUp: () => string | null;
  navigateDown: () => string | null;
  reset: () => void;
}

export function useCommandHistory(): UseCommandHistoryReturn {
  const entries = useRef<string[]>([]);
  const pointer = useRef<number>(-1);

  const addToHistory = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    entries.current.push(trimmed);
    pointer.current = entries.current.length;
  }, []);

  const navigateUp = useCallback((): string | null => {
    if (entries.current.length === 0) return null;
    if (pointer.current > 0) {
      pointer.current -= 1;
    } else {
      pointer.current = 0;
    }
    return entries.current[pointer.current] ?? null;
  }, []);

  const navigateDown = useCallback((): string | null => {
    if (entries.current.length === 0) return null;
    if (pointer.current < entries.current.length - 1) {
      pointer.current += 1;
      return entries.current[pointer.current] ?? null;
    }
    pointer.current = entries.current.length;
    return "";
  }, []);

  const reset = useCallback(() => {
    pointer.current = entries.current.length;
  }, []);

  return { addToHistory, navigateUp, navigateDown, reset };
}
