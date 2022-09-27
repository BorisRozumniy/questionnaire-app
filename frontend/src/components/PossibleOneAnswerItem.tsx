import { FormEvent } from "react";
import styled from "styled-components";
import { TPossibleAnswerItem } from "../@types/question";
import { Input } from "./Styled/Input";

type Props = {
  item: TPossibleAnswerItem;
  selectedOption?: string;
  setSelectedOption: (item: string) => void;
};

export const PossibleOneAnswerItem = ({
  item,
  selectedOption,
  setSelectedOption,
}: Props) => {
  const handleSelectChange = (event: FormEvent<HTMLInputElement>): void => {
    setSelectedOption(event.currentTarget.value);
  };

  return (
    <Label>
      <InputRadio
        type="radio"
        value={item.title}
        checked={selectedOption === item.title}
        onChange={handleSelectChange}
      />
      {item.title}
    </Label>
  );
};

const InputRadio = styled(Input)`
  cursor: pointer;
`;
const Label = styled.label`
  cursor: pointer;
`;
