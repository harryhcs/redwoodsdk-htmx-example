"use client";
import { useState } from "react";

const choices = ["Rock", "Paper", "Scissors"] as const;
type Choice = typeof choices[number];

type Result = "win" | "lose" | "tie";

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });

  const playRound = (choice: Choice) => {
    const comp = choices[Math.floor(Math.random() * 3)];
    const res = determineResult(choice, comp);

    setPlayerChoice(choice);
    setComputerChoice(comp);
    setResult(res);
    setScore((s) => ({
      wins: s.wins + (res === "win" ? 1 : 0),
      losses: s.losses + (res === "lose" ? 1 : 0),
      ties: s.ties + (res === "tie" ? 1 : 0),
    }));
  };

  const determineResult = (player: Choice, computer: Choice): Result => {
    if (player === computer) return "tie";
    if (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissors" && computer === "Paper")
    )
      return "win";
    return "lose";
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 text-white font-mono px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow">Rock Paper Scissors</h1>

      <div className="flex space-x-4 mb-8">
        {choices.map((c) => (
          <button
            key={c}
            onClick={() => playRound(c)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded shadow"
          >
            {c}
          </button>
        ))}
      </div>

      {result && (
        <div className="text-center mb-4">
          <p className="text-xl md:text-2xl mb-2">
            You chose <span className="font-bold">{playerChoice}</span>, computer chose {" "}
            <span className="font-bold">{computerChoice}</span>.
          </p>
          <p className="text-2xl md:text-3xl font-semibold capitalize">
            {result === "tie" ? "It's a tie!" : result === "win" ? "You win!" : "You lose!"}
          </p>
        </div>
      )}

      <button
        onClick={resetGame}
        className="mb-6 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded shadow"
      >
        Play Again
      </button>

      <div className="mt-auto text-sm opacity-80">
        Score: {score.wins}W / {score.losses}L / {score.ties}T
      </div>
    </div>
  );
} 