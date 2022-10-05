import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ContextType } from "../../@types/context";
import { AddQuestion } from "../../components/AddQuestion";
import { Questions } from "../../components/Questions";
import { Context } from "../../context/context";

export const QuestionnairePage = () => {
  let params = useParams();
  const { questionnaireState } = useContext(Context) as ContextType;

  const questionnaire = questionnaireState.questionnaires.find(
    (item) => item._id === params.id?.substring(1)
  );

  return (
    <>
      <h1>Questionnaire: {questionnaire?.name}</h1>
      <Questions questionsIds={questionnaire?.questions} />
      <AddQuestion />
    </>
  );
};
