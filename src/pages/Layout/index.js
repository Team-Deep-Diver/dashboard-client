import { Wrapper } from "./style";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import MiniSidebar from "../../components/MiniSidebar";
import Main from "../../components/Main";

function Layout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [role, setRole] = useState("ADMIN");
  // 로그인에 따라 "GUEST", "ADMIN", "MEMBER" 중 하나.
  // 로그인 로직 완료 후, useState 삭제하고 { role } props로 전달받기?!

  return (
    <Wrapper>
      {openSideBar ? (
        <Sidebar setOpenSideBar={setOpenSideBar} role={role} />
      ) : (
        <MiniSidebar setOpenSideBar={setOpenSideBar} role={role} />
      )}
      <Main />
    </Wrapper>
  );
}

export default Layout;
