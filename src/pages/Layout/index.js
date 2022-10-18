import { Wrapper } from "./style";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import MiniSidebar from "../../components/MiniSidebar";
import Main from "../../components/Main";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("ADMIN");

  return (
    <Wrapper>
      {isOpen ? (
        <Sidebar setIsOpen={setIsOpen} role={role} />
      ) : (
        <MiniSidebar setIsOpen={setIsOpen} role={role} />
      )}
      <Main />
    </Wrapper>
  );
}

export default Layout;
