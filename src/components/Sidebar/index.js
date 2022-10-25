import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { HiArrowLeft } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { option, Wrapper, NoticeWrapper, Notice } from "./style";
import { setModalOpen } from "../../store/slices/modalSlice";
import { getNoticeInfo } from "../../utils/getNoticeInfo";

function Sidebar({ setIsSidebarOpen, role, socket, groupList }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [noticeList, setNoticeList] = useState([]);
  const { isModalOpen } = useSelector((state) => state.modal);

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
  }, [isModalOpen]);

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
      <HiArrowLeft
        size={40}
        className="arrow-left"
        onClick={() => setIsSidebarOpen(false)}
      />
      {role === "GUEST" && (
        <motion.div
          variants={option}
          whileHover="hover"
          transition="spring"
          className="font"
          onClick={() => navigate("/signup")}
        >
          <div className="icon">&#128587;</div>
          회원가입
        </motion.div>
      )}
      {role === "MEMBER" && (
        <div>
          <motion.div
            variants={option}
            whileHover="hover"
            transition="spring"
            className="font"
            onClick={() =>
              dispatch(setModalOpen({ type: "joinGroup", message: "" }))
            }
          >
            <div className="icon">&#128152;</div>
            그룹 참가하기
          </motion.div>
          <motion.div
            variants={option}
            whileHover="hover"
            transition="spring"
            className="font"
            onClick={() =>
              dispatch(setModalOpen({ type: "myGroupList", message: "" }))
            }
          >
            <div className="icon">&#128450;</div>내 그룹 현황
          </motion.div>
        </div>
      )}
      {role === "ADMIN" && (
        <div>
          <motion.div
            variants={option}
            whileHover="hover"
            transition="spring"
            className="font"
            onClick={() =>
              dispatch(setModalOpen({ type: "manageGroup", message: "" }))
            }
          >
            <div className="icon">&#128450;</div>
            그룹 관리하기
          </motion.div>
          <motion.div
            variants={option}
            whileHover="hover"
            transition="spring"
            className="font"
            onClick={() =>
              dispatch(setModalOpen({ type: "createNotice", message: "" }))
            }
          >
            <div className="icon">&#128236;</div>
            그룹 공지 보내기
          </motion.div>
        </div>
      )}
      {role !== "GUEST" && (
        <NoticeWrapper>
          {noticeList?.map((notice, idx) => (
            <Notice colorCode={notice.colorCode} key={notice.colorCode + idx}>
              <strong className="group-name">{notice.groupName}</strong>
              <p className="font">
                {notice.startDate} ~ {notice.endDate}
              </p>
              <p className="font">{notice.message}</p>
            </Notice>
          ))}
        </NoticeWrapper>
      )}
    </Wrapper>
  );
}

export default Sidebar;
