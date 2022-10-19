import styled from "styled-components";

export const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  height: 400px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.5);

  & .layout {
    margin-top: 30px;
    display: flex;
    width: 430px;
  }

  .title {
    padding-top: 20px;
    font-size: 2em;
    color: #a3bded;
  }

  .search-result {
    width: 410px;
    height: 130px;
    border-radius: 10px;
    border: 3px solid #a3bded;
  }

  .list-item {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .item-value {
    padding-left: 10px;
    width: 310px;
    font-size: 20px;
  }

  .item-button {
    margin-top: 20px;
    padding-left: 5px;
    width: 60px;
    height: 30px;
    background: #f3f3f3;
    border-radius: 4px;
    color: #000000;
    cursor: pointer;
    font-family: "GangwonEdu_OTFBoldA";
    text-align: center;
  }

  & .message {
    margin-top: 20px;
    text-align: center;
  }

  & input {
    display: block;
    width: 300px;
    height: 40px;
    margin: 0 auto 20px;
    padding-left: 10px;
    border-radius: 10px;
    border: 3px solid #a3bded;
  }

  & .search-button {
    display: block;
    width: 80px;
    background: #a3bded;
    margin-top: 5px;
    padding: 10px;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
    font-family: "GangwonEdu_OTFBoldA";
  }

  & .search-button:disabled {
    background: #f3f3f3;
    border: 3px solid #f3f3f3;
    color: #000000;
  }

  & .close-button {
    display: block;
    width: 80px;
    background: #a3bded;
    margin-top: 15px;
    padding: 10px;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
    font-family: "GangwonEdu_OTFBoldA";
  }
`;
