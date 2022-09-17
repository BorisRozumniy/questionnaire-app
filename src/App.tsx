import TodoProvider from "./context/todoContext";
import Todos from "./containers/Todos";
import AddTodo from "./components/AddTodo";
import { GlobalStyle } from "./global-style";
import { Modal } from "./components/Modal";
import { SwitchMod } from "./components/SwitchMod";

export default function App() {
  return (
    <TodoProvider>
      <main className="App">
        <SwitchMod />
        <AddTodo />
        <Todos />
      </main>
      <GlobalStyle />
      <Modal />
    </TodoProvider>
  );
}
