import { FC, FormEvent, useContext, useState } from "react";
import { ContextType } from "../@types/context";
import { IQuestion, QuestionItemContextType } from "../@types/question";
import { saveEditedQuestion } from "../actions/saveEditedQuestion";
import { Context } from "../context/context";
import { QuestionItemContext } from "../context/questionItemContext";
import { Input } from "./Styled/Input";

type onChangeT = (e: FormEvent<HTMLInputElement>) => void;

export const TextField: FC = () => {
  const { editMod, questions, setQuestions } = useContext(
    Context
  ) as ContextType;

  const { question } = useContext(
    QuestionItemContext
  ) as QuestionItemContextType;

  const [value, setValue] = useState(question.userAnswer);

  const onChange: onChangeT = ({ currentTarget }) =>
    setValue(currentTarget.value);

  const onBlur = (): void => {
    if (question.userAnswer !== value) {
      const questionUpdate: IQuestion = {
        ...question,
        userAnswer: value,
      };
      saveEditedQuestion(questionUpdate, questions, setQuestions);
    }
  };

  return <Input {...{ disabled: editMod, onChange, value, onBlur }} />;
};
