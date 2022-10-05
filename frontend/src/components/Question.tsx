import { FC, useContext } from "react";
import styled from "styled-components";
import { ContextType } from "../@types/context";
import { IQuestion } from "../@types/question";
import { Context } from "../context/context";
import { QuestionItemProvider } from "../context/questionItemContext";
import { AnswerTypeComponent } from "./AnswerType";
import { Button } from "./Styled/Button";

type Props = {
  question: IQuestion;
};

export const Question: FC<Props> = ({ question }) => {
  const { _id, questionText, answerType } = question;

  const { removeQuestion, editQuestion, editMod } = useContext(
    Context
  ) as ContextType;

  return (
    <QuestionItemProvider {...{ question }}>
      <Wrapper>
        <div>
          <h3>{questionText}</h3>
          <p>{answerType}</p>
          <AnswerTypeComponent answerType={answerType} />
        </div>
        {editMod && (
          <>
            <Button onClick={() => editQuestion(_id)}>edit</Button>
            <Button onClick={() => removeQuestion(_id)}>remove</Button>
          </>
        )}
      </Wrapper>
    </QuestionItemProvider>
  );
};

const Wrapper = styled.div`
  margin: 2px 0;
  border: green solid 2px;
  border-radius: 3px;
  padding: 8px 16px;
`;
