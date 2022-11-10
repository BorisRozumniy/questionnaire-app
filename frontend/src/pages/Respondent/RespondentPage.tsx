import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContextType } from "../../@types/context";
import { IQuestion } from "../../@types/question";
import { getRequestRespondent } from "../../actions/getRequestRespondent";
import { Question } from "../../components/Question";
import { Container } from "../../components/Styled/Container";
import { Context } from "../../context/context";
import { theme } from "../../theme";

export const RespondentPage = () => {
  let params = useParams();
  const respondentId = params.id!.substring(1);
  const { respondentsState, respondentsDispatch } = useContext(
    Context
  ) as ContextType;

  const respondent = respondentsState.respondents.find(
    (item) => item._id === respondentId
  );

  useEffect(() => {
    if (!respondent?.questions) {
      getRequestRespondent({
        dispatch: respondentsDispatch,
        respondentId,
      });
    }
  }, [respondent?.questions]);

  return (
    <Container mt={theme.headerHeight + 36}>
      <h2>{respondent?.name}</h2>
      {respondent?.questions &&
        respondent.questions.map((question: IQuestion) => (
          <Question
            {...{
              question,
              questionnaireId: respondent?.questionnaire,
              pollingMode: true,
              key: question._id,
            }}
          />
        ))}
    </Container>
  );
};
