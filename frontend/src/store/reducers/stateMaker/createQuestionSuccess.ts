import { TMongoId } from '../../../@types/common';
import { IQuestion } from '../../../@types/question';
import {
  IQuestionnaire,
  IQuestionnaireState,
} from '../../../@types/questionnaire';

type Func = (
  state: IQuestionnaireState,
  payload: { question: IQuestion; questionnaireId: TMongoId },
) => IQuestionnaire[];

export const createQuestionSuccess: Func = (state, payload) => {
  const { questionnaires } = state;
  const { question, questionnaireId } = payload;

  const newQuestionnaires: IQuestionnaire[] = questionnaires.map(
    (questionnaire) => {
      if (questionnaire._id === questionnaireId) {
        const questions = [...questionnaire.questions, question];
        const newQuestionnaire = { ...questionnaire, questions };
        return newQuestionnaire;
      }
      return questionnaire;
    },
  );

  return newQuestionnaires;
};
