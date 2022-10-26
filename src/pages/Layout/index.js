import { Wrapper, Content } from "./style";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Sidebar from "../../components/Sidebar";
import MiniSidebar from "../../components/MiniSidebar";
import CalendarDate from "../../components/CalendarDate";
// import Dashboard from "../../components/Dashboard"; // dnd 적용해보려고 잠시 닫아 놓음
// import Dashboard from "../../components/Dashboard_ar";
import Dashboard from "../../components/Dashboard_ar2";

import ShowModal from "../../components/ShowModal";
import JoinGroupModal from "../../components/JoinGroupModal";
import ManageGroupModal from "../../components/ManageGroupModal";
import MessageModal from "../../components/MessageModal";
import NoticeModal from "../../components/NoticeModal";
import CardModal from "../../components/CardModal";
import MyGroupListModal from "../../components/MyGroupListModal";

function Layout() {
  const { user_id } = useParams();
  const [socket, setSocket] = useState(null);
  const [role, setRole] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isModalOpen, modalType, message } = useSelector(
    (state) => state.modal
  );

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
        {isSidebarOpen ? (
          <Sidebar
            setIsSidebarOpen={setIsSidebarOpen}
            role={role}
            socket={socket}
            groupList={groupList}
          />
        ) : (
          <MiniSidebar setIsSidebarOpen={setIsSidebarOpen} role={role} />
        )}
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
            {modalType === "message" && <MessageModal message={message} />}
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
