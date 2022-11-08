import { FC, FormEvent, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ContextType } from "../@types/context";
import { QuestionItemContextType } from "../@types/question";
import { UserAnswer } from "../@types/respondent";
import { patchRequestChangeRespondentAnswer } from "../actions/patchRequestChangeRespondentAnswer";
import { Context } from "../context/context";
import { QuestionItemContext } from "../context/questionItemContext";
import { Input } from "./Styled/Input";

type onChangeT = (e: FormEvent<HTMLInputElement>) => void;

type Props = {
  type?: "text" | "date" | "range";
};

export const SimpleField: FC<Props> = ({ type }) => {
  const { respondentsDispatch } = useContext(Context) as ContextType;

  const { question } = useContext(
    QuestionItemContext
  ) as QuestionItemContextType;

  let params = useParams();
  const respondentId = params.id!.substring(1);

  const originAnswer =
    question.answers?.length !== 0 ? question.answers![0] : null;

  const [value, setValue] = useState(originAnswer?.value || "");

  const onChange: onChangeT = ({ currentTarget }) =>
    setValue(currentTarget.value);

  const onBlur = (): void => {
    const newUserAnswer: UserAnswer = {
      questionId: question._id,
      value: value,
      _id: originAnswer?._id || "",
    };

    if (value !== originAnswer?.value)
      patchRequestChangeRespondentAnswer({
        requestBody: newUserAnswer,
        respondentId,
        dispatch: respondentsDispatch,
      });
  };

  if (typeof value === "string")
    return <Input {...{ type, onChange, value, onBlur }} />;
  return null;
};
