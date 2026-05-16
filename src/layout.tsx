import { Authenticated, Unauthenticated } from "convex/react";
import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="h-screen bg-yellow-500 flex flex-col">
      <nav className="flex grid-cols-2 rounded-xl border-2 p-5border-solid divide-black bg-primary text-primary-content space-x-2">
        <Link to="/" className="border-2 border-solid p-2 w-16">
          <button>HOME</button>
        </Link>
        <Link to="/create" className="border-2 border-solid p-2">
          <button>CREATE</button>
        </Link>
        <Link to="/FillPage" className="border-2 border-solid p-2">
          <button>Fill</button>
        </Link>
        <Link to="/play" className="border-2 border-solid p-2">
          <button>PLAY</button>
        </Link>
        <div className="flex-1"></div>
        <Link to="/about" className="border-2 border-solid p-2">
          <button>ABOUT</button>
        </Link>
        <Link to="/signin" className="border-2 border-solid p-2">
          <button>SIGN-IN</button>
        </Link>
        <Authenticated>
          <div>signed up</div>
        </Authenticated>
        <Unauthenticated>
          <div>guest</div>
        </Unauthenticated>
      </nav>
      <Outlet />
    </div>
  );
}
