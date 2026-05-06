import { AsciiName } from './ascii-name';
import { BootSequence } from './boot-sequence';

export function Hero() {
  return (
    <div
      style={{
        padding: 'var(--terminal-padding)',
        paddingTop: '2.5rem',
        paddingBottom: '2rem',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <AsciiName />
      <BootSequence />
    </div>
  );
}
