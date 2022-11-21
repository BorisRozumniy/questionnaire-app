import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { frontendUrls } from '../../urls/frontendUrls';
import { IRespondent } from '../../@types/respondent';
import { Card } from '../../components/Styled/Card';

type Props = {
  respondent: IRespondent;
};

export const RespondentCard: FC<Props> = ({ respondent }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`${frontendUrls.respondents}:${respondent._id}`);
  };
  return <Card {...{ onClick }}>{respondent.name}</Card>;
};
