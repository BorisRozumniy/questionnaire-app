// components/AddTodo.tsx
import * as React from "react";
import { TodoContext } from "../context/todoContext";
import { TodoContextType, ITodo, AnswerType } from "../@types/todo";

const AddTodo: React.FC = () => {
  const { saveTodo } = React.useContext(TodoContext) as TodoContextType;
  const [formData, setFormData] = React.useState<ITodo | {}>();
  console.log(formData);
  // React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>

  // handleQuestionText
  const handleForm = (
    e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setFormData({
      ...formData,
      // text: e.currentTarget.value,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo | any) => {
    console.log(e, formData);

    e.preventDefault();
    saveTodo(formData);
  };
  return (
    <form className="Form" onSubmit={(e) => handleSaveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor="name">Question</label>
          <input onChange={handleForm} type="text" id="questionText" />
        </div>
        <div>
          <label htmlFor="answerType">Answer Type</label>
          {/* <select onChange={(e) => console.log(e.target.value)} id="answerType"> */}
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
      <button disabled={formData === undefined ? true : false}>Add Todo</button>
    </form>
  );
};

export default AddTodo;
