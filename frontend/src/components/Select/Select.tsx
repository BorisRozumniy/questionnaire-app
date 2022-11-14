import ReactSelect, { ActionMeta, SingleValue } from "react-select";
import { customStyles } from "./style";

type Option = { label: any; value: any };
type OnChange = (
  newValue: SingleValue<Option>,
  actionMeta: ActionMeta<Option>
) => void;

type Props = {
  onChange: OnChange;
  options: Option[];
  value?: string;
};

export const Select = ({ onChange, value, options }: Props) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <ReactSelect
      options={options}
      onChange={onChange}
      styles={customStyles}
      value={selectedOption}
      menuPlacement="auto"
    />
  );
};
