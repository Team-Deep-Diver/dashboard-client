import { Wrapper } from "./style";
import Sidebar from "../../components/Sidebar";
import MiniSidebar from "../../components/MiniSidebar";
import Main from "../../components/Main";

function Layout() {
  return (
    <Wrapper>
      {/* <Sidebar /> */}
      <MiniSidebar />
      <Main />
    </Wrapper>
  );
}

export default Layout;
