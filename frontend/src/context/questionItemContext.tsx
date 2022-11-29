import { createContext, FC, ReactNode } from 'react';
import { TMongoId } from '../@types/common';
import { IQuestion, QuestionItemContextType } from '../@types/question';
import { useInput } from '../useInput';

export const QuestionItemContext =
  createContext<QuestionItemContextType | null>({
    question: {} as IQuestion,
    newOptionValue: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setNewOptionValue: () => {},
  });

interface Props {
  children: ReactNode;
  question: IQuestion;
  pollingMode?: boolean;
  editMode?: boolean;
  questionnaireId?: TMongoId;
}

export const QuestionItemProvider: FC<Props> = ({
  children,
  question,
  pollingMode,
  editMode,
  questionnaireId,
}) => {
  const [newOptionValue, setNewOptionValue] = useInput('');

  const value = {
    question,
    newOptionValue,
    setNewOptionValue,
    pollingMode,
    editMode,
    questionnaireId,
  };
  return (
    <QuestionItemContext.Provider value={value}>
      {children}
    </QuestionItemContext.Provider>
  );
};
