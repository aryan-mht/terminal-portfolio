const ASCII_ART = ` █████╗  ██████╗  ██╗   ██╗ █████╗  ███╗   ██╗
██╔══██╗ ██╔══██╗ ╚██╗ ██╔╝██╔══██╗ ████╗  ██║
███████║ ██████╔╝  ╚████╔╝ ███████║ ██╔██╗ ██║
██╔══██║ ██╔══██╗   ╚██╔╝  ██╔══██║ ██║╚██╗██║
██║  ██║ ██║  ██║    ██║   ██║  ██║ ██║ ╚████║
╚═╝  ╚═╝ ╚═╝  ╚═╝    ╚═╝   ╚═╝  ╚═╝ ╚═╝  ╚═══╝`;

export function AsciiName() {
  return (
    <pre
      aria-label="Aryan"
      style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: 'clamp(0.55rem, 1.6vw, 1.1rem)',
        lineHeight: 1,
        color: '#ffffff',
        margin: 0,
        padding: 0,
        whiteSpace: 'pre',
        overflow: 'visible',
        fontWeight: 400,
      }}
    >
      {ASCII_ART}
    </pre>
  );
}
