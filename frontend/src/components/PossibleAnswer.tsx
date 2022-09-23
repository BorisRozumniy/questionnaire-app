import { EventHandler, FormEvent, useContext, useEffect, useState } from "react";
import { ContextType } from "../@types/question";
import { Context } from "../context/context";
import { Input } from "./Styled/Input";

type TPossibleAnswers = {
  title: string;
  selected: boolean;
  id: number;
};

type Props = {
  isSeveral?: boolean;
};

export const PossibleAnswer = ({ isSeveral }: Props) => {
  const [possibleAnswers, setPossibleAnswers] =
    useState<TPossibleAnswers[]>(mockData);

  // const [inputValue, setInputValue] = useState("");
  // console.log("inputValue", inputValue, "possibleAnswers", possibleAnswers);

  const handleChange = (
    { currentTarget }: FormEvent<HTMLInputElement>,
    currentId: number
  ): void => {
    const index = possibleAnswers.findIndex(({ id }) => id === currentId);

    // setInputValue(currentTarget.value);
    // possibleAnswers[index].title = currentTarget.value;
    setPossibleAnswers([...possibleAnswers]);
    console.log("change handler", index);
  };

  const handleFocus = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>): void => {
    console.log(currentTarget, currentTarget.value);
    // setInputValue(currentTarget.value);
  };

  const handleBlur = (e: FormEvent<HTMLInputElement>, value: string) => {
    console.dir(/* "blur", value, e.currentTarget.value, */ e.currentTarget);
    // setInputValue("");
  };

  return (
    <>
      {possibleAnswers?.map((item) => (
        <PossibleAnswerItem
          key={item.title}
          item={item}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ))}
      {/* <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      <button>add new option</button> */}
    </>
  );
};

type PAProps = {
  item: TPossibleAnswers;
  onChange: (e: FormEvent<HTMLInputElement>, id: number) => void;
  onFocus: EventHandler<FormEvent<HTMLInputElement>>;
  onBlur: (e: FormEvent<HTMLInputElement>, value: string) => void;
  // onBlur: EventHandler<FormEvent<HTMLInputElement>>;
};
export const PossibleAnswerItem = ({
  item,
  onChange,
  onFocus,
  onBlur,
}: PAProps) => {
  const [inputValue, setInputValue] = useState(item.title);

  useEffect(() => {
    setInputValue(item.title);
  }, [item]);

  const { editMod } = useContext(Context) as ContextType;

  if (editMod)
    return (
      <Input
        onChange={(e) => onChange(e, item.id)}
        // onChange={(e) => setInputValue(e.currentTarget.value)}
        onFocus={onFocus}
        onBlur={(e) => onBlur(e, inputValue)}
        // value={item.title}
        value={inputValue}
      />
    );
  return (
    <>
      <input
        // type="checkbox"
        type="radio"
        name={item.title}
        checked={item.selected}
        // onChange={onChange}
        onFocus={onFocus}
        // onBlur={onBlur}
        onBlur={(e) => onBlur(e, inputValue)}
      />
      <label htmlFor={item.title}>{item.title}</label>
    </>
  );
};

const mockData = [
  {
    title: "item 1",
    selected: false,
    id: 0o1,
  },
  {
    title: "item 2",
    selected: false,
    id: 0o2,
  },
  {
    title: "item 3",
    selected: true,
    id: 0o3,
  },
];
