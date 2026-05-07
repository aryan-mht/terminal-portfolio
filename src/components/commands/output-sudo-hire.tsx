'use client';

import { useEffect, useState } from "react";

const STEPS = [
  "",
  "Verifying credentials...",
  "Access granted.",
  "",
  "Initiating hire sequence for aryan...",
  "✓ Resume reviewed",
  "✓ References checked",
  "✓ Offer letter prepared",
  "",
];

export function OutputSudoHire() {
  const [dots, setDots] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (dots < 8) {
      const id = window.setTimeout(() => setDots((d) => d + 1), 80);
      return () => window.clearTimeout(id);
    }
    if (step < STEPS.length) {
      const id = window.setTimeout(() => setStep((s) => s + 1), 180);
      return () => window.clearTimeout(id);
    }
  }, [dots, step]);

  return (
    <div style={{ fontFamily: "var(--font-mono)", whiteSpace: "pre" }}>
      <div>
        <span style={{ color: "var(--color-muted)" }}>[sudo] password for visitor: </span>
        <span style={{ color: "var(--color-text)" }}>{"•".repeat(dots)}</span>
      </div>
      {STEPS.slice(0, step).map((line, i) => (
        <div
          key={i}
          style={{
            color: line.startsWith("✓")
              ? "var(--color-success)"
              : "var(--color-text)",
          }}
        >
          {line}
        </div>
      ))}
      {step >= STEPS.length && (
        <div>
          <span style={{ color: "var(--color-accent)" }}>→ Please reach out: </span>
          <a
            href="mailto:aryanmht9@gmail.com"
            style={{ color: "var(--color-accent)", textDecoration: "underline" }}
          >
            aryanmht9@gmail.com
          </a>
        </div>
      )}
    </div>
  );
}
