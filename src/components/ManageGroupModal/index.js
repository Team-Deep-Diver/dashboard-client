import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { setModalOpen, setModalClose } from "../../store/slices/modalSlice";
import { fetchData } from "../../utils/fetchData";
import { ModalWrapper, ModalHeader, ModalContents, ModalFooter } from "./style";

function ManageGroupModal() {
  const dispatch = useDispatch();
  const { user_id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [group_id, setGroupId] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getGroupInfo = async () => {
      setIsLoading(true);

      const res = await fetchData(`/users/${user_id}/groups`, "GET");

      if (res.status === 200) {
        const data = await res.json();

        setGroupId(data.groupInfo._id);
        setApplicants(data.applicants);
        setMembers(data.members);
        setIsLoading(false);
      }
    };

    getGroupInfo();
  }, []);

  const acceptApplicant = async (applicant) => {
    const res = await fetchData(
      `/users/${user_id}/groups/${group_id}/${applicant._id}`,
      "POST",
      { status: "PARTICIPATING" }
    );

    if (res.status === 201) {
      dispatch(
        setModalOpen({
          type: "message",
          message: `${applicant.nickname} 수락하였습니다.`,
        })
      );
    } else {
      const data = await res.json();

      dispatch(
        setModalOpen({
          type: "message",
          message: data.message,
        })
      );
    }
  };

  const rejectApplicant = async (applicant) => {
    const res = await fetchData(
      `/users/${user_id}/groups/${group_id}/${applicant._id}`,
      "POST",
      { status: "REJECTED" }
    );

    if (res.status === 201) {
      dispatch(
        setModalOpen({
          type: "message",
          message: `${applicant.nickname}을 거절하였습니다.`,
        })
      );
    } else {
      const data = res.json();

      dispatch(
        setModalOpen({
          type: "message",
          message: data.message,
        })
      );
    }
  };

  return (
    <ModalWrapper>
      <ModalHeader>
        <h3>그룹관리</h3>
      </ModalHeader>
      <ModalContents>
        <div className="members">
          <strong className="sub-title">Members</strong>
          <div className="contents-wrap">
            {isLoading ? "불러오는 중입니다..." : ""}
            <ul className="members-list">
              {members?.map((member) => (
                <li key={member._id}>{member.nickname}</li>
              ))}
              <li>
                {!isLoading &&
                  members.length === 0 &&
                  "그룹에 참가한 사람이 없습니다."}
              </li>
            </ul>
          </div>
        </div>
        <div className="applicants">
          <strong className="sub-title">Applicants</strong>
          <div className="contents-wrap">
            {isLoading ? "불러오는 중입니다..." : ""}
            <ul className="applicants-list">
              {applicants?.map((applicant) => (
                <li key={applicant._id}>
                  <span className="name">{applicant.nickname}</span>
                  <div>
                    <button onClick={() => acceptApplicant(applicant)}>
                      수락
                    </button>
                    <button onClick={() => rejectApplicant(applicant)}>
                      거절
                    </button>
                  </div>
                </li>
              ))}
              <li>
                {!isLoading &&
                  applicants.length === 0 &&
                  "그룹에 참가 신청한 사람이 없습니다."}
              </li>
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
    </ModalWrapper>
  );
}

export default ManageGroupModal;
