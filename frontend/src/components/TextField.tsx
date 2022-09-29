import { FC } from "react";
import { Input } from "./Styled/Input";

export const TextField: FC<{ editMod: boolean }> = ({ editMod }) => (
  <Input disabled={editMod} />
);
