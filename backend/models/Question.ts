import mongoose from "mongoose";
import { IQuestion } from "../types";
const { Schema, model } = mongoose;

const schema = new Schema<IQuestion>({
  questionText: { type: String, required: true, unique: false },
  answerType: { type: String, required: true, unique: false },
});

export const Question = model<IQuestion>("Question", schema);
