import { modal, Wrapper } from "./style";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setModalOpen, setModalClose } from "../../store/slices/modalSlice";
import { motion } from "framer-motion";

function DeleteModal({ confirmMessage, fetchedValue }) {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const { user_id, targetedGroupId } = fetchedValue;

  useEffect(() => {
    const onSubmit = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_REQUEST_HOST}/users/${user_id}/groups/${targetedGroupId}`,
          { method: "DELETE" }
        );

        if (res.status === 204) {
          dispatch(
            setModalOpen({ type: "message", message: "완료되었습니다" })
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    isFetching && onSubmit();
  }, [targetedGroupId, isFetching]);

  return (
    <>
      <motion.div
        className="delete-modal"
        variants={modal}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <Wrapper>
          <div className="message">{confirmMessage}</div>
          <div className="layout">
            <button onClick={() => dispatch(setModalClose())}>취소</button>
            <button onClick={() => setIsFetching(true)}>확인</button>
          </div>
        </Wrapper>
      </motion.div>
    </>
  );
}

export default DeleteModal;
