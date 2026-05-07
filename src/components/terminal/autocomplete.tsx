'use client';

import { AnimatePresence, motion } from "framer-motion";
import type { AutocompleteSuggestion } from "@/lib/use-autocomplete";

interface AutocompleteProps {
  suggestions: AutocompleteSuggestion[];
  onSelect: (name: string) => void;
}

export function Autocomplete({ suggestions, onSelect }: AutocompleteProps) {
  const usageColumnWidth = Math.max(
    20,
    ...suggestions.map((s) => s.usage.length)
  );

  return (
    <AnimatePresence>
      {suggestions.length > 0 && (
        <motion.div
          key="autocomplete"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.95rem",
            marginTop: "0.75rem",
            lineHeight: 1.6,
            color: "var(--color-muted)",
            fontStyle: "italic",
          }}
        >
      <div style={{ marginBottom: "0.5rem" }}>Suggestions:</div>
      {suggestions.map((s) => (
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
            color: "var(--color-muted)",
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
      ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
