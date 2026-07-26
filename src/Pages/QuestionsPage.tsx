import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Link, useParams } from "react-router";

export default function QuestionsPage() {
  const { deckId } = useParams();
  const questions = useQuery(api.deck.getDeck, { deckId: deckId as any });

  // mock_up: title/settings editing has no backend mutation yet, so this
  // section is local-only state to preview the editing UI
  const [mock_up_title, mock_up_setTitle] = useState("Untitled Deck");
  const [mock_up_isPublic, mock_up_setIsPublic] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Deck</h1>
        <Link to={`/app/play/${deckId}`} className="border border-black px-3 py-1">
          Play this deck
        </Link>
      </div>

      <section className="flex flex-col gap-y-2 border border-black p-4">
        <label className="flex flex-col gap-y-1 text-sm">
          Title
          <input
            className="border border-black px-2 py-1"
            value={mock_up_title}
            onChange={(e) => mock_up_setTitle(e.currentTarget.value)}
          />
        </label>
        <div className="flex items-center gap-x-2">
          <button
            type="button"
            className={`border border-black px-3 py-1 ${mock_up_isPublic ? "bg-black text-white" : ""}`}
            onClick={() => mock_up_setIsPublic(true)}
          >
            Public
          </button>
          <button
            type="button"
            className={`border border-black px-3 py-1 ${!mock_up_isPublic ? "bg-black text-white" : ""}`}
            onClick={() => mock_up_setIsPublic(false)}
          >
            Private
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-y-2">
        <h2 className="text-lg font-bold">Questions</h2>
        {questions === undefined ? (
          <div className="text-sm">Loading...</div>
        ) : questions.length === 0 ? (
          <div className="text-sm">No questions yet.</div>
        ) : (
          <div className="flex flex-col gap-y-2">
            {questions.map((question) => (
              <div key={question._id} className="border border-black p-3">
                <div className="font-bold">{question.question}</div>
                <ul className="text-sm flex flex-col gap-y-1 mt-1">
                  {question.options.map((option: string, i: number) => (
                    <li key={i}>
                      {i === question.answer ? "[correct] " : ""}
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
