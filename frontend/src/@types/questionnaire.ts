import { IQuestion } from "./question";

export interface IQuestionnaire {
  _id: string;
  name: string;
  questions: IQuestion[]; //  | string[];
}

export interface IQuestionnaireState {
  questionnaires: IQuestionnaire[];
  questionnairesError: Error | null;
  questionnairesLoading: boolean;
}

export enum QuestionnairesActionKind {
  GET_REQUEST_QUESTIONNAIRES_START = 'GET_REQUEST_QUESTIONNAIRES_START',
  GET_REQUEST_QUESTIONNAIRES_SUCCESS = 'GET_REQUEST_QUESTIONNAIRES_SUCCESS',
  GET_REQUEST_QUESTIONNAIRES_ERROR = 'GET_REQUEST_QUESTIONNAIRES_ERROR',
  GET_REQUEST_QUESTIONNAIRE_START = 'GET_REQUEST_QUESTIONNAIRE_START',
  GET_REQUEST_QUESTIONNAIRE_SUCCESS = 'GET_REQUEST_QUESTIONNAIRE_SUCCESS',
  GET_REQUEST_QUESTIONNAIRE_ERROR = 'GET_REQUEST_QUESTIONNAIRE_ERROR',
  POST_REQUEST_CREATE_QUESTIONNAIRES_START = 'POST_REQUEST_CREATE_QUESTIONNAIRES_START',
  POST_REQUEST_CREATE_QUESTIONNAIRES_SUCCESS = 'POST_REQUEST_CREATE_QUESTIONNAIRES_SUCCESS',
  POST_REQUEST_CREATE_QUESTIONNAIRES_ERROR = 'POST_REQUEST_CREATE_QUESTIONNAIRES_ERROR',
}

export type QUESTIONNAIRES_ACTIONTYPE =
  | { type: QuestionnairesActionKind.GET_REQUEST_QUESTIONNAIRES_START }
  | { type: QuestionnairesActionKind.GET_REQUEST_QUESTIONNAIRES_SUCCESS; payload: IQuestionnaire[] }
  | { type: QuestionnairesActionKind.GET_REQUEST_QUESTIONNAIRES_ERROR; payload: any }
  | { type: QuestionnairesActionKind.GET_REQUEST_QUESTIONNAIRE_START }
  | { type: QuestionnairesActionKind.GET_REQUEST_QUESTIONNAIRE_SUCCESS; payload: IQuestionnaire }
  | { type: QuestionnairesActionKind.GET_REQUEST_QUESTIONNAIRE_ERROR; payload: any }
  | { type: QuestionnairesActionKind.POST_REQUEST_CREATE_QUESTIONNAIRES_START }
  | { type: QuestionnairesActionKind.POST_REQUEST_CREATE_QUESTIONNAIRES_SUCCESS; payload: IQuestionnaire[] }
  | { type: QuestionnairesActionKind.POST_REQUEST_CREATE_QUESTIONNAIRES_ERROR; payload: any };
