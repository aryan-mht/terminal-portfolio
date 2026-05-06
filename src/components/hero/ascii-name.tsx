export function AsciiName() {
  return (
    <>
      <style>{`
        @keyframes glitch {
          0%   { text-shadow: -4px 0 #60a5fa, 4px 0 var(--color-accent); }
          15%  { text-shadow: -6px 0 #60a5fa, 6px 0 var(--color-accent); }
          30%  { text-shadow: -3px 0 #60a5fa, 3px 0 var(--color-accent); }
          45%  { text-shadow: -7px 0 #60a5fa, 7px 0 var(--color-accent); opacity: 0.9; }
          60%  { text-shadow: -4px 0 #60a5fa, 4px 0 var(--color-accent); opacity: 1; }
          100% { text-shadow: -4px 0 #60a5fa, 4px 0 var(--color-accent); }
        }
        .glitch-name {
          text-shadow: -4px 0 #60a5fa, 4px 0 var(--color-accent);
          animation: glitch 3s ease-out 1;
        }
      `}</style>
      <h1
        className="glitch-name"
        aria-label="Aryan"
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          color: '#ffffff',
          margin: 0,
          lineHeight: 1.1,
          letterSpacing: '0.05em',
          fontWeight: 700,
        }}
      >
        ARYAN
      </h1>
    </>
  );
}
