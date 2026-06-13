import { Route, Routes } from "react-router";
import AuthLayout from "./AuthLayout";
import AboutPage from "./Pages/AboutPage";
import CreatePage from "./Pages/CreatePage";
import CreatePage2 from "./Pages/CreatePage2";
import GroupPage from "./Pages/GroupsPage";
import HomePage from "./Pages/HomePage";
import PlayPage from "./Pages/PlayPage";
import SigninPage from "./Pages/SignInPage";
import Layout from "./layout";

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
          <Route path="/member/create2" element={<CreatePage2 />} />
          <Route path="/member/play" element={<PlayPage />} />
        </Route>
      </Routes>
    </div>
  );
}
