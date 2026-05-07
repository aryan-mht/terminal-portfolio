const ASCII_ART = ` █████╗  ██████╗  ██╗   ██╗ █████╗  ███╗   ██╗
██╔══██╗ ██╔══██╗ ╚██╗ ██╔╝██╔══██╗ ████╗  ██║
███████║ ██████╔╝  ╚████╔╝ ███████║ ██╔██╗ ██║
██╔══██║ ██╔══██╗   ╚██╔╝  ██╔══██║ ██║╚██╗██║
██║  ██║ ██║  ██║    ██║   ██║  ██║ ██║ ╚████║
╚═╝  ╚═╝ ╚═╝  ╚═╝    ╚═╝   ╚═╝  ╚═╝ ╚═╝  ╚═══╝`;

export function AsciiName() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <pre
        aria-label="Aryan"
        style={{
          fontFamily: "'Courier New', 'Lucida Console', monospace",
          fontSize: 'clamp(0.7rem, 1.7vw, 1.25rem)',
          lineHeight: 1,
          color: '#ffffff',
          margin: 0,
          padding: 0,
          whiteSpace: 'pre',
          overflow: 'visible',
          fontWeight: 700,
          letterSpacing: 0,
        }}
      >
        {ASCII_ART}
      </pre>
    </div>
  );
}
