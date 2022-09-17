// containers/Todos.tsx
import { useContext } from "react";
import { TodoContextType, ITodo } from "../@types/todo";
import { TodoContext } from "../context/todoContext";
import Todo from "../components/Todo";
import { Container } from "../components/Styled/Container";

const Todos = () => {
  const { todos } = useContext(TodoContext) as TodoContextType;
  return (
    <Container mt={20}>
      <h2>Questions list</h2>
      {todos.map((todo: ITodo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </Container>
  );
};

export default Todos;
