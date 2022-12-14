import { FC, useContext, useState } from 'react';
import styled from 'styled-components';
import { TMongoId } from '../@types/common';
import { ContextType } from '../@types/context';
import { IQuestion } from '../@types/question';
import { deleteRequestQuestion } from '../store/actions/deleteRequestQuestion';
import { Context } from '../context/context';
import { QuestionItemProvider } from '../context/questionItemContext';
import { AnswerTypeComponent } from './AnswerType';
import { QuestionForm } from './QuestionForm';
import { Button } from './Styled/Button';
import { SwitchButton } from './SwitchButton';

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

  const { questionnaireDispatch } = useContext(Context) as ContextType;

  const [editMode, setEditMod] = useState(false);

  const handleChange = () => setEditMod(!editMode);

  return (
    <QuestionItemProvider
      {...{ question, pollingMode, editMode, questionnaireId }}
    >
      <Wrapper {...{ editMode }}>
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
              dispatch: questionnaireDispatch,
              question,
              setEditMod,
            }}
          />
        )}
        {!pollingMode && (
          <>
            <SwitchButtonWrapper>
              <TextInfo {...{ editMode }}>
                {editMode ? 'edit mode' : 'read mode'}
              </TextInfo>
              <SwitchButton {...{ id: _id, checked: editMode, handleChange }} />
            </SwitchButtonWrapper>
            {editMode && (
              <RemoveButton
                onClick={() =>
                  deleteRequestQuestion({
                    removedQuestionId: _id,
                    questionnaireId,
                    dispatch: questionnaireDispatch,
                  })
                }
                bg="red"
              >
                remove
              </RemoveButton>
            )}
          </>
        )}
      </Wrapper>
    </QuestionItemProvider>
  );
};

const Wrapper = styled.div<{ editMode: boolean }>`
  margin: 4px 0;
  border: ${({ theme }) => theme.colors.main} solid 2px;
  border-radius: 3px;
  padding: 40px 32px 16px;
  position: relative;
  background-color: ${({ theme, editMode }) =>
    editMode && theme.colors.light}; ;
`;

const SwitchButtonWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
`;

const TextInfo = styled.span<{ editMode: boolean }>`
  color: ${({ theme, editMode }) =>
    editMode ? theme.colors.secondary : theme.colors.blue};
  margin-right: 8px;
  text-transform: capitalize;
`;

const RemoveButton = styled(Button)`
  position: absolute;
  right: 32px;
  bottom: 16px;
`;
