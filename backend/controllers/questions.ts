import { Question } from "../models/Question";
import { Request, Response } from 'express';


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
    const data = await newQuestion.save();
    const message = `Question ${questionText} created successfully`;

    res.status(201).json({ data, message });
    console.log(message, data);
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
