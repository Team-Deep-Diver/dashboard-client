import { modal } from "./style";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setModalClose } from "../../store/slices/modalSlice";
import { motion } from "framer-motion";

function ShowModal({ children }) {
  const modalOutside = useRef();
  const dispatch = useDispatch();

  const handleModal = (e) => {
    if (modalOutside.current === e.target) {
      dispatch(setModalClose());
    }
  };

  return (
    <motion.div
      className="backdrop"
      variants={modal}
      initial="hidden"
      animate="visible"
      exit="hidden"
      ref={modalOutside}
      onClick={handleModal}
    >
      {children}
    </motion.div>
  );
}

export default ShowModal;
