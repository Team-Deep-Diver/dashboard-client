import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  width: 300px;
  background: #a3bded;
  text: center;
  box-sizing: border-box;
  .arrow-left {
    float: right;
    margin-top: 10px;
    margin-right: 15px;
    height: 50px;
    cursor: pointer;
    color: #ffffff;
  }
  .content1 {
    margin-top: 100px;
    border-top: solid white;
    border-bottom: solid white;
    padding: 10px;
    font-family: "GangwonEdu_OTFBoldA";
    font-size: 25px;
    cursor: pointer;
    color: #ffffff;
  }
  .content2 {
    border-bottom: solid white;
    padding: 10px;
    font-family: "GangwonEdu_OTFBoldA";
    font-size: 25px;
    cursor: pointer;
    color: #ffffff;
  }
`;

export const NoticeWrapper = styled.ul`
  margin-top: 40px;
  padding: 10px;

  & > li {
    border-radius: 10px;
    padding: 5px;
  }

  & > li strong {
    font-size: 20px;
    display: block;
    margin-bottom: 4px;
  }

  & > li p {
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
`;
