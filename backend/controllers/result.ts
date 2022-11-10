import { Question } from "../models/Question";
import { Request, Response } from 'express';
import { IRespondent, TUserAnswer } from "../types";

type ReadRequest = Request<{}, {}, TUserAnswer, { questionnaireId?: string }>
type ReadResponse = Response<{ message: string, error?: unknown }>

export const read = async (req: ReadRequest, res: ReadResponse) => {
  try {
    const { questionnaireId } = req.query
    res.json({ message: questionnaireId || 'no the questionnaireId' });
  } catch (error) {
    console.log(`error: `, error);
    const message = "Something went wrong, please try again";
    res.status(500).json({ message, error });
  }
};


