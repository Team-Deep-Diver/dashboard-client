import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
{/* <FontAwesomeIcon icon={faRightFromBracket} size="2x" color="#FFFFFF" /> */}

function Sidebar() {
  return (
    <Wrapper>
      <FontAwesomeIcon icon={faArrowLeft} size="3x" color="#FFFFFF" pull="right" />
      <div>회원가입</div>
    </Wrapper>
  );
}

export default Sidebar;
