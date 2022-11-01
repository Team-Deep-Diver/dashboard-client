import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";

import Sidebar from "../../components/Sidebar";
import CalendarDate from "../../components/CalendarDate";
import Dashboard from "../../components/Dashboard";
import ShowModal from "../../components/ShowModal";
import JoinGroupModal from "../../components/JoinGroupModal";
import ManageGroupModal from "../../components/ManageGroupModal";
import MessageModal from "../../components/MessageModal";
import NoticeModal from "../../components/NoticeModal";
import CardModal from "../../components/CardModal";
import MyGroupListModal from "../../components/MyGroupListModal";

import { Wrapper, Content } from "./style";

function Layout() {
  const { user_id } = useParams();

  const [socket, setSocket] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const { isModalOpen, modalType } = useSelector((state) => state.modal);

  useEffect(() => {
    async function getUserInfo() {
      if (user_id === "guest") {
        setRole("GUEST");
        return;
      }

      const res = await fetch(
        `${process.env.REACT_APP_SERVER_REQUEST_HOST}/users/${user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.jwt,
          },
        }
      );

      if (res.status === 200) {
        const userInfo = await res.json();

        setRole(userInfo.role);
        setUsername(userInfo.nickname);
        setGroupList(userInfo.groups?.map((group) => group.groupName));
      }
    }

    getUserInfo();
  }, []);

  useEffect(() => {
    const socketIO = io.connect(process.env.REACT_APP_SERVER_REQUEST_HOST);
    setSocket(socketIO);

    return () => {
      socketIO.disconnect();
    };
  }, []);

  return (
    <>
      <Wrapper>
        <Sidebar
          role={role}
          username={username}
          socket={socket}
          groupList={groupList}
        />
        <Content>
          <CalendarDate />
          <Dashboard socket={socket} />
        </Content>
      </Wrapper>
      <AnimatePresence mode="wait" initial={false}>
        {isModalOpen && (
          <ShowModal>
            {modalType === "joinGroup" && <JoinGroupModal />}
            {modalType === "createNotice" && (
              <NoticeModal
                socket={socket}
                adminId={user_id}
                groupList={groupList}
              />
            )}
            {modalType === "message" && <MessageModal />}
            {modalType === "manageGroup" && <ManageGroupModal />}
            {modalType === "handleCard" && <CardModal socket={socket} />}
            {modalType === "myGroupList" && <MyGroupListModal />}
          </ShowModal>
        )}
      </AnimatePresence>
    </>
  );
}

export default Layout;
