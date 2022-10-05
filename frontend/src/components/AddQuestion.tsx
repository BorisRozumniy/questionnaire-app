import { FC, FormEvent, useContext } from "react";
import { ActionMeta, SingleValue } from "react-select";
import { Context } from "../context/context";
import { IQuestion, AnswerType, Option } from "../@types/question";
import { Input } from "./Styled/Input";
import { Button } from "./Styled/Button";
import { AnswerTypeSelect } from "./AnswerTypeSelect";
import { AnswerTypeComponent } from "./AnswerType";
import { QuestionItemProvider } from "../context/questionItemContext";
import { ContextType } from "../@types/context";

type OnChange = (
  newValue: SingleValue<Option>,
  actionMeta: ActionMeta<Option>
) => void;

export const AddQuestion: FC = () => {
  const { saveQuestion, editMod, temporaryQuestion, setTemporaryQuestion } =
    useContext(Context) as ContextType;

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

  const handleSave = (e: FormEvent, temporaryQuestion: IQuestion | any) => {
    e.preventDefault();
    saveQuestion(temporaryQuestion);
  };

  if (editMod)
    return (
      <QuestionItemProvider {...{ question: temporaryQuestion }}>
        <h2>Create question</h2>
        <form
          className="Form"
          onSubmit={(e) => handleSave(e, temporaryQuestion)}
        >
          <div>
            <div>
              <label htmlFor="questionText">Question</label>
              <Input
                onChange={handleQuestionText}
                type="text"
                name="questionText"
              />
            </div>
            <div>
              <label>Answer type</label>
              <AnswerTypeSelect onChange={handleChangeSelect} />
            </div>
          </div>
          <AnswerTypeComponent answerType={temporaryQuestion.answerType} />
          <Button disabled={!temporaryQuestion.questionText ? true : false}>
            Add Question
          </Button>
        </form>
      </QuestionItemProvider>
    );

  return null;
};

export const options = [
  { value: AnswerType.text, label: AnswerType.text },
  { value: AnswerType.data, label: AnswerType.data },
  { value: AnswerType.oneOfTheList, label: AnswerType.oneOfTheList },
  { value: AnswerType.aFewFromTheList, label: AnswerType.aFewFromTheList },
  { value: AnswerType.scale, label: AnswerType.scale },
];
