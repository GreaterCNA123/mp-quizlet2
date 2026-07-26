import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function SigninPage() {
  const { signIn } = useAuthActions();
  const [mode, setMode] = useState("signIn");
  const navigate = useNavigate();

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("flow", mode);
    await signIn("password", formData);
    navigate("/app");
  }

  return (
    <div className="flex flex-1 justify-center items-center p-6">
      <div className="border border-black p-6 w-80 flex flex-col gap-y-4">
        <div className="flex border border-black">
          <button
            type="button"
            className={`flex-1 py-2 ${mode === "signIn" ? "bg-black text-white" : ""}`}
            onClick={() => setMode("signIn")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`flex-1 py-2 ${mode === "signUp" ? "bg-black text-white" : ""}`}
            onClick={() => setMode("signUp")}
          >
            Sign Up
          </button>
        </div>
        <form className="flex flex-col gap-y-3" onSubmit={handleSignUp}>
          <input
            className="border border-black px-2 py-2"
            type="text"
            name="email"
            placeholder="email"
          ></input>
          <input
            className="border border-black px-2 py-2"
            type="password"
            name="password"
            placeholder="password"
          ></input>
          <button className="border border-black py-2" type="submit">
            {mode === "signUp" ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
