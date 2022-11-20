import { Dispatch } from "react";
import { TMongoId } from "../../@types/common";
import { ActionKind, ACTIONTYPE } from "../../@types/respondent";
import { apiUrls } from "../../urls/apiUrls";

type Params = {
  dispatch: Dispatch<ACTIONTYPE>,
  respondentId: TMongoId
}

export const getRequestRespondent = ({ dispatch, respondentId }: Params) => {
  dispatch({ type: ActionKind.GET_REQUEST_RESPONDENT_START })
  fetch(apiUrls.respondentById + respondentId)
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: ActionKind.GET_REQUEST_RESPONDENT_SUCCESS, payload: data });
    })
    .catch((error) => {
      console.log("error", error);
      dispatch({ type: ActionKind.GET_REQUEST_RESPONDENT_ERROR, payload: error })
    });
}
