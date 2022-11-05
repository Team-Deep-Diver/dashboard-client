import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { ImArrowLeft2 } from "react-icons/im";
import { AiFillInfoCircle } from "react-icons/ai";

import MessageModal from "../../components/MessageModal";

import { setModalOpen } from "../../store/slices/modalSlice";
import { validateSignupForm } from "../../utils/validateSignupForm";

import { Wrapper, SignupForm } from "./style";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [signupValues, setSignupValues] = useState("");
  const [selectedRole, setSelectedRole] = useState("MEMBER");
  const [duplicationCheckCount, setDuplicationCheckCount] = useState(0);

  const { isModalOpen } = useSelector((state) => state.modal);

  const { nickname, email, password, passwordConfirm, groupName } =
    signupValues;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupValues({
      ...signupValues,
      [name]: value,
    });
  };

  const checkDuplicateEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_REQUEST_HOST}/signup/check-email`,
        data: {
          email,
        },
      });

      res.status === 200 && setDuplicationCheckCount(duplicationCheckCount + 1);

      const data = res.data;
      setMessage(data.message);
    } catch (err) {
      if (err.response.status === 400) {
        return setMessage(err.response.data.message);
      }
    }
  };

  const checkDuplicateGroupName = async (e) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_REQUEST_HOST}/signup/check-group-name`,
        data: { groupName },
      });

      res.status === 200 && setDuplicationCheckCount(duplicationCheckCount + 1);

      const data = res.data;
      setMessage(data.message);
    } catch (err) {
      if (err.response.status === 400) {
        return setMessage(err.response.data.message);
      }
    }
  };

  const signup = async (e) => {
    e.preventDefault();
    const errors = validateSignupForm(
      signupValues,
      selectedRole,
      duplicationCheckCount
    );

    if (errors.length > 0) {
      return setMessage(errors[0].message);
    }

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_REQUEST_HOST}/signup`,
        data: {
          nickname,
          email,
          password,
          passwordConfirm,
          role: selectedRole,
          groupName,
        },
      });

      dispatch(
        setModalOpen({
          messageType: "signup",
          message: `회원 가입 되셨습니다. \n 로그인페이지로 이동합니다.`,
        })
      );
    } catch (err) {
      if (err.response.status === 400) {
        return setMessage(err.response.data.message);
      }
    }
  };

  return (
    <Wrapper>
      <header>
        <ImArrowLeft2 size="40" onClick={() => navigate("/")} />
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
            <AiFillInfoCircle />
          </div>
          <div className="role">
            <label htmlFor="member">member</label>
            <input
              id="member"
              type="radio"
              value="MEMBER"
              name="role"
              checked={selectedRole === "MEMBER"}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
            <label htmlFor="admin">admin</label>
            <input
              id="admin"
              type="radio"
              value="ADMIN"
              name="role"
              checked={selectedRole === "ADMIN"}
              onChange={(e) => setSelectedRole(e.target.value)}
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
        <div className="confirm-message">{message}</div>
        <input
          className="submit-btn"
          type="submit"
          onClick={signup}
          value="회원 가입"
        />
      </SignupForm>
      {isModalOpen && <MessageModal />}
    </Wrapper>
  );
}

export default Signup;
