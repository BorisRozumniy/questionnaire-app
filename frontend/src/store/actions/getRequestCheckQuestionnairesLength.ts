import { Dispatch } from 'react';
import { apiUrls } from '../../urls/apiUrls';

type Params = Dispatch<React.SetStateAction<number>>

export const getRequestCheckQuestionnairesLength = (setLength: Params) => {
  fetch(apiUrls.questionnairesLength)
    .then((res) => res.json())
    .then((data: number) => {
      setLength(data);
    })
    .catch((error) => {
      console.log('error', error);
    });
};
