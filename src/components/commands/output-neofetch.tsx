'use client';

import { motion } from "framer-motion";

const ART = [
  "       ___        ",
  "      /   \\       ",
  "     / USk  \\     ",
  "    /________\\    ",
  "    |        |    ",
  "    |  [A]   |    ",
  "    |________|    ",
  "                  ",
  "    aryan@portfolio",
];

const INFO: Array<[string, string]> = [
  ["", "aryan@portfolio"],
  ["", "───────────────"],
  ["OS", "PortfolioOS 1.0.0"],
  ["Host", "University of Saskatchewan"],
  ["Kernel", "Linux 6.x (xv6 extended)"],
  ["Shell", "bash 5.2.0"],
  ["DE", "Terminal (browser-native)"],
  ["CPU", "Brain @ 3.8GHz"],
  ["Memory", "Too much coffee"],
  ["Languages", "Python Java C# JS TS Scala C Bash"],
  ["Cloud", "Azure (AZ-900) · AWS (pursuing CCP)"],
];

export function OutputNeofetch() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-base)",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "1.25rem",
        whiteSpace: "pre",
        lineHeight: 1.4,
      }}
    >
      <div style={{ color: "var(--color-accent)" }}>
        {ART.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div>
        {INFO.map(([label, value], i) => (
          <div key={i}>
            {label ? (
              <>
                <span style={{ color: "var(--color-muted)" }}>{label}: </span>
                <span style={{ color: "var(--color-text)" }}>{value}</span>
              </>
            ) : (
              <span style={{ color: "var(--color-text)" }}>{value}</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
