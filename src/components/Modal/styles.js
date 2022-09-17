import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background: rgba(11, 15, 28, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 16px 40px;
`;

export const BannerStyle = styled.div`
  position: relative;
  width: 100%;
  min-height: 210px;
  border-radius: 6px;
  background-color: #162038;
  display: flex;
  flex-direction: column;
  ${({ success }) =>
    success
      ? "justify-content: center; padding: 16px;"
      : "padding: 146px 8px 64px; justify-content: space-between;"};

  @media only screen and (min-width: 600px) {
    padding: 30px 134px 30px 141px;
  }

  @media only screen and (min-width: 992px) {
    flex-direction: row;
    padding: 35px 47px 40px 225px;
  }
`;

export const ContentBlock = styled.div`
  width: 100%;
  z-index: 1;

  @media only screen and (min-width: 992px) {
    ${({ success }) => !success && "width: 48%;"};
  }
`;

export const FormBlock = styled.form`
  margin-top: 32px;
  max-width: 354px;
  width: 100%;
  height: 112px;
  height: ${({ error }) => (error ? "calc(112px + 39px)" : "112px")};
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;

  input,
  button {
    margin: 0 2px;
    height: 52px;
  }
  input {
    padding: 0 12px;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
  }
  button {
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
  }

  @media only screen and (min-width: 600px) {
    margin-top: 8px;
    max-width: 408px;
    height: 96px;
    height: ${({ error }) => (error ? "calc(96px + 39px)" : "96px")};
    padding: 0px 38px;
    button,
    input {
      margin: 0;
      height: 44px;
    }
  }

  @media only screen and (min-width: 992px) {
    margin-top: 3px;
    width: 354px;
    height: 112px;
    height: ${({ error }) => (error ? "calc(112px + 39px)" : "112px")};
    padding: 0;
    input,
    button {
      height: 52px;
    }
  }
`;

export const Heading = styled.h2`
  ${({ banner }) => banner && `br {display: none;}`};
  margin-bottom: 12px;
  font-style: normal;
  font-weight: 900;
  font-size: 32px;
  line-height: 38px;
  color: #ffffff;

  @media only screen and (min-width: 600px) {
    margin-bottom: 8px;
    padding-right: 0;
    text-align: center;
  }
  @media only screen and (min-width: 992px) {
    margin-bottom: 12px;
    padding-right: 65px;
    text-align: start;
  }
`;

export const ModalWindow = styled(BannerStyle)`
  height: 100%;
  width: 851px;
  padding-bottom: 8px;
  @media only screen and (min-width: 620px) {
    height: 475px;
    padding: 100px;
  }
  @media only screen and (min-width: 992px) {
    padding: ${({ success }) => (success ? "16px" : "80px 28px 40px 427px")};
    flex-direction: column;
    justify-content: ${({ success }) => (success ? "center" : "flex-start")};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
`;

export const ModalContentBlock = styled(ContentBlock)`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (min-width: 992px) {
    width: 100%;
  }
`;

export const ModalFormBlock = styled(FormBlock)`
  margin: 8px auto 0;
  @media only screen and (min-width: 600px) {
    margin-top: 20px;
  }
  @media only screen and (min-width: 992px) {
    margin-top: 13px;
    width: 100%;
    height: 97px;

    input,
    button {
      height: 44px;
    }
  }
`;

export const ModalLogoImg = styled.img`
  width: 193px;
  margin-bottom: 17px;
`;

export const ModalHeading = styled(Heading)`
  ${({ success }) => success && "text-align: center;"};
  @media only screen and (min-width: 992px) {
    margin-bottom: 14px;
    width: 100%;
    padding-right: 0;
    font-size: 39px;
    line-height: 48px;
    text-align: center;
  }
`;

export const ModalText = styled(Text)`
  @media only screen and (min-width: 992px) {
    text-align: center;
  }
`;

export const CircleStyle = styled.img`
  position: absolute;
  top: 0;
  left: 10px;
`;

export const LeftShapeStyle = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

export const RigthBottomShapeStyle = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 215px;
`;

export const BookStyle = styled.img`
  position: absolute;
  top: 6px;
  width: 227px;
  @media only screen and (min-width: 992px) {
    top: 62px;
    left: 28px;
    width: 583px;
    height: 412px;
    object-fit: cover;
  }
`;

export const MobScrollContent = styled.div`
  z-index: 1;
  border-radius: 6px;
  @media only screen and (max-width: 600px) {
    overflow-y: auto;
  }
`;

export const ST = styled.span`
  color: #1e6df7;
  font-weight: 600;
`;
