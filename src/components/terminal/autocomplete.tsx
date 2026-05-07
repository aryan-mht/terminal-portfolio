'use client';

import type { AutocompleteSuggestion } from "@/lib/use-autocomplete";

interface AutocompleteProps {
  suggestions: AutocompleteSuggestion[];
  selectedIndex: number;
  onSelect: (name: string) => void;
}

export function Autocomplete({ suggestions, selectedIndex, onSelect }: AutocompleteProps) {
  if (suggestions.length === 0) return null;

  const usageColumnWidth = Math.max(
    20,
    ...suggestions.map((s) => s.usage.length)
  );

  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-base)",
        marginTop: "0.75rem",
        lineHeight: 1.5,
        color: "var(--color-muted)",
      }}
    >
      <div style={{ marginBottom: "0.25rem" }}>Suggestions:</div>
      {suggestions.map((s, i) => {
        const selected = i === selectedIndex;
        return (
          <div
            key={s.name}
            role="button"
            tabIndex={-1}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(s.name);
            }}
            style={{
              cursor: "pointer",
              color: selected ? "var(--color-text)" : "var(--color-muted)",
              whiteSpace: "pre",
            }}
          >
            <span
              style={{
                display: "inline-block",
                minWidth: `${usageColumnWidth + 2}ch`,
              }}
            >
              {s.usage}
            </span>
            <span>- {s.description}</span>
          </div>
        );
      })}
    </div>
  );
}
