import { Routes, Route } from "react-router-dom";
import { RespondentPage } from "../pages/RespondentPage";
import { QuestionnairesPage } from "../pages/QuestionnairesPage";
import ErrorPage from "../pages/ErrorPage";
import { frontendUrls } from "../urls/frontendUrls";

export const AllRoutes = () => (
  <Routes>
    <Route
      path={frontendUrls.home}
      element={<QuestionnairesPage />}
      errorElement={<ErrorPage />}
    />
    <Route path={frontendUrls.respondents} element={<RespondentPage />} />
    <Route path={frontendUrls.results} element={<h1>Rsults</h1>} />
  </Routes>
);
