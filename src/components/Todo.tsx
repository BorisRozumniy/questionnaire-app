// components/Todo.tsx
import * as React from "react";
import { ITodo, TodoContextType } from "../@types/todo";

type Props = {
  todo: ITodo;
  //   updateTodo: (id: number) => void;
  updateTodo: TodoContextType["updateTodo"];
  removeTodo: TodoContextType["removeTodo"];
};

const Todo: React.FC<Props> = ({ todo, updateTodo, removeTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : "";
  return (
    <div className="Card">
      <div className="Card--text">
        <h1 className={checkTodo}>{todo.title}</h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <button
        onClick={() => updateTodo(todo.id)}
        className={todo.status ? `hide-button` : "Card--button"}
      >
        Complete
      </button>
      <button onClick={() => removeTodo(todo.id)}>remove</button>
    </div>
  );
};
export default Todo;
