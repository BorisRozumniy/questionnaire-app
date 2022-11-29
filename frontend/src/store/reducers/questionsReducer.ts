import {
  ActionKind,
  ACTIONTYPE,
  IQuestionsState,
  QuestionsByValues,
} from '../../@types/question';

export const questionInitialState: IQuestionsState = {
  questionsByValues: {} as QuestionsByValues,
  questionsError: null,
  questionsLoading: false,
};

export const questionsReducer = (
  state: IQuestionsState,
  action: ACTIONTYPE,
) => {
  let questionsByValues: QuestionsByValues;

  switch (action.type) {
    case ActionKind.GET_REQUEST_QUESTIONS_START:
      return {
        ...state,
        questionsError: null,
        questionsLoading: true,
      };

    case ActionKind.GET_REQUEST_QUESTIONS_SUCCESS:
      questionsByValues = { [action.questionnaireId]: action.payload };

      return {
        ...state,
        questionsByValues: { ...state.questionsByValues, ...questionsByValues },
        questionsLoading: false,
      };

    case ActionKind.GET_REQUEST_QUESTIONS_ERROR:
      return {
        ...state,
        questionsError: action.payload,
        questionsLoading: false,
      };

    // case ActionKind.POST_REQUEST_CREATE_QUESTION_START:
    //   return {
    //     ...state,
    //     questionsError: null,
    //     questionsLoading: true,
    //   };

    // case ActionKind.POST_REQUEST_CREATE_QUESTION_SUCCESS:
    //   prevState = state.questionsByValues[action.questionnaireId]
    //   newState = [...prevState, action.payload]
    //   questionsByValues = { ...state.questionsByValues, [action.questionnaireId]: newState }

    //   return {
    //     ...state,
    //     questionsByValues,
    //     questionsLoading: false,
    //   };

    // case ActionKind.POST_REQUEST_CREATE_QUESTION_ERROR:
    //   return {
    //     ...state,
    //     questionsError: action.payload,
    //     questionsLoading: false,
    //   };

    // case ActionKind.PATCH_REQUEST_EDIT_QUESTION_START:
    //   return {
    //     ...state,
    //     questionsError: null,
    //     questionsLoading: true,
    //   };

    // case ActionKind.PATCH_REQUEST_EDIT_QUESTION_SUCCESS:
    //   prevState = state.questionsByValues[action.payload.questionnaireId]
    //   newState = prevState.map((question: IQuestion) => {
    //     if (question._id === action.payload.editedQuestion._id)
    //       return action.payload.editedQuestion;
    //     return question
    //   });
    //   questionsByValues = { ...state.questionsByValues, [action.payload.questionnaireId]: newState }

    //   return {
    //     ...state,
    //     questionsByValues,
    //     questionsLoading: false,
    //   };

    // case ActionKind.PATCH_REQUEST_EDIT_QUESTION_ERROR:
    //   return {
    //     ...state,
    //     questionsError: action.payload,
    //     questionsLoading: false,
    //   };

    // case ActionKind.DELETE_REQUEST_QUESTION_START:
    //   return {
    //     ...state,
    //     questionsError: null,
    //     questionsLoading: true,
    //   };

    // case ActionKind.DELETE_REQUEST_QUESTION_SUCCESS:
    //   prevState = state.questionsByValues[action.payload.questionnaireId]
    //   newState = prevState.filter(({ _id }: IQuestion) => _id !== action.payload.removedQuestionId);
    //   questionsByValues = { ...state.questionsByValues, [action.payload.questionnaireId]: newState }

    //   return {
    //     ...state,
    //     questionsByValues: questionsByValues,
    //     questionsLoading: false,
    //   };

    // case ActionKind.DELETE_REQUEST_QUESTION_ERROR:
    //   return {
    //     ...state,
    //     questionsError: action.payload,
    //     questionsLoading: false,
    //   };

    default:
      return state;
  }
};
