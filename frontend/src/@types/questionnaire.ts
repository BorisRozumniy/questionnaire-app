/* eslint-disable @typescript-eslint/no-explicit-any */
import { TMongoId } from './common';
import { IQuestion } from './question';

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

export enum ActionKind {
  GET_REQUEST_QUESTIONNAIRES_START = 'GET_REQUEST_QUESTIONNAIRES_START',
  GET_REQUEST_QUESTIONNAIRES_SUCCESS = 'GET_REQUEST_QUESTIONNAIRES_SUCCESS',
  GET_REQUEST_QUESTIONNAIRES_ERROR = 'GET_REQUEST_QUESTIONNAIRES_ERROR',
  GET_REQUEST_QUESTIONNAIRE_START = 'GET_REQUEST_QUESTIONNAIRE_START',
  GET_REQUEST_QUESTIONNAIRE_SUCCESS = 'GET_REQUEST_QUESTIONNAIRE_SUCCESS',
  GET_REQUEST_QUESTIONNAIRE_ERROR = 'GET_REQUEST_QUESTIONNAIRE_ERROR',
  POST_REQUEST_CREATE_QUESTIONNAIRES_START = 'POST_REQUEST_CREATE_QUESTIONNAIRES_START',
  POST_REQUEST_CREATE_QUESTIONNAIRES_SUCCESS = 'POST_REQUEST_CREATE_QUESTIONNAIRES_SUCCESS',
  POST_REQUEST_CREATE_QUESTIONNAIRES_ERROR = 'POST_REQUEST_CREATE_QUESTIONNAIRES_ERROR',
  POST_REQUEST_CREATE_QUESTION_START = 'POST_REQUEST_CREATE_QUESTION_START',
  POST_REQUEST_CREATE_QUESTION_SUCCESS = 'POST_REQUEST_CREATE_QUESTION_SUCCESS',
  POST_REQUEST_CREATE_QUESTION_ERROR = 'POST_REQUEST_CREATE_QUESTION_ERROR',
  PATCH_REQUEST_EDIT_QUESTION_START = 'PATCH_REQUEST_EDIT_QUESTION_START',
  PATCH_REQUEST_EDIT_QUESTION_SUCCESS = 'PATCH_REQUEST_EDIT_QUESTION_SUCCESS',
  PATCH_REQUEST_EDIT_QUESTION_ERROR = 'PATCH_REQUEST_EDIT_QUESTION_ERROR',
  DELETE_REQUEST_QUESTION_START = 'DELETE_REQUEST_QUESTION_START',
  DELETE_REQUEST_QUESTION_SUCCESS = 'DELETE_REQUEST_QUESTION_SUCCESS',
  DELETE_REQUEST_QUESTION_ERROR = 'DELETE_REQUEST_QUESTION_ERROR',
}

export type ACTIONTYPE =
  | { type: ActionKind.GET_REQUEST_QUESTIONNAIRES_START }
  | { type: ActionKind.GET_REQUEST_QUESTIONNAIRES_SUCCESS; payload: IQuestionnaire[] }
  | { type: ActionKind.GET_REQUEST_QUESTIONNAIRES_ERROR; payload: any}
  | { type: ActionKind.GET_REQUEST_QUESTIONNAIRE_START }
  | { type: ActionKind.GET_REQUEST_QUESTIONNAIRE_SUCCESS; payload: IQuestionnaire }
  | { type: ActionKind.GET_REQUEST_QUESTIONNAIRE_ERROR; payload: any}
  | { type: ActionKind.POST_REQUEST_CREATE_QUESTIONNAIRES_START }
  | { type: ActionKind.POST_REQUEST_CREATE_QUESTIONNAIRES_SUCCESS; payload: IQuestionnaire[] }
  | { type: ActionKind.POST_REQUEST_CREATE_QUESTIONNAIRES_ERROR; payload: any}
  | { type: ActionKind.POST_REQUEST_CREATE_QUESTION_START }
  | { type: ActionKind.POST_REQUEST_CREATE_QUESTION_SUCCESS; payload: { question: IQuestion, questionnaireId: TMongoId } }
  | { type: ActionKind.POST_REQUEST_CREATE_QUESTION_ERROR; payload: any}
  | { type: ActionKind.PATCH_REQUEST_EDIT_QUESTION_START }
  | { type: ActionKind.PATCH_REQUEST_EDIT_QUESTION_SUCCESS; payload: { editedQuestion: IQuestion, questionnaireId: TMongoId, } }
  | { type: ActionKind.PATCH_REQUEST_EDIT_QUESTION_ERROR; payload: any}
  | { type: ActionKind.DELETE_REQUEST_QUESTION_START }
  | { type: ActionKind.DELETE_REQUEST_QUESTION_SUCCESS; payload: { removedQuestionId: TMongoId, questionnaireId: TMongoId } }
  | { type: ActionKind.DELETE_REQUEST_QUESTION_ERROR; payload: any};
