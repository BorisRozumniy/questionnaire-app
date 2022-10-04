import { useContext, useEffect } from "react";
import { ContextType } from "../@types/question";
import { getRequestQuestionnaires } from "../actions/getRequestQuestionnaires";
import { apiUrls } from "../urls/apiUrls";
import { QuestionnaireAddForm } from "../components/QuestionnaireAddForm";
import { Context } from "../context/context";

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
      {questionnaireState.questionnaires.map((item) => (
        <p key={item._id}>{item.name}</p>
      ))}
      <QuestionnaireAddForm {...{ setQuestionMod, questionnaireDispatch }} />
    </>
  );
};
