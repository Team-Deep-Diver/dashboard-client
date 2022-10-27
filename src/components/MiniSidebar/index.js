import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";

import { Wrapper } from "./style";
import MessageModal from "../MessageModal";

function MiniSidebar({ setIsSidebarOpen, role }) {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  async function logout() {
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
      setShowMessage(true);
      navigate("/");
    }
  }

  return (
    <>
      <Wrapper>
        <VscMenu
          className="bars"
          size={40}
          onClick={() => setIsSidebarOpen(true)}
        />
        {role !== "GUEST" && (
          <CiLogout className="logout" size={40} onClick={logout} />
        )}
        {/* {role !== "GUEST" && (
          <CiLogout className="logout" size={40} onClick={() => setShowMessage} />
        )} */}
        {showMessage && (
          <MessageModal
            message="로그아웃 되셨습니다. 메인페이지로 이동합니다."
            type="logout"
          />
        )}
      </Wrapper>
    </>
  );
}

export default MiniSidebar;
