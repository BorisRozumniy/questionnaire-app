import { useContext } from "react";
import { TodoContextType, ITodo } from "../@types/todo";
import { TodoContext } from "../context/todoContext";
import Todo from "../components/Todo";

const Todos = () => {
  const { todos } = useContext(TodoContext) as TodoContextType;
  return (
    <>
      <h2>Questions list</h2>
      {todos.map((todo: ITodo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default Todos;
