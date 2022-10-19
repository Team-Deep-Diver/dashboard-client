import { Wrapper } from "./style";
import { useDispatch } from "react-redux";
import { setModalClose } from "../../store/slices/modalSlice";

function MessageModal({ message }) {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="message">{message}</div>
      <input
        type="submit"
        value="닫기"
        className="close-button"
        onClick={() => dispatch(setModalClose())}
      />
    </Wrapper>
  );
}

export default MessageModal;
