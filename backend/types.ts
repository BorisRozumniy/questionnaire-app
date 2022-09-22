export enum AnswerType {
    text = 'text',
    data = 'data',
    oneOfTheList = 'one of the list',
    aFewFromTheList = 'a few from the list',
    scale = 'scale'
}

export interface IQuestion {
    questionText: string;
    answerType: AnswerType;
}