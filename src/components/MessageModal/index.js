import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

import { modal, Wrapper } from "./style";
import { setModalClose } from "../../store/slices/modalSlice";

function MessageModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, messageType } = useSelector((state) => state.modal);

  const logout = () => {
    dispatch(setModalClose());
    navigate("/");
  };

  return (
    <motion.div
      className="confirm-modal"
      variants={modal}
      initial="hidden"
      animate="visible"
    >
      <Wrapper>
        <div className="message">{message}</div>

        {messageType === "logout" && (
          <input
            type="submit"
            value="확인"
            className="close-button"
            onClick={logout}
          />
        )}

        {messageType === "signup" && (
          <input
            type="submit"
            value="확인"
            className="close-button"
            onClick={() => navigate("/login")}
          />
        )}

        {messageType !== "signup" && messageType !== "logout" && (
          <input
            type="submit"
            value="닫기"
            className="close-button"
            onClick={() => dispatch(setModalClose())}
          />
        )}
      </Wrapper>
    </motion.div>
  );
}

export default MessageModal;
