import { FC, useContext } from "react";
import { Context } from "../context/context";
// import { QuestionItemProvider } from "../context/questionItemContext";
import { ContextType } from "../@types/context";
import { TMongoId } from "../@types/common";
import { QuestionForm } from "./QuestionForm";

type Pros = {
  questionnaireId: TMongoId;
};

export const AddQuestion: FC<Pros> = ({ questionnaireId }) => {
  const { /* temporaryQuestion, setTemporaryQuestion, */ questionsDispatch } =
    useContext(Context) as ContextType;

  return (
    // <QuestionItemProvider {...{ question: temporaryQuestion }}>
    <>
      <h2>Create question</h2>
      <QuestionForm {...{ dispatch: questionsDispatch, questionnaireId }} />
    </>
    // </QuestionItemProvider>
  );
};
