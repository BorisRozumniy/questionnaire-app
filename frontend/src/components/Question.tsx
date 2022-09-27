import { FC, useContext } from "react";
import styled from "styled-components";
import { IQuestion, ContextType } from "../@types/question";
import { Context } from "../context/context";
import { useInput } from "../useInput";
import { AnswerTypeComponent } from "./AnswerType";
import { Button } from "./Styled/Button";

type Props = {
  question: IQuestion;
};

export const Question: FC<Props> = ({ question }) => {
  const { _id, questionText, answerType, answerOptions } = question;
  const { removeQuestion, editQuestion, saveEditedQuestion, editMod } =
    useContext(Context) as ContextType;
  const [newOptionValue, setNewOptionValue] = useInput("");

  const handleAddOption = () => {
    const option = { title: newOptionValue, id: Date.now() };
    question.answerOptions &&
      saveEditedQuestion({
        ...question,
        answerOptions: [...question.answerOptions, option],
      });
  };

  return (
    <Wrapper>
      <div>
        <h3>{questionText}</h3>
        <p>{answerType}</p>
        <AnswerTypeComponent
          answerType={answerType}
          answerOptions={answerOptions}
          onAddOption={handleAddOption}
          inputValue={newOptionValue}
          setInputValue={setNewOptionValue}
        />
      </div>
      {editMod && (
        <>
          <Button onClick={() => editQuestion(_id)}>edit</Button>
          <Button onClick={() => removeQuestion(_id)}>remove</Button>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 2px 0;
  border: green solid 2px;
  border-radius: 3px;
  padding: 8px 16px;
`;
