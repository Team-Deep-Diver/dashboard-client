import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { setModalOpen, setModalClose } from "../../store/slices/modalSlice";

import {
  Wrapper,
  ModalWrapper,
  ModalHeader,
  ModalContents,
  ModalFooter,
} from "./style";

function ManageGroupModal() {
  const dispatch = useDispatch();
  const { user_id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [group_id, setGroupId] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function getGroupInfo() {
      setIsLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_SERVER_REQUEST_HOST}/users/${user_id}/groups`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.jwt,
          },
        }
      );

      if (res.status === 200) {
        const group = await res.json();

        console.log("group", group);

        setGroupId(group.applicants._id);
        setApplicants(group.applicants.applicants);
        setMembers(group.members.members);
        setIsLoading(false);
      }
    }

    getGroupInfo();
  }, []);

  async function acceptApplicant({
    _id: applicant_id,
    nickname: applicant_name,
  }) {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_REQUEST_HOST}/users/${user_id}/groups/${group_id}/${applicant_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.jwt,
        },
        body: JSON.stringify({
          status: "PARTICIPATING",
        }),
      }
    );

    if (result.status === 201) {
      dispatch(
        setModalOpen({
          type: "message",
          message: `${applicant_name} 수락하였습니다.`,
        })
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

  async function rejectApplicant({
    _id: applicant_id,
    nickname: applicant_name,
  }) {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_REQUEST_HOST}/users/${user_id}/groups/${applicant_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.jwt,
        },
        body: JSON.stringify({
          status: "REJECTED",
        }),
      }
    );

    if (res.status === 200) {
      dispatch(
        setModalOpen({
          type: "message",
          message: `${applicant_name}을 거절하였습니다.`,
        })
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

  return (
    <>
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
                      <button onClick={acceptApplicant.bind(null, applicant)}>
                        수락
                      </button>
                      <button onClick={rejectApplicant.bind(null, applicant)}>
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
    </>
  );
}

export default ManageGroupModal;
