import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import MessageModal from "../MessageModal";

import { fetchData } from "../../utils/fetchData";
import { getNoticeInfo } from "../../services/getNoticeInfo";
import { setModalOpen } from "../../store/slices/modalSlice";

import { options } from "./sidebarOptions";
import {
  Wrapper,
  NoticeWrapper,
  Notice,
  inputAnimation,
  showAnimation,
} from "./style";

function Sidebar({ role, username, socket, groupList }) {
  const dispatch = useDispatch();

  const { user_id } = useParams();
  const { isModalOpen } = useSelector((state) => state.modal);

  const optionList = options[role];
  const [isOpen, setIsOpen] = useState(false);
  const [noticeList, setNoticeList] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const navigatePage = (type) => {
    dispatch(
      setModalOpen({
        type: "message",
        messageType: type,
        message: `카드 정보가 모두 삭제됩니다. \n 그래도 돌아가시겠습니까?`,
      })
    );
  }

  const logout = async () => {
    const res = await fetchData("/logout", "POST");

    if (res.status === 400) {
      const { message } = await res.json();

      return dispatch(
        setModalOpen({
          type: "message",
          messageType: "logout",
          message,
        })
      );
    }

    dispatch(
      setModalOpen({
        type: "message",
        messageType: "logout",
        message: "로그아웃 되셨습니다.",
      })
    );
  };

  useEffect(() => {
    const getGroupNotice = async () => {
      const res = await fetchData(`/users/${user_id}/groupNotice`, "GET");

      if (res.status === 400) {
        const { message } = await res.json();
        return console.error(message);
      }

      const { myGroupList } = await res.json();
      setNoticeList([...myGroupList]);
    };

    !!user_id && getGroupNotice();
  }, [isModalOpen, isOpen]);

  useEffect(() => {
    groupList?.map((group) => {
      socket?.on(group, (data) => {
        const { groupName, colorCode, notice } = data;
        const newNotice = getNoticeInfo(groupName, colorCode, notice);

        setNoticeList([...noticeList, newNotice]);
      });
    });
  }, [socket, noticeList, groupList]);

  return (
    <Wrapper>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "50px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 11,
            },
          }}
          className="sidebar"
        >
          <div className="top_section">
            {isOpen && (
              <motion.h1
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={showAnimation}
                className="name"
              >
                {role === "GUEST" ? "GUEST 님" : `${username} 님`}
              </motion.h1>
            )}
            <div className="bars">
              <FaBars
                onClick={() => setIsOpen(!isOpen)}
                size="30"
                className="pointer"
              />
            </div>
          </div>
          <section className="routes">
            {optionList?.map((option) => (
              <div
                key={option.type}
                className="modal"
                onClick={() => {
                  if (option.type === "returnHomePage") {
                    navigatePage(option.type);
                  } else if (option.type === "returnSignupPage") {
                    navigatePage(option.type);
                  } else if (option.type === "logout") {
                    logout();
                  } else {
                    dispatch(setModalOpen({ type: option.type, message: "" }));
                  }
                }}
              >
                <div>{option.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      variants={showAnimation}
                      className="link-text"
                    >
                      {option.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </section>
          <div className="notice">
            <AnimatePresence>
              {isOpen && role !== "GUEST" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                >
                  <NoticeWrapper>
                    {noticeList?.map((notice, idx) => (
                      <Notice colorCode={notice.colorCode} key={idx}>
                        <strong className="group-name">
                          {notice.groupName}
                        </strong>
                        <p className="font">
                          {notice.startDate} ~ {notice.endDate}
                        </p>
                        <p className="font">{notice.message}</p>
                      </Notice>
                    ))}
                  </NoticeWrapper>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      {showMessageModal && <MessageModal />}
    </Wrapper>
  );
}

export default Sidebar;
