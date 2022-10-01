import { QuestionProvider } from "./context/context";
import { Questions } from "./components/Questions";
import { AddQuestion } from "./components/AddQuestion";
import { GlobalStyle } from "./global-style";
import { Modal } from "./components/Modal";
import { SwitchMod } from "./components/SwitchMod";
import { Container } from "./components/Styled/Container";
import { RespondentList } from "./components/RespondentList";

export const App = () => (
  <QuestionProvider>
    <Container mt={40}>
      <RespondentList />
      <SwitchMod />
      <AddQuestion />
      <Questions />
    </Container>
    <GlobalStyle />
    <Modal />
  </QuestionProvider>
);
