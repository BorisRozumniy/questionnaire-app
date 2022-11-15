import { IQuestionnaire, IQuestionnaireState } from "../../../@types/questionnaire";

export const getQuestionnaireSuccess = ({ questionnaires }: IQuestionnaireState, payload: IQuestionnaire): IQuestionnaire[] => {
  let newQuestionnaires: IQuestionnaire[];

  if (questionnaires.length === 0)
    newQuestionnaires = [payload]
  else
    newQuestionnaires = questionnaires.map(questionnaire => {
      if (questionnaire._id === payload._id)
        return payload
      return questionnaire
    })
  return newQuestionnaires
}
