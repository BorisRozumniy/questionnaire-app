// containers/Todos.tsx
import * as React from "react";
import { TodoContextType, ITodo } from "../@types/todo";
import { TodoContext } from "../context/todoContext";
import Todo from "../components/Todo";

const Todos = () => {
  const { todos, updateTodo, removeTodo, editTodo } = React.useContext(
    TodoContext
  ) as TodoContextType;
  return (
    <>
      {todos.map((todo: ITodo) => (
        <Todo
          key={todo.id}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
          todo={todo}
        />
      ))}
    </>
  );
};

export default Todos;
