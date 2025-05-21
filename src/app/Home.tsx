export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
          hx-get="/fragment?component=TickTackToe"
          hx-target="#react-slot"
          hx-swap="innerHTML"
        >
          Load Tic-Tac-Toe
        </button>

        {/* Button #2 – Rock-Paper-Scissors */}
        <button
          className="bg-green-500 text-white px-3 py-2 rounded"
          hx-get="/fragment?component=RockPaperScissors"
          hx-target="#react-slot"
          hx-swap="innerHTML"
        >
          Load Rock-Paper-Scissors
        </button>

        <button
          className="bg-red-500 text-white px-3 py-2 rounded"
          hx-get="/fragment?component=Snake"
          hx-target="#react-slot"
          hx-swap="innerHTML"
        >
          Load Snake
        </button>
        <button
          className="bg-yellow-500 text-white px-3 py-2 rounded"
          hx-get="/server-time"
          hx-target="#react-slot"
          hx-swap="innerHTML"
        >
          Load Server Time
        </button>
      </div>


      {/* HTMX will replace the contents of this div with the fragment */}
      <div id="react-slot" />
    </div>
  );
}
