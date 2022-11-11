import styled from 'styled-components';

export const Container = styled.div<{ mt?: number }>`
    margin: auto;
    ${({ mt }) => mt && `margin-top: ${mt}px`};
    max-width: 1300px;
    padding: 0 16px;
    position: relative;
    overflow: hidden;
`;
