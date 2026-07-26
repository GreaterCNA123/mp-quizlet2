import { useState } from "react";
import { useNavigate, useParams } from "react-router";

// mock_up: stand-in quiz content + live player scores until real group
// quiz sessions exist
const mock_up_questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2,
  },
  {
    question: "2 + 2 * 2 = ?",
    options: ["6", "8", "4", "2"],
    answer: 0,
  },
];

const mock_up_other_players = [
  { name: "Jordan", score: 1 },
  { name: "Sam", score: 0 },
];

export default function GroupQuizPage() {
  const { groupId, deckId } = useParams();
  const navigate = useNavigate();

  const [mock_up_index, mock_up_setIndex] = useState(0);
  const [mock_up_selected, mock_up_setSelected] = useState<number | null>(null);
  const [mock_up_score, mock_up_setScore] = useState(0);

  const current = mock_up_questions[mock_up_index];
  const isLast = mock_up_index === mock_up_questions.length - 1;

  function mock_up_selectAnswer(i: number) {
    if (mock_up_selected !== null) return;
    mock_up_setSelected(i);
    if (i === current.answer) mock_up_setScore((s) => s + 1);
  }

  function mock_up_next() {
    if (isLast) {
      navigate(`/app/groups/${groupId}/quiz/${deckId}/results`, {
        state: { mock_up_score, mock_up_total: mock_up_questions.length },
      });
      return;
    }
    mock_up_setIndex((i) => i + 1);
    mock_up_setSelected(null);
  }

  return (
    <div className="flex flex-col items-center gap-y-6 p-6 max-w-xl mx-auto">
      <div className="w-full flex items-center justify-between text-sm">
        <span>Group: {groupId}</span>
        <span>
          Question {mock_up_index + 1} / {mock_up_questions.length}
        </span>
      </div>

      <section className="w-full border border-black p-2 flex gap-x-4 text-sm">
        <span className="font-bold">Live scores (mock_up):</span>
        <span>You: {mock_up_score}</span>
        {mock_up_other_players.map((player) => (
          <span key={player.name}>
            {player.name}: {player.score}
          </span>
        ))}
      </section>

      <h1 className="text-2xl font-bold text-center">{current.question}</h1>

      <div className="w-full flex flex-col gap-y-2">
        {current.options.map((option, i) => {
          const isChosen = mock_up_selected === i;
          const isCorrect = i === current.answer;
          const showState = mock_up_selected !== null;
          return (
            <button
              key={i}
              onClick={() => mock_up_selectAnswer(i)}
              disabled={mock_up_selected !== null}
              className={`border border-black px-3 py-2 text-left ${
                showState && isCorrect
                  ? "bg-black text-white"
                  : showState && isChosen
                    ? "line-through"
                    : ""
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {mock_up_selected !== null && (
        <button
          className="border border-black px-4 py-2"
          onClick={mock_up_next}
        >
          {isLast ? "See Results" : "Next Question"}
        </button>
      )}
    </div>
  );
}
