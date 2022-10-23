import { FormEvent, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ContextType } from "../@types/context";
import {
  QuestionItemContextType,
  TPossibleAnswerItem,
} from "../@types/question";
import { AnswerOption } from "../@types/respondent";
import { patchRequestChangeRespondentAnswer } from "../actions/patchRequestChangeRespondentAnswer";
import { Context } from "../context/context";
import { QuestionItemContext } from "../context/questionItemContext";
import { useSelectedMultiple } from "../useSelected";
import { Button } from "./Styled/Button";
import { Input } from "./Styled/Input";

export const PossibleAnswerListSeveral = () => {
  const {
    temporaryQuestion,
    setTemporaryQuestion,
    respondentsState,
    respondentsDispatch,
  } = useContext(Context) as ContextType;

  const { question, newOptionValue, setNewOptionValue, pollingMode, editMode } =
    useContext(QuestionItemContext) as QuestionItemContextType;

  let params = useParams();
  const respondentId = params.id!.substring(1);
  const respondent = respondentsState.respondents.find(
    (item) => item._id === respondentId
  );

  const originAnswer = respondent?.answers?.find(
    (answer) => answer.questionId === question._id
  );

  const originAnswerValue = Array.isArray(originAnswer?.value)
    ? originAnswer?.value
    : [];

  const [selectedOptions, toggleSelectedOption] =
    useSelectedMultiple(originAnswerValue);

  let filterTimeout: NodeJS.Timeout;

  const prevSelectedOptionsRef = useRef([] as AnswerOption[]);

  useEffect(() => {
    /* TODO: debounce well be here */
    // console.log(
    //   "before",
    //   prevSelectedOptionsRef.current,
    //   selectedOptions,
    //   "filterTimeout",
    //   filterTimeout
    // );

    // clearTimeout(filterTimeout);

    if (selectedOptions.length !== prevSelectedOptionsRef.current.length) {
      // filterTimeout = setTimeout(() => {
      const requestBody = {
        questionId: question._id,
        value: selectedOptions,
      };
      patchRequestChangeRespondentAnswer({
        respondentId,
        requestBody,
        dispatch: respondentsDispatch,
      });
    }
    // }, 5000);

    prevSelectedOptionsRef.current = selectedOptions;
  }, [selectedOptions]);

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

    setNewOptionValue("");
  };

  const handleRemoveItem = (item: TPossibleAnswerItem) => {
    if (temporaryQuestion.answerOptions) {
      const answerOptions = temporaryQuestion.answerOptions.filter(
        (option) => option.id !== item.id
      );
      const questionUpdate = {
        ...temporaryQuestion,
        answerOptions,
      };
      setTemporaryQuestion(questionUpdate);
    }
  };

  const handleSelectChange = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>): void => {
    if (originAnswerValue && Array.isArray(originAnswerValue)) {
      const findedQuestionOption = question.answerOptions?.find(
        ({ title }) => title === currentTarget.value
      );

      findedQuestionOption &&
        toggleSelectedOption({
          id: findedQuestionOption?.id,
          title: currentTarget.value,
        });
    }
  };

  const currentQuestion = editMode ? temporaryQuestion : question;

  return (
    <>
      <OptionWrapper>
        {currentQuestion.answerOptions?.map((item) => (
          <div key={item.id}>
            <Label>
              <InputCheckbox
                type="checkbox"
                value={item.title}
                checked={selectedOptions.some(({ id }) => id === item.id)}
                onChange={handleSelectChange}
                disabled={!pollingMode}
              />
              {item.title}
            </Label>
            {editMode && (
              <Button
                onClick={() => handleRemoveItem(item)}
                key={item.id + "remove-button"}
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
            onKeyUp={({ key }) => key === "Enter" && handleAddNewItem()}
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

const InputCheckbox = styled(Input)`
  cursor: pointer;
  margin-right: 4px;
`;
const Label = styled.label`
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;
