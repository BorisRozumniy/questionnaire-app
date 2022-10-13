import { FormEvent } from "react";
import styled from "styled-components";
import { TPossibleAnswerItem } from "../@types/question";
import { Input } from "./Styled/Input";

type Props = {
  item: TPossibleAnswerItem;
  selectedOption?: string;
  setSelectedOption: (item: string) => void;
  pollingMode?: boolean;
};

export const PossibleOneAnswerItem = ({
  item,
  selectedOption,
  setSelectedOption,
  pollingMode,
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
        disabled={!pollingMode}
      />
      {item.title}
    </Label>
  );
};

const InputRadio = styled(Input)`
  cursor: pointer;
  margin-right: 4px;
`;
const Label = styled.label`
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;
