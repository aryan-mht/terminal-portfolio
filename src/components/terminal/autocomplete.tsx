'use client';

import { motion, AnimatePresence } from "framer-motion";
import type { AutocompleteSuggestion } from "@/lib/use-autocomplete";

interface AutocompleteProps {
  suggestions: AutocompleteSuggestion[];
  selectedIndex: number;
  onSelect: (name: string) => void;
}

export function Autocomplete({ suggestions, selectedIndex, onSelect }: AutocompleteProps) {
  return (
    <AnimatePresence>
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--section-card-radius)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            zIndex: 30,
            overflow: "hidden",
          }}
        >
          {suggestions.map((s, i) => {
            const selected = i === selectedIndex;
            return (
              <button
                key={s.name}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(s.name);
                }}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.4rem 0.75rem",
                  background: selected ? "rgba(0, 255, 159, 0.15)" : "transparent",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                }}
              >
                <span style={{ color: "var(--color-accent)" }}>{s.name}</span>
                <span style={{ color: "var(--color-muted)" }}>{s.description}</span>
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
