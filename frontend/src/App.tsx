import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { QuestionProvider } from "./context/context";
import { Questions } from "./components/Questions";
import { AddQuestion } from "./components/AddQuestion";
import { GlobalStyle } from "./global-style";
import { Modal } from "./components/Modal";
import { SwitchMod } from "./components/SwitchMod";
import { Container } from "./components/Styled/Container";
import { RespondentPage } from "./pages/RespondentPage";

import { QuestionnairesPage } from "./pages/QuestionnairesPage";
import ErrorPage from "./pages/ErrorPage";
import { Header } from "./components/Header";
import { frontendUrls } from "./urls/frontendUrls";

export const App = () => (
  <QuestionProvider>
    <BrowserRouter>
      <Container>
        <Header />
        <Routes>
          <Route
            path={frontendUrls.home}
            element={<QuestionnairesPage />}
            errorElement={<ErrorPage />}
          />
          <Route path={frontendUrls.respondents} element={<RespondentPage />} />
          <Route path={frontendUrls.results} element={<h1>Rsults</h1>} />
        </Routes>
      </Container>
    </BrowserRouter>

    {/* <Container mt={40}>
      <RespondentList />
      <SwitchMod />
      <AddQuestion />
      <Questions />
    </Container> */}
    <GlobalStyle />
    {/* <Modal /> */}
  </QuestionProvider>
);
