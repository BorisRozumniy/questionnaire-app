import { Dispatch } from "react";
import { TMongoId } from "../../@types/common";
import { NewQuestion } from "../../@types/question";
import { ActionKind, ACTIONTYPE } from "../../@types/questionnaire";
import { apiUrls } from "../../urls/apiUrls";

type Params = {
  requestBody: NewQuestion;
  questionnaireId: TMongoId;
  dispatch: Dispatch<ACTIONTYPE>,

}

export const postRequestQuestion = ({ requestBody, dispatch, questionnaireId }: Params) => {

  const config = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(requestBody),
  };

  const url = apiUrls.questions;
  let isOk = false

  dispatch({ type: ActionKind.POST_REQUEST_CREATE_QUESTION_START })

  fetch(url, config)
    .then((res) => {
      if (res.ok) isOk = true
      return res.json()
    })
    .then(({ data, message }) => {
      console.log(data, message);
      if (isOk)
        dispatch({ type: ActionKind.POST_REQUEST_CREATE_QUESTION_SUCCESS, payload: { question: data, questionnaireId } })
      else
        dispatch({ type: ActionKind.POST_REQUEST_CREATE_QUESTION_ERROR, payload: data })

    })
    .catch((error) => {
      console.log("error", error);
      dispatch({ type: ActionKind.POST_REQUEST_CREATE_QUESTION_ERROR, payload: error })

    });
};
