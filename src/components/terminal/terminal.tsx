'use client';

import { useEffect, useRef } from "react";
import { Hero } from "@/components/hero/hero";
import { useTerminalContext } from "@/lib/terminal-context";
import { TerminalHistory } from "./terminal-history";
import { TerminalInput } from "./terminal-input";

export function Terminal() {
  const { history, runCommand } = useTerminalContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div
      style={{
        height:
          "calc(100dvh - var(--navbar-height) - var(--status-bar-height))",
        marginTop: "var(--navbar-height)",
        background: "var(--color-bg)",
        overflowY: "auto",
        padding: "var(--terminal-padding)",
        paddingBottom: "calc(var(--terminal-padding) + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <Hero />
      <TerminalHistory entries={history} />
      <TerminalInput onSubmit={runCommand} />
      <div ref={bottomRef} />
    </div>
  );
}
