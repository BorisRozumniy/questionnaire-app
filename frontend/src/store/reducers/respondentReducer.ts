import {
  ActionKind,
  ACTIONTYPE,
  IRespondent_experimental,
  IState,
} from '../../@types/respondent';

export const initialState: IState = {
  respondents: [] as IRespondent_experimental[],
  respondentsError: null,
  respondentsLoading: false,
};

export const respondentReducer = (state: IState, action: ACTIONTYPE) => {
  let prevRespondents: IRespondent_experimental[];
  let newRespondents: IRespondent_experimental[];

  switch (action.type) {
    case ActionKind.GET_REQUEST_RESPONDENTS_START:
      return {
        ...state,
        respondentsError: null,
        respondentsLoading: true,
      };

    case ActionKind.GET_REQUEST_RESPONDENTS_SUCCESS:
      prevRespondents = state.respondents;
      newRespondents = action.payload.map((respondent) => {
        if (prevRespondents[0] && respondent._id === prevRespondents[0]._id)
          return prevRespondents[0];
        return respondent;
      });

      return {
        ...state,
        respondents: newRespondents,
        respondentsLoading: false,
      };

    case ActionKind.GET_REQUEST_RESPONDENTS_ERROR:
      return {
        ...state,
        respondentsError: action.payload,
        respondentsLoading: false,
      };

    case ActionKind.POST_REQUEST_CREATE_RESPONDENT_START:
      return {
        ...state,
        respondentsError: null,
        respondentsLoading: true,
      };

    case ActionKind.POST_REQUEST_CREATE_RESPONDENT_SUCCESS:
      return {
        ...state,
        respondents: [...state.respondents, action.payload],
        respondentsLoading: false,
      };

    case ActionKind.POST_REQUEST_CREATE_RESPONDENT_ERROR:
      return {
        ...state,
        respondentsError: action.payload,
        respondentsLoading: false,
      };

    case ActionKind.PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_START:
      return {
        ...state,
        respondentsError: null,
        respondentsLoading: true,
      };

    case ActionKind.PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_SUCCESS:
      prevRespondents = state.respondents;
      newRespondents = prevRespondents.map((respondent) => {
        const { answer, respondentId } = action.payload;
        if (respondentId === respondent._id) {
          const mQuestions = respondent.questions?.map((question) => {
            if (question._id === answer.questionId)
              return { ...question, answer };
            else return question;
          });
          return { ...respondent, questions: mQuestions };
        }
        return respondent;
      });

      return {
        ...state,
        respondents: newRespondents,
        respondentsLoading: true,
      };

    case ActionKind.PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_ERROR:
      return {
        ...state,
      };

    case ActionKind.GET_REQUEST_RESPONDENT_START:
      return {
        ...state,
        respondentsError: null,
        respondentsLoading: true,
      };

    case ActionKind.GET_REQUEST_RESPONDENT_SUCCESS:
      if (state.respondents.length === 0) newRespondents = [action.payload];
      else
        newRespondents = state.respondents.map((respondent) => {
          if (respondent._id === action.payload._id) return action.payload;
          return respondent;
        });

      return {
        ...state,
        respondents: newRespondents,
        respondentsLoading: false,
      };

    case ActionKind.GET_REQUEST_RESPONDENT_ERROR:
      return {
        ...state,
        respondentsError: action.payload,
        respondentsLoading: false,
      };

    default:
      return state;
  }
};
