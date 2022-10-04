import { Dispatch, FC, FormEvent, useEffect, useState } from "react";
import ReactSelect from "react-select";
import { IQuestionnaire } from "../@types/questionnaire";
import { ACTIONTYPE, IRespondent } from "../@types/respondent";
import { getRequest } from "../actions/getRequest";
import { postRequest } from "../actions/postRequest";
import { apiUrls } from "../urls/apiUrls";
import { useSelectedOne } from "../useSelected";
import { Button } from "./Styled/Button";
import { Input } from "./Styled/Input";

type Props = {
  respondentsDispatch: Dispatch<ACTIONTYPE>;
  questionnaires: IQuestionnaire[];
};

export const RespondentAddButton: FC<Props> = ({
  questionnaires,
  respondentsDispatch,
}) => {
  const [value, setValue] = useState("");

  const onChange = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
    setValue(currentTarget.value);
  };

  const [questionnaire, setQuestionnaire] = useSelectedOne();

  const onClick = () => {
    const url = apiUrls.respondents;
    const requestBody: Omit<IRespondent, "_id"> = {
      name: value,
      questionnaire,
    };
    postRequest({ url, requestBody, dispatch: respondentsDispatch });
  };

  useEffect(() => {
    getRequest({ url: apiUrls.questionnaires, dispatch: respondentsDispatch });
  }, []);

  const options = questionnaires.map((item) => {
    return { label: item.name, value: item._id };
  });

  return (
    <>
      <Input {...{ onChange, value }} />
      <ReactSelect
        options={options}
        onChange={(option) => setQuestionnaire(option!.value)}
        // styles={customStyles}
        defaultValue={options[0]}
      />
      <Button {...{ onClick }}>New Respondent</Button>
    </>
  );
};
