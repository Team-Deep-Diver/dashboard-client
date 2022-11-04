import {
  FaHome,
  FaUsers,
  FaBullhorn,
  FaSignOutAlt,
  FaCheckSquare,
  FaRegUserCircle,
} from "react-icons/fa";

export const options = {
  GUEST: [
    {
      name: "Home",
      icon: <FaHome size="30px" style={{ cursor: "pointer" }} />,
      type: "returnHomePage"
    },
    {
      name: "회원가입",
      icon: <FaRegUserCircle size="30px" style={{ cursor: "pointer" }} />,
      type: "returnSignupPage",
    },
  ],
  MEMBER: [
    {
      name: "그룹 참가하기",
      icon: <FaUsers size="30px" style={{ cursor: "pointer" }} />,
      type: "joinGroup",
    },
    {
      name: "내 그룹 현황",
      icon: <FaCheckSquare size="30px" style={{ cursor: "pointer" }} />,
      type: "myGroupList",
    },
    {
      name: "로그아웃",
      icon: <FaSignOutAlt size="30px" style={{ cursor: "pointer" }} />,
      type: "logout",
    },
  ],
  ADMIN: [
    {
      name: "그룹 관리하기",
      icon: <FaUsers size="30px" style={{ cursor: "pointer" }} />,
      type: "manageGroup",
    },
    {
      name: "그룹 공지보내기",
      icon: <FaBullhorn size="30px" style={{ cursor: "pointer" }} />,
      type: "createNotice",
    },
    {
      name: "로그아웃",
      icon: <FaSignOutAlt size="30px" style={{ cursor: "pointer" }} />,
      type: "logout",
    },
  ],
};
