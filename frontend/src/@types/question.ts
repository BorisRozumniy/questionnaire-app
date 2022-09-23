export enum AnswerType {
  text = 'text',
  data = 'data',
  oneOfTheList = 'one of the list',
  aFewFromTheList = 'a few from the list',
  scale = 'scale'
}
export interface IQuestion {
  _id: number;
  questionText: string;
  answerType: AnswerType;
}
export type ContextType = {
  questions: IQuestion[];
  saveQuestion: (data: IQuestion) => void;
  editQuestion: (id: number) => void;
  removeQuestion: (id: number) => void;
  toggleModal: (question: boolean) => void;
  modalIsOpen: boolean;
  editingQuestionData: IQuestion;
  saveEditedQuestion: (data: IQuestion) => void;
  editMod: boolean;
  setEditMod: (val: boolean) => void;
};

export type Option = { label: AnswerType; value: AnswerType };
