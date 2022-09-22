import { FC, FormEvent, useContext, useState } from "react";
import { TodoContext } from "../context/todoContext";
import { TodoContextType, ITodo, AnswerType, Option } from "../@types/todo";
import { Input } from "./Styled/Input";
import { Button } from "./Styled/Button";
import { AnswerTypeSelect } from "./AnswerTypeSelect";
import { ActionMeta, SingleValue } from "react-select";

type OnChange = (
  newValue: SingleValue<Option>,
  actionMeta: ActionMeta<Option>
) => void;

const AddTodo: FC = () => {
  const { saveTodo, editMod } = useContext(TodoContext) as TodoContextType;
  const [formData, setFormData] = useState({} as ITodo);

  const handleForm = (e: FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      questionText: e.currentTarget.value,
    });
  };

  const handleChangeSelect: OnChange = (selected) => {
    selected &&
      setFormData({
        ...formData,
        answerType: selected?.value,
      });
  };

  const handleSaveTodo = (e: FormEvent, formData: ITodo | any) => {
    e.preventDefault();
    saveTodo(formData);

    const config = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(formData),
    };

    const url = "/questions/";
    fetch(url, config)
      .then((res) => res.json())
      .then(({ data, message }) => {
        console.log(data, message);
      })
      .catch((error) => {
        console.log("error fff", error);
      });
  };

  if (editMod)
    return (
      <>
        <h2>Create question</h2>
        <form className="Form" onSubmit={(e) => handleSaveTodo(e, formData)}>
          <div>
            <div>
              <label htmlFor="questionText">Question</label>
              <Input onChange={handleForm} type="text" name="questionText" />
            </div>
            <div>
              <label>Answer type</label>
              <AnswerTypeSelect onChange={handleChangeSelect} />
            </div>
          </div>
          <Button disabled={!formData.questionText ? true : false}>
            Add Todo
          </Button>
        </form>
      </>
    );

  return null;
};

export default AddTodo;

export const options = [
  { value: AnswerType.text, label: AnswerType.text },
  { value: AnswerType.data, label: AnswerType.data },
  { value: AnswerType.oneOfTheList, label: AnswerType.oneOfTheList },
  { value: AnswerType.aFewFromTheList, label: AnswerType.aFewFromTheList },
  { value: AnswerType.scale, label: AnswerType.scale },
];
