import mongoose, { Types } from "mongoose";

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

export type TUserAnswer = { questionId: Id, value?: AnswerOptionId | AnswerTextValue };
// userAnswer?: string | string[] | number;


type Id = mongoose.SchemaDefinitionProperty<string>;

export interface IQuestion {
    questionText: string;
    answerType: AnswerType;
    answerOptions: PossibleAnswer[],
}

export interface IRespondent {
    name: string;
    questionnaire: Id;
    answers?: TUserAnswer[];
}

export interface IQuestionnaire {
    name: string;
    questions?: Types.ObjectId[];
}
