import { FC, FormEvent, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ContextType } from "../@types/context";
import { QuestionItemContextType } from "../@types/question";
import { TUserAnswer } from "../@types/respondent";
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

  const originAnswerValue = respondent?.answers?.find(
    (answer) => answer.questionId === question._id
  )?.value;

  const [value, setValue] = useState(originAnswerValue || "");

  const onChange: onChangeT = ({ currentTarget }) =>
    setValue(currentTarget.value);

  const onBlur = (): void => {
    const newUserAnswer: TUserAnswer = {
      questionId: question._id,
      value: value,
    };
    if (respondent?.answers) {
      patchRequestChangeRespondentAnswer({
        requestBody: newUserAnswer,
        respondentId,
        dispatch: respondentsDispatch,
      });
    }
  };

  return <Input {...{ type, onChange, value, onBlur }} />;
};
