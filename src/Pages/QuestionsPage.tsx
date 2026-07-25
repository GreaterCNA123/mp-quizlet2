import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams } from "react-router";

export default function QuestionsPage() {
  const { deckId } = useParams();
  const questions = useQuery(api.deck.getDeck, { deckId: deckId });

  return (
    <div className="flex flex-col gap-y-5 items-center">
      {questions.map((deck) => (
        <div key={deck._id} className="h-10 text-black">
          {deck.question}
        </div>
      ))}
    </div>
  );
}
