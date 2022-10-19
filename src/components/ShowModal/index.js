import { Wrapper } from "./style";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setModalClose } from "../../store/slices/modalSlice";

function ShowModal({ children }) {
  const modalOutside = useRef();
  const dispatch = useDispatch();

  const handleModal = (e) => {
    if (modalOutside.current === e.target) {
      dispatch(setModalClose());
    }
  };

  return (
    <Wrapper ref={modalOutside} onClick={handleModal}>
      {children}
    </Wrapper>
  );
}

export default ShowModal;
