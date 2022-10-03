type TUserAnswer = {
    answers: string[];
};

export interface IRespondent {
    _id: string;
    companyName: string;
    userAnswers: TUserAnswer
}
