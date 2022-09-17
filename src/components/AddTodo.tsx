import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import { TodoContext } from "../context/todoContext";
import { TodoContextType, ITodo, AnswerType } from "../@types/todo";
import { Container } from "./Styled/Container";
import { Input } from "./Styled/Input";
import { Button } from "./Styled/Button";

const AddTodo: FC = () => {
  const { saveTodo, editMod } = useContext(TodoContext) as TodoContextType;
  const [formData, setFormData] = useState({} as ITodo);

  const handleForm = (
    e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSaveTodo = (e: FormEvent, formData: ITodo | any) => {
    e.preventDefault();
    saveTodo(formData);
  };

  if (editMod)
    return (
      <Container>
        <h2>Create question</h2>
        <form className="Form" onSubmit={(e) => handleSaveTodo(e, formData)}>
          <div>
            <div>
              <label htmlFor="name">Question</label>
              <Input onChange={handleForm} type="text" id="questionText" />
            </div>
            <div>
              <label htmlFor="answerType">Answer Type</label>
              <select onChange={handleForm} id="answerType">
                <option value={AnswerType.text}>text</option>
                <option value={AnswerType.data}>data</option>
                <option value={AnswerType.oneOfTheList}>one of the list</option>
                <option value={AnswerType.aFewFromTheList}>
                  a few from the list
                </option>
                <option value={AnswerType.scale}>scale</option>
              </select>
            </div>
          </div>
          <Button disabled={formData === undefined ? true : false}>
            Add Todo
          </Button>
        </form>
      </Container>
    );

  return null;
};

export default AddTodo;
