import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-10 p-6 max-w-3xl mx-auto">
      <section className="flex flex-col gap-y-3 border border-black p-6">
        <h1 className="text-3xl font-bold">Study together. Compete together.</h1>
        <p>
          Create decks, quiz yourself solo, or challenge your group and see
          who knows the material best.
        </p>
        <div className="flex gap-x-3">
          <Link to="/signin" className="border border-black px-3 py-2">
            Sign In
          </Link>
          <Link to="/about" className="border border-black px-3 py-2">
            Learn more
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-y-3">
        <h2 className="text-xl font-bold">What you can do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-black p-4">
            <h3 className="font-bold">Create Decks</h3>
            <p className="text-sm">Build flashcard decks on any topic.</p>
          </div>
          <div className="border border-black p-4">
            <h3 className="font-bold">Quiz Yourself</h3>
            <p className="text-sm">Play solo to test what you know.</p>
          </div>
          <div className="border border-black p-4">
            <h3 className="font-bold">Compete in Groups</h3>
            <p className="text-sm">
              Join a group and see who ranks highest.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
