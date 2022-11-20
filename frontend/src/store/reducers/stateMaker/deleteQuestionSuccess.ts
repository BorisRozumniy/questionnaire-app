import { TMongoId } from "../../../@types/common";
import { IQuestion } from "../../../@types/question";
import { IQuestionnaire, IQuestionnaireState } from "../../../@types/questionnaire";

type Func = (
  state: IQuestionnaireState,
  payload: { removedQuestionId: TMongoId, questionnaireId: TMongoId }
) => IQuestionnaire[];

export const deleteQuestionSuccess: Func = (state, payload) => {
  const { questionnaires } = state;
  const { removedQuestionId, questionnaireId } = payload;

  let newQuestionnaires: IQuestionnaire[] =
    questionnaires.map(questionnaire => {
      if (questionnaire._id === questionnaireId) {
        const questions: IQuestion[] = questionnaire.questions
          .filter(({ _id }) => _id !== removedQuestionId)
        const newQuestionnaire = { ...questionnaire, questions }
        return newQuestionnaire
      }
      return questionnaire
    })

  return newQuestionnaires
}
