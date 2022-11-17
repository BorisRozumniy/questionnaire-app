import { Dispatch } from "react";
import { ActionKind, ACTIONTYPE } from "../../@types/questionnaire";

type Params = {
  requestBody: object;
  url: string,
  dispatch: Dispatch<ACTIONTYPE>,
}

export const postRequestQuestionnaire = ({
  requestBody,
  url,
  dispatch,
}: Params) => {
  console.log('requestBody', requestBody);


  const config = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(requestBody),
  };

  dispatch({ type: ActionKind.POST_REQUEST_CREATE_QUESTIONNAIRES_START })
  fetch(url, config)
    .then((res) => res.json())
    .then(({ data, message }) => {
      console.log(data, message);
      dispatch({ type: ActionKind.POST_REQUEST_CREATE_QUESTIONNAIRES_SUCCESS, payload: data })
    })
    .catch((error) => {
      console.log("error", error);
      dispatch({ type: ActionKind.POST_REQUEST_CREATE_QUESTIONNAIRES_ERROR, payload: error })
    });
};
