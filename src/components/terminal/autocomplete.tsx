'use client';

import type { AutocompleteSuggestion } from "@/lib/use-autocomplete";

interface AutocompleteProps {
  suggestions: AutocompleteSuggestion[];
  selectedIndex: number;
  onSelect: (name: string) => void;
}

export function Autocomplete({ suggestions, selectedIndex, onSelect }: AutocompleteProps) {
  if (suggestions.length === 0) return null;

  const nameColumnWidth = Math.max(
    14,
    ...suggestions.map((s) => s.name.length)
  );

  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-base)",
        fontStyle: "italic",
        marginTop: "0.75rem",
        lineHeight: 1.5,
      }}
    >
      <div style={{ color: "var(--color-muted)", marginBottom: "0.25rem" }}>
        Suggestions:
      </div>
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
              color: selected ? "#e2e8f0" : "var(--color-muted)",
              whiteSpace: "pre",
            }}
          >
            <span
              style={{
                display: "inline-block",
                minWidth: `${nameColumnWidth + 2}ch`,
              }}
            >
              {s.name}
            </span>
            <span style={{ color: "var(--color-muted)" }}>
              - {s.description}
            </span>
          </div>
        );
      })}
    </div>
  );
}
