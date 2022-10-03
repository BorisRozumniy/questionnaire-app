import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { ACTIONTYPE, IRespondent } from "../@types/respondent";
import { postRequest } from "../actions/postRequest";
import { apiUrls } from "./apiUrls";
import { Button } from "./Styled/Button";
import { Input } from "./Styled/Input";

type Props = {
  setQuestionMod: Dispatch<SetStateAction<boolean>>;
  respondentsDispatch: Dispatch<ACTIONTYPE>;
};

export const RespondentAddButton: FC<Props> = ({
  setQuestionMod,
  respondentsDispatch,
}) => {
  const [value, setValue] = useState("");

  const onChange = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
    setValue(currentTarget.value);
  };

  const onClick = () => {
    const url = apiUrls.questionnaires;
    const requestBody: Omit<IRespondent, "_id"> = { name: value };
    setQuestionMod(true);
    postRequest({ url, requestBody, dispatch: respondentsDispatch });
  };

  return (
    <>
      <Input {...{ onChange, value }} />
      <Button {...{ onClick }}>New Respondent</Button>
    </>
  );
};
