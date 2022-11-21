import { Dispatch } from 'react';
import { apiUrls } from '../../urls/apiUrls';

type Params = Dispatch<React.SetStateAction<number>>

export const getRequestCheckRespondentsLength = (setRespondentsLength: Params) => {
  fetch(apiUrls.respondentsLength)
    .then((res) => res.json())
    .then((data: number) => {
      setRespondentsLength(data);
    })
    .catch((error) => {
      console.log('error', error);
    });
};
