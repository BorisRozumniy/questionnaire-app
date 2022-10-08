import { Dispatch } from "react";
import { ActionKind, ACTIONTYPE, IQuestion } from "../@types/question";
import { apiUrls } from "../urls/apiUrls";

type Params = {
  requestBody: IQuestion;
  dispatch: Dispatch<ACTIONTYPE>,
}

export const postRequestQuestion = ({ requestBody, dispatch }: Params) => {

  const config = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(requestBody),
  };

  const url = apiUrls.questions;

  dispatch({ type: ActionKind.POST_REQUEST_CREATE_QUESTION_START })

  fetch(url, config)
    .then((res) => res.json())
    .then(({ data, message }) => {
      console.log(data, message);
      dispatch({ type: ActionKind.POST_REQUEST_CREATE_QUESTION_SUCCESS, payload: data })

    })
    .catch((error) => {
      console.log("error", error);
      dispatch({ type: ActionKind.POST_REQUEST_CREATE_QUESTION_ERROR, payload: error })

    });
};
