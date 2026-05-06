'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LINES = [
  { text: "Welcome to Aryan's Terminal Portfolio", muted: false },
  { text: "Type 'help' or '?' to view a list of available commands.", muted: true },
];

const STAGGER_MS = 400;
const COMPLETE_DELAY_MS = 300;

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const shouldReduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(
    shouldReduceMotion ? LINES.length : 0
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleCount(i + 1), i * STAGGER_MS)
      );
    });

    timers.push(
      setTimeout(
        onComplete,
        (LINES.length - 1) * STAGGER_MS + COMPLETE_DELAY_MS
      )
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete, shouldReduceMotion]);

  return (
    <div style={{ marginTop: '1.25rem' }}>
      {LINES.slice(0, visibleCount).map((line, i) =>
        shouldReduceMotion ? (
          <div
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-base)',
              fontWeight: line.muted ? 400 : 700,
              color: line.muted ? 'var(--color-muted)' : '#ffffff',
              marginBottom: '0.4rem',
            }}
          >
            {line.text}
          </div>
        ) : (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-base)',
              fontWeight: line.muted ? 400 : 700,
              color: line.muted ? 'var(--color-muted)' : '#ffffff',
              marginBottom: '0.4rem',
            }}
          >
            {line.text}
          </motion.div>
        )
      )}
    </div>
  );
}
