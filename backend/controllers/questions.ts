import { Question } from "../models/Question";
import { Request, Response } from 'express';


export const create = async (req: Request, res: Response) => {
  try {
    const { questionText, answerType } = req.body;
    const newQuestion = new Question({ questionText, answerType });
    await newQuestion.save();
    const message = `Question ${questionText.split(' ')[0]} created successfully`;

    res.status(201).json({ question: newQuestion, message });
    console.log(message);
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
    const { questionText } = req.body;
    await Question.findByIdAndUpdate(req.params.id, req.body);
    const message = `Task "${questionText}" changed successfully`;
    console.log(message);
    res.json({
      editedQuestion: req.body,
      message,
    });
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    const message = `Task ${req.body.questionText} removed successfully`;
    console.log(message);
    res.json({
      deletedQuestion,
      message,
    });
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};
