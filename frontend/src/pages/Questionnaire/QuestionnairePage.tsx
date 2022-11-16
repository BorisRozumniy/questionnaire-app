import { FC, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContextType } from "../../@types/context";
import { IQuestion } from "../../@types/question";
import { getRequestQuestionnaire } from "../../store/actions/getRequestQuestionnaire";
import { AddQuestion } from "../../components/AddQuestion";
import { Questions } from "../../components/Questions";
import { Container } from "../../components/Styled/Container";
import { Context } from "../../context/context";

export const QuestionnairePage: FC = () => {
  let params = useParams();
  const id = params.id!.substring(1);
  const { questionnaireState, questionnaireDispatch } = useContext(
    Context
  ) as ContextType;

  const questionnaire = questionnaireState.questionnaires.find(
    (item) => item._id === id
  );

  const withQuestions =
    typeof questionnaire?.questions[0] !== "string" &&
    questionnaire?.questions[0]._id;

  useEffect(() => {
    if (!questionnaire || !withQuestions) {
      getRequestQuestionnaire({
        dispatch: questionnaireDispatch,
        questionnaireId: id,
      });
    }
  }, [questionnaire]);

  return (
    <Container>
      <h1>Questionnaire: {questionnaire?.name}</h1>
      {withQuestions && (
        <Questions questionnaireId={id} questions={questionnaire?.questions} />
      )}
      <AddQuestion questionnaireId={id} />
    </Container>
  );
};
