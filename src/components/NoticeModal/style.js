import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 400px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.5);

  & .title {
    font-size: 24px;
    color: #414141;
  }

  & .layout-period {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  & .layout-text {
    /* display: flex;
    margin-top: 20px; */
  }

  & .layout-button {
    /* display: flex; */
  }

  & .date-hyphen {
    margin-left: 5px;
    margin-right: 5px;
  }

  & .period {
    color: #414141;
    font-size: 20px;
    margin-right: 10px;
  }

  & .notice-title {
    color: #414141;
    font-size: 20px;
    margin-right: 10px;
  }

  & .notice {
    width: 305px;
    height: 140px;
    font-size: 18px;
    border-radius: 10px;
    padding: 10px;
  }

  & .error-message {
    display: flex;
    align-items: center;
    height: 40px;
    color: #ff6f61;
  }

  & .button {
    border: none;
    width: 70px;
    margin-left: 30px;
    margin-right: 30px;
    background: #e3e3e3;
    border-radius: 10px;
    color: #000000;
    padding: 10px 25px;
    cursor: pointer;
    transition: all 0.2s linear;
  }

  & .button:hover {
    background: #a3bded;
    color: #ffffff;
    font-weight: bold;
  }
`;
