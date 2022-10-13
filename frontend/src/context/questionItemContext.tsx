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
  pollingMode?: boolean;
}

export const QuestionItemProvider: FC<Props> = ({
  children,
  question,
  pollingMode,
}) => {
  const [newOptionValue, setNewOptionValue] = useInput("");

  const value = {
    question,
    newOptionValue,
    setNewOptionValue,
    pollingMode,
  };
  return (
    <QuestionItemContext.Provider value={value}>
      {children}
    </QuestionItemContext.Provider>
  );
};
