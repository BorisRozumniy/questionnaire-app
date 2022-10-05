import { Dispatch, SetStateAction } from "react";
import { IQuestionnaireState, QUESTIONNAIRES_ACTIONTYPE } from "./questionnaire";
import { ACTIONTYPE as RESPONDENTS_ACTIONTYPE, IState as IRespondentState } from "./respondent";

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
  _id: number;
  questionText: string;
  answerType: AnswerType;
  answerOptions?: TPossibleAnswerItem[];
  userAnswer?: string | string[] | number;
}


export type ContextType = {
  questionMod: boolean,
  setQuestionMod: Dispatch<SetStateAction<boolean>>,
  questionnaireState: IQuestionnaireState,
  questionnaireDispatch: Dispatch<QUESTIONNAIRES_ACTIONTYPE>,
  respondentsState: IRespondentState,
  respondentsDispatch: Dispatch<RESPONDENTS_ACTIONTYPE>,


  questions: IQuestion[];
  setQuestions: Dispatch<SetStateAction<IQuestion[]>>;
  saveQuestion: (data: IQuestion) => void;
  editQuestion: (id: number) => void;
  removeQuestion: (id: number) => void;
  toggleModal: (question: boolean) => void;
  modalIsOpen: boolean;
  temporaryQuestion: IQuestion;
  setTemporaryQuestion: React.Dispatch<React.SetStateAction<IQuestion>>;
  saveEditedQuestion: (data: IQuestion) => void;
  editMod: boolean;
  setEditMod: (val: boolean) => void;
};

export type Option = { label: AnswerType; value: AnswerType };

export type QuestionItemContextType = {
  question: IQuestion,
  newOptionValue: string;
  setNewOptionValue: (newValue: string) => void;
}


export interface IQuestionsState {
  questions: IQuestion[];
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
}

export type ACTIONTYPE =
  | { type: ActionKind.GET_REQUEST_QUESTIONS_START }
  | { type: ActionKind.GET_REQUEST_QUESTIONS_SUCCESS; payload: IQuestion[] }
  | { type: ActionKind.GET_REQUEST_QUESTIONS_ERROR; payload: any }
  | { type: ActionKind.POST_REQUEST_CREATE_QUESTION_START }
  | { type: ActionKind.POST_REQUEST_CREATE_QUESTION_SUCCESS; payload: IQuestion[] }
  | { type: ActionKind.POST_REQUEST_CREATE_QUESTION_ERROR; payload: any };
