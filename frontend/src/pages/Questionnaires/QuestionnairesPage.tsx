import { useContext, useEffect } from "react";
import { ContextType } from "../../@types/question";
import { getRequestQuestionnaires } from "../../actions/getRequestQuestionnaires";
import { apiUrls } from "../../urls/apiUrls";
import { QuestionnaireAddForm } from "./QuestionnaireAddForm";
import { Context } from "../../context/context";
import styled from "styled-components";
import { Questionnaire } from "./Questionnaire";

export const QuestionnairesPage = () => {
  const { questionnaireDispatch, questionnaireState, setQuestionMod } =
    useContext(Context) as ContextType;

  useEffect(() => {
    getRequestQuestionnaires({
      url: apiUrls.questionnaires,
      dispatch: questionnaireDispatch,
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
  margin: 16px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
`;
