'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LINES = [
  'Initializing aryan@portfolio...',
  'Loading modules..............  done',
  'Establishing connection......  done',
  'Mounting filesystem..........  done',
  '',
  "Welcome to Aryan's Terminal Portfolio",
  "Type 'help' or '?' to see commands.",
];

const STAGGER_MS = 400;
const COMPLETE_DELAY_MS = 500;

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
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-muted)',
        lineHeight: 1.8,
      }}
    >
      {LINES.slice(0, visibleCount).map((line, i) =>
        shouldReduceMotion ? (
          <div key={i} style={{ minHeight: '1.4em' }}>{line}</div>
        ) : (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ minHeight: '1.4em' }}
          >
            {line}
          </motion.div>
        )
      )}
    </div>
  );
}
