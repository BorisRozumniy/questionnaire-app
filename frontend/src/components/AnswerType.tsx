import { FC, useContext } from "react";
import { AnswerType, ContextType, IQuestion } from "../@types/question";
import { Context } from "../context/context";
import { DateField } from "./DateField";
import { PossibleAnswerList } from "./PossibleAnswer";
import { TextField } from "./TextField";

type AnswerTypeProps = {
  answerType: string;
};

export const AnswerTypeComponent: FC<AnswerTypeProps> = ({ answerType }) => {
  const { editMod } = useContext(Context) as ContextType;
  switch (answerType) {
    case AnswerType.text:
      return <TextField {...{ editMod }} />;
    case AnswerType.data:
      return <DateField {...{ editMod }} />;
    case AnswerType.oneOfTheList:
      return <PossibleAnswerList />;
    case AnswerType.aFewFromTheList:
      return <PossibleAnswerList isSeveral />;
    case AnswerType.scale:
      return <input type="range" />;

    default:
      return null;
  }
};
