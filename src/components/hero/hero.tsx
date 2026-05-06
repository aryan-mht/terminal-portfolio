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
        paddingTop: '2.5rem',
        paddingBottom: '2rem',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* Logo + Name row */}
      <div className="flex items-center gap-6" style={{ marginBottom: '1rem' }}>
        <div
          aria-hidden="true"
          style={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: '#ffffff',
            fontSize: '2.25rem',
            fontWeight: 700,
            fontFamily: 'var(--font-pixel)',
          }}
        >
          A
        </div>

        <div>
          <AsciiName />
          <p
            style={{
              color: 'var(--color-muted)',
              fontSize: 'var(--text-sm)',
              margin: '0.5rem 0 0',
            }}
          >
            Software Engineer · USask · Open to new grad roles
          </p>
        </div>
      </div>

      <BootSequence onComplete={handleComplete} />

      {bootDone && (
        <div
          style={{
            marginTop: '1rem',
            height: '1px',
            background: 'var(--color-border)',
          }}
        />
      )}
    </div>
  );
}
