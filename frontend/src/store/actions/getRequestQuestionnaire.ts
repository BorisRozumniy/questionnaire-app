import { Dispatch } from "react";
import { TMongoId } from "../../@types/common";
import { IQuestionnaire, QuestionnairesActionKind as ActionKind, QUESTIONNAIRES_ACTIONTYPE } from "../../@types/questionnaire";
import { apiUrls } from "../../urls/apiUrls";

type Params = {
  dispatch: Dispatch<QUESTIONNAIRES_ACTIONTYPE>,
  questionnaireId: TMongoId,
}

export const getRequestQuestionnaire = ({ dispatch, questionnaireId }: Params) => {

  const url = `${apiUrls.questionnaireById}${questionnaireId}`
  let isOk = false

  dispatch({ type: ActionKind.GET_REQUEST_QUESTIONNAIRE_START })
  fetch(url)
    .then((res) => {
      if (res.ok) isOk = true
      return res.json()
    })
    .then((data: IQuestionnaire) => {
      if (isOk)
        dispatch({ type: ActionKind.GET_REQUEST_QUESTIONNAIRE_SUCCESS, payload: data });
      else
        dispatch({ type: ActionKind.GET_REQUEST_QUESTIONNAIRE_ERROR, payload: data })
    })
    .catch((error) => {
      console.log("error", error);
      dispatch({ type: ActionKind.GET_REQUEST_QUESTIONNAIRE_ERROR, payload: error })
    })
}
