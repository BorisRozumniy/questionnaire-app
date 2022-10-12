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
    <form onSubmit={(e) => handleSave(e, currentQuestion)}>
      <div>
        <div>
          <label htmlFor="questionText">Question</label>
          <Input
            value={currentQuestion.questionText}
            onChange={handleQuestionText}
            type="text"
            name="questionText"
          />
        </div>
        <div>
          <label>Answer type</label>
          <AnswerTypeSelect
            onChange={handleChangeSelect}
            value={currentQuestion.answerType}
          />
        </div>
      </div>
      {currentQuestion.answerType && (
        <AnswerTypeComponent answerType={currentQuestion.answerType} />
      )}
      <Button disabled={!currentQuestion.questionText ? true : false}>
        {isEditForm ? "Save changes" : "Save question"}
      </Button>
    </form>
  );
};
