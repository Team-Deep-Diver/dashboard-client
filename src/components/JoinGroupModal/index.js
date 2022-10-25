import { useEffect, useState } from "react";
import { ModalWrapper, ModalHeader, ModalContents, ModalFooter } from "./style";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setModalOpen, setModalClose } from "../../store/slices/modalSlice";

function JoinGroupModal() {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState(false);
  console.log(result);

  const handleInput = (e) => {
    setResult([]);
    setSearch(false);
    setGroupName(e.target.value);
  };

  useEffect(() => {
    async function findGroupByName() {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_REQUEST_HOST}/groups?groupName=${groupName}`
      );

      if (res.status === 200) {
        const groups = await res.json();
        console.log("groups", groups);
        setResult(groups);
      }
    }

    search && findGroupByName();
  }, [search]);

  useEffect(() => {
    async function applyGroupById() {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_REQUEST_HOST}/users/${user_id}/groups/${groupId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        dispatch(
          setModalOpen({ type: "message", message: "신청 되었습니다." })
        );
      } else {
        dispatch(
          setModalOpen({
            type: "message",
            message: "오류가 발생했습니다. 다시 한 번 시도해 주세요.",
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
              onClick={(e) => setSearch(true)}
            />
          </div>
          <div className="search-result">
            {search && result.length === 0 ? (
              <div className="message">
                '{groupName}'에 대한 검색 결과가 없습니다.
              </div>
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
