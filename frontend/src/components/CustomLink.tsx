import { Link, PathMatch, useMatch, useResolvedPath } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import styled from "styled-components";

export function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <>
      <StyledLink
        style={{ textDecoration: match ? "underline" : "none" }}
        to={to}
        match={match}
        {...props}
      >
        {children}
      </StyledLink>
    </>
  );
}

type StyledProps = { match?: PathMatch<string> | null };

const StyledLink = styled(Link)<StyledProps>`
  color: ${({ match, theme }) =>
    match ? theme.colors.blue : theme.colors.secondary};
  transition: all 0.2s;
  text-decoration: none;
  :hover,
  :focus {
    color: ${({ theme }) => theme.colors.oposide};
  }
`;
