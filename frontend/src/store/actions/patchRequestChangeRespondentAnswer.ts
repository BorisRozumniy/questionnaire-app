import { Dispatch } from 'react';
import { TMongoId } from '../../@types/common';
import { ActionKind, ACTIONTYPE, UserAnswer } from '../../@types/respondent';
import { apiUrls } from '../../urls/apiUrls';

type Params = {
  requestBody: UserAnswer;
  respondentId: TMongoId;
  dispatch: Dispatch<ACTIONTYPE>,
}

export const patchRequestChangeRespondentAnswer = ({
  requestBody,
  respondentId,
  dispatch,
}: Params) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(requestBody),
  };

  const url = apiUrls.respondents + respondentId;
  let isOk = false;

  dispatch({ type: ActionKind.PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_START });
  fetch(url, config)
    .then((res) => {
      if (res.ok) isOk = true;
      return res.json();
    })
    .then(({ data, message }) => {
      console.log(data, message);
      if (isOk)
        dispatch({
          type: ActionKind.PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_SUCCESS,
          payload: { answer: requestBody, respondentId }
        });
      else
        dispatch({
          type: ActionKind.PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_ERROR,
          payload: { message, data: requestBody }
        });
    })
    .catch((error) => {
      console.log('error', error);
      dispatch({ type: ActionKind.PATCH_REQUEST_CHANGE_RESPONDENT_ANSWER_ERROR, payload: error });
    });
};
