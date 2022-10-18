import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  background: #FFFFFF;
  background-size: 40px 40px;
  background-image: linear-gradient(to right, lightgrey 1px, transparent 1px),
    linear-gradient(to bottom, lightgrey 1px, transparent 1px);
  .plus-icon {
    position: absolute;
    right: 0px;
    bottom: 0px;
    margin: 30px;
    height: 55px;
    color: #A3BDED;
  }
`;
