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

type OnChange = (
  newValue: SingleValue<Option>,
  actionMeta: ActionMeta<Option>
) => void;

type Pros = {
  isEditForm?: boolean;
  questionnaireId: TMongoId;
  question: IQuestion;
  dispatch: Dispatch<ACTIONTYPE>;
  setEditMod: Dispatch<SetStateAction<boolean>>;
};

export const QuestionForm: FC<Pros> = ({
  isEditForm,
  questionnaireId,
  question,
  dispatch,
  setEditMod,
}) => {
  const [requestBody, setRequestBody] = useState<IQuestion>(question);

  const handleQuestionText = (e: FormEvent<HTMLInputElement>): void => {
    setRequestBody({
      ...requestBody,
      questionText: e.currentTarget.value,
    });
  };

  const handleChangeSelect: OnChange = (selected) => {
    const isNeedList =
      selected?.value === AnswerType.oneOfTheList ||
      selected?.value === AnswerType.aFewFromTheList;

    selected &&
      setRequestBody({
        ...requestBody,
        answerType: selected?.value,
      });

    isNeedList &&
      setRequestBody({
        ...requestBody,
        answerType: selected?.value,
        answerOptions: [],
      });
  };

  const handleSave = (e: FormEvent, requestBody: IQuestion) => {
    e.preventDefault();
    const request = isEditForm ? patchRequestEditQuestion : postRequestQuestion;
    request({
      requestBody,
      questionnaireId,
      dispatch,
    });
    setEditMod(false);
  };

  return (
    <form onSubmit={(e) => handleSave(e, requestBody)}>
      <div>
        <div>
          <label htmlFor="questionText">Question</label>
          <Input
            value={requestBody.questionText}
            onChange={handleQuestionText}
            type="text"
            name="questionText"
          />
        </div>
        <div>
          <label>Answer type</label>
          <AnswerTypeSelect
            onChange={handleChangeSelect}
            value={requestBody.answerType}
          />
        </div>
      </div>
      <AnswerTypeComponent answerType={requestBody.answerType} />
      <Button disabled={!requestBody.questionText ? true : false}>
        Save changes
      </Button>
    </form>
  );
};
