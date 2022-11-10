import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { ActionMeta, SingleValue } from "react-select";
import {
  IQuestion,
  AnswerType,
  Option,
  ACTIONTYPE,
  NewQuestion,
} from "../@types/question";
import { Input } from "./Styled/Input";
import { Button } from "./Styled/Button";
import { AnswerTypeSelect } from "./AnswerTypeSelect";
import { AnswerTypeComponent } from "./AnswerType";
import { postRequestQuestion } from "../actions/postRequestQuestion";
import { patchRequestEditQuestion } from "../actions/editRequestQuestion";
import { TMongoId } from "../@types/common";
import styled from "styled-components";
import { Context } from "../context/context";
import { ContextType } from "../@types/context";
import { UserAnswer } from "../@types/respondent";

type OnChange = (
  newValue: SingleValue<Option>,
  actionMeta: ActionMeta<Option>
) => void;

type Pros = {
  questionnaireId: TMongoId;
  question?: IQuestion;
  dispatch: Dispatch<ACTIONTYPE>;
  isEditForm?: boolean;
  setEditMod?: Dispatch<SetStateAction<boolean>>;
};

const initialQuestion: NewQuestion = {
  questionText: "",
  answerType: AnswerType.text,
  answerOptions: [],
  answer: {} as UserAnswer,
};

export const QuestionForm: FC<Pros> = ({
  isEditForm,
  questionnaireId,
  question,
  dispatch,
  setEditMod,
}) => {
  const { temporaryQuestion, setTemporaryQuestion } = useContext(
    Context
  ) as ContextType;

  useEffect(() => {
    if (question) {
      setTemporaryQuestion(question);
    }
  }, []);

  const handleQuestionText = (e: FormEvent<HTMLInputElement>): void => {
    setTemporaryQuestion({
      ...temporaryQuestion,
      questionText: e.currentTarget.value,
    });
  };

  const handleChangeSelect: OnChange = (selected) => {
    const isNeedList =
      selected?.value === AnswerType.oneOfTheList ||
      selected?.value === AnswerType.aFewFromTheList;

    selected &&
      setTemporaryQuestion({
        ...temporaryQuestion,
        answerType: selected?.value,
      });

    isNeedList &&
      setTemporaryQuestion({
        ...temporaryQuestion,
        answerType: selected?.value,
        answerOptions: [],
      });
  };

  const handleSave = (temporaryQuestion: NewQuestion | IQuestion) => {
    if (temporaryQuestion._id) {
      patchRequestEditQuestion({
        requestBody: temporaryQuestion as IQuestion,
        questionnaireId,
        dispatch,
      });
    } else {
      postRequestQuestion({
        requestBody: temporaryQuestion,
        questionnaireId,
        dispatch,
      });
    }
    setEditMod && setEditMod(false);
    setTemporaryQuestion(initialQuestion);
  };

  return (
    <div>
      <Field>
        <Label htmlFor="questionText">Question</Label>
        <Input
          value={temporaryQuestion.questionText || ""}
          onChange={handleQuestionText}
          onKeyUp={({ key }) =>
            key === "Enter" && handleSave(temporaryQuestion)
          }
          type="text"
          name="questionText"
        />
      </Field>
      <Field>
        <Label>Answer type</Label>
        <AnswerTypeSelect
          onChange={handleChangeSelect}
          value={temporaryQuestion.answerType}
        />
      </Field>
      {temporaryQuestion.answerType && (
        <AnswerTypeComponent answerType={temporaryQuestion.answerType} />
      )}
      <Button
        onClick={() => handleSave(temporaryQuestion)}
        disabled={!temporaryQuestion.questionText ? true : false}
      >
        {isEditForm ? "Save changes" : "Save question"}
      </Button>
    </div>
  );
};

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
