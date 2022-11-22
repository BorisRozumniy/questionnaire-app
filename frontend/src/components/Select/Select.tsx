import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';
import ReactSelect, { ActionMeta, GroupBase, SingleValue } from 'react-select';
import Select from 'react-select/dist/declarations/src/Select';
import { customStyles } from './style';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Option = { label: any; value: any };
type OnChange = (
  newValue: SingleValue<Option>,
  actionMeta: ActionMeta<Option>,
) => void;

type Props = {
  onChange: OnChange;
  options: Option[];
  value?: string;
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
};

export const SelectComponent: FC<Props> = ({
  onChange,
  value,
  options,
  isFocused,
  setIsFocused,
}) => {
  const selectedOption = options.find((option) => option.value === value);
  const selectRef = useRef<null | Select<Option, false, GroupBase<Option>>>(
    null,
  );

  useEffect(() => {
    isFocused && selectRef.current?.focus();
  }, [isFocused]);

  return (
    <ReactSelect
      ref={selectRef}
      options={options}
      onChange={onChange}
      styles={customStyles}
      value={selectedOption}
      menuPlacement="auto"
      onBlur={() => setIsFocused(false)}
    />
  );
};
