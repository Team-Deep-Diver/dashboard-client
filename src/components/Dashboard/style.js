import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 60px);
  padding: 10px;
  background: #ffffff;
  background-size: 40px 40px;
  background-image: linear-gradient(to right, lightgrey 1px, transparent 1px),
    linear-gradient(to bottom, lightgrey 1px, transparent 1px);

  & .plus-icon {
    position: absolute;
    right: 0px;
    bottom: 0px;
    margin: 30px;
    height: 55px;
    color: #a3bded;
    border-radius: 50%;
    box-shadow: 2px 2px 2px 2px grey;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  width: 300px;
  max-height: 400px;
  padding: 20px;
  margin: 20px;
  border: solid 5px ${(props) => props.color};
  border-radius: 10px;
  background-color: #FFFFFF;

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
    margin-top: 15px;
    overFlow: scroll;
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
    max-width: 150px;
  }

  & .text-box {
    max-height: 70px;
    margin-top: 15px;
    font-size: 18px;
    overFlow: scroll;
  }
`;
