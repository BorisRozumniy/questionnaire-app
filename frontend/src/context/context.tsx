import { createContext, FC, ReactNode, useReducer, useState } from 'react';
import {
  initialState,
  respondentReducer,
} from '../store/reducers/respondentReducer';
import {
  questionnaireInitialState,
  questionnairesReducer,
} from '../store/reducers/questionnairesReducer';
import {
  questionInitialState,
  questionsReducer,
} from '../store/reducers/questionsReducer';
import { ContextType } from '../@types/context';
import { IQuestion, NewQuestion } from '../@types/question';

export const Context = createContext<ContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const QuestionProvider: FC<Props> = ({ children }) => {
  const [questionnaireState, questionnaireDispatch] = useReducer(
    questionnairesReducer,
    questionnaireInitialState,
  );

  const [respondentsState, respondentsDispatch] = useReducer(
    respondentReducer,
    initialState,
  );

  const [questionsState, questionsDispatch] = useReducer(
    questionsReducer,
    questionInitialState,
  );

  const [temporaryQuestion, setTemporaryQuestion] = useState(
    {} as NewQuestion | IQuestion,
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
        temporaryQuestion,
        setTemporaryQuestion,
      }}
    >
      {children}
    </Context.Provider>
  );
};
