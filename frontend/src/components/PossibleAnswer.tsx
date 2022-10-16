import { FormEvent, MouseEvent, useContext, useEffect } from "react";
import styled from "styled-components";
import { ContextType } from "../@types/context";
import { IQuestion, QuestionItemContextType } from "../@types/question";
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
  const { temporaryQuestion, setTemporaryQuestion } = useContext(
    Context
  ) as ContextType;

  const { question, newOptionValue, setNewOptionValue, pollingMode, editMode } =
    useContext(QuestionItemContext) as QuestionItemContextType;

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
      console.log(questionUpdate);
    }
  }, [selectedOption]);

  const handleChangeNewItem = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>): void => {
    setNewOptionValue(currentTarget.value);
  };

  const handleAddNewItem = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (temporaryQuestion.answerOptions) {
      const option = { title: newOptionValue, id: Date.now() };
      const questionUpdate = {
        ...temporaryQuestion,
        answerOptions: temporaryQuestion.answerOptions && [
          ...temporaryQuestion.answerOptions,
          option,
        ],
      };

      setTemporaryQuestion(questionUpdate);
    }

    setNewOptionValue("");
  };

  const currentQuestion = editMode ? temporaryQuestion : question;

  return (
    <>
      <OptionWrapper>
        {currentQuestion.answerOptions?.map((item) => (
          <PossibleAnswerItem
            key={item.title}
            item={item}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        ))}
      </OptionWrapper>
      {editMode && !pollingMode && (
        <NewOptionField>
          <Input value={newOptionValue} onChange={handleChangeNewItem} />
          <Button onClick={handleAddNewItem}>add new option</Button>
        </NewOptionField>
      )}
    </>
  );
};

const OptionWrapper = styled.div`
  padding: 4px;
  display: grid;
  grid-template-columns: 90%;
  justify-content: center;
  @media only screen and (min-width: 620px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (min-width: 920px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const NewOptionField = styled.div`
  display: grid;
  grid-gap: 8px;
  margin-bottom: 8px;
  padding: 16px;
  grid-template-columns: minmax(175px, 300px);
  justify-content: center;
  @media only screen and (min-width: 620px) {
    grid-template-columns: 3fr 1fr;
  }
`;
