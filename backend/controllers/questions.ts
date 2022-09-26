import { Question } from "../models/Question";
import { Request, Response } from 'express';


export const create = async (req: Request, res: Response) => {
  try {
    const { questionText } = req.body;
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

export const read = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
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
