// components/Todo.tsx
import * as React from "react";
import { ITodo, TodoContextType } from "../@types/todo";
import { Button } from "./Styled/Button";

type Props = {
  todo: ITodo;
  removeTodo: TodoContextType["removeTodo"];
  editTodo: TodoContextType["editTodo"];
};

const Todo: React.FC<Props> = ({ todo, removeTodo, editTodo }) => {
  return (
    <div className="Card">
      <div className="Card--text">
        <h3 className={"checkTodo"}>{todo.questionText}</h3>
        <span>{todo.answerType}</span>
      </div>
      <Button onClick={() => editTodo(todo.id)}>edit</Button>
      <Button onClick={() => removeTodo(todo.id)}>remove</Button>
    </div>
  );
};
export default Todo;
