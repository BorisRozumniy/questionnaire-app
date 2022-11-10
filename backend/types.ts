import mongoose, { Document, Types } from "mongoose";

export enum AnswerType {
    text = 'text',
    data = 'data',
    scale = 'scale',
    oneOfList = 'oneOfList',
    fewOfList = 'fewOfList',
}

type PossibleAnswer = {
    title: string;
};

type AnswerOptionId = number;
type AnswerTextValue = string;
type AnswerOption = { id: AnswerOptionId, value: AnswerTextValue };

export interface IUserAnswer {
    questionId: Types.ObjectId,
    value?: AnswerOptionId | AnswerTextValue | AnswerOption[];
    _id?: Types.ObjectId
};

export type QuestionWithAnswer = {
    _id: Types.ObjectId;
    answerType: AnswerType;
    questionText: string;
    answerOptions: PossibleAnswer[];
    answer: IUserAnswer | Document<unknown, any, IUserAnswer> & IUserAnswer & Required<{ _id: Types.ObjectId; }> | {};
}

type Id = mongoose.SchemaDefinitionProperty<string>;

export interface IQuestion {
    questionText: string;
    answerType: AnswerType;
    answerOptions: PossibleAnswer[],
}

export interface IRespondent {
    name: string;
    questionnaire: Id;
    answers: Types.ObjectId[];
}

export interface RespondentResponse extends IRespondent {
    _id: Types.ObjectId,
    questions: QuestionWithAnswer[];
}

export interface IQuestionnaire {
    name: string;
    questions?: Types.ObjectId[];
}

