import { FormEvent, useContext } from "react";
import { ContextType } from "../../@types/question";
import { Context } from "../../context/context";
import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from "./style";

export const SwitchMod = () => {
  const { editMod, setEditMod } = useContext(Context) as ContextType;

  const handleChange = (e: FormEvent<HTMLInputElement>) => setEditMod(!editMod);

  return (
    <CheckBoxWrapper>
      <CheckBox id="checkbox" type="checkbox" onChange={handleChange} />
      <CheckBoxLabel htmlFor="checkbox"></CheckBoxLabel>
    </CheckBoxWrapper>
  );
};
