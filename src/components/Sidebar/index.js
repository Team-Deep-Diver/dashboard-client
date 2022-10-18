import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ setOpenSideBar, role }) {
  return (
    <Wrapper>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="arrow-left"
        onClick={() => setOpenSideBar(false)}
      />
      {role === "GUEST" && (
        <div className="content1">회원가입</div>
      )}
      {role === "MEMBER" && (
        <div>
          <div className="content1">그룹 참가하기</div>
          <div className="content2">내 그룹 현황</div>
        </div>
      )}
      {role === "ADMIN" && (
        <div>
          <div className="content1">그룹 관리하기</div>
          <div className="content2">그룹 공지 보내기</div>
        </div>
      )}
    </Wrapper>
  );
}

export default Sidebar;
