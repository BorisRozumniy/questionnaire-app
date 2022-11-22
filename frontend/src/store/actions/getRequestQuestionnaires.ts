import { Dispatch } from 'react';
import { TMongoId } from '../../@types/common';
import { ActionKind, ACTIONTYPE } from '../../@types/questionnaire';
import { apiUrls } from '../../urls/apiUrls';

type Params = {
  dispatch: Dispatch<ACTIONTYPE>;
  id?: TMongoId;
};

export const getRequestQuestionnaires = ({ dispatch, id = '' }: Params) => {
  const url = `${apiUrls.questionnaires}${id}`;
  let isOk = false;

  dispatch({ type: ActionKind.GET_REQUEST_QUESTIONNAIRES_START });
  fetch(url)
    .then((res) => {
      if (res.ok) isOk = true;
      return res.json();
    })
    .then((data) => {
      if (isOk)
        dispatch({
          type: ActionKind.GET_REQUEST_QUESTIONNAIRES_SUCCESS,
          payload: data,
        });
      else
        dispatch({
          type: ActionKind.GET_REQUEST_QUESTIONNAIRES_ERROR,
          payload: data,
        });
    })
    .catch((error) => {
      console.log('error', error);
      dispatch({
        type: ActionKind.GET_REQUEST_QUESTIONNAIRES_ERROR,
        payload: error,
      });
    });
};
