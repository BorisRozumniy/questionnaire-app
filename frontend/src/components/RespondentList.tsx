import { useEffect, useState, useContext } from "react";
import { ContextType } from "../@types/question";
import { IRespondent } from "../@types/respondent";
import { getRequest } from "../actions/getRequest";
import { Context } from "../context/context";
import { RespondentAddButton } from "./RespondentAddButton";

export const RespondentList = () => {
  const { questionMod, setQuestionMod } = useContext(Context) as ContextType;

  const [questionnaires, setQuestionnaires] = useState<IRespondent[]>([]);

  useEffect(() => {
    const url = "/questionnaire/";
    getRequest({ url, setState: setQuestionnaires });
  }, []);

  if (questionMod) return null;

  return (
    <>
      <h1>RespondentList</h1>
      {questionnaires.map((item) => (
        <p>{item.companyName}</p>
      ))}
      <RespondentAddButton onClick={() => setQuestionMod(true)} />
    </>
  );
};
