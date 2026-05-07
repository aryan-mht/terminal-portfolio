export type Move = "rock" | "paper" | "scissors";
export type Result = "win" | "loss" | "tie";

const score = { wins: 0, losses: 0, ties: 0 };

const beats: Record<Move, Move> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

export function play(player: Move): {
  player: Move;
  computer: Move;
  result: Result;
  score: { wins: number; losses: number; ties: number };
} {
  const moves: Move[] = ["rock", "paper", "scissors"];
  const computer = moves[Math.floor(Math.random() * 3)] as Move;
  let result: Result;
  if (player === computer) {
    result = "tie";
    score.ties += 1;
  } else if (beats[player] === computer) {
    result = "win";
    score.wins += 1;
  } else {
    result = "loss";
    score.losses += 1;
  }
  return { player, computer, result, score: { ...score } };
}
