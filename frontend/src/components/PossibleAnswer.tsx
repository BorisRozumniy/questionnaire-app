import { FormEvent, MouseEvent } from "react";
import { TPossibleAnswerItem } from "../@types/question";
import { useInput } from "../useInput";
import { PossibleAnswerItem } from "./PossibleAnswerItem";
import { Button } from "./Styled/Button";
import { Input } from "./Styled/Input";

type Props = {
  isSeveral?: boolean;
  options: TPossibleAnswerItem[];
  onAddOption: () => void;
  inputValue: string;
  setInputValue: (newValue: string) => void;
};

export const PossibleAnswerList = ({
  isSeveral,
  options,
  onAddOption,
  inputValue,
  setInputValue,
}: Props) => {
  // const [optionValue, setOptionValue] = useState();
  // cosnt [] = useInput

  const handleChangeNewItem = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>): void => {
    setInputValue(currentTarget.value);
  };

  const handleAddNewItem = (event: MouseEvent<HTMLButtonElement>) => {
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
    console.log("change handler", currentTarget.value);
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
