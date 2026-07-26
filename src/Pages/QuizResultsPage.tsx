import { Link, useLocation, useParams } from "react-router";

// mock_up: leaderboard has no backend yet, shown to preview the group-results layout
const mock_up_leaderboard = [
  { name: "You", score: 3 },
  { name: "Jordan", score: 3 },
  { name: "Sam", score: 2 },
  { name: "Riley", score: 1 },
];

export default function QuizResultsPage() {
  const { deckId, groupId } = useParams();
  const location = useLocation();

  // mock_up: score/total passed via router state from the mock quiz flow;
  // falls back to placeholder numbers if visited directly
  const state = (location.state ?? {}) as {
    mock_up_score?: number;
    mock_up_total?: number;
  };
  const mock_up_score = state.mock_up_score ?? 2;
  const mock_up_total = state.mock_up_total ?? 3;

  return (
    <div className="flex flex-col items-center gap-y-6 p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Results</h1>
      <div className="text-lg">
        You scored {mock_up_score} / {mock_up_total}
      </div>

      {groupId && (
        <section className="w-full flex flex-col gap-y-2">
          <h2 className="text-lg font-bold">Leaderboard</h2>
          <table className="w-full border border-black text-sm">
            <thead>
              <tr className="border-b border-black">
                <th className="text-left px-2 py-1">Player</th>
                <th className="text-left px-2 py-1">Score</th>
              </tr>
            </thead>
            <tbody>
              {mock_up_leaderboard.map((row) => (
                <tr key={row.name} className="border-b border-black">
                  <td className="px-2 py-1">{row.name}</td>
                  <td className="px-2 py-1">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <div className="flex gap-x-2">
        <Link to={`/app/play/${deckId}`} className="border border-black px-3 py-2">
          Play Again
        </Link>
        <Link to="/app/play" className="border border-black px-3 py-2">
          Back to Play
        </Link>
      </div>
    </div>
  );
}
