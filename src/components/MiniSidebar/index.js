import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { Wrapper } from "./style";
import MessageModal from "../MessageModal";

function MiniSidebar({ setIsOpen, role }) {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <>
      {showMessage && (
        <MessageModal
          message="로그아웃 되셨습니다. 메인페이지로 이동합니다."
          type="logout"
        />
      )}
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
            onClick={() => setShowMessage(true)}
          />
        )}
      </Wrapper>
    </>
  );
}

export default MiniSidebar;
