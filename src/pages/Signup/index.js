import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { Wrapper } from "./style";
import GroupName from "../../components/GroupName";

function Signup() {
  const navigate = useNavigate();
  const [signupValues, setSignupValues] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [selectedRole, setSelectedRole] = useState("member");
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [hover, setHover] = useState(false);

  const { nickname, email, password, passwordConfirm } = signupValues;

  const onHover = () => {
    setHover(!hover);
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;

    setSignupValues({
      ...signupValues,
      [name]: value,
    });
  };

  useEffect(() => {
    const onSubmit = async () => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_SERVER_REQUEST_HOST}/signup`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nickname,
              email,
              password,
              selectedRole,
              groupName,
            }),
          }
        );

        const res = await res.json();

        if (result.status === 201) {
          navigate("/login");
        }

        navigate("/signup");
        setMessage(res.message);
      } catch (err) {
        console.log(err);
      }
    };

    const onCheckGroupName = async () => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_SERVER_REQUEST_HOST}/signup/check-group-name`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              groupName,
            }),
          }
        );

        const res = await res.json();

        navigate("/signup");

        if (result.status === 400) {
          setMessage(res.message);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const onCheckEmail = async () => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_SERVER_REQUEST_HOST}signup/check-email`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              groupName,
            }),
          }
        );

        const res = await res.json();

        navigate("/signup");

        if (result.status === 400) {
          setMessage(res.message);
        }
      } catch (err) {
        console.log(err);
      }
    };

    isSending && onSubmit();
    isSending && onCheckEmail();
    isSending && onCheckGroupName();
  }, [isSending]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
  };

  const handleGroupName = (group) => {
    setGroupName(group);
  };

  const handleRole = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <>
      <button>{"<"}</button>
      <Wrapper>
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="닉네임"
            name="nickname"
            value={nickname}
            onChange={handleInputs}
            required
          />
          <div className="email-container">
            <input
              type="email"
              placeholder="이메일"
              name="email"
              value={email}
              onChange={handleInputs}
              required
            />
            <button onClick={() => setIsSending(true)}>중복확인</button>
          </div>
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            value={password}
            onChange={handleInputs}
            required
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleInputs}
            required
          />
          <p>숫자, 영문자 포함 8자 이상이어야 합니다.</p>
          <div className="role-container">
            <div className="info-toggle">
              <span>권한</span>
              <FontAwesomeIcon
                onMouseOver={onHover}
                onMouseLeave={onHover}
                icon={faInfoCircle}
              />
            </div>
            <div className="role">
              <label htmlFor="member">member</label>
              <input
                id="member"
                type="radio"
                value="member"
                name="role"
                checked={selectedRole === "member"}
                onChange={handleRole}
              />
              <label htmlFor="admin">admin</label>
              <input
                id="admin"
                type="radio"
                value="admin"
                name="role"
                checked={selectedRole === "admin"}
                onChange={handleRole}
              />
            </div>
          </div>
        </form>
        <div>
          {message}
          {nickname.length < 2 && "닉네임은 최소 2자 이상 입력해주세요"}
          {(nickname || email || password || passwordConfirm) &&
            "모든 값을 입력해주세요"}
          {password !== passwordConfirm && "비밀번호가 일치하지 않습니다"}
          {password.length < 8 && "숫자, 영문자 포함 8자 이상이어야 합니다."}
          {hover && (
            <div>
              <p>
                * member는 복수의 그룹에 참여할 수 있습니다.
                <br />* admin은 하나의 그룹을 생성하고, 관리할 수 있습니다.
              </p>
            </div>
          )}
        </div>
        {selectedRole === "admin" && (
          <GroupName
            groupName={groupName}
            handleGroupName={handleGroupName}
            onCheck={() => setIsSending(true)}
          />
        )}
        <button className="submit" onClick={() => setIsSending(true)}>
          제출
        </button>
      </Wrapper>
    </>
  );
}

export default Signup;
