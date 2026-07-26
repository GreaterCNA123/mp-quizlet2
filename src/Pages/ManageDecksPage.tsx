import { useState } from "react";
import { Link } from "react-router";

// mock_up: stand-in for the signed-in user's decks until a real query exists
const mock_up_initial_decks = [
  { id: "deck_1", title: "Spanish Vocab", questionCount: 24, isPublic: true },
  { id: "deck_2", title: "US History", questionCount: 40, isPublic: false },
  { id: "deck_3", title: "Organic Chemistry", questionCount: 15, isPublic: false },
];

export default function ManageDecksPage() {
  const [mock_up_decks, mock_up_setDecks] = useState(mock_up_initial_decks);

  // mock_up: pretend delete, only updates local state
  function mock_up_deleteDeck(id: string) {
    mock_up_setDecks((decks) => decks.filter((deck) => deck.id !== id));
  }

  return (
    <div className="flex flex-col gap-y-4 p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Decks</h1>
        <Link to="/app/manage-decks/new" className="border border-black px-3 py-1">
          New deck
        </Link>
      </div>

      {mock_up_decks.length === 0 ? (
        <div className="text-sm">No decks yet.</div>
      ) : (
        <div className="flex flex-col gap-y-2">
          {mock_up_decks.map((deck) => (
            <div
              key={deck.id}
              className="border border-black p-3 flex items-center justify-between"
            >
              <div>
                <div className="font-bold">{deck.title}</div>
                <div className="text-sm">
                  {deck.questionCount} questions ·{" "}
                  {deck.isPublic ? "Public" : "Private"}
                </div>
              </div>
              <div className="flex gap-x-2">
                <Link
                  to={`/app/manage-decks/${deck.id}`}
                  className="border border-black px-3 py-1"
                >
                  Edit
                </Link>
                <Link
                  to={`/app/play/${deck.id}`}
                  className="border border-black px-3 py-1"
                >
                  Play
                </Link>
                <button
                  onClick={() => mock_up_deleteDeck(deck.id)}
                  className="border border-black px-3 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
