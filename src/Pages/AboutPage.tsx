export default function AboutPage() {
  return (
    <div className="flex flex-col gap-y-4 p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">About</h1>
      <p>
        This is a Quizlet-style study tool with a group twist. Create decks
        of flashcard-style questions, quiz yourself solo, or join a group to
        compete with friends and see who scores highest on a given topic.
      </p>
      <ul className="list-disc list-inside text-sm flex flex-col gap-y-1">
        <li>Create and manage your own decks</li>
        <li>Quiz yourself solo, or browse public decks made by others</li>
        <li>Join a group, share decks, and compete on a leaderboard</li>
      </ul>
    </div>
  );
}
