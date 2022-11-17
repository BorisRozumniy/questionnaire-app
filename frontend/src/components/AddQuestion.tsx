import { FC, useContext } from "react";
import { Context } from "../context/context";
import { ContextType } from "../@types/context";
import { TMongoId } from "../@types/common";
import { QuestionForm } from "./QuestionForm";
import { AddFormWrapper } from "./AddFormWrapper";

type Pros = {
  questionnaireId: TMongoId;
};

export const AddQuestion: FC<Pros> = ({ questionnaireId }) => {
  const { questionnaireDispatch } = useContext(Context) as ContextType;

  return (
    <AddFormWrapper>
      <h2>Create question</h2>
      <QuestionForm {...{ dispatch: questionnaireDispatch, questionnaireId }} />
    </AddFormWrapper>
  );
};
