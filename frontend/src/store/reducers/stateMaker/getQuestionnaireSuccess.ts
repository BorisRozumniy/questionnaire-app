import { IQuestionnaire, IQuestionnaireState } from '../../../@types/questionnaire';

type Func = (
  state: IQuestionnaireState,
  payload: IQuestionnaire
) => IQuestionnaire[];

export const getQuestionnaireSuccess: Func = ({ questionnaires }, payload) => {
  let newQuestionnaires: IQuestionnaire[];

  if (questionnaires.length === 0)
    newQuestionnaires = [payload];
  else
    newQuestionnaires = questionnaires.map(questionnaire => {
      if (questionnaire._id === payload._id)
        return payload;
      return questionnaire;
    });
  return newQuestionnaires;
};
