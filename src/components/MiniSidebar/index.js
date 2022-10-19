import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function MiniSidebar({ setIsOpen, role }) {
  function logout() {
    console.log("logout...");
  }

  return (
    <Wrapper>
      <FontAwesomeIcon
        icon={faBars}
        className="bars"
        onClick={() => setIsOpen(true)}
      />
      {role !== "GUEST" && (
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="logout"
          onClick={logout}
        />
      )}
    </Wrapper>
  );
}

export default MiniSidebar;
