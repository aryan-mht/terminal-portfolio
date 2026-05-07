const ASCII_ART = ` █████╗  ██████╗  ██╗   ██╗ █████╗  ███╗   ██╗
██╔══██╗ ██╔══██╗ ╚██╗ ██╔╝██╔══██╗ ████╗  ██║
███████║ ██████╔╝  ╚████╔╝ ███████║ ██╔██╗ ██║
██╔══██║ ██╔══██╗   ╚██╔╝  ██╔══██║ ██║╚██╗██║
██║  ██║ ██║  ██║    ██║   ██║  ██║ ██║ ╚████║
╚═╝  ╚═╝ ╚═╝  ╚═╝    ╚═╝   ╚═╝  ╚═╝ ╚═╝  ╚═══╝`;

export function AsciiName() {
  return (
    <div
      aria-label="Aryan"
      style={{
        fontFamily: 'var(--font-ascii)',
        fontSize: 'clamp(0.7rem, 1.7vw, 1.25rem)',
        lineHeight: 1,
        color: '#ffffff',
        margin: 0,
        padding: 0,
        whiteSpace: 'pre',
        fontWeight: 700,
        letterSpacing: 0,
        overflow: 'hidden',
      }}
    >
      {ASCII_ART}
    </div>
  );
}
