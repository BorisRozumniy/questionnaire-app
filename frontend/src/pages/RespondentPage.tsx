import { useEffect, useContext } from "react";
import { ContextType } from "../@types/context";
import { getRequest } from "../actions/getRequest";
import { Context } from "../context/context";
import { apiUrls } from "../urls/apiUrls";
import { RespondentAddButton } from "../components/RespondentAddButton";

export const RespondentPage = () => {
  const {
    // questionMod,
    // setQuestionMod,
    respondentsDispatch,
    respondentsState,
    questionnaireState,
  } = useContext(Context) as ContextType;

  const { respondents } = respondentsState;
  const { questionnaires } = questionnaireState;

  useEffect(() => {
    const url = apiUrls.respondents;
    getRequest({
      url,
      dispatch: respondentsDispatch,
    });
  }, []);

  // if (questionMod) return null;

  return (
    <>
      <h1>RespondentList</h1>
      {respondents.map((item) => (
        <p key={item._id}>{item.name}</p>
      ))}
      <RespondentAddButton {...{ respondentsDispatch, questionnaires }} />
    </>
  );
};
