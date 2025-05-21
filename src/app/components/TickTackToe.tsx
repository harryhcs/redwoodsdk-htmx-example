"use client";
import { useEffect, useState } from "react";

export default function TickTackToe() {
  type Player = "X" | "O";
  const [board, setBoard] = useState<Array<Player | "">>(Array(9).fill(""));
  const [winner, setWinner] = useState<Player | "tie" | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // player is X

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (b: Array<Player | "">): Player | "tie" | null => {
    for (const [a, c, d] of lines) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a] as Player;
    }
    return b.every((sq) => sq) ? "tie" : null;
  };

  const handleClick = (idx: number) => {
    if (!isPlayerTurn || board[idx] || winner) return;
    const newBoard = board.slice();
    newBoard[idx] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  // CPU move
  useEffect(() => {
    const currentWinner = checkWinner(board);
    if (currentWinner) {
      setWinner(currentWinner);
      return;
    }

    if (!isPlayerTurn) {
      const empty = board
        .map((v, i) => (v === "" ? i : null))
        .filter((v) => v !== null) as number[];
      if (empty.length === 0) return;
      const move = empty[Math.floor(Math.random() * empty.length)];
      const newBoard = board.slice();
      newBoard[move] = "O";
      // slight delay for realism
      const id = setTimeout(() => {
        setBoard(newBoard);
        setIsPlayerTurn(true);
      }, 400);
      return () => clearTimeout(id);
    }
  }, [board, isPlayerTurn]);

  useEffect(() => {
    const w = checkWinner(board);
    if (w) setWinner(w);
  }, [board]);

  const reset = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setIsPlayerTurn(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-mono px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2 w-72">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="h-24 w-24 md:h-28 md:w-28 bg-white/10 hover:bg-white/20 flex items-center justify-center text-4xl md:text-5xl font-bold rounded shadow-inner focus:outline-none"
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <div className="mt-6 text-2xl md:text-3xl font-semibold">
          {winner === "tie" ? "Itʼs a tie!" : `${winner} wins!`}
        </div>
      )}

      <button
        onClick={reset}
        className="mt-6 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded shadow"
      >
        Reset Game
      </button>
    </div>
  );
}   