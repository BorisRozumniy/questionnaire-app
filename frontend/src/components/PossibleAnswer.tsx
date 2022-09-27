import { FormEvent, MouseEvent, useContext, useEffect } from "react";
import styled from "styled-components";
import {
  ContextType,
  IQuestion,
  QuestionItemContextType,
  TPossibleAnswerItem,
} from "../@types/question";
import { saveEditedQuestion } from "../actions/saveEditedQuestion";
import { Context } from "../context/context";
import { QuestionItemContext } from "../context/questionItemContext";
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

  const { editMod, questions, setQuestions } = useContext(
    Context
  ) as ContextType;
  const { question } = useContext(
    QuestionItemContext
  ) as QuestionItemContextType;

  const [selectedOption, setSelectedOption] = useSelectedOne("");

  useEffect(() => {
    if (selectedOption) {
      const questionUpdate: IQuestion = {
        ...question,
        userAnswer: selectedOption,
      };
      saveEditedQuestion(questionUpdate, questions, setQuestions);
    }
  }, [selectedOption]);

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
