import { FC, useContext } from "react";
import styled from "styled-components";
import { IQuestion, ContextType } from "../@types/question";
import { Context } from "../context/context";
import { AnswerTypeComponent } from "./AnswerType";
import { Button } from "./Styled/Button";

type Props = {
  question: IQuestion;
};

export const Question: FC<Props> = ({ question }) => {
  const { _id, questionText, answerType, answer } = question;
  const { removeQuestion, editQuestion, editMod } = useContext(
    Context
  ) as ContextType;
  if (editMod)
    return (
      <Wrapper>
        <div>
          <h3>{questionText}</h3>
          <p>{answerType}</p>
          {/* <AnswerTypeComponent answerType={answerType} answer={answer} /> */}
        </div>
        <Button onClick={() => editQuestion(_id)}>edit</Button>
        <Button onClick={() => removeQuestion(_id)}>remove</Button>
      </Wrapper>
    );
  return (
    <>
      <Wrapper>
        {questionText}
        <p>{answerType}</p>
      </Wrapper>
      {/* <AnswerTypeComponent answerType={answerType} answer={answer} /> */}
    </>
  );
};

const Wrapper = styled.div`
  margin: 2px 0;
  border: green solid 2px;
  border-radius: 3px;
  padding: 8px 16px;
`;

const mockData = [
  {
    title: "item 1",
    selected: false,
    id: 0o1,
  },
  {
    title: "item 2",
    selected: false,
    id: 0o2,
  },
  {
    title: "item 3",
    selected: true,
    id: 0o3,
  },
];
