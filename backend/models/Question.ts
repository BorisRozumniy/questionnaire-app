import mongoose from "mongoose";
import { IQuestion } from "../types";
const { Schema, model } = mongoose;

const schema = new Schema<IQuestion>({
  questionText: { type: String, required: true, unique: true },
  answerType: { type: String, required: true, unique: false },
  answerOptions: [{
    title: String,
    id: Number,
  }],

});

export const Question = model<IQuestion>("Question", schema);
