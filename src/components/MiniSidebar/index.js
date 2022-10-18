import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function MiniSidebar() {
  return (
    <Wrapper>
      <FontAwesomeIcon icon={faBars} className="bars"/>
      <FontAwesomeIcon icon={faRightFromBracket} className="logout" />
    </Wrapper>
  );
}

export default MiniSidebar;
