export function BootSequence() {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        marginTop: '1.5rem',
        lineHeight: 2,
      }}
    >
      <div
        style={{
          fontSize: 'var(--text-base)',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '0.03em',
        }}
      >
        Welcome to Aryan&apos;s Terminal Portfolio
      </div>
      <div
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-muted)',
        }}
      >
        Type &apos;?&apos; or &apos;help&apos; to view a list of available commands.
      </div>
      <div
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-muted)',
          marginTop: '0.25rem',
        }}
      >
        visitor@aryan.me:~$
      </div>
    </div>
  );
}
