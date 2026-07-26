import { useState } from "react";
import { Link } from "react-router";

// mock_up: stand-in for the signed-in user's groups until a real query exists
const mock_up_initial_groups = [
  { id: "group_1", name: "Bio Study Group", memberCount: 6 },
  { id: "group_2", name: "CS 101 Crew", memberCount: 4 },
];

export default function GroupPage() {
  const [mock_up_groups] = useState(mock_up_initial_groups);

  return (
    <div className="flex flex-col gap-y-4 p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Groups</h1>
        <Link to="/app/groups/new" className="border border-black px-3 py-1">
          New group
        </Link>
      </div>

      {mock_up_groups.length === 0 ? (
        <div className="text-sm">No groups yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mock_up_groups.map((group) => (
            <Link
              key={group.id}
              to={`/app/groups/${group.id}`}
              className="border border-black p-4"
            >
              <div className="font-bold">{group.name}</div>
              <div className="text-sm">{group.memberCount} members</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
