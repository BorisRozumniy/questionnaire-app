import { FC, FormEvent, useContext, useState } from "react";
import styled from "styled-components";
// import { ContextType } from "../@types/context";
import {
  QuestionItemContextType,
  TPossibleAnswerItem,
} from "../@types/question";
// import { saveEditedQuestion } from "../actions/saveEditedQuestion";
// import { Context } from "../context/context";
import { QuestionItemContext } from "../context/questionItemContext";
import { Input } from "./Styled/Input";

type onChangeT = (e: FormEvent<HTMLInputElement>) => void;

type Props = {
  item: TPossibleAnswerItem;
};

export const AnswerItemInput: FC<Props> = ({ item }) => {
  const [value, setValue] = useState(item.title);

  // const { questions, setQuestions } = useContext(Context) as ContextType;

  const { question } = useContext(
    QuestionItemContext
  ) as QuestionItemContextType;

  const onChange: onChangeT = ({ currentTarget }) =>
    setValue(currentTarget.value);

  const onBlur = (): void => {
    if (question.answerOptions && item.title !== value) {
      const newAnswerOptions = question.answerOptions.map((option) => {
        if (option.id === item.id) return { ...option, title: value };
        return option;
      });

      const questionUpdate = {
        ...question,
        answerOptions: newAnswerOptions,
      };
      // saveEditedQuestion(questionUpdate, questions, setQuestions);
    }
  };

  return <InputOption {...{ onChange, value, onBlur }} />;
};

const InputOption = styled(Input)`
  margin: 4px;
`;
