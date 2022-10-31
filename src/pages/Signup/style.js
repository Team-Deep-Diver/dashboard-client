import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  position: relative;

  & > header {
    font-size: 20px;
    padding: 20px;
    color: rgb(0, 7, 61);
  }

  & > header > svg {
    cursor: pointer;
  }

  & button {
    height: 40px;
    border-radius: 5px;
    transition: all 0.2s linear;
  }

  & button:hover {
    background: rgb(0, 7, 61);
    color: #ffffff;
  }

  & input {
    display: block;
    width: 300px;
    height: 40px;
    margin: 0 auto 20px;
    padding-left: 10px;
    border-radius: 10px;
    border: 1px solid rgb(0, 7, 61);
    box-sizing: border-box;
  }

  & .email-container,
  .group-container {
    display: flex;
    justify-content: space-between;
    width: 300px;
    margin: 0 auto;
  }

  & .email-container > input,
  .group-container > input {
    width: 200px;
    margin: 0 0 20px;
  }

  & .email-container > button,
  .group-container > button {
    width: calc(100% - 220px);
  }

  & .role-container {
    width: 300px;
    margin: 0 auto;
    text-align: left;
  }

  & .role-container .info-toggle {
    margin-bottom: 10px;
  }

  & .role-container .info-toggle span {
    display: inline-block;
    font-size: 20px;
    margin-right: 6px;
  }

  & .role {
    display: flex;
    line-height: 30px;
    height: 30px;
    font-size: 16px;
    margin-bottom: 20px;
  }

  & .role input {
    line-height: 30px;
    height: 30px;
  }
`;

export const SignupForm = styled.form`
  width: 500px;
  height: 550px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(0, 7, 61);
  text-align: center;

  & h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #414141;
  }

  & .confirm-message {
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    margin-bottom: 20px;
    color: #ff2700;
  }

  & .tooltip {
    position: relative;
    width: 100px;
  }

  & .tooltip > svg {
    width: 20px;
    height: 20px;
    vertical-align: -4px;
  }

  & .tooltip:before {
    content: attr(data-tooltip);
    position: absolute;
    width: 270px;
    background-color: #062b45;
    color: #fff;
    text-align: center;
    padding: 10px;
    line-height: 1.2;
    border-radius: 6px;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.6s;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    font-size: 0.75em;
    visibility: hidden;
    white-space: pre-wrap;
  }

  & .tooltip:after {
    content: "";
    position: absolute;
    bottom: 75%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    opacity: 0;
    transition: opacity 0.6s;
    border-color: #062b45 transparent transparent transparent;
    visibility: hidden;
  }

  .tooltip:hover:before,
  .tooltip:hover:after {
    opacity: 1;
    visibility: visible;
  }

  .submit-btn:disabled {
    border: none;
    background: #efefef;
    color: #000000;
  }

  .submit-btn {
    border: none;
    border-radius: 5px;
    background: #efefef;
    color: #000000;
    cursor: pointer;

  .submit-btn:hover {
    border: rgb(0, 7, 61);
    background: rgb(0, 7, 61);
    color: #ffffff;
    font-weight: bold;
  }
`;
