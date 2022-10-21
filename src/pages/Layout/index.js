import { Wrapper, Content } from "./style";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import MiniSidebar from "../../components/MiniSidebar";
import CalendarDate from "../../components/CalendarDate";
import Dashboard from "../../components/Dashboard";

import ShowModal from "../../components/ShowModal";
import JoinGroupModal from "../../components/JoinGroupModal";
import ManageGroupModal from "../../components/ManageGroupModal";
import MessageModal from "../../components/MessageModal";
import NoticeModal from "../../components/NoticeModal";
import CreateCardModal from "../../components/CreateCardModal";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState("MEMBER");
  const { isModalOpen, modalType, message } = useSelector(
    (state) => state.modal
  );
  const { user_id } = useParams();

  useEffect(() => {
    async function getUserInfo() {
      if (user_id === "guest") {
        setRole("GUEST");
        return;
      }

      const res = await fetch(
        `${process.env.REACT_APP_SERVER_REQUEST_HOST}/users/${user_id}`
      );
      if (res.status === 200) {
        const { userInfo } = await res.json();

        setRole(userInfo.role);
      }
    }

    getUserInfo();
  }, []);

  const [socket, setSocket] = useState();

  useEffect(() => {
    const socketIO = io.connect(process.env.REACT_APP_SERVER_REQUEST_HOST);
    setSocket(socketIO);

    return () => {
      socketIO.disconnect();
    };
  }, []);

  return (
    <>
      {isModalOpen && (
        <ShowModal>
          {modalType === "joinGroup" && <JoinGroupModal />}
          {modalType === "createNotice" && <NoticeModal socket={socket} />}
          {modalType === "message" && <MessageModal message={message} />}
          {modalType === "manageGroup" && <ManageGroupModal />}
          {modalType === "createCard" && <CreateCardModal socket={socket} />}
        </ShowModal>
      )}
      <Wrapper>
        {isSidebarOpen ? (
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} role={role} />
        ) : (
          <MiniSidebar setIsSidebarOpen={setIsSidebarOpen} role={role} />
        )}
        <Content>
          <CalendarDate />
          <Dashboard socket={socket} />
        </Content>
      </Wrapper>
    </>
  );
}

export default Layout;
