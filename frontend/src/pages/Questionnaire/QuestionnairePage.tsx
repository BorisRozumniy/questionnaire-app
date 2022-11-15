import { Dispatch, FC, SetStateAction, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContextType } from "../../@types/context";
import { getRequestQuestionnaire } from "../../store/actions/getRequestQuestionnaire";
import { AddQuestion } from "../../components/AddQuestion";
import { Questions } from "../../components/Questions";
import { Container } from "../../components/Styled/Container";
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
    const withoutQuestions = typeof questionnaire?.questions[0] === "string";
    if (!questionnaire || withoutQuestions) {
      setLastRequestWasFromQuestionairePage(true); // need to remove in future
      getRequestQuestionnaire({
        dispatch: questionnaireDispatch,
        questionnaireId: id,
      });
    }
  }, [questionnaire]);

  return (
    <Container>
      <h1>Questionnaire: {questionnaire?.name}</h1>
      <Questions questionnaireId={id} />
      <AddQuestion questionnaireId={id} />
    </Container>
  );
};
