import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Wrapper } from "./style";
import { setModalOpen } from "../../store/slices/modalSlice";

function Sidebar({ setIsOpen, role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="arrow-left"
        onClick={() => setIsOpen(false)}
      />
      {role === "GUEST" && (
        <div className="content1" onClick={() => navigate("/signup")}>
          회원가입
        </div>
      )}
      {role === "MEMBER" && (
        <div>
          <div
            className="content1"
            onClick={() =>
              dispatch(setModalOpen({ type: "joinGroup", message: "" }))
            }
          >
            그룹 참가하기
          </div>
          <div className="content2">내 그룹 현황</div>
        </div>
      )}
      {role === "ADMIN" && (
        <div>
          <div
            className="content1"
            onClick={() =>
              dispatch(setModalOpen({ type: "manageGroup", message: "" }))
            }
          >
            그룹 관리하기
          </div>
          <div
            className="content2"
            onClick={() =>
              dispatch(setModalOpen({ type: "createNotice", message: "" }))
            }
          >
            그룹 공지 보내기
          </div>
        </div>
      )}
    </Wrapper>
  );
}

export default Sidebar;
