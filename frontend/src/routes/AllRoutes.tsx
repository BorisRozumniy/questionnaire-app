import * as React from 'react';

import { Routes, Route } from 'react-router-dom';
import { RespondentsPage } from '../pages/Respondents/RespondentsPage';
import { RespondentPage } from '../pages/Respondent/RespondentPage';
import { QuestionnairesPage } from '../pages/Questionnaires/QuestionnairesPage';
import { QuestionnairePage } from '../pages/Questionnaire/QuestionnairePage';
import ErrorPage from '../pages/ErrorPage';
import { frontendUrls } from '../urls/frontendUrls';

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
      errorElement={<ErrorPage />}
    />
    <Route path={frontendUrls.respondents} element={<RespondentsPage />} />
    <Route
      path={`${frontendUrls.respondents}:id`}
      element={<RespondentPage />}
    />
    <Route path={frontendUrls.results} element={<h1>Rsults</h1>} />
  </Routes>
);
