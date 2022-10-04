import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.strong};
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.colors.light} 0 0 8px 0;
  box-sizing: border-box;
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

&:hover,
&:focus {
  box-shadow: ${({ theme }) => theme.colors.outline} 0 0 0 3px;
}`;
