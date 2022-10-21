import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ModalWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 500px;
  padding: 10px 30px;
  border: 5px solid #a3bded;
  border-radius: 10px;
  background: #ffffff;
`;

export const ModalHeader = styled.header`
  & h3 {
    font-size: 24px;
    color: #a3bded;
    text-align: center;
    font-weight: 700;
  }
`;

export const ModalContents = styled.div`
  & .members {
    margin-bottom: 20px;
  }

  & strong {
    display: block;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
  }

  & .contents-wrap {
    height: 100px;
    border: 3px solid #a3bded;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    overflow: scroll;
  }

  & .contents-wrap li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  & .contents-wrap li button:first-child {
    margin-right: 5px;
  }

  & .contents-wrap li button {
    border: none;
    background: #e3e3e3;
    border-radius: 10px;
    color: #000000;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.2s linear;
  }

  & .contents-wrap li button:hover {
    background: #a3bded;
    color: #ffffff;
  }
`;

export const ModalFooter = styled.footer`
  text-align: center;
  padding-bottom: 40px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  & button {
    border: none;
    background: #e3e3e3;
    border-radius: 10px;
    color: #000000;
    font-weight: bold;
    padding: 10px 25px;
    cursor: pointer;
    transition: all 0.2s linear;
  }

  & button:hover {
    background: #a3bded;
    color: #ffffff;
  }
`;
