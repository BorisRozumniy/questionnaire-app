import { createContext, FC, ReactNode, useReducer } from "react";
import { initialState, respondentReducer } from "../reducers/respondentReducer";
import {
  questionnaireInitialState,
  questionnairesReducer,
} from "../reducers/questionnairesReducer";
import {
  questionInitialState,
  questionsReducer,
} from "../reducers/questionsReducer";
import { ContextType } from "../@types/context";

export const Context = createContext<ContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const QuestionProvider: FC<Props> = ({ children }) => {
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
      }}
    >
      {children}
    </Context.Provider>
  );
};
