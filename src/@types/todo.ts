// @types.todo.ts

export enum AnswerType {
  text = 'text',
  data = 'data',
  oneOfTheList = 'one of the list',
  aFewFromTheList = 'a few from the list',
  scale = 'scale'
}
export interface ITodo {
  id: number;
  questionText: string;
  answerType: AnswerType;
}
export type TodoContextType = {
  todos: ITodo[];
  saveTodo: (todo: ITodo) => void;
  editQuestion: (id: number) => void;
  removeTodo: (id: number) => void;
  toggleModal: (question: boolean) => void;
  modalIsOpen: boolean;
  editingQuestionData: ITodo;
  saveEditedQuestion: (todo: ITodo) => void;
  editMod: boolean;
  setEditMod: (val: boolean) => void;

};
