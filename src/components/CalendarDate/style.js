import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background: #ffffff;
  box-shadow: 0 5px 5px -5px #333;
  margin: 1px;
  z-index: 1;

  .font {
    font-family: "Pretendard-Regular";
    font-size: 35px;
    color: #414141;
  }

  .disabled-arrow {
    margin-left: 20px;
    margin-right: 20px;
    color: #EBECF0;
  }

  .arrow {
    margin-left: 20px;
    margin-right: 20px;
    cursor: pointer;
    color: #777777;
  }
`;
