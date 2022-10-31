import styled from "styled-components";

export const Wrapper = styled.div`
  & .main-container {
    display: flex;
    justify-content: center;
  }

  & .sidebar {
    background: rgb(0, 7, 61);
    color: white;
    height: 100vh;
  }

  & .modal {
    display: flex;
    align-items: center;
    padding: 10px;
    color: white;
  }

  & .top_section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 10px;
    margin-bottom: 30px;
  }

  & .notice {
    padding: 20px;
  }

  & .pointer {
    cursor: pointer;
  }

  & .name {
    font-size: 25px;
    line-height: 0;
  }

  & .modal {
    display: flex;
    color: white;
    gap: 10px;
    padding: 5px 10ps;
    border-right: 4px solid transparent;
    transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }

  & .modal:hover {
    border-right: 4px solid white;
    transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    background: rgb(45, 51, 89);
  }

  & .link-text {
    white-space: nowrap;
    font-size: 18px;
    cursor: pointer;
  }
`;

export const inputAnimation = {
  hidden: {
    width: 0,
    padding: 0,
    opacity: 0,
  },
  show: {
    width: "100%",
    opacity: 1,
    transition: {
      duration: 0.01,
    },
  },
};

export const showAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    width: "auto",
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export const NoticeWrapper = styled.ul`
  width: 100%;
  height: 400px;
  padding: 10px;
  margin-top: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  overflow: scroll;
  box-shadow: 0 0 5px #333;
  box-sizing: border-box;
`;

export const Notice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 8px;
  background-color: ${(props) => props.colorCode};
  border: solid 3px ${(props) => props.colorCode};
  box-shadow: 0 0 5px #333;

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
