import { Dispatch, FC, SetStateAction, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContextType } from "../../@types/context";
import { getRequestQuestionnaires } from "../../actions/getRequestQuestionnaires";
import { AddQuestion } from "../../components/AddQuestion";
import { Questions } from "../../components/Questions";
import { Context } from "../../context/context";

type Props = {
  setLastRequestWasFromQuestionairePage: Dispatch<SetStateAction<boolean>>;
};

export const QuestionnairePage: FC<Props> = ({
  setLastRequestWasFromQuestionairePage,
}) => {
  let params = useParams();
  const id = params.id!.substring(1);
  const { questionnaireState, questionnaireDispatch } = useContext(
    Context
  ) as ContextType;

  const questionnaire = questionnaireState.questionnaires.find(
    (item) => item._id === id
  );

  useEffect(() => {
    if (!questionnaire) {
      setLastRequestWasFromQuestionairePage(true);
      getRequestQuestionnaires({
        dispatch: questionnaireDispatch,
        id,
      });
    }
  }, [questionnaire]);

  return (
    <>
      <h1>Questionnaire: {questionnaire?.name}</h1>
      <Questions questionsIds={questionnaire?.questions} questionnaireId={id} />
      <AddQuestion />
    </>
  );
};
