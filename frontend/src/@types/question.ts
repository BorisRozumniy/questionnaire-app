import { Dispatch, SetStateAction } from "react";
import { ACTIONTYPE, IState } from "./respondent";

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
  respondentsState: IState,
  respondentsDispatch: Dispatch<ACTIONTYPE>,


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
