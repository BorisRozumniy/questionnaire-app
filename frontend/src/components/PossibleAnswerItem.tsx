import { useContext } from 'react';
import {
  QuestionItemContextType,
  TPossibleAnswerItem,
} from '../@types/question';
import { QuestionItemContext } from '../context/questionItemContext';
import { AnswerItemInput } from './AnswerItemInput';
import { PossibleOneAnswerItem } from './PossibleOneAnswerItem';

type Props = {
  item: TPossibleAnswerItem;
  selectedOption?: string;
  setSelectedOption: (item: string) => void;
};

export const PossibleAnswerItem = ({
  item,
  selectedOption,
  setSelectedOption,
}: Props) => {
  const { editMode, pollingMode } = useContext(
    QuestionItemContext
  ) as QuestionItemContextType;

  if (editMode) return <AnswerItemInput {...{ item }} />;

  return (
    <PossibleOneAnswerItem {...{ item, setSelectedOption, selectedOption, pollingMode }} />
  );
};
