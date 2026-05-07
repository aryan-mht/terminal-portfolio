'use client';

import { useTerminalContext } from '@/lib/terminal-context';

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
  const { runCommand } = useTerminalContext();
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
      style={{
        height: 'var(--navbar-height)',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center gap-2" aria-hidden="true">
        <span
          className="rounded-full"
          style={{ width: 16, height: 16, background: '#ff5f57' }}
        />
        <span
          className="rounded-full"
          style={{ width: 16, height: 16, background: '#ffbd2e' }}
        />
        <span
          className="rounded-full"
          style={{ width: 16, height: 16, background: '#28c840' }}
        />
      </div>

      <div className="flex items-center gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {NAV_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            aria-label={`Run ${cmd} command`}
            onClick={() => runCommand(cmd)}
            className="shrink-0 rounded px-4 py-1.5"
            style={{
              fontSize: 'var(--text-base)',
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
