import { FormEvent, MouseEvent, useContext, useEffect } from "react";
import styled from "styled-components";
import { ContextType } from "../@types/context";
import { IQuestion, QuestionItemContextType } from "../@types/question";
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
  // const {
  //   editMod,
  //   questions,
  //   setQuestions,
  //   temporaryQuestion,
  //   setTemporaryQuestion,
  // } = useContext(Context) as ContextType;

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
      // saveEditedQuestion(questionUpdate, questions, setQuestions);
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

      // question._id &&
      //   saveEditedQuestion(questionUpdate, questions, setQuestions);

      // temporaryQuestion &&
      //   setTemporaryQuestion({
      //     ...temporaryQuestion,
      //     answerOptions: [...(temporaryQuestion.answerOptions || []), option],
      //   });
    }
    setNewOptionValue("");
  };

  return (
    <OptionWrapper>
      {question.answerOptions?.map((item) => (
        <PossibleAnswerItem
          key={item.title}
          item={item}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      ))}
      {/* {editMod && (
        <>
          <Input value={newOptionValue} onChange={handleChangeNewItem} />
          <Button onClick={handleAddNewItem}>add new option</Button>
        </>
      )} */}
    </OptionWrapper>
  );
};

const OptionWrapper = styled.div`
  padding: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
