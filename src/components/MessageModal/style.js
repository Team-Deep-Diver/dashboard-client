import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 180px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.5);

  .message {
    margin-top: 50px;
    margin-bottom: 20px;
    width: 200px;
    font-size: 23px;
    text-align: center;
  }

  & .close-button {
    display: block;
    width: 80px;
    height: 35px;
    background: #a3bded;
    margin-top: 15px;
    border-radius: 3px;
    border: none;
    color: #ffffff;
    cursor: pointer;
    font-family: "GangwonEdu_OTFBoldA";
  }
`;
