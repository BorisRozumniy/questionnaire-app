import { ActionKind as ActionKind, ACTIONTYPE, IQuestionnaireState, IQuestionnaire } from "../../@types/questionnaire";
import { getQuestionnaireSuccess } from "./stateMaker/questionnaires";

export const questionnaireInitialState: IQuestionnaireState = {
  questionnaires: [],
  questionnairesError: null,
  questionnairesLoading: false
}

export const questionnairesReducer = (state: IQuestionnaireState, action: ACTIONTYPE) => {
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

    case ActionKind.GET_REQUEST_QUESTIONNAIRE_START:
      return {
        ...state,
        questionnairesError: null,
        questionnairesLoading: true,
      };

    case ActionKind.GET_REQUEST_QUESTIONNAIRE_SUCCESS:
      return {
        ...state,
        questionnaires: getQuestionnaireSuccess(state, action.payload),
        questionnairesLoading: false,
      };

    case ActionKind.GET_REQUEST_QUESTIONNAIRE_ERROR:
      return {
        ...state,
        questionnairesError: action.payload,
        questionnairesLoading: false,
      };

    default:
      return state;
  }
};
