import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #efefef;
  font-family: sans-serif;
  text-align: center;

  .canvas-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const Content = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #FFFF00;
  width: 100;
  height: 100;

  & .layout {
    display: flex;
    align-items: center;
  }

  & .hash-tag {
    width: ${(props) => props.size}
    height: 20px;
    padding: 2px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 20px;
    background-color: ${(props) => props.color};
  }

  & .date-line {
    width: 5px;
    height: 25px;
    margin-right: 10px;
    background-color: ${(props) => props.color};
  }

  & .date-hyphen {
    margin-left: 5px;
    margin-right: 5px;
  }

  & .todo-box {
    max-height: 80px;
    margin-top: 10px;
    text-align: left;
  }

  & .img-box {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  & .todo-text {
    font-size: 18px;
  }

  & .text {
    font-size: 20px;
  }

  & .img {
    max-width: 100%;
  }

  & .text-box {
    max-height: 70px;
    margin-top: 10px;
    text-align: left;
    font-size: 18px;
  }
`;
