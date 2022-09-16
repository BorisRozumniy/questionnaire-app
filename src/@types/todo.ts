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
  questionText?: string;
  answerType?: AnswerType;
  // title: string;
  // description: string;
  // status: boolean;
}
export type TodoContextType = {
  todos: ITodo[];
  saveTodo: (todo: ITodo) => void;
  // updateTodo: (id: number) => void;
  editTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};