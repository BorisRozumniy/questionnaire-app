import { Dispatch } from "react";
import { ActionKind, ACTIONTYPE } from "../@types/respondent";

type Params = {
  requestBody: object;
  url: string,
  dispatch: Dispatch<ACTIONTYPE>,
}

export const postRequest = ({
  requestBody,
  url,
  dispatch,
}: Params) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(requestBody),
  };

  fetch(url, config)
    .then((res) => res.json())
    .then(({ data, message }) => {
      console.log(data, message);
      dispatch({ type: ActionKind.POST_REQUEST_CREATE_RESPONDENT_SUCCESS, payload: data })
    })
    .catch((error) => {
      console.log("error", error);
    });
};
