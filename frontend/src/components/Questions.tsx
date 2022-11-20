import { FC, useContext, useEffect, useMemo } from "react";
import { TMongoId } from "../@types/common";
import { ContextType } from "../@types/context";
import { IQuestion } from "../@types/question";
import { Context } from "../context/context";
import { Question } from "./Question";

type Props = {
  questionnaireId: TMongoId;
  questions: IQuestion[];
};

export const Questions: FC<Props> = ({ questionnaireId, questions }) => {
  return (
    <>
      <h2>Questions list</h2>
      {questions?.length > 0 &&
        questions.map((question: IQuestion) => (
          <Question
            key={question._id}
            question={question}
            questionnaireId={questionnaireId}
          />
        ))}
    </>
  );
};
