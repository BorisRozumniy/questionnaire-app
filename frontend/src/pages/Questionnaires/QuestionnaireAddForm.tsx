import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import styled from "styled-components";
import {
  QUESTIONNAIRES_ACTIONTYPE,
  IQuestionnaire,
} from "../../@types/questionnaire";
import { postRequestQuestionnaire } from "../../actions/postRequestQuestionnaire";
import { apiUrls } from "../../urls/apiUrls";
import { Button } from "../../components/Styled/Button";
import { Input } from "../../components/Styled/Input";

type Props = {
  questionnaireDispatch: Dispatch<QUESTIONNAIRES_ACTIONTYPE>;
};

export const QuestionnaireAddForm: FC<Props> = ({
  questionnaireDispatch,
}) => {
  const [value, setValue] = useState("");

  const onChange = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
    setValue(currentTarget.value);
  };

  const onClick = () => {
    const url = apiUrls.questionnaires;
    const requestBody: Omit<IQuestionnaire, "_id"> = {
      name: value,
      questions: [],
    };
    postRequestQuestionnaire({
      url,
      requestBody,
      dispatch: questionnaireDispatch,
    });
  };

  return (
    <Wrapper>
      <Input {...{ onChange, value }} />
      <Button {...{ onClick }}>New Questionnaire</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  border: solid 2px ${({ theme }) => theme.colors.main};
  border-radius: 6px;
  min-width: 280px;
  max-width: 500px;
  padding: 16px;
  display: grid;
  grid-gap: 8px;
  @media only screen and (min-width: 620px) {
    grid-template-columns: 3fr 1fr;
    grid-gap: 16px;
  }
`;
