import { usePaginatedQuery, useQuery } from "convex/react";
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
    <div className="flex flex-col gap-y-5 items-center">
      <Search />
      <div className="bg-white flex grid-col-5 gap-x-4">
        {decks.map((deck) =>
          deck.isPublic === true ? <Card deck={deck} /> : "",
        )}
      </div>
      {status === "CanLoadMore" && (
        <button className="btn btn-primary" onClick={() => loadMore(1)}>
          Load more
        </button>
      )}
    </div>
  );
}
export function Search() {
  return (
    <div className="w-10/12 mt-5 bg-white border">
      <input
        className="w-full text-black"
        placeholder="Search for Content"
      ></input>
    </div>
  );
}
export function Card({ deck }: { deck: any }) {
  let [nums, setNums] = useState(0);
  let [tags, setTags] = useState("Biology");

  return (
    <div className="btn bg-white h-60 w-60 grid grid-rows-4 gap-y-3">
      <div className="bg-blue-500 text-white">{deck.title}</div>
      <div className="bg-blue-500 h-20 rounded-2xl"></div>
      <div className="bg-blue-500 text-white h-20 flex">
        <div className="bg-white h-5 "></div>
      </div>
      <div className="bg-black grid grid-cols-2">
        <div className="btn bg-white text-black ">Likes: {nums}❤️</div>
        <div className="btn bg-white text-black">Tags: #{tags}</div>
      </div>
      <Link to={`/questions/${deck._id}`}>OPEN DECK</Link>
    </div>
  );
}
