import { useRef } from "react";
import { useDispatch } from "react-redux";

import { motion } from "framer-motion";

import { setModalClose } from "../../store/slices/modalSlice";

import { modal } from "./style";

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
