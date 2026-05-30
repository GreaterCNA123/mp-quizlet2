import { Outlet, Route, Routes, useNavigate } from "react-router";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import CreatePage from "./Pages/CreatePage";
import PlayPage from "./Pages/PlayPage";
import SigninPage from "./Pages/SignInPage";
import Layout from "./layout";
import { useAuthActions } from "@convex-dev/auth/react";
import { useEffect } from "react";
import { useConvexAuth } from "convex/react";
import AuthLayout from "./AuthLayout";
import GroupPage from "./Pages/GroupsPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        <Route path="/member" element={<AuthLayout />}>
          <Route path="/member" element={<HomePage />} />
          <Route path="/member/about" element={<AboutPage />} />
          <Route path="/member/group" element={<GroupPage />} />
          <Route path="/member/create" element={<CreatePage />} />
          <Route path="/member/play" element={<PlayPage />} />
        </Route>
      </Routes>
    </div>
  );
}
