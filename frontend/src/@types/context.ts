import { Dispatch, SetStateAction } from "react";
import { IQuestionnaireState, QUESTIONNAIRES_ACTIONTYPE } from "./questionnaire";
import { ACTIONTYPE as RESPONDENTS_ACTIONTYPE, IState as IRespondentState } from "./respondent";
import { ACTIONTYPE as QUESTIONS_ACTIONTYPE, IQuestion, IQuestionsState } from "./question";
import { TMongoId } from "./common";


export type ContextType = {
  questionnaireState: IQuestionnaireState,
  questionnaireDispatch: Dispatch<QUESTIONNAIRES_ACTIONTYPE>,
  respondentsState: IRespondentState,
  respondentsDispatch: Dispatch<RESPONDENTS_ACTIONTYPE>,
  questionsState: IQuestionsState,
  questionsDispatch: Dispatch<QUESTIONS_ACTIONTYPE>,

  questionMod: boolean,
  setQuestionMod: Dispatch<SetStateAction<boolean>>,
  questions: IQuestion[];
  setQuestions: Dispatch<SetStateAction<IQuestion[]>>;
  saveQuestion: (data: IQuestion) => void;
  editQuestion: (id: TMongoId) => void;
  removeQuestion: (id: TMongoId) => void;
  toggleModal: (question: boolean) => void;
  modalIsOpen: boolean;
  temporaryQuestion: IQuestion;
  setTemporaryQuestion: React.Dispatch<React.SetStateAction<IQuestion>>;
  saveEditedQuestion: (data: IQuestion) => void;
  editMod: boolean;
  setEditMod: (val: boolean) => void;
};

