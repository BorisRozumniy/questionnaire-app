import mongoose from "mongoose";

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

type TUserAnswer = string[];

type TId = string;

type TQuestionnaireId = mongoose.SchemaDefinitionProperty<string>;

export interface IQuestion {
    questionText: string;
    answerType: AnswerType;
    answerOptions: PossibleAnswer[],
    userAnswer?: string | string[] | number;
}

export interface IRespondent {
    name: string;
    answers: TUserAnswer;
    questionnaire: TQuestionnaireId;
}

export interface IQuestionnaire {
    name: string;
    questions?: [];
}
