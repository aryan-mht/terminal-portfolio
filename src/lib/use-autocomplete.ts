'use client';

import { useCallback, useMemo, useState } from "react";
import { type Command, getAutocompleteSuggestions } from "./commands";

export interface AutocompleteSuggestion {
  name: string;
  description: string;
}

interface UseAutocompleteReturn {
  suggestions: AutocompleteSuggestion[];
  selectedIndex: number;
  selectNext: () => void;
  selectPrev: () => void;
  selectCurrent: () => string;
  reset: () => void;
}

export function useAutocomplete(input: string): UseAutocompleteReturn {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const matches: Command[] = useMemo(() => getAutocompleteSuggestions(input), [input]);

  const suggestions: AutocompleteSuggestion[] = useMemo(
    () => matches.map((m) => ({ name: m.name, description: m.description })),
    [matches]
  );

  const selectNext = useCallback(() => {
    setSelectedIndex((i) => (suggestions.length === 0 ? 0 : (i + 1) % suggestions.length));
  }, [suggestions.length]);

  const selectPrev = useCallback(() => {
    setSelectedIndex((i) =>
      suggestions.length === 0 ? 0 : (i - 1 + suggestions.length) % suggestions.length
    );
  }, [suggestions.length]);

  const selectCurrent = useCallback((): string => {
    if (suggestions.length === 0) return input;
    const safeIndex = Math.min(selectedIndex, suggestions.length - 1);
    return suggestions[safeIndex]?.name ?? input;
  }, [input, selectedIndex, suggestions]);

  const reset = useCallback(() => {
    setSelectedIndex(0);
  }, []);

  return { suggestions, selectedIndex, selectNext, selectPrev, selectCurrent, reset };
}
