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
  const { respondentsState, respondentsDispatch } = useContext(
    Context
  ) as ContextType;

  const { question } = useContext(
    QuestionItemContext
  ) as QuestionItemContextType;

  let params = useParams();
  const respondentId = params.id!.substring(1);
  const respondent = respondentsState.respondents.find(
    (item) => item._id === respondentId
  );

  const originAnswer = respondent?.answers?.find(
    (answer) => answer.questionId === question._id
  );

  const [value, setValue] = useState(originAnswer?.value || "");

  const onChange: onChangeT = ({ currentTarget }) =>
    setValue(currentTarget.value);

  const onBlur = (): void => {
    const newUserAnswer: UserAnswer = {
      questionId: question._id,
      value: value,
      _id: originAnswer?._id || "",
    };

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
