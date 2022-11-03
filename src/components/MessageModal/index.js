import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import { setModalClose } from "../../store/slices/modalSlice";

import { modal, Wrapper } from "./style";

function MessageModal({ socket }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, messageType } = useSelector((state) => state.modal);

  const logout = () => {
    dispatch(setModalClose());
    navigate("/");
  };

  const home = async () => {
    socket.emit("resetGuestCards", { socketValue: "guest" });
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

        <div className="layout">
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
              value={messageType === "home" ? "취소" : "닫기"}
              className="close-button"
              onClick={() => dispatch(setModalClose())}
            />
          )}

          {messageType === "home" && (
            <input
              type="submit"
              value="확인"
              className="close-button"
              onClick={home}
            />
          )}
        </div>
      </Wrapper>
    </motion.div>
  );
}

export default MessageModal;
