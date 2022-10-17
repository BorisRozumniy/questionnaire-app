import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import {
  QUESTIONNAIRES_ACTIONTYPE,
  IQuestionnaire,
} from "../../@types/questionnaire";
import { postRequestQuestionnaire } from "../../actions/postRequestQuestionnaire";
import { apiUrls } from "../../urls/apiUrls";
import { Button } from "../../components/Styled/Button";
import { Input } from "../../components/Styled/Input";

type Props = {
  // setQuestionMod: Dispatch<SetStateAction<boolean>>;
  questionnaireDispatch: Dispatch<QUESTIONNAIRES_ACTIONTYPE>;
};

export const QuestionnaireAddForm: FC<Props> = ({
  // setQuestionMod,
  questionnaireDispatch,
}) => {
  const [value, setValue] = useState("");

  const onChange = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
    setValue(currentTarget.value);
  };

  const onClick = () => {
    const url = apiUrls.questionnaires;
    const requestBody: Omit<IQuestionnaire, "_id"> = {
      name: value,
      questions: [],
    };
    // setQuestionMod(true);
    postRequestQuestionnaire({
      url,
      requestBody,
      dispatch: questionnaireDispatch,
    });
  };

  return (
    <>
      <Input {...{ onChange, value }} />
      <Button {...{ onClick }}>New Questionnaire</Button>
    </>
  );
};
