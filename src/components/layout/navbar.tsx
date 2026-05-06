'use client';

const NAV_COMMANDS = [
  'help',
  'about',
  'projects',
  'skills',
  'experience',
  'contact',
  'clear',
  'refresh',
] as const;

export function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
      style={{
        height: 'var(--navbar-height)',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span
          className="rounded-full"
          style={{ width: 12, height: 12, background: '#ff5f57' }}
        />
        <span
          className="rounded-full"
          style={{ width: 12, height: 12, background: '#ffbd2e' }}
        />
        <span
          className="rounded-full"
          style={{ width: 12, height: 12, background: '#28c840' }}
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {NAV_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            aria-label={`Run ${cmd} command`}
            className="shrink-0 rounded px-3 py-0.5 text-xs"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-accent)',
              background: 'transparent',
              border: '1px solid var(--color-accent)',
              transition: 'background-color 0.1s ease, border-color 0.1s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                'rgba(0, 255, 159, 0.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                'transparent';
            }}
          >
            {cmd}
          </button>
        ))}
      </div>
    </nav>
  );
}
