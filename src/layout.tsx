import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";

export default function Layout() {
  const { signOut } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) navigate("/app");
  }, [isAuthenticated, isLoading]);
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center border-b border-black px-4 py-3 gap-4">
        <Link to="/" className="font-bold">
          Quizlet Clone
        </Link>
        <div className="flex-1"></div>
        <Authenticated>
          <span className="text-sm">Signed in</span>
        </Authenticated>
        <Unauthenticated>
          <span className="text-sm">Guest</span>
        </Unauthenticated>
        <Link to="/about" className="border border-black px-3 py-1">
          About
        </Link>
        <Link to="/signin" className="border border-black px-3 py-1">
          Sign In
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
