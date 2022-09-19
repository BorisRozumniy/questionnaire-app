import TodoProvider from "./context/todoContext";
import Todos from "./containers/Todos";
import AddTodo from "./components/AddTodo";
import { GlobalStyle } from "./global-style";
import { Modal } from "./components/Modal";
import { SwitchMod } from "./components/SwitchMod";
import { Container } from "./components/Styled/Container";

export default function App() {
  return (
    <TodoProvider>
      <Container mt={40}>
        <SwitchMod />
        <AddTodo />
        <Todos />
      </Container>
      <GlobalStyle />
      <Modal />
    </TodoProvider>
  );
}
