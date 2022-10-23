import { Wrapper } from "./style";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setModalClose } from "../../store/slices/modalSlice";
import { validateNoticeForm } from "../../utils/validateNoticeForm";
import ConfirmMessageModal from "../ConfirmMessageModal";

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
      {showConfirmMessage && (
        <ConfirmMessageModal
          socket={socket}
          socketType="sendNotice"
          socketValue={notice}
          confirmMessage="공지를 생성하시겠습니까?"
          endMessage="공지가 생성되었습니다."
        />
      )}
      <Wrapper>
        <div className="title">그룹 메시지</div>
        <div className="layout-period">
          <div className="period">기간</div>
          <input type="date" name="startDate" onChange={handleChange} />
          <div className="date-hyphen">-</div>
          <input type="date" name="endDate" onChange={handleChange} />
        </div>
        <div className="layout-text">
          <div className="notice-title">내용</div>
          <textarea
            className="notice"
            name="groupNotice"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="error-message">{errorMessage}</div>
        <div className="layout-button">
          <input
            type="submit"
            value="취소"
            className="close-button"
            onClick={() => dispatch(setModalClose())}
          />
          <input
            type="submit"
            value="전송"
            className="close-button"
            onClick={validationCheck}
          />
        </div>
      </Wrapper>
    </>
  );
}

export default NoticeModal;
