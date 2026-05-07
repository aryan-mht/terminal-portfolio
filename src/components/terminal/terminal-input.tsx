'use client';

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { useAutocomplete } from "@/lib/use-autocomplete";
import { useCommandHistory } from "@/lib/use-command-history";
import { Autocomplete } from "./autocomplete";
import { Prompt } from "./prompt";

interface TerminalInputProps {
  onSubmit: (input: string) => void;
}

export function TerminalInput({ onSubmit }: TerminalInputProps) {
  const [value, setValue] = useState("");
  const [autocompleteOpen, setAutocompleteOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const { addToHistory, navigateUp, navigateDown, reset: resetHistory } = useCommandHistory();
  const autocomplete = useAutocomplete(autocompleteOpen ? value : "");
  const { suggestions, selectedIndex, selectNext, selectPrev, selectCurrent, reset: resetAutocomplete } =
    autocomplete;

  useEffect(() => {
    inputRef.current?.focus();
    const onWindowFocus = () => inputRef.current?.focus();
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("button") || target?.closest("a")) return;
      inputRef.current?.focus();
    };
    window.addEventListener("focus", onWindowFocus);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("focus", onWindowFocus);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const submit = (raw: string) => {
    const text = raw.trim();
    if (text) {
      addToHistory(text);
    }
    onSubmit(text);
    setValue("");
    resetAutocomplete();
    resetHistory();
    setAutocompleteOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(value);
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0 && autocompleteOpen) {
        setValue(selectCurrent());
        resetAutocomplete();
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setAutocompleteOpen(false);
      resetAutocomplete();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (autocompleteOpen && suggestions.length > 0) {
        selectPrev();
      } else {
        const prev = navigateUp();
        if (prev !== null) setValue(prev);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (autocompleteOpen && suggestions.length > 0) {
        selectNext();
      } else {
        const next = navigateDown();
        if (next !== null) setValue(next);
      }
      return;
    }
  };

  return (
    <div>
      <Autocomplete
        suggestions={autocompleteOpen ? suggestions : []}
        selectedIndex={selectedIndex}
        onSelect={(name) => {
          setValue(name);
          resetAutocomplete();
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
      />
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-base)",
        }}
      >
        <Prompt />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setAutocompleteOpen(true);
          }}
          onKeyDown={onKeyDown}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          aria-label="Terminal input"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--color-text)",
            fontFamily: "inherit",
            fontSize: "inherit",
            padding: 0,
            caretColor: "var(--color-accent)",
          }}
        />
      </label>
    </div>
  );
}
