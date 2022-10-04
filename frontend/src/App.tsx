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
import Root from "./routes/root";
import ErrorPage from "./pages/ErrorPage";
import { Header } from "./components/Header";

export const App = () => (
  <QuestionProvider>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Root />} errorElement={<ErrorPage />} />
        <Route path="questionnaires/" element={<QuestionnairesPage />} />
        <Route path="respondents/" element={<RespondentPage />} />
      </Routes>
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
