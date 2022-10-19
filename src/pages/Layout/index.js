import { Wrapper } from "./style";
import { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import MiniSidebar from "../../components/MiniSidebar";
import Main from "../../components/Main";
import ShowModal from "../../components/ShowModal";
import JoinGroupModal from "../../components/JoinGroupModal";
import MessageModal from "../../components/MessageModal";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("MEMBER");
  const { isModalOpen, modalType, message } = useSelector(
    (state) => state.modal
  );

  return (
    <>
      {isModalOpen && (
        <ShowModal>
          {modalType === "message" && <MessageModal message={message} />}
          {modalType === "joinGroup" && <JoinGroupModal />}
        </ShowModal>
      )}
      <Wrapper>
        {isOpen ? (
          <Sidebar setIsOpen={setIsOpen} role={role} />
        ) : (
          <MiniSidebar setIsOpen={setIsOpen} role={role} />
        )}
        <Main />
      </Wrapper>
    </>
  );
}

export default Layout;
