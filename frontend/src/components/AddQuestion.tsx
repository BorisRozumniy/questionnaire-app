import { FC, FormEvent, useContext, useState } from "react";
import { ActionMeta, SingleValue } from "react-select";
import { Context } from "../context/context";
import { ContextType, IQuestion, AnswerType, Option } from "../@types/question";
import { Input } from "./Styled/Input";
import { Button } from "./Styled/Button";
import { AnswerTypeSelect } from "./AnswerTypeSelect";
import { AnswerTypeComponent } from "./AnswerType";
import { useInput } from "../useInput";

type OnChange = (
  newValue: SingleValue<Option>,
  actionMeta: ActionMeta<Option>
) => void;

export const AddQuestion: FC = () => {
  const { saveQuestion, editMod } = useContext(Context) as ContextType;
  const [formData, setFormData] = useState({} as IQuestion);

  const handleQuestionText = (e: FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      questionText: e.currentTarget.value,
    });
  };

  const handleChangeSelect: OnChange = (selected) => {
    const isNeedList =
      selected?.value === AnswerType.oneOfTheList ||
      selected?.value === AnswerType.aFewFromTheList;

    selected &&
      setFormData({
        ...formData,
        answerType: selected?.value,
      });

    isNeedList &&
      setFormData({
        ...formData,
        answerType: selected?.value,
        answerOptions: [],
      });
  };

  const handleSave = (e: FormEvent, formData: IQuestion | any) => {
    e.preventDefault();
    saveQuestion(formData);
  };

  if (editMod)
    return (
      <>
        <h2>Create question</h2>
        <form className="Form" onSubmit={(e) => handleSave(e, formData)}>
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
          <AnswerTypeComponent answerType={formData.answerType} />
          <Button disabled={!formData.questionText ? true : false}>
            Add Question
          </Button>
        </form>
      </>
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
