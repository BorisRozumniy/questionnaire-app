import { Routes, Route } from "react-router-dom";
import { RespondentPage } from "../pages/RespondentPage";
import { QuestionnairesPage } from "../pages/Questionnaires/QuestionnairesPage";
import ErrorPage from "../pages/ErrorPage";
import { frontendUrls } from "../urls/frontendUrls";
import { QuestionnairePage } from "../pages/Questionnaire/QuestionnairePage";
import { useState } from "react";

export const AllRoutes = () => {
  const [
    lastRequestWasFromQuestionairePage,
    setLastRequestWasFromQuestionairePage,
  ] = useState(false);

  return (
    <Routes>
      <Route
        path={frontendUrls.home}
        element={
          <QuestionnairesPage
            {...{
              lastRequestWasFromQuestionairePage,
              setLastRequestWasFromQuestionairePage,
            }}
          />
        }
        errorElement={<ErrorPage />}
      />
      <Route
        path={`${frontendUrls.questionnaires}:id`}
        element={
          <QuestionnairePage {...{ setLastRequestWasFromQuestionairePage }} />
        }
      />
      <Route path={frontendUrls.respondents} element={<RespondentPage />} />
      <Route path={frontendUrls.results} element={<h1>Rsults</h1>} />
    </Routes>
  );
};
