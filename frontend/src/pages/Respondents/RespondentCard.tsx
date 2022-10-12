import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { frontendUrls } from "../../urls/frontendUrls";
import { IRespondent } from "../../@types/respondent";

type Props = {
  respondent: IRespondent;
};

export const RespondentCard: FC<Props> = ({ respondent }) => {
  let navigate = useNavigate();

  const onClick = () => {
    navigate(`${frontendUrls.respondents}:${respondent._id}`);
  };
  return (
    <>
      <h3 {...{ onClick }}>{respondent.name}</h3>
    </>
  );
};
