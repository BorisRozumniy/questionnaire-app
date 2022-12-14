import { Dispatch } from 'react';
import { ActionKind, ACTIONTYPE } from '../../@types/respondent';
import { apiUrls } from '../../urls/apiUrls';

type Params = {
  dispatch: Dispatch<ACTIONTYPE>;
};

export const getRequestRespondents = ({ dispatch }: Params) => {
  dispatch({ type: ActionKind.GET_REQUEST_RESPONDENTS_START });
  fetch(apiUrls.respondents)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: ActionKind.GET_REQUEST_RESPONDENTS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log('error', error);
      dispatch({
        type: ActionKind.GET_REQUEST_RESPONDENTS_ERROR,
        payload: error,
      });
    });
};
