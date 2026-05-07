'use client';

import { motion } from "framer-motion";

export function OutputWhoami() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        fontFamily: "var(--font-mono)",
        color: "var(--color-text)",
        whiteSpace: "pre-wrap",
      }}
    >
      <span style={{ color: "var(--color-accent)" }}>aryan</span>
      {" — Software Engineering student @ USask. Builds kernels, integration pipelines, and full-stack apps. Open to new grad SWE opportunities."}
    </motion.div>
  );
}
