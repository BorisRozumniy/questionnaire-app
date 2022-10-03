import { Respondent } from "../models/Respondent";
import { Request, Response } from 'express';


export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    console.log(req.body, name);

    const existing = await Respondent.findOne({ name });
    if (existing) {
      const message = `Respondent "${name}" already exists`;
      console.log(message);
      return res.status(400).json({ message });
    }

    const newRespondent = new Respondent(req.body);
    const data = await newRespondent.save();
    const message = `Respondent for ${name} created successfully`;

    res.status(201).json({ data, message });
    // res.status(201).json({ message: name });
    // console.log(message, data);
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

export const update = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id, req.body);

    // const id = req.params.id;
    // await Question.findByIdAndUpdate(id, req.body);
    // const message = `Question "${id}" changed successfully`;
    // console.log(message);
    // res.json({ message });
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
