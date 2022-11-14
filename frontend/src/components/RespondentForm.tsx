import { FC, FormEvent, useContext, useEffect, useState } from "react";
import { ContextType } from "../@types/context";
import { IRespondent } from "../@types/respondent";
import { getRequestQuestionnaires } from "../actions/getRequestQuestionnaires";
import { postRequestRespondent } from "../actions/postRequestRespondent";
import { Context } from "../context/context";
import { useSelectedOne } from "../useSelected";
import { Button } from "./Styled/Button";
import { Input } from "./Styled/Input";
import { AddFormWrapper } from "./AddFormWrapper";
import { SelectComponent } from "./Select";
import { Label } from "./Styled/Label";
import { Field } from "./Styled/Field";

export const RespondentForm: FC = () => {
  const { questionnaireState, respondentsDispatch, questionnaireDispatch } =
    useContext(Context) as ContextType;
  const { questionnaires } = questionnaireState;

  useEffect(() => {
    if (questionnaires.length === 0) {
      getRequestQuestionnaires({
        dispatch: questionnaireDispatch,
      });
    }
  }, [questionnaires]);

  const [value, setValue] = useState("");

  const onChange = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
    setValue(currentTarget.value);
  };

  const [questionnaire, setQuestionnaire] = useSelectedOne();

  const onClick = () => {
    const requestBody: Omit<IRespondent, "_id"> = {
      name: value,
      questionnaire,
    };
    value &&
      questionnaire &&
      postRequestRespondent({ requestBody, dispatch: respondentsDispatch });
  };

  const options = questionnaires.map((item) => {
    return { label: item.name, value: item._id };
  });

  const [isFocusedSelect, setIsFocusedSelect] = useState(false);

  return (
    <AddFormWrapper>
      <h2>Add Respondent</h2>
      <Field>
        <Label htmlFor="name">Respondent name</Label>
        <Input {...{ onChange, value, id: "name" }} />
      </Field>
      <Field>
        <Label onClick={() => setIsFocusedSelect(true)}>Answer type</Label>
        <SelectComponent
          options={options}
          onChange={(option) => setQuestionnaire(option!.value)}
          isFocused={isFocusedSelect}
          setIsFocused={setIsFocusedSelect}
        />
      </Field>
      <Button {...{ onClick, disabled: !value || !questionnaire }}>
        New Respondent
      </Button>
    </AddFormWrapper>
  );
};
