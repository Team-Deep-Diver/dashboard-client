import styled from "styled-components";

export const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "250px", opacity: 1, transition: { delay: 0.7 } },
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .message {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
    width: 300px;
    height: 50px;
    font-size: 23px;
    text-align: center;
    white-space: pre-wrap;
  }

  & .close-button {
    display: block;
    width: 80px;
    height: 35px;
    background: rgb(0, 7, 61);
    border-radius: 3px;
    border: none;
    color: #ffffff;
    cursor: pointer;
  }
`;
