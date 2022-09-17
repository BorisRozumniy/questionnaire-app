import TodoProvider from "./context/todoContext";
import Todos from "./containers/Todos";
import AddTodo from "./components/AddTodo";
import { GlobalStyle } from "./global-style";
import { Modal } from "./components/Modal";

export default function App() {
  return (
    <TodoProvider>
      <main className="App">
        <AddTodo />
        <Todos />
      </main>
      <GlobalStyle />
      <Modal />
    </TodoProvider>
  );
}
