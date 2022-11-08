import { TMongoId } from "./common";
import { AnswerOptionId, UserAnswer } from "./respondent";

export enum AnswerType {
  text = 'text',
  data = 'data',
  oneOfTheList = 'one of the list',
  aFewFromTheList = 'a few from the list',
  scale = 'scale'
}

export type TPossibleAnswerItem = {
  title: string;
  id: AnswerOptionId; // Date.now()
};

export interface IQuestion {
  _id: TMongoId;
  questionText: string;
  answerType: AnswerType;
  answerOptions?: TPossibleAnswerItem[];
  answers?: UserAnswer[],
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type NewQuestion = PartialBy<IQuestion, '_id'>

export type Option = { label: AnswerType; value: AnswerType };

export type QuestionItemContextType = {
  question: IQuestion,
  newOptionValue: string;
  setNewOptionValue: (newValue: string) => void;
  pollingMode?: boolean;
  editMode?: boolean;
  questionnaireId?: TMongoId;
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
  PATCH_REQUEST_EDIT_QUESTION_START = 'PATCH_REQUEST_EDIT_QUESTION_START',
  PATCH_REQUEST_EDIT_QUESTION_SUCCESS = 'PATCH_REQUEST_EDIT_QUESTION_SUCCESS',
  PATCH_REQUEST_EDIT_QUESTION_ERROR = 'PATCH_REQUEST_EDIT_QUESTION_ERROR',
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
  | { type: ActionKind.PATCH_REQUEST_EDIT_QUESTION_START }
  | { type: ActionKind.PATCH_REQUEST_EDIT_QUESTION_SUCCESS; payload: { message: string, questionnaireId: TMongoId, editedQuestion: IQuestion } }
  | { type: ActionKind.PATCH_REQUEST_EDIT_QUESTION_ERROR; payload: any }
  | { type: ActionKind.DELETE_REQUEST_QUESTION_START }
  | { type: ActionKind.DELETE_REQUEST_QUESTION_SUCCESS; payload: { message: string, questionnaireId: TMongoId, removedQuestionId: TMongoId } }
  | { type: ActionKind.DELETE_REQUEST_QUESTION_ERROR; payload: any };
