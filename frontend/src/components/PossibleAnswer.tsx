import {
  Dispatch,
  EventHandler,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ContextType, TPossibleAnswerItem } from "../@types/question";
import { Context } from "../context/context";
import { Button } from "./Styled/Button";
import { Input } from "./Styled/Input";

type Props = {
  isSeveral?: boolean;
  options: TPossibleAnswerItem[];
  onAddOption: () => void;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
};

export const PossibleAnswerList = ({
  isSeveral,
  options,
  onAddOption,
  inputValue,
  setInputValue,
}: Props) => {
  const handleChangeNewItem = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>): void => {
    setInputValue(currentTarget.value);
  };

  const handleAddNewItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setInputValue("");
    onAddOption();
  };

  const handleChange = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>): // currentId: string
  // currentId: number
  void => {
    // const index = possibleAnswers.findIndex(({ id }) => id === currentId);

    // setInputValue(currentTarget.value);
    // possibleAnswers[index].title = currentTarget.value;
    // setPossibleAnswers([...possibleAnswers]);
    console.log("change handler", currentTarget);
  };

  const handleFocus = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>): void => {
    console.log(currentTarget, currentTarget.value);
    // setInputValue(currentTarget.value);
  };

  const handleBlur = (e: FormEvent<HTMLInputElement>, value: string) => {
    console.dir(/* "blur", value, e.currentTarget.value, */ e.currentTarget);
    // setInputValue("");
  };

  return (
    <>
      {options?.map((item) => (
        <PossibleAnswerItem
          key={item.title}
          item={item}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ))}
      <Input value={inputValue} onChange={handleChangeNewItem} />
      <Button onClick={handleAddNewItem}>add new option</Button>
    </>
  );
};

type PAProps = {
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
}: PAProps) => {
  const [inputValue, setInputValue] = useState(item.title);

  useEffect(() => {
    setInputValue(item.title);
  }, [item]);

  const { editMod } = useContext(Context) as ContextType;

  if (editMod)
    return (
      <Input
        onChange={(e) => onChange(e, item)}
        // onChange={(e) => onChange(e, item.id)}
        // onChange={(e) => setInputValue(e.currentTarget.value)}
        onFocus={onFocus}
        // onBlur={(e) => onBlur(e, inputValue)}
        // value={item.title}
        value={inputValue}
      />
    );
  return (
    <>
      <input
        // type="checkbox"
        type="radio"
        name={String(item.id)}
        // checked={item.selected}
        // onChange={onChange}
        onFocus={onFocus}
        // onBlur={onBlur}
        onBlur={(e) => onBlur(e, inputValue)}
      />
      <label htmlFor={String(item.id)}>{item.title}</label>
    </>
  );
};
