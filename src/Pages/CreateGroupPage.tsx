import { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateGroupPage() {
  const navigate = useNavigate();

  // mock_up: form state only, no backend mutation to create a group yet
  const [mock_up_name, mock_up_setName] = useState("");
  const [mock_up_description, mock_up_setDescription] = useState("");
  const [mock_up_inviteEmail, mock_up_setInviteEmail] = useState("");
  const [mock_up_invitees, mock_up_setInvitees] = useState<string[]>([]);

  function mock_up_addInvitee() {
    if (!mock_up_inviteEmail) return;
    mock_up_setInvitees((list) => [...list, mock_up_inviteEmail]);
    mock_up_setInviteEmail("");
  }

  function mock_up_handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // mock_up: pretend to create the group, then navigate to a placeholder id
    navigate("/app/groups/mock_up_new_group");
  }

  return (
    <form
      className="flex flex-col gap-y-4 p-6 max-w-md mx-auto"
      onSubmit={mock_up_handleSubmit}
    >
      <h1 className="text-2xl font-bold">Create Group</h1>

      <label className="flex flex-col gap-y-1 text-sm">
        Group name
        <input
          className="border border-black px-2 py-1"
          value={mock_up_name}
          onChange={(e) => mock_up_setName(e.currentTarget.value)}
        />
      </label>

      <label className="flex flex-col gap-y-1 text-sm">
        Description
        <textarea
          className="border border-black px-2 py-1"
          value={mock_up_description}
          onChange={(e) => mock_up_setDescription(e.currentTarget.value)}
        />
      </label>

      <div className="flex flex-col gap-y-1 text-sm">
        Invite members
        <div className="flex gap-x-2">
          <input
            className="border border-black px-2 py-1 flex-1"
            placeholder="email"
            value={mock_up_inviteEmail}
            onChange={(e) => mock_up_setInviteEmail(e.currentTarget.value)}
          />
          <button
            type="button"
            className="border border-black px-3 py-1"
            onClick={mock_up_addInvitee}
          >
            Add
          </button>
        </div>
        {mock_up_invitees.length > 0 && (
          <ul className="flex flex-col gap-y-1 mt-1">
            {mock_up_invitees.map((email, i) => (
              <li key={i} className="border border-black px-2 py-1">
                {email}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className="border border-black px-3 py-2">
        Create Group
      </button>
    </form>
  );
}
