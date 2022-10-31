import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { modals } from "./sidebarOption";
import { getNoticeInfo } from "../../utils/getNoticeInfo";
import { setModalOpen } from "../../store/slices/modalSlice";
import {
  Wrapper,
  NoticeWrapper,
  Notice,
  inputAnimation,
  showAnimation,
} from "./style";

function Sidebar({ role, username, socket, groupList }) {
  const optionList = modals[role];
  const { user_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [noticeList, setNoticeList] = useState([]);
  const { isModalOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    async function getGroupNotice() {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_REQUEST_HOST}/users/${user_id}/groupNotice`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.jwt,
          },
        }
      );
      const result = await res.json();

      const newNoticeList = [];
      result.map((item) => {
        for (const notice of item.notices) {
          newNoticeList.push({
            groupName: item.name,
            colorCode: item.colorCode,
            startDate: notice.period.startDate,
            endDate: notice.period.endDate,
            message: notice.message,
          });
        }
      });

      setNoticeList([...newNoticeList]);
    }

    getGroupNotice();
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

  const logout = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_REQUEST_HOST}/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.jwt,
        },
      }
    );

    if (res.status === 200) {
      localStorage.removeItem("jwt");
      navigate("/");
    }
  };

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
                  if (option.type === "home") {
                    navigate("/");
                  } else if (option.type === "signup") {
                    navigate("/signup");
                  } else if (option.type === "logout") {
<<<<<<< HEAD
                    // dispatch(setModalOpen({ type: option.type, message: "" }));
=======
>>>>>>> d588d991260800fb0e252ce97be77ef322be6839
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
                      <Notice
                        colorCode={notice.colorCode}
                        key={notice.colorCode + idx}
                      >
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
    </Wrapper>
  );
}

export default Sidebar;
