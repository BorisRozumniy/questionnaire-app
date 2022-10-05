import { useContext } from "react";
import { ContextType, IQuestion } from "../@types/question";
import { Context } from "../context/context";
import { Question } from "./Question";

export const Questions = () => {
  const { questions } = useContext(Context) as ContextType;

  return (
    <>
      <h2>Questions list</h2>
      {questions?.length > 0 &&
        questions.map((question: IQuestion) => (
          <Question key={question._id} question={question} />
        ))}
    </>
  );

  return null;
};
