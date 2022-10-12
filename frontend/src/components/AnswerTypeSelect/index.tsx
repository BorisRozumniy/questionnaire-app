import Select, { ActionMeta, SingleValue } from "react-select";
import { AnswerType } from "../../@types/question";
import { customStyles } from "./style";

type Option = { label: AnswerType; value: AnswerType };
type OnChange = (
  newValue: SingleValue<Option>,
  actionMeta: ActionMeta<Option>
) => void;

type Props = {
  onChange: OnChange;
  value?: AnswerType;
};

export const AnswerTypeSelect = ({ onChange, value }: Props) => {
  const selectedOption = options.find((option) => option.value === value);
  return (
    <Select
      options={options}
      onChange={onChange}
      styles={customStyles}
      defaultValue={selectedOption || options[0]}
    />
  );
};

const options = [
  { value: AnswerType.text, label: AnswerType.text },
  { value: AnswerType.data, label: AnswerType.data },
  { value: AnswerType.oneOfTheList, label: AnswerType.oneOfTheList },
  { value: AnswerType.aFewFromTheList, label: AnswerType.aFewFromTheList },
  { value: AnswerType.scale, label: AnswerType.scale },
];
