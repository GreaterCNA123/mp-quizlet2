import { useState } from "react";
import { Link } from "react-router";

// mock_up: stand-in dashboard data until real deck/group/activity queries exist
const mock_up_decks = [
  { id: "deck_1", title: "Spanish Vocab", questionCount: 24 },
  { id: "deck_2", title: "US History", questionCount: 40 },
];

const mock_up_groups = [
  { id: "group_1", name: "Bio Study Group", memberCount: 6 },
];

const mock_up_activity = [
  { id: "a1", text: "You scored 8/10 on \"Spanish Vocab\"" },
  { id: "a2", text: "Bio Study Group finished a group quiz" },
  { id: "a3", text: "You created a new deck \"US History\"" },
];

export default function DashboardPage() {
  // mock_up: local state for stats, not backed by a real query
  const [mock_up_streak] = useState(3);

  return (
    <div className="flex flex-col gap-y-8 p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm">Current streak: {mock_up_streak} days</div>
      </div>

      <section className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Manage Decks</h2>
          <div className="flex gap-x-2">
            <Link to="/app/manage-decks" className="border border-black px-3 py-1">
              View all
            </Link>
            <Link to="/app/manage-decks/new" className="border border-black px-3 py-1">
              New deck
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mock_up_decks.map((deck) => (
            <Link
              key={deck.id}
              to={`/app/manage-decks/${deck.id}`}
              className="border border-black p-3"
            >
              <div className="font-bold">{deck.title}</div>
              <div className="text-sm">{deck.questionCount} questions</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Your Groups</h2>
          <div className="flex gap-x-2">
            <Link to="/app/groups" className="border border-black px-3 py-1">
              View all
            </Link>
            <Link to="/app/groups/new" className="border border-black px-3 py-1">
              New group
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mock_up_groups.map((group) => (
            <Link
              key={group.id}
              to={`/app/groups/${group.id}`}
              className="border border-black p-3"
            >
              <div className="font-bold">{group.name}</div>
              <div className="text-sm">{group.memberCount} members</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-y-2">
        <h2 className="text-lg font-bold">Play</h2>
        <Link to="/app/play" className="border border-black px-3 py-1 w-fit">
          Find a deck to play
        </Link>
      </section>

      <section className="flex flex-col gap-y-2">
        <h2 className="text-lg font-bold">Recent Activity</h2>
        <ul className="flex flex-col gap-y-1 text-sm">
          {mock_up_activity.map((item) => (
            <li key={item.id} className="border border-black px-3 py-2">
              {item.text}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
