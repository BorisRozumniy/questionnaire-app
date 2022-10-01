import { Questionnaire } from "../models/Questionnaire";
import { Request, Response } from 'express';


export const create = async (req: Request, res: Response) => {
    try {
        const { companyName } = req.body;
        console.log(req.body, companyName);

        // const existing = await Question.findOne({ questionText });
        // if (existing) {
        //   const message = `Question "${questionText}" already exists`;
        //   console.log(message);
        //   return res.status(400).json({ message });
        // }
        const newQuestionnaire = new Questionnaire(req.body);
        const data = await newQuestionnaire.save();
        const message = `Questionnaire for ${companyName} created successfully`;

        res.status(201).json({ data, message });
        // res.status(201).json({ message: companyName });
        // console.log(message, data);
    } catch (error) {
        console.log(`error: `, error);
        res.status(500).json({ message: "Something went wrong, please try again" });
    }
};

export const read = async (req: Request, res: Response) => {
    try {
        const questionnaire = await Questionnaire.find();
        res.json(questionnaire);
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
