'use client';

import { useEffect, useRef } from "react";
import { Hero } from "@/components/hero/hero";
import { useTerminal } from "@/lib/use-terminal";
import { TerminalHistory } from "./terminal-history";
import { TerminalInput } from "./terminal-input";

export function Terminal() {
  const { history, runCommand } = useTerminal();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div
      style={{
        height:
          "calc(100vh - var(--navbar-height) - var(--status-bar-height))",
        marginTop: "var(--navbar-height)",
        background: "var(--color-bg)",
        overflowY: "auto",
        padding: "var(--terminal-padding)",
      }}
    >
      <Hero />
      <TerminalHistory entries={history} />
      <TerminalInput onSubmit={runCommand} />
      <div ref={bottomRef} />
    </div>
  );
}
