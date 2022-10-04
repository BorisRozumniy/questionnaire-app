import { QuestionnairesActionKind as ActionKind, QUESTIONNAIRES_ACTIONTYPE, IQuestionnaireState } from "../@types/questionnaire";

export const questionnaireInitialState: IQuestionnaireState = {
  questionnaires: [],
  questionnairesError: null,
  questionnairesLoading: false
}

export const questionnairesReducer = (state: IQuestionnaireState, action: QUESTIONNAIRES_ACTIONTYPE) => {
  switch (action.type) {

    case ActionKind.GET_REQUEST_QUESTIONNAIRES_START:
      return {
        ...state,
        questionnairesError: null,
        questionnairesLoading: true,
      };

    case ActionKind.GET_REQUEST_QUESTIONNAIRES_SUCCESS:
      return {
        ...state,
        questionnaires: action.payload,
        questionnairesLoading: false,
      };

    case ActionKind.GET_REQUEST_QUESTIONNAIRES_ERROR:
      return {
        ...state,
        questionnairesError: action.payload,
        questionnairesLoading: false,
      };

    default:
      return state;
  }
};
