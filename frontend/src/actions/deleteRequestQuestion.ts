import { Dispatch } from "react";
import { TMongoId } from "../@types/common";
import { ActionKind, ACTIONTYPE } from "../@types/question";
import { apiUrls } from "../urls/apiUrls";

type Params = {
  id: TMongoId;
  dispatch: Dispatch<ACTIONTYPE>,
}

export const deleteRequestQuestion = ({ id, dispatch }: Params) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  };

  const url = apiUrls.questions + id;

  dispatch({ type: ActionKind.DELETE_REQUEST_QUESTION_START })

  fetch(url, config)
    .then((res) => res.json())
    .then(({ data, message }) => {
      console.log(data, message);
      dispatch({ type: ActionKind.DELETE_REQUEST_QUESTION_SUCCESS, payload: data })
      // const filtered = questions.filter(({ _id }: IQuestion) => _id !== id);
      // setQuestions([...filtered]);
    })
    .catch((error) => {
      console.log("error", error);
      dispatch({ type: ActionKind.DELETE_REQUEST_QUESTION_ERROR, payload: error })
    });
};
