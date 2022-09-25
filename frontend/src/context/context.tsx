import { useState, createContext, FC, ReactNode, useEffect } from "react";
import { ContextType, IQuestion, AnswerType } from "../@types/question";

export const Context = createContext<ContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const QuestionProvider: FC<Props> = ({ children }) => {
  const [editMod, setEditMod] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingQuestionData, setEditingQuestionData] = useState<IQuestion>(
    {} as IQuestion
  );

  useEffect(() => {
    const url = "/questions/";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const saveQuestion = ({ questionText, answerType }: IQuestion) => {
    const newQuestion: Omit<IQuestion, "_id"> = {
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

  const removeQuestion = (id: number) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    };
    const url = "/questions/" + id;

    fetch(url, config)
      .then((res) => res.json())
      .then(({ data, message }) => {
        const filtered = questions.filter(({ _id }: IQuestion) => _id !== id);
        setQuestions([...filtered]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const editQuestion = (id: number) => {
    toggleModal(true);
    setEditingQuestionData(
      questions[questions.findIndex(({ _id }) => _id === id)]
    );
  };

  const saveEditedQuestion = (editedQuestion: IQuestion) => {
    const { _id: questionId } = editedQuestion;

    const config = {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(editedQuestion),
    };
    const url = "/questions/" + questionId;

    fetch(url, config)
      .then((res) => res.json())
      .then(({ message }) => {
        console.log(message);
        const copyTodos: IQuestion[] = JSON.parse(JSON.stringify(questions));
        const finded = copyTodos.find(
          ({ _id }: IQuestion) => _id === questionId
        );
        if(finded) {
          finded.questionText = editedQuestion.questionText;
          finded.answerType = editedQuestion.answerType;
        } 
        setQuestions([...copyTodos]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const toggleModal = (toggle: boolean) => {
    setModalIsOpen(toggle);
  };

  return (
    <Context.Provider
      value={{
        editMod,
        setEditMod,
        questions,
        saveQuestion,
        removeQuestion,
        editQuestion,
        toggleModal,
        modalIsOpen,
        editingQuestionData,
        saveEditedQuestion,
      }}
    >
      {children}
    </Context.Provider>
  );
};
