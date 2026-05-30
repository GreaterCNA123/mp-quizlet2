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
    navigate("/member");
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="btn h-100 w-100 bg-white flex flex-col justify-center">
        <div role="tablist" className="tabs tabs-lift">
          <a
            role="tab"
            className={`tab ${mode === "signIn" ? "tab-active" : ""}`}
            onClick={() => setMode("signIn")}
          >
            Sign In
          </a>
          <a
            role="tab"
            className={`tab ${mode === "signUp" ? "tab-active" : ""}`}
            onClick={() => setMode("signUp")}
          >
            Sign Up
          </a>
        </div>
        <form className="grid grid-rows-3" onSubmit={handleSignUp}>
          <input
            className="bg-gray-400 w-50 h-10"
            type="text"
            name="email"
            placeholder="email"
          ></input>
          <input
            className="bg-gray-400 w-50 h-10"
            type="password"
            name="password"
            placeholder="password"
          ></input>
          <button className="bg-black">
            {mode === "signUp" ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
