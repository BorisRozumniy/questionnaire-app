import { FC, useContext } from "react";
import { AnswerType, QuestionItemContextType } from "../@types/question";
import { QuestionItemContext } from "../context/questionItemContext";
import { DateField } from "./DateField";
import { PossibleAnswerList } from "./PossibleAnswer";
import { TextField } from "./TextField";

type AnswerTypeProps = {
  answerType: string;
};

export const AnswerTypeComponent: FC<AnswerTypeProps> = ({ answerType }) => {
  const { pollingMode } = useContext(
    QuestionItemContext
  ) as QuestionItemContextType;

  switch (answerType) {
    case AnswerType.text:
      if (pollingMode) return <TextField />;
      return null;

    case AnswerType.data:
      if (pollingMode) return <DateField />;
      return null;

    case AnswerType.oneOfTheList:
      return <PossibleAnswerList />;

    case AnswerType.aFewFromTheList:
      return <PossibleAnswerList isSeveral />;

    case AnswerType.scale:
      if (pollingMode) return <input type="range" />;
      return null;

    default:
      return null;
  }
};
