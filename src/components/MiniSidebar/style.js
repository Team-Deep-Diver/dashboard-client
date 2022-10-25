import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  height: 100vh;
  width: 70px;
  background: rgb(242, 244, 242);
  text-align: center;
  box-sizing: border-box;
  box-shadow: 5px 0 5px -5px #333;
  z-index: 2;

  .bars {
    margin-left: 2px;
    margin-top: 10px;
    color: #777777;
    cursor: pointer;
  }

  .logout {
    margin-left: 2px;
    margin-bottom: 10px;
    cursor: pointer;
    color: #777777;
  }
`;
