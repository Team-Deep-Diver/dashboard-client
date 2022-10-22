import { Wrapper, EntryBox } from "./style";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteModal from "../DeleteModal";
import { setModalClose } from "../../store/slices/modalSlice";

function MyGroupListModal() {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const [getGroups, setGetGroups] = useState([]);
  const [targetedGroupId, setTargetedGroupId] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(false);

  const handleClick = ({ groupId }, e) => {
    setIsConfirm(true);
    setConfirmTarget(e.target.value);
    setTargetedGroupId(groupId);
  };

  useEffect(() => {
    const onOpenList = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_REQUEST_HOST}/users/${user_id}/groups`
        );
        const result = await response.json();

        setGetGroups(result);
      } catch (err) {
        console.error(err);
      }
    };

    onOpenList();
  }, []);

  return (
    <Wrapper>
      <h1>내 그룹 현황</h1>
      <div>참여중</div>
      <EntryBox>
        {getGroups &&
          getGroups.map((group) => {
            const { _id, status, groupName } = group;
            return (
              <div key={_id}>
                {status === "PARTICIPATING" && (
                  <div>
                    <span>{groupName}</span>
                    <input
                      type={"button"}
                      value={"탈퇴"}
                      onClick={(e) => handleClick(group, e)}
                    />
                  </div>
                )}
              </div>
            );
          })}
      </EntryBox>
      <div>지원 현황</div>
      <EntryBox>
        {getGroups &&
          getGroups.map((group) => {
            const { _id, status, groupName } = group;

            return (
              <div key={_id}>
                {status === "PENDING" ? (
                  <span>{groupName}: 대기중</span>
                ) : (
                  <div>
                    <span>{groupName}: 거절</span>
                    <input
                      type={"button"}
                      value={"삭제"}
                      onClick={(e) => handleClick(group, e)}
                    />
                  </div>
                )}
              </div>
            );
          })}
      </EntryBox>
      <button onClick={() => dispatch(setModalClose())}>닫기</button>
      {isConfirm && (
        <div>
          <DeleteModal
            confirmMessage={`정말 ${confirmTarget}하시겠습니까?`}
            fetchedValue={{ user_id, targetedGroupId }}
          />
        </div>
      )}
    </Wrapper>
  );
}

export default MyGroupListModal;
