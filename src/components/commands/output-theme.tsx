'use client';

import { useEffect } from "react";

interface Props {
  color: "green" | "amber";
}

const HEX: Record<Props["color"], string> = {
  green: "#00ff9f",
  amber: "#f5a623",
};

export function OutputTheme({ color }: Props) {
  useEffect(() => {
    document.documentElement.style.setProperty("--color-accent", HEX[color]);
  }, [color]);

  return (
    <div style={{ fontFamily: "var(--font-mono)" }}>
      <span style={{ color: "var(--color-muted)" }}>Theme switched to: </span>
      <span style={{ color: "var(--color-accent)" }}>{color}</span>
    </div>
  );
}
