import styled from 'styled-components';

export const Field = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 620px) {
    flex-direction: row;
    align-items: center;
  }
`;
