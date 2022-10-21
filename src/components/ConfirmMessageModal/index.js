import { Wrapper } from "./style";
import { useDispatch } from "react-redux";
import { setModalOpen, setModalClose } from "../../store/slices/modalSlice";

function ConfirmMessageModal({ socket, socketType, socketValue, confirmMessage, endMessage }) {
  const dispatch = useDispatch();

  const submitNotice = (e) => {
    e.preventDefault();

    socket?.emit(socketType, { socketValue });
    dispatch(setModalOpen({ type: "message", message: endMessage }));
  };

  return (
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
  );
}

export default ConfirmMessageModal;
