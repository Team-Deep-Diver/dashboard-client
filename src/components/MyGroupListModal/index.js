import { ModalWrapper, ModalHeader, ModalContents, ModalFooter } from "./style";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteModal from "../DeleteModal";
import { setModalClose } from "../../store/slices/modalSlice";

function MyGroupListModal() {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const [groups, setGroups] = useState([]);
  const [targetedGroupId, setTargetedGroupId] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(false);

  const handleClick = ({ groupId }, e) => {
    setIsConfirm(true);
    setConfirmTarget(e.target.innerText);
    setTargetedGroupId(groupId);
  };

  useEffect(() => {
    const getGroupList = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_REQUEST_HOST}/users/${user_id}/groups`
        );
        const result = await response.json();

        setGroups(result);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getGroupList();
  }, []);

  return (
    <>
      <ModalWrapper>
        <ModalHeader>
          <h3>그룹관리</h3>
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
            </div>
          </div>
          <div className="application">
            <strong className="sub-title">지원 현황</strong>
            <div className="contents-wrap">
              {isLoading ? "불러오는 중입니다..." : ""}
              <ul className="members-list">
                {groups?.map((group) => (
                  <li key={group._id}>
                    {group.status !== "PENDING" ? (
                      <div className="rejected-list">
                        <div className="name">{group.groupName}: 대기중</div>
                      </div>
                    ) : (
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
        {isConfirm && (
          <DeleteModal
            confirmMessage={`정말 ${confirmTarget}하시겠습니까?`}
            fetchedValue={{ user_id, targetedGroupId }}
          />
        )}
      </ModalWrapper>
    </>
  );
}

export default MyGroupListModal;
