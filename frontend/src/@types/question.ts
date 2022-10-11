import { TMongoId } from "./common";

export enum AnswerType {
  text = 'text',
  data = 'data',
  oneOfTheList = 'one of the list',
  aFewFromTheList = 'a few from the list',
  scale = 'scale'
}

export type TPossibleAnswerItem = {
  title: string;
  id: number;
};

export interface IQuestion {
  _id: TMongoId;
  questionText: string;
  answerType: AnswerType;
  answerOptions?: TPossibleAnswerItem[];
  userAnswer?: string | string[] | number;
}



export type Option = { label: AnswerType; value: AnswerType };

export type QuestionItemContextType = {
  question: IQuestion,
  newOptionValue: string;
  setNewOptionValue: (newValue: string) => void;
}

export type QuestionsByValues = Record<TMongoId, IQuestion[]>

export interface IQuestionsState {
  questionsByValues: QuestionsByValues | any;
  questionsError: Error | null;
  questionsLoading: boolean;
}

export enum ActionKind {
  GET_REQUEST_QUESTIONS_START = 'GET_REQUEST_QUESTIONS_START',
  GET_REQUEST_QUESTIONS_SUCCESS = 'GET_REQUEST_QUESTIONS_SUCCESS',
  GET_REQUEST_QUESTIONS_ERROR = 'GET_REQUEST_QUESTIONS_ERROR',
  POST_REQUEST_CREATE_QUESTION_START = 'POST_REQUEST_CREATE_QUESTION_START',
  POST_REQUEST_CREATE_QUESTION_SUCCESS = 'POST_REQUEST_CREATE_QUESTION_SUCCESS',
  POST_REQUEST_CREATE_QUESTION_ERROR = 'POST_REQUEST_CREATE_QUESTION_ERROR',
  DELETE_REQUEST_QUESTION_START = 'DELETE_REQUEST_QUESTION_START',
  DELETE_REQUEST_QUESTION_SUCCESS = 'DELETE_REQUEST_QUESTION_SUCCESS',
  DELETE_REQUEST_QUESTION_ERROR = 'DELETE_REQUEST_QUESTION_ERROR',
}

export type ACTIONTYPE =
  | { type: ActionKind.GET_REQUEST_QUESTIONS_START }
  | { type: ActionKind.GET_REQUEST_QUESTIONS_SUCCESS; payload: IQuestion[], questionnaireId: TMongoId }
  | { type: ActionKind.GET_REQUEST_QUESTIONS_ERROR; payload: any }
  | { type: ActionKind.POST_REQUEST_CREATE_QUESTION_START }
  | { type: ActionKind.POST_REQUEST_CREATE_QUESTION_SUCCESS; payload: IQuestion[], questionnaireId: TMongoId }
  | { type: ActionKind.POST_REQUEST_CREATE_QUESTION_ERROR; payload: any }
  | { type: ActionKind.DELETE_REQUEST_QUESTION_START }
  | { type: ActionKind.DELETE_REQUEST_QUESTION_SUCCESS; payload: { message: string, questionnaireId: TMongoId, removedQuestionId: TMongoId } }
  | { type: ActionKind.DELETE_REQUEST_QUESTION_ERROR; payload: any };
