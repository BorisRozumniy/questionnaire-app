import { FormEvent, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ContextType } from '../@types/context';
import {
  QuestionItemContextType,
  TPossibleAnswerItem,
} from '../@types/question';
import { UserAnswer } from '../@types/respondent';
import { patchRequestChangeRespondentAnswer } from '../store/actions/patchRequestChangeRespondentAnswer';
import { Context } from '../context/context';
import { QuestionItemContext } from '../context/questionItemContext';
import { useSelectedOne } from '../useSelected';
import { PossibleAnswerItem } from './PossibleAnswerItem';
import { Button } from './Styled/Button';
import { Input } from './Styled/Input';

export const PossibleAnswerList = () => {
  const { temporaryQuestion, setTemporaryQuestion, respondentsDispatch } =
    useContext(Context) as ContextType;

  const { question, newOptionValue, setNewOptionValue, pollingMode, editMode } =
    useContext(QuestionItemContext) as QuestionItemContextType;

  const { answer, _id: questionId } = question;

  const params = useParams();
  const respondentId = params.id?.substring(1);

  const [selectedOption, setSelectedOption] = useSelectedOne(
    answer?.value ? String(answer?.value) : '',
  );

  useEffect(() => {
    typeof answer?.value === 'string' &&
      selectedOption === '' &&
      setSelectedOption(answer?.value);
  }, [answer?.value]);

  useEffect(() => {
    if (selectedOption && answer?.value !== selectedOption && respondentId) {
      const newUserAnswer: UserAnswer = {
        questionId,
        value: selectedOption,
        _id: answer?._id || '',
      };

      patchRequestChangeRespondentAnswer({
        requestBody: newUserAnswer,
        respondentId,
        dispatch: respondentsDispatch,
      });
    }
  }, [selectedOption]);

  const handleChangeNewItem = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>): void => {
    setNewOptionValue(currentTarget.value);
  };

  const handleAddNewItem = () => {
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

    setNewOptionValue('');
  };

  const handleRemoveItem = (item: TPossibleAnswerItem) => {
    if (temporaryQuestion.answerOptions) {
      const answerOptions = temporaryQuestion.answerOptions.filter(
        (option) => option.id !== item.id,
      );
      const questionUpdate = {
        ...temporaryQuestion,
        answerOptions,
      };
      setTemporaryQuestion(questionUpdate);
    }
  };

  const currentQuestion = editMode ? temporaryQuestion : question;

  return (
    <>
      <OptionWrapper>
        {currentQuestion.answerOptions?.map((item) => (
          <div key={item.id}>
            <PossibleAnswerItem
              key={item.id + item.title}
              item={item}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            {editMode && (
              <Button
                onClick={() => handleRemoveItem(item)}
                key={item.id + 'remove-button'}
                bg="red"
              >
                x
              </Button>
            )}
          </div>
        ))}
      </OptionWrapper>
      {editMode && !pollingMode && (
        <NewOptionField>
          <Input
            value={newOptionValue}
            onChange={handleChangeNewItem}
            onKeyUp={({ key }) => key === 'Enter' && handleAddNewItem()}
          />
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
