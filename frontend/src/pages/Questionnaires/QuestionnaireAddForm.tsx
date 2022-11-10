import { Dispatch, FC, FormEvent, useState } from "react";
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

export const QuestionnaireAddForm: FC<Props> = ({ questionnaireDispatch }) => {
  const [isShown, setIsShown] = useState(false);

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

  const toggleShow = () => setIsShown(!isShown);

  if (!isShown) return <ShowButton onClick={toggleShow}>+</ShowButton>;

  return (
    <Wrapper>
      <CloseButton onClick={toggleShow} bg="red">
        x
      </CloseButton>
      <H2>Add new Questionnaire</H2>
      <Form>
        <Input {...{ onChange, value }} />
        <Button {...{ onClick }}>New Questionnaire</Button>
      </Form>
    </Wrapper>
  );
};

const ShowButton = styled(Button)`
  position: fixed;
  bottom: 32px;
  right: 32px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  border: solid 2px ${({ theme }) => theme.colors.main};
  border-radius: 6px;
  min-width: 280px;
  max-width: 500px;
  padding: 16px;
  position: relative;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

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
