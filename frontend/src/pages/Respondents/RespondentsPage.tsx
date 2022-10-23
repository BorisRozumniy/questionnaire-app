import { useEffect, useContext } from "react";
import { ContextType } from "../../@types/context";
import { getRequestRespondents } from "../../actions/getRequestRespondents";
import { Context } from "../../context/context";
import { RespondentForm } from "../../components/RespondentForm";
import { RespondentCard } from "./RespondentCard";
import styled from "styled-components";

export const RespondentsPage = () => {
  const { respondentsDispatch, respondentsState } = useContext(
    Context
  ) as ContextType;

  const { respondents } = respondentsState;

  useEffect(() => {
    if (respondents?.length === 0) {
      getRequestRespondents({
        dispatch: respondentsDispatch,
      });
    }
  }, [respondents]);

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
