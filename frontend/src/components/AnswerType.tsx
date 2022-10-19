import { FC, useContext } from "react";
import { AnswerType, QuestionItemContextType } from "../@types/question";
import { QuestionItemContext } from "../context/questionItemContext";
import { PossibleAnswerList } from "./PossibleAnswerList";
import { SimpleField } from "./SimpleField";

type AnswerTypeProps = {
  answerType: string;
};

export const AnswerTypeComponent: FC<AnswerTypeProps> = ({ answerType }) => {
  const { pollingMode } = useContext(
    QuestionItemContext
  ) as QuestionItemContextType;

  switch (answerType) {
    case AnswerType.text:
      if (pollingMode) return <SimpleField />;
      return null;

    case AnswerType.data:
      if (pollingMode) return <SimpleField type="date" />;
      return null;

    case AnswerType.oneOfTheList:
      return <PossibleAnswerList />;

    case AnswerType.aFewFromTheList:
      return <PossibleAnswerList isSeveral />;

    case AnswerType.scale:
      if (pollingMode) return <SimpleField type="range" />;
      return null;

    default:
      return null;
  }
};
