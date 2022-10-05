import { FC, useContext, useEffect, useMemo } from "react";
import { TMongoId } from "../@types/common";
import { ContextType } from "../@types/context";
import { IQuestion } from "../@types/question";
import { getRequestQuestions } from "../actions/getRequestQuestions";
import { Context } from "../context/context";
import { Question } from "./Question";

type Props = {
  questionsIds?: TMongoId[];
  questionnaireId: TMongoId;
};

export const Questions: FC<Props> = ({ questionsIds, questionnaireId }) => {
  const { questionsState, questionsDispatch } = useContext(
    Context
  ) as ContextType;

  const { questionsByValues } = questionsState;

  const questions = questionsByValues[questionnaireId];

  useEffect(() => {
    if (questionsIds && !questions?.length) {
      getRequestQuestions({
        dispatch: questionsDispatch,
        questionsIds,
        questionnaireId,
      });
    }
  }, [questionsIds]);

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
