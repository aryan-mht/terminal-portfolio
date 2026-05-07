'use client';

import type { Move, Result } from "@/lib/rps-score";

interface Props {
  player: Move;
  computer: Move;
  result: Result;
  score: { wins: number; losses: number; ties: number };
}

const ICONS: Record<Move, string> = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️",
};

const RESULT_LINE: Record<Result, string> = {
  win: "You win!",
  loss: "You lose!",
  tie: "Tie!",
};

export function OutputRps({ player, computer, result, score }: Props) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", whiteSpace: "pre-wrap" }}>
      <div>
        <span style={{ color: "var(--color-muted)" }}>You:      </span>
        <span style={{ color: "var(--color-text)" }}>
          {ICONS[player]} {player}
        </span>
      </div>
      <div>
        <span style={{ color: "var(--color-muted)" }}>Computer: </span>
        <span style={{ color: "var(--color-text)" }}>
          {ICONS[computer]} {computer}
        </span>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <span style={{ color: "var(--color-accent)" }}>Result: </span>
        <span style={{ color: "var(--color-text)" }}>
          {RESULT_LINE[result]} Computer chose {computer}.
        </span>
      </div>
      <div style={{ color: "var(--color-muted)" }}>
        Score this session: {score.wins}W – {score.losses}L – {score.ties}T
      </div>
    </div>
  );
}
