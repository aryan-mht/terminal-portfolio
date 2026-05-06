const ASCII_ART = `
 █████╗  ██████╗  ██╗   ██╗ █████╗  ███╗   ██╗
██╔══██╗ ██╔══██╗ ╚██╗ ██╔╝██╔══██╗ ████╗  ██║
███████║ ██████╔╝  ╚████╔╝ ███████║ ██╔██╗ ██║
██╔══██║ ██╔══██╗   ╚██╔╝  ██╔══██║ ██║╚██╗██║
██║  ██║ ██║  ██║    ██║   ██║  ██║ ██║ ╚████║
╚═╝  ╚═╝ ╚═╝  ╚═╝    ╚═╝   ╚═╝  ╚═╝ ╚═╝  ╚═══╝`.trimStart();

export function AsciiName() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <pre
        aria-label="Aryan"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.5rem, 1.4vw, 1rem)',
          lineHeight: 1.2,
          color: '#ffffff',
          textShadow: '-3px 0 #60a5fa, 3px 0 var(--color-accent)',
          margin: 0,
          fontWeight: 700,
          whiteSpace: 'pre',
          display: 'inline-block',
        }}
      >
        {ASCII_ART}
      </pre>
    </div>
  );
}
