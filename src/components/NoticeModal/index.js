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
      <Wrapper>
        <h3 className="title">그룹 메시지</h3>
        <div className="layout-period">
          <strong className="period">기간</strong>
          <input type="date" name="startDate" onChange={handleChange} />
          <div className="date-hyphen">-</div>
          <input type="date" name="endDate" onChange={handleChange} />
        </div>
        <div className="layout-text">
          <strong className="notice-title">내용</strong>
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
            className="button"
            onClick={() => dispatch(setModalClose())}
          />
          <input
            type="submit"
            value="전송"
            className="button"
            onClick={validationCheck}
          />
        </div>
      </Wrapper>
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
