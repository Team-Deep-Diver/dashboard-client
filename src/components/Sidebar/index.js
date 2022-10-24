import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import { Wrapper, NoticeWrapper } from "./style";
import { setModalOpen } from "../../store/slices/modalSlice";
import { getNoticeInfo } from "../../utils/getNoticeInfo";

function Sidebar({ setIsSidebarOpen, role, socket, groupList }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    async function getGroupNotice() {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_REQUEST_HOST}/users/${user_id}/groupNotice`
      );

      const result = await res.json();
      const { groupName, colorCode, notice } = result;
      const notices = getNoticeInfo(groupName, colorCode, notice);

      setNoticeList(notices);
    }

    getGroupNotice();
  }, []);

  useEffect(() => {
    groupList?.forEach((group) => {
      socket?.on(group, (data) => {
        const { groupName, colorCode, notice } = data;
        const newNotice = getNoticeInfo(groupName, colorCode, notice);

        setNoticeList([...noticeList, newNotice]);
      });
    });
  }, [socket, noticeList, groupList]);

  return (
    <Wrapper>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="arrow-left"
        onClick={() => setIsSidebarOpen(false)}
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
          <div
            className="content2"
            onClick={() =>
              dispatch(setModalOpen({ type: "myGroupList", message: "" }))
            }
          >
            내 그룹 현황
          </div>
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
      <NoticeWrapper>
        {noticeList?.map((notice, idx) => (
          <li
            style={{ background: notice.colorCode, marginBottom: "10px" }}
            key={notice.colorCode + idx}
          >
            <strong>{notice.groupName}</strong>
            <p>
              {notice.startDate} ~ {notice.endDate}
            </p>
            <p>{notice.message}</p>
          </li>
        ))}
      </NoticeWrapper>
    </Wrapper>
  );
}

export default Sidebar;
