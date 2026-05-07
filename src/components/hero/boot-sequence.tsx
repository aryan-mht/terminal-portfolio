import { VT323 } from 'next/font/google';

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export function BootSequence() {
  return (
    <div
      className={vt323.className}
      style={{
        marginTop: '2rem',
        lineHeight: 1.2,
      }}
    >
      <div
        style={{
          fontSize: '2.25rem',
          color: '#ffffff',
          letterSpacing: '0.02em',
        }}
      >
        Welcome to Aryan&apos;s Terminal Portfolio
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.95rem',
          color: '#d1d5db',
          marginTop: '0.75rem',
          letterSpacing: 0,
        }}
      >
        Type &apos;?&apos; or &apos;help&apos; to view a list of available commands.
      </div>
    </div>
  );
}
