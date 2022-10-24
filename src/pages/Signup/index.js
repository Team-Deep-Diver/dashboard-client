import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import MessageModal from "../../components/MessageModal";

import { Wrapper, SignupForm } from "./style";
import { validateEmail } from "../../utils";

function Signup() {
  const navigate = useNavigate();
  const [signupValues, setSignupValues] = useState("");
  const [selectedRole, setSelectedRole] = useState("MEMBER");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
  const [isShowMessageModal, setIsShowMessageModal] = useState(false);
  const [signupResultMessage, setSignupResultMessage] = useState("");

  const { nickname, email, password, passwordConfirm, groupName } =
    signupValues;

  const goWelcomePage = () => {
    navigate("/");
  };

  const checkDuplicateEmail = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_REQUEST_HOST}/signup/check-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const res = await result.json();

      if (res) {
        setConfirmMessage("사용 불가능한 이메일입니다.");
      }
    } catch (err) {
      setConfirmMessage("사용 가능한 이메일입니다.");
    }
  };

  const checkDuplicateGroupName = async (e) => {
    e.preventDefault();

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

      const res = await result.json();

      if (res) {
        setConfirmMessage("사용 불가능한 그룹명입니다.");
      }
    } catch (err) {
      setConfirmMessage("사용 가능한 그룹명입니다.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nickname") {
      setConfirmMessage(
        value.length > 2 ? "" : "* 닉네임은 최소 2자 이상 입력해주세요."
      );
    }

    if (name === "email") {
      setConfirmMessage(
        validateEmail(value) ? "" : "* 이메일 형식에 맞지 않습니다."
      );
    }

    if (name === "password") {
      setConfirmMessage(
        value.length > 8 ? "" : "* 숫자, 영문자 포함 8자 이상이어야 합니다."
      );
    }

    if (name === "passwordConfirm") {
      setConfirmMessage(
        value === password ? "" : "* 비밀번호가 일치하지 않습니다."
      );
    }

    if (name === "groupName") {
      setConfirmMessage(
        value.length > 2 ? "" : "* 그룹명은 최소 2자 이상 입력해주세요."
      );
    }

    setSignupValues({
      ...signupValues,
      [name]: value,
    });
  };

  const handleRole = (e) => {
    setSelectedRole(e.target.value);
  };

  const signup = async (e) => {
    e.preventDefault();

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
            passwordConfirm,
            role: selectedRole,
            groupName,
          }),
        }
      );

      if (result.status === 201) {
        setSignupResultMessage(
          "회원 가입 되셨습니다. \n 로그인페이지로 이동합니다."
        );
        setIsShowMessageModal(true);
      } else {
        setSignupResultMessage(
          "회원 가입에 실패하셨습니다. 다시 입력해주시길 바랍니다."
        );
        setIsShowMessageModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedRole === "MEMBER") {
      if (Object.keys(signupValues).length === 4 && confirmMessage === "") {
        setDisabledSubmitButton(false);
      } else {
        setDisabledSubmitButton(true);
      }
    } else if (selectedRole === "ADMIN") {
      if (Object.keys(signupValues).length === 5 && confirmMessage === "") {
        setDisabledSubmitButton(false);
      } else {
        setDisabledSubmitButton(true);
      }
    }
  }, [nickname, email, password, passwordConfirm, groupName, selectedRole]);

  return (
    <Wrapper>
      <header>
        <FontAwesomeIcon icon={faArrowLeftLong} onClick={goWelcomePage} />
      </header>
      <SignupForm>
        <h1>회원가입</h1>
        <input
          type="text"
          placeholder="닉네임"
          name="nickname"
          onChange={(e) => handleChange(e)}
          required
        />
        <div className="email-container">
          <input
            type="email"
            placeholder="이메일"
            name="email"
            onChange={(e) => handleChange(e)}
            required
          />
          <button onClick={checkDuplicateEmail}>중복 확인</button>
        </div>
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          name="passwordConfirm"
          onChange={(e) => handleChange(e)}
          required
        />
        <div className="role-container">
          <div
            className="info-toggle tooltip"
            data-html={true}
            data-tooltip={`* member는 복수의 그룹에 참여할 수 있습니다. \n * admin은 하나의 그룹을 생성하고, 관리할 수 있습니다.`}
          >
            <span>권한</span>
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
          <div className="role">
            <label htmlFor="member">member</label>
            <input
              id="member"
              type="radio"
              value="MEMBER"
              name="role"
              checked={selectedRole === "MEMBER"}
              onChange={handleRole}
            />
            <label htmlFor="admin">admin</label>
            <input
              id="admin"
              type="radio"
              value="ADMIN"
              name="role"
              checked={selectedRole === "ADMIN"}
              onChange={handleRole}
            />
          </div>
        </div>
        {selectedRole === "ADMIN" && (
          <div className="group-container">
            <input
              placeholder="그룹명"
              type="text"
              name="groupName"
              onChange={(e) => handleChange(e)}
            />
            <button onClick={checkDuplicateGroupName}>중복 확인</button>
          </div>
        )}
        <div className="confirm-message">{confirmMessage}</div>
        <input
          className="submit-btn"
          type="submit"
          onClick={signup}
          disabled={disabledSubmitButton}
          value="회원 가입"
        />
      </SignupForm>
      {isShowMessageModal && (
        <MessageModal message={signupResultMessage} type="signup" />
      )}
    </Wrapper>
  );
}

export default Signup;
