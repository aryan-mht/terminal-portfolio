export function AsciiName() {
  return (
    <>
      <style>{`
        @keyframes glitch {
          0%   { text-shadow: 2px 0 var(--color-accent); opacity: 1; }
          10%  { text-shadow: -2px 0 var(--color-accent); opacity: 0.9; }
          20%  { text-shadow: 2px 0 var(--color-accent); opacity: 1; }
          30%  { text-shadow: -3px 0 var(--color-accent); opacity: 0.95; }
          40%  { text-shadow: 1px 0 var(--color-accent); opacity: 1; }
          100% { text-shadow: 2px 0 var(--color-accent); opacity: 1; }
        }
        .glitch-name {
          animation: glitch 3s ease-out 1;
          text-shadow: 2px 0 var(--color-accent);
        }
      `}</style>
      <h1
        className="glitch-name"
        aria-label="Aryan"
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: 'var(--color-text)',
          margin: 0,
          lineHeight: 1.4,
          letterSpacing: '0.05em',
        }}
      >
        ARYAN
      </h1>
    </>
  );
}
