import styled from 'styled-components';

export const Input = styled.input`
  font-family: -apple-system, system-ui, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 14px;
  font-weight: 600;
  color: #333;
  padding: 6px 12px;
  border-radius: 3px;
  background-color: rgb(255, 255, 255);
  border: ${({ theme }) => `solid 1px ${theme.colors.strong}`};
  transition: all 0.3s;

  &:focus {
    box-shadow: ${({ theme }) => `${theme.colors.outline} 0 0 0 3px`};
    outline: none;
  }
`;
