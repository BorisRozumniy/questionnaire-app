import { Dispatch, FC, SetStateAction, useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ContextType } from "../../@types/context";
import { getRequestQuestionnaires } from "../../actions/getRequestQuestionnaires";
import { QuestionnaireAddForm } from "./QuestionnaireAddForm";
import { Context } from "../../context/context";
import { Questionnaire } from "./Questionnaire";
import { Container } from "../../components/Styled/Container";
import { theme } from "../../theme";

type Props = {
  lastRequestWasFromQuestionairePage: boolean;
  setLastRequestWasFromQuestionairePage: Dispatch<SetStateAction<boolean>>;
};

export const QuestionnairesPage: FC<Props> = ({
  lastRequestWasFromQuestionairePage,
  setLastRequestWasFromQuestionairePage,
}) => {
  const { questionnaireDispatch, questionnaireState } = useContext(
    Context
  ) as ContextType;

  let params = useParams();

  const { questionnaires } = questionnaireState;

  useEffect(() => {
    if (!questionnaires.length || lastRequestWasFromQuestionairePage) {
      setLastRequestWasFromQuestionairePage(false);
      getRequestQuestionnaires({
        dispatch: questionnaireDispatch,
        id: params.id,
      });
    }
  }, [questionnaires, lastRequestWasFromQuestionairePage]);

  return (
    <Container>
      <h1>QuestionnairesPage</h1>
      <ListWrapper>
        {questionnaireState.questionnaires.map((item) => (
          <Questionnaire key={item._id} questionnaire={item} />
        ))}
      </ListWrapper>
      <QuestionnaireAddForm {...{ questionnaireDispatch }} />
    </Container>
  );
};

const ListWrapper = styled.div`
  margin: 32px 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;
  @media only screen and (min-width: 620px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
  }
  @media only screen and (min-width: 920px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px;
  }
`;
