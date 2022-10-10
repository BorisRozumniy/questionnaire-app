import { ActionKind, ACTIONTYPE, IQuestionsState, QuestionsByValues } from "../@types/question";

export const questionInitialState: IQuestionsState = {
  questionsByValues: {} as QuestionsByValues,
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
      const questionnaireWithQuestions = { [action.questionnaireId]: action.payload }
      return {
        ...state,
        questionsByValues: { ...state.questionsByValues, ...questionnaireWithQuestions },
        questionsLoading: false,
      };

    case ActionKind.GET_REQUEST_QUESTIONS_ERROR:
      return {
        ...state,
        questionsError: action.payload,
        questionsLoading: false,
      };

    case ActionKind.POST_REQUEST_CREATE_QUESTION_START:
      return {
        ...state,
        questionsError: null,
        questionsLoading: true,
      };

    case ActionKind.POST_REQUEST_CREATE_QUESTION_SUCCESS:
      const prevState = state.questionsByValues[action.questionnaireId]
      const newState = [...prevState, action.payload]
      const questionsByValues: QuestionsByValues = { ...state.questionsByValues, [action.questionnaireId]: newState }
      return {
        ...state,
        questionsByValues,
        questionsLoading: false,
      };

    case ActionKind.POST_REQUEST_CREATE_QUESTION_ERROR:

      return {
        ...state,
        questionsError: action.payload,
        questionsLoading: false,
      };

    default:
      return state;
  }
};
