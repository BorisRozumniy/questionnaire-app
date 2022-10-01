import { FC } from "react";
import { Button } from "./Styled/Button";

type Props = { onClick: () => void };

export const RespondentAddButton: FC<Props> = ({ onClick }) => (
  <Button {...{ onClick }}>New Respondent</Button>
);
