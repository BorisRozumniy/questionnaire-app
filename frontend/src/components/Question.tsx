import { FC, useContext, useState } from "react";
import styled from "styled-components";
import { TMongoId } from "../@types/common";
import { ContextType } from "../@types/context";
import { IQuestion } from "../@types/question";
import { deleteRequestQuestion } from "../actions/deleteRequestQuestion";
import { Context } from "../context/context";
import { QuestionItemProvider } from "../context/questionItemContext";
import { AnswerTypeComponent } from "./AnswerType";
import { QuestionForm } from "./QuestionForm";
import { Button } from "./Styled/Button";
import { SwitchButton } from "./SwitchButton";

type Props = {
  question: IQuestion;
  questionnaireId: TMongoId;
  pollingMode?: boolean;
};

export const Question: FC<Props> = ({
  question,
  questionnaireId,
  pollingMode,
}) => {
  const { _id, questionText, answerType } = question;

  const { questionsDispatch } = useContext(Context) as ContextType;

  const [editMode, setEditMod] = useState(false);

  const handleChange = () => setEditMod(!editMode);

  return (
    <QuestionItemProvider
      {...{ question, pollingMode, editMode, questionnaireId }}
    >
      <Wrapper>
        {!editMode ? (
          <div>
            <h3>{questionText}</h3>
            {!pollingMode && <p>{answerType}</p>}
            <AnswerTypeComponent answerType={answerType} />
          </div>
        ) : (
          <QuestionForm
            {...{
              isEditForm: true,
              dispatch: questionsDispatch,
              questionnaireId,
              question,
              setEditMod,
            }}
          />
        )}
        {!pollingMode && (
          <>
            {editMode && "edit mode"}
            <SwitchButton {...{ id: _id, checked: editMode, handleChange }} />
            <Button
              onClick={() =>
                deleteRequestQuestion({
                  removedQuestionId: _id,
                  questionnaireId,
                  dispatch: questionsDispatch,
                })
              }
            >
              remove
            </Button>
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
