import {
  useState,
  createContext,
  FC,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { ContextType, IQuestion, AnswerType } from "../@types/question";
import { apiUrls } from "../urls/apiUrls";
import { initialState, respondentReducer } from "../reducers/respondentReducer";
import {
  questionnaireInitialState,
  questionnairesReducer,
} from "../reducers/questionnairesReducer";
import { getRequestQuestions } from "../actions/getRequestQuestions";
import {
  questionInitialState,
  questionsReducer,
} from "../reducers/questionsReducer";

export const Context = createContext<ContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const QuestionProvider: FC<Props> = ({ children }) => {
  const [questionMod, setQuestionMod] = useState(false);
  const [editMod, setEditMod] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [temporaryQuestion, setTemporaryQuestion] = useState<IQuestion>(
    {} as IQuestion
  );

  // getRequestQuestions({dispatch});
  useEffect(() => {
    const url = apiUrls.questions;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const saveQuestion = ({
    questionText,
    answerType,
    answerOptions,
  }: IQuestion) => {
    const newQuestion: Omit<IQuestion, "_id"> = {
      questionText,
      answerType: answerType || AnswerType.text,
      answerOptions,
    };

    const config = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newQuestion),
    };

    const url = apiUrls.questions;
    fetch(url, config)
      .then((res) => res.json())
      .then(({ data, message }) => {
        console.log(data, message);
        setQuestions([...questions, data]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const removeQuestion = (id: number) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    };
    const url = apiUrls.questions + id;

    fetch(url, config)
      .then((res) => res.json())
      .then(({ data, message }) => {
        const filtered = questions.filter(({ _id }: IQuestion) => _id !== id);
        setQuestions([...filtered]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const editQuestion = (id: number) => {
    toggleModal(true);
    setTemporaryQuestion(
      questions[questions.findIndex(({ _id }) => _id === id)]
    );
  };

  const saveEditedQuestion = (editedQuestion: IQuestion) => {
    const { _id: questionId } = editedQuestion;

    const config = {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(editedQuestion),
    };
    const url = apiUrls.questions + questionId;

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

  const toggleModal = (toggle: boolean) => {
    setModalIsOpen(toggle);
  };

  const [questionnaireState, questionnaireDispatch] = useReducer(
    questionnairesReducer,
    questionnaireInitialState
  );

  const [respondentsState, respondentsDispatch] = useReducer(
    respondentReducer,
    initialState
  );

  const [questionsState, questionsDispatch] = useReducer(
    questionsReducer,
    questionInitialState
  );

  return (
    <Context.Provider
      value={{
        questionnaireState,
        questionnaireDispatch,
        respondentsState,
        respondentsDispatch,
        questionsState,
        questionsDispatch,
        
        questionMod,
        setQuestionMod,
        editMod,
        setEditMod,
        questions,
        setQuestions,
        saveQuestion,
        removeQuestion,
        editQuestion,
        toggleModal,
        modalIsOpen,
        temporaryQuestion,
        setTemporaryQuestion,
        saveEditedQuestion,
      }}
    >
      {children}
    </Context.Provider>
  );
};
