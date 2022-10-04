import { Dispatch } from "react";
import { QuestionnairesActionKind as ActionKind, QUESTIONNAIRES_ACTIONTYPE } from "../@types/questionnaire";

type Params = {
  url: string,
  dispatch: Dispatch<QUESTIONNAIRES_ACTIONTYPE>,
}

export const getRequestQuestionnaires = ({ url, dispatch }: Params) => {
  dispatch({ type: ActionKind.GET_REQUEST_QUESTIONNAIRES_START })
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: ActionKind.GET_REQUEST_QUESTIONNAIRES_SUCCESS, payload: data });
    })
    .catch((error) => {
      console.log("error", error);
      dispatch({ type: ActionKind.GET_REQUEST_QUESTIONNAIRES_ERROR, payload: error })
    })
}
