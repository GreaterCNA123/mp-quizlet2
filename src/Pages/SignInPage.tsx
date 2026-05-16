import { useAuthActions } from "@convex-dev/auth/react";

export default function SigninPage() {
  const signIn = useAuthActions();
  function handleSignUp(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("flow", "signUp");
    signIn("password", formData);
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="btn h-100 w-50 bg-white grid grid-rows-2">
        <div className="grid grid-cols-2">
          <button className="w-10 bg-white">Sign In</button>
          <button className="w-10 bg-white">Sign Up</button>
        </div>
        <form className="grid grid-rows-3" onClick={handleSignUp}>
          <input type="text" name="email" placeholder="email"></input>
          <input type="password" name="password" placeholder="password"></input>
          <button> </button>
        </form>
      </div>
    </div>
  );
}
