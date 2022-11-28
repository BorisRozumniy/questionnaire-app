import mongoose from 'mongoose';
import { IUserAnswer } from '../types';

const { Schema, model } = mongoose;

const schema = new Schema<IUserAnswer>({
  questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
  value: { type: Schema.Types.Mixed }
});

export const Answer = model<IUserAnswer>('Answer', schema);
