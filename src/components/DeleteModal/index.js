import { Wrapper } from "./style";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setModalOpen, setModalClose } from "../../store/slices/modalSlice";

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

  const handleConfirm = () => {
    setIsFetching(true);
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
          onClick={handleConfirm}
        />
      </div>
    </Wrapper>
  );
}

export default DeleteModal;
