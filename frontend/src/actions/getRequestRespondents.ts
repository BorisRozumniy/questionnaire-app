import { Dispatch } from "react";
import { ActionKind, ACTIONTYPE } from "../@types/respondent";

type Params = {
  url: string,
  dispatch: Dispatch<ACTIONTYPE>,
}

export const getRequestRespondents = ({ url, dispatch }: Params) => {
  dispatch({ type: ActionKind.GET_REQUEST_RESPONDENTS_START })
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: ActionKind.GET_REQUEST_RESPONDENTS_SUCCESS, payload: data });
    })
    .catch((error) => {
      console.log("error", error);
      dispatch({ type: ActionKind.GET_REQUEST_RESPONDENTS_ERROR, payload: error })
    })
}
