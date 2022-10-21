import styled from "styled-components";

export const Wrapper = styled.div`
  width: 600px;
  margin: 100px auto;
  border: 3px solid #a3bded;
  border-radius: 20px;
  text-align: center;
  color: #a3bded;

  & button {
    height: 40px;
    border-radius: 10px;
    transition: all 0.2s linear;
  }

  & button:hover {
    background: #a3bded;
    color: #ffffff;
  }

  & input {
    display: block;
    width: 300px;
    height: 40px;
    margin: 0 auto 20px;
    padding-left: 10px;
    border-radius: 10px;
    border: 3px solid #a3bded;
    box-sizing: border-box;
  }

  & .email-container,
  .group-container {
    display: flex;
    justify-content: space-between;
    width: 300px;
    margin: 0 auto;
  }

  & .email-container > input {
    width: 200px;
    margin: 0 0 20px;
  }

  & .email-container > button {
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

  & .submit {
    width: 80px;
    margin-bottom: 0.67em;
    cursor: pointer;
  }
`;
