import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  height: 500px;
  padding: 10px 30px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.5);
`;

export const ModalHeader = styled.header`
  & h3 {
    font-size: 24px;
    color: #414141;
    text-align: center;
    font-weight: 700;
  }
`;

export const ModalContents = styled.div`
  & .sub-title {
    color: #414141;
    display: block;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
  }

  & .period {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-bottom: 20px;
  }

  & .period input {
    border-radius: 10px;
    border: 1px solid #878787;
    width: 200px;
    padding: 10px;
  }

  & textarea {
    width: 100%;
    border-radius: 10px;
    height: 180px;
    border: 1px solid #878787;
    resize: none;
  }

  & .error-message {
    color: #ff2700;
  }
`;

export const ModalFooter = styled.footer`
  text-align: center;
  padding-bottom: 40px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  display: flex;
  justify-content: space-between;

  & button {
    border: none;
    background: #e3e3e3;
    border-radius: 10px;
    color: #000000;
    padding: 10px 25px;
    cursor: pointer;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }

  & button:hover {
    background: rgb(0, 7, 61);
    color: #ffffff;
    font-weight: bold;
  }
`;
