import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import ConfirmMessageModal from "../ConfirmMessageModal";

import { fetchData } from "../../utils/fetchData";
import { setModalClose } from "../../store/slices/modalSlice";

import { ModalWrapper, ModalHeader, ModalContents, ModalFooter } from "./style";

function MyGroupListModal() {
  const dispatch = useDispatch();
  const { user_id } = useParams();

  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmText, setConfirmText] = useState(false);
  const [targetedGroupId, setTargetedGroupId] = useState("");
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const handleClick = ({ groupId }, e) => {
    setConfirmText(e.target.innerText);
    setTargetedGroupId(groupId);
    setShowConfirmMessage(true);
  };

  useEffect(() => {
    const getGroupList = async () => {
      setIsLoading(true);
      const res = await fetchData(`/users/${user_id}/groups`, "GET");

      if (res.status === 400) {
        const { message } = await res.json();
        setIsLoading(false);
        return console.error(message);
      }

      const data = await res.json();
      setGroups(data);
      setIsLoading(false);
    };

    getGroupList();
  }, []);

  return (
    <>
      <ModalWrapper>
        <ModalHeader>
          <h3>내 그룹 현황</h3>
        </ModalHeader>
        <ModalContents>
          <div className="participation">
            <strong className="sub-title">참여중</strong>
            <div className="contents-wrap">
              {isLoading ? "불러오는 중입니다..." : ""}
              <ul className="members-list">
                {groups?.map((group) => (
                  <li key={group._id}>
                    {group.status === "PARTICIPATING" && (
                      <div className="rejected-list">
                        <div className="name">{group.groupName}</div>
                        <button onClick={(e) => handleClick(group, e)}>
                          탈퇴
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <li>
                {!isLoading &&
                  groups.filter((group) => group.status === "PARTICIPATING")
                    .length === 0 &&
                  "참여 중인 그룹이 없습니다."}
              </li>
            </div>
          </div>
          <div className="application">
            <strong className="sub-title">지원 현황</strong>
            <div className="contents-wrap">
              {isLoading ? "불러오는 중입니다..." : ""}
              <ul className="members-list">
                {groups?.map((group) => (
                  <li key={group._id}>
                    {group.status === "PENDING" && (
                      <div className="rejected-list">
                        <div className="name">{group.groupName}: 대기중</div>
                      </div>
                    )}
                    {group.status === "REJECTED" && (
                      <div className="rejected-list">
                        <div className="name">{group.groupName}: 거절</div>
                        <button onClick={(e) => handleClick(group, e)}>
                          삭제
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <li>
                {!isLoading &&
                  groups.filter((group) => group.status !== "PARTICIPATING")
                    .length === 0 &&
                  "지원 내역이 없습니다."}
              </li>
            </div>
          </div>
        </ModalContents>
        <ModalFooter>
          <button
            className="close-button"
            onClick={() => dispatch(setModalClose())}
          >
            닫기
          </button>
        </ModalFooter>
        {showConfirmMessage && (
          <ConfirmMessageModal
            deleteGroupId={targetedGroupId}
            confirmMessage={`정말 ${confirmText}하시겠습니까?`}
            endMessage={`성공적으로 ${confirmText}되었습니다.`}
          />
        )}
      </ModalWrapper>
    </>
  );
}

export default MyGroupListModal;
