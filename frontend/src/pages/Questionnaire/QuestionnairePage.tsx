import { FC, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ContextType } from '../../@types/context';
import { getRequestQuestionnaire } from '../../store/actions/getRequestQuestionnaire';
import { AddQuestion } from '../../components/AddQuestion';
import { Questions } from '../../components/Questions';
import { Container } from '../../components/Styled/Container';
import { Context } from '../../context/context';

export const QuestionnairePage: FC = () => {
  const requestQount = useRef(0);

  const params = useParams();
  const id = params.id?.substring(1) || '';

  const { questionnaireState, questionnaireDispatch } = useContext(
    Context
  ) as ContextType;

  const questionnaire = questionnaireState.questionnaires.find(
    (item) => item._id === id
  );

  const withQuestions =
    questionnaire?.questions.length &&
    typeof questionnaire?.questions[0] !== 'string' &&
    questionnaire?.questions[0]?._id;

  useEffect(() => {
    if (!questionnaire?.questions[0]?._id && requestQount.current === 0) {
      getRequestQuestionnaire({
        dispatch: questionnaireDispatch,
        questionnaireId: id,
      });
      requestQount.current += 1;
    }
  }, [questionnaire, requestQount]);

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
