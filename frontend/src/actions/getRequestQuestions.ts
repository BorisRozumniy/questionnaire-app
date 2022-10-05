import { Dispatch } from "react";
import { TMongoId } from "../@types/common";
import { ActionKind, ACTIONTYPE } from "../@types/question";
import { frontendUrls } from "../urls/frontendUrls";

type Params = {
  dispatch: Dispatch<ACTIONTYPE>,
  questionsIds: TMongoId[];
  questionnaireId: TMongoId;
}

export const getRequestQuestions = ({ dispatch, questionsIds, questionnaireId }: Params) => {
  const url = `${frontendUrls.questions}${questionsIds}`;

  dispatch({ type: ActionKind.GET_REQUEST_QUESTIONS_START })
  fetch(url)
    .then((res) => res.json())
    .then((questions) => {
      dispatch({
        type: ActionKind.GET_REQUEST_QUESTIONS_SUCCESS,
        payload: questions,
        questionnaireId
      });
    })
    .catch((error) => {
      console.log("error", error);
      dispatch({ type: ActionKind.GET_REQUEST_QUESTIONS_ERROR, payload: error })
    })
}
