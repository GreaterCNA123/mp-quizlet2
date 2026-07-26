import { Route, Routes } from "react-router";
import AuthLayout from "./AuthLayout";
import AboutPage from "./Pages/AboutPage";
import CreatePage2 from "./Pages/CreatePage2";
import CreateGroupPage from "./Pages/CreateGroupPage";
import DashboardPage from "./Pages/DashboardPage";
import GroupDetailPage from "./Pages/GroupDetailPage";
import GroupQuizPage from "./Pages/GroupQuizPage";
import GroupsPage from "./Pages/GroupsPage";
import HomePage from "./Pages/HomePage";
import ManageDecksPage from "./Pages/ManageDecksPage";
import PlayPage from "./Pages/PlayPage";
import ProfilePage from "./Pages/ProfilePage";
import QuestionsPage from "./Pages/QuestionsPage";
import QuizPage from "./Pages/QuizPage";
import QuizResultsPage from "./Pages/QuizResultsPage";
import SigninPage from "./Pages/SignInPage";
import Layout from "./layout";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Route>

        <Route path="/app" element={<AuthLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />

          <Route path="manage-decks">
            <Route index element={<ManageDecksPage />} />
            <Route path="new" element={<CreatePage2 />} />
            <Route path=":deckId" element={<QuestionsPage />} />
          </Route>

          <Route path="play">
            <Route index element={<PlayPage />} />
            <Route path=":deckId" element={<QuizPage />} />
            <Route path=":deckId/results" element={<QuizResultsPage />} />
          </Route>

          <Route path="groups">
            <Route index element={<GroupsPage />} />
            <Route path="new" element={<CreateGroupPage />} />
            <Route path=":groupId" element={<GroupDetailPage />} />
            <Route path=":groupId/quiz/:deckId" element={<GroupQuizPage />} />
            <Route
              path=":groupId/quiz/:deckId/results"
              element={<QuizResultsPage />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
