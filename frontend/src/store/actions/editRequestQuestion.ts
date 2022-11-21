import { Dispatch } from 'react';
import { TMongoId } from '../../@types/common';
import { IQuestion } from '../../@types/question';
import { ActionKind, ACTIONTYPE } from '../../@types/questionnaire';
import { apiUrls } from '../../urls/apiUrls';

type Params = {
  requestBody: IQuestion;
  questionnaireId: TMongoId;
  dispatch: Dispatch<ACTIONTYPE>,

}

export const patchRequestEditQuestion = ({ requestBody, questionnaireId, dispatch }: Params) => {

  const config = {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(requestBody),
  };

  const url = apiUrls.questions + requestBody._id;
  let isOk = false;

  dispatch({ type: ActionKind.PATCH_REQUEST_EDIT_QUESTION_START });

  fetch(url, config)
    .then((res) => {
      if (res.ok) isOk = true;
      return res.json();
    })
    .then(({ message }) => {
      console.log(message);
      const payload = { questionnaireId, editedQuestion: requestBody, message };
      if (isOk)
        dispatch({ type: ActionKind.PATCH_REQUEST_EDIT_QUESTION_SUCCESS, payload });
      else
        dispatch({ type: ActionKind.PATCH_REQUEST_EDIT_QUESTION_ERROR, payload: message });

    })
    .catch((error) => {
      console.log('error', error);
      dispatch({ type: ActionKind.PATCH_REQUEST_EDIT_QUESTION_ERROR, payload: error });

    });
};
