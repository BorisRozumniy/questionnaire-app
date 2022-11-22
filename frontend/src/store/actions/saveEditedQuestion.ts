import { IQuestion } from '../../@types/question';
import { apiUrls } from '../../urls/apiUrls';

export const saveEditedQuestion = (
  editedQuestion: IQuestion,
  questions: IQuestion[],
  setQuestions: (q: IQuestion[]) => void,
) => {
  const { _id: questionId } = editedQuestion;

  const config = {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(editedQuestion),
  };
  const url = apiUrls.questions + questionId;

  fetch(url, config)
    .then((res) => res.json())
    .then(({ message }) => {
      console.log(message);
      const newQuestions: IQuestion[] = questions.map((item: IQuestion) => {
        if (item._id === questionId) return { ...item, ...editedQuestion };
        return item;
      });
      setQuestions(newQuestions);
    })
    .catch((error) => {
      console.log('error', error);
    });
};
