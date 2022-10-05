import { FC, useContext, useEffect } from "react";
import { TMongoId } from "../@types/common";
import { ContextType } from "../@types/context";
import { IQuestion } from "../@types/question";
import { getRequestQuestions } from "../actions/getRequestQuestions";
import { Context } from "../context/context";
import { Question } from "./Question";

type Props = {
  questionsIds?: TMongoId[];
};

export const Questions: FC<Props> = ({ questionsIds }) => {
  const { questionsState, questionsDispatch } = useContext(
    Context
  ) as ContextType;

  const { questions, questionsLoading } = questionsState;

  useEffect(() => {
    if (questionsIds && questions?.length === 0 && !questionsLoading) {
      getRequestQuestions({ dispatch: questionsDispatch, questionsIds });
    }
  }, []);

  return (
    <>
      <h2>Questions list</h2>
      {questions?.length > 0 &&
        questions.map((question: IQuestion) => (
          <Question key={question._id} question={question} />
        ))}
    </>
  );
};
