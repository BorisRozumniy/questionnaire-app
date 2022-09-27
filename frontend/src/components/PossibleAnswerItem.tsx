import {
  EventHandler,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ContextType, TPossibleAnswerItem } from "../@types/question";
import { Context } from "../context/context";
import { PossibleOneAnswerItem } from "./PossibleOneAnswerItem";
import { Input } from "./Styled/Input";

type Props = {
  item: TPossibleAnswerItem;
  onChange: (e: FormEvent<HTMLInputElement>, item: TPossibleAnswerItem) => void;
  onFocus?: EventHandler<FormEvent<HTMLInputElement>>;
  onBlur?: (e: FormEvent<HTMLInputElement>, value: string) => void;
  selectedOption?: string;
  setSelectedOption: (item: string) => void;
};

export const PossibleAnswerItem = ({
  item,
  onChange,
  selectedOption,
  setSelectedOption,
}: Props) => {
  const [inputValue, setInputValue] = useState(item.title);

  useEffect(() => {
    setInputValue(item.title);
  }, [item]);

  const { editMod } = useContext(Context) as ContextType;

  if (editMod)
    return (
      <Input
        onChange={(e) => onChange(e, item)}
        // onFocus={onFocus}
        value={inputValue}
      />
    );

  return (
    <PossibleOneAnswerItem {...{ item, setSelectedOption, selectedOption }} />
  );
};
