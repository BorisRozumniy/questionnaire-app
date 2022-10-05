import { useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ContextType } from "../../@types/context";
import { getRequestQuestionnaires } from "../../actions/getRequestQuestionnaires";
import { QuestionnaireAddForm } from "./QuestionnaireAddForm";
import { Context } from "../../context/context";
import { Questionnaire } from "./Questionnaire";

export const QuestionnairesPage = () => {
  const { questionnaireDispatch, questionnaireState, setQuestionMod } =
    useContext(Context) as ContextType;

  let params = useParams();

  useEffect(() => {
    getRequestQuestionnaires({
      dispatch: questionnaireDispatch,
      id: params.id,
    });
  }, []);

  return (
    <>
      <h1>QuestionnairesPage</h1>
      <ListWrapper>
        {questionnaireState.questionnaires.map((item) => (
          <Questionnaire key={item._id} questionnaire={item} />
        ))}
      </ListWrapper>
      <QuestionnaireAddForm {...{ setQuestionMod, questionnaireDispatch }} />
    </>
  );
};

const ListWrapper = styled.div`
  margin: 32px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
`;
