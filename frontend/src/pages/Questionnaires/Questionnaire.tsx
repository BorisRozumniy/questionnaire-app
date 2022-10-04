import { FC } from "react";
import { Card } from "../../components/Styled/Card";
import styled from "styled-components";
import { IQuestionnaire } from "../../@types/questionnaire";
import { useNavigate } from "react-router-dom";
import { frontendUrls } from "../../urls/frontendUrls";

type Props = {
  questionnaire: IQuestionnaire;
};

export const Questionnaire: FC<Props> = ({ questionnaire }) => {
  const { _id, name, questions } = questionnaire;

  let navigate = useNavigate();

  const onClick = () => navigate(`${frontendUrls.questionnaires}:${_id}`);

  return (
    <Card onClick={onClick} tabIndex={0}>
      <Head>{name}</Head>
      <Text>questions: {questions?.length || 0}</Text>
    </Card>
  );
};

const Head = styled.h3`
  color: ${({ theme }) => theme.colors.red}; ;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.blue}; ;
`;
