import { ActionKind, ACTIONTYPE, IQuestionsState } from "../@types/question";

export const questionInitialState: IQuestionsState = {
  questions: [],
  questionsError: null,
  questionsLoading: false
}

export const questionsReducer = (state: IQuestionsState, action: ACTIONTYPE) => {
  switch (action.type) {

    case ActionKind.GET_REQUEST_QUESTIONS_START:
      return {
        ...state,
        questionsError: null,
        questionsLoading: true,
      };

    case ActionKind.GET_REQUEST_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        questionsLoading: false,
      };

    case ActionKind.GET_REQUEST_QUESTIONS_ERROR:
      return {
        ...state,
        questionsError: action.payload,
        questionsLoading: false,
      };

    default:
      return state;
  }
};
