import mongoose from "mongoose";
import { IQuestionnaire } from "../types";
const { Schema, model } = mongoose;

const schema = new Schema<IQuestionnaire>({
    companyName: { type: String, required: true, unique: true },
    userAnswers: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

export const Questionnaire = model<IQuestionnaire>("Questionnaire", schema);
