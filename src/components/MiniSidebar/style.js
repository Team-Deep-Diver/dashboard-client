import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  height: 100vh;
  width: 50px;
  background: #a3bded;
  text-align: center;
  .bars {
    margin-top: 10px;
    height: 40px;
    color: #ffffff;
    cursor: pointer;
  }
  .logout {
    margin-bottom: 10px;
    height: 30px;
    color: #ffffff;
    cursor: pointer;
  }
`;
