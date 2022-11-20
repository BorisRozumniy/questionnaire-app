import { ActionKind as ActionKind, ACTIONTYPE, IQuestionnaireState } from "../../@types/questionnaire";
import { getQuestionnaireSuccess, createQuestionSuccess, updateQuestionSuccess, deleteQuestionSuccess } from "./stateMaker";

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

    case ActionKind.POST_REQUEST_CREATE_QUESTION_START:
      return {
        ...state,
        questionnairesError: null,
        questionnairesLoading: true,
      };

    case ActionKind.POST_REQUEST_CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        questionnaires: createQuestionSuccess(state, action.payload),
        questionnairesLoading: false,
      };

    case ActionKind.POST_REQUEST_CREATE_QUESTION_ERROR:
      return {
        ...state,
        questionnairesError: action.payload,
        questionnairesLoading: false,
      };

    case ActionKind.PATCH_REQUEST_EDIT_QUESTION_START:
      return {
        ...state,
        questionnairesError: null,
        questionnairesLoading: true,
      };

    case ActionKind.PATCH_REQUEST_EDIT_QUESTION_SUCCESS:
      return {
        ...state,
        questionnaires: updateQuestionSuccess(state, action.payload),
        questionnairesLoading: false,
      };

    case ActionKind.PATCH_REQUEST_EDIT_QUESTION_ERROR:
      return {
        ...state,
        questionnairesError: action.payload,
        questionnairesLoading: false,
      };

    case ActionKind.DELETE_REQUEST_QUESTION_START:
      return {
        ...state,
        questionnairesError: null,
        questionnairesLoading: true,
      };

    case ActionKind.DELETE_REQUEST_QUESTION_SUCCESS:
      return {
        ...state,
        questionnaires: deleteQuestionSuccess(state, action.payload),
        questionnairesLoading: false,
      };

    case ActionKind.DELETE_REQUEST_QUESTION_ERROR:
      return {
        ...state,
        questionnairesError: action.payload,
        questionnairesLoading: false,
      };

    default:
      return state;
  }
};
