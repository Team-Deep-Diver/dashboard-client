import { modal, Wrapper } from "./style";
import { useDispatch } from "react-redux";
import { setModalOpen, setModalClose } from "../../store/slices/modalSlice";
import { motion } from "framer-motion";

function ConfirmMessageModal({
  socket,
  socketType,
  socketValue,
  confirmMessage,
  endMessage,
}) {
  const dispatch = useDispatch();

  const submitNotice = (e) => {
    e.preventDefault();

    dispatch(setModalOpen({ type: "message", message: endMessage }));
    socket?.emit(socketType, { socketValue });
  };

  return (
    <motion.div
      className="confirm-modal"
      variants={modal}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <Wrapper>
        <div className="message">{confirmMessage}</div>
        <div className="layout">
          <input
            type="submit"
            value="취소"
            className="button"
            onClick={() => dispatch(setModalClose())}
          />
          <input
            type="submit"
            value="확인"
            className="button"
            onClick={submitNotice}
          />
        </div>
      </Wrapper>
    </motion.div>
  );
}

export default ConfirmMessageModal;
