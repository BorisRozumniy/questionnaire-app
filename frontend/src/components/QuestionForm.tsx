import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { ActionMeta, SingleValue } from "react-select";
import { IQuestion, AnswerType, Option, ACTIONTYPE } from "../@types/question";
import { Input } from "./Styled/Input";
import { Button } from "./Styled/Button";
import { AnswerTypeSelect } from "./AnswerTypeSelect";
import { AnswerTypeComponent } from "./AnswerType";
import { postRequestQuestion } from "../actions/postRequestQuestion";
import { patchRequestEditQuestion } from "../actions/editRequestQuestion";
import { TMongoId } from "../@types/common";
import styled from "styled-components";

type OnChange = (
  newValue: SingleValue<Option>,
  actionMeta: ActionMeta<Option>
) => void;

type Pros = {
  questionnaireId: TMongoId;
  question?: Partial<IQuestion>;
  dispatch: Dispatch<ACTIONTYPE>;
  isEditForm?: boolean;
  setEditMod?: Dispatch<SetStateAction<boolean>>;
};

const initialQuestion = {
  questionText: "",
  answerType: AnswerType.text,
};

export const QuestionForm: FC<Pros> = ({
  isEditForm,
  questionnaireId,
  question = initialQuestion,
  dispatch,
  setEditMod,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(question);

  const handleQuestionText = (e: FormEvent<HTMLInputElement>): void => {
    setCurrentQuestion({
      ...currentQuestion,
      questionText: e.currentTarget.value,
    });
  };

  const handleChangeSelect: OnChange = (selected) => {
    const isNeedList =
      selected?.value === AnswerType.oneOfTheList ||
      selected?.value === AnswerType.aFewFromTheList;

    selected &&
      setCurrentQuestion({
        ...currentQuestion,
        answerType: selected?.value,
      });

    isNeedList &&
      setCurrentQuestion({
        ...currentQuestion,
        answerType: selected?.value,
        answerOptions: [],
      });
  };

  const handleSave = (e: FormEvent, currentQuestion: Partial<IQuestion>) => {
    e.preventDefault();
    const request = isEditForm ? patchRequestEditQuestion : postRequestQuestion;
    request({
      requestBody: currentQuestion as IQuestion,
      questionnaireId,
      dispatch,
    });
    setEditMod && setEditMod(false);
    setCurrentQuestion(initialQuestion);
  };

  return (
    <Form onSubmit={(e) => handleSave(e, currentQuestion)}>
      <Field>
        <Label htmlFor="questionText">Question</Label>
        <Input
          value={currentQuestion.questionText}
          onChange={handleQuestionText}
          type="text"
          name="questionText"
        />
      </Field>
      <Field>
        <Label>Answer type</Label>
        <AnswerTypeSelect
          onChange={handleChangeSelect}
          value={currentQuestion.answerType}
        />
      </Field>
      {currentQuestion.answerType && (
        <AnswerTypeComponent answerType={currentQuestion.answerType} />
      )}
      <Button disabled={!currentQuestion.questionText ? true : false}>
        {isEditForm ? "Save changes" : "Save question"}
      </Button>
    </Form>
  );
};

const Form = styled.form`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 6px;
`;

const Field = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 620px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Label = styled.label`
  margin-right: 8px;
  font-weight: 600;
  @media only screen and (min-width: 620px) {
    min-width: 130px;
  }
`;
