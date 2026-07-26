import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

// mock_up: stats have no backend aggregation yet
const mock_up_stats = [
  { label: "Decks created", value: 3 },
  { label: "Quizzes taken", value: 17 },
  { label: "Average score", value: "82%" },
  { label: "Groups joined", value: 2 },
];

export default function ProfilePage() {
  const { signOut } = useAuthActions();

  // mock_up: settings form is local-only, no backend mutation yet
  const [mock_up_displayName, mock_up_setDisplayName] = useState("Player");

  return (
    <div className="flex flex-col gap-y-6 p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Profile</h1>

      <section className="grid grid-cols-2 gap-3">
        {mock_up_stats.map((stat) => (
          <div key={stat.label} className="border border-black p-3">
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-sm">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-y-2">
        <h2 className="text-lg font-bold">Settings</h2>
        <label className="flex flex-col gap-y-1 text-sm">
          Display name
          <input
            className="border border-black px-2 py-1"
            value={mock_up_displayName}
            onChange={(e) => mock_up_setDisplayName(e.currentTarget.value)}
          />
        </label>
      </section>

      <button onClick={signOut} className="border border-black px-3 py-2 w-fit">
        Sign Out
      </button>
    </div>
  );
}
