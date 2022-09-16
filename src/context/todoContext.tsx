// context/todoContext.tsx
import * as React from "react";
import { TodoContextType, ITodo, AnswerType } from "../@types/todo";

export const TodoContext = React.createContext<TodoContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const saveTodo = (todo: ITodo) => {
    console.log(todo.answerType);
    
    const newTodo: ITodo = {
      id: Math.random(), // not really unique - but fine for this example
      questionText: todo.questionText,
      answerType: todo.answerType || AnswerType.text,
    };
    setTodos([...todos, newTodo]);
  };
  // const updateTodo = (id: number) => {
  //   todos.filter((todo: ITodo) => {
  //     if (todo.id === id) {
  //       todo.status = !todo.status;
  //       setTodos([...todos]);
  //     }
  //   });
  // };
  const removeTodo = (id: number) => {
    const filtered = todos.filter((todo: ITodo) => todo.id !== id);
    setTodos(filtered);
  };
  const editTodo = (id: number) => {
    const copyTodos = JSON.parse(JSON.stringify(todos));

    const findedIndex = todos.findIndex((todo: ITodo) => todo.id === id);
    const finded = copyTodos[findedIndex];
    const newTitle = prompt(`edit title item ${finded?.title}`, finded?.title);
    const newDescription = prompt(
      `edit description item ${finded?.title}`,
      finded?.description
    );
    finded.title = newTitle || "";
    finded.description = newDescription || "";

    setTodos([...copyTodos]);
  };
  return (
    <TodoContext.Provider
      value={{ todos, saveTodo, /* updateTodo */ removeTodo, editTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
