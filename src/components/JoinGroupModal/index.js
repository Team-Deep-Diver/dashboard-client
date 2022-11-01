import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { setModalOpen, setModalClose } from "../../store/slices/modalSlice";

import { ModalWrapper, ModalHeader, ModalContents, ModalFooter } from "./style";

function JoinGroupModal() {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const [result, setResult] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("그룹명을 검색해주세요");

  const handleInput = (e) => {
    setResult([]);
    setGroupName(e.target.value);
    setResultMessage("그룹명을 검색해주세요");
  };

  async function findGroupByName() {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_REQUEST_HOST}/groups?groupName=${groupName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.jwt,
        },
      }
    );

    setIsLoading(true);
    setResultMessage("불러 오는 중입니다...");

    const result = await res.json();

    if (result.message) {
      setResultMessage("검색한 그룹에 대한 정보가 없습니다");
      setResult([]);
    } else {
      setResultMessage("");
      setResult(result);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    async function applyGroupById() {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_REQUEST_HOST}/users/${user_id}/groups/${groupId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.jwt,
          },
        }
      );

      if (res.status === 200) {
        dispatch(
          setModalOpen({ type: "message", message: "신청 되었습니다." })
        );
      } else {
        const result = await res.json();

        dispatch(
          setModalOpen({
            type: "message",
            message: result.message,
          })
        );
      }
    }

    groupId && applyGroupById();
  }, [groupId]);

  return (
    <>
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
                    onClick={() => setGroupId(item.group_id)}
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
    </>
  );
}

export default JoinGroupModal;
