import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background: #ffffff;
  border-radius: 10px;
  padding: 10px 30px 30px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.5);

  & .title {
    font-size: 24px;
    color: #414141;
    text-align: center;
    font-weight: 700;
  }

  & .layout {
    margin-bottom: 10px;
  }

  & .layout .category-name {
    color: #414141;
    display: block;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  & .layout .category-name em {
    font-style: normal;
    color: red;
    vertical-align: -3px;
  }

  & .layout input {
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    border: 1px solid #878787;
    padding: 4px;
  }

  & .layout .category-date {
    display: flex;
    justify-content: space-between;
  }

  & .layout .category-date > input {
    width: 200px;
    display: block;
    padding: 0 10px;
    box-sizing: border-box;
  }

  & .category-colors {
    display: flex;
    justify-content: space-between;
  }

  & .category-color input {
    height: 20px;
    margin-bottom: 5px;
  }

  & .todo {
    height: 50px;
    border: 1px solid #878787;
    border-radius: 10px;
    margin-bottom: 5px;
    padding: 5px;
    overflow: scroll;
  }

  & .layout-todo {
    display: flex;
    justify-content: space-between;
  }

  & .layout-todo-show {
    display: flex;
  }

  & .layout-todo .todo-input,
  & .layout-todo .todo-submit {
    height: 30px;
    line-height: 22px;
  }

  & .layout-todo input:first-child {
    width: 300px;
  }

  & .layout-todo .todo-submit {
    width: 100px;
  }

  & textarea {
    width: 100%;
    border-radius: 10px;
    height: 50px;
    border: 1px solid #878787;
    resize: none;
    padding: 4px;
  }

  & .layout-buttons {
    width: 300px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  & .layout-buttons .button {
    border: none;
    background: #e3e3e3;
    border-radius: 10px;
    color: #000000;
    padding: 10px 25px;
    cursor: pointer;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }

  & .layout-buttons .button:hover {
    background: rgb(0, 7, 61);
    color: #ffffff;
    font-weight: bold;
  }
`;

export const Content = styled.div`
  width: 35px;
  height: 20px;
  border: solid grey;
  background-color: ${(props) => props.color};
`;
