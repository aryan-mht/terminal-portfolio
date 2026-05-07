'use client';

import { useEffect, useState } from "react";

interface Props {
  seconds: number;
}

function beep() {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
    osc.onended = () => ctx.close();
  } catch {
    // ignore — audio unavailable
  }
}

export function OutputTimer({ seconds }: Props) {
  const [remaining, setRemaining] = useState(seconds);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (remaining <= 0) {
      setDone(true);
      beep();
      return;
    }
    const id = window.setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => window.clearTimeout(id);
  }, [remaining]);

  return (
    <div style={{ fontFamily: "var(--font-mono)" }}>
      <div style={{ color: "var(--color-muted)" }}>
        Timer started for {seconds} second{seconds === 1 ? "" : "(s)"}...
      </div>
      {!done ? (
        <div style={{ color: "var(--color-text)" }}>
          {remaining} second{remaining === 1 ? "" : "s"} remaining
        </div>
      ) : (
        <div style={{ color: "var(--color-accent)" }}>Timer finished!</div>
      )}
    </div>
  );
}
