import { TMongoId } from '../../../@types/common';
import { IQuestion } from '../../../@types/question';
import { IQuestionnaire, IQuestionnaireState } from '../../../@types/questionnaire';

type Func = (
  state: IQuestionnaireState,
  payload: { editedQuestion: IQuestion, questionnaireId: TMongoId } //editedQuestion
) => IQuestionnaire[];

export const updateQuestionSuccess: Func = (state, payload) => {
  const { questionnaires } = state;
  const { editedQuestion, questionnaireId } = payload;

  const newQuestionnaires: IQuestionnaire[] =
    questionnaires.map(questionnaire => {
      if (questionnaire._id === questionnaireId) {
        const questions = questionnaire.questions.map((q) => {
          if (q._id === editedQuestion._id)
            return editedQuestion;
          return q;
        });
        const newQuestionnaire = { ...questionnaire, questions };
        return newQuestionnaire;
      }
      return questionnaire;
    });
  console.log('payload', payload);


  return newQuestionnaires;
};

