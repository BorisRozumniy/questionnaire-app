import {
  EventHandler,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { ContextType, TPossibleAnswerItem } from "../@types/question";
import { Context } from "../context/context";
import { useSelectedOne } from "../useSelected";
import { Input } from "./Styled/Input";

type Props = {
  item: TPossibleAnswerItem;
  onChange: (e: FormEvent<HTMLInputElement>, item: TPossibleAnswerItem) => void;
  onFocus?: EventHandler<FormEvent<HTMLInputElement>>;
  onBlur?: (e: FormEvent<HTMLInputElement>, value: string) => void;
  selectedOption?: string;
  setSelectedOption?: (item: string) => void;
};

export const PossibleAnswerItem = ({
  item,
  onChange,
  selectedOption,
  setSelectedOption,
}: Props) => {
  const [inputValue, setInputValue] = useState(item.title);

  useEffect(() => {
    setInputValue(item.title);
  }, [item]);

  const { editMod } = useContext(Context) as ContextType;

  const onValueChange = (event: FormEvent<HTMLInputElement>): void => {
    console.log(event.currentTarget);
    setSelectedOption && setSelectedOption(event.currentTarget.value);
  };

  if (editMod)
    return (
      <Input
        onChange={(e) => onChange(e, item)}
        // onFocus={onFocus}
        value={inputValue}
      />
    );

  return (
    // <OptionWrapper>
    <Label>
      <InputRadio
        type="radio"
        id={String(item.id)}
        value={item.title}
        // checked={true}
        checked={selectedOption === item.title}
        // value={checkedOption}
        // value={item.title}
        onChange={onValueChange}
        // onFocus={onFocus}
        // onBlur={(e) => onBlur(e, inputValue)}
      />
      {item.title}
    </Label>
    //   <Label htmlFor={String(item.id)}>{item.title}</Label>
    // </OptionWrapper>
  );
};

const OptionWrapper = styled.div`
  padding: 4px;
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const InputRadio = styled(Input)`
  cursor: pointer;
`;
const Label = styled.label`
  cursor: pointer;
`;
