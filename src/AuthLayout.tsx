import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";

export default function AuthLayout() {
  const { signOut } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/play");
  }, [isAuthenticated, isLoading]);
  return (
    <div className="h-screen bg-black flex flex-col">
      <nav className="flex grid-cols-2 rounded-xl border-2 p-5border-solid divide-black bg-primary text-primary-content space-x-2">
        <Link to="/member/" className="border-2 border-solid p-2 w-16">
          <button>Home</button>
        </Link>
        <Link to="/member/group" className="border-2 border-solid p-2 w-16">
          <button>Group</button>
        </Link>
        <Link to="/member/create" className="border-2 border-solid p-2">
          <button>Create</button>
        </Link>
        <Link to="/member/play" className="border-2 border-solid p-2">
          <button>Play</button>
        </Link>
        <div className="flex-1"></div>
        <Link to="/member/about" className="border-2 border-solid p-2">
          <button>About</button>
        </Link>
        <Authenticated>
          <button
            onClick={signOut}
            className="border-2 border-solid p-2 border-black"
          >
            Sign Out
          </button>
        </Authenticated>
      </nav>
      <Outlet />
    </div>
  );
}
