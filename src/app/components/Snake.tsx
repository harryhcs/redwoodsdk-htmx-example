"use client";
import { useEffect, useRef, useState } from "react";

const BOARD_SIZE = 20; // 20x20 grid
const SPEED = 120; // ms per tick

type Coord = { x: number; y: number };

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

function getRandomCoord(exclude: Coord[]): Coord {
  while (true) {
    const coord = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
    if (!exclude.some((c) => c.x === coord.x && c.y === coord.y)) return coord;
  }
}

export default function Snake() {
  const initialSnake: Coord[] = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];

  const [snake, setSnake] = useState<Coord[]>(initialSnake);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [apple, setApple] = useState<Coord>(() => getRandomCoord(initialSnake));
  const [gameOver, setGameOver] = useState(false);

  // Keep latest direction in a ref to avoid stale closure in interval
  const dirRef = useRef(direction);
  dirRef.current = direction;

  // Handle keyboard input
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameOver) return;
      switch (e.key) {
        case "ArrowUp":
          if (dirRef.current !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (dirRef.current !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (dirRef.current !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (dirRef.current !== "LEFT") setDirection("RIGHT");
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameOver]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    const id = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead: Coord = { ...head };
        switch (dirRef.current) {
          case "UP":
            newHead.y -= 1;
            break;
          case "DOWN":
            newHead.y += 1;
            break;
          case "LEFT":
            newHead.x -= 1;
            break;
          case "RIGHT":
            newHead.x += 1;
            break;
        }

        // Wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y < 0 ||
          newHead.y >= BOARD_SIZE
        ) {
          setGameOver(true);
          return prev;
        }

        // Self collision
        if (prev.some((c) => c.x === newHead.x && c.y === newHead.y)) {
          setGameOver(true);
          return prev;
        }

        const ateApple = newHead.x === apple.x && newHead.y === apple.y;
        const newSnake = [newHead, ...prev];
        if (!ateApple) newSnake.pop(); // move
        else setApple(getRandomCoord(newSnake));

        return newSnake;
      });
    }, SPEED);
    return () => clearInterval(id);
  }, [apple, gameOver]);

  const reset = () => {
    setSnake(initialSnake);
    setDirection("RIGHT");
    setApple(getRandomCoord(initialSnake));
    setGameOver(false);
  };

  const cellSize = 16; // px
  const boardPx = BOARD_SIZE * cellSize;

  const renderCells = () => {
    const cells = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const isSnake = snake.some((c) => c.x === x && c.y === y);
        const isApple = apple.x === x && apple.y === y;
        cells.push(
          <div
            key={`${x}-${y}`}
            className={`border border-black/20 ${
              isSnake ? "bg-lime-500" : isApple ? "bg-red-500" : "bg-black/10"
            }`}
            style={{ width: cellSize, height: cellSize }}
          />
        );
      }
    }
    return cells;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white font-mono px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow">Snake</h1>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, ${cellSize}px)`,
          width: boardPx,
        }}
      >
        {renderCells()}
      </div>

      <div className="mt-4 text-lg">
        Score: {snake.length - initialSnake.length}
      </div>

      {gameOver && (
        <div className="mt-4 text-2xl font-semibold">Game Over!</div>
      )}

      <button
        onClick={reset}
        className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded shadow"
      >
        {gameOver ? "Restart" : "Reset"}
      </button>

      <p className="mt-4 text-sm opacity-80">Use arrow keys to control the snake.</p>
    </div>
  );
} 