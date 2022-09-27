import { createContext, FC, ReactNode } from "react";
import { IQuestion, QuestionItemContextType } from "../@types/question";

export const QuestionItemContext =
  createContext<QuestionItemContextType | null>(null);

interface Props {
  children: ReactNode;
  question: IQuestion;
}

export const QuestionItemProvider: FC<Props> = ({ children, question }) => {
  const value = {
    question,
  };
  return (
    <QuestionItemContext.Provider value={value}>
      {children}
    </QuestionItemContext.Provider>
  );
};
