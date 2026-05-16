import { Route, Routes } from "react-router";
import FillPage from "./Pages/FillPage";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import CreatePage from "./Pages/CreatePage";
import PlayPage from "./Pages/PlayPage";
import SigninPage from "./Pages/SignInPage";
import Layout from "./layout";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/FillPage" element={<FillPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </div>
  );
}
