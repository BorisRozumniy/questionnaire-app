import { useState, createContext, FC, ReactNode } from "react";
import { TodoContextType, ITodo, AnswerType } from "../@types/todo";

export const TodoContext = createContext<TodoContextType | null>(null);

interface Props {
  children: ReactNode;
}

const TodoProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingQuestionData, setEditingQuestionData] = useState<ITodo>(
    {} as ITodo
  );
  const saveTodo = (todo: ITodo) => {
    const newTodo: ITodo = {
      id: Math.random(), // not really unique - but fine for this example
      questionText: todo.questionText,
      answerType: todo.answerType || AnswerType.text,
    };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id: number) => {
    const filtered = todos.filter((todo: ITodo) => todo.id !== id);
    setTodos(filtered);
  };

  const editQuestion = (id: number) => {
    toggleModal(true);
    setEditingQuestionData(
      todos[todos.findIndex((question) => question.id === id)]
    );
  };

  const saveEditedQuestion = (editedQuestion: ITodo) => {
    const { id: questionId } = editedQuestion;
    const copyTodos: ITodo[] = JSON.parse(JSON.stringify(todos));
    const finded =
      copyTodos[copyTodos.findIndex(({ id }: ITodo) => id === questionId)];
    finded.questionText = editedQuestion.questionText;
    finded.answerType = editedQuestion.answerType;
    setTodos([...copyTodos]);
  };

  const toggleModal = (toggle: boolean) => {
    setModalIsOpen(toggle);
  };
  return (
    <TodoContext.Provider
      value={{
        todos,
        saveTodo,
        removeTodo,
        editQuestion,
        toggleModal,
        modalIsOpen,
        editingQuestionData,
        saveEditedQuestion,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
