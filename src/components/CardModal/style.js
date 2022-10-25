import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 650px;
  height: 580px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.5);

  & .layout-top {
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 25px;
  }

  & .layout-todo-show {
    display: flex;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  & .layout-todo {
    display: flex;
  }

  & .layout-bottom {
    display: flex;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  & .layout-buttons {
    display: flex;
  }

  & .title {
    display: flex;
    align-items: center;
    height: 70px;
    font-size: 30px;
  }

  & .category-name {
    width: 100px;
    margin-left: 10px;
    font-size: 23px;
  }

  & .category-input {
    width: 330px;
    height: 25px;
  }

  & .category-text {
    width: 330px;
    height: 70px;
  }

  & .category-date {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 340px;
  }

  & .date-hyphen {
    margin-left: 4px;
    margin-right: 4px;
  }

  & .category-color {
    display: flex;
    margin-left; 9px;
    margin-right: 9px;
  }

  & .date-input {
    height: 23px;
  }

  & .todo {
    width: 330px;
    height: 90px;
    border: solid 1px;
    overflow: scroll;
  }

  & .todo-input {
    width: 270px;
    height: 20px;
  }

  & .todo-item {
    margin-left: 10px;
    font-size: 18px;
  }

  & .todo-submit {
    width: 55px;
    cursor: pointer;
  }

  & .error-message {
    display: flex;
    align-items: center;
    height: 35px;
    color: #7fc6d7;
  }

  & .button {
    display: block;
    width: 80px;
    height: 35px;
    margin-left: 30px;
    margin-right: 30px;
    background: #a3bded;
    border-radius: 3px;
    border: none;
    color: #ffffff;
    cursor: pointer;
    font-family: "GangwonEdu_OTFBoldA";
  }
`;

export const Content = styled.div`
  width: 35px;
  height: 20px;
  border: solid grey;
  background-color: ${(props) => props.color};
`;
