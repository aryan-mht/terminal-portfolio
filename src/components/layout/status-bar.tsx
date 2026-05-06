export function StatusBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4"
      style={{
        height: 'var(--status-bar-height)',
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        color: 'var(--color-muted)',
        fontSize: 'var(--text-xs)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <span>—°C</span>
      <span>aryan.dev</span>
      <span>May 6th, 2026&nbsp;&nbsp;00:00:00</span>
    </div>
  );
}
