import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { setModalOpen, setModalClose } from "../../store/slices/modalSlice";
import { axiosData } from "../../utils/axiosData";

import { ModalWrapper, ModalHeader, ModalContents, ModalFooter } from "./style";

function JoinGroupModal() {
  const dispatch = useDispatch();
  const { user_id } = useParams();

  const [result, setResult] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("그룹명을 검색해주세요");

  const handleInput = (e) => {
    setResult([]);
    setGroupName(e.target.value);
    setResultMessage("그룹명을 검색해주세요");
  };

  const findGroupByName = async () => {
    try {
      const res = await axiosData(`/groups?groupName=${groupName}`, "GET");

      setIsLoading(true);
      setResultMessage("불러 오는 중입니다...");

      const data = res.data;

      setResultMessage("");
      setResult(data);

      setIsLoading(false);
    } catch (err) {
      if (err.response.status === 404) {
        setResultMessage(err.response.data.message);
      }
    }
  };

  const applyGroupById = async (groupId) => {
    try {
      await axiosData(`/users/${user_id}/groups/${groupId}`, "POST");

      return dispatch(
        setModalOpen({ type: "message", message: "신청 되었습니다." })
      );
    } catch (err) {
      const { message } = err.response.data;

      return dispatch(
        setModalOpen({
          type: "message",
          message,
        })
      );
    }
  };

  return (
    <ModalWrapper>
      <ModalHeader>
        <h3>그룹 참가하기</h3>
      </ModalHeader>
      <ModalContents>
        <div className="layout">
          <input
            type="text"
            id="groupName"
            name="groupName"
            placeholder="그룹명"
            className="input-value"
            value={groupName}
            onChange={handleInput}
          />
          <input
            type="submit"
            value="검색"
            className="search-button"
            disabled={groupName === "" ? true : false}
            onClick={() => findGroupByName()}
          />
        </div>
        <div className="search-result">
          {isLoading && <div className="message">{resultMessage}</div>}
          {!isLoading && result.length === 0 ? (
            <div className="message">{resultMessage}</div>
          ) : (
            result?.map((item) => (
              <div className="list-item" key={item.group_id}>
                <div className="item-value">{item.name}</div>
                <input
                  type="submit"
                  value="신청"
                  className="item-button"
                  onClick={() => applyGroupById(item.group_id)}
                />
              </div>
            ))
          )}
        </div>
      </ModalContents>
      <ModalFooter>
        <button onClick={() => dispatch(setModalClose())}>닫기</button>
      </ModalFooter>
    </ModalWrapper>
  );
}

export default JoinGroupModal;
