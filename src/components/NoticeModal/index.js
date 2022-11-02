import { useState } from "react";
import { useDispatch } from "react-redux";

import ConfirmMessageModal from "../ConfirmMessageModal";
import { setModalClose } from "../../store/slices/modalSlice";
import { validateNoticeForm } from "../../services/validateNoticeForm";
import { ModalWrapper, ModalHeader, ModalContents, ModalFooter } from "./style";

function NoticeModal({ socket, adminId, groupList }) {
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [notice, setNotice] = useState({
    adminId,
    groupList,
    startDate: "",
    endDate: "",
    groupNotice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNotice({
      ...notice,
      [name]: value,
    });
  };

  const validationCheck = (e) => {
    e.preventDefault();

    const errors = validateNoticeForm(notice);

    if (errors.length > 0) {
      const { message } = errors[0];
      return setErrorMessage(message);
    }

    setShowConfirmMessage(true);
  };

  return (
    <>
      <ModalWrapper>
        <ModalHeader>
          <h3 className="title">그룹 공지</h3>
        </ModalHeader>
        <ModalContents>
          <div className="layout-period">
            <strong className="sub-title">기간</strong>
            <div className="period">
              <input type="date" name="startDate" onChange={handleChange} />
              <div className="date-hyphen">-</div>
              <input type="date" name="endDate" onChange={handleChange} />
            </div>
          </div>
          <div className="layout-text">
            <strong className="sub-title notice-title">내용</strong>
            <textarea
              className="notice"
              name="groupNotice"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="error-message">{errorMessage}</div>
        </ModalContents>
        <ModalFooter>
          <button
            type="submit"
            className="button"
            onClick={() => dispatch(setModalClose())}
          >
            취소
          </button>
          <button type="submit" className="button" onClick={validationCheck}>
            전송
          </button>
        </ModalFooter>
      </ModalWrapper>
      {showConfirmMessage && (
        <ConfirmMessageModal
          socket={socket}
          socketType="sendNotice"
          socketValue={notice}
          confirmMessage="공지를 생성하시겠습니까?"
          endMessage="공지가 생성되었습니다."
        />
      )}
    </>
  );
}

export default NoticeModal;
