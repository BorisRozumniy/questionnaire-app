import { FC, FormEvent, useContext, useState } from "react";
import styled from "styled-components";
import { ContextType } from "../@types/context";
import { TPossibleAnswerItem } from "../@types/question";
import { Context } from "../context/context";
import { Input } from "./Styled/Input";

type onChangeT = (e: FormEvent<HTMLInputElement>) => void;

type Props = {
  item: TPossibleAnswerItem;
};

export const AnswerItemInput: FC<Props> = ({ item }) => {
  const [value, setValue] = useState(item.title);

  const { temporaryQuestion, setTemporaryQuestion } = useContext(
    Context
  ) as ContextType;

  const onChange: onChangeT = ({ currentTarget }) =>
    setValue(currentTarget.value);

  const onBlur = (): void => {
    if (temporaryQuestion.answerOptions && item.title !== value) {
      const newAnswerOptions = temporaryQuestion.answerOptions.map((option) => {
        if (option.id === item.id) return { ...option, title: value };
        return option;
      });

      const questionUpdate = {
        ...temporaryQuestion,
        answerOptions: newAnswerOptions,
      };

      setTemporaryQuestion(questionUpdate);
    }
  };

  return <InputOption {...{ onChange, value, onBlur }} />;
};

const InputOption = styled(Input)`
  margin: 4px;
`;
