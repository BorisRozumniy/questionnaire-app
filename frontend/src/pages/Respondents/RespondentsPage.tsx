import { useEffect, useContext, useState } from "react";
import { ContextType } from "../../@types/context";
import { getRequestCheckRespondentsLength } from "../../actions/getRequestCheckRespondentsLength";
import { getRequestRespondents } from "../../actions/getRequestRespondents";
import { Context } from "../../context/context";
import { RespondentForm } from "../../components/RespondentForm";
import { RespondentCard } from "./RespondentCard";
import styled from "styled-components";

export const RespondentsPage = () => {
  const { respondentsDispatch: dispatch, respondentsState } = useContext(
    Context
  ) as ContextType;

  const { respondents } = respondentsState;

  const [respondentsLength, setRespondentsLength] = useState(
    respondents?.length
  );

  useEffect(() => {
    if (respondentsLength < 2)
      getRequestCheckRespondentsLength(setRespondentsLength);
    if (respondents?.length !== respondentsLength) {
      getRequestRespondents({ dispatch });
    }
  }, [respondents, respondentsLength]);

  return (
    <>
      <h1>RespondentList</h1>
      <List>
        {respondents?.length > 0 &&
          respondents.map((item) => (
            <RespondentCard key={item._id} respondent={item} />
          ))}
      </List>
      <RespondentForm />
    </>
  );
};

const List = styled.div`
  margin: 32px 0;
  display: grid;
  grid-gap: 8px;
`;
