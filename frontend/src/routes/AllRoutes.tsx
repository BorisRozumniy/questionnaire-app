import { Routes, Route } from "react-router-dom";
import { RespondentPage } from "../pages/RespondentPage";
import { QuestionnairesPage } from "../pages/Questionnaires/QuestionnairesPage";
import ErrorPage from "../pages/ErrorPage";
import { frontendUrls } from "../urls/frontendUrls";
import { QuestionnairePage } from "../pages/Questionnaire/QuestionnairePage";

export const AllRoutes = () => (
  <Routes>
    <Route
      path={frontendUrls.home}
      element={<QuestionnairesPage />}
      errorElement={<ErrorPage />}
    />
    <Route
      path={`${frontendUrls.questionnaires}:id`}
      element={<QuestionnairePage />}
    />
    <Route path={frontendUrls.respondents} element={<RespondentPage />} />
    <Route path={frontendUrls.results} element={<h1>Rsults</h1>} />
  </Routes>
);
