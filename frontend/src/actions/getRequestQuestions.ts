import { Dispatch } from "react";
import { ActionKind, ACTIONTYPE } from "../@types/question";
import { frontendUrls } from "../urls/frontendUrls";

type Params = {
  dispatch: Dispatch<ACTIONTYPE>,
}

export const getRequestQuestions = ({ dispatch }: Params) => {
  dispatch({ type: ActionKind.GET_REQUEST_QUESTIONS_START })
  fetch(frontendUrls.questions)
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: ActionKind.GET_REQUEST_QUESTIONS_SUCCESS, payload: data });
    })
    .catch((error) => {
      console.log("error", error);
      dispatch({ type: ActionKind.GET_REQUEST_QUESTIONS_ERROR, payload: error })
    })
}
