import { FormEvent } from "react";
import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from "./style";

export const SwitchMod = () => {
  // const { editMod, setEditMod, questionMod } = useContext(
  //   Context
  // ) as ContextType;

  const handleChange = (e: FormEvent<HTMLInputElement>) =>
    console.log("switch");

  // if (questionMod)
  return (
    <CheckBoxWrapper>
      <CheckBox id="checkbox" type="checkbox" onChange={handleChange} />
      <CheckBoxLabel htmlFor="checkbox"></CheckBoxLabel>
    </CheckBoxWrapper>
  );

  return null;
};
