import { usePaginatedQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router";

export default function PlayPage() {
  const {
    loadMore,
    results: decks,
    status,
  } = usePaginatedQuery(api.deck.getDecks, {}, { initialNumItems: 2 });

  return (
    <div className="flex flex-col gap-y-5 items-center p-6">
      <Search />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {decks.map((deck) =>
          deck.isPublic === true ? <Card deck={deck} key={deck._id} /> : null,
        )}
      </div>
      {status === "CanLoadMore" && (
        <button
          className="border border-black px-3 py-1"
          onClick={() => loadMore(1)}
        >
          Load more
        </button>
      )}
    </div>
  );
}

export function Search() {
  // mock_up: no real search/filter wired up yet, input is decorative for now
  const [mock_up_query, mock_up_setQuery] = useState("");
  return (
    <div className="w-full max-w-md border border-black">
      <input
        className="w-full px-2 py-2"
        placeholder="Search for Content (mock_up, not wired up)"
        value={mock_up_query}
        onChange={(e) => mock_up_setQuery(e.currentTarget.value)}
      ></input>
    </div>
  );
}

export function Card({ deck }: { deck: any }) {
  // mock_up: likes/tags have no backend field yet, shown for layout only
  const mock_up_likes = 0;
  const mock_up_tag = "General";

  return (
    <div className="border border-black h-60 w-60 grid grid-rows-5 gap-y-2 p-3">
      <div className="font-bold">{deck.title}</div>
      <div className="border border-black"></div>
      <div className="text-sm">Questions: {deck.questions?.length ?? "?"}</div>
      <div className="grid grid-cols-2 gap-x-2 text-sm">
        <div className="border border-black px-2 py-1">
          Likes: {mock_up_likes}
        </div>
        <div className="border border-black px-2 py-1">Tag: #{mock_up_tag}</div>
      </div>
      <Link to={`/app/play/${deck._id}`} className="border border-black px-2 py-1 text-center">
        OPEN DECK
      </Link>
    </div>
  );
}
