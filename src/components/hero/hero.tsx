'use client';

import { useCallback, useState } from 'react';
import { AsciiName } from './ascii-name';
import { BootSequence } from './boot-sequence';

export function Hero() {
  const [bootDone, setBootDone] = useState(false);
  const handleComplete = useCallback(() => setBootDone(true), []);

  return (
    <div
      style={{
        padding: 'var(--terminal-padding)',
        paddingBottom: '2rem',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: '2px solid var(--color-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          color: 'var(--color-accent)',
          fontSize: '1.5rem',
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
        }}
      >
        A
      </div>

      <AsciiName />

      <p
        style={{
          color: 'var(--color-muted)',
          fontSize: 'var(--text-sm)',
          margin: '0.75rem 0 1.5rem',
        }}
      >
        Software Engineer · USask · Open to new grad roles
      </p>

      <BootSequence onComplete={handleComplete} />

      {bootDone && (
        <div
          style={{
            marginTop: '0.5rem',
            height: '1px',
            background: 'var(--color-border)',
          }}
        />
      )}
    </div>
  );
}
