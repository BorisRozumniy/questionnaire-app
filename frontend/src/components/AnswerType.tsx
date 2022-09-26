import { Dispatch, FC, SetStateAction, useContext } from "react";
import { AnswerType, ContextType, IQuestion } from "../@types/question";
import { Context } from "../context/context";
import { PossibleAnswerList } from "./PossibleAnswer";

type AnswerTypeProps = {
  answerType: string;
  answerOptions?: IQuestion["answerOptions"];
  onAddOption: () => void;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
};

export const AnswerTypeComponent: FC<AnswerTypeProps> = ({
  answerType,
  answerOptions,
  onAddOption,
  inputValue,
  setInputValue,
}) => {
  const { editMod } = useContext(Context) as ContextType;
  switch (answerType) {
    case AnswerType.text:
      return <textarea disabled={editMod} />;
    case AnswerType.data:
      return <input type="date" disabled={editMod} />;
    case AnswerType.oneOfTheList:
      return (
        <PossibleAnswerList
          options={answerOptions || []}
          onAddOption={onAddOption}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      );
    case AnswerType.aFewFromTheList:
      return (
        <PossibleAnswerList
          options={answerOptions || []}
          isSeveral
          onAddOption={onAddOption}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      );
    case AnswerType.scale:
      return <input type="range" />;

    default:
      return null;
  }
};
