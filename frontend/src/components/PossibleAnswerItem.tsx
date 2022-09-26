import {
  EventHandler,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ContextType, TPossibleAnswerItem } from "../@types/question";
import { Context } from "../context/context";
import { Input } from "./Styled/Input";

type Props = {
  item: TPossibleAnswerItem;
  onChange: (e: FormEvent<HTMLInputElement>, item: TPossibleAnswerItem) => void;
  onFocus: EventHandler<FormEvent<HTMLInputElement>>;
  onBlur: (e: FormEvent<HTMLInputElement>, value: string) => void;
};

export const PossibleAnswerItem = ({
  item,
  onChange,
  onFocus,
  onBlur,
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
        onFocus={onFocus}
        value={inputValue}
      />
    );
  return (
    <>
      <input
        type="radio"
        name={String(item.id)}
        // checked={item.selected}
        // onChange={onChange}
        onFocus={onFocus}
        onBlur={(e) => onBlur(e, inputValue)}
      />
      <label htmlFor={String(item.id)}>{item.title}</label>
    </>
  );
};
