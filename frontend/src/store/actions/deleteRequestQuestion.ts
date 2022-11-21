import { Dispatch } from 'react';
import { TMongoId } from '../../@types/common';
import { ActionKind, ACTIONTYPE } from '../../@types/questionnaire';
import { apiUrls } from '../../urls/apiUrls';

type Params = {
  removedQuestionId: TMongoId;
  questionnaireId: TMongoId;
  dispatch: Dispatch<ACTIONTYPE>,
}

export const deleteRequestQuestion = ({ removedQuestionId, questionnaireId, dispatch }: Params) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE',
  };

  const url = apiUrls.questions + removedQuestionId;

  dispatch({ type: ActionKind.DELETE_REQUEST_QUESTION_START });

  fetch(url, config)
    .then((res) => res.json())
    .then(({ data, message }) => {
      console.log(data, message);
      dispatch({
        type: ActionKind.DELETE_REQUEST_QUESTION_SUCCESS,
        payload: { removedQuestionId, questionnaireId },
      });
    })
    .catch((error) => {
      console.log('error', error);
      dispatch({ type: ActionKind.DELETE_REQUEST_QUESTION_ERROR, payload: error });
    });
};
