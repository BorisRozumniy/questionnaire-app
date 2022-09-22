import { FC, useContext } from "react";
import { IQuestion, ContextType } from "../@types/question";
import { Context } from "../context/context";
import { Button } from "./Styled/Button";

type Props = {
  question: IQuestion;
};

export const Question: FC<Props> = ({ question }) => {
  const { _id, questionText, answerType } = question;
  const { removeQuestion, editQuestion, editMod } = useContext(
    Context
  ) as ContextType;
  if (editMod)
    return (
      <div>
        <div>
          <h3>{questionText}</h3>
          <span>{answerType}</span>
        </div>
        <Button onClick={() => editQuestion(_id)}>edit</Button>
        <Button onClick={() => removeQuestion(_id)}>remove</Button>
      </div>
    );
  return <h3>{questionText}</h3>;
};
