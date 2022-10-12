import { Dispatch, } from "react";
import { IQuestionnaireState, QUESTIONNAIRES_ACTIONTYPE } from "./questionnaire";
import { ACTIONTYPE as RESPONDENTS_ACTIONTYPE, IState as IRespondentState } from "./respondent";
import { ACTIONTYPE as QUESTIONS_ACTIONTYPE, IQuestion, IQuestionsState } from "./question";


export type ContextType = {
  questionnaireState: IQuestionnaireState,
  questionnaireDispatch: Dispatch<QUESTIONNAIRES_ACTIONTYPE>,
  respondentsState: IRespondentState,
  respondentsDispatch: Dispatch<RESPONDENTS_ACTIONTYPE>,
  questionsState: IQuestionsState,
  questionsDispatch: Dispatch<QUESTIONS_ACTIONTYPE>,
};

