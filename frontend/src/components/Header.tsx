import styled from "styled-components";
import { frontendUrls } from "../urls/frontendUrls";
import { CustomLink } from "./CustomLink";
import { Container } from "./Styled/Container";

export const Header = () => {
  return (
    <Wrapper as="header">
      <Nav>
        <Ul>
          <Li>
            <CustomLink to={frontendUrls.home}>home</CustomLink>
          </Li>
          <Li>
            <CustomLink to={frontendUrls.respondents}>respondents</CustomLink>
          </Li>
          <Li>
            <CustomLink to={frontendUrls.results}>results</CustomLink>
          </Li>
        </Ul>
      </Nav>
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: ${(props) => `${props.theme.headerHeight}px`};
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.main};
`;

const Nav = styled.nav`
  flex-grow: 1;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style: none;
  font-size: 18px;
  font-weight: 700;
  text-transform: capitalize;
  min-width: 50%;
`;

const Li = styled.li`
  padding: 0 8px;
`;
