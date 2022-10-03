import mongoose from "mongoose";
import { IRespondent } from "../types";
const { Schema, model } = mongoose;

const schema = new Schema<IRespondent>({
  name: { type: String, required: true, unique: true },
  questionnaire: { type: Schema.Types.ObjectId, required: true, ref: 'Questionnaire' },
  answers: [{ type: String }],
});

export const Respondent = model<IRespondent>("Respondent", schema);
