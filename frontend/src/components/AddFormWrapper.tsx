import { FC, ReactNode, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "./Styled/Button";

type Props = {
  children: ReactNode;
};

export const AddFormWrapper: FC<Props> = ({ children }) => {
  const ref = useRef<null | HTMLDivElement>(null);

  const [isShown, setIsShown] = useState(false);

  const showForm = () => {
    setIsShown(true);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const hideForm = () => setIsShown(false);

  return (
    <>
      <ShowButton onClick={showForm} isShown={isShown}>
        +
      </ShowButton>

      <Wrapper ref={ref} isShown={isShown}>
        <CloseButton onClick={hideForm} bg="red" disabled={!isShown}>
          x
        </CloseButton>
        {isShown && children}
      </Wrapper>
    </>
  );
};

const ShowButton = styled(Button)<{ isShown: boolean }>`
  position: fixed;
  bottom: 32px;
  right: ${({ isShown }) => (isShown ? "-32px" : "32px")};
  transition: all 200ms;
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const Wrapper = styled.div<{ isShown: boolean }>`
  margin: 0 auto;
  border: solid 2px ${({ theme }) => theme.colors.main};
  border-radius: 6px;
  min-width: 280px;
  max-width: 500px;
  padding: 16px;
  position: relative;
  bottom: ${({ isShown }) => (isShown ? "0" : "-500px")};
  transition: all 200ms;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
`;
