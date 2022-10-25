import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

import { modal, Wrapper } from "./style";
import { setModalClose } from "../../store/slices/modalSlice";

function MessageModal({ message, type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/");
    }
  }

  return (
    <motion.div
      className="confirm-modal"
      variants={modal}
      initial="hidden"
      animate="visible"
    >
      <Wrapper>
        <div className="message">{message}</div>

        {type === "logout" && (
          <input
            type="submit"
            value="확인"
            className="close-button"
            onClick={logout}
          />
        )}

        {type === "signup" && (
          <input
            type="submit"
            value="확인"
            className="close-button"
            onClick={() => navigate("/login")}
          />
        )}

        {type !== "signup" && type !== "logout" && (
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
