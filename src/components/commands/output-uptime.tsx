'use client';

import { useEffect, useState } from "react";
import { useTerminalContext } from "@/lib/terminal-context";

function format(diffMs: number): string {
  const total = Math.max(0, Math.floor(diffMs / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  if (m === 0) return `${s} seconds`;
  return `${m} minute${m === 1 ? "" : "s"}, ${s} second${s === 1 ? "" : "s"}`;
}

export function OutputUptime() {
  const { pageLoadedAt } = useTerminalContext();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div style={{ fontFamily: "var(--font-mono)" }}>
      <span>⏱  </span>
      <span style={{ color: "var(--color-muted)" }}>Page loaded: </span>
      <span style={{ color: "var(--color-text)" }}>
        {format(now - pageLoadedAt)} ago
      </span>
    </div>
  );
}
