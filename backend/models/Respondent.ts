import mongoose from "mongoose";
import { IRespondent } from "../types";
const { Schema, model } = mongoose;

const schema = new Schema<IRespondent>({
  name: { type: String, required: true, unique: true },
  questionnaire: { type: Schema.Types.ObjectId, required: true, ref: 'Questionnaire' },
  answers: [{
    questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
    value: { type: String }
    // value: { type: Number || String || [Number] }
  }]

});

export const Respondent = model<IRespondent>("Respondent", schema);
