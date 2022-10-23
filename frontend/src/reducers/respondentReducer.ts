import { ActionKind, ACTIONTYPE, IRespondent, IState, TUserAnswer } from "../@types/respondent";

export const initialState: IState = {
  respondents: [] as IRespondent[],
  respondentsError: null,
  respondentsLoading: false
}

export const respondentReducer = (state: IState, action: ACTIONTYPE) => {
  let prevRespondents: IRespondent[];
  let newRespondents: IRespondent[];

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
      const currentRespondent = prevRespondents.find(respondent => respondent._id === action.payload.respondentId)
      let updatedAnswers: TUserAnswer[];

      if (currentRespondent?.answers) {
        const { questionId, value } = action.payload.answer
        const existingAnswer = currentRespondent.answers.find(answer => answer.questionId === questionId)

        if (existingAnswer) {
          updatedAnswers = currentRespondent?.answers.map(answer => {
            if (answer.questionId === questionId)
              return { ...answer, value }
            return answer
          })
        } else {
          updatedAnswers = [...currentRespondent?.answers, action.payload.answer]
        }

        newRespondents = prevRespondents.map(respondent => {
          if (respondent.answers)
            return { ...respondent, answers: updatedAnswers }
          return respondent
        })
      } else newRespondents = prevRespondents



      return {
        ...state,
        respondents: newRespondents,
        respondentsLoading: true,
      };

    case ActionKind.PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
};

