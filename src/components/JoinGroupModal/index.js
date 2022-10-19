import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Background, Wrapper } from "./style";

function JoinGroupModal() {
  const navigate = useNavigate();
  const { user_id } = useParams();

  const [result, setResult] = useState(null);
  const [search, setSearch] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState(false);

  const handleInput = (e) => {
    setResult(null);
    setSearch(false);
    setGroupName(e.target.value);
  };

  const applyGroup = (e) => {
    e.preventDefault();
    setGroupId(e.currentTarget.parentElement.id);
  };

  useEffect(() => {
    async function findGroupByName() {
      const groups = [
        {
          name: "Deep_Dive",
          group_id: "634d78d388b80c5f69285401"
        },
        {
          name: "Deep_Dive_01",
          group_id: "634d78d388b80c5f69285222"
        },
      ];
      setResult(groups);
      // const res = await fetch(
      //   `${process.env.REACT_APP_SERVER_REQUEST_HOST}/groups?groupName=${groupName}`
      // );

      // if (res.status === 200) {
      //   const groups = await res.json();
      //   setResult(groups);
      // } else {
      //   setResult("NotFound");
      // }
    }

    search && findGroupByName();
  }, [search]);

  useEffect(() => {
    async function applyGroupById() {
      navigate("/message");
      // const res = await fetch(`${process.env.REACT_APP_SERVER_REQUEST_HOST}/users/${user_id}/groups/${groupId}`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   }
      // });

      // if (res.status === 200) {
      //   navigate("/message");
      // } else {
      //   navigate("/message");
      // }
    }

    groupId && applyGroupById();
  }, [groupId]);

  return (
    <Background>
      <Wrapper>
        <div className="title">그룹 참가하기</div>
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
          {search && (result === "NotFound" || result?.length === 0) && (
            <div className="message">
              '{groupName}'에 대한 검색 결과가 없습니다.
            </div>
          )}
          {search && (result?.length > 0) &&
            result.map((item) => (
              <div className="list-item" key={item.group_id} id={item.group_id}>
                <div className="item-value">{item.name}</div>
                <input
                  type="submit"
                  value="신청"
                  className="item-button"
                  onClick={applyGroup}
                />
              </div>
            ))
          }
        </div>
        <input
          type="submit"
          value="닫기"
          className="close-button"
          onClick={() => navigate(`/users/${user_id}`)}
        />
      </Wrapper>
    </Background>
  );
}

export default JoinGroupModal;
