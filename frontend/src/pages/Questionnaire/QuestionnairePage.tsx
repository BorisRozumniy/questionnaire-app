import { useParams } from "react-router-dom";
import { AddQuestion } from "../../components/AddQuestion";
import { Questions } from "../../components/Questions";

export const QuestionnairePage = () => {
  let params = useParams();
  console.log(params);
  return (
    <>
      <h1>QuestionnairePage</h1>
      <Questions />
      <AddQuestion />
    </>
  );
};
