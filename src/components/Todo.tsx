import { FC, useContext } from "react";
import { ITodo, TodoContextType } from "../@types/todo";
import { TodoContext } from "../context/todoContext";
import { Button } from "./Styled/Button";

type Props = {
  todo: ITodo;
};

const Todo: FC<Props> = ({ todo }) => {
  const { removeTodo, editQuestion } = useContext(
    TodoContext
  ) as TodoContextType;
  return (
    <div className="Card">
      <div className="Card--text">
        <h3 className={"checkTodo"}>{todo.questionText}</h3>
        <span>{todo.answerType}</span>
      </div>
      <Button onClick={() => editQuestion(todo.id)}>edit</Button>
      <Button onClick={() => removeTodo(todo.id)}>remove</Button>
    </div>
  );
};
export default Todo;
