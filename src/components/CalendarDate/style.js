import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background: #ffffff;
  border-bottom: solid #a3bded;
  .font {
    font-family: "GangwonEdu_OTFBoldA";
    font-size: 35px;
  }
  .left-arrow {
    height: 40px;
    margin-right: 40px;
    cursor: pointer;
    color: #a3bded;
  }
  .right-arrow {
    height: 40px;
    margin-left: 40px;
    cursor: pointer;
    color: #a3bded;
  }
`;
