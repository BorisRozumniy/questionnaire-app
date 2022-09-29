import { FC } from "react";
import { AnswerType } from "../@types/question";
import { DateField } from "./DateField";
import { PossibleAnswerList } from "./PossibleAnswer";
import { TextField } from "./TextField";

type AnswerTypeProps = {
  answerType: string;
};

export const AnswerTypeComponent: FC<AnswerTypeProps> = ({ answerType }) => {
  switch (answerType) {
    case AnswerType.text:
      return <TextField />;
    case AnswerType.data:
      return <DateField />;
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
