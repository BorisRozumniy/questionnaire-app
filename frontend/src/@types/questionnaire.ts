type TUserAnswer = {
    answers: string[];
};

export interface IQuestionnaire {
    companyName: string;
    userAnswers: TUserAnswer
}