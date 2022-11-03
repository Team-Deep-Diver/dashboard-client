import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import { fetchData } from "../../utils/fetchData";
import { setModalOpen, setModalClose } from "../../store/slices/modalSlice";

import { modalTypeOne, modalTypeTwo, Wrapper } from "./style";

function ConfirmMessageModal({
  socket,
  socketType,
  socketValue,
  deleteGroupId,
  confirmMessage,
  endMessage,
}) {
  const dispatch = useDispatch();
  const { user_id } = useParams();

  const handleSubmit = async () => {
    if (deleteGroupId) {
      const res = await fetchData(
        `/users/${user_id}/groups/${deleteGroupId}`,
        "DELETE"
      );

      if (res.status === 400) {
        const { message } = await res.json();
        return console.error(message);
      }

      return dispatch(setModalOpen({ type: "message", message: endMessage }));
    }

    dispatch(setModalOpen({ type: "message", message: endMessage }));
    socket?.emit(socketType, { socketValue });
  };

  return (
    <motion.div
      className="confirm-modal"
      variants={deleteGroupId ? modalTypeTwo : modalTypeOne}
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
            onClick={handleSubmit}
          />
        </div>
      </Wrapper>
    </motion.div>
  );
}

export default ConfirmMessageModal;
