import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContextType } from "../../@types/context";
import { IQuestion } from "../../@types/question";
import { getRequestQuestionnaires } from "../../actions/getRequestQuestionnaires";
import { getRequestQuestions } from "../../actions/getRequestQuestions";
import { getRequestRespondents } from "../../actions/getRequestRespondents";
import { Question } from "../../components/Question";
import { Context } from "../../context/context";

export const RespondentPage = () => {
  let params = useParams();
  const respondentId = params.id!.substring(1);
  const {
    respondentsState,
    respondentsDispatch,
    questionnaireState,
    questionnaireDispatch,
    questionsState,
    questionsDispatch,
  } = useContext(Context) as ContextType;

  const respondent = respondentsState.respondents.find(
    (item) => item._id === respondentId
  );
  const questionnaire = questionnaireState.questionnaires.find(
    (item) => item._id === respondent?.questionnaire
  );

  const questions = questionnaire
    ? questionsState.questionsByValues[questionnaire?._id]
    : [];

  useEffect(() => {
    if (!respondent) {
      getRequestRespondents({
        dispatch: respondentsDispatch,
      });
    }
  }, [respondent]);

  useEffect(() => {
    if (!questionnaire) {
      getRequestQuestionnaires({
        dispatch: questionnaireDispatch,
        id: respondent?.questionnaire,
      });
    }
  }, [questionnaire]);

  useEffect(() => {
    if (questionnaire && !questions) {
      getRequestQuestions({
        dispatch: questionsDispatch,
        questionnaireId: questionnaire?._id,
        questionsIds: questionnaire.questions,
      });
    }
  }, [questionnaire, questions]);

  return (
    <>
      <h2>{respondent?.name}</h2>
      {questions?.length > 0 &&
        questionnaire?._id &&
        questions.map((question: IQuestion) => (
          <Question
            {...{
              question,
              questionnaireId: questionnaire?._id,
              pollingMode: true,
              key: question._id,
            }}
          />
        ))}
    </>
  );
};
