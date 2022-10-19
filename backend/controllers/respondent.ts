import { Respondent } from "../models/Respondent";
import { Request, Response } from 'express';
import { IRespondent, TUserAnswer } from "../types";


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

export const read = async (req: Request, res: Response) => {
  try {
    const respondent = await Respondent.find();
    res.json(respondent);
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

type UpdateRequest = Request<{ id: string }, {}, TUserAnswer>
type UpdateResponse = Response<{ message: string }>

export const update = async (req: UpdateRequest, res: UpdateResponse) => {
  try {
    const respondentId = req.params.id;
    const { questionId, value } = req.body;
    const respondent = await Respondent.findById(respondentId);

    if (respondent?.answers) {
      const existingAnswer = respondent.answers.find(answer => String(answer.questionId) === questionId)
      let updatedAnswers: TUserAnswer[];

      if (existingAnswer) {
        updatedAnswers = respondent.answers.map(answer => {
          if (String(answer.questionId) === questionId)
            return { questionId: answer.questionId, value }
          return answer
        })
      } else {
        updatedAnswers = [...respondent?.answers, req.body]
      }

      const updatedRespondent: IRespondent = { name: respondent.name, answers: updatedAnswers, questionnaire: respondent.questionnaire }
      const updatedAnswer = updatedAnswers.find(answer => String(answer.questionId) === String(questionId))

      await Respondent.findByIdAndUpdate(respondentId, updatedRespondent);
      const message = `Respondent "${respondentId}" changed successfully.
        Question: ${questionId};
        Answer: ${updatedAnswer?.value};
      `;
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
