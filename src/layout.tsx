import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";

export default function Layout() {
  const { signOut } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) navigate("/member");
  }, [isAuthenticated, isLoading]);
  return (
    <div className="h-screen bg-yellow-500 flex flex-col">
      <nav className="flex grid-cols-2 rounded-xl border-2 p-5border-solid divide-black bg-primary text-primary-content space-x-2">
        <Link to="/" className="border-2 border-solid p-2 w-16">
          <button>Home</button>
        </Link>
        <Link to="/play" className="border-2 border-solid p-2">
          <button>Play</button>
        </Link>
        <div className="flex-1"></div>
        <Authenticated>
          <div className="border-2 border-solid p-2">Signed Up</div>
        </Authenticated>
        <Unauthenticated>
          <div className="border-2 border-solid p-2">Guest</div>
        </Unauthenticated>
        <Link to="/about" className="border-2 border-solid p-2">
          <button>About</button>
        </Link>
        <Link to="/signin" className="border-2 border-solid p-2">
          <button>Sign-In</button>
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
