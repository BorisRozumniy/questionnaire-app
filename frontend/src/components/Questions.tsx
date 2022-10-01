import { useContext } from "react";
import { ContextType, IQuestion } from "../@types/question";
import { Context } from "../context/context";
import { Question } from "./Question";
import { Button } from "./Styled/Button";

export const Questions = () => {
  const { questions, questionMod, setQuestionMod } = useContext(
    Context
  ) as ContextType;

  if (questionMod)
    return (
      <>
        <Button onClick={() => setQuestionMod(false)}>
          Show respontent list
        </Button>

        <h2>Questions list</h2>
        {questions?.length > 0 &&
          questions.map((question: IQuestion) => (
            <Question key={question._id} question={question} />
          ))}
      </>
    );

  return null;
};
