'use client';

import { useCallback, useMemo, useState } from "react";
import { getAutocompleteSuggestions, getManTopics } from "./commands";

export interface AutocompleteSuggestion {
  name: string;
  usage: string;
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

const MAN_PREFIX = "man ";

export function useAutocomplete(input: string): UseAutocompleteReturn {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const suggestions: AutocompleteSuggestion[] = useMemo(() => {
    if (input.toLowerCase().startsWith(MAN_PREFIX)) {
      const query = input.slice(MAN_PREFIX.length);
      return getManTopics(query).map((t) => ({
        name: `man ${t.topic}`,
        usage: t.usage,
        description: t.description,
      }));
    }
    return getAutocompleteSuggestions(input).map((m) => ({
      name: m.name,
      usage: m.usage,
      description: m.description,
    }));
  }, [input]);

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
