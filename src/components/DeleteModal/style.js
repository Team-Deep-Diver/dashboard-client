import styled from "styled-components";

export const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", x: "0", opacity: 1, transition: { delay: 0.7 } },
};

export const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 180px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.8);

  & .message {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 120px;
    font-size: 22px;
    text-align: center;
  }

  & .layout {
    display: flex;
  }

  & button {
    border: none;
    background: #e3e3e3;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    color: #000000;
    padding: 10px 25px;
    cursor: pointer;
    transition: all 0.2s linear;
  }

  & button:hover {
    background: #a3bded;
    color: #ffffff;
    font-weight: bold;
  }
`;
