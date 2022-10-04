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
import { ThemeProvider } from "styled-components";

const theme = {
  color: "mediumseagreen",
  headerHeight: 50,
  colors: {
    main: "#28a050",
    secondary: "#f0f0f0",
    dissable: "#a0c8a0",
    light: "#78c8a0",
    tone: "#00a050",
    strong: "#00a028",
    blue: "#a0c8c8",
    opacity: "#78c878",

    dark: "#285050",
    gray: "#787878",
    darkGray: "#505050",
    
    oposide: "#913790",
  },
};

export const App = () => (
  <QuestionProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container mt={theme.headerHeight}>
          <Header />
          <Routes>
            <Route
              path={frontendUrls.home}
              element={<QuestionnairesPage />}
              errorElement={<ErrorPage />}
            />
            <Route
              path={frontendUrls.respondents}
              element={<RespondentPage />}
            />
            <Route path={frontendUrls.results} element={<h1>Rsults</h1>} />
          </Routes>
        </Container>
      </ThemeProvider>
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
