import { useEffect, useContext } from "react";
import { ContextType } from "../@types/question";
import { getRequest } from "../actions/getRequest";
import { Context } from "../context/context";
import { apiUrls } from "./apiUrls";
import { RespondentAddButton } from "./RespondentAddButton";

export const RespondentList = () => {
  const { questionMod, setQuestionMod, respondentsDispatch, respondentsState } =
    useContext(Context) as ContextType;

  const { respondents } = respondentsState;

  useEffect(() => {
    const url = apiUrls.questionnaire;
    getRequest({
      url,
      dispatch: respondentsDispatch,
    });
  }, []);

  if (questionMod) return null;

  return (
    <>
      <h1>RespondentList</h1>
      {respondents.map((item) => (
        <p key={item._id}>{item.companyName}</p>
      ))}
      <RespondentAddButton {...{ setQuestionMod, respondentsDispatch }} />
    </>
  );
};
