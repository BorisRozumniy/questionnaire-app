import { useContext } from "react";
import { ContextType, TPossibleAnswerItem } from "../@types/question";
import { Context } from "../context/context";
import { AnswerItemInput } from "./AnswerItemInput";
import { PossibleOneAnswerItem } from "./PossibleOneAnswerItem";

type Props = {
  item: TPossibleAnswerItem;
  selectedOption?: string;
  setSelectedOption: (item: string) => void;
};

export const PossibleAnswerItem = ({
  item,
  selectedOption,
  setSelectedOption,
}: Props) => {
  const { editMod } = useContext(Context) as ContextType;

  if (editMod) return <AnswerItemInput {...{ item }} />;

  return (
    <PossibleOneAnswerItem {...{ item, setSelectedOption, selectedOption }} />
  );
};
