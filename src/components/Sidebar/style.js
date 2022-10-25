import styled from "styled-components";

export const option = {
  hover: { scale: 1.1, originX: 0, color: "#414141" },
  spring: { type: "spring", stiffness: 300 },
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 400px;
  padding: 15px;
  background: rgb(242, 244, 242);
  box-sizing: border-box;
  box-shadow: 5px 0 5px -5px #333;
  z-index: 1;
  .font {
    display: flex;
    cursor: pointer;
    font-family: "Pretendard-Slim";
    font-size: 25px;
    color: #58595b;
    margin-bottom: 10px;
  }
  .arrow-left {
    align-self: end;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-right: 5px;
    height: 50px;
    cursor: pointer;
    color: #414141;
  }
  .icon {
    margin-right: 5px;
  }
`;

export const NoticeWrapper = styled.ul`
  height: 500px;
  background: #ffffff;
  border-radius: 10px;
  margin-top: 30px;
  padding: 10px;
  overflow: scroll;
  box-shadow: 0 0 5px #333;
`;

export const Notice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 8px;
  border: solid 3px ${(props) => props.colorCode};
  box-shadow: 0 0 3px #333;

  & .group-name {
    font-size: 17px;
    display: block;
    font-family: "Pretendard-Slim";
  }

  & .font {
    margin-top: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    font-family: "Pretendard-Slim";
    font-size: 15px;
  }
`;
