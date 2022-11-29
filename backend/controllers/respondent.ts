import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { Respondent } from '../models/Respondent';
import { IRespondent, IUserAnswer, QuestionWithAnswer, RespondentResponse } from '../types';
import { Answer } from '../models/Answer';
import { Questionnaire } from '../models/Questionnaire';
import { Question } from '../models/Question';


export const create = async (req: Request, res: Response) => {
  try {
    const { name, questionnaire } = req.body;
    if (!questionnaire || !name) {
      const message = '"name" and "questionnaire" are required!';
      // eslint-disable-next-line no-console
      console.log(message, req.body);
      return res.status(400).json({ message });
    }

    const existing = await Respondent.findOne({ name });
    if (existing) {
      const message = `Respondent "${name}" already exists`;
      // eslint-disable-next-line no-console
      console.log(message);
      return res.status(400).json({ message });
    }

    const newRespondent = new Respondent(req.body);
    const data = await newRespondent.save();
    const message = `Respondent for "${name}" created successfully`;

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

export const checkRespondentsLength = async (req: Request, res: Response) => {
  try {
    const respondents = await Respondent.find();
    if (respondents)
      res.json(respondents.length);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

type ReadOneRequest = Request<{ id: string }, Record<string, unknown>, IUserAnswer>
type ReadErrorResponse = { message: string }
type ReadResponse = Response<RespondentResponse | ReadErrorResponse>

export const readOne = async (req: ReadOneRequest, res: ReadResponse) => {
  try {
    const respondentId = req.params.id;
    const respondent = await Respondent.findById(respondentId);

    if (respondent) {
      const questionnaire = await Questionnaire.findById(respondent.questionnaire);
      if (questionnaire) {
        const questions = await Question.find({ '_id': { $in: questionnaire.questions } });

        const answers = await Answer.find({ '_id': { $in: respondent.answers } });

        const questionsWithAnswers = questions.map(({
          _id, questionText, answerType, answerOptions
        }) => {

          const filteredAnswers = answers.filter(answer => answer.questionId.equals(_id));


          const questionWithAnswer: QuestionWithAnswer = {
            _id,
            answerType,
            questionText,
            answerOptions,
            answer: filteredAnswers?.at(-1) || {},
          };
          return questionWithAnswer;
        });

        res.json({
          _id: respondent._id,
          name: respondent.name,
          questionnaire: respondent.questionnaire,
          answers: respondent.answers,
          questions: questionsWithAnswers,
        });
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const respondents = await Respondent.find();
    res.json(respondents);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

type UpdateRequest = Request<{ id: string }, Record<string, unknown>, IUserAnswer>
type SuccessResponse = { message: string }
type ErrorResponse = { message: string }
type UpdateResponse = Response<SuccessResponse | ErrorResponse>

export const saveAnswer = async (req: UpdateRequest, res: UpdateResponse) => {
  try {
    const { questionId, value, _id: answerId } = req.body;
    if (!questionId) {
      res.json({ message: 'questionId is required' });
      return;
    }
    if (!Types.ObjectId.isValid(questionId)) {
      res.json({ message: 'questionId should be a Types.ObjectId' });
      return;
    }
    if (!value) {
      res.json({ message: 'value is required' });
      return;
    }

    const respondentId = req.params.id;
    const respondent = await Respondent.findById(respondentId);
    if (respondent) {
      const respondentAnswerIds: Types.ObjectId[] = respondent.answers.map(({ _id }) => _id);
      const answers = await Answer.find({ '_id': { $in: respondentAnswerIds } });

      const isExistedAnswer = answerId && answers.some(answer => answer.questionId.equals(questionId));

      if (isExistedAnswer) {
        await Answer.findByIdAndUpdate(answerId, { value });
      } else {
        const newAnswer = new Answer({ questionId, value });
        await newAnswer.save();

        const updatedRespondent: IRespondent = {
          name: respondent.name,
          answers: [...respondent?.answers || [], newAnswer._id],
          questionnaire: respondent.questionnaire
        };
        await Respondent.findByIdAndUpdate(respondentId, updatedRespondent);
      }

      const message = `Respondent "${respondentId}"; updated with answer "${answerId}" and value "${value}"`;
      // eslint-disable-next-line no-console
      console.log(message);
      res.json({ message });
    }

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
    // console.log(message);
    // res.json({ message });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};
