import { Dispatch, FC, FormEvent, useState } from 'react';
import styled from 'styled-components';
import {
  ACTIONTYPE,
  IQuestionnaire,
} from '../../@types/questionnaire';
import { postRequestQuestionnaire } from '../../store/actions/postRequestQuestionnaire';
import { apiUrls } from '../../urls/apiUrls';
import { Button } from '../../components/Styled/Button';
import { Input } from '../../components/Styled/Input';
import { AddFormWrapper } from '../../components/AddFormWrapper';

type Props = {
  questionnaireDispatch: Dispatch<ACTIONTYPE>;
};

export const QuestionnaireAddForm: FC<Props> = ({ questionnaireDispatch }) => {
  const [value, setValue] = useState('');

  const onChange = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
    setValue(currentTarget.value);
  };

  const onClick = () => {
    const url = apiUrls.questionnaires;
    const requestBody: Omit<IQuestionnaire, '_id'> = {
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
    <AddFormWrapper>
      <H2>Add new Questionnaire</H2>
      <Form>
        <Input {...{ onChange, value }} />
        <Button {...{ onClick }}>New Questionnaire</Button>
      </Form>
    </AddFormWrapper>
  );
};

const H2 = styled.h2`
  margin-bottom: 8px;
  text-align: center;
`;

const Form = styled.div`
  display: grid;
  grid-gap: 8px;
  @media only screen and (min-width: 620px) {
    grid-template-columns: 3fr 1fr;
    grid-gap: 16px;
  }
`;
