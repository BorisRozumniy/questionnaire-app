import { Question } from "../models/Question";
import { Request, Response } from 'express';
import { Questionnaire } from "../models/Questionnaire";


export const create = async (req: Request, res: Response) => {
  try {
    const { questionText } = req.body;

    const existing = await Question.findOne({ questionText });
    if (existing) {
      const message = `Question "${questionText}" already exists`;
      console.log(message);
      return res.status(400).json({ message });
    }

    const newQuestion = new Question(req.body);
    const savedQuestion = await newQuestion.save()
    let message = `Question "${questionText}" created successfully`;
    let savedQuestionnaire
    const afterСolon = /\/:(.*)/;
    const match = afterСolon.exec(req.get('Referer') || '');
    if (match) {
      const questionnaireId = match[1]
      const questionnaire = await Questionnaire.findById(questionnaireId)
      questionnaire?.questions?.push(savedQuestion._id)
      savedQuestionnaire = await questionnaire?.save()
      message += ` and added to the "${savedQuestionnaire?.name}" Questionnayre`
    }


    res.status(201).json({ data: savedQuestion, message });
    console.log(message, savedQuestion, savedQuestionnaire);
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

export const getMany = async (req: Request, res: Response) => {
  try {
    const ids = req.params.ids.split(',');
    const questions = await Question.find({ '_id': { $in: ids } });
    res.json(questions);
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again", error });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Question.findByIdAndUpdate(id, req.body);
    const message = `Question "${id}" changed successfully`;
    console.log(message);
    res.json({ message });
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Question.findByIdAndDelete(id);
    const message = `Question ${id} removed successfully`;
    console.log(message);
    res.json({ message });
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};
