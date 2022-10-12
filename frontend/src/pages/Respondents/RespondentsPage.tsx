import { useEffect, useContext } from "react";
import { ContextType } from "../../@types/context";
import { getRequestRespondents } from "../../actions/getRequestRespondents";
import { Context } from "../../context/context";
import { apiUrls } from "../../urls/apiUrls";
import { RespondentAddButton } from "../../components/RespondentAddButton";
import { RespondentCard } from "./RespondentCard";

export const RespondentsPage = () => {
  const { respondentsDispatch, respondentsState, questionnaireState } =
    useContext(Context) as ContextType;

  const { respondents } = respondentsState;
  const { questionnaires } = questionnaireState;

  useEffect(() => {
    const url = apiUrls.respondents;
    getRequestRespondents({
      url,
      dispatch: respondentsDispatch,
    });
  }, []);

  return (
    <>
      <h1>RespondentList</h1>
      {respondents.map((item) => (
        <RespondentCard key={item._id} respondent={item} />
      ))}
      <RespondentAddButton {...{ respondentsDispatch, questionnaires }} />
    </>
  );
};
