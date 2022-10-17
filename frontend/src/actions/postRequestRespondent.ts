import { Dispatch } from "react";
import { ActionKind, ACTIONTYPE, IRespondent } from "../@types/respondent";
import { apiUrls } from "../urls/apiUrls";

type Params = {
  requestBody: Omit<IRespondent, "_id">;
  dispatch: Dispatch<ACTIONTYPE>,
}

export const postRequestRespondent = ({
  requestBody,
  dispatch,
}: Params) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(requestBody),
  };

  const url = apiUrls.respondents
  let isOk = false

  dispatch({ type: ActionKind.POST_REQUEST_CREATE_RESPONDENT_START })
  fetch(url, config)
    .then((res) => {
      if (res.ok) isOk = true
      return res.json()
    })
    .then(({ data, message }) => {
      console.log(data, message);
      if (isOk)
        dispatch({ type: ActionKind.POST_REQUEST_CREATE_RESPONDENT_SUCCESS, payload: data })
      else
        dispatch({ type: ActionKind.POST_REQUEST_CREATE_RESPONDENT_ERROR, payload: { message, data: requestBody } })
    })
    .catch((error) => {
      console.log("error", error);
      dispatch({ type: ActionKind.POST_REQUEST_CREATE_RESPONDENT_ERROR, payload: error })
    });
};
