import { Request, Response } from 'express';
import { IUserAnswer } from '../types';

type ReadRequest = Request<Record<string, unknown>, Record<string, unknown>, IUserAnswer, { questionnaireId?: string }>
type ReadResponse = Response<{ message: string, error?: unknown }>

export const read = async (req: ReadRequest, res: ReadResponse) => {
  try {
    const { questionnaireId } = req.query;
    res.json({ message: questionnaireId || 'no the questionnaireId' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    const message = 'Something went wrong, please try again';
    res.status(500).json({ message, error });
  }
};


