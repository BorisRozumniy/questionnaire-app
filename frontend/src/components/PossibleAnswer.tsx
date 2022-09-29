import { FormEvent, MouseEvent, useContext, useEffect } from "react";
import styled from "styled-components";
import {
  ContextType,
  IQuestion,
  QuestionItemContextType,
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
};

export const PossibleAnswerList = ({ isSeveral }: Props) => {
  const { editMod, questions, setQuestions } = useContext(
    Context
  ) as ContextType;

  const { question, newOptionValue, setNewOptionValue } = useContext(
    QuestionItemContext
  ) as QuestionItemContextType;

  const [selectedOption, setSelectedOption] = useSelectedOne();

  useEffect(() => {
    typeof question.userAnswer === "string" &&
      selectedOption === "" &&
      setSelectedOption(question.userAnswer);
  }, [question]);

  useEffect(() => {
    if (selectedOption && question.userAnswer !== selectedOption) {
      const questionUpdate: IQuestion = {
        ...question,
        userAnswer: selectedOption,
      };
      saveEditedQuestion(questionUpdate, questions, setQuestions);
    }
  }, [selectedOption]);

  const handleChangeNewItem = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>): void => {
    setNewOptionValue(currentTarget.value);
  };

  const handleAddNewItem = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (question.answerOptions) {
      const option = { title: newOptionValue, id: Date.now() };
      const questionUpdate: IQuestion = {
        ...question,
        answerOptions: [...question.answerOptions, option],
      };
      saveEditedQuestion(questionUpdate, questions, setQuestions);
    }
    setNewOptionValue("");
  };

  const handleChange = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>): // currentId: string
  // currentId: number
  void => {
    // const index = possibleAnswers.findIndex(({ id }) => id === currentId);

    // setNewOptionValue(currentTarget.value);
    // possibleAnswers[index].title = currentTarget.value;
    // setPossibleAnswers([...possibleAnswers]);
    console.log("change handler", currentTarget.value);
  };

  return (
    <OptionWrapper>
      {question.answerOptions?.map((item) => (
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
          <Input value={newOptionValue} onChange={handleChangeNewItem} />
          <Button onClick={handleAddNewItem}>add new option</Button>
        </>
      )}
    </OptionWrapper>
  );
};

const OptionWrapper = styled.div`
  padding: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
