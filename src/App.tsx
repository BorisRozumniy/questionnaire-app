// App.tsx
// import * as React from 'react'
import TodoProvider from "./context/todoContext";
import Todos from "./containers/Todos";
import AddTodo from "./components/AddTodo";
import { GlobalStyle } from "./global-style";
// import './styles.css'

export default function App() {
  return (
    <TodoProvider>
      <main className="App">
        <AddTodo />
        <Todos />
      </main>
      <GlobalStyle />
    </TodoProvider>
  );
}
