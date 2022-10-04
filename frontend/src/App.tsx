import { BrowserRouter } from "react-router-dom";
import { QuestionProvider } from "./context/context";
import { GlobalStyle } from "./global-style";
import { Container } from "./components/Styled/Container";
import { Header } from "./components/Header";
import { ThemeProvider } from "styled-components";
import { AllRoutes } from "./routes/AllRoutes";
import { theme } from "./theme";

export const App = () => (
  <QuestionProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container mt={theme.headerHeight}>
          <Header />
          <AllRoutes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
    <GlobalStyle />
  </QuestionProvider>
);
