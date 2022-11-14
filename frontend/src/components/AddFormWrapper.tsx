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
    ref.current?.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: "smooth",
    });
  };

  const hideForm = () => setIsShown(false);

  const toggleShown = () => {
    if (isShown) hideForm();
    else showForm();
  };

  return (
    <Wrapper ref={ref}>
      <ToggleShowButton onClick={toggleShown} isShown={isShown}>
        +
      </ToggleShowButton>

      <FormWrapper isShown={isShown}>
        <CloseButton onClick={hideForm} bg="red" disabled={!isShown}>
          x
        </CloseButton>
        {isShown && children}
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px 0;
  min-height: 250px;
`;

const ToggleShowButton = styled(Button)<{ isShown: boolean }>`
  position: fixed;
  bottom: 32px;
  right: 32px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  font-size: 34px;
  font-weight: 100;
  transition: all 200ms;
  transform: ${({ isShown }) => (isShown ? "rotate(45deg)" : "rotate(0)")};
  z-index: 5;
`;

const FormWrapper = styled.div<{ isShown: boolean }>`
  margin-bottom: 20px;
  position: relative;
  left: ${({ isShown }) => (isShown ? "0" : "-1700px")};
  right: ${({ isShown }) => (isShown ? "0" : "1700px")};
  margin-left: auto;
  margin-right: auto;
  border: solid 2px ${({ theme }) => theme.colors.main};
  border-radius: 6px;
  min-width: 280px;
  max-width: 500px;
  padding: 16px;
  transition: all 800ms;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
`;
