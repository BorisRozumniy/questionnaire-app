import { FC, useContext } from "react";
import { ITodo, TodoContextType } from "../@types/todo";
import { TodoContext } from "../context/todoContext";
import { Button } from "./Styled/Button";

type Props = {
  todo: ITodo;
};

const Todo: FC<Props> = ({ todo }) => {
  const { removeTodo, editQuestion, editMod } = useContext(
    TodoContext
  ) as TodoContextType;
  if (editMod)
    return (
      <div>
        <div>
          <h3>{todo.questionText}</h3>
          <span>{todo.answerType}</span>
        </div>
        <Button onClick={() => editQuestion(todo._id)}>edit</Button>
        <Button onClick={() => removeTodo(todo._id)}>remove</Button>
      </div>
    );
  return <h3>{todo.questionText}</h3>;
};
export default Todo;
