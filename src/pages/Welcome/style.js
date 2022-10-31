import styled from "styled-components";

export const Wrapper = styled.header`
  background: rgba(255, 255, 255);
`;

export const Header = styled.div`
  height: 60px;
  background: #ffffff;
  display: flex;
  flex-direction: row-reverse;

  & button {
    border: none;
    border-radius: 10px;
    background: rgb(0, 7, 61);
    margin: 10px 20px;
    padding: 0 20px;
    height: 40px;
    cursor: pointer;
    color: #ffffff;
    transition: all 1s;
  }
`;

export const Content = styled.div`
  height: calc(100vh - 50px);
  position: relative;
`;

export const FontBackGround = styled.div`
  margin: 5rem 0;

  & strong {
    display: block;
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
    background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 8vw;
  }
`;

export const UserTypeWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 750px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const User = styled.div`
  width: 300px;
  height: 200px;
  line-height: 200px;
  border-radius: 20px;
  text-align: center;
  color: #ffffff;
  font-size: 40px;
  cursor: pointer;
  background: rgba(0, 7, 61);
  box-shadow: rgba(50, 50, 93, 1) 0px 50px 100px -20px,
    rgba(255, 0, 0, 1) 0px 30px 60px -30px,
    rgba(10, 37, , 0.35) 0px -2px 6px 0px;
  /* background: linear-gradient(135deg, rgba(0, 7, 61), rgba(78, 28, 183)); */
`;
