import { IQuestion } from "../@types/question";

export const saveEditedQuestion = (
    editedQuestion: IQuestion, questions: IQuestion[], setQuestions: (q: IQuestion[]) => void
) => {
    const { _id: questionId } = editedQuestion;

    const config = {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify(editedQuestion),
    };
    const url = "/questions/" + questionId;

    fetch(url, config)
        .then((res) => res.json())
        .then(({ message }) => {
            console.log(message);
            const copy: IQuestion[] = JSON.parse(JSON.stringify(questions));
            const finded = copy.find(({ _id }: IQuestion) => _id === questionId);
            if (finded) {
                finded.questionText = editedQuestion.questionText;
                finded.answerType = editedQuestion.answerType;
                finded.answerOptions = editedQuestion.answerOptions;
            }
            setQuestions([...copy]);
        })
        .catch((error) => {
            console.log("error", error);
        });
};
