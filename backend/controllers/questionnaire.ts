import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { Questionnaire } from '../models/Questionnaire';
import { IQuestionnaire, QuestionnaireWithQuestion } from '../types';
import { Question } from '../models/Question';


export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const existing = await Questionnaire.findOne({ name });
    if (existing) {
      const message = `Questionnaire "${name}" already exists`;
      // eslint-disable-next-line no-console
      console.log(message);
      return res.status(400).json({ message });
    }
    const newQuestionnaire = new Questionnaire(req.body);
    const data = await newQuestionnaire.save();
    const message = `Questionnaire for "${name}" created successfully`;

    res.status(201).json({ data, message });
    // eslint-disable-next-line no-console
    console.log(message, data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
  return false;
};

type QuestionnaireDoc = Document<unknown, unknown, IQuestionnaire>[]
type ReadErrorResponse = { message: string, error: unknown }
type ReadResponse = Response<QuestionnaireDoc | ReadErrorResponse>

export const read = async (req: Request, res: ReadResponse) => {
  try {
    const questionnaires = await Questionnaire.find();

    res.json(questionnaires);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    res.status(500).json({ message: 'Something went wrong, please try again', error });
  }
};

type ReadOneRequest = Request<{ id: string }, Record<string, unknown>, Record<string, unknown>>
type ReadOneResponse = Response<QuestionnaireWithQuestion | ReadErrorResponse>

export const readOne = async (req: ReadOneRequest, res: ReadOneResponse) => {
  try {
    const questionnaireId = req.params.id;
    const questionnaire = await Questionnaire.findById(questionnaireId);

    if (questionnaire) {
      const questions = await Question.find({ '_id': { $in: questionnaire.questions } });

      res.json({
        _id: questionnaire._id,
        name: questionnaire.name,
        questions,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    res.status(500).json({ message: 'Something went wrong, please try again', error });
  }
};

export const checkLength = async (req: Request, res: Response) => {
  try {
    const questionnaires = await Questionnaire.find();
    if (questionnaires)
      res.json(questionnaires.length);

  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line no-console
    console.log(req.params.id, req.body);

    // const id = req.params.id;
    // await Question.findByIdAndUpdate(id, req.body);
    // const message = `Question "${id}" changed successfully`;
    // eslint-disable-next-line no-console
    // console.log(message);
    // res.json({ message });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line no-console
    console.log(req.params.id);
    // const id = req.params.id;
    // await Question.findByIdAndDelete(id);
    // const message = `Question ${id} removed successfully`;
    // eslint-disable-next-line no-console
    // console.log(message);
    // res.json({ message });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};
