import { Respondent } from "../models/Respondent";
import { Request, Response } from 'express';
import { IRespondent, IUserAnswer } from "../types";
import { Answer } from "../models/Answer";
import { Types } from "mongoose";
import { Questionnaire } from "../models/Questionnaire";
import { Question } from "../models/Question";


export const create = async (req: Request, res: Response) => {
  try {
    const { name, questionnaire } = req.body;
    if (!questionnaire || !name) {
      const message = `"name" and "questionnaire" are required!`;
      console.log(message, req.body);
      return res.status(400).json({ message });
    }

    const existing = await Respondent.findOne({ name });
    if (existing) {
      const message = `Respondent "${name}" already exists`;
      console.log(message);
      return res.status(400).json({ message });
    }

    const newRespondent = new Respondent(req.body);
    const data = await newRespondent.save();
    const message = `Respondent for "${name}" created successfully`;

    res.status(201).json({ data, message });
    console.log(message, data);
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

export const checkRespondentsLength = async (req: Request, res: Response) => {
  try {
    const respondents = await Respondent.find();
    if (respondents)
      res.json(respondents.length);
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
}

type ReadOneRequest = Request<{ id: string }, {}, IUserAnswer>
type ReadSuccessResponse = any
type ReadErrorResponse = { message: string }
type ReadResponse = Response<ReadSuccessResponse | ReadErrorResponse>

export const readOne = async (req: ReadOneRequest, res: ReadResponse) => {
  try {
    const respondentId = req.params.id;
    const respondent = await Respondent.findById(respondentId);

    if (respondent) {
      const questionnaire = await Questionnaire.findById(respondent.questionnaire);
      if (questionnaire) {
        const questions = await Question.find({ '_id': { $in: questionnaire.questions } });

        console.log('questions:::', questions.length);
        const answers = await Answer.find({ '_id': { $in: respondent.answers } });
        res.json({ name: respondent.name, questions, _id: respondent._id, answers });
      }
    }
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
}

export const read = async (req: Request, res: Response) => {
  try {
    const respondents = await Respondent.find();
    res.json(respondents);
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

type UpdateRequest = Request<{ id: string }, {}, IUserAnswer>
type SuccessResponse = { message: string, data: any }
type ErrorResponse = { message: string }
type UpdateResponse = Response<SuccessResponse | ErrorResponse>

export const saveAnswer = async (req: UpdateRequest, res: UpdateResponse) => {
  try {
    const { questionId, value, _id: answerId } = req.body;
    console.log('\n req.body:::', req.body);

    if (!questionId) {
      res.json({ message: 'questionId is required' });
      return
    }
    if (!Types.ObjectId.isValid(questionId)) {
      res.json({ message: 'questionId should be a Types.ObjectId' });
      return
    }
    if (!value) {
      res.json({ message: 'value is required' });
      return
    }

    const respondentId = req.params.id;
    const respondent = await Respondent.findById(respondentId);
    if (respondent) {
      const respondentAnswerIds: Types.ObjectId[] = respondent.answers.map(({ _id }) => _id)
      const answers = await Answer.find({ '_id': { $in: respondentAnswerIds } });

      const isExistedAnswer = answerId && answers.some(answer => answer.questionId.equals(questionId));

      if (isExistedAnswer) {
        await Answer.findByIdAndUpdate(answerId, { value })
      } else {
        const newAnswer = new Answer({ questionId, value });
        await newAnswer.save();

        const updatedRespondent: IRespondent = {
          name: respondent.name,
          answers: [...respondent?.answers, newAnswer._id],
          questionnaire: respondent.questionnaire
        }
        await Respondent.findByIdAndUpdate(respondentId, updatedRespondent);
      }

      const message = `Respondent "${respondentId}"; updated with answer "${answerId}" and value "${value}"`
      console.log(message);
      res.json({ message });
    }

  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    // const id = req.params.id;
    // await Question.findByIdAndDelete(id);
    // const message = `Question ${id} removed successfully`;
    // console.log(message);
    // res.json({ message });
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};
