import { FormEvent, MouseEvent, useContext } from "react";
import styled from "styled-components";
import { ContextType, TPossibleAnswerItem } from "../@types/question";
import { Context } from "../context/context";
import { useInput } from "../useInput";
import { useSelectedOne } from "../useSelected";
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

  const { editMod } = useContext(Context) as ContextType;

  const [selectedOption, setSelectedOption] = useSelectedOne("");

  return (
    <OptionWrapper>
      {options?.map((item) => (
        <PossibleAnswerItem
          key={item.title}
          item={item}
          onChange={handleChange}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      ))}
      {editMod && (
        <>
          <Input value={inputValue} onChange={handleChangeNewItem} />
          <Button onClick={handleAddNewItem}>add new option</Button>
        </>
      )}
    </OptionWrapper>
  );
};

const OptionWrapper = styled.form`
  padding: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
