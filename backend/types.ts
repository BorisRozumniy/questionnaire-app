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
export interface IQuestion {
    questionText: string;
    answerType: AnswerType;
    answerOptions: PossibleAnswer[],
}