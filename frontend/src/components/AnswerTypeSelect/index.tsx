import Select, { ActionMeta, SingleValue } from "react-select";
import { AnswerType } from "../../@types/question";
import { options } from "../AddQuestion";
import { customStyles } from "./style";

type Option = { label: AnswerType; value: AnswerType };
type OnChange = (
  newValue: SingleValue<Option>,
  actionMeta: ActionMeta<Option>
) => void;

type Props = {
  onChange: OnChange;
};

export const AnswerTypeSelect = ({ onChange }: Props) => (
  <Select
    options={options}
    onChange={onChange}
    styles={customStyles}
    defaultValue={options[0]}
  />
);
