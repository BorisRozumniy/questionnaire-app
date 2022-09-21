import mongoose from "mongoose";
const { Schema, model } = mongoose;

export enum AnswerType {
  text = 'text',
  data = 'data',
  oneOfTheList = 'one of the list',
  aFewFromTheList = 'a few from the list',
  scale = 'scale'
}
export interface IQuestion {
  questionText: string;
  answerType: AnswerType;
}

const schema = new Schema<IQuestion>({
  questionText: { type: String, required: true, unique: false },
  answerType: String,
});

export const Question = model<IQuestion>("Question", schema);
