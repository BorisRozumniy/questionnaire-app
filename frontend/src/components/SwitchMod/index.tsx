import { FormEvent, useContext } from "react";
import { TodoContextType } from "../../@types/todo";
import { TodoContext } from "../../context/todoContext";
import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from "./style";

export const SwitchMod = () => {
  const { editMod, setEditMod } = useContext(TodoContext) as TodoContextType;

  const handleChange = (e: FormEvent<HTMLInputElement>) => setEditMod(!editMod);

  return (
    <CheckBoxWrapper>
      <CheckBox id="checkbox" type="checkbox" onChange={handleChange} />
      <CheckBoxLabel htmlFor="checkbox"></CheckBoxLabel>
    </CheckBoxWrapper>
  );
};
