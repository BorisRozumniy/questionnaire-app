import mongoose from "mongoose";
import { IRespondent } from "../types";
const { Schema, model } = mongoose;

const schema = new Schema<IRespondent>({
    companyName: { type: String, required: true, unique: true },
    userAnswers: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

export const Questionnaire = model<IRespondent>("Questionnaire", schema);
