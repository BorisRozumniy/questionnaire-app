import { useState, createContext, FC, ReactNode, useEffect } from "react";
import { TodoContextType, ITodo, AnswerType } from "../@types/todo";

export const TodoContext = createContext<TodoContextType | null>(null);

interface Props {
  children: ReactNode;
}

const TodoProvider: FC<Props> = ({ children }) => {
  const [editMod, setEditMod] = useState(false);
  const [questions, setQuestions] = useState<ITodo[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingQuestionData, setEditingQuestionData] = useState<ITodo>(
    {} as ITodo
  );

  useEffect(() => {
    const url = "/questions/";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.log("error fff", error);
      });
  }, []);

  const saveQuestion = ({ questionText, answerType }: ITodo) => {
    const newQuestion: Omit<ITodo, "_id"> = {
      questionText,
      answerType: answerType || AnswerType.text,
    };

    const config = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newQuestion),
    };

    const url = "/questions/";
    fetch(url, config)
      .then((res) => res.json())
      .then(({ data, message }) => {
        console.log(data, message);
        setQuestions([...questions, data]);
      })
      .catch((error) => {
        console.log("error fff", error);
      });
  };

  const removeTodo = (id: number) => {
    const filtered = questions.filter((todo: ITodo) => todo._id !== id);
    setQuestions(filtered);
  };

  const editQuestion = (id: number) => {
    toggleModal(true);
    setEditingQuestionData(
      questions[questions.findIndex((question) => question._id === id)]
    );
  };

  const saveEditedQuestion = (editedQuestion: ITodo) => {
    const { _id: questionId } = editedQuestion;
    const copyTodos: ITodo[] = JSON.parse(JSON.stringify(questions));
    const finded =
      copyTodos[copyTodos.findIndex(({ _id }: ITodo) => _id === questionId)];
    finded.questionText = editedQuestion.questionText;
    finded.answerType = editedQuestion.answerType;
    setQuestions([...copyTodos]);
  };

  const toggleModal = (toggle: boolean) => {
    setModalIsOpen(toggle);
  };

  return (
    <TodoContext.Provider
      value={{
        editMod,
        setEditMod,
        questions,
        saveQuestion,
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
