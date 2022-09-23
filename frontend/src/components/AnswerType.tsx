import { FC, useContext } from "react";
import { AnswerType, ContextType } from "../@types/question";
import { Context } from "../context/context";
import { PossibleAnswer } from "./PossibleAnswer";

type AnswerTypeProps = {
  answerType: string;
};

export const AnswerTypeComponent: FC<AnswerTypeProps> = ({ answerType }) => {
  const { editMod } = useContext(Context) as ContextType;
  switch (answerType) {
    case AnswerType.text:
      return <textarea disabled={editMod} />;
    case AnswerType.data:
      return <input type="date" disabled={editMod} />;
    case AnswerType.oneOfTheList:
      return <PossibleAnswer />;
    case AnswerType.aFewFromTheList:
      return <PossibleAnswer isSeveral />;
    case AnswerType.scale:
      return (
        <>
          <input type="range" />
        </>
      );

    default:
      return null;
  }
};
