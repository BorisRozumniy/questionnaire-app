import { ActionKind, ACTIONTYPE, IState } from "../@types/respondent";

export const initialState: IState = {
  respondents: [],
  respondentsError: null,
  respondentsLoading: false
}

export const respondentReducer = (state: IState, action: ACTIONTYPE) => {
  switch (action.type) {

    case ActionKind.GET_REQUEST_RESPONDENTS_START:
      return {
        ...state,
        respondentsError: null,
        respondentsLoading: true,
      };

    case ActionKind.GET_REQUEST_RESPONDENTS_SUCCESS:
      return {
        ...state,
        respondents: action.payload,
        respondentsLoading: false,
      };

    case ActionKind.GET_REQUEST_RESPONDENTS_ERROR:
      return {
        ...state,
        respondentsError: action.payload,
        respondentsLoading: false,
      };

    default:
      return state;
  }
};
