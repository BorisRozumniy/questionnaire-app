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
type TUserAnswer = {
    answers: string[];
};
export interface IQuestion {
    questionText: string;
    answerType: AnswerType;
    answerOptions: PossibleAnswer[],
    userAnswer?: string | string[] | number;
}
export interface IQuestionnaire {
    companyName: string;
    userAnswers: TUserAnswer
}