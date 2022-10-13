import { FC } from "react";
import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from "./style";

type Props = {
  id: string;
  checked: boolean;
  handleChange: () => void;
};

export const SwitchButton: FC<Props> = ({ id, checked, handleChange }) => {
  return (
    <CheckBoxWrapper>
      <CheckBox
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <CheckBoxLabel htmlFor={id}></CheckBoxLabel>
    </CheckBoxWrapper>
  );
};
