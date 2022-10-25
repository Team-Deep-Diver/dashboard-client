import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  height: 400px;
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background: #ffffff;
`;

export const ModalHeader = styled.header`
  & h3 {
    font-size: 24px;
    color: #414141;
    text-align: center;
    font-weight: 700;
  }
`;

export const ModalContents = styled.div`
  & .sub-title {
    color: #414141;
  }

  & .layout {
    display: flex;
    align-items: center;
    margin-top: 20px;
    display: flex;
    width: 430px;
  }

  .title {
    margin-top: 10px;
    padding-top: 20px;
    font-size: 2em;
    color: #414141;
  }

  .search-result {
    width: 411px;
    height: 130px;
    margin-left: 8px;
    border-radius: 10px;
    border: 1px solid #878787;
    overflow: scroll;
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
    border: 1px solid #878787;
  }

  & .search-button {
    display: block;
    width: 80px;
    background: #a3bded;
    border: #af69ee;
    padding: 10px;
    border-radius: 10px;
    color: #ffffff;
    cursor: pointer;
  }

  & .search-button:hover {
    background: #a3bded;
    color: #ffffff;
    font-weight: bold;
  }

  & .search-button:disabled {
    background: #e3e3e3;
    border: 3px solid #e3e3e3;
    color: #000000;
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
