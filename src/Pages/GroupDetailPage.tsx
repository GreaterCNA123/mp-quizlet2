import { useState } from "react";
import { Link, useParams } from "react-router";

// mock_up: stand-in group data until real group queries exist.
// "m1" ("You") is the group leader here so the leader-only controls below
// are visible to try out; a real implementation would derive both the
// member list and the signed-in user's id from the backend.
const mock_up_currentUserId = "m1";

const mock_up_members = [
  { id: "m1", name: "You", isLeader: true },
  { id: "m2", name: "Jordan", isLeader: false },
  { id: "m3", name: "Sam", isLeader: false },
  { id: "m4", name: "Riley", isLeader: false },
];

const mock_up_initial_decks = [
  { id: "deck_1", title: "Spanish Vocab" },
  { id: "deck_2", title: "US History" },
];

// mock_up: per-deck results. A deck's winners is normally one name, but a
// tie lists everyone who tied for first, and everyone listed earns 1 point.
const mock_up_deck_results = [
  { deckId: "deck_1", winners: ["Jordan"] },
  { deckId: "deck_2", winners: ["You", "Sam"] },
];

export default function GroupDetailPage() {
  const { groupId } = useParams();

  // mock_up: invite input has no backend mutation yet
  const [mock_up_inviteEmail, mock_up_setInviteEmail] = useState("");

  // mock_up: "adding" a deck just appends to local state, no mutation yet
  const [mock_up_decks, mock_up_setDecks] = useState(mock_up_initial_decks);

  const mock_up_isLeader = mock_up_members.some(
    (member) => member.id === mock_up_currentUserId && member.isLeader,
  );

  function mock_up_addDeck() {
    const nextNumber = mock_up_decks.length + 1;
    mock_up_setDecks((decks) => [
      ...decks,
      { id: `mock_up_deck_${nextNumber}`, title: `New Deck ${nextNumber}` },
    ]);
  }

  // mock_up: win = 1 point, tie = 1 point to everyone who tied, tallied
  // across every deck result above
  const mock_up_points = new Map<string, number>(
    mock_up_members.map((member) => [member.name, 0]),
  );
  for (const result of mock_up_deck_results) {
    for (const winner of result.winners) {
      mock_up_points.set(winner, (mock_up_points.get(winner) ?? 0) + 1);
    }
  }
  const mock_up_standings = [...mock_up_points.entries()].sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <div className="flex flex-col gap-y-6 p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Group: {groupId}</h1>

      <section className="flex flex-col gap-y-2">
        <h2 className="text-lg font-bold">Members</h2>
        <ul className="flex flex-col gap-y-1 text-sm">
          {mock_up_members.map((member) => (
            <li key={member.id} className="border border-black px-2 py-1">
              {member.isLeader ? "👑 " : ""}
              {member.name}
            </li>
          ))}
        </ul>
        <div className="flex gap-x-2">
          <input
            className="border border-black px-2 py-1 flex-1"
            placeholder="invite by email"
            value={mock_up_inviteEmail}
            onChange={(e) => mock_up_setInviteEmail(e.currentTarget.value)}
          />
          <button className="border border-black px-3 py-1">Invite</button>
        </div>
      </section>

      <section className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Shared Decks</h2>
          {mock_up_isLeader && (
            <button
              onClick={mock_up_addDeck}
              className="border border-black px-3 py-1"
            >
              Add Deck
            </button>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          {mock_up_decks.map((deck) => (
            <div
              key={deck.id}
              className="border border-black px-3 py-2 flex items-center justify-between"
            >
              <span>{deck.title}</span>
              <Link
                to={`/app/groups/${groupId}/quiz/${deck.id}`}
                className="border border-black px-3 py-1"
              >
                Start Group Quiz
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-y-2">
        <h2 className="text-lg font-bold">Leaderboard</h2>

        <div className="text-sm font-bold">Deck Winners</div>
        <table className="w-full border border-black text-sm">
          <thead>
            <tr className="border-b border-black">
              <th className="text-left px-2 py-1">Deck</th>
              <th className="text-left px-2 py-1">Winner(s)</th>
            </tr>
          </thead>
          <tbody>
            {mock_up_deck_results.map((result) => {
              const deck = mock_up_decks.find((d) => d.id === result.deckId);
              return (
                <tr key={result.deckId} className="border-b border-black">
                  <td className="px-2 py-1">{deck?.title ?? result.deckId}</td>
                  <td className="px-2 py-1">
                    {result.winners.join(" & ")}
                    {result.winners.length > 1 ? " (tie)" : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-sm font-bold mt-2">Accumulated Points</div>
        <table className="w-full border border-black text-sm">
          <thead>
            <tr className="border-b border-black">
              <th className="text-left px-2 py-1">Player</th>
              <th className="text-left px-2 py-1">Points</th>
            </tr>
          </thead>
          <tbody>
            {mock_up_standings.map(([name, points]) => (
              <tr key={name} className="border-b border-black">
                <td className="px-2 py-1">{name}</td>
                <td className="px-2 py-1">{points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
