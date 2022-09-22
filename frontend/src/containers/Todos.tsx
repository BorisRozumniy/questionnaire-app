import { useContext } from "react";
import { TodoContextType, ITodo } from "../@types/todo";
import { TodoContext } from "../context/todoContext";
import Todo from "../components/Todo";

const Todos = () => {
  const { questions } = useContext(TodoContext) as TodoContextType;
  return (
    <>
      <h2>Questions list</h2>
      {questions?.length > 0 &&
        questions.map((todo: ITodo) => <Todo key={todo._id} todo={todo} />)}
    </>
  );
};

export default Todos;
