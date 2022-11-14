import { BrowserRouter } from "react-router-dom";
import { QuestionProvider } from "./context/context";
import { GlobalStyle } from "./global-style";
import { Header } from "./components/Header";
import { ThemeProvider } from "styled-components";
import { AllRoutes } from "./routes/AllRoutes";
import { theme } from "./theme";

export const App = () => (
  <QuestionProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <AllRoutes />
      </ThemeProvider>
    </BrowserRouter>
    <GlobalStyle />
  </QuestionProvider>
);
