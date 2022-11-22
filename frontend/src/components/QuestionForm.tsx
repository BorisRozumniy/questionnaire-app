import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { ActionMeta, SingleValue } from 'react-select';
import { IQuestion, AnswerType, Option, NewQuestion } from '../@types/question';
import { ACTIONTYPE } from '../@types/questionnaire';

import { Input } from './Styled/Input';
import { Button } from './Styled/Button';
import { SelectComponent as Select } from './Select';
import { AnswerTypeComponent } from './AnswerType';
import { postRequestQuestion } from '../store/actions/postRequestQuestion';
import { patchRequestEditQuestion } from '../store/actions/editRequestQuestion';
import { Context } from '../context/context';
import { ContextType } from '../@types/context';
import { UserAnswer } from '../@types/respondent';
import { Label } from './Styled/Label';
import { Field } from './Styled/Field';

type OnChange = (
  newValue: SingleValue<Option>,
  actionMeta: ActionMeta<Option>,
) => void;

type Pros = {
  question?: IQuestion;
  dispatch: Dispatch<ACTIONTYPE>;
  isEditForm?: boolean;
  setEditMod?: Dispatch<SetStateAction<boolean>>;
};

const initialQuestion: NewQuestion = {
  questionText: '',
  answerType: AnswerType.text,
  answerOptions: [],
  answer: {} as UserAnswer,
};

export const QuestionForm: FC<Pros> = ({
  isEditForm,
  question,
  dispatch,
  setEditMod,
}) => {
  const { temporaryQuestion, setTemporaryQuestion } = useContext(
    Context,
  ) as ContextType;

  const params = useParams();
  const questionnaireId = params.id?.substring(1) || '';

  useEffect(() => {
    if (question) {
      setTemporaryQuestion(question);
    }
  }, []);

  const handleQuestionText = (e: FormEvent<HTMLInputElement>): void => {
    setTemporaryQuestion({
      ...temporaryQuestion,
      questionText: e.currentTarget.value,
    });
  };

  const handleChangeSelect: OnChange = (selected) => {
    const isNeedList =
      selected?.value === AnswerType.oneOfTheList ||
      selected?.value === AnswerType.aFewFromTheList;

    selected &&
      setTemporaryQuestion({
        ...temporaryQuestion,
        answerType: selected?.value,
      });

    isNeedList &&
      setTemporaryQuestion({
        ...temporaryQuestion,
        answerType: selected?.value,
        answerOptions: [],
      });
  };

  const handleSave = (temporaryQuestion: NewQuestion | IQuestion) => {
    if (temporaryQuestion._id) {
      patchRequestEditQuestion({
        requestBody: temporaryQuestion as IQuestion,
        questionnaireId,
        dispatch,
      });
    } else {
      postRequestQuestion({
        requestBody: temporaryQuestion,
        questionnaireId,
        dispatch,
      });
    }
    setEditMod && setEditMod(false);
    setTemporaryQuestion(initialQuestion);
  };

  const [isFocusedSelect, setIsFocusedSelect] = useState(false);

  return (
    <div>
      <Field>
        <Label htmlFor="questionText">Question</Label>
        <Input
          value={temporaryQuestion.questionText || ''}
          onChange={handleQuestionText}
          onKeyUp={({ key }) =>
            key === 'Enter' && handleSave(temporaryQuestion)
          }
          type="text"
          id="questionText"
        />
      </Field>
      <Field>
        <Label onClick={() => setIsFocusedSelect(true)}>Answer type</Label>
        <Select
          options={options}
          onChange={handleChangeSelect}
          value={temporaryQuestion.answerType}
          isFocused={isFocusedSelect}
          setIsFocused={setIsFocusedSelect}
        />
      </Field>
      {temporaryQuestion.answerType && (
        <AnswerTypeComponent answerType={temporaryQuestion.answerType} />
      )}
      <Button
        onClick={() => handleSave(temporaryQuestion)}
        disabled={!temporaryQuestion.questionText ? true : false}
      >
        {isEditForm ? 'Save changes' : 'Save question'}
      </Button>
    </div>
  );
};

const options = [
  { value: AnswerType.text, label: AnswerType.text },
  { value: AnswerType.data, label: AnswerType.data },
  { value: AnswerType.oneOfTheList, label: AnswerType.oneOfTheList },
  { value: AnswerType.aFewFromTheList, label: AnswerType.aFewFromTheList },
  { value: AnswerType.scale, label: AnswerType.scale },
];
