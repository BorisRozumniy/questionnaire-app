import { createContext, FC, ReactNode } from "react";
import { IQuestion, QuestionItemContextType } from "../@types/question";
import { useInput } from "../useInput";

export const QuestionItemContext =
  createContext<QuestionItemContextType | null>({
    question: {} as IQuestion,
    newOptionValue: "",
    setNewOptionValue: () => {},
  });

interface Props {
  children: ReactNode;
  question: IQuestion;
}

export const QuestionItemProvider: FC<Props> = ({ children, question }) => {
  const [newOptionValue, setNewOptionValue] = useInput("");

  const value = {
    question,
    newOptionValue,
    setNewOptionValue,
  };
  return (
    <QuestionItemContext.Provider value={value}>
      {children}
    </QuestionItemContext.Provider>
  );
};
