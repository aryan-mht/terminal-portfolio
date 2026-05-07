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
  const [focused, setFocused] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const { addToHistory, navigateUp, navigateDown, reset: resetHistory } = useCommandHistory();
  const autocomplete = useAutocomplete(autocompleteOpen ? value : "");
  const { suggestions, selectCurrent, reset: resetAutocomplete } = autocomplete;

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
      if (suggestions.length === 1 && autocompleteOpen) {
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
      const prev = navigateUp();
      if (prev !== null) {
        setValue(prev);
        setAutocompleteOpen(false);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = navigateDown();
      if (next !== null) {
        setValue(next);
        setAutocompleteOpen(false);
      }
      return;
    }
  };

  return (
    <div>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          fontFamily: "var(--font-mono)",
          fontSize: "0.95rem",
          marginTop: "0.5rem",
          color: "#d1d5db",
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
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          aria-label="Terminal input"
          style={{
            width: `${value.length}ch`,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#d1d5db",
            fontFamily: "inherit",
            fontSize: "inherit",
            padding: 0,
            caretColor: "transparent",
          }}
        />
        <span
          aria-hidden="true"
          className={focused ? "terminal-cursor" : "terminal-cursor idle"}
        />
        <span style={{ flex: 1 }} aria-hidden="true" />
      </label>
      <Autocomplete
        suggestions={autocompleteOpen ? suggestions : []}
        onSelect={(name) => {
          setValue(name);
          resetAutocomplete();
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
      />
    </div>
  );
}
