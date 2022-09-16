// components/Todo.tsx
import * as React from "react";
import { ITodo, TodoContextType } from "../@types/todo";

type Props = {
  todo: ITodo;
  // updateTodo: TodoContextType["updateTodo"];
  removeTodo: TodoContextType["removeTodo"];
  editTodo: TodoContextType["editTodo"];
};

const Todo: React.FC<Props> = ({ todo, /* updateTodo, */ removeTodo, editTodo }) => {
  // const checkTodo: string = todo.status ? `line-through` : "";
  return (
    <div className="Card">
      <div className="Card--text">
        <h1 className={'checkTodo'}>{todo.questionText}</h1>
        {/* <span className={checkTodo}>{todo.description}</span> */}
        <span>{todo.answerType}</span>
      </div>
      {/* <button
        onClick={() => updateTodo(todo.id)}
        className={todo.status ? `hide-button` : "Card--button"}
      >
        Complete
      </button> */}
      <button onClick={() => editTodo(todo.id)}>edit</button>
      <button onClick={() => removeTodo(todo.id)}>remove</button>
    </div>
  );
};
export default Todo;
