import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, useConvexAuth } from "convex/react";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";

export default function AuthLayout() {
  const { signOut } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/signin");
  }, [isAuthenticated, isLoading]);
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center border-b border-black px-4 py-3 gap-4">
        <Link to="/app" className="font-bold">
          Quizlet Clone
        </Link>
        <Link to="/app/manage-decks" className="border border-black px-3 py-1">
          Manage Decks
        </Link>
        <Link to="/app/play" className="border border-black px-3 py-1">
          Play
        </Link>
        <Link to="/app/groups" className="border border-black px-3 py-1">
          Groups
        </Link>
        <Link to="/app/profile" className="border border-black px-3 py-1">
          Profile
        </Link>
        <div className="flex-1"></div>
        <Link to="/about" className="border border-black px-3 py-1">
          About
        </Link>
        <Authenticated>
          <button onClick={signOut} className="border border-black px-3 py-1">
            Sign Out
          </button>
        </Authenticated>
      </nav>
      <Outlet />
    </div>
  );
}
