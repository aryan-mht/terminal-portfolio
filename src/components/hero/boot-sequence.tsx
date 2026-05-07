export function BootSequence() {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono), monospace',
        marginTop: '2rem',
        lineHeight: 1.8,
      }}
    >
      <div
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#ffffff',
        }}
      >
        Welcome to Aryan&apos;s Terminal Portfolio
      </div>
      <div
        style={{
          fontSize: '1rem',
          color: '#d1d5db',
          marginTop: '0.5rem',
        }}
      >
        Type &apos;?&apos; or &apos;help&apos; to view a list of available commands.
      </div>
      <div
        style={{
          fontSize: '1rem',
          color: '#d1d5db',
          marginTop: '0.5rem',
        }}
      >
        visitor@aryan.me:~$
      </div>
    </div>
  );
}
