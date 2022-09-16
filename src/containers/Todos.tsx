// containers/Todos.tsx
import * as React from "react";
import { TodoContextType, ITodo } from "../@types/todo";
import { TodoContext } from "../context/todoContext";
import Todo from "../components/Todo";
import { Container } from "../components/Styled/Container";

const Todos = () => {
  const { todos, removeTodo, editTodo } = React.useContext(
    TodoContext
  ) as TodoContextType;
  return (
    <Container mt={20}>
      <h2>Questions list</h2>
      {todos.map((todo: ITodo) => (
        <Todo
          key={todo.id}
          removeTodo={removeTodo}
          editTodo={editTodo}
          todo={todo}
        />
      ))}
    </Container>
  );
};

export default Todos;
